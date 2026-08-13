(function () {
  'use strict';

  // ===========================================================
  // Data
  // ===========================================================

  var clues = [
    {
      title: 'The Confession',
      label: 'Clue 01',
      body: 'In her own words, Taylor Swift described "Anti-Hero" as a guided tour through the things she dislikes about herself. She wrote and produced the song with Jack Antonoff for her 2022 album <em>Midnights</em>.'
    },
    {
      title: 'The Reference',
      label: 'Clue 02',
      puzzle: true
    },
    {
      title: 'The Bridge',
      label: 'Clue 03',
      body: 'The song’s bridge narrates a fictional nightmare — Swift imagines her future daughter-in-law scheming to inherit her fortune after her death. It’s a total fabrication, not a real event, sitting inside a song widely described as one of her most "personal."'
    },
    {
      title: 'The Self-Edit',
      label: 'Clue 04',
      body: 'In the original music video, a scene showed Swift stepping onto a bathroom scale that displayed the word "FAT" instead of a number, while her alter-ego looked on with disapproval. Days after release, Swift quietly removed this scene from the video on YouTube and Apple Music — an unusual move, since she rarely edits released work in response to public reaction.'
    },
    {
      title: 'By the Numbers',
      label: 'Clue 05',
      body: '"Anti-Hero" spent 8 weeks atop the Billboard Hot 100 and topped the Billboard Global 200. It made Swift the first artist with a #1 on the Radio Songs chart across three different decades (2000s, 2010s, 2020s), and won 6 MTV Video Music Awards, including Video of the Year.'
    }
  ];

  var referencePuzzle = {
    paraphrase: 'In one verse, Swift compares the pressure to seem non-threatening to being a "sexy baby," while describing herself as a "monster" too big to fit in.',
    choices: [
      'A Real Housewives quote',
      'An episode of the sitcom 30 Rock',
      'A tabloid headline about Swift'
    ],
    correctIndex: 1,
    reveal: 'Fans and critics widely connect this line to the 30 Rock episode "TGS Hates Women," featuring a female writer who leans into an exaggerated, over-sexualized persona. Swift has not confirmed this reference herself.',
    note: 'Want the real lyric? Look it up on Genius.'
  };

  var cases = [
    {
      title: 'The It’s Me, Hi Effect',
      prompt: 'Swift built a hit song around bluntly admitting her own flaws instead of defending herself. Why do audiences respond so strongly to a celebrity saying "I’m the problem"? Is public self-deprecation genuine honesty, or its own kind of image management?',
      stances: [
        'It’s genuine vulnerability',
        'It’s a smart PR move',
        'Both at once — and that’s what makes it work'
      ],
      debate: 'Critics have praised the song’s directness as unusually candid for a global pop star, while others have noted that confessional openness has become a reliable commercial strategy across pop music — the two readings coexist in most critical coverage rather than one replacing the other.'
    },
    {
      title: 'Fiction Inside a “True” Song',
      prompt: 'The bridge is a full fictional nightmare that never happened. Should a song still count as "personal" or "confessional" if part of it is invented? Where’s the line between diary and storytelling?',
      stances: [
        'Fiction can still be emotionally true',
        'Calling it ‘confessional’ oversells it',
        'The line doesn’t really matter'
      ],
      debate: 'Music critics have generally read the fictional bridge as an extension of Swift’s real anxieties rather than a break from them — using invented scenarios to dramatize genuine fears is a device, not a contradiction, in most published analysis of the song.'
    },
    {
      title: 'The Self-Edit',
      prompt: 'Swift changed her own music video days after release — something almost no A-list artist does. Is an artist revising finished art in response to public reaction a strength, or a bad precedent?',
      stances: [
        'Listening to your audience is a strength',
        'Art shouldn’t bend to backlash',
        'Depends entirely on what’s being changed'
      ],
      debate: 'Coverage at the time was split — some outlets and fans framed the edit as a thoughtful response to legitimate criticism, while others (including some who empathized with her disclosure) argued the edit undercut the honesty of the original scene. There was no clear consensus.'
    },
    {
      title: 'Are We All Anti-Heroes Now?',
      prompt: '"Anti-hero" used to describe complicated fictional characters. Now Swift uses it to describe herself, in real life, in a pop song. What does it mean that people increasingly narrate their own lives using the language of TV and film?',
      stances: [
        'It’s just how we talk now — harmless',
        'It lets people avoid real accountability',
        'It’s a genuinely useful way to be self-aware'
      ],
      debate: 'Cultural critics have gone both directions on this — some see borrowed narrative language as a healthy, modern form of self-reflection, others argue it lets public figures reframe accountability as a character trait rather than a choice. Both takes appear regularly in pop culture criticism.'
    }
  ];

  // ===========================================================
  // State
  // ===========================================================

  var unlocked = [false, false, false, false, false];
  var currentCase = 0;
  var selectedStance = null;

  // ===========================================================
  // Screen switching
  // ===========================================================

  function showScreen(id) {
    var screens = document.querySelectorAll('.screen');
    for (var i = 0; i < screens.length; i++) {
      screens[i].classList.remove('active');
    }
    document.getElementById(id).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ===========================================================
  // Evidence board
  // ===========================================================

  function buildEvidenceGrid() {
    var grid = document.getElementById('evidence-grid');
    grid.innerHTML = '';

    clues.forEach(function (clue, index) {
      var tile = document.createElement('div');
      tile.className = 'evidence-tile';
      tile.setAttribute('data-index', index);

      var inner = document.createElement('div');
      inner.className = 'card-inner';

      var front = document.createElement('div');
      front.className = 'card-face card-front';
      front.setAttribute('role', 'button');
      front.setAttribute('tabindex', '0');
      front.setAttribute('aria-label', 'Unlock ' + clue.label);
      front.innerHTML =
        '<div class="lock-icon">🔒</div>' +
        '<div class="clue-label">' + clue.label + '</div>' +
        '<div class="clue-tap">Tap to unlock</div>';

      var back = document.createElement('div');
      back.className = 'card-face card-back';
      back.innerHTML = renderClueBack(clue, index);

      inner.appendChild(front);
      inner.appendChild(back);
      tile.appendChild(inner);
      grid.appendChild(tile);

      function openTile() {
        if (!tile.classList.contains('flipped')) {
          tile.classList.add('flipped');
          markUnlocked(index);
        }
      }

      front.addEventListener('click', openTile);
      front.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openTile();
        }
      });
    });
  }

  function renderClueBack(clue, index) {
    if (clue.puzzle) {
      return renderPuzzleBack();
    }
    return (
      '<h3>' + clue.title + '</h3>' +
      '<p>' + clue.body + '</p>'
    );
  }

  function renderPuzzleBack() {
    var html = '<h3>The Reference</h3>';
    html += '<p>' + referencePuzzle.paraphrase + '</p>';
    html += '<p style="font-size:0.78rem;color:var(--text-faint);">What is this believed to reference?</p>';
    html += '<div class="puzzle-choices" id="puzzle-choices">';
    referencePuzzle.choices.forEach(function (choice, i) {
      html += '<button type="button" class="puzzle-choice-btn" data-choice="' + i + '">' +
        String.fromCharCode(97 + i) + ') ' + choice + '</button>';
    });
    html += '</div>';
    return html;
  }

  function markUnlocked(index) {
    if (unlocked[index]) return;
    unlocked[index] = true;
    updateCounter();

    // Wire up the puzzle interaction once its back face exists in the DOM.
    if (clues[index].puzzle) {
      wirePuzzleChoices(index);
    }
  }

  function wirePuzzleChoices(index) {
    var tile = document.querySelector('.evidence-tile[data-index="' + index + '"]');
    var buttons = tile.querySelectorAll('.puzzle-choice-btn');

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var chosen = parseInt(btn.getAttribute('data-choice'), 10);
        buttons.forEach(function (b, i) {
          b.disabled = true;
          if (i === referencePuzzle.correctIndex) {
            b.classList.add('correct');
          } else if (i === chosen) {
            b.classList.add('incorrect');
          }
        });

        var backFace = tile.querySelector('.card-back');
        var revealBlock = document.createElement('div');
        revealBlock.style.marginTop = '10px';
        revealBlock.innerHTML =
          '<p>' + referencePuzzle.reveal + '</p>' +
          '<p class="clue-note">' + referencePuzzle.note + '</p>';
        backFace.appendChild(revealBlock);
      });
    });
  }

  function updateCounter() {
    var count = unlocked.filter(Boolean).length;
    document.getElementById('unlocked-count').textContent = count;

    var proceedBtn = document.getElementById('btn-to-verdict');
    var lockMsg = document.getElementById('board-lock-msg');

    if (count >= 5) {
      proceedBtn.disabled = false;
      lockMsg.textContent = 'All clues unlocked. The case file is complete.';
    } else {
      proceedBtn.disabled = true;
      lockMsg.textContent = 'Unlock all 5 clues to proceed to the verdict round.';
    }
  }

  // ===========================================================
  // Verdict round
  // ===========================================================

  function renderCase(index) {
    var c = cases[index];
    selectedStance = null;

    document.getElementById('case-progress').textContent =
      'Case ' + (index + 1) + ' of ' + cases.length;
    document.getElementById('case-title').textContent = c.title;
    document.getElementById('case-prompt').textContent = c.prompt;

    var stanceGroup = document.getElementById('stance-group');
    stanceGroup.innerHTML = '';
    c.stances.forEach(function (stanceText, i) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'stance-card';
      btn.textContent = stanceText;
      btn.setAttribute('data-stance-index', i);
      btn.addEventListener('click', function () {
        selectStance(i, stanceGroup);
      });
      stanceGroup.appendChild(btn);
    });

    // Reset response area
    document.getElementById('response-area').classList.add('hidden');
    document.getElementById('verdict-textarea').value = '';
    document.getElementById('debate-reveal').classList.add('hidden');
    document.getElementById('debate-text').textContent = c.debate;

    var nextBtn = document.getElementById('btn-next-case');
    nextBtn.textContent = (index === cases.length - 1) ? 'Close the Case' : 'Next Case';
  }

  function selectStance(i, stanceGroup) {
    selectedStance = i;
    var buttons = stanceGroup.querySelectorAll('.stance-card');
    buttons.forEach(function (b, idx) {
      if (idx === i) {
        b.classList.add('selected');
      } else {
        b.classList.remove('selected');
      }
    });
    document.getElementById('response-area').classList.remove('hidden');
  }

  function goToNextCase() {
    currentCase++;
    if (currentCase >= cases.length) {
      showScreen('screen-final');
    } else {
      renderCase(currentCase);
      showScreen('screen-verdict');
    }
  }

  // ===========================================================
  // Wire up static controls
  // ===========================================================

  function init() {
    buildEvidenceGrid();

    document.getElementById('btn-start').addEventListener('click', function () {
      showScreen('screen-board');
    });

    document.getElementById('btn-to-verdict').addEventListener('click', function () {
      currentCase = 0;
      renderCase(currentCase);
      showScreen('screen-verdict');
    });

    document.getElementById('btn-reveal-debate').addEventListener('click', function () {
      document.getElementById('debate-reveal').classList.remove('hidden');
    });

    document.getElementById('btn-next-case').addEventListener('click', goToNextCase);
  }

  document.addEventListener('DOMContentLoaded', init);
})();

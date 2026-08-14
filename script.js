(function () {
  'use strict';

  // ===========================================================
  // Data
  // ===========================================================
  // Every clue is a guess-first mini-puzzle: a short factual briefing
  // (gated behind a "continue" click) sets up context, then a guess,
  // then the full reveal. Every factual claim carries a `sources` array
  // of {name, url} so citations render inline.

  // Every clue now follows the same read-first loop: a short factual
  // "briefing" (gated behind a continue click, so it can't be skipped),
  // then a guess, then the full sourced reveal. This replaces the old
  // pattern where puzzle tiles let you guess with zero context.

  var clues = [
    {
      title: 'The Confession',
      label: 'Clue 01',
      puzzle: {
        briefing: '"Anti-Hero" is the lead single from Taylor Swift’s 2022 album Midnights — and one of the most self-critical songs of her career.',
        question: 'True or false: Taylor Swift wrote and produced this song entirely on her own, with no credited co-writer.',
        choices: ['True', 'False'],
        correctIndex: 1,
        reveal: 'In her own words, Taylor Swift described "Anti-Hero" as a guided tour through the things she dislikes about herself. She wrote and produced the song with Jack Antonoff for her 2022 album Midnights.',
        sources: [
          { name: 'Today.com', url: 'https://www.today.com/popculture/music/taylor-swift-anti-hero-song-meaning-midnights-rcna50503' }
        ]
      }
    },
    {
      title: 'The Reference',
      label: 'Clue 02',
      puzzle: {
        briefing: 'Several lines in "Anti-Hero" are widely believed to echo other pop culture moments — without ever naming the source outright.',
        prompt: 'In one verse, Swift compares the pressure to seem non-threatening to being a "sexy baby," while describing herself as a "monster" too big to fit in.',
        question: 'What is this believed to reference?',
        choices: [
          'A Real Housewives quote',
          'An episode of the sitcom 30 Rock',
          'A tabloid headline about Swift'
        ],
        correctIndex: 1,
        reveal: 'Fans and critics widely connect this line to the 30 Rock episode "TGS Hates Women," featuring a female writer who leans into an exaggerated, over-sexualized persona. Swift has not confirmed this reference herself.',
        note: 'Want the real lyric? Look it up on Genius.',
        sources: [
          { name: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Anti-Hero_(song)' }
        ]
      }
    },
    {
      title: 'The Bridge',
      label: 'Clue 03',
      puzzle: {
        briefing: 'Pop song bridges are often where an artist gets emotionally rawest — and critics have singled out "Anti-Hero"’s bridge as one of its most talked-about moments.',
        question: 'True or false: the scenario described in the bridge is something that actually happened to Taylor Swift.',
        choices: ['True', 'False'],
        correctIndex: 1,
        reveal: 'The song’s bridge narrates a fictional nightmare — Swift imagines her future daughter-in-law scheming to inherit her fortune after her death. It’s a total fabrication, not a real event, sitting inside a song widely described as one of her most "personal."',
        sources: [
          { name: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Anti-Hero_(song)' }
        ]
      }
    },
    {
      title: 'The Self-Edit',
      label: 'Clue 04',
      puzzle: {
        briefing: 'Major pop stars rarely go back and quietly change a music video after it’s already been released to the public.',
        prompt: 'Days after "Anti-Hero" premiered, Taylor Swift quietly re-uploaded the music video with one scene altered.',
        question: 'True or false: this kind of after-release edit is common for a major pop star.',
        choices: [
          'True — artists revise released work all the time',
          'False — this is unusual for an A-list artist'
        ],
        correctIndex: 1,
        reveal: 'In the original music video, a scene showed Swift stepping onto a bathroom scale that displayed the word "FAT" instead of a number, while her alter-ego looked on with disapproval. Days after release, Swift quietly removed this scene from the video on YouTube and Apple Music — an unusual move, since she rarely edits released work in response to public reaction.',
        sources: [
          { name: 'BBC News', url: 'https://feeds.bbci.co.uk/news/entertainment-arts-63414044' },
          { name: 'Rolling Stone', url: 'https://www.rollingstone.com/music/music-news/taylor-swift-anti-hero-video-fat-controversy-1234619554/' },
          { name: 'NBC News (THINK)', url: 'https://www.nbcnews.com/think/opinion/taylor-swift-should-not-remove-fatphobic-scene-anti-hero-video-rcna54617' },
          { name: 'Rappler', url: 'https://www.rappler.com/entertainment/celebrities/taylor-swift-anti-hero-controversy-fatphobia-feminist-politics/' }
        ]
      }
    },
    {
      title: 'By the Numbers',
      label: 'Clue 05',
      puzzle: {
        briefing: '"Anti-Hero" became one of the most commercially dominant songs of Taylor Swift’s career after its October 2022 release.',
        prompt: '"Anti-Hero" set several chart records for Taylor Swift after its 2022 release.',
        question: 'How many consecutive weeks did it spend at No. 1 on the Billboard Hot 100?',
        choices: ['4 weeks', '6 weeks', '8 weeks'],
        correctIndex: 2,
        reveal: '"Anti-Hero" spent 8 weeks atop the Billboard Hot 100 and topped the Billboard Global 200. It made Swift the first artist with a #1 on the Radio Songs chart across three different decades (2000s, 2010s, 2020s), and won 6 MTV Video Music Awards, including Video of the Year.',
        sources: [
          { name: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Anti-Hero_(song)' },
          { name: 'Rappler', url: 'https://www.rappler.com/entertainment/music/taylor-swift-wins-top-honor-mtv-video-music-awards-2023/' }
        ]
      }
    }
  ];

  var cases = [
    {
      title: 'The It’s Me, Hi Effect',
      prompt: 'Swift built a hit song around bluntly admitting her own flaws instead of defending herself. Why do audiences respond so strongly to a celebrity saying "I’m the problem"? Is public self-deprecation genuine honesty, or its own kind of image management?',
      stances: [
        'It’s genuine vulnerability',
        'It’s a smart PR move',
        'Both at once — and that’s what makes it work',
        'None of these fit'
      ],
      debate: 'Critics have praised the song’s directness as unusually candid for a global pop star, while others have noted that confessional openness has become a reliable commercial strategy across pop music — the two readings coexist in most critical coverage rather than one replacing the other.',
      sources: [
        { name: 'The Ringer', url: 'https://www.theringer.com/2022/10/25/music/midnights-taylor-swift-review' }
      ],
      relatedClues: [0, 4],
      crossExam: [
        'Counterpoint: other critics have pointed out that confessional openness has become a reliable commercial strategy across pop music — genuine feeling and smart marketing aren’t mutually exclusive.',
        'Counterpoint: other critics have praised the song’s bluntness as unusually candid for an artist at Swift’s level of fame. Cynicism about the motive doesn’t erase that the content itself reads as unusually direct.',
        'If it’s really both, which one wins when they conflict? If a specific line felt calculated rather than raw, would that change how "vulnerable" the song feels to you?'
      ]
    },
    {
      title: 'Fiction Inside a “True” Song',
      prompt: 'The bridge is a full fictional nightmare that never happened. Should a song still count as "personal" or "confessional" if part of it is invented? Where’s the line between diary and storytelling?',
      stances: [
        'Fiction can still be emotionally true',
        'Calling it ‘confessional’ oversells it',
        'The line doesn’t really matter',
        'None of these fit'
      ],
      debate: 'Music critics have generally read the fictional bridge as an extension of Swift’s real anxieties rather than a break from them — using invented scenarios to dramatize genuine fears is a device, not a contradiction, in most published analysis of the song.',
      sources: [
        { name: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Anti-Hero_(song)' }
      ],
      relatedClues: [2, 0],
      crossExam: [
        'Most published criticism actually agrees with you here — outlets have read the invented bridge as dramatizing real anxiety, not undercutting it. So: is there a version of this bridge that WOULD cross a line for you?',
        'Counterpoint: most published criticism disagrees with you — outlets have generally read the invented bridge as a device that dramatizes real anxiety, not a contradiction of the song’s honesty. Are critics being too generous, or are you holding the song to a stricter standard than they are?',
        'If the line really doesn’t matter, would you still call a song "confessional" if the whole thing were invented? Where’s your actual cutoff?'
      ]
    },
    {
      title: 'The Self-Edit',
      prompt: 'Swift changed her own music video days after release — something almost no A-list artist does. Is an artist revising finished art in response to public reaction a strength, or a bad precedent?',
      stances: [
        'Listening to your audience is a strength',
        'Art shouldn’t bend to backlash',
        'Depends entirely on what’s being changed',
        'None of these fit'
      ],
      debate: 'Coverage at the time was split — some outlets and fans framed the edit as a thoughtful response to legitimate criticism, while others (including some who empathized with her disclosure) argued the edit undercut the honesty of the original scene. There was no clear consensus.',
      sources: [
        { name: 'NBC News (THINK)', url: 'https://www.nbcnews.com/think/opinion/taylor-swift-should-not-remove-fatphobic-scene-anti-hero-video-rcna54617' },
        { name: 'Rappler', url: 'https://www.rappler.com/entertainment/celebrities/taylor-swift-anti-hero-controversy-fatphobia-feminist-politics/' }
      ],
      relatedClues: [3],
      crossExam: [
        'Counterpoint: some coverage argued the edit actually undercut the honesty of the original scene — that removing it softened something real, rather than fixing a mistake.',
        'Counterpoint: other coverage framed the same edit as a thoughtful response to legitimate criticism, not a cave to pressure.',
        'So what’s your actual rule — is it about who’s affected, how personal the content is, or something else? Try to name it in one sentence.'
      ]
    },
    {
      title: 'Are We All Anti-Heroes Now?',
      prompt: '"Anti-hero" used to describe complicated fictional characters. Now Swift uses it to describe herself, in real life, in a pop song. What does it mean that people increasingly narrate their own lives using the language of TV and film?',
      stances: [
        'It’s just how we talk now — harmless',
        'It lets people avoid real accountability',
        'It’s a genuinely useful way to be self-aware',
        'None of these fit'
      ],
      debate: 'Cultural critics have gone both directions on this — some see borrowed narrative language as a healthy, modern form of self-reflection, others argue it lets public figures reframe accountability as a character trait rather than a choice. Both takes appear regularly in pop culture criticism.',
      sources: [],
      relatedClues: [1, 2],
      crossExam: [
        'Counterpoint: other critics argue this kind of language lets public figures reframe accountability as a character trait rather than an actual choice they’re responsible for.',
        'Counterpoint: other critics see this same habit as a healthy, modern form of self-reflection — not an excuse, but a tool for actually processing mistakes.',
        'Counterpoint: a skeptic would say calling it "self-awareness" still lets someone dodge the harder, less flattering word for the same behavior: a choice.'
      ]
    }
  ];

  // ===========================================================
  // State
  // ===========================================================

  var unlocked = [false, false, false, false, false];
  var currentCase = 0;
  var soundEnabled = true;
  var audioCtx = null;

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
  // Sound (synthesized — no audio files, no external assets)
  // ===========================================================

  function ensureAudioCtx() {
    if (!audioCtx) {
      var Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return null;
      audioCtx = new Ctx();
    }
    return audioCtx;
  }

  function playTone(freq, duration, type, delay) {
    if (!soundEnabled) return;
    var ctx = ensureAudioCtx();
    if (!ctx) return;
    var startAt = ctx.currentTime + (delay || 0);
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.type = type || 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, startAt);
    gain.gain.exponentialRampToValueAtTime(0.12, startAt + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(startAt);
    osc.stop(startAt + duration + 0.02);
  }

  function playSound(kind) {
    if (kind === 'unlock') {
      playTone(660, 0.12, 'triangle');
      playTone(880, 0.15, 'triangle', 0.09);
    } else if (kind === 'correct') {
      playTone(784, 0.16, 'triangle');
    } else if (kind === 'incorrect') {
      playTone(220, 0.18, 'sawtooth');
    } else if (kind === 'finale') {
      playTone(523, 0.14, 'triangle');
      playTone(659, 0.14, 'triangle', 0.1);
      playTone(784, 0.22, 'triangle', 0.2);
    } else if (kind === 'toggle') {
      playTone(600, 0.08, 'sine');
    }
  }

  // ===========================================================
  // Confetti (lightweight DOM particles — no canvas, no library)
  // ===========================================================

  function burstConfetti(x, y, count) {
    var layer = document.getElementById('confetti-layer');
    if (!layer) return;
    var colors = ['#d4af37', '#f0cf6a', '#c9b6ff', '#f1ecff'];
    var n = count || 14;
    for (var i = 0; i < n; i++) {
      var piece = document.createElement('div');
      piece.className = 'confetti-piece';
      var angle = Math.random() * Math.PI * 2;
      var dist = 60 + Math.random() * 80;
      var dx = Math.cos(angle) * dist;
      var dy = Math.sin(angle) * dist - 20;
      piece.style.left = x + 'px';
      piece.style.top = y + 'px';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.setProperty('--dx', dx + 'px');
      piece.style.setProperty('--dy', dy + 'px');
      piece.style.setProperty('--rot', (Math.random() * 360 - 180) + 'deg');
      layer.appendChild(piece);
      (function (p) {
        setTimeout(function () {
          if (p.parentNode) p.parentNode.removeChild(p);
        }, 950);
      })(piece);
    }
  }

  // ===========================================================
  // Source-citation rendering
  // ===========================================================

  function renderSourceLinks(sources) {
    if (!sources || !sources.length) return '';
    return sources
      .map(function (s) {
        return '<a href="' + s.url + '" target="_blank" rel="noopener noreferrer">' + s.name + '</a>';
      })
      .join(' &middot; ');
  }

  function clueSourceHtml(sources) {
    var links = renderSourceLinks(sources);
    return links ? '<p class="clue-source">Source: ' + links + '</p>' : '';
  }

  function getClueRecapData(index) {
    var clue = clues[index];
    return { label: clue.label, title: clue.title, text: clue.puzzle.reveal, sources: clue.puzzle.sources };
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
      back.setAttribute('role', 'button');
      back.setAttribute('tabindex', '0');
      back.setAttribute('aria-label', 'Reopen ' + clue.label);
      back.innerHTML =
        '<div class="clue-back-summary">' +
        '<div class="check-icon">✅</div>' +
        '<h3>' + clue.title + '</h3>' +
        '<p class="clue-reopen">Tap to reopen the file</p>' +
        '</div>';

      inner.appendChild(front);
      inner.appendChild(back);
      tile.appendChild(inner);
      grid.appendChild(tile);

      function unlockAndOpen() {
        if (!tile.classList.contains('flipped')) {
          tile.classList.add('flipped');
          markUnlocked(index);
          var rect = front.getBoundingClientRect();
          burstConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
          playSound('unlock');
        }
        openClueModal(index);
      }

      front.addEventListener('click', unlockAndOpen);
      front.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          unlockAndOpen();
        }
      });

      back.addEventListener('click', function () {
        openClueModal(index);
      });
      back.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openClueModal(index);
        }
      });
    });
  }

  function markUnlocked(index) {
    if (unlocked[index]) return;
    unlocked[index] = true;
    updateCounter();
  }

  // ===========================================================
  // Clue detail modal (full-size case file view)
  // ===========================================================

  function openClueModal(index) {
    renderModalContent(index);
    document.getElementById('clue-modal').classList.remove('hidden');
    document.body.classList.add('modal-open');
  }

  function closeClueModal() {
    document.getElementById('clue-modal').classList.add('hidden');
    document.body.classList.remove('modal-open');
  }

  function renderModalContent(index) {
    var clue = clues[index];
    var body = document.getElementById('clue-modal-body');
    body.innerHTML = buildPuzzleModalHtml(clue);
    wireModalPuzzleChoices(index);
  }

  function buildPuzzleModalHtml(clue) {
    var p = clue.puzzle;
    var html = '<h3>' + clue.title + '</h3>';

    if (!p.briefingAcknowledged) {
      html += '<p class="modal-briefing-label">Case notes — read before you guess:</p>';
      html += '<p>' + p.briefing + '</p>';
      html += '<button type="button" class="btn btn-primary modal-continue-btn" id="btn-briefing-continue">I’ve read it — ask me</button>';
      return html;
    }

    html += '<p class="modal-briefing-recap">' + p.briefing + '</p>';

    if (p.prompt) {
      html += '<p>' + p.prompt + '</p>';
    }

    if (p.answeredIndex == null) {
      html += '<p class="modal-question">' + p.question + '</p>';
      html += '<div class="puzzle-choices">';
      p.choices.forEach(function (choice, i) {
        html += '<button type="button" class="puzzle-choice-btn" data-choice="' + i + '">' +
          String.fromCharCode(97 + i) + ') ' + choice + '</button>';
      });
      html += '</div>';
    } else {
      html += '<div class="puzzle-choices">';
      p.choices.forEach(function (choice, i) {
        var cls = 'puzzle-choice-btn';
        if (i === p.correctIndex) {
          cls += ' correct';
        } else if (i === p.answeredIndex) {
          cls += ' incorrect';
        }
        html += '<button type="button" class="' + cls + '" disabled>' +
          String.fromCharCode(97 + i) + ') ' + choice + '</button>';
      });
      html += '</div>';
      html += '<p>' + p.reveal + '</p>';
      if (p.note) {
        html += '<p class="clue-note">' + p.note + '</p>';
      }
      html += clueSourceHtml(p.sources);
    }

    return html;
  }

  function wireModalPuzzleChoices(index) {
    var clue = clues[index];
    var p = clue.puzzle;
    var body = document.getElementById('clue-modal-body');

    if (!p.briefingAcknowledged) {
      var continueBtn = document.getElementById('btn-briefing-continue');
      if (continueBtn) {
        continueBtn.addEventListener('click', function () {
          p.briefingAcknowledged = true;
          playSound('toggle');
          renderModalContent(index);
        });
      }
      return;
    }

    if (p.answeredIndex != null) return;

    var buttons = body.querySelectorAll('.puzzle-choice-btn');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var chosen = parseInt(btn.getAttribute('data-choice'), 10);
        p.answeredIndex = chosen;
        playSound(chosen === p.correctIndex ? 'correct' : 'incorrect');
        renderModalContent(index);
      });
    });
  }

  function updateCounter() {
    var count = unlocked.filter(Boolean).length;
    document.getElementById('unlocked-count').textContent = count;

    var badge = document.querySelector('.progress-counter');
    badge.classList.remove('pulse');
    void badge.offsetWidth; // restart animation
    badge.classList.add('pulse');

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

    document.getElementById('case-progress').textContent =
      'Case ' + (index + 1) + ' of ' + cases.length;
    document.getElementById('case-title').textContent = c.title;
    document.getElementById('case-prompt').textContent = c.prompt;

    var dotsEl = document.getElementById('case-dots');
    dotsEl.innerHTML = '';
    cases.forEach(function (_, i) {
      var dot = document.createElement('span');
      dot.className = 'case-dot' + (i === index ? ' current' : '') + (i < index ? ' done' : '');
      dotsEl.appendChild(dot);
    });

    var refsEl = document.getElementById('evidence-refs');
    refsEl.innerHTML = '';
    var recapPanel = document.getElementById('evidence-recap-panel');
    recapPanel.classList.add('hidden');
    recapPanel.innerHTML = '';

    c.relatedClues.forEach(function (clueIndex) {
      var data = getClueRecapData(clueIndex);
      var chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'evidence-chip';
      chip.textContent = data.label + ' · ' + data.title;
      chip.addEventListener('click', function () {
        var wasActive = chip.classList.contains('active');
        refsEl.querySelectorAll('.evidence-chip').forEach(function (b) {
          b.classList.remove('active');
        });

        if (wasActive) {
          recapPanel.classList.add('hidden');
          recapPanel.innerHTML = '';
          return;
        }

        chip.classList.add('active');
        recapPanel.innerHTML =
          '<h4>' + data.label + ' — ' + data.title + '</h4>' +
          '<p>' + data.text + '</p>' +
          clueSourceHtml(data.sources);
        recapPanel.classList.remove('hidden');
        playSound('toggle');
      });
      refsEl.appendChild(chip);
    });

    var stanceGroup = document.getElementById('stance-group');
    stanceGroup.innerHTML = '';
    c.stances.forEach(function (stanceText, i) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'stance-card';
      btn.textContent = stanceText;
      btn.setAttribute('data-stance-index', i);
      btn.addEventListener('click', function () {
        selectStance(i, stanceGroup, c);
      });
      stanceGroup.appendChild(btn);
    });

    document.getElementById('cross-exam').classList.add('hidden');
    document.getElementById('response-area').classList.add('hidden');
    document.getElementById('verdict-textarea').value = '';
    document.getElementById('debate-reveal').classList.add('hidden');
    document.getElementById('debate-text').textContent = c.debate;

    var sourcesEl = document.getElementById('debate-sources');
    var links = renderSourceLinks(c.sources);
    sourcesEl.innerHTML = links
      ? 'Source: ' + links
      : 'Discussion framing — synthesized from general pop-culture commentary, not tied to a single article.';

    var nextBtn = document.getElementById('btn-next-case');
    nextBtn.textContent = (index === cases.length - 1) ? 'Close the Case' : 'Next Case';

    var card = document.querySelector('.case-card');
    card.classList.remove('case-enter');
    void card.offsetWidth; // restart animation
    card.classList.add('case-enter');
  }

  function selectStance(i, stanceGroup, c) {
    var buttons = stanceGroup.querySelectorAll('.stance-card');
    buttons.forEach(function (b, idx) {
      if (idx === i) {
        b.classList.add('selected');
      } else {
        b.classList.remove('selected');
      }
    });

    var crossExam = document.getElementById('cross-exam');
    var crossExamText = document.getElementById('cross-exam-text');
    var standByBtn = document.getElementById('btn-stand-by');
    var changedBtn = document.getElementById('btn-changed-mind');
    var responseArea = document.getElementById('response-area');

    var isNoneOption = (i === c.stances.length - 1);
    if (isNoneOption) {
      crossExam.classList.add('hidden');
      responseArea.classList.remove('hidden');
      return;
    }

    crossExamText.textContent = c.crossExam[i];
    standByBtn.classList.remove('selected');
    changedBtn.classList.remove('selected');
    crossExam.classList.remove('hidden');
    responseArea.classList.add('hidden');

    standByBtn.onclick = function () {
      standByBtn.classList.add('selected');
      changedBtn.classList.remove('selected');
      responseArea.classList.remove('hidden');
      playSound('toggle');
    };

    changedBtn.onclick = function () {
      changedBtn.classList.add('selected');
      standByBtn.classList.remove('selected');
      responseArea.classList.remove('hidden');
      playSound('toggle');
    };
  }

  function goToNextCase() {
    currentCase++;
    if (currentCase >= cases.length) {
      playSound('finale');
      burstConfetti(window.innerWidth / 2, 140, 30);
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

    document.getElementById('btn-close-modal').addEventListener('click', closeClueModal);
    document.querySelector('.clue-modal-backdrop').addEventListener('click', closeClueModal);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeClueModal();
    });

    var soundBtn = document.getElementById('btn-sound-toggle');
    soundBtn.addEventListener('click', function () {
      soundEnabled = !soundEnabled;
      soundBtn.textContent = soundEnabled ? '🔊' : '🔇';
      soundBtn.setAttribute('aria-pressed', String(soundEnabled));
      if (soundEnabled) {
        ensureAudioCtx();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();

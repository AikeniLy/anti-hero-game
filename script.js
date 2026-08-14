(function () {
  'use strict';

  // ===========================================================
  // Data
  // ===========================================================
  // The evidence board is a sorting minigame: each clue has a short,
  // real `snippet` (paraphrased from the same sourced reveal text, but
  // without naming which clue it belongs to) that the player drags onto
  // the matching case-file folder. Getting it right is a reading-
  // comprehension task, not a blind guess. Every factual claim carries
  // a `sources` array of {name, url} so citations render inline.

  var clues = [
    {
      title: 'The Confession',
      label: 'Clue 01',
      snippet: 'Written and produced with Jack Antonoff, this track has been described by its own singer as a tour through the parts of herself she likes least.',
      reveal: 'In her own words, Taylor Swift described "Anti-Hero" as a guided tour through the things she dislikes about herself. She wrote and produced the song with Jack Antonoff for her 2022 album Midnights.',
      sources: [
        { name: 'Today.com', url: 'https://www.today.com/popculture/music/taylor-swift-anti-hero-song-meaning-midnights-rcna50503' }
      ]
    },
    {
      title: 'The Reference',
      label: 'Clue 02',
      snippet: 'One lyric is widely believed to nod to a specific sitcom episode about a female writer leaning into an exaggerated, over-sexualized persona — though the singer has never confirmed it.',
      reveal: 'Fans and critics widely connect this line to the 30 Rock episode "TGS Hates Women," featuring a female writer who leans into an exaggerated, over-sexualized persona. Swift has not confirmed this reference herself.',
      note: 'Want the real lyric? Look it up on Genius.',
      sources: [
        { name: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Anti-Hero_(song)' }
      ]
    },
    {
      title: 'The Bridge',
      label: 'Clue 03',
      snippet: 'A section of the song invents a scenario where a future in-law schemes for an inheritance after the singer’s death — entirely fictional, despite how personal the rest of the song feels.',
      reveal: 'The song’s bridge narrates a fictional nightmare — Swift imagines her future daughter-in-law scheming to inherit her fortune after her death. It’s a total fabrication, not a real event, sitting inside a song widely described as one of her most "personal."',
      sources: [
        { name: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Anti-Hero_(song)' }
      ]
    },
    {
      title: 'The Self-Edit',
      label: 'Clue 04',
      snippet: 'Days after release, a scene involving a bathroom scale and a self-critical word was quietly removed from the official video — unusual, since this artist rarely revises work after backlash.',
      reveal: 'In the original music video, a scene showed Swift stepping onto a bathroom scale that displayed the word "FAT" instead of a number, while her alter-ego looked on with disapproval. Days after release, Swift quietly removed this scene from the video on YouTube and Apple Music — an unusual move, since she rarely edits released work in response to public reaction.',
      sources: [
        { name: 'BBC News', url: 'https://feeds.bbci.co.uk/news/entertainment-arts-63414044' },
        { name: 'Rolling Stone', url: 'https://www.rollingstone.com/music/music-news/taylor-swift-anti-hero-video-fat-controversy-1234619554/' },
        { name: 'NBC News (THINK)', url: 'https://www.nbcnews.com/think/opinion/taylor-swift-should-not-remove-fatphobic-scene-anti-hero-video-rcna54617' },
        { name: 'Rappler', url: 'https://www.rappler.com/entertainment/celebrities/taylor-swift-anti-hero-controversy-fatphobia-feminist-politics/' }
      ]
    },
    {
      title: 'By the Numbers',
      label: 'Clue 05',
      snippet: 'Eight weeks at #1, a Global 200 chart-topper, a three-decade radio record, and six trophies at one awards show.',
      reveal: '"Anti-Hero" spent 8 weeks atop the Billboard Hot 100 and topped the Billboard Global 200. It made Swift the first artist with a #1 on the Radio Songs chart across three different decades (2000s, 2010s, 2020s), and won 6 MTV Video Music Awards, including Video of the Year.',
      sources: [
        { name: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Anti-Hero_(song)' },
        { name: 'Rappler', url: 'https://www.rappler.com/entertainment/music/taylor-swift-wins-top-honor-mtv-video-music-awards-2023/' }
      ]
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
    return { label: clue.label, title: clue.title, text: clue.reveal, sources: clue.sources };
  }

  // ===========================================================
  // Evidence board — "File the Evidence" drag-and-sort minigame
  // ===========================================================

  var selectedCardIndex = null; // clueIndex of the tap-selected card, if any
  var dragState = null;

  function shuffledIndices(n) {
    var arr = [];
    for (var i = 0; i < n; i++) arr.push(i);
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    return arr;
  }

  function buildInvestigationBoard() {
    var tray = document.getElementById('evidence-tray');
    var folderGrid = document.getElementById('folder-grid');
    tray.innerHTML = '';
    folderGrid.innerHTML = '';

    // Folders stay in fixed Clue 01–05 order; tray cards are shuffled so
    // position can't be used to cheat the match.
    clues.forEach(function (clue, index) {
      var folder = document.createElement('div');
      folder.className = 'folder-target';
      folder.setAttribute('data-index', index);
      folder.setAttribute('role', 'button');
      folder.setAttribute('tabindex', '0');
      folder.setAttribute('aria-label', 'File evidence under ' + clue.label + ': ' + clue.title);
      folder.innerHTML =
        '<div class="folder-label">' + clue.label + '</div>' +
        '<div class="folder-title">' + clue.title + '</div>';
      folderGrid.appendChild(folder);

      folder.addEventListener('click', function () {
        if (folder.classList.contains('filed')) return;
        if (selectedCardIndex == null) return;
        var cardEl = tray.querySelector('.evidence-card[data-clue-index="' + selectedCardIndex + '"]');
        attemptMatch(selectedCardIndex, index, cardEl);
        selectedCardIndex = null;
      });
      folder.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          folder.click();
        }
      });
    });

    shuffledIndices(clues.length).forEach(function (index) {
      var clue = clues[index];
      var card = document.createElement('div');
      card.className = 'evidence-card';
      card.setAttribute('data-clue-index', index);
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', 'Evidence card, drag or select then choose a case file');
      card.textContent = clue.snippet;
      tray.appendChild(card);

      card.addEventListener('pointerdown', function (e) {
        startDrag(e, card, index);
      });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleCardSelection(index, card);
        }
      });
    });

    document.addEventListener('pointermove', onDragMove);
    document.addEventListener('pointerup', onDragEnd);
  }

  function toggleCardSelection(index, cardEl) {
    if (selectedCardIndex === index) {
      selectedCardIndex = null;
      cardEl.classList.remove('selected');
      return;
    }
    document.querySelectorAll('.evidence-card').forEach(function (c) {
      c.classList.remove('selected');
    });
    selectedCardIndex = index;
    cardEl.classList.add('selected');
    playSound('toggle');
  }

  function startDrag(e, cardEl, clueIndex) {
    if (cardEl.classList.contains('filing')) return;
    var rect = cardEl.getBoundingClientRect();
    dragState = {
      cardEl: cardEl,
      clueIndex: clueIndex,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
      moved: false
    };
    cardEl.setPointerCapture(e.pointerId);
    cardEl.classList.add('dragging');
    cardEl.style.position = 'fixed';
    cardEl.style.left = rect.left + 'px';
    cardEl.style.top = rect.top + 'px';
    cardEl.style.width = rect.width + 'px';
  }

  function onDragMove(e) {
    if (!dragState) return;
    dragState.moved = true;
    dragState.cardEl.style.left = (e.clientX - dragState.offsetX) + 'px';
    dragState.cardEl.style.top = (e.clientY - dragState.offsetY) + 'px';

    document.querySelectorAll('.folder-target').forEach(function (f) {
      f.classList.remove('drag-over');
    });
    var el = document.elementFromPoint(e.clientX, e.clientY);
    var folder = el ? el.closest('.folder-target') : null;
    if (folder && !folder.classList.contains('filed')) {
      folder.classList.add('drag-over');
    }
  }

  function onDragEnd(e) {
    if (!dragState) return;
    var cardEl = dragState.cardEl;
    var clueIndex = dragState.clueIndex;
    var moved = dragState.moved;
    cardEl.classList.remove('dragging');
    document.querySelectorAll('.folder-target').forEach(function (f) {
      f.classList.remove('drag-over');
    });

    if (!moved) {
      // Tap without dragging — treat as select, not a drop attempt.
      resetCardPosition(cardEl);
      toggleCardSelection(clueIndex, cardEl);
      dragState = null;
      return;
    }

    var el = document.elementFromPoint(e.clientX, e.clientY);
    var folder = el ? el.closest('.folder-target') : null;

    if (folder && !folder.classList.contains('filed')) {
      var folderIndex = parseInt(folder.getAttribute('data-index'), 10);
      attemptMatch(clueIndex, folderIndex, cardEl);
    } else {
      resetCardPosition(cardEl);
    }

    dragState = null;
  }

  function resetCardPosition(cardEl) {
    cardEl.style.position = '';
    cardEl.style.left = '';
    cardEl.style.top = '';
    cardEl.style.width = '';
  }

  function attemptMatch(clueIndex, folderIndex, cardEl) {
    if (clueIndex === folderIndex) {
      fileCorrectly(clueIndex, cardEl);
    } else {
      resetCardPosition(cardEl);
      cardEl.classList.add('shake');
      playSound('incorrect');
      setTimeout(function () {
        cardEl.classList.remove('shake');
      }, 350);
    }
  }

  function fileCorrectly(clueIndex, cardEl) {
    cardEl.classList.add('filing');
    var clue = clues[clueIndex];
    var folder = document.querySelector('.folder-target[data-index="' + clueIndex + '"]');
    var rect = folder.getBoundingClientRect();

    cardEl.remove();
    markUnlocked(clueIndex);

    folder.classList.add('filed');
    folder.innerHTML =
      '<div class="check-icon">✅</div>' +
      '<h3>' + clue.title + '</h3>' +
      '<p class="clue-reopen">Tap to view the file</p>';
    folder.addEventListener('click', function () {
      openClueModal(clueIndex);
    });

    burstConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
    playSound('unlock');
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
    var clue = clues[index];
    var body = document.getElementById('clue-modal-body');
    var html = '<h3>' + clue.title + '</h3>';
    html += '<p>' + clue.reveal + '</p>';
    if (clue.note) {
      html += '<p class="clue-note">' + clue.note + '</p>';
    }
    html += clueSourceHtml(clue.sources);
    body.innerHTML = html;

    document.getElementById('clue-modal').classList.remove('hidden');
    document.body.classList.add('modal-open');
  }

  function closeClueModal() {
    document.getElementById('clue-modal').classList.add('hidden');
    document.body.classList.remove('modal-open');
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
    buildInvestigationBoard();

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

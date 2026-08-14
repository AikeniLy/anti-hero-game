(function () {
  'use strict';

  // ===========================================================
  // Data
  // ===========================================================
  // Case Briefing shows every clue's full sourced fact up front so the
  // player has genuinely read the material. Evidence Blaster then tests
  // recall of that same material with a real (non-fabricated) multiple
  // choice per clue — the choices are always real people/shows/numbers,
  // never invented ones. Every factual claim carries a `sources` array
  // of {name, url} so citations render inline.

  var clues = [
    {
      title: 'The Confession',
      label: 'Clue 01',
      reveal: 'In her own words, Taylor Swift described "Anti-Hero" as a guided tour through the things she dislikes about herself. She wrote and produced the song with Jack Antonoff for her 2022 album Midnights.',
      sources: [
        { name: 'Today.com', url: 'https://www.today.com/popculture/music/taylor-swift-anti-hero-song-meaning-midnights-rcna50503' }
      ],
      question: 'Who did Taylor Swift co-write and produce "Anti-Hero" with?',
      choices: ['Max Martin', 'Jack Antonoff', 'Aaron Dessner'],
      correctIndex: 1
    },
    {
      title: 'The Reference',
      label: 'Clue 02',
      reveal: 'Fans and critics widely connect a lyric in the song to the 30 Rock episode "TGS Hates Women," featuring a female writer who leans into an exaggerated, over-sexualized persona. Swift has not confirmed this reference herself.',
      note: 'Want the real lyric? Look it up on Genius.',
      sources: [
        { name: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Anti-Hero_(song)' }
      ],
      question: 'The "sexy baby" lyric is widely believed to reference which show?',
      choices: ['Saturday Night Live', '30 Rock', 'Parks and Recreation'],
      correctIndex: 1
    },
    {
      title: 'The Bridge',
      label: 'Clue 03',
      reveal: 'The song’s bridge narrates a fictional nightmare — Swift imagines her future daughter-in-law scheming to inherit her fortune after her death. It’s a total fabrication, not a real event, sitting inside a song widely described as one of her most "personal."',
      sources: [
        { name: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Anti-Hero_(song)' }
      ],
      question: 'True or false: the daughter-in-law scenario in the bridge really happened.',
      choices: ['True', 'False'],
      correctIndex: 1
    },
    {
      title: 'The Self-Edit',
      label: 'Clue 04',
      reveal: 'In the original music video, a scene showed Swift stepping onto a bathroom scale that displayed the word "FAT" instead of a number, while her alter-ego looked on with disapproval. Days after release, Swift quietly removed this scene from the video on YouTube and Apple Music — an unusual move, since she rarely edits released work in response to public reaction.',
      sources: [
        { name: 'BBC News', url: 'https://feeds.bbci.co.uk/news/entertainment-arts-63414044' },
        { name: 'Rolling Stone', url: 'https://www.rollingstone.com/music/music-news/taylor-swift-anti-hero-video-fat-controversy-1234619554/' },
        { name: 'NBC News (THINK)', url: 'https://www.nbcnews.com/think/opinion/taylor-swift-should-not-remove-fatphobic-scene-anti-hero-video-rcna54617' },
        { name: 'Rappler', url: 'https://www.rappler.com/entertainment/celebrities/taylor-swift-anti-hero-controversy-fatphobia-feminist-politics/' }
      ],
      question: 'What word appeared on the scale in the original music video?',
      choices: ['FAT', 'UGLY', 'WORTHLESS'],
      correctIndex: 0
    },
    {
      title: 'By the Numbers',
      label: 'Clue 05',
      reveal: '"Anti-Hero" spent 8 weeks atop the Billboard Hot 100 and topped the Billboard Global 200. It made Swift the first artist with a #1 on the Radio Songs chart across three different decades (2000s, 2010s, 2020s), and won 6 MTV Video Music Awards, including Video of the Year.',
      sources: [
        { name: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Anti-Hero_(song)' },
        { name: 'Rappler', url: 'https://www.rappler.com/entertainment/music/taylor-swift-wins-top-honor-mtv-video-music-awards-2023/' }
      ],
      question: 'How many weeks did "Anti-Hero" spend at #1 on the Hot 100?',
      choices: ['4 weeks', '6 weeks', '8 weeks'],
      correctIndex: 2
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

  var currentClueIndex = 0;
  var blasterState = null;
  var blasterRafId = null;
  var blasterCorrectCount = 0;
  var blasterRoundsAnswered = 0;
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
    if (kind === 'shoot') {
      playTone(1100, 0.05, 'square');
    } else if (kind === 'explode-good') {
      playTone(660, 0.08, 'square');
      playTone(990, 0.12, 'square', 0.06);
    } else if (kind === 'explode-bad') {
      playTone(180, 0.16, 'square');
    } else if (kind === 'block') {
      playTone(400, 0.07, 'square');
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

  // ===========================================================
  // Case Briefing — shown one clue at a time, immediately before that
  // clue's Blaster round, instead of all five up front.
  // ===========================================================

  function showClueBriefing(index) {
    var clue = clues[index];

    document.getElementById('briefing-progress').textContent =
      'Clue ' + (index + 1) + ' of ' + clues.length;

    var list = document.getElementById('briefing-list');
    list.innerHTML = '';

    var card = document.createElement('div');
    card.className = 'briefing-card';
    var html = '<div class="briefing-label">' + clue.label + '</div>';
    html += '<h3>' + clue.title + '</h3>';
    html += '<p>' + clue.reveal + '</p>';
    if (clue.note) {
      html += '<p class="clue-note">' + clue.note + '</p>';
    }
    html += clueSourceHtml(clue.sources);
    card.innerHTML = html;
    list.appendChild(card);

    document.getElementById('btn-start-blaster').textContent = 'Start Round ' + (index + 1);
  }

  // ===========================================================
  // Evidence Blaster — retro arcade recall round
  // Real ship + projectile physics: drag to steer, ship auto-fires,
  // bolts travel up the play area and collide with drifting targets.
  // ===========================================================

  function stopBlasterLoop() {
    if (blasterRafId) {
      cancelAnimationFrame(blasterRafId);
      blasterRafId = null;
    }
    blasterState = null;
  }

  function startBlasterRound(index) {
    stopBlasterLoop();

    var clue = clues[index];
    document.getElementById('blaster-round').textContent = 'Round ' + (index + 1) + ' of ' + clues.length;
    document.getElementById('blaster-question').textContent = clue.question;
    document.getElementById('blaster-reveal').classList.add('hidden');

    var playArea = document.getElementById('blaster-play-area');
    var targetsLayer = document.getElementById('blaster-targets-layer');
    var guardsLayer = document.getElementById('blaster-guards-layer');
    var boltsLayer = document.getElementById('blaster-bolts-layer');
    var shipEl = document.getElementById('blaster-ship');

    targetsLayer.innerHTML = '';
    guardsLayer.innerHTML = '';
    boltsLayer.innerHTML = '';
    shipEl.classList.remove('hidden');

    var rect = playArea.getBoundingClientRect();
    var areaW = rect.width;
    var areaH = rect.height;

    // Each answer is a "ship" in its own column, escorted by two guard
    // drones. The whole wave descends together (slowly, capped well
    // above the player) — both guards in a column must be destroyed
    // before a shot can reach the answer ship behind them.
    var order = shuffledIndices(clue.choices.length);
    var columnCount = order.length;
    var columnWidth = areaW / columnCount;
    var columns = [];

    order.forEach(function (choiceIdx, col) {
      var centerX = col * columnWidth + columnWidth / 2;

      var targetEl = document.createElement('div');
      targetEl.className = 'blaster-target';
      targetEl.textContent = clue.choices[choiceIdx];
      targetsLayer.appendChild(targetEl);
      var tw = Math.min(targetEl.offsetWidth || 90, columnWidth - 16);
      var th = targetEl.offsetHeight || 34;

      // Guards span the FULL column width — not just centered under the
      // target — so any bolt fired anywhere in this column is guaranteed
      // to hit an alive guard first. No way to slip past on the sides.
      var columnLeft = col * columnWidth;
      var guardH = 12;

      // Each guard's hit-detection box still spans the full column (so
      // it can never be slipped past), but the visible bar inside it is
      // narrower with a margin, so adjacent columns' guards don't visually
      // touch and read as one continuous wall.
      var guardLowerEl = document.createElement('div');
      guardLowerEl.className = 'blaster-guard';
      guardLowerEl.innerHTML = '<span class="blaster-guard-bar"></span>';
      guardsLayer.appendChild(guardLowerEl);

      var guardUpperEl = document.createElement('div');
      guardUpperEl.className = 'blaster-guard';
      guardUpperEl.innerHTML = '<span class="blaster-guard-bar"></span>';
      guardsLayer.appendChild(guardUpperEl);

      columns.push({
        choiceIdx: choiceIdx,
        column: col,
        centerX: centerX,
        columnLeft: columnLeft,
        targetEl: targetEl, targetW: tw, targetH: th, targetAlive: true,
        targetX: centerX - tw / 2, targetY: 0,
        guards: [
          { el: guardLowerEl, gap: 100, w: columnWidth, h: guardH, alive: true, x: columnLeft, y: 0 },
          { el: guardUpperEl, gap: 50, w: columnWidth, h: guardH, alive: true, x: columnLeft, y: 0 }
        ]
      });
    });

    var shipW = shipEl.offsetWidth || 28;

    blasterState = {
      clueIndex: index,
      columns: columns,
      columnWidth: columnWidth,
      waveY: 14,
      maxWaveY: areaH * 0.55,
      descentSpeed: 6,
      bolts: [],
      shipX: areaW / 2 - shipW / 2,
      shipW: shipW,
      areaW: areaW,
      areaH: areaH,
      resolved: false,
      lastTime: null,
      boltsLayer: boltsLayer,
      shipEl: shipEl
    };

    shipEl.style.left = blasterState.shipX + 'px';

    updateFireButtonState();
    blasterRafId = requestAnimationFrame(blasterTick);
  }

  function blasterTick(t) {
    if (!blasterState) return;
    var s = blasterState;
    if (s.lastTime == null) s.lastTime = t;
    var dt = Math.min(0.05, (t - s.lastTime) / 1000);
    s.lastTime = t;

    if (!s.resolved) {
      if (s.waveY < s.maxWaveY) {
        s.waveY = Math.min(s.maxWaveY, s.waveY + s.descentSpeed * dt);
      }

      s.columns.forEach(function (col) {
        if (col.targetAlive) {
          col.targetX = col.centerX - col.targetW / 2;
          col.targetY = s.waveY;
          col.targetEl.style.left = col.targetX + 'px';
          col.targetEl.style.top = col.targetY + 'px';
        }
        col.guards.forEach(function (g) {
          if (!g.alive) return;
          g.y = s.waveY + g.gap;
          g.el.style.left = g.x + 'px';
          g.el.style.top = g.y + 'px';
          g.el.style.width = g.w + 'px';
        });
      });

      for (var i = s.bolts.length - 1; i >= 0; i--) {
        var b = s.bolts[i];
        b.y -= 260 * dt;
        b.el.style.top = b.y + 'px';

        if (b.y < -20) {
          b.el.remove();
          s.bolts.splice(i, 1);
          updateFireButtonState();
          continue;
        }

        var col2 = s.columns[b.column];
        var hitGuard = null;
        for (var g2 = 0; g2 < col2.guards.length; g2++) {
          var guard = col2.guards[g2];
          if (!guard.alive) continue;
          if (b.x >= guard.x - 6 && b.x <= guard.x + guard.w + 6 &&
              b.y <= guard.y + guard.h && b.y >= guard.y - 6) {
            hitGuard = guard;
            break;
          }
        }

        if (hitGuard) {
          hitGuard.alive = false;
          hitGuard.el.classList.add('guard-broken');
          var guardRect = hitGuard.el.getBoundingClientRect();
          burstConfetti(guardRect.left + guardRect.width / 2, guardRect.top + guardRect.height / 2, 8);
          b.el.remove();
          s.bolts.splice(i, 1);
          playSound('block');
          updateFireButtonState();
          continue;
        }

        var guardsRemain = col2.guards.some(function (g) { return g.alive; });
        if (!guardsRemain && col2.targetAlive &&
            b.x >= col2.targetX - 6 && b.x <= col2.targetX + col2.targetW + 6 &&
            b.y <= col2.targetY + col2.targetH && b.y >= col2.targetY - 6) {
          b.el.remove();
          s.bolts.splice(i, 1);
          resolveBlasterHit(col2);
          break;
        }
      }
    }

    blasterRafId = requestAnimationFrame(blasterTick);
  }

  function fireBolt() {
    var s = blasterState;
    if (!s || s.resolved) return;

    var column = Math.max(0, Math.min(s.columns.length - 1, Math.floor((s.shipX + s.shipW / 2) / s.columnWidth)));

    // Bolt fires from the ship's actual position — guards now span the
    // full column width, so wherever the ship is within that column,
    // an alive guard is guaranteed to be in the way.
    var el = document.createElement('div');
    el.className = 'blaster-bolt';
    s.boltsLayer.appendChild(el);
    var bx = s.shipX + s.shipW / 2 - 2;
    var by = s.areaH - 34;
    el.style.left = bx + 'px';
    el.style.top = by + 'px';
    s.bolts.push({ el: el, x: bx, y: by, column: column });

    s.shipEl.classList.remove('recoil');
    void s.shipEl.offsetWidth;
    s.shipEl.classList.add('recoil');

    playSound('shoot');
  }

  function updateFireButtonState() {
    var btn = document.getElementById('btn-blaster-fire');
    if (!btn) return;
    btn.disabled = !(blasterState && !blasterState.resolved);
  }

  function updateBlasterScore() {
    var el = document.getElementById('blaster-score');
    if (!el) return;
    el.textContent = 'Correct: ' + blasterCorrectCount + ' / ' + blasterRoundsAnswered;
  }

  function wireBlasterControls() {
    var playArea = document.getElementById('blaster-play-area');
    var dragging = false;

    function moveShipTo(clientX) {
      if (!blasterState) return;
      var rect = playArea.getBoundingClientRect();
      var x = clientX - rect.left - blasterState.shipW / 2;
      x = Math.max(0, Math.min(blasterState.areaW - blasterState.shipW, x));
      blasterState.shipX = x;
      blasterState.shipEl.style.left = x + 'px';
    }

    playArea.addEventListener('contextmenu', function (e) {
      e.preventDefault();
    });

    playArea.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return; // left click only
      dragging = true;
      playArea.setPointerCapture(e.pointerId);
      moveShipTo(e.clientX);
    });
    playArea.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      moveShipTo(e.clientX);
    });
    playArea.addEventListener('pointerup', function () {
      dragging = false;
    });
    playArea.addEventListener('pointercancel', function () {
      dragging = false;
    });

    document.addEventListener('keydown', function (e) {
      if (!blasterState) return;
      if (e.key === 'ArrowLeft') {
        blasterState.shipX = Math.max(0, blasterState.shipX - 24);
        blasterState.shipEl.style.left = blasterState.shipX + 'px';
      } else if (e.key === 'ArrowRight') {
        blasterState.shipX = Math.min(blasterState.areaW - blasterState.shipW, blasterState.shipX + 24);
        blasterState.shipEl.style.left = blasterState.shipX + 'px';
      } else if (e.key === 'e' || e.key === 'E') {
        e.preventDefault();
        fireBolt();
      }
    });
  }

  function shakeArena() {
    var arena = document.querySelector('.blaster-arena');
    if (!arena) return;
    arena.classList.remove('shake-arena');
    void arena.offsetWidth; // restart animation
    arena.classList.add('shake-arena');
  }

  function flashArena() {
    var flash = document.getElementById('blaster-flash');
    if (!flash) return;
    flash.classList.remove('flash-active');
    void flash.offsetWidth;
    flash.classList.add('flash-active');
  }

  function showFloatingText(text, x, y, kind) {
    var layer = document.getElementById('confetti-layer');
    if (!layer) return;
    var el = document.createElement('div');
    el.className = 'blaster-floating-text ' + kind;
    el.textContent = text;
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    layer.appendChild(el);
    setTimeout(function () {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 900);
  }

  function showShockwave(x, y, color) {
    var layer = document.getElementById('confetti-layer');
    if (!layer) return;
    var el = document.createElement('div');
    el.className = 'blaster-shockwave';
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    el.style.borderColor = color;
    layer.appendChild(el);
    setTimeout(function () {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 560);
  }

  function resolveBlasterHit(hitColumn) {
    var s = blasterState;
    if (!s || s.resolved) return;
    s.resolved = true;

    var clueIndex = s.clueIndex;
    var clue = clues[clueIndex];
    var isCorrect = hitColumn.choiceIdx === clue.correctIndex;

    blasterRoundsAnswered++;
    if (isCorrect) blasterCorrectCount++;
    updateBlasterScore();

    // The correct answer always stays fully visible and clearly marked —
    // it never vanishes, even if you picked wrong, so you can see what
    // you should have hit. Only your own wrong pick gets marked as wrong.
    s.columns.forEach(function (col) {
      if (col.choiceIdx === clue.correctIndex) {
        col.targetEl.classList.add('reveal-correct');
      } else if (col === hitColumn) {
        col.targetEl.classList.add('reveal-wrong');
      } else {
        col.targetEl.classList.add('faded');
      }
    });

    s.bolts.forEach(function (b) {
      b.el.remove();
    });
    s.bolts = [];
    updateFireButtonState();

    playSound(isCorrect ? 'explode-good' : 'explode-bad');
    shakeArena();

    var hitRect = hitColumn.targetEl.getBoundingClientRect();
    var hitX = hitRect.left + hitRect.width / 2;
    var hitY = hitRect.top + hitRect.height / 2;

    if (isCorrect) {
      flashArena();
      burstConfetti(hitX, hitY, 46);
      showShockwave(hitX, hitY, '#7fd88f');
      showFloatingText('CORRECT!', hitX, hitRect.top - 16, 'good');
    } else {
      showShockwave(hitX, hitY, 'var(--danger)');
      showFloatingText('MISSED!', hitX, hitRect.top - 16, 'bad');
    }

    stopBlasterLoop();

    setTimeout(function () {
      showBlasterReveal(clueIndex);
    }, 260);
  }

  function showBlasterReveal(clueIndex) {
    var clue = clues[clueIndex];

    document.getElementById('blaster-reveal-title').textContent = clue.title;
    document.getElementById('blaster-reveal-text').textContent = clue.reveal;

    var noteEl = document.getElementById('blaster-reveal-note');
    if (clue.note) {
      noteEl.textContent = clue.note;
      noteEl.classList.remove('hidden');
    } else {
      noteEl.classList.add('hidden');
    }

    var links = renderSourceLinks(clue.sources);
    document.getElementById('blaster-reveal-source').innerHTML = links ? 'Source: ' + links : '';

    var isLastRound = clueIndex === clues.length - 1;
    var tallyEl = document.getElementById('blaster-reveal-tally');
    if (isLastRound) {
      tallyEl.textContent = 'You got ' + blasterCorrectCount + ' of ' + clues.length + ' right in the Blaster round — nice work either way.';
      tallyEl.classList.remove('hidden');
    } else {
      tallyEl.classList.add('hidden');
    }

    var nextBtn = document.getElementById('btn-blaster-next');
    nextBtn.textContent = isLastRound ? 'Proceed to Verdict' : 'Read Clue ' + (clueIndex + 2);

    document.getElementById('blaster-reveal').classList.remove('hidden');
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
    wireBlasterControls();

    document.getElementById('btn-start').addEventListener('click', function () {
      currentClueIndex = 0;
      showClueBriefing(0);
      showScreen('screen-briefing');
    });

    // Read clue N, then play round N — every clue's briefing button leads
    // into that same clue's Blaster round. The full how-to-play intro only
    // shows once, before round 1; later rounds skip straight to the arena.
    document.getElementById('btn-start-blaster').addEventListener('click', function () {
      showScreen('screen-blaster');
      if (currentClueIndex === 0) {
        document.getElementById('blaster-intro').classList.remove('hidden');
        document.getElementById('blaster-play-wrap').classList.add('hidden');
      } else {
        document.getElementById('blaster-intro').classList.add('hidden');
        document.getElementById('blaster-play-wrap').classList.remove('hidden');
        startBlasterRound(currentClueIndex);
      }
    });

    document.getElementById('btn-blaster-start-round').addEventListener('click', function () {
      blasterCorrectCount = 0;
      blasterRoundsAnswered = 0;
      updateBlasterScore();
      document.getElementById('blaster-intro').classList.add('hidden');
      document.getElementById('blaster-play-wrap').classList.remove('hidden');
      startBlasterRound(0);
    });

    document.getElementById('btn-blaster-fire').addEventListener('click', fireBolt);

    document.getElementById('btn-blaster-next').addEventListener('click', function () {
      currentClueIndex++;
      if (currentClueIndex >= clues.length) {
        currentCase = 0;
        renderCase(currentCase);
        showScreen('screen-verdict');
      } else {
        showClueBriefing(currentClueIndex);
        showScreen('screen-briefing');
      }
    });

    document.getElementById('btn-reveal-debate').addEventListener('click', function () {
      document.getElementById('debate-reveal').classList.remove('hidden');
    });

    document.getElementById('btn-next-case').addEventListener('click', goToNextCase);

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

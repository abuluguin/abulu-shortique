/* =====================================================================
   ABULU SHORTIQUE - WEBSITE CODE
   ---------------------------------------------------------------------
   You do NOT need to edit this file to update the website.
   All content lives in js/data.js. This file only reads that data and
   builds the page from it.

   Layout of this file:
     1. Small helper functions
     2. Numbers worked out from your data
     3. One function per page section  (hero, shorts, characters ...)
     4. Menu, scroll effects, extras
     5. Start-up (runs everything)
   ===================================================================== */
(function () {
  'use strict';

  /* ---------------------------------------------------------------
     1. HELPERS
     --------------------------------------------------------------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  // Make an element:  h('div', {class:'x', text:'Hello'}, [child1, child2])
  function h(tag, attrs, kids) {
    var node = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      var v = attrs[k];
      if (v === null || v === undefined || v === false) return;
      if (k === 'text') node.textContent = v;
      else if (k === 'class') node.className = v;
      else if (k.slice(0, 2) === 'on') node.addEventListener(k.slice(2), v);
      else node.setAttribute(k, v === true ? '' : v);
    });
    (kids || []).forEach(function (kid) { if (kid) node.appendChild(typeof kid === 'string' ? document.createTextNode(kid) : kid); });
    return node;
  }

  function fmtNum(n) { return Number(n).toLocaleString('en-US'); }

  // "2026-10-29" -> "29 Oct 2026"  (no timezone surprises)
  function fmtDate(str) {
    if (!str) return '';
    var d = /^\d{4}-\d{2}-\d{2}$/.test(str) ? new Date(str + 'T12:00:00') : new Date(str);
    if (isNaN(d)) return '';
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  function durToSec(s) {
    var p = String(s || '0:0').split(':').map(Number);
    return (p[0] || 0) * 60 + (p[1] || 0);
  }

  function toast(msg) {
    var t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { t.classList.remove('show'); }, 3200);
  }

  function reduceMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /* ---------------------------------------------------------------
     2. NUMBERS WORKED OUT FROM data.js
     --------------------------------------------------------------- */
  var history = FOLLOWER_HISTORY.slice().sort(function (a, b) { return new Date(a.date) - new Date(b.date); });
  var followers = (SITE.followersOverride !== null && SITE.followersOverride !== undefined)
    ? SITE.followersOverride
    : (history.length ? history[history.length - 1].followers : 0);

  var milestonesSorted = MILESTONES.slice().sort(function (a, b) { return a.followers - b.followers; });
  var nextMilestone = milestonesSorted.filter(function (m) { return m.followers > followers; })[0] || null;
  var prevMilestone = milestonesSorted.filter(function (m) { return m.followers <= followers; }).pop() || null;

  // Newest Short = the LAST one in the SHORTS list in data.js
  var shortsOldestFirst = SHORTS.slice();
  var shortsNewestFirst = SHORTS.slice().reverse();
  function shortNumber(s) { return shortsOldestFirst.indexOf(s) + 1; }
  function shortById(id) { return SHORTS.filter(function (s) { return s.id === id; })[0]; }

  /* ---------------------------------------------------------------
     3a. HERO
     --------------------------------------------------------------- */
  function buildHero() {
    var numEl = $('#heroFollowers');
    countUp(numEl, followers);

    var todo = nextMilestone ? nextMilestone.followers - followers : 0;
    $('#heroFollowText').textContent = followers === 0
      ? 'Be the very first follower in history.'
      : 'The most important ' + fmtNum(followers) + ' follower' + (followers === 1 ? '' : 's') + ' in history.';

    if (nextMilestone) {
      var from = prevMilestone ? prevMilestone.followers : 0;
      var pct = Math.max(4, Math.min(100, ((followers - from) / (nextMilestone.followers - from)) * 100));
      setTimeout(function () { $('#heroBar').style.width = pct + '%'; }, 300);
      $('#heroNext').textContent = fmtNum(todo) + ' more to unlock ' + fmtNum(nextMilestone.followers) + ' followers';
    } else {
      $('#heroBar').style.width = '100%';
      $('#heroNext').textContent = 'Every milestone unlocked!';
    }

    // Follow button: first social link you filled in, otherwise "Suggest a Short"
    var firstLink = firstSocial();
    var btn = $('#followBtn');
    if (firstLink) {
      btn.textContent = 'Follow on ' + firstLink.label;
      btn.href = firstLink.url;
      btn.target = '_blank';
    }

    var latest = shortsNewestFirst[0];
    if (latest) {
      var img = $('#heroThumb');
      img.src = latest.thumbnail;
      img.alt = 'Thumbnail of ' + latest.title;
      $('#heroTitle').textContent = latest.title;
      $('#heroMeta').textContent = latest.duration + ' · tap to watch';
      $('#heroPhone').addEventListener('click', function () { openShort(latest.id); });
    }
  }

  function countUp(el, target) {
    if (reduceMotion() || target < 2) { el.textContent = fmtNum(target); return; }
    var start = null, dur = 1200;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min(1, (ts - start) / dur);
      el.textContent = fmtNum(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function socialList() {
    var L = SITE.links || {};
    return [
      { label: 'WhatsApp', url: L.whatsappChannel },
      { label: 'YouTube', url: L.youtube },
      { label: 'TikTok', url: L.tiktok },
      { label: 'Instagram', url: L.instagram },
      { label: 'Facebook', url: L.facebook }
    ].filter(function (x) { return x.url; });
  }
  function firstSocial() { return socialList()[0] || null; }

  /* ---------------------------------------------------------------
     3b. TICKER
     --------------------------------------------------------------- */
  function buildTicker() {
    var track = $('#tickerTrack');
    // list is added twice so the scroll loops with no gap
    TICKER.concat(TICKER).forEach(function (line) { track.appendChild(h('span', { text: line })); });
  }

  /* ---------------------------------------------------------------
     3c. SHORTS GALLERY
     --------------------------------------------------------------- */
  var activeFilter = 'all';
  var FILTERS = [
    { id: 'all', label: 'All' },
    { id: 'fan', label: 'Fan' },
    { id: 'duck', label: 'Duck 🦆' },
    { id: 'milestone', label: 'Milestones' },
    { id: 'special', label: 'Special' }
  ];

  function buildShorts() {
    $('#shortsSub').textContent = SHORTS.length + ' Shorts and counting. Tap any Short to watch it right here.';
    var box = $('#shortFilters');
    FILTERS.forEach(function (f) {
      var count = f.id === 'all' ? SHORTS.length : SHORTS.filter(function (s) { return (s.tags || []).indexOf(f.id) > -1; }).length;
      if (f.id !== 'all' && count === 0) return;           // hide empty filters
      box.appendChild(h('button', {
        class: 'chip', type: 'button', 'aria-pressed': f.id === activeFilter ? 'true' : 'false', 'data-f': f.id,
        text: f.label + ' (' + count + ')',
        onclick: function () { activeFilter = f.id; $$('.chip', box).forEach(function (c) { c.setAttribute('aria-pressed', c.getAttribute('data-f') === f.id ? 'true' : 'false'); }); renderShorts(); }
      }));
    });
    renderShorts();
  }

  function renderShorts() {
    var grid = $('#shortsGrid');
    grid.innerHTML = '';
    var list = shortsNewestFirst.filter(function (s) { return activeFilter === 'all' || (s.tags || []).indexOf(activeFilter) > -1; });
    if (!list.length) { grid.appendChild(h('p', { class: 'empty', text: 'Nothing here yet.' })); return; }

    list.forEach(function (s, i) {
      var isNewest = s === shortsNewestFirst[0];
      var metaBits = [];
      if (s.views !== null && s.views !== undefined) metaBits.push(h('span', { text: '👁 ' + fmtNum(s.views) + ' views' }));
      if (s.date) metaBits.push(h('span', { text: fmtDate(s.date) }));

      var card = h('button', { class: 'short reveal', type: 'button', 'aria-label': 'Watch ' + s.title, onclick: function () { openShort(s.id); } }, [
        h('span', { class: 'short-thumb' }, [
          h('img', { src: s.thumbnail, alt: 'Thumbnail for ' + s.title, loading: 'lazy', width: '360', height: '640' }),
          h('span', { class: 'short-num', text: '#' + shortNumber(s) }),
          isNewest ? h('span', { class: 'short-new', text: 'NEW' }) : null,
          h('span', { class: 'short-dur', text: s.duration || '' }),
          h('span', { class: 'short-play', 'aria-hidden': 'true', html: null }, [svgPlay()])
        ]),
        h('span', { class: 'short-body' }, [
          s.milestone ? h('span', { class: 'badge', text: s.milestone }) : null,
          h('h3', { class: 'short-title', text: s.title }),
          h('p', { class: 'short-desc', text: s.description }),
          metaBits.length ? h('span', { class: 'short-meta' }, metaBits) : null,
          h('span', { class: 'short-watch', text: '▶ Watch' })
        ])
      ]);
      card.style.transitionDelay = Math.min(i, 8) * 40 + 'ms';
      grid.appendChild(card);
    });
    observeReveal();
  }

  function svgPlay() {
    var ns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    var p = document.createElementNS(ns, 'path');
    p.setAttribute('d', 'M8 5v14l11-7z');
    svg.appendChild(p);
    return svg;
  }

  /* ---------------------------------------------------------------
     3d. VIDEO POP-UP
     --------------------------------------------------------------- */
  var modal, vid, currentId = null, lastFocus = null;

  function openShort(id) {
    var s = shortById(id);
    if (!s) return;

    // No video file on this site? Send the visitor to the platform link.
    if (!s.video) {
      if (s.watchUrl) { window.open(s.watchUrl, '_blank', 'noopener'); }
      else { toast('This Short is coming soon!'); }
      return;
    }

    currentId = id;
    lastFocus = document.activeElement;
    $('#modalTitle').textContent = s.title;
    $('#modalDesc').textContent = s.description;
    var meta = ['Short #' + shortNumber(s), s.duration];
    if (s.date) meta.push(fmtDate(s.date));
    if (s.views !== null && s.views !== undefined) meta.push(fmtNum(s.views) + ' views');
    $('#modalMeta').textContent = meta.filter(Boolean).join(' · ');

    var ext = $('#modalExternal');
    if (s.watchUrl) { ext.href = s.watchUrl; ext.hidden = false; } else { ext.hidden = true; }

    vid.poster = s.thumbnail;
    vid.src = s.video;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    var p = vid.play();
    if (p && p.catch) p.catch(function () { /* autoplay blocked: viewer taps play */ });
    $('.modal-x', modal).focus();

    var idx = shortsNewestFirst.indexOf(s);
    $('#prevShort').disabled = idx === 0;
    $('#nextShort').disabled = idx === shortsNewestFirst.length - 1;
    $('#prevShort').style.opacity = idx === 0 ? .4 : 1;
    $('#nextShort').style.opacity = idx === shortsNewestFirst.length - 1 ? .4 : 1;
  }

  function closeModal() {
    if (modal.hidden) return;
    vid.pause();
    vid.removeAttribute('src');
    vid.load();
    modal.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function stepShort(dir) {
    var idx = shortsNewestFirst.indexOf(shortById(currentId)) + dir;
    var target = shortsNewestFirst[idx];
    while (target && !target.video) { idx += dir; target = shortsNewestFirst[idx]; }
    if (target) openShort(target.id);
  }

  function initModal() {
    modal = $('#modal');
    vid = $('#modalVideo');
    $$('[data-close]', modal).forEach(function (n) { n.addEventListener('click', closeModal); });
    $('#prevShort').addEventListener('click', function () { stepShort(-1); });
    $('#nextShort').addEventListener('click', function () { stepShort(1); });
    document.addEventListener('keydown', function (e) {
      if (modal.hidden) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') stepShort(-1);
      if (e.key === 'ArrowRight') stepShort(1);
      if (e.key === 'Tab') {                          // keep keyboard focus inside the pop-up
        var f = $$('button:not([disabled]), a[href], video', modal).filter(function (n) { return !n.hidden && n.offsetParent !== null; });
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* ---------------------------------------------------------------
     3e. CHARACTERS
     --------------------------------------------------------------- */
  function buildCharacters() {
    var grid = $('#charsGrid');
    CHARACTERS.forEach(function (c) {
      var appears = (c.appearsIn || []).map(shortById).filter(Boolean);
      var card = h('article', { class: 'char reveal ' + (c.color || 'pink') }, [
        h('div', { class: 'char-img' }, [
          h('img', { src: c.image, alt: c.imageAlt || c.name, loading: 'lazy', width: '480', height: '600' }),
          h('span', { class: 'char-emoji', 'aria-hidden': 'true', text: c.emoji })
        ]),
        h('div', { class: 'char-body' }, [
          h('p', { class: 'char-role', text: c.role }),
          h('h3', { class: 'char-name', text: c.name }),
          h('p', { class: 'char-tag', text: c.tagline }),
          h('p', { class: 'muted', text: c.bio }),
          h('ul', { class: 'traits' }, (c.traits || []).map(function (t) { return h('li', { text: t }); })),
          h('p', { class: 'quote', text: c.catchphrase }),
          appears.length ? h('p', { class: 'appears-title', text: 'Seen in' }) : null,
          appears.length ? h('div', { class: 'appears' }, appears.map(function (s) {
            return h('button', { type: 'button', text: s.title, onclick: function () { openShort(s.id); } });
          })) : null
        ])
      ]);
      grid.appendChild(card);
    });
  }

  /* ---------------------------------------------------------------
     3f. FAN IDEAS
     --------------------------------------------------------------- */
  var STATUS = {
    idea:    { icon: '💡', label: 'Idea' },
    planned: { icon: '📋', label: 'Planned' },
    making:  { icon: '🎬', label: 'In production' },
    made:    { icon: '✅', label: 'Made!' }
  };

  function buildIdeas() {
    var list = $('#ideasList');
    var order = { making: 0, planned: 1, idea: 2, made: 3 };
    FAN_IDEAS.slice().sort(function (a, b) { return (order[a.status] || 0) - (order[b.status] || 0); }).forEach(function (i) {
      var st = STATUS[i.status] || STATUS.idea;
      var made = i.shortId ? shortById(i.shortId) : null;
      list.appendChild(h('article', { class: 'idea reveal' }, [
        h('span', { class: 'idea-ico', 'aria-hidden': 'true', text: st.icon }),
        h('div', {}, [
          h('p', { class: 'idea-text' }, [i.idea, h('span', { class: 'status ' + (i.status || 'idea'), text: st.label })]),
          h('p', { class: 'idea-from', text: 'Suggested by ' + (i.from || 'a fan') }),
          made ? h('button', { class: 'idea-link', type: 'button', text: 'Watch it: ' + made.title, onclick: function () { openShort(made.id); } }) : null
        ])
      ]));
    });

    // Buttons under the form
    var inbox = SITE.ideaInbox || {};
    var btns = $('#ideaButtons'), note = $('#ideaNote');
    var hasRepo = inbox.githubRepo && inbox.githubRepo.indexOf('/') > 0;

    if (hasRepo) btns.appendChild(h('button', { class: 'btn btn-primary', type: 'button', text: 'Send via GitHub', onclick: function () { sendIdea('github'); } }));
    if (inbox.email) btns.appendChild(h('button', { class: hasRepo ? 'btn btn-ghost' : 'btn btn-primary', type: 'button', text: 'Send by email', onclick: function () { sendIdea('email'); } }));
    if (!hasRepo && !inbox.email) {
      btns.appendChild(h('button', { class: 'btn btn-primary', type: 'button', text: 'Copy my idea', onclick: function () { sendIdea('copy'); } }));
      var fl = firstSocial();
      note.textContent = 'Copy your idea and paste it in a comment' + (fl ? ' on our ' + fl.label + ' channel' : ' on our latest Short') + '. We read them all.';
    } else {
      note.textContent = 'Your idea opens ready to send. Nothing is stored on this website.';
    }
    $('#ideaForm').addEventListener('submit', function (e) { e.preventDefault(); });
  }

  function sendIdea(how) {
    var text = $('#ideaText').value.trim();
    var name = $('#ideaName').value.trim() || 'A fan';
    if (text.length < 5) { toast('Write your idea first 🙂'); $('#ideaText').focus(); return; }
    var inbox = SITE.ideaInbox || {};
    var body = 'Idea: ' + text + '\n\nFrom: ' + name;
    if (how === 'github') {
      window.open('https://github.com/' + inbox.githubRepo + '/issues/new?title=' + encodeURIComponent('Short idea: ' + text.slice(0, 60)) + '&body=' + encodeURIComponent(body), '_blank', 'noopener');
    } else if (how === 'email') {
      window.location.href = 'mailto:' + inbox.email + '?subject=' + encodeURIComponent('ABULU Shortique idea') + '&body=' + encodeURIComponent(body);
    } else if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(body).then(function () { toast('Copied! Paste it in a comment 🦆'); }, function () { toast('Could not copy. Select the text and copy it.'); });
    } else {
      toast('Select your text and copy it.');
    }
  }

  /* ---------------------------------------------------------------
     3g. MILESTONES
     --------------------------------------------------------------- */
  function shortNum(n) {
    if (n >= 1000000) return (n / 1000000) + 'M';
    if (n >= 1000) return (n / 1000) + 'K';
    return String(n);
  }

  function buildMilestones() {
    var done = milestonesSorted.filter(function (m) { return m.followers <= followers; }).length;
    $('#msSub').textContent = done + ' of ' + milestonesSorted.length + ' milestones unlocked.' +
      (nextMilestone ? ' Next stop: ' + fmtNum(nextMilestone.followers) + ' followers.' : ' You did it. All of them.');

    var grid = $('#msGrid');
    milestonesSorted.forEach(function (m) {
      var isDone = m.followers <= followers;
      var isNext = nextMilestone && m === nextMilestone;
      var s = m.shortId ? shortById(m.shortId) : null;
      grid.appendChild(h('article', { class: 'ms reveal ' + (isDone ? 'done' : isNext ? 'next' : 'locked') }, [
        h('div', { class: 'ms-num', text: shortNum(m.followers) }),
        h('div', {}, [
          h('h3', { class: 'ms-title', text: m.title }),
          h('p', { class: 'ms-note', text: m.note }),
          h('p', { class: 'ms-state', text: isDone ? '✓ Unlocked' : isNext ? fmtNum(m.followers - followers) + ' to go' : '🔒 ' + fmtNum(m.followers) + ' followers' }),
          s ? h('button', { class: 'ms-link', type: 'button', text: 'Watch: ' + s.title, onclick: function () { openShort(s.id); } }) : null
        ])
      ]));
    });
  }

  /* ---------------------------------------------------------------
     3h. CHANNEL STATS
     --------------------------------------------------------------- */
  function buildStats() {
    var viewsKnown = SHORTS.filter(function (s) { return s.views !== null && s.views !== undefined; });
    var totalViews = viewsKnown.reduce(function (a, s) { return a + s.views; }, 0);
    var secs = SHORTS.reduce(function (a, s) { return a + durToSec(s.duration); }, 0);
    var days = Math.max(1, Math.floor((Date.now() - new Date(SITE.launchDate + 'T00:00:00+08:00').getTime()) / 86400000) + 1);
    var first = history.length ? history[0].followers : followers;
    var growth = followers - first;
    var latest = shortsNewestFirst[0];

    var tiles = [
      { v: fmtNum(followers), l: 'Followers', n: growth > 0 ? '+' + fmtNum(growth) + ' since first reading' : 'and counting' },
      { v: fmtNum(SHORTS.length), l: 'Shorts', n: Math.floor(secs / 60) + ' min of chaos' },
      { v: viewsKnown.length ? fmtNum(totalViews) : '—', l: 'Total views', n: viewsKnown.length ? 'across ' + viewsKnown.length + ' Shorts' : 'view counts coming soon' },
      { v: fmtNum(days), l: 'Days on air', n: 'since ' + fmtDate(SITE.launchDate) },
      { v: nextMilestone ? fmtNum(nextMilestone.followers - followers) : '0', l: 'To next milestone', n: nextMilestone ? nextMilestone.title : 'all unlocked' },
      { v: '2', l: 'Characters', n: 'Fan and Duck' },
      { v: latest && latest.date ? fmtDate(latest.date).replace(/ \d{4}$/, '') : '—', l: 'Latest upload', n: latest ? latest.title : '' },
      { v: fmtNum(MILESTONES.filter(function (m) { return m.followers <= followers; }).length), l: 'Milestones', n: 'of ' + MILESTONES.length + ' unlocked' }
    ];
    var grid = $('#statsGrid');
    tiles.forEach(function (t) {
      grid.appendChild(h('div', { class: 'stat reveal' }, [
        h('div', { class: 'stat-v', text: t.v }),
        h('p', { class: 'stat-l', text: t.l }),
        h('p', { class: 'stat-n', text: t.n })
      ]));
    });
    $('#statsSub').textContent = 'Updated by hand, so the numbers can be a little behind the real thing.';
  }

  /* ---------- follower growth chart (plain SVG, no libraries) ---------- */
  var NS = 'http://www.w3.org/2000/svg';
  function svgEl(name, attrs) {
    var n = document.createElementNS(NS, name);
    Object.keys(attrs || {}).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    return n;
  }

  function drawChart() {
    var host = $('#chart');
    host.innerHTML = '';
    host.classList.remove('drawn');
    var pts = history.map(function (p) { return { t: new Date(p.date).getTime(), v: p.followers }; }).filter(function (p) { return !isNaN(p.t); });
    if (!pts.length) { host.appendChild(h('p', { class: 'muted', text: 'Add rows to FOLLOWER_HISTORY in data.js to see the chart.' })); return; }

    var W = Math.max(280, host.clientWidth), H = host.clientHeight || 300;
    var m = { l: 38, r: 18, t: 18, b: 34 };
    var tMin = pts[0].t, tMax = pts[pts.length - 1].t;
    if (tMax === tMin) { tMin -= 3600000; tMax += 3600000; }
    var vMax = Math.max.apply(null, pts.map(function (p) { return p.v; }));
    var step = niceStep(vMax / 4);
    var yMax = Math.max(step * 4, Math.ceil((vMax * 1.15) / step) * step);
    function X(t) { return m.l + ((t - tMin) / (tMax - tMin)) * (W - m.l - m.r); }
    function Y(v) { return H - m.b - (v / yMax) * (H - m.t - m.b); }

    var svg = svgEl('svg', { viewBox: '0 0 ' + W + ' ' + H, preserveAspectRatio: 'none', 'aria-hidden': 'true' });
    var defs = svgEl('defs');
    var grad = svgEl('linearGradient', { id: 'gArea', x1: 0, y1: 0, x2: 0, y2: 1 });
    grad.appendChild(svgEl('stop', { offset: '0%', 'stop-color': '#ff4fa3', 'stop-opacity': '.38' }));
    grad.appendChild(svgEl('stop', { offset: '100%', 'stop-color': '#ff4fa3', 'stop-opacity': '0' }));
    defs.appendChild(grad); svg.appendChild(defs);

    // horizontal grid + y labels
    for (var v = 0; v <= yMax + 0.001; v += step) {
      svg.appendChild(svgEl('line', { class: 'grid', x1: m.l, x2: W - m.r, y1: Y(v), y2: Y(v) }));
      var tl = svgEl('text', { class: 'ax', x: m.l - 8, y: Y(v) + 4, 'text-anchor': 'end' }); tl.textContent = fmtNum(v); svg.appendChild(tl);
    }
    // milestone guide lines that fall inside the chart
    milestonesSorted.forEach(function (ms) {
      if (ms.followers > 0 && ms.followers < yMax && ms.followers % step !== 0) {
        svg.appendChild(svgEl('line', { class: 'msline', x1: m.l, x2: W - m.r, y1: Y(ms.followers), y2: Y(ms.followers) }));
        var mt = svgEl('text', { class: 'mstext', x: W - m.r, y: Y(ms.followers) - 4, 'text-anchor': 'end' }); mt.textContent = ms.title; svg.appendChild(mt);
      }
    });
    // x labels
    var span = tMax - tMin, nLab = W < 420 ? 3 : 5;
    for (var i = 0; i < nLab; i++) {
      var tt = tMin + (span * i) / (nLab - 1);
      var d = new Date(tt);
      var lab = span < 172800000
        ? d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) + ' ' + d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
        : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
      var xl = svgEl('text', { class: 'ax', x: X(tt), y: H - 10, 'text-anchor': i === 0 ? 'start' : i === nLab - 1 ? 'end' : 'middle' });
      xl.textContent = lab; svg.appendChild(xl);
    }

    var lineD = pts.map(function (p, i) { return (i ? 'L' : 'M') + X(p.t).toFixed(1) + ' ' + Y(p.v).toFixed(1); }).join(' ');
    var areaD = lineD + ' L' + X(pts[pts.length - 1].t).toFixed(1) + ' ' + Y(0) + ' L' + X(pts[0].t).toFixed(1) + ' ' + Y(0) + ' Z';
    svg.appendChild(svgEl('path', { d: areaD, fill: 'url(#gArea)' }));
    var line = svgEl('path', { class: 'line', d: lineD });
    svg.appendChild(line);

    var dots = pts.map(function (p) {
      var c = svgEl('circle', { class: 'pt', cx: X(p.t), cy: Y(p.v), r: 5 });
      svg.appendChild(c); return c;
    });
    host.appendChild(svg);
    try { line.style.setProperty('--len', Math.ceil(line.getTotalLength()) + 2); } catch (e) { /* ignore */ }
    $('#chartNote').textContent = pts.length + ' readings · latest: ' + fmtNum(pts[pts.length - 1].v) + ' followers';
    host.setAttribute('aria-label', 'Line chart of follower growth. Latest value ' + pts[pts.length - 1].v + ' followers.');

    // hover / touch tooltip
    var tip = $('#chartTip'), card = host.parentElement;
    function show(clientX) {
      var r = host.getBoundingClientRect();
      var x = (clientX - r.left) * (W / r.width);
      var best = 0;
      pts.forEach(function (p, i) { if (Math.abs(X(p.t) - x) < Math.abs(X(pts[best].t) - x)) best = i; });
      dots.forEach(function (d, i) { d.classList.toggle('on', i === best); });
      var p = pts[best], cr = card.getBoundingClientRect();
      tip.textContent = fmtNum(p.v) + ' followers · ' + new Date(p.t).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
      tip.hidden = false;
      tip.style.left = (r.left - cr.left + (X(p.t) / W) * r.width) + 'px';
      tip.style.top = (r.top - cr.top + (Y(p.v) / H) * r.height) + 'px';
    }
    function hide() { tip.hidden = true; dots.forEach(function (d) { d.classList.remove('on'); }); }
    host.onpointermove = function (e) { show(e.clientX); };
    host.onpointerdown = function (e) { show(e.clientX); };
    host.onpointerleave = hide;

    if (reduceMotion()) host.classList.add('drawn');
    else if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { host.classList.add('drawn'); io.disconnect(); } }, { threshold: .3 });
      io.observe(host);
    } else host.classList.add('drawn');
  }

  function niceStep(raw) {
    if (raw <= 1) return 1;
    var mag = Math.pow(10, Math.floor(Math.log10(raw)));
    var n = raw / mag;
    return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * mag;
  }

  /* ---------------------------------------------------------------
     3i. WHAT'S NEW + FOOTER
     --------------------------------------------------------------- */
  function buildReleases() {
    var box = $('#releases');
    RELEASES.forEach(function (r) {
      box.appendChild(h('article', { class: 'release reveal' }, [
        h('h4', {}, [h('span', { class: 'v', text: 'v' + r.version }), r.title]),
        h('time', { text: r.date }),
        h('ul', {}, r.items.map(function (t) { return h('li', { text: t }); }))
      ]));
    });
  }

  function buildFooter() {
    $('#year').textContent = new Date().getFullYear();
    var box = $('#socialLinks');
    var list = socialList();
    if (!list.length) { box.hidden = true; return; }
    list.forEach(function (s) { box.appendChild(h('a', { href: s.url, target: '_blank', rel: 'noopener', text: s.label })); });
  }

  /* ---------------------------------------------------------------
     4. MENU, SCROLL EFFECTS, EXTRAS
     --------------------------------------------------------------- */
  function initMenu() {
    var burger = $('#burger'), nav = $('#nav');
    function setOpen(open) {
      nav.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
    burger.addEventListener('click', function () { setOpen(!nav.classList.contains('open')); });
    $$('a', nav).forEach(function (a) { a.addEventListener('click', function () { setOpen(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
    document.addEventListener('click', function (e) { if (!nav.contains(e.target) && !burger.contains(e.target)) setOpen(false); });

    // highlight the link for the section you are looking at
    if ('IntersectionObserver' in window) {
      var links = {};
      $$('a', nav).forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting && links[en.target.id]) {
            Object.keys(links).forEach(function (k) { links[k].classList.remove('active'); });
            links[en.target.id].classList.add('active');
          }
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      Object.keys(links).forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
    }
  }

  var revealIO = null;
  function observeReveal() {
    var items = $$('.reveal:not(.in)');
    if (!('IntersectionObserver' in window) || reduceMotion()) { items.forEach(function (n) { n.classList.add('in'); }); return; }
    if (!revealIO) {
      revealIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); revealIO.unobserve(en.target); } });
      }, { threshold: .08, rootMargin: '0px 0px -30px 0px' });
    }
    items.forEach(function (n) { revealIO.observe(n); });
  }

  // A tiny surprise for curious visitors. (Shh.)
  function initSecrets() {
    var spot = $('#year'), taps = 0, timer = null;
    if (!spot) return;
    spot.style.cursor = 'default';
    spot.addEventListener('click', function () {
      taps++;
      clearTimeout(timer);
      timer = setTimeout(function () { taps = 0; }, 1300);
      if (taps >= 3) { taps = 0; releaseTheDuck(); }
    });
  }

  function releaseTheDuck() {
    toast('You found the duck. It was never lost. 🦆');
    quack();
    if (reduceMotion()) return;
    var d = h('div', { class: 'waddle', 'aria-hidden': 'true' }, [h('span', { text: '🦆' })]);
    document.body.appendChild(d);
    setTimeout(function () { d.remove(); }, 5400);
  }

  function quack() {
    try {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      var ctx = new AC(), now = ctx.currentTime;
      [0, .17].forEach(function (off) {
        var o = ctx.createOscillator(), g = ctx.createGain();
        o.type = 'sawtooth';
        o.frequency.setValueAtTime(520, now + off);
        o.frequency.exponentialRampToValueAtTime(300, now + off + .12);
        g.gain.setValueAtTime(.0001, now + off);
        g.gain.exponentialRampToValueAtTime(.18, now + off + .02);
        g.gain.exponentialRampToValueAtTime(.0001, now + off + .14);
        o.connect(g); g.connect(ctx.destination);
        o.start(now + off); o.stop(now + off + .16);
      });
      setTimeout(function () { ctx.close(); }, 800);
    } catch (e) { /* sound is optional */ }
  }

  /* ---------------------------------------------------------------
     5. START-UP
     --------------------------------------------------------------- */
  function init() {
    buildHero();
    buildTicker();
    buildShorts();
    buildCharacters();
    buildIdeas();
    buildMilestones();
    buildStats();
    drawChart();
    buildReleases();
    buildFooter();
    initModal();
    initMenu();
    initSecrets();
    observeReveal();

    var rt;
    window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(drawChart, 150); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();

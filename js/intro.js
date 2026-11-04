/* =====================================================================
   ABULU SHORTIQUE - INTRO VIDEO
   Plays over the website on every visit and refresh. Skip, or the end of
   the video, opens the box flaps to reveal the site. The "Intro" button
   in the header plays it again. To change the video, replace
   videos/intro.mp4.
   ===================================================================== */
(function () {
  'use strict';

  var overlay = document.getElementById('intro');
  var video = document.getElementById('introVideo');
  var skip = document.getElementById('introSkip');
  var sound = document.getElementById('introSound');
  var replay = document.getElementById('introReplay');
  if (!overlay || !video || !skip || !sound || !replay) return;

  var OPEN_MS = 1050;     // how long the flaps take to open
  var START_LIMIT = 6000; // never make people wait for a slow video
  var active = false, closing = false, returnFocus = null, watchdog = null;

  // Everything behind the intro stops being clickable and tabbable.
  function setBackgroundInert(on) {
    Array.prototype.forEach.call(document.body.children, function (node) {
      if (node !== overlay && node.tagName !== 'SCRIPT') node.inert = on;
    });
  }

  function open() {
    if (closing) return;
    active = true;
    overlay.classList.remove('opening');
    overlay.hidden = false;
    document.documentElement.classList.add('intro-open');
    setBackgroundInert(true);
    sound.hidden = true;
    skip.focus({ preventScroll: true });

    clearTimeout(watchdog);
    watchdog = setTimeout(function () { if (video.paused || video.readyState < 2) finish(); }, START_LIMIT);

    try { video.currentTime = 0; } catch (e) { /* not loaded yet: it starts at 0 anyway */ }

    // Try with sound first. Browsers often refuse that until the visitor has
    // clicked something, so fall back to silent with a "Tap for sound" button.
    video.muted = false;
    var playing = video.play();
    if (playing && playing.catch) {
      playing.catch(function () {
        if (!active || closing) return;
        video.muted = true;
        sound.hidden = false;
        var silent = video.play();
        if (silent && silent.catch) silent.catch(function () { finish(); });
      });
    }
  }

  function finish() {
    if (!active || closing) return;
    closing = true;
    clearTimeout(watchdog);
    video.pause();
    overlay.classList.add('opening');
    setTimeout(function () {
      overlay.hidden = true;
      overlay.classList.remove('opening');
      document.documentElement.classList.remove('intro-open');
      setBackgroundInert(false);
      active = false;
      closing = false;
      if (returnFocus) { returnFocus.focus({ preventScroll: true }); returnFocus = null; }
    }, OPEN_MS);
  }

  video.addEventListener('ended', finish);
  video.addEventListener('error', finish);
  skip.addEventListener('click', finish);
  sound.addEventListener('click', function () {
    video.muted = false;
    sound.hidden = true;
    skip.focus({ preventScroll: true });
  });
  replay.addEventListener('click', function () {
    returnFocus = replay;
    open();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && active) finish();
  });

  // First visit / refresh: the small script in index.html has already shown it.
  if (!overlay.hidden) open();
})();

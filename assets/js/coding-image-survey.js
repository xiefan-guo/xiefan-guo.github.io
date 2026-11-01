(function () {
  'use strict';
  function revealTarget() {
    var id;
    try { id = decodeURIComponent(window.location.hash.slice(1)); }
    catch (_) { return; }
    var target = document.getElementById(id);
    if (!target) return;
    var parent = target.parentElement;
    var revealed = false;
    while (parent) {
      if (parent.tagName === 'DETAILS' && !parent.open) {
        parent.open = true;
        revealed = true;
      }
      parent = parent.parentElement;
    }
    if (revealed) requestAnimationFrame(function () { target.scrollIntoView({ block: 'start' }); });
  }
  window.addEventListener('hashchange', revealTarget);
  document.addEventListener('click', function (event) {
    var anchor = event.target.closest('a[href^="#"]');
    if (anchor && anchor.hash === window.location.hash) requestAnimationFrame(revealTarget);
  });
  revealTarget();
})();

(() => {
  document.querySelectorAll('.article .article-toc').forEach((toc) => {
    let hideTimer;

    toc.addEventListener('scroll', () => {
      toc.classList.add('is-scrolling');
      window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(() => {
        toc.classList.remove('is-scrolling');
      }, 800);
    }, { passive: true });
  });
})();

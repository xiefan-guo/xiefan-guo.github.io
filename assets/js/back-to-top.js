(() => {
  const link = document.querySelector('.back-to-top');
  if (!link) return;

  let scheduled = false;
  const updateVisibility = () => {
    link.classList.toggle('is-hidden', window.scrollY < 400);
    scheduled = false;
  };

  window.addEventListener('scroll', () => {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(updateVisibility);
  }, { passive: true });
  window.addEventListener('pageshow', updateVisibility);
  updateVisibility();

  link.addEventListener('click', (event) => {
    event.preventDefault();
    // Return keyboard navigation to the header before the control disappears.
    document.querySelector('.wordmark')?.focus({ preventScroll: true });
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    });
  });
})();

(() => {
  const button = document.getElementById('newsToggle');
  if (!button) return;

  const earlierNews = document.querySelectorAll('#newsList .extra');

  button.addEventListener('click', () => {
    const expanded = button.dataset.state === 'expanded';
    earlierNews.forEach((item) => item.classList.toggle('hidden', expanded));
    button.dataset.state = expanded ? 'collapsed' : 'expanded';
    button.textContent = expanded ? 'Show earlier news' : 'Hide earlier news';
  });
})();

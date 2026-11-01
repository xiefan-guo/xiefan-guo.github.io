(function () {
  'use strict';

  var list = document.getElementById('blogPosts');
  var controls = document.getElementById('blogControls');
  var search = document.getElementById('blogSearch');
  var results = document.getElementById('blogResults');
  var empty = document.getElementById('blogEmpty');
  var reset = document.getElementById('blogReset');

  if (!list || !controls || !search) return;

  var posts = Array.from(list.querySelectorAll('.post-list-item')).map(function (element, index) {
    var title = element.querySelector('.post-list-title');
    var pinned = element.dataset.pinned === 'true';
    var badge = element.querySelector('.blog-pin');
    if (pinned && !badge && title) {
      badge = document.createElement('span');
      badge.className = 'blog-pin';
      badge.textContent = ' Pinned';
      title.insertAdjacentElement('afterend', badge);
    }
    if (badge) badge.hidden = !pinned;

    return {
      element: element,
      index: index,
      pinned: pinned,
      text: (title ? title.textContent : '').toLocaleLowerCase()
    };
  });

  // Move pinned articles first; otherwise preserve the authored order.
  posts.sort(function (a, b) {
    return Number(b.pinned) - Number(a.pinned) || a.index - b.index;
  });
  posts.forEach(function (post) { list.appendChild(post.element); });

  function filterPosts() {
    var words = search.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    var count = 0;
    posts.forEach(function (post) {
      var matches = words.every(function (word) { return post.text.includes(word); });
      post.element.hidden = !matches;
      if (matches) count += 1;
    });
    if (results) results.textContent = count + (count === 1 ? ' article' : ' articles');
    if (empty) empty.hidden = count > 0;
  }

  search.addEventListener('input', filterPosts);
  if (reset) reset.addEventListener('click', function () {
    search.value = '';
    search.focus({ preventScroll: true });
    filterPosts();
  });

  filterPosts();
  controls.hidden = false;
})();

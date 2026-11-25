/* ==========================================================================
   Progressive Enhancement — Xiefan Guo Academic Homepage
   - Earlier News Toggle
   - Papers Category Filter
   - Blog Format Filter (All / Surveys / Notes)
   - Survey Reading Progress Hairline & Scroll-Spy TOC
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initNewsToggle();
  initPaperFilters();
  initBlogFilters();
  initSurveyReader();
});

/* 1. Earlier News Toggle */
function initNewsToggle() {
  const toggleBtn = document.querySelector("[data-news-toggle]");
  if (!toggleBtn) return;

  const archived = document.querySelectorAll(".news-item[data-archive]");
  if (archived.length === 0) {
    toggleBtn.hidden = true;
    return;
  }

  let expanded = false;
  toggleBtn.addEventListener("click", () => {
    expanded = !expanded;
    archived.forEach((item) => item.classList.toggle("is-hidden", !expanded));
    toggleBtn.setAttribute("aria-expanded", String(expanded));
    toggleBtn.textContent = expanded ? "Fewer news" : "Earlier news";
  });
}

/* 2. Papers Category Filter */
function initPaperFilters() {
  const buttons = document.querySelectorAll("[data-paper-filter]");
  if (buttons.length === 0) return;

  const items = document.querySelectorAll(".paper-item");
  const bands = document.querySelectorAll(".book-band[data-year-band]");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.paperFilter;
      buttons.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));

      items.forEach((item) => {
        const tags = (item.dataset.tags || "").split(/\s+/);
        item.classList.toggle("is-hidden", filter !== "all" && !tags.includes(filter));
      });

      bands.forEach((band) => {
        const visible = band.querySelectorAll(".paper-item:not(.is-hidden)").length;
        band.classList.toggle("is-empty", visible === 0);
      });
    });
  });
}

/* 3. Blog Format Filter */
function initBlogFilters() {
  const buttons = document.querySelectorAll("[data-blog-filter]");
  if (buttons.length === 0) return;

  const surveyBand = document.querySelector("[data-blog-band='survey']");
  const noteBand = document.querySelector("[data-blog-band='note']");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const kind = btn.dataset.blogFilter;
      buttons.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));

      if (surveyBand) {
        surveyBand.hidden = kind !== "all" && kind !== "survey";
      }
      if (noteBand) {
        noteBand.hidden = kind !== "all" && kind !== "note";
      }
    });
  });
}

/* 5. Long-Form Survey Reading Progress & TOC Scroll-Spy */
function initSurveyReader() {
  const bar = document.querySelector(".reading-progress");
  const links = Array.from(document.querySelectorAll(".toc-list a[href^='#']"));

  if (bar) {
    const updateBar = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      const pct = total > 0 ? Math.min(100, Math.max(0, (doc.scrollTop / total) * 100)) : 0;
      bar.style.width = `${pct.toFixed(2)}%`;
    };
    window.addEventListener("scroll", updateBar, { passive: true });
    updateBar();
  }

  /* Auto-open collapsed <details> when jumping to a reference/table anchor */
  const revealHashTarget = () => {
    let id = "";
    try {
      id = decodeURIComponent(window.location.hash.slice(1));
    } catch (_) {
      return;
    }
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    let parent = target.parentElement;
    let revealed = false;
    while (parent) {
      if (parent.tagName === "DETAILS" && !parent.open) {
        parent.open = true;
        revealed = true;
      }
      parent = parent.parentElement;
    }
    if (revealed) {
      requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
    }
  };
  window.addEventListener("hashchange", revealHashTarget);
  document.addEventListener("click", (event) => {
    const anchor = event.target.closest("a[href^='#']");
    if (anchor && anchor.hash && anchor.hash === window.location.hash) {
      requestAnimationFrame(revealHashTarget);
    }
  });
  revealHashTarget();

  if (links.length === 0) return;

  const targets = links
    .map((link) => {
      const el = document.getElementById(link.getAttribute("href").slice(1));
      return el ? { link, el } : null;
    })
    .filter(Boolean);

  if (targets.length === 0 || !("IntersectionObserver" in window)) return;

  const markActive = (id) => {
    targets.forEach(({ link, el }) => link.classList.toggle("is-active", el.id === id));
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible.length > 0) {
        markActive(visible[0].target.id);
      }
    },
    { rootMargin: "-10% 0px -70% 0px", threshold: 0 }
  );

  targets.forEach(({ el }) => observer.observe(el));
  markActive(targets[0].el.id);
}

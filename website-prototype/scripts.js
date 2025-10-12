document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const themeToggle = document.querySelector('.theme-toggle');
  const savedTheme = localStorage.getItem('theme') || 'dark';
  root.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  function updateThemeIcon(theme) {
    themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
  }

  themeToggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
  });

  // Mobile menu controls
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const overlay = document.getElementById('navOverlay');

  function openMenu() {
    navMenu.classList.add('active');
    overlay.classList.add('active');
    overlay.hidden = false;
    hamburger.setAttribute('aria-expanded', 'true');
  }
  function closeMenu() {
    navMenu.classList.remove('active');
    overlay.classList.remove('active');
    overlay.hidden = true;
    hamburger.setAttribute('aria-expanded', 'false');
  }
  hamburger.addEventListener('click', () => navMenu.classList.contains('active') ? closeMenu() : openMenu());
  overlay.addEventListener('click', closeMenu);

  // Close on Escape
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

  // Close mobile menu when link clicked
  document.querySelectorAll('.nav-menu a').forEach(a => a.addEventListener('click', () => closeMenu()));

  // Scroll reveal
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = Number(el.dataset.delay || 0);
        setTimeout(() => el.classList.add('fade-in'), delay);
        io.unobserve(el);
      }
    });
  }, { threshold: 0.06 });

  els.forEach(e => io.observe(e));
});

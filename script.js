(() => {
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');

  function getInitialTheme() {
    try {
      const saved = localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark') return saved;
    } catch (error) {}
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeToggle) {
      const isDark = theme === 'dark';
      themeToggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
      themeToggle.title = isDark ? 'Switch to light theme' : 'Switch to dark theme';
      themeToggle.innerHTML = isDark
        ? '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>'
        : '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20.9 13A8.7 8.7 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z"/></svg>';
    }
    try { localStorage.setItem('theme', theme); } catch (error) {}
  }

  setTheme(getInitialTheme());
  themeToggle?.addEventListener('click', () => {
    setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });

  const chart = document.getElementById('heroChart');
  if (chart && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    requestAnimationFrame(() => requestAnimationFrame(() => chart.classList.add('chart-ready')));
  } else {
    chart?.classList.add('chart-ready');
  }
})();
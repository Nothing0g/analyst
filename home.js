(() => {
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const stored = (() => { try { return localStorage.getItem('theme'); } catch { return null; } })();
  const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const initial = stored || preferred;
  root.dataset.theme = initial;
  const paint = (theme) => {
    root.dataset.theme = theme;
    if (toggle) {
      toggle.textContent = theme === 'dark' ? '☼' : '◐';
      toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }
    try { localStorage.setItem('theme', theme); } catch {}
  };
  paint(initial);
  toggle?.addEventListener('click', () => paint(root.dataset.theme === 'dark' ? 'light' : 'dark'));
})();

(() => {
  const root = document.documentElement;
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
  const sunIcon = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>';
  const moonIcon = '<path d="M20.9 13A8.7 8.7 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z"/>';
  let theme = 'light';
  try {
    const saved = localStorage.getItem('theme');
    theme = saved === 'dark' || saved === 'light' ? saved : (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  } catch (error) {}

  function paintTheme(next) {
    theme = next;
    root.setAttribute('data-theme', next);
    const icon = next === 'dark' ? sunIcon : moonIcon;
    ['themeToggle', 'reportThemeToggle'].forEach((id) => {
      const button = document.getElementById(id);
      if (!button) return;
      button.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + icon + '</svg>';
      button.setAttribute('aria-label', next === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    });
    try { localStorage.setItem('theme', next); } catch (error) {}
  }
  paintTheme(theme);
  $('#themeToggle')?.addEventListener('click', () => paintTheme(theme === 'dark' ? 'light' : 'dark'));
  $('#reportThemeToggle')?.addEventListener('click', () => paintTheme(theme === 'dark' ? 'light' : 'dark'));

  function showToast(message) {
    const wrap = $('#toastWrap');
    if (!wrap) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    const text = document.createElement('span');
    text.textContent = message;
    toast.appendChild(text);
    wrap.appendChild(toast);
    toast.classList.add('show');
    window.setTimeout(() => toast.remove(), 2200);
  }
  function fallbackCopy(value) {
    const area = document.createElement('textarea');
    area.value = value;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    let copied = false;
    try { copied = document.execCommand('copy'); } catch (error) {}
    area.remove();
    return copied;
  }
  $$('[data-copy]').forEach((node) => {
    node.addEventListener('click', async () => {
      const value = node.getAttribute('data-copy') || '';
      if (!value) return;
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) await navigator.clipboard.writeText(value);
        else if (!fallbackCopy(value)) throw new Error('Copy failed');
        showToast('Copied');
      } catch (error) {
        if (fallbackCopy(value)) showToast('Copied');
        else showToast('Copy did not work; select the text instead');
      }
    });
  });

  const cmdkOverlay = $('#cmdkOverlay');
  const cmdkInput = $('#cmdkInput');
  const cmdkList = $('#cmdkList');
  const commands = [
    ['Navigate', 'Open dashboard', '#dashboard'],
    ['Navigate', 'Read the insights', '#insights'],
    ['Navigate', 'View methodology', '#method'],
    ['Navigate', 'Browse all projects', '../'],
    ['Navigate', 'Back to portfolio', '../../index.html']
  ];
  function closeCommands() {
    cmdkOverlay?.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  function renderCommands(query) {
    if (!cmdkList) return;
    const q = (query || '').trim().toLowerCase();
    const matches = commands.filter((item) => (item[0] + ' ' + item[1]).toLowerCase().includes(q));
    cmdkList.replaceChildren();
    matches.forEach((item) => {
      const row = document.createElement('button');
      row.type = 'button';
      row.className = 'cmdk-item';
      const label = document.createElement('span');
      label.textContent = item[1];
      const kind = document.createElement('span');
      kind.className = 'cmdk-item-hint';
      kind.textContent = item[0];
      row.append(label, kind);
      row.addEventListener('click', () => {
        const target = item[2];
        closeCommands();
        if (target.startsWith('#')) document.querySelector(target)?.scrollIntoView();
        else window.location.href = target;
      });
      cmdkList.appendChild(row);
    });
    if (!matches.length) {
      const empty = document.createElement('p');
      empty.className = 'cmdk-empty';
      empty.textContent = 'No matching commands';
      cmdkList.appendChild(empty);
    }
  }
  function openCommands() {
    if (!cmdkOverlay) return;
    cmdkOverlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    if (cmdkInput) { cmdkInput.value = ''; renderCommands(''); cmdkInput.focus(); }
  }
  cmdkInput?.addEventListener('input', () => renderCommands(cmdkInput.value));
  cmdkOverlay?.addEventListener('click', (event) => {
    if (event.target === cmdkOverlay) closeCommands();
  });
  addEventListener('keydown', (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      if ($('body.projects-index-page #projectSearch')) $('body.projects-index-page #projectSearch').focus();
      else if (cmdkOverlay?.classList.contains('is-open')) closeCommands();
      else openCommands();
    }
    if (event.key === 'Escape') closeCommands();
  });

  const backToTop = $('#backToTop');
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'auto' }));
})();
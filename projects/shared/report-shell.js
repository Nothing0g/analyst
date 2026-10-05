(() => {
  const root = document.documentElement;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer:fine)').matches;
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  const sunIcon = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>';
  const moonIcon = '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>';

  let theme = 'light';
  try { theme = localStorage.getItem('theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); } catch (e) {}

  function paintTheme(next) {
    theme = next;
    root.setAttribute('data-theme', next);
    const icon = next === 'dark' ? sunIcon : moonIcon;
    ['themeIcon', 'dockThemeIcon'].forEach((id) => { const node = document.getElementById(id); if (node) node.innerHTML = icon; });
    const reportTheme = document.getElementById('reportThemeToggle');
    if (reportTheme) reportTheme.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icon}</svg>`;
    try { localStorage.setItem('theme', next); } catch (e) {}
  }
  paintTheme(theme);

  function toggleTheme(event) {
    const next = theme === 'dark' ? 'light' : 'dark';
    const x = event && event.clientX != null ? event.clientX : innerWidth / 2;
    const y = event && event.clientY != null ? event.clientY : innerHeight / 2;
    root.style.setProperty('--tx', `${x}px`);
    root.style.setProperty('--ty', `${y}px`);
    if (document.startViewTransition && !reduced) document.startViewTransition(() => paintTheme(next));
    else paintTheme(next);
  }
  $('#themeToggle')?.addEventListener('click', toggleTheme);
  $('#reportThemeToggle')?.addEventListener('click', toggleTheme);
  $('#dockThemeBtn')?.addEventListener('click', toggleTheme);

  function showToast(message) {
    const wrap = $('#toastWrap'); if (!wrap) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg><span>${message}</span>`;
    wrap.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 2400);
  }

  function navigateWithTransition(url) {
    if (reduced) { window.location.href = url; return; }
    document.body.classList.add('page-exit');
    setTimeout(() => { window.location.href = url; }, 300);
  }
  $$('a[data-transition]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('http')) return;
      event.preventDefault();
      navigateWithTransition(href);
    });
  });
  requestAnimationFrame(() => document.body.classList.add('page-entered'));

  function onScroll() {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    const progress = max > 0 ? (doc.scrollTop / max) * 100 : 0;
    const bar = $('#scrollProgress');
    if (bar) bar.style.width = `${progress}%`;
    $('#backToTop')?.classList.toggle('visible', doc.scrollTop > 600);
  }
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  $('#backToTop')?.addEventListener('click', () => scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' }));

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  $$('.reveal').forEach((el) => io.observe(el));

  if (!reduced) {
    document.addEventListener('mousemove', (event) => {
      const el = event.target.closest && event.target.closest('.spotlight-card');
      if (!el) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      el.style.setProperty('--my', `${event.clientY - rect.top}px`);
    });
  }

  const cursorDot = $('#cursorDot');
  const cursorFollow = $('#cursorFollow');
  const cursorFollowText = $('#cursorFollowText');
  if (!reduced && finePointer && cursorDot) {
    root.classList.add('custom-cursor');
    let mouseX = innerWidth / 2, mouseY = innerHeight / 2, cx = mouseX, cy = mouseY;
    let scale = 1, targetScale = 1;
    let fx = mouseX, fy = mouseY;
    addEventListener('mousemove', (event) => { cursorDot.style.opacity = '1'; mouseX = event.clientX; mouseY = event.clientY; });
    function cursorLoop() {
      cx += (mouseX - cx) * 0.26;
      cy += (mouseY - cy) * 0.26;
      scale += (targetScale - scale) * 0.2;
      cursorDot.style.transform = `translate(${cx - 9}px, ${cy - 9}px) scale(${scale})`;
      if (cursorFollow && cursorFollowText) {
        fx += (mouseX - fx) * 0.14;
        fy += (mouseY - fy) * 0.14;
        cursorFollow.style.transform = `translate(${fx + 13}px, ${fy + 15}px)`;
      }
      requestAnimationFrame(cursorLoop);
    }
    requestAnimationFrame(cursorLoop);
    $$('a,button,.chart-card,.metric-card,.insight-card,.method-card,.report-btn,.filter-reset').forEach((el) => {
      el.addEventListener('mouseenter', () => { targetScale = 1.6; });
      el.addEventListener('mouseleave', () => { targetScale = 1; });
    });
    if (cursorFollow && cursorFollowText) {
      $$('[data-cursor-text]').forEach((el) => {
        el.addEventListener('mouseenter', () => { cursorFollowText.textContent = el.dataset.cursorText; cursorFollow.style.opacity = '1'; });
        el.addEventListener('mouseleave', () => { cursorFollow.style.opacity = '0'; });
      });
    }
  }

  let bgBurstUntil = 0;
  const canvas = $('#bgCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height, stars = [];
    const constrainedDevice = Boolean(
      (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
      (navigator.deviceMemory && navigator.deviceMemory <= 4) ||
      navigator.connection?.saveData
    );
    let lowPowerMode = constrainedDevice;
    const build = () => {
      width = canvas.width = innerWidth;
      height = canvas.height = innerHeight;
      const density = lowPowerMode ? (width < 700 ? 7600 : 8600) : (width < 700 ? 5500 : 3200);
      const count = Math.floor((width * height) / density);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width, y: Math.random() * height,
        size: 0.6 + Math.random() * 1.8, depth: 0.12 + Math.random() * 0.88,
        angle: Math.random() * Math.PI * 2, twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.6 + Math.random() * 1.8,
      }));
    };
    build(); addEventListener('resize', build);
    if (navigator.getBattery) {
      navigator.getBattery().then((battery) => {
        const syncPowerMode = () => {
          const next = constrainedDevice || !battery.charging;
          if (next === lowPowerMode) return;
          lowPowerMode = next;
          build();
        };
        syncPowerMode();
        battery.addEventListener('chargingchange', syncPowerMode);
      }).catch(() => {});
    }
    let px = -9999, py = -9999;
    addEventListener('mousemove', (event) => { px = event.clientX; py = event.clientY; });
    addEventListener('touchmove', (event) => { if (event.touches[0]) { px = event.touches[0].clientX; py = event.touches[0].clientY; } }, { passive: true });
    addEventListener('mouseleave', () => { px = -9999; py = -9999; });
    let last = performance.now(), time = 0;
    function draw(now) {
      if (lowPowerMode && now - last < 42) { requestAnimationFrame(draw); return; }
      const dt = Math.min(50, now - last) / 1000; last = now; time += dt;
      ctx.clearRect(0, 0, width, height);
      const dark = root.getAttribute('data-theme') === 'dark';
      const rgb = dark ? '255,255,255' : '10,10,10';
      const burst = performance.now() < bgBurstUntil;
      const hoverEnabled = !lowPowerMode;
      if (!hoverEnabled) ctx.filter = 'none';
      stars.forEach((star) => {
        const drift = 22 * star.depth * dt;
        star.x += Math.cos(star.angle) * drift; star.y += Math.sin(star.angle) * drift;
        if (star.x < -5) star.x = width + 5; if (star.x > width + 5) star.x = -5;
        if (star.y < -5) star.y = height + 5; if (star.y > height + 5) star.y = -5;
        let renderX = star.x, renderY = star.y, glow = 0;
        if (hoverEnabled) {
          const dx = star.x - px, dy = star.y - py, distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 90) {
            const strength = 1 - distance / 90;
            const nx = distance > 0.01 ? dx / distance : 0, ny = distance > 0.01 ? dy / distance : 0;
            renderX += nx * strength * 14; renderY += ny * strength * 14; glow = strength;
          }
        }
        const twinkle = 0.55 + 0.45 * Math.sin(time * star.twinkleSpeed + star.twinklePhase);
        // Let depth control both softness and opacity so the field recedes gently.
        let alpha = (dark ? 0.025 + star.depth * 0.42 : 0.018 + star.depth * 0.22) * twinkle + glow * 0.12;
        if (burst) alpha = Math.min(0.55, alpha + 0.12);
        ctx.globalAlpha = Math.min(0.55, alpha);
        if (hoverEnabled) ctx.filter = `blur(${((1 - star.depth) * 2.4).toFixed(2)}px)`;
        ctx.fillStyle = `rgb(${rgb})`;
        ctx.beginPath(); ctx.arc(renderX, renderY, star.size + glow * 1.2, 0, Math.PI * 2); ctx.fill();
      });
      ctx.globalAlpha = 1;
      ctx.filter = 'none';
      if (!reduced) requestAnimationFrame(draw);
    }
    if (reduced) draw(performance.now()); else requestAnimationFrame(draw);
  }

  const cmdkOverlay = $('#cmdkOverlay');
  const cmdkInput = $('#cmdkInput');
  const cmdkList = $('#cmdkList');
  const commands = [
    ['Navigate', 'Open dashboard', '#dashboard'],
    ['Navigate', 'Read the insights', '#insights'],
    ['Navigate', 'View methodology', '#method'],
    ['Navigate', 'Back to portfolio', '../../index.html'],
  ];
  function closeCmdk() { cmdkOverlay?.classList.remove('is-open'); document.body.style.overflow = ''; }
  function renderCommands(query = '') {
    if (!cmdkList) return;
    const q = query.toLowerCase().trim();
    const filtered = commands.filter((command) => command[1].toLowerCase().includes(q) || command[0].toLowerCase().includes(q));
    cmdkList.innerHTML = filtered.length ? filtered.map((command, index) => `<div class="cmdk-item${index === 0 ? ' active' : ''}" data-cmd-href="${command[2]}"><span>${command[1]}</span><span class="cmdk-item-hint">${command[0]}</span></div>`).join('') : '<div class="cmdk-empty">No commands found</div>';
    $$('.cmdk-item', cmdkList).forEach((item) => item.addEventListener('click', () => { const href = item.dataset.cmdHref; closeCmdk(); if (href.startsWith('#')) $(href)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' }); else navigateWithTransition(href); }));
  }
  function openCmdk() { if (!cmdkOverlay) return; cmdkOverlay.classList.add('is-open'); document.body.style.overflow = 'hidden'; if (cmdkInput) { cmdkInput.value = ''; renderCommands(); setTimeout(() => cmdkInput.focus(), 40); } }
  $('#reportSearch')?.addEventListener('click', openCmdk);
  cmdkOverlay?.addEventListener('click', (event) => { if (event.target === cmdkOverlay) closeCmdk(); });
  cmdkInput?.addEventListener('input', () => renderCommands(cmdkInput.value));
  addEventListener('keydown', (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); cmdkOverlay?.classList.contains('is-open') ? closeCmdk() : openCmdk(); }
    if (event.key === 'Escape') closeCmdk();
  });

  const navLinks = $$('[data-dock]');
  const sections = navLinks.map((link) => $(link.getAttribute('href'))).filter(Boolean);
  if (sections.length) {
    const spy = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    }), { rootMargin: '-45% 0px -45% 0px' });
    sections.forEach((section) => spy.observe(section));
  }
})();

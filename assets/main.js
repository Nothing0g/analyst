// ============================================================
// SHARED SCRIPT — used by index.html (DA) and ba.html (BA)
// Relies on each page defining `window.LINKS` and `window.PROJECTS`
// before this file loads (see bottom of each HTML file).
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Wire up real links from the page-specific LINKS object ----
  const LINKS = window.LINKS || {};
  document.querySelectorAll('[data-link]').forEach(el => {
    const key = el.getAttribute('data-link');
    if (LINKS[key]) el.setAttribute('href', LINKS[key]);
  });

  // ---- Theme toggle (in-memory only, no storage) ----
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const sunIcon = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>';
  const moonIcon = '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>';
  let isDark = true;
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      isDark = !isDark;
      root.setAttribute('data-theme', isDark ? 'dark' : 'light');
      if (themeIcon) themeIcon.innerHTML = isDark ? sunIcon : moonIcon;
    });
  }

  // ---- Scroll-triggered reveal ----
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => io.observe(el));

  // ---- Smooth anchor scroll ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- Persona switch: large hero pill shrinks away once scrolled past hero ----
  const heroSwitch = document.querySelector('.persona-switch-hero');
  const heroEl = document.querySelector('.hero');
  if (heroSwitch && heroEl) {
    const heroIO = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        heroSwitch.classList.toggle('is-compact', !entry.isIntersecting);
      });
    }, { threshold: 0.15 });
    heroIO.observe(heroEl);
  }

  // ---- Ripple page transition ----
  // Any element with [data-persona-nav] triggers a ripple wipe, then navigates
  // to its href after the animation completes.
  document.querySelectorAll('[data-persona-nav]').forEach(el => {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      if (!href) return;
      playRippleTransition(e.clientX, e.clientY, () => {
        window.location.href = href;
      });
    });
  });

  function playRippleTransition(x, y, onComplete) {
    const overlay = document.createElement('div');
    overlay.className = 'ripple-overlay';
    const circle = document.createElement('div');
    circle.className = 'ripple-circle';

    // size the circle so it covers the whole viewport from the click point
    const maxDist = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    ) * 2.2;
    circle.style.width = maxDist + 'px';
    circle.style.height = maxDist + 'px';
    circle.style.left = x + 'px';
    circle.style.top = y + 'px';

    overlay.appendChild(circle);
    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
      circle.classList.add('animate');
    });

    setTimeout(onComplete, 650);
  }

  // ---- Terminal identity device: types out lines, then reveals commands ----
  const terminalBody = document.querySelector('[data-terminal-body]');
  if (terminalBody) {
    const lines = JSON.parse(terminalBody.getAttribute('data-lines') || '[]');
    terminalBody.innerHTML = '';
    let lineIndex = 0;

    function typeLine() {
      if (lineIndex >= lines.length) return;
      const { prompt, text } = lines[lineIndex];
      const lineEl = document.createElement('div');
      const promptEl = document.createElement('span');
      promptEl.className = 'terminal-prompt';
      promptEl.textContent = prompt + ' ';
      const textEl = document.createElement('span');
      lineEl.appendChild(promptEl);
      lineEl.appendChild(textEl);
      terminalBody.appendChild(lineEl);

      let charIndex = 0;
      const typeChar = () => {
        if (charIndex < text.length) {
          textEl.textContent += text[charIndex];
          charIndex++;
          setTimeout(typeChar, 18);
        } else {
          lineIndex++;
          setTimeout(typeLine, 280);
        }
      };
      typeChar();
    }

    // Start typing once the terminal scrolls into view
    const termIO = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          typeLine();
          termIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    termIO.observe(terminalBody);
  }

  // ---- Project modal (click-to-open case study) ----
  const PROJECTS = window.PROJECTS || {};
  const modalOverlay = document.getElementById('projectModal');
  if (modalOverlay) {
    const modalCat = modalOverlay.querySelector('[data-modal-cat]');
    const modalTitle = modalOverlay.querySelector('[data-modal-title]');
    const modalDesc = modalOverlay.querySelector('[data-modal-desc]');
    const modalHighlight = modalOverlay.querySelector('[data-modal-highlight]');
    const modalTags = modalOverlay.querySelector('[data-modal-tags]');
    const modalFoot = modalOverlay.querySelector('[data-modal-foot]');

    function openModal(key) {
      const p = PROJECTS[key];
      if (!p) return;
      modalCat.textContent = p.category;
      modalTitle.textContent = p.title;
      modalDesc.textContent = p.description;
      modalHighlight.textContent = p.highlight;
      modalTags.innerHTML = p.tags.map(t => `<span class="modal-tag">${t}</span>`).join('');
      modalFoot.innerHTML = `
        <a href="${p.link}" target="_blank" rel="noopener" class="btn btn-primary">View on GitHub ↗</a>
      `;
      modalOverlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modalOverlay.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    document.querySelectorAll('[data-open-project]').forEach(card => {
      card.addEventListener('click', () => openModal(card.getAttribute('data-open-project')));
    });
    modalOverlay.querySelector('.modal-close').addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }

  // ---- Spotlight reveal panel: cursor-following circular mask ----
  const panel = document.querySelector('.spotlight-panel');
  if (panel && window.matchMedia('(prefers-reduced-motion: reduce)').matches === false) {
    const revealLayer = panel.querySelector('.spotlight-reveal');
    const dot = document.querySelector('.spotlight-cursor-dot');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const RADIUS = 90;

    function resizeCanvas() {
      canvas.width = panel.clientWidth;
      canvas.height = panel.clientHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let mouseX = -999, mouseY = -999;
    let smoothX = -999, smoothY = -999;
    let inside = false;

    panel.addEventListener('mousemove', (e) => {
      const rect = panel.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      inside = true;
      if (dot) {
        dot.style.opacity = '1';
        dot.style.left = e.clientX + 'px';
        dot.style.top = e.clientY + 'px';
      }
    });
    panel.addEventListener('mouseleave', () => {
      inside = false;
      if (dot) dot.style.opacity = '0';
    });

    function loop() {
      smoothX += (mouseX - smoothX) * 0.12;
      smoothY += (mouseY - smoothY) * 0.12;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (inside || Math.abs(smoothX - mouseX) > 1) {
        const grad = ctx.createRadialGradient(smoothX, smoothY, 0, smoothX, smoothY, RADIUS);
        grad.addColorStop(0, 'rgba(255,255,255,1)');
        grad.addColorStop(0.4, 'rgba(255,255,255,1)');
        grad.addColorStop(0.6, 'rgba(255,255,255,0.75)');
        grad.addColorStop(0.75, 'rgba(255,255,255,0.4)');
        grad.addColorStop(0.88, 'rgba(255,255,255,0.12)');
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(smoothX, smoothY, RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }

      const dataUrl = canvas.toDataURL();
      revealLayer.style.maskImage = `url(${dataUrl})`;
      revealLayer.style.webkitMaskImage = `url(${dataUrl})`;
      revealLayer.style.maskSize = '100% 100%';
      revealLayer.style.webkitMaskSize = '100% 100%';

      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

});

(() => {
  const root = document.documentElement;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const sun = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>';
  const moon = '<path d="M20.4 15.3A8.5 8.5 0 0 1 8.7 3.6 8.7 8.7 0 1 0 20.4 15.3Z"/>';

  function paintTheme(theme) {
    root.dataset.theme = theme;
    document.querySelectorAll("[data-theme-toggle-icon]").forEach((icon) => {
      icon.innerHTML = theme === "dark" ? sun : moon;
    });
    const button = document.getElementById("themeToggle");
    if (button) {
      button.setAttribute("aria-pressed", String(theme === "dark"));
      button.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
      const icon = document.getElementById("themeIcon");
      if (icon) icon.innerHTML = theme === "dark" ? sun : moon;
    }
    document.dispatchEvent(new CustomEvent("themechange"));
    try { localStorage.setItem("theme", theme); } catch (_) {}
  }

  let theme = root.dataset.theme === "dark" ? "dark" : "light";
  paintTheme(theme);
  const themeToggle = document.getElementById("themeToggle");
  themeToggle?.addEventListener("click", (event) => {
    const next = theme === "dark" ? "light" : "dark";
    root.style.setProperty("--tx", (event.clientX ?? innerWidth / 2) + "px");
    root.style.setProperty("--ty", (event.clientY ?? innerHeight / 2) + "px");
    if (document.startViewTransition && !reducedMotion) {
      document.startViewTransition(() => {
        theme = next;
        paintTheme(next);
      });
    } else {
      theme = next;
      paintTheme(next);
    }
  });

  const search = document.getElementById("registerSearch");
  const rows = Array.from(document.querySelectorAll(".register-row"));
  const count = document.getElementById("registerCount");
  const empty = document.getElementById("registerEmpty");
  function filterRegister() {
    const query = (search?.value || "").trim().toLowerCase();
    let visible = 0;
    rows.forEach((row) => {
      const haystack = (row.dataset.search || "") + " " + row.textContent;
      const match = haystack.toLowerCase().includes(query);
      row.hidden = !match;
      if (match) visible += 1;
    });
    if (count) count.textContent = visible + (visible === 1 ? " report" : " reports");
    if (empty) empty.hidden = visible !== 0;
  }
  search?.addEventListener("input", filterRegister);
  filterRegister();
})();
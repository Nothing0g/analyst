(() => {
  const root = document.documentElement;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const sun = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>';
  const moon = '<path d="M20.4 15.3A8.5 8.5 0 0 1 8.7 3.6 8.7 8.7 0 1 0 20.4 15.3Z"/>';
  let theme = root.dataset.theme || "light";
  try { theme = localStorage.getItem("theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : theme); } catch (_) {}
  function paintTheme(next) {
    theme = next; root.dataset.theme = next;
    const icon = next === "dark" ? sun : moon;
    ["themeIcon","reportThemeIcon","dockThemeIcon"].forEach((id) => { const node = document.getElementById(id); if (node) node.innerHTML = icon; });
    const button = document.getElementById("themeToggle") || document.getElementById("reportThemeToggle");
    if (button) { button.setAttribute("aria-pressed", String(next === "dark")); button.setAttribute("aria-label", next === "dark" ? "Switch to light theme" : "Switch to dark theme"); }
    const reportButton = document.getElementById("reportThemeToggle");
    if (reportButton && !document.getElementById("reportThemeIcon")) reportButton.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + icon + '</svg>';
    document.dispatchEvent(new CustomEvent("themechange"));
    try { localStorage.setItem("theme", next); } catch (_) {}
  }
  paintTheme(theme);
  function toggleTheme(event) {
    const next = theme === "dark" ? "light" : "dark";
    root.style.setProperty("--tx", (event?.clientX ?? innerWidth / 2) + "px");
    root.style.setProperty("--ty", (event?.clientY ?? innerHeight / 2) + "px");
    if (document.startViewTransition && !reduced) document.startViewTransition(() => paintTheme(next));
    else paintTheme(next);
  }
  document.getElementById("themeToggle")?.addEventListener("click", toggleTheme);
  document.getElementById("reportThemeToggle")?.addEventListener("click", toggleTheme);
})();
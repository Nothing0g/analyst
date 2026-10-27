(() => {
  const rows = Array.from(document.querySelectorAll("#projectGrid tbody tr[data-category]"));
  const search = document.getElementById("projectSearch");
  const filter = document.getElementById("projectFilter");
  const count = document.getElementById("resultCount");
  const empty = document.getElementById("emptyState");

  function update() {
    const query = (search?.value || "").trim().toLowerCase();
    const category = filter?.value || "all";
    let shown = 0;
    rows.forEach((row) => {
      const matchesCategory = category === "all" || row.dataset.category === category;
      const haystack = ((row.dataset.search || "") + " " + row.textContent).toLowerCase();
      const matchesQuery = !query || haystack.includes(query);
      const visible = matchesCategory && matchesQuery;
      row.hidden = !visible;
      if (visible) shown += 1;
    });
    if (count) count.textContent = "Showing " + shown + (shown === 1 ? " project" : " projects");
    if (empty) empty.hidden = shown > 0;
  }
  search?.addEventListener("input", update);
  filter?.addEventListener("change", update);
  update();
})();
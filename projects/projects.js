(() => {
  const rows = Array.from(document.querySelectorAll('#projectGrid tbody tr'));
  const search = document.getElementById('projectSearch');
  const filter = document.getElementById('projectFilter');
  const count = document.getElementById('resultCount');
  const empty = document.getElementById('emptyState');

  function update() {
    const query = (search?.value || '').trim().toLowerCase();
    const category = filter?.value || 'all';
    let visibleCount = 0;
    rows.forEach((row) => {
      const matchesCategory = category === 'all' || row.dataset.category === category;
      const matchesQuery = !query || (row.dataset.search + ' ' + row.textContent).toLowerCase().includes(query);
      const visible = matchesCategory && matchesQuery;
      row.hidden = !visible;
      if (visible) visibleCount += 1;
    });
    if (count) count.textContent = 'Showing ' + visibleCount + (visibleCount === 1 ? ' project' : ' projects');
    if (empty) empty.hidden = visibleCount !== 0;
  }
  search?.addEventListener('input', update);
  filter?.addEventListener('change', update);
  window.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      if (search) { event.preventDefault(); search.focus(); }
    }
  });
  update();
})();
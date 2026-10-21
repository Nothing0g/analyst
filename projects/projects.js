(() => {
  const cards = Array.from(document.querySelectorAll('.project-card'));
  const filterButtons = Array.from(document.querySelectorAll('.filter-pill'));
  const search = document.getElementById('projectSearch');
  const count = document.getElementById('resultCount');
  const empty = document.getElementById('emptyState');
  let activeFilter = 'all';

  function update() {
    const query = (search?.value || '').trim().toLowerCase();
    let shown = 0;
    cards.forEach((card) => {
      const categoryMatches = activeFilter === 'all' || card.dataset.category === activeFilter;
      const searchText = `${card.dataset.search || ''} ${card.textContent || ''}`.toLowerCase();
      const searchMatches = !query || searchText.includes(query);
      const visible = categoryMatches && searchMatches;
      card.hidden = !visible;
      if (visible) shown += 1;
    });
    if (count) count.textContent = `${shown} ${shown === 1 ? 'project' : 'projects'}`;
    if (empty) empty.hidden = shown !== 0;
  }

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter || 'all';
      filterButtons.forEach((item) => {
        const selected = item === button;
        item.classList.toggle('is-active', selected);
        item.setAttribute('aria-pressed', String(selected));
      });
      update();
    });
  });
  search?.addEventListener('input', update);
  window.addEventListener('keydown', (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      search?.focus();
    }
  });
  update();
})();

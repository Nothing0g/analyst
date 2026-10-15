(() => {
  const scorecard = [
    { source: 'Referral', response: 100.0, consultation: 72.9, won: 41.7 },
    { source: 'Design Event', response: 83.3, consultation: 72.9, won: 31.3 },
    { source: 'Website', response: 43.8, consultation: 62.5, won: 20.8 },
    { source: 'Paid Social', response: 12.5, consultation: 52.1, won: 10.4 },
  ];
  const metrics = {
    response: { label: 'Within-four-hour response SLA', summary: 'Within-four-hour response SLA by source, as a share of all leads in the source.' },
    consultation: { label: 'Consultation rate', summary: 'Consultation rate by source, using all leads in the source as the denominator.' },
    won: { label: 'Won rate', summary: 'Won rate by source, using all leads in the source as the denominator.' },
  };

  const chart = document.getElementById('sourceChart');
  const summary = document.getElementById('funnelMetricSummary');
  const buttons = Array.from(document.querySelectorAll('[data-funnel-metric]'));

  function render(metricKey) {
    if (!chart || !metrics[metricKey]) return;
    const metric = metrics[metricKey];
    const width = 760;
    const height = 320;
    const left = 154;
    const right = 88;
    const top = 28;
    const bottom = 38;
    const plotWidth = width - left - right;
    const plotHeight = height - top - bottom;
    const rowHeight = plotHeight / scorecard.length;
    let svg = `<title>${metric.label} by acquisition source</title><desc>All four sources have 48 leads in this fictional sample.</desc>`;

    [0, 25, 50, 75, 100].forEach((tick) => {
      const x = left + (tick / 100) * plotWidth;
      svg += `<line x1="${x}" x2="${x}" y1="${top}" y2="${height - bottom}" class="grid-line"/>`;
      svg += `<text x="${x}" y="${height - 10}" class="axis-label" text-anchor="middle">${tick}%</text>`;
    });

    const values = scorecard.map((row) => row[metricKey]);
    const maxRate = Math.max(...values);
    const minRate = Math.min(...values);
    scorecard.forEach((row, index) => {
      const value = row[metricKey];
      const centerY = top + rowHeight * (index + 0.5);
      const barWidth = (value / 100) * plotWidth;
      const tone = value === maxRate ? 'green' : value === minRate ? 'coral' : '';
      svg += `<text x="${left - 12}" y="${centerY + 4}" class="axis-label" text-anchor="end">${row.source}</text>`;
      svg += `<rect x="${left}" y="${centerY - 12}" width="${barWidth}" height="24" rx="3" class="bar ${tone}" role="img" aria-label="${row.source}: ${value.toFixed(1)} percent"><title>${row.source}: ${value.toFixed(1)}%</title></rect>`;
      svg += `<text x="${left + barWidth + 8}" y="${centerY + 4}" class="bar-label">${value.toFixed(1)}%</text>`;
    });

    chart.innerHTML = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${metric.label} by source">${svg}</svg>`;
    if (summary) summary.textContent = metric.summary;
    buttons.forEach((button) => {
      const active = button.dataset.funnelMetric === metricKey;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  }

  buttons.forEach((button) => button.addEventListener('click', () => render(button.dataset.funnelMetric)));
  render('response');
})();

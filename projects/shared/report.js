(() => {
  const root = document.documentElement;
  const type = window.REPORT_TYPE || 'uber';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
  const colors = {
    ink: 'var(--report-ink)',
    muted: 'var(--report-muted)',
    faint: 'var(--report-faint)',
    line: 'var(--report-line)',
    lineStrong: 'var(--report-line-strong)',
    yellow: 'var(--report-yellow)',
    green: 'var(--report-green)',
    coral: 'var(--report-coral)',
    cyan: 'var(--report-cyan)',
    bg: 'var(--report-bg)',
  };

  const svgText = (x, y, text, className = 'axis-label', anchor = 'start') =>
    `<text x="${x}" y="${y}" class="${className}" text-anchor="${anchor}">${text}</text>`;
  const esc = (value) => String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmt = (value) => new Intl.NumberFormat('en-IN').format(Math.round(value));
  const pct = (value) => `${Number(value).toFixed(1)}%`;
  const money = (value) => `₹${fmt(value)}`;
  const setText = (selector, value) => { const node = $(selector); if (node) node.textContent = value; };
  let uberMode = 'absolute';
  let hrMetric = 'recall';
  let hrRoleSort = 'rate';
  const flashDashboard = () => {
    const node = $('#dashboard');
    if (!node || reduced) return;
    node.classList.remove('data-refresh');
    void node.offsetWidth;
    node.classList.add('data-refresh');
  };

  function chartTooltip() {
    let tip = $('.chart-tooltip');
    if (!tip) {
      tip = document.createElement('div'); tip.className = 'chart-tooltip'; document.body.appendChild(tip);
    }
    return tip;
  }
  function attachTips(scope = document) {
    $$('.has-tip', scope).forEach((node) => {
      node.addEventListener('mouseenter', (event) => {
        const tip = chartTooltip(); tip.innerHTML = node.dataset.tip || ''; tip.classList.add('show');
        tip.style.left = `${Math.min(event.clientX + 12, innerWidth - 250)}px`; tip.style.top = `${Math.min(event.clientY + 12, innerHeight - 80)}px`;
      });
      node.addEventListener('mousemove', (event) => {
        const tip = chartTooltip(); tip.style.left = `${Math.min(event.clientX + 12, innerWidth - 250)}px`; tip.style.top = `${Math.min(event.clientY + 12, innerHeight - 80)}px`;
      });
      node.addEventListener('mouseleave', () => chartTooltip().classList.remove('show'));
      node.addEventListener('focus', () => chartTooltip().classList.add('show'));
      node.addEventListener('blur', () => chartTooltip().classList.remove('show'));
    });
  }

  function lineChart(points, labels, options = {}) {
    const width = 760, height = options.height || 300, left = 42, right = 18, top = 20, bottom = 34;
    const plotW = width - left - right, plotH = height - top - bottom;
    const max = options.max ?? Math.max(...points);
    const min = options.min ?? Math.min(...points);
    const range = Math.max(1, max - min);
    const x = (i) => left + (i / Math.max(1, points.length - 1)) * plotW;
    const y = (value) => top + (1 - (value - min) / range) * plotH;
    let s = '';
    for (let i = 0; i <= 4; i++) {
      const yy = top + (i / 4) * plotH;
      const val = max - (i / 4) * range;
      s += `<line x1="${left}" x2="${width - right}" y1="${yy}" y2="${yy}" class="grid-line"/>`;
      s += svgText(left - 8, yy + 4, options.yFormat ? options.yFormat(val) : Math.round(val), 'axis-label', 'end');
    }
    const coords = points.map((v, i) => [x(i), y(v)]);
    const line = coords.map(([cx, cy]) => `${cx.toFixed(1)},${cy.toFixed(1)}`).join(' ');
    const area = `${left},${height - bottom} ${line} ${width - right},${height - bottom}`;
    s += `<polygon points="${area}" class="data-area ${options.highlight ? 'highlight' : ''}"/>`;
    s += `<polyline points="${line}" class="data-line ${options.highlight ? 'highlight' : ''}"/>`;
    coords.forEach(([cx, cy], i) => {
      const label = labels[i] || `Point ${i + 1}`;
      s += `<circle cx="${cx}" cy="${cy}" r="3.2" class="chart-point has-tip" tabindex="0" data-tip="<strong>${esc(label)}</strong><br>${esc(options.valueLabel ? options.valueLabel(points[i]) : fmt(points[i]))}"/>`;
    });
    labels.forEach((label, i) => {
      if (i === 0 || i === labels.length - 1 || (labels.length > 12 && i % 4 === 0) || (labels.length <= 12 && i % 2 === 0)) {
        s += svgText(x(i), height - 10, label, 'axis-label', 'middle');
      }
    });
    return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(options.aria || 'Line chart')}">${s}</svg>`;
  }

  function barChart(rows, options = {}) {
    const width = 760, height = options.height || Math.max(250, rows.length * 32 + 50), left = options.left || 178, right = 46, top = 18, bottom = 22;
    const plotW = width - left - right, plotH = height - top - bottom;
    const max = options.max ?? Math.max(...rows.map((row) => row.value), 1);
    const barH = Math.min(22, Math.max(12, (plotH / rows.length) * .62));
    let s = '';
    [0, .5, 1].forEach((ratio) => {
      const xx = left + ratio * plotW;
      s += `<line x1="${xx}" x2="${xx}" y1="${top}" y2="${height - bottom}" class="grid-line"/>`;
      s += svgText(xx, height - 5, options.xFormat ? options.xFormat(max * ratio) : Math.round(max * ratio), 'axis-label', 'middle');
    });
    rows.forEach((row, i) => {
      const yy = top + (i + .5) * (plotH / rows.length);
      const w = Math.max(2, (row.value / max) * plotW);
      const colorClass = row.tone === 'coral' ? 'coral' : row.tone === 'green' ? 'green' : '';
      s += svgText(left - 10, yy + 4, row.label.length > 25 ? `${row.label.slice(0, 24)}…` : row.label, 'axis-label', 'end');
      s += `<rect x="${left}" y="${yy - barH / 2}" width="${w}" height="${barH}" rx="3" class="bar ${colorClass} has-tip" tabindex="0" data-tip="<strong>${esc(row.label)}</strong><br>${esc(options.valueLabel ? options.valueLabel(row.value) : row.value)}"/>`;
      if (options.showValues !== false) s += `<text x="${Math.min(width - 4, left + w + 8)}" y="${yy + 4}" class="bar-label">${esc(options.valueLabel ? options.valueLabel(row.value) : row.value)}</text>`;
    });
    return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(options.aria || 'Bar chart')}">${s}</svg>`;
  }

  function dualLineChart(primary, secondary, labels, options = {}) {
    const width = 760, height = options.height || 300, left = 42, right = 18, top = 20, bottom = 34;
    const plotW = width - left - right, plotH = height - top - bottom;
    const x = (i) => left + (i / Math.max(1, labels.length - 1)) * plotW;
    const y = (value) => top + (1 - value / 100) * plotH;
    const make = (points, className) => points.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
    let s = '';
    [0, 25, 50, 75, 100].forEach((value) => { const yy = y(value); s += `<line x1="${left}" x2="${width - right}" y1="${yy}" y2="${yy}" class="grid-line"/>${svgText(left - 8, yy + 4, `${value}%`, 'axis-label', 'end')}`; });
    s += `<polyline points="${make(primary)}" class="data-line"/>`;
    s += `<polyline points="${make(secondary)}" class="data-line highlight"/>`;
    primary.forEach((value, i) => { s += `<circle cx="${x(i)}" cy="${y(value)}" r="3" class="chart-point has-tip" tabindex="0" data-tip="<strong>${esc(labels[i])}</strong><br>Demand index: ${value}%"/>`; });
    secondary.forEach((value, i) => { s += `<circle cx="${x(i)}" cy="${y(value)}" r="3" fill="var(--report-coral)" stroke="var(--report-bg)" stroke-width="2" class="has-tip" tabindex="0" data-tip="<strong>${esc(labels[i])}</strong><br>Failure rate: ${value}%"/>`; });
    labels.forEach((label, i) => { if (i === 0 || i === labels.length - 1 || i % 4 === 0) s += svgText(x(i), height - 10, label, 'axis-label', 'middle'); });
    return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Demand index and supply failure rate by hour">${s}</svg>`;
  }

  function demandBandChart(points, labels, band, options = {}) {
    const width = 760, height = options.height || 300, left = 42, right = 18, top = 20, bottom = 34;
    const plotW = width - left - right, plotH = height - top - bottom;
    const maxPoint = Math.max(...points, 1);
    const x = (i) => left + (i / Math.max(1, points.length - 1)) * plotW;
    const yDemand = (value) => top + (1 - value / maxPoint) * plotH;
    const yRate = (value) => top + (1 - value / 100) * plotH;
    let s = '';
    [0, 25, 50, 75, 100].forEach((value) => {
      const yy = yRate(value);
      s += `<line x1="${left}" x2="${width - right}" y1="${yy}" y2="${yy}" class="grid-line"/>${svgText(left - 8, yy + 4, `${value}%`, 'axis-label', 'end')}`;
    });
    const bandTop = yRate(band.high), bandBottom = yRate(band.low);
    s += `<rect x="${left}" y="${bandTop}" width="${plotW}" height="${Math.max(1, bandBottom - bandTop)}" fill="var(--report-coral)" fill-opacity=".14"/>`;
    const coords = points.map((value, i) => [x(i), top + (1 - value / maxPoint) * plotH]);
    const line = coords.map(([cx, cy]) => `${cx.toFixed(1)},${cy.toFixed(1)}`).join(' ');
    s += `<polyline points="${line}" class="data-line"/>`;
    (band.knownPoints || []).forEach((point) => {
      const cx = x(point.hour), cy = yRate(point.value);
      s += `<circle cx="${cx}" cy="${cy}" r="4" fill="var(--report-coral)" stroke="var(--report-bg)" stroke-width="2" class="has-tip" tabindex="0" data-tip="<strong>${esc(point.label)}</strong><br>Published failure rate: ${point.value}%"/>`;
    });
    labels.forEach((label, i) => { if (i === 0 || i === labels.length - 1 || i % 4 === 0) s += svgText(x(i), height - 10, label, 'axis-label', 'middle'); });
    return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(options.aria || 'Demand line with published failure-rate band')}">${s}</svg>`;
  }

  function heatmap(rows, columns, options = {}) {
    const width = 760, height = 285, left = 88, top = 26, right = 14, bottom = 34;
    const cellW = (width - left - right) / columns.length, cellH = (height - top - bottom) / rows.length;
    const values = rows.flatMap((row) => columns.map((column) => row[column.key]));
    const max = Math.max(...values), min = Math.min(...values);
    let s = '';
    columns.forEach((column, i) => { s += svgText(left + i * cellW + cellW / 2, 16, column.label, 'axis-label', 'middle'); });
    rows.forEach((row, r) => {
      s += svgText(left - 10, top + r * cellH + cellH / 2 + 4, row.label, 'axis-label', 'end');
      columns.forEach((column, c) => {
        const value = row[column.key];
        const ratio = (value - min) / Math.max(1, max - min);
        const alpha = .12 + ratio * .8;
        const fill = options.color || 'var(--report-ink)';
        const x = left + c * cellW + 2, y = top + r * cellH + 2;
        s += `<rect x="${x}" y="${y}" width="${cellW - 4}" height="${cellH - 4}" rx="3" fill="${fill}" fill-opacity="${alpha.toFixed(2)}" class="heat-cell has-tip" tabindex="0" data-tip="<strong>${esc(row.label)} · ${esc(column.label)}</strong><br>${esc(options.valueLabel ? options.valueLabel(value) : value)}"/>`;
        s += svgText(x + (cellW - 4) / 2, y + (cellH - 4) / 2 + 4, options.cellLabel ? options.cellLabel(value) : value, 'axis-label', 'middle');
      });
    });
    return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(options.aria || 'Heatmap')}">${s}</svg>`;
  }

  function renderTable(rows, columns) {
    return `<div class="table-wrap"><table class="segment-table"><thead><tr>${columns.map((column) => `<th>${esc(column.label)}</th>`).join('')}</tr></thead><tbody>${rows.map((row) => `<tr>${columns.map((column) => `<td>${column.render ? column.render(row) : esc(row[column.key])}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  }

  function renderMetricCards(metrics) {
    const container = $('#metricGrid'); if (!container) return;
    container.innerHTML = metrics.map((metric) => `<article class="metric-card"><div class="metric-label mono">${esc(metric.label)}</div><div class="metric-value">${esc(metric.value)}</div><div class="metric-context">${esc(metric.context)}</div></article>`).join('');
  }

  const UBER = window.UBER_DATA;

  function setDataThemeOnPage() {
    const page = $('body'); if (page) page.dataset.reportType = type;
  }
  setDataThemeOnPage();

  function renderUber() {
    renderMetricCards([
      { label: 'Bookings analysed', value: '150K', context: `NCR rides across ${UBER.days} days` },
      { label: 'Demand swing', value: '9×', context: `${UBER.troughHour.label} trough → ${UBER.peakHour.label} peak` },
      { label: 'Supply failure', value: '~25%', context: `Published range ${UBER.failureRange.label}` },
      { label: 'Top 15 pickup zones', value: '9.2%', context: 'Of all bookings across 176 zones' },
    ]);
    const isIndexed = uberMode === 'indexed';
    const hourLabels = UBER.hourlyLabels;
    const demandPoints = isIndexed ? UBER.hourlyBookings.map((value) => Math.round((value / UBER.peakHour.bookings) * 100)) : UBER.hourlyBookings;
    const demandOptions = { height: 320, valueLabel: isIndexed ? pct : fmt, yFormat: isIndexed ? pct : (value) => `${(value / 1000).toFixed(0)}K`, aria: isIndexed ? 'Indexed ride demand by hour of day' : 'Ride demand by hour of day' };
    if (isIndexed) { demandOptions.min = 0; demandOptions.max = 100; }
    const hourlyCard = $('#hourlyChart'); if (hourlyCard) hourlyCard.innerHTML = lineChart(demandPoints, hourLabels, demandOptions);
    setText('#uberModeSummary', isIndexed ? 'Indexed demand makes the shape easier to compare with the published failure band.' : 'Absolute bookings keep the operating-volume question visible.');
    $$('[data-uber-mode]').forEach((button) => { const active = button.dataset.uberMode === uberMode; button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active)); });
    const dual = $('#failureChart'); if (dual) {
      dual.innerHTML = demandBandChart(UBER.hourlyBookings, hourLabels, { ...UBER.failureRange, knownPoints: [{ hour: 4, label: UBER.failureRange.quietHour.label, value: UBER.failureRange.quietHour.value }, { hour: 18, label: UBER.failureRange.busyHour.label, value: UBER.failureRange.busyHour.value }] }, { aria: 'Hourly demand with the published 24 to 26 percent failure-rate band' });
    }
    const dayChart = $('#dayChart'); if (dayChart) dayChart.innerHTML = barChart(UBER.weekdayWeekendAverage, { height: 220, valueLabel: fmt, xFormat: fmt, aria: 'Average bookings on weekdays versus weekends' });
    const pickupChart = $('#pickupChart'); if (pickupChart) pickupChart.innerHTML = barChart(UBER.pickupConcentration, { height: 180, max: 100, valueLabel: (value) => `${value}%`, aria: 'Pickup zone concentration' });
    attachTips();
  }

  function getHRFilters() {
    return { department: $('#departmentFilter')?.value || 'All', overtime: $('#overtimeFilter')?.value || 'All' };
  }
  function hrAggregate(filters) {
    const rows = HR_DATA.segmentViews.departmentOvertime.filter((row) => (filters.department === 'All' || row.Department === filters.department) && (filters.overtime === 'All' || row.OverTime === filters.overtime));
    return rows.reduce((acc, row) => ({ headcount: acc.headcount + row.headcount, leavers: acc.leavers + row.leavers }), { headcount: 0, leavers: 0 });
  }
  function filteredRoleRows(filters) {
    let rows;
    if (filters.department !== 'All' && filters.overtime !== 'All') {
      rows = HR_DATA.segmentViews.departmentRoleOvertime
        .filter((row) => row.Department === filters.department && row.OverTime === filters.overtime)
        .map((row) => ({ label: row.JobRole, headcount: row.headcount, leavers: row.leavers, rate: row.rate }));
    } else if (filters.overtime !== 'All') {
      rows = HR_DATA.segmentViews.roleOvertime
        .filter((row) => row.OverTime === filters.overtime)
        .map((row) => ({ label: row.JobRole, headcount: row.headcount, leavers: row.leavers, rate: row.rate }));
    } else if (filters.department !== 'All') {
      rows = HR_DATA.segmentViews.departmentRole
        .filter((row) => row.Department === filters.department)
        .map((row) => ({ label: row.JobRole, headcount: row.headcount, leavers: row.leavers, rate: row.rate }));
    } else {
      rows = HR_DATA.roles;
    }
    return rows.sort((a, b) => {
      if (hrRoleSort === 'label') return a.label.localeCompare(b.label);
      return b[hrRoleSort] - a[hrRoleSort];
    }).slice(0, 8);
  }
  function renderHR() {
    const filters = getHRFilters();
    const aggregate = hrAggregate(filters);
    const rate = aggregate.headcount ? (aggregate.leavers / aggregate.headcount) * 100 : 0;
    const filterLabel = [filters.department !== 'All' ? filters.department : '', filters.overtime !== 'All' ? `OT: ${filters.overtime}` : ''].filter(Boolean).join(' · ') || 'All employees';
    renderMetricCards([
      { label: 'Employees in view', value: fmt(aggregate.headcount), context: filterLabel },
      { label: 'Observed attrition', value: pct(rate), context: `${fmt(aggregate.leavers)} leavers in this view` },
      { label: 'Overtime signal', value: `${HR_DATA.overall.overtimeRate.toFixed(1)}%`, context: `vs ${HR_DATA.overall.nonOvertimeRate.toFixed(1)}% without overtime` },
      { label: 'Model recall', value: '56%', context: 'Logistic Regression catches more leavers' },
    ]);
    const overtimeChart = $('#overtimeChart'); if (overtimeChart) overtimeChart.innerHTML = barChart(HR_DATA.overtime.map((row) => ({ label: row.label === 'Yes' ? 'Works overtime' : 'No overtime', value: row.rate, tone: row.label === 'Yes' ? 'coral' : 'green' })), { max: 35, height: 190, valueLabel: pct, xFormat: pct, aria: 'Attrition rate by overtime status' });
    const roleChart = $('#roleChart'); if (roleChart) roleChart.innerHTML = barChart(filteredRoleRows(filters).map((row) => ({ label: row.label, value: row.rate, tone: row.rate >= 25 ? 'coral' : '' })), { max: Math.max(40, ...filteredRoleRows(filters).map((row) => row.rate)), height: 320, valueLabel: pct, xFormat: pct, aria: 'Attrition rate by job role' });
    const tenureChart = $('#tenureChart'); if (tenureChart) tenureChart.innerHTML = barChart(HR_DATA.tenure.map((row) => ({ label: row.label, value: row.rate, tone: row.rate >= 25 ? 'coral' : '' })), { max: 35, height: 230, valueLabel: pct, xFormat: pct, aria: 'Attrition rate by years at company band' });
    const metricLabel = hrMetric === 'f1' ? 'F1 score' : hrMetric === 'accuracy' ? 'Accuracy' : 'Recall';
    const modelChart = $('#modelChart'); if (modelChart) modelChart.innerHTML = barChart(HR_DATA.model.map((row) => ({ label: row.label, value: row[hrMetric], tone: row.label === 'Logistic Regression' ? 'green' : 'coral' })), { max: 100, height: 220, valueLabel: pct, xFormat: pct, aria: `${metricLabel} comparison` });
    setText('#modelMetricSummary', hrMetric === 'recall' ? 'Recall is the decision metric when the goal is to catch actual leavers.' : hrMetric === 'accuracy' ? 'Accuracy rewards overall correctness, but can hide missed leavers in an imbalanced sample.' : 'F1 balances precision and recall for a compact view of classifier trade-offs.');
    setText('#modelMetricLegend', `Selected metric: ${metricLabel.toLowerCase()}`);
    $$('[data-model-metric]').forEach((button) => { const active = button.dataset.modelMetric === hrMetric; button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active)); });
    $$('[data-role-sort]').forEach((button) => { const active = button.dataset.roleSort === hrRoleSort; button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active)); });
    const table = $('#roleTable'); if (table) table.innerHTML = renderTable(filteredRoleRows(filters).slice(0, 6), [
      { label: 'Job role', key: 'label' },
      { label: 'Headcount', render: (row) => fmt(row.headcount) },
      { label: 'Leavers', render: (row) => fmt(row.leavers) },
      { label: 'Rate', render: (row) => `<span class="rate-pill ${row.rate >= 25 ? 'high' : ''}">${pct(row.rate)}</span>` },
    ]);
    setText('#hrFilterSummary', `Showing ${filterLabel.toLowerCase()}. Rates are calculated within the selected view.`);
    attachTips();
  }

  if (type === 'hr') {
    $('#departmentFilter')?.addEventListener('change', renderHR);
    $('#overtimeFilter')?.addEventListener('change', renderHR);
    $('#resetFilters')?.addEventListener('click', () => { $('#departmentFilter').value = 'All'; $('#overtimeFilter').value = 'All'; renderHR(); $('#departmentFilter')?.focus(); });
    $$('[data-model-metric]').forEach((button) => button.addEventListener('click', () => { hrMetric = button.dataset.modelMetric; flashDashboard(); renderHR(); }));
    $$('[data-role-sort]').forEach((button) => button.addEventListener('click', () => { hrRoleSort = button.dataset.roleSort; flashDashboard(); renderHR(); }));
    renderHR();
  } else {
    $$('[data-uber-mode]').forEach((button) => button.addEventListener('click', () => { uberMode = button.dataset.uberMode; flashDashboard(); renderUber(); }));
    renderUber();
  }
})();

# Interactive Project Reports

These pages extend the existing portfolio without replacing its homepage:

- `uber-ride-demand/index.html` — interactive report for Case No. 001.
- `hr-employee-attrition/index.html` — interactive report for Case No. 002.
- `shared/report.css` and `shared/report.js` — shared presentation and runtime.
- `shared/uber-data.js` — source snapshot containing values published in `README.md` and `Uber_Ride_Analytics_Result.pdf` from `Nothing0g/Uber_ride_demand_analysis`.
- `shared/hr-data.js` — deterministic aggregates generated from the original `HR_Employee_Attrition.csv` using the same cleaning/target mapping documented in `HR_Employee_Attrition_Analysis.py`. Model metrics are the documented results from the original analysis/PDF.

The Uber repository currently publishes the README and PDF but not the underlying CSV or analysis script in the visible repository contents. For that reason, the Uber page uses only values explicitly published in those artifacts and does not invent a per-hour failure series. It shows the published 24–26% failure band and the documented quietest/busiest-hour points.

The dashboard pages use no external charting dependency and are deployed as ordinary GitHub Pages-compatible static files. The existing homepage remains the source of the shared portfolio experience; only the first two case-card click handlers point to these report pages. Both detail pages now load `shared/report-shell.js`, which reuses the original portfolio’s particle canvas, grid backdrop, custom circular cursor, cursor-follow label, dock navigation, command palette, scroll progress, active-section spy, theme persistence, reduced-motion handling, spotlight hover, and soft page transition. The first two homepage card handlers apply the matching `page-exit` transition before navigation, so the detail view reads as a focused continuation rather than an unrelated microsite.

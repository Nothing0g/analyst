# Interactive Project Reports

These pages extend the existing portfolio without replacing its homepage:

- `uber-ride-demand/index.html` — interactive report for Case No. 001.
- `interior-lead-funnel/index.html` — synthetic-data business-analysis report for Case No. 007.
- `hr-employee-attrition/index.html` — interactive report for Case No. 002.
- `posha-battery-door/index.html` — mechanical design report for Case No. 004.
- `loan-approval/index.html` — educational machine-learning report for Case No. 006.
- Homepage featured order: TrueStack Student Services AI Assistant, Turbine Maintenance Intelligence Copilot, Uber Ride Demand Analytics, and Interior Lead Funnel Leak Detector. The full archive contains all nine case studies.
- `shared/report.css` and `shared/report.js` — shared presentation and runtime.
- `interior-lead-funnel/lead-funnel.js` — dependency-free metric-toggle chart using the project's published synthetic scorecard.
- `shared/uber-data.js` — source snapshot containing values published in `README.md` and `Uber_Ride_Analytics_Result.pdf` from `Nothing0g/Uber_ride_demand_analysis`.
- `shared/hr-data.js` — deterministic aggregates generated from the original `HR_Employee_Attrition.csv` using the same cleaning/target mapping documented in `HR_Employee_Attrition_Analysis.py`. Model metrics are the documented results from the original analysis/PDF.

The Uber repository currently publishes the README and PDF but not the underlying CSV or analysis script in the visible repository contents. For that reason, the Uber page uses only values explicitly published in those artifacts and does not invent a per-hour failure series. It shows the published 24–26% failure band and the documented quietest/busiest-hour points.

The dashboard pages use no external charting dependency and are deployed as ordinary GitHub Pages-compatible static files. The existing homepage remains the source of the shared portfolio experience; the Uber, HR Attrition, POSHA, and Loan Approval case-card click handlers point to these report pages. All detail pages now load `shared/report-shell.js`, which reuses the original portfolio’s particle canvas, grid backdrop, custom circular cursor, cursor-follow label, dock navigation, command palette, scroll progress, active-section spy, theme persistence, reduced-motion handling, spotlight hover, and soft page transition. The routed homepage card handlers apply the matching `page-exit` transition before navigation, so the detail view reads as a focused continuation rather than an unrelated microsite.

## Complete project archive

- `truestack-ai-assistant/index.html` — Case No. 010; the HCLTech hackathon student-services assistant, with Shubham's team-lead, backend, workflow, and integration responsibilities called out separately from team work.

- `index.html` — searchable, filterable index for all nine case studies, grouped into Engineering AI, Data & Analytics, and Product & Design.
- `turbine-maintenance-copilot/index.html` — synthetic telemetry, anomaly detection, evidence retrieval, and human-review casefile.
- `pid-engineering-document-intelligence/index.html` — synthetic P&ID revision comparison and evidence-linked engineering graph casefile.
- `cultfit-user-behavior/index.html` — user research and competition-led MVP casefile.
- Every card in the archive links to its individual project detail page. Existing report pages link back to the archive.

The homepage spotlights four projects using the existing card layout and links to the complete nine-project archive.

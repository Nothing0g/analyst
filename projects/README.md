# Interactive Project Reports

This folder contains the complete, nine-case project archive. Pages reuse the existing monochrome visual system, shared typography, theme toggle, navigation, reveal behavior, and page-transition runtime; the archive order follows the case numbers.

## Case files

- `uber-ride-demand/index.html` — Case 001: ride-demand patterns and supply-failure analysis.
- `hr-employee-attrition/index.html` — Case 002: attrition drivers and model-recall trade-offs.
- `cultfit-user-behavior/index.html` — Case 003: user research and competition-led fitness MVP.
- `posha-battery-door/index.html` — Case 004: latch concept selection, tolerance, FEA, and DFM.
- `loan-approval/index.html` — Case 005: interpretable logistic-regression baseline and class-imbalance limits.
- `interior-lead-funnel/index.html` — Case 006: synthetic lead funnel, response SLA, and follow-up priorities.
- `turbine-maintenance-copilot/index.html` — Case 007: synthetic telemetry, anomaly detection, evidence retrieval, and human review.
- `pid-engineering-document-intelligence/index.html` — Case 008: synthetic P&ID graph extraction, revision comparison, and source-linked answers.
- `truestack-ai-assistant/index.html` — Case 009: the HCLTech student-services assistant, with Shubham's team-lead, backend, workflow, and integration contributions documented separately from team work.

## Shared runtime and data

- `projects/index.html` — searchable, filterable archive sorted by case number.
- `shared/report.css` — shared report styling and responsive layouts.
- `shared/report-shell.js` — theme persistence, command palette, navigation, reveal logic, cursor, canvas backdrop, and page transitions.
- `shared/uber-data.js` and `shared/hr-data.js` — report data snapshots derived from the documented source artifacts.
- `interior-lead-funnel/lead-funnel.js` — dependency-free metric toggle for the synthetic funnel scorecard.

The dashboard pages use no external charting dependency and run as static files on GitHub Pages. Low-performance mode is enabled for reduced-motion preferences and constrained/mobile devices. Animated cursor and canvas loops pause while a tab is hidden; canvas resizing is coalesced to avoid rebuilding the star field repeatedly during a resize burst.

## Evidence and limitations

The Uber page uses values explicitly published in its source README/PDF and flags likely synthetic data rather than inventing unsupported per-hour failure values. The HR page uses reproducible aggregates and documented model results. The engineering-AI projects use synthetic telemetry, authored procedures, and synthetic P&ID drawings; they are prototypes, not plant deployments or safety approvals. TrueStack uses fictional student records and labels sample policies that are not official DTU policy. Its report separates documented structural checks from a full RAG/LLM evaluation that was still pending in the cited evaluation report.

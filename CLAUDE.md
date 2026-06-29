# OncOS — Systemic Therapy module

This is a project folder under `Projects/`. It inherits the workspace setup — do not duplicate it here.

## Inheritance — read these first

The root workspace governs this project. At the start of work in this folder, the root `/CLAUDE.md` and the three `About Me/` pages (`about-me.md`, `writing-rules.md`, root `memory.md`) already apply: who Jonan is, the writing rules, and the operating instructions (thinking-partner stance, PRD-before-build, pushback, reversibility gate, working style). This file only adds what is specific to this project.

## Project brief

- **Problem / goal:** The OncOS suite's systemic-therapy reference module — a self-contained, offline quick-reference for systemic anticancer regimens (chemo, IO, targeted, ADCs, endocrine): dosing, schedule, dose modifications, supportive care, cited sources. Repackages the earlier `2026-06-24-chemo-reference` app into OncOS chrome and the suite's navigation grammar.
- **Success criteria:** OncOS skin (teal accent bar + `OncOS` wordmark linking back to the hub, `SYSTEMIC THERAPY` mono-caps tagline, mono-caps section labels, sans title-case regimen names, light-only flat theme, disclaimer footer); left sidebar grouping regimens by tumour system + mobile drawer (transparent backdrop); capsule pill icon; reachable from the hub; published as an installable PWA at the suite URL.
- **Scope / out of scope:** IN — front-end shell, sidebar nav, mobile drawer, PWA packaging (content-hash SW, network-first), capsule icon, deploy to GitHub Pages. OUT (this pass) — changing regimen data, a dedicated expected-toxicity field, cross-module search, auth.
- **Constraints:** Reference, not a prescribing system — never fabricate a dose; cite real sources; update a regimen's `verified` date whenever its dose changes. Bulk edits to `regimens.js` fall under the reversibility gate. Generated/static; host-side deploy only.
- **Status:** [active] — built + verified locally; publish pending Jonan's go.

## How it runs

Open `index.html` in any browser (no server; `regimens.js` holds the data). Adding a regimen = copy a block in `regimens.js` (template + field reference in `README.md`). The sidebar groups the granular `tumour` values into eight system headers via the `SYSTEMS` map in `index.html` — extend that map if a new tumour value needs a home.

- `make_icons.py` → teal capsule PWA icons. `make_sw.py` → `sw.js` with a content-hash cache name + network-first fetch (the OncOS PWA rule). `deploy.sh` regenerates both and pushes to GitHub Pages.
- Local preview: `oncos-systemic` server in the root `.claude/launch.json` (port 8775).

## Suite wiring

Part of the OncOS suite (hub → modules). The wordmark back-links to `https://jonanze.github.io/oncos/`. On publish: repo `jonanze/oncos-systemic`, live at `https://jonanze.github.io/oncos-systemic/`, added as a card (capsule icon) to `MODULES` in the hub's `build_hub.py`. Supersedes the standalone `2026-06-24-chemo-reference` app + its `chemo-regimen-reference` repo (retire after this is verified live).

## Project memory

Continuity for this project lives in this folder's `memory.md`. Maintain it without being asked — append dated entries, update in place, keep them terse. The root `memory.md` carries only a one-line pointer to this project.

# Memory — OncOS Systemic Therapy module

Working memory for this project only. Read it when resuming work here. Cross-project context stays in the root `About Me/memory.md`; this file is scoped to this folder.

## How this file works

Same rules as the root memory file: append new entries at the bottom (newest last), update entries in place when something changes, keep each terse — a date (YYYY-MM-DD), a short `[tag]`, a one- or two-line note. No patient-identifiable information.

## Status

- **Current status:** [active] — built + verified locally; NOT yet published.
- **Next steps:** on Jonan's go — create repo `jonanze/oncos-systemic`, enable Pages, `bash deploy.sh`; add a capsule-icon card to the hub's `build_hub.py` MODULES + redeploy hub; verify live; then retire the old `2026-06-24-chemo-reference` / `chemo-regimen-reference` repo.
- **Open threads:** later content pass — workshop a dedicated expected-toxicity field + richer dose-reduction logic (dose reductions currently live in the `modifications` field). Old chemo-reference folder + repo left intact pending retirement.

## Log

*Newest entries at the bottom. Append below this line.*

- 2026-06-29 — [build] Repackaged the chemo-reference app as the OncOS "Systemic Therapy" module. New folder scaffolded from `_template`; `regimens.js` (68 verified regimens) copied unchanged. Built a fresh `index.html` in OncOS chrome: teal `--accent #1f6f8b`, `OncOS` wordmark (OS teal) with back-link to the hub, `SYSTEMIC THERAPY` mono-caps tagline, mono-caps section labels, sans title-case regimen names, dark mode dropped (suite is light-only). Navigation overhauled to a left sidebar grouping regimens into 8 tumour systems (Thoracic 9, Breast 21, GI 22, GU 10, Gynae 7, H&N 4, Skin/Melanoma 4, Endocrine 1) via a `SYSTEMS` map; mobile sticky header + off-canvas drawer with transparent backdrop, brand in header. Capsule pill icon chosen (option A) — `make_icons.py` recoloured to teal. PWA: manifest rebranded "OncOS — Systemic Therapy"; `make_sw.py` generates `sw.js` with a content-hash cache + network-first fetch (OncOS PWA rule). `deploy.sh` mirrors the suite. Local preview server `oncos-systemic` (port 8775) added to root launch.json. Verified in preview: 68 cards, counts correct, expand/section layout, system filter, mobile drawer all working, no console errors. Decisions workshopped with Jonan: name "Systemic Therapy", system groupings, repo `oncos-systemic`, build re-skin first / toxicity+dose-reduction content as a later pass.

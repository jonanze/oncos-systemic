# OncOS — Systemic Therapy

The systemic-therapy reference module of the OncOS suite — a self-contained,
offline quick-reference for systemic anticancer regimens (chemotherapy,
immunotherapy, targeted agents, ADCs, endocrine therapy): dosing, schedule,
dose modifications, supportive care, and cited sources. Built for fast
point-of-care lookup on phone, tablet, or desktop.

## Running it

Double-click `index.html` — it opens in any browser, no internet, no install,
no server. Installable as a PWA from the live site, and works fully offline once
loaded.

Files:
- `index.html` — the app (sidebar nav, search, layout, OncOS styling). Rarely touched.
- `regimens.js` — **the data**. The file you edit to add/change regimens.
- `make_icons.py` / `make_sw.py` / `deploy.sh` — PWA icons, service worker, and publish.
- `README.md` — this file.

## Features

- Left sidebar grouping regimens by tumour system (Thoracic, Breast, GI, GU,
  Gynaecological, Head & Neck, Skin/Melanoma, Endocrine); mobile off-canvas drawer
- Live search across regimen name, shorthand/aliases, drug names, and tumour type
- Expandable cards: drug-by-drug dose/route/days, cycle, dose modifications,
  supportive care, source citations, and a "last reviewed" date
- Clean **print** layout (browser → Print expands every card)

## Adding or editing a regimen

1. Open `regimens.js` in any text editor.
2. Copy the **TEMPLATE** block at the top of the file (it's in a comment).
3. Paste it inside the `window.REGIMENS = [ ... ]` list, near similar tumour
   types. Put a comma between entries.
4. Fill in the fields and save. Refresh the browser.

Only `id`, `name`, `tumour`, and `drugs` are required; everything else is
optional and hidden if omitted. The sidebar groups the granular `tumour` value
into a system header via the `SYSTEMS` map in `index.html` — if you add a
tumour value that no rule matches, extend that map so it lands in a system.

## Data scope & safety

- Current set: **68 regimens** across thoracic, GI (incl. hepatocellular &
  biliary), breast (incl. HR+/HER2− endocrine & targeted), GU, gynae/cervical,
  melanoma/immunotherapy, and head & neck.
- Doses reflect standard-of-care references and the cited pivotal trials,
  reviewed on each regimen's `verified` date.
- **This is a reference, not a prescribing system.** Always confirm doses
  against your institutional protocol and current prescribing information.
- When you update a regimen's dose, update its `verified` date too.

## Publishing

`bash deploy.sh` regenerates the icons + content-hash service worker and pushes
to GitHub Pages (repo `jonanze/oncos-drugs`, live at
`https://jonanze.github.io/oncos-drugs/`). Run host-side. The wordmark links
back to the OncOS hub; the hub carries a card to this module.

## Ideas for later

- A dedicated expected-toxicity field per regimen + richer dose-reduction logic
- Carboplatin AUC (Calvert) calculator
- BSA-based per-drug mg calculator (enter height/weight)
- Export/print a single regimen as a one-page sheet

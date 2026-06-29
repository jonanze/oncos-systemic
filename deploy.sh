#!/usr/bin/env bash
# Regenerate the service worker (content-hash cache) and publish to GitHub Pages.
# Repo: https://github.com/jonanze/oncos-systemic
# Live: https://jonanze.github.io/oncos-systemic/
# Run host-side (Claude Code), not in a sandbox. gh CLI at ~/.local/bin.
set -euo pipefail
cd "$(dirname "$0")"
export PATH="$HOME/.local/bin:$PATH"

python3 make_icons.py >/dev/null   # icons are static; regenerates if missing/changed
python3 make_sw.py

git add -A
if git diff --cached --quiet HEAD 2>/dev/null; then
  echo "No change to publish."
else
  git -c user.name="Jonan" -c user.email="jonantanzhien@gmail.com" \
    commit -q -m "Update OncOS — Systemic Therapy ($(date +%F))"
  git push -q origin main
  echo "Pushed -> https://jonanze.github.io/oncos-systemic/ (Pages rebuild ~1 min)"
fi

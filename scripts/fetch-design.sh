#!/usr/bin/env bash
# fetch-design.sh — wraps Claude Design "Hand off to Claude Code" export
#
# Given a Claude Design URL, pulls components into src/components/_claude-design-drafts/
# on a dated branch and opens a draft PR with OK_web-design + OK_cmo-review as
# required reviewers.
#
# IMPORTANT: drafts NEVER land in src/components/ directly. tsconfig.json excludes
# _claude-design-drafts from imports — you'll get an astro check failure if a route
# tries to import from it. Promotion to real component paths is a separate curated
# commit, owned by OK_web-design, which also converts React/Next JSX to Astro + Tailwind.
#
# Usage: scripts/fetch-design.sh <claude-design-url>

set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "usage: $0 <claude-design-url>" >&2
  exit 2
fi

URL="$1"
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

if ! command -v claude >/dev/null 2>&1; then
  echo "fetch-design: FAIL — \`claude\` CLI not on PATH. Install Claude Code first." >&2
  exit 2
fi
if ! command -v gh >/dev/null 2>&1; then
  echo "fetch-design: FAIL — \`gh\` CLI required for PR creation." >&2
  exit 2
fi

TS="$(date -u +%Y%m%dT%H%M%SZ)"
BRANCH="design/claude-$TS"
DRAFT_DIR="src/components/_claude-design-drafts"

mkdir -p "$DRAFT_DIR"
git checkout -b "$BRANCH"

echo "fetch-design: pulling from $URL …"
# claude fetch-design writes generated files into the target dir.
# The real command signature will firm up once Claude Design exposes a stable
# CLI. Until then this is the placeholder invocation — check output dir after.
claude fetch-design "$URL" --out "$DRAFT_DIR"

# Stamp a metadata file so reviewers know provenance
cat > "$DRAFT_DIR/.claude-design-provenance-$TS.md" <<EOF
# Claude Design handoff — $TS

- URL: $URL
- Branch: $BRANCH
- Exported at: $(date -u +"%Y-%m-%dT%H:%M:%SZ")

## Promotion checklist (OK_web-design)

1. Convert any React/Next JSX to Astro + Tailwind
2. Replace raw hex values with tokens from \`tailwind.config.mjs\`
3. Verify type scale matches \`brand.md\`
4. Run \`bun run check\` + Lighthouse locally
5. Move the component out of \`_claude-design-drafts/\` to its real path
6. Delete this provenance file in the promotion commit
EOF

git add "$DRAFT_DIR"
git commit -m "design(claude): import handoff $TS from $URL"
git push -u origin "$BRANCH"

gh pr create \
  --draft \
  --title "design(claude): handoff $TS" \
  --body "Claude Design export pulled from $URL into \`$DRAFT_DIR\`. Drafts are not importable from production routes. OK_web-design: please Astro/Tailwind-convert and promote in a separate commit." \
  --reviewer OK_web-design,OK_cmo-review

echo "fetch-design: draft PR opened on branch $BRANCH"

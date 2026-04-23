#!/usr/bin/env bash
# brand-check.sh — fails if brand/brandbook.pdf sha256 drifts from brand/brandbook-version.yml
# Runs in pre-commit and ci.yml. Any drift means someone changed the PDF without
# bumping the version + regenerating downstream artefacts. Hard fail.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PDF="$REPO_ROOT/brand/brandbook.pdf"
YAML="$REPO_ROOT/brand/brandbook-version.yml"

if [[ ! -f "$PDF" ]]; then
  echo "brand-check: FAIL — $PDF missing. Vendor the brandbook (Phase B.0.0)." >&2
  exit 2
fi
if [[ ! -f "$YAML" ]]; then
  echo "brand-check: FAIL — $YAML missing." >&2
  exit 2
fi

# Portable sha256: shasum on macOS, sha256sum on Linux
if command -v shasum >/dev/null 2>&1; then
  ACTUAL="$(shasum -a 256 "$PDF" | awk '{print $1}')"
else
  ACTUAL="$(sha256sum "$PDF" | awk '{print $1}')"
fi

# Extract sha256 from YAML without a yaml lib — simple grep works for this schema.
EXPECTED="$(grep -E '^sha256:' "$YAML" | awk '{print $2}' | tr -d '[:space:]')"

if [[ -z "$EXPECTED" ]]; then
  echo "brand-check: FAIL — no sha256 in $YAML" >&2
  exit 2
fi

if [[ "$ACTUAL" != "$EXPECTED" ]]; then
  cat >&2 <<EOF
brand-check: FAIL — brandbook.pdf sha256 drift

  expected (from $YAML): $EXPECTED
  actual   (from $PDF):  $ACTUAL

If you intentionally updated the brandbook:
  1. Bump \`version:\` in $YAML
  2. Update \`sha256:\` to: $ACTUAL
  3. Re-run extraction → \`brand/brandbook-extracted.md\`
  4. Re-export tokens into \`tailwind.config.mjs\` + \`brand.md\`
  5. Re-upload \`design/skill.md\` to Claude Design
  6. Regenerate affected \`_claude-design-drafts/\` if needed
Then commit all changes in one PR.
EOF
  exit 1
fi

echo "brand-check: OK — brandbook.pdf matches pinned sha256 ($EXPECTED)"

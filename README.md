# opskern-website

Landing site for **aiconsole** at opskernel.io. Astro 4 + Tailwind + TypeScript, deployed via Cloudflare Pages.

Plan: `~/.claude/plans/async-swinging-bonbon.md` (mirrored to `~/ai-wiki/projects/aiconsole-core/plans/active/opskernel-site-launch.md`).

## Stack

- **Astro 4** with the `@astrojs/tailwind` integration
- **Tailwind CSS 3** — tokens in `tailwind.config.mjs`, sourced from `brand.md`
- **TypeScript 5** strict
- **Bun** package manager (aligns with aiconsole-core desktop/web/)

## Run locally

```bash
bun install
bun run dev      # http://localhost:4321
```

## Check

```bash
bun run check    # astro check — type errors
bun run lint     # eslint
bun run format   # prettier --write .
bun run build    # astro build (output: dist/)
```

## Pre-commit hook

Enable once per clone:

```bash
git config core.hooksPath .githooks
```

Runs: gitleaks → prettier --check → astro check → astro build → scripts/brand-check.sh.
Merging to `main` without this passing is a policy violation. Branch protection on `main` enforces it via `ci.yml`.

## Brandbook

Source of truth: `brand/brandbook.pdf` (vendored). Version pinned in `brand/brandbook-version.yml`.

`scripts/brand-check.sh` recomputes the PDF sha256 and fails if it drifts from the YAML without a conscious `version:` bump.

## Deploy

Automated via `.github/workflows/deploy.yml` on push to `main`. Cloudflare Pages project: `opskernel-io-site`.

## Intelligence feed

`src/content/feature-proposals/latest.md` is **not** vendored. It's pulled daily by `.github/workflows/intel-refresh.yml` from `~/ai-wiki/projects/aiconsole-core/intel/feature-proposals.md`. Only entries where `visible_public: true` AND `priority ∈ {P0,P1}` AND `status == approved` render in the WhatsNew section.

## Claude Design handoff

`scripts/fetch-design.sh <claude-design-url>` creates a branch, writes components to `src/components/_claude-design-drafts/`, opens a PR. Drafts are NOT importable from production routes (`tsconfig.json` excludes the directory). OK_web-design converts drafts to Astro/Tailwind before promotion.

## Not in scope

Blog, docs, SEO content strategy. This is a landing site. The company surface (SOC 2, MSP content) lives separately at opskern.com (Hugo).

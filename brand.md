# hookd brand — human-readable guide

> Canonical source: `brand/brandbook.pdf` (sha256-pinned via `brand/brandbook-version.yml`).
> Machine-readable: `design/skill.md` for Claude Design; `tailwind.config.mjs` for build-time tokens.
> This file explains the _feel_ and rules — the "why," not the values.

## Voice

Competent friend. Technical but unpretentious. Reads like a good README, not a
tech-bro landing page. No fake enthusiasm. Lead with the point.

## Visual feel

"Developer tool with taste" — not "AI lab brochure." Precedents to borrow
structure from: Linear (calm hierarchy), Fly.io (typographic confidence),
Stripe (clarity of motion). Precedents NOT to copy: claude.ai (serifs, warm
palette), ChatGPT (modal-heavy UI), any "AI-generated art" hero treatments.

## The fixed frame

- Dark surface, single cool accent, generous whitespace.
- One H1 per page. Primary CTA unique. Secondary CTA visually subordinate.
- Type scale is a ladder: 48 / 32 / 20 / 16 / 14 px. Don't invent new steps.
- All color is a token (`tailwind.config.mjs`). No hex values in component files.
- All spacing is a multiple of 4 px. The `section` token (6 rem) separates major bands.
- No carousels. No modals on load. No horizontal scrollers. No auto-playing video.

## Motion

Sparingly. Only for state changes. `prefers-reduced-motion` must disable all non-essential
transitions. Max duration 0.2s for interactive feedback, 0.4s for section reveals, never
repeating.

## Imagery

Functional diagrams over photography. SVG over raster. No stock "abstract tech" imagery.
If we must show a screenshot, it's of the actual product, cropped tight, with a subtle
surface.raised border. No drop shadows, no perspective tilt.

## Logo behavior

See `brand/brandbook-extracted.md` once poppler is installed and extraction runs.
Until then, use the text wordmark "hookd" in the display family, lowercase, tracking
-0.02em. Company chip ("from OpsKern") stays in the footer only.

## Derivation

```
brand/brandbook.pdf
  └── brand/brandbook-extracted.md    (structured values)
        ├── brand.md                    (this file)
        ├── tailwind.config.mjs         (color/font tokens)
        ├── src/styles/brand.css        (CSS custom props)
        └── design/skill.md             (Claude Design manifest)
```

Any PR that touches one file in this chain should touch all of them, or explain why not.

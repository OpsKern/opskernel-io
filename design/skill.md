---
name: aiconsole design system
description: Design manifest for opskernel.io landing site. Upload to Claude Design workspace so every UI iteration starts from the branded baseline. Regenerate downstream when brand/brandbook-version.yml version bumps.
product: aiconsole
surface: opskernel.io landing site
feel: developer tool with taste — not "AI lab brochure"
---

# aiconsole design system

This is the Claude Design `skill.md` manifest. It teaches the prototyping agent
the fixed frame — brand tokens, type scale, component vocabulary — so iterations
don't drift into generic AI-lab aesthetic.

Source of truth for all values: `brand/brandbook-extracted.md` (derived from
`brand/brandbook.pdf`, sha256-pinned). If a value here conflicts with the
brandbook, the brandbook wins — refresh this file and re-upload.

## Product

- **Product name:** aiconsole (lowercase)
- **Company:** OpsKern
- **One-line pitch:** Stop AI from leaking your code before you hit send.
- **Audience:** developers at regulated-IC companies; ICP = backend/platform
  engineers who use Claude Code, Cursor, or Copilot against sensitive repos

## Do / Don't

- **Do:** generous whitespace, monospace for code tokens, dark surface with a
  single cool accent, functional diagrams, sharp 90° corners with ≤4 px
  rounding on interactive elements.
- **Don't:** hand-drawn accents, serif display, terracotta/cream palettes,
  fake-AI-glow gradients, stock "abstract tech" imagery, clip-art shields,
  carousels, modals-on-load.

## Palette (Tailwind tokens)

> Placeholder values pending brandbook extraction. Do not deploy with these
> until `brand/brandbook-extracted.md` is populated and reconciled.

```yaml
surface:
  DEFAULT: '#0B0F14' # dark page background
  raised: '#121821' # cards, elevated sections
  sunken: '#05080C' # footer, code blocks
ink:
  DEFAULT: '#E6EDF3' # body text on surface
  muted: '#8B98A5' # secondary text
  subtle: '#566270' # captions, form hints
accent:
  DEFAULT: '#4AD3C2' # primary CTA, active state
  hover: '#5FDECC'
  press: '#39B8A9'
semantic:
  danger: '#F87171'
  warn: '#FBBF24'
  ok: '#34D399'
```

All text must clear WCAG AA (4.5:1 body, 3:1 large) against the surface it sits on.

## Typography

- **Display:** grotesk sans — `"Inter Display"` or `"Inter Variable"` as fallback
  until brandbook display face is sourced. Hero copy only.
- **Body sans:** `"Inter Variable"` / `Inter` / `system-ui`. Everything non-display.
- **Mono:** `"JetBrains Mono Variable"` / `"JetBrains Mono"` / `ui-monospace`.
  Code tokens, inline `key=value`, terminal output, install one-liner.
- **Weights:** 400 body, 500 labels, 600 H2/H3, 700 H1/display hero.

## Type scale

| step    | size            | line-height | tracking | usage              |
| ------- | --------------- | ----------- | -------- | ------------------ |
| display | 3rem (48px)     | 1.05        | -0.02em  | hero               |
| 4xl     | 2rem (32px)     | 1.15        | -0.015em | section H2         |
| 2xl     | 1.25rem (20px)  | 1.35        | 0        | subhead, lead      |
| base    | 1rem (16px)     | 1.6         | 0        | body               |
| sm      | 0.875rem (14px) | 1.5         | 0        | caption, form hint |

## Spacing

- Base unit: 0.25rem (4 px) — all spacing is a multiple
- `section` token: 6rem between major sections
- Page gutter: 1.5rem mobile, 2rem tablet, 4rem desktop
- Max content width: `72ch` (prose) / `42rem` (narrow)

## Component vocabulary

- **Button.primary** — accent background, surface text, 2.5rem tall, 1rem padding-x
- **Button.secondary** — transparent background, accent border + text, same size
- **Card** — surface.raised background, 0.75rem radius, 1.5rem padding, no shadow
- **Pill** — surface.raised background, ink.muted text, uppercase tracking, 10 px
- **Link** — accent text with underline on hover, focus outline always visible
- **Code inline** — mono, surface.raised background, 0.25rem padding-x
- **CTA row** — 2 buttons max, primary + secondary, stacked on mobile

## Layout primitives (see `design.md`)

- Hero: full-width surface, centered content, primary + secondary CTA, 60vh minimum
- Feature grid: 3-up desktop, 1-up mobile, no horizontal rules, icon above label
- Pricing table: 3 columns, highlight middle tier if recommended, per-tier license row
- Content collection render (`WhatsNew`): row list with engine-badge + text, no columns

## Do-not-ship checklist

Before a Claude Design export is merged:

- [ ] All colors are Tailwind tokens — no hex values in component files
- [ ] All spacing is a 0.25rem multiple
- [ ] All fonts are from the declared family — no accidental Google Fonts
- [ ] Primary CTA is unique on the page and above the fold
- [ ] Dark-mode renders with no pure-black (#000) or pure-white (#FFF) text
- [ ] Focus rings visible on all interactive elements
- [ ] `prefers-reduced-motion` respected
- [ ] No serif anywhere, no hand-drawn illustration

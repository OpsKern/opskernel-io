# design.md — layout primitives for the 7 site sections

Companion to `design/skill.md`. Captures structural defaults so Claude Design
doesn't redesign layout from scratch on each iteration. Copy changes freely;
layout shape stays put unless deliberately changed.

## 1. Hero

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│   aiconsole ●                          [GitHub] ↗   │
│                                                     │
│   Stop AI from leaking your code                    │
│   before you hit send.                              │
│                                                     │
│   Local-first governance for Claude Code,           │
│   Cursor, and every LLM that sees your repo.        │
│                                                     │
│   [Join waitlist]   [View on GitHub]                │
│                                                     │
│   ┌─────────────── Block-flow SVG ───────────────┐  │
│   │ prompt → redact → block (or allow + log)    │  │
│   └───────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

- Full-width surface
- Height: min-h-[60vh], padding-y section token
- Content max-width: 72ch centered
- Wordmark top-left; single nav link (GitHub) top-right — no nav menu yet
- H1 display, two lines max
- Subhead: ink.muted, 2xl
- CTA row: primary (accent) + secondary (outline) — primary on left
- Block-flow SVG: inline, monochrome, no animation; GIF swap is B.3.1 follow-up

## 2. Trust anchors

```
Apache 2.0  ·  local-first  ·  no SDK required  ·  vendor-neutral
[Claude]  [GPT]  [Gemini]  [Ollama]  [Cursor]  [Copilot]
```

- Single row, ink.muted text with middot separators
- Logo strip: monochrome, no color, evenly spaced
- No hover interaction

## 3. Problem

```
Your AI assistant is an exfiltration vector you haven't audited.

[icon]          [icon]          [icon]
Prompt leaks    Code leaks      No audit trail
One line        One line        One line
explanation     explanation     explanation
```

- 3-up grid, 1-up mobile
- Icons monochrome, not colored — accent reserved for CTA
- Each pain point: icon → label (500 weight) → body sentence

## 4. How it works

```
 Capture          Redact           Block / Allow
[OS hook]    →   [Classifier]  →  [Decision]  →  log
```

- Horizontal 3-step diagram, centered
- Step labels above, sub-labels below
- Arrows simple, no animation
- Under the diagram: 2-line explanation — native OS hooks, no SDK, no cloud

## 5. Feature grid

```
┌────────────┬────────────┬────────────┐
│ Pre-send   │ Vendor-    │ Compliance │
│ blocking   │ neutral    │ ready      │
├────────────┼────────────┼────────────┤
│ Hash-chain │ DSAR gates │ Local-     │
│ audit      │            │ first      │
└────────────┴────────────┴────────────┘
```

- 3x2 on desktop, 1 column on mobile
- Each cell: label (500 weight) + 1-sentence body
- No hover lift, no shadow; surface.raised background

## 6. Pricing

```
┌─────────────┬─────────────┬─────────────┐
│ Desktop     │ Team Server │ Enterprise  │
│ Free        │ Post-beta   │ Later       │
├─────────────┼─────────────┼─────────────┤
│ Apache 2.0  │ BSL 1.1     │ Custom      │
├─────────────┼─────────────┼─────────────┤
│ • feat      │ • feat      │ • feat      │
│ • feat      │ • feat      │ • feat      │
├─────────────┼─────────────┼─────────────┤
│ [Download]  │ [Join list] │ [Contact]   │
└─────────────┴─────────────┴─────────────┘
```

- 3 columns, middle tier has subtle accent border
- Second row: explicit per-tier license (required — OK_clo-review gate)
- CTA per column, primary on middle tier only

## 7. WhatsNew (intel feed)

Rendered by `src/components/WhatsNew.astro` from `src/content/feature-proposals/latest.md`.
Shows only entries where `visible_public: true` AND `priority ∈ {P0,P1}` AND `status == approved`.

```
What's new in AI governance

[Claude]  MCP tool audit hooks      →  Redacts MCP tool arguments by default
[GPT]     Assistants v2 streaming   →  Pre-send blocking now covers streaming
[Gemini]  Files API upload          →  Workspace redaction auto-enrolls files
```

- Row list, no columns
- Engine badge: pill, mono family, surface.raised
- Title: 500 weight
- Implication: ink.muted, 1-sentence
- Max 5 rows; truncate if more

## 8. Footer CTA

```
Join the waitlist
[__________________] [Subscribe]

aiconsole · from OpsKern                    [GitHub] [Privacy] [Terms] [FAQ]
opskernel.io                                 © 2026 OpsKern
```

- Section separator: 1 px ink.subtle border-t
- Waitlist form: single email field + button
- Links right-aligned on desktop, stacked on mobile
- No newsletter double-opt-in nag here — DOI happens in Buttondown

# brandbook-extracted — structured capture of brand/brandbook.pdf

> **Source:** `brand/brandbook.pdf` (sha256: `560a9452ba65a1013f63e23c18d349aecbc0104dbfc9325471676cf6424e02d7`)
> **Extracted:** 2026-04-23 via visual inspection (pdftoppm + Read tool, all 31 pages)
> **Version:** brandbook v1.0, created 2026-04-17 in Adobe Illustrator
> **Pending:** 4 items still with designer — see `[PENDING]` markers below.

---

## Wordmark

- **Brand name:** OPSKERN
- **Tagline:** "THE OPERATIONS KERNEL" (appears below wordmark in all approved lockups)
- **Cover tagline:** `[PENDING #1]` — cover still reads "MONITOR, AUTOMATE, RESOLVE FAST." Approved update is "COMPLIANCE AND INFRASTRUCTURE, BUILT AND RUNNING." (already correct on social media cover p.28 — awaiting fix on p.1)
- **Wordmark font:** `[PENDING #4]` — logo page does not call out the specific font/weight used for "OPSKERN" and "THE OPERATIONS KERNEL." Visually consistent with Helvetica Now Display Bold (caps) for wordmark and Helvetica Now Light/Regular (tracked caps) for subtitle, but this must be confirmed by designer before it's used in code.
- **Mark:** Circular gradient badge — abstract swooping form in amber gradient on dark or white field.

### Approved lockup variants

| Background     | Logo treatment                            | Approved? |
| -------------- | ----------------------------------------- | --------- |
| White          | Full color gradient mark + black wordmark | ✓         |
| Black          | Full color gradient mark + white wordmark | ✓         |
| Amber gradient | White reversed mark + white wordmark      | ✓         |
| White          | Mono mark (no gradient) + black wordmark  | ✓         |

### Clear space

- **All sides:** 20px minimum (confirmed from construction grid, p.4)
- **Internal grid proportions:** `[PENDING #2]` — grid lines are present but numerical ratios/column widths are not labeled. 20px clear space is the only confirmed measurement.

### Minimum sizes

| Context | Full lockup | Icon only | Wordmark only |
| ------- | ----------- | --------- | ------------- |
| Print   | 1 inch      | 1 inch    | 0.25 inch     |
| Web     | 120px       | 120px     | 60px          |

### Logo don'ts

- No added effects (drop shadow, glow, etc.)
- No rotation
- No stretching or distortion
- No blurring
- No recoloring outside approved palette
- No placement on unapproved backgrounds

---

## Palette

### Primary

| Name         | Hex       | RGB             | CMYK              | Pantone | Tailwind token     | Usage                                    |
| ------------ | --------- | --------------- | ----------------- | ------- | ------------------ | ---------------------------------------- |
| Amber bright | `#FBBF26` | 251 / 191 / 38  | 1 / 28 / 88 / 0   | 1235 C  | `brand.amber`      | Logo gradient start, CTAs, active states |
| Amber dark   | `#B55417` | 181 / 84 / 23   | 22 / 73 / 6 / 12  | 7573 C  | `brand.amber-dark` | Logo gradient end, hover states          |
| White        | `#FFFFFF` | 255 / 255 / 255 | 0 / 0 / 0 / 0     | WHITE   | `brand.white`      | Light backgrounds, reversed text         |
| Black        | `#000000` | 0 / 0 / 0       | 91 / 79 / 60 / 97 | BLACK   | `brand.black`      | Dark backgrounds, primary text           |

### Secondary

| Name         | Hex       | RGB            | CMYK              | Pantone | Tailwind token      | Usage                                |
| ------------ | --------- | -------------- | ----------------- | ------- | ------------------- | ------------------------------------ |
| Amber light  | `#F9C655` | 249 / 198 / 85 | 2 / 25 / 74 / 0   | 123 C   | `brand.amber-light` | Accents, supporting highlights       |
| Burnt orange | `#BC682F` | 188 / 104 / 47 | 21 / 64 / 87 / 10 | 7572 C  | `brand.orange`      | Gradient midtones, hover secondary   |
| Dark gray    | `#3D3D3D` | 61 / 61 / 61   | 67 / 57 / 54 / 59 | 11C     | `brand.gray-dark`   | Muted text, borders on light surface |

### Gradient

- **Direction:** horizontal (left-to-right in most applications); radial in some logo badge applications
- **Start:** `#FBBF26` (amber bright)
- **End:** `#B55417` (amber dark)
- **Intermediate stops:** `[PENDING #3]` — only start and end colors are documented; designer must provide midpoint hex values before the gradient can be implemented in CSS exactly as specified.
- **Working approximation** (use until confirmed): `linear-gradient(90deg, #FBBF26 0%, #E8931E 40%, #B55417 100%)` — do not ship to production without designer confirmation.
- **Secondary gradient palette** (used in secondary color pages, p.10–11): `#F9C655` → `#BC682F` → `#000000`

### Approved text-on-color combinations

| Background                             | Text color                         | Approved |
| -------------------------------------- | ---------------------------------- | -------- |
| Amber gradient (`#FBBF26` → `#B55417`) | White `#FFFFFF`                    | ✓        |
| White `#FFFFFF`                        | Black `#000000` or amber `#FBBF26` | ✓        |
| Black `#000000`                        | White `#FFFFFF` or amber `#FBBF26` | ✓        |

---

## Typography

### Font families

| Role                | Family                      | Weights used                                                                                                       |
| ------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Display / headlines | Helvetica Now (var Display) | Light, Regular, Medium, Bold                                                                                       |
| Body / copy         | Poppins                     | Regular                                                                                                            |
| _(also specified)_  | Inter                       | Light, Regular, Medium — minor inconsistency vs. Poppins on p.17; Poppins takes precedence per the guidelines page |

**Note on Inter vs Poppins:** The type specimen page (p.16) showcases the Inter family for body/copy. The typography guidelines page (p.17) specifies Poppins Regular for copy text and captions. The guidelines page is more specific, so Poppins is treated as canonical for body. Inter remains the web fallback. **Flag this to the designer for confirmation before font licenses are purchased.**

### Type scale

| Role                  | Font                           | Size | Leading | Style      |
| --------------------- | ------------------------------ | ---- | ------- | ---------- |
| Big headings          | Helvetica Now var Display Bold | 25pt | 30pt    | All caps   |
| Sublines / sections   | Helvetica Now var Display Bold | 13pt | 16pt    | All caps   |
| Headlines / copy text | Helvetica Now var Display      | 10pt | 10pt    | All caps   |
| Body copy             | Poppins Regular                | 8pt  | 11pt    | Mixed case |
| Caption               | Poppins Regular                | 5pt  | 8pt     | Mixed case |

_(Print pt values — translate to rem for web: roughly 1pt ≈ 1.33px at 96dpi.)_

---

## Brand pattern

- Tiled repeating lockup: full logo (mark + wordmark) at reduced opacity on white background
- Used for: merchandise, presentation backgrounds, event materials
- Tile spacing: proportional to logo size (exact spacing not specified)

---

## App icon

- Circular container, amber gradient fill
- Mark in white centered within circle
- No wordmark in icon form

---

## Stationery applications

- **Business cards:** dark (black) and light (white) variants; gradient mark + wordmark lockup
- **Letterhead:** wordmark top-left; gradient accent bar
- **Email signature:** full lockup left + cropped mark bleeding off right edge; fields: name, designation, address, email, phone, website
- **Merch:** T-shirt (wordmark vertical left chest), cap (mark only)

---

## Social media

- **Cover photo format:** dark background, bold headline in brand amber, mark top-right corner
- **Approved tagline on social cover (p.28):** "COMPLIANCE AND INFRASTRUCTURE, BUILT AND RUNNING." ← this is the correct, approved tagline
- **Post templates:** data-center dark photography with amber headline overlay

---

## Derivation chain

```
brand/brandbook.pdf  (canonical, sha256-pinned)
        │
        ▼
brand/brandbook-extracted.md  (this file — source of truth for tokens)
        │
        ├── tailwind.config.mjs  (color + font tokens)  ← NEEDS UPDATE
        ├── src/styles/brand.css (CSS custom properties) ← NEEDS UPDATE
        ├── brand.md             (human-readable brand guide)
        └── design/skill.md      (Claude Design manifest)
```

Any change to the PDF must flow through this chain in one PR. See `scripts/brand-check.sh`.

---

## Open items (awaiting designer revision)

| #   | Item                                          | Blocking                                          |
| --- | --------------------------------------------- | ------------------------------------------------- |
| 1   | Cover tagline on p.1 still reads old tagline  | Brand consistency on any printed/exported PDF     |
| 2   | Construction grid internal ratios not labeled | Pixel-perfect logo reproduction at custom sizes   |
| 3   | Gradient intermediate hex stops missing       | Exact gradient implementation in CSS              |
| 4   | Wordmark font not called out on logo page     | Correct font license purchase + CSS `font-family` |

None of these block scaffold work (B.1) or the Claude Design manifest (B.0.5), but items 3 and 4 must be resolved before the site goes to production.

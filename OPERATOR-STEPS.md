# Operator steps — opskernel.io launch

Everything below requires human credentials or judgment. The repo scaffold, CI/CD workflow
files, brand system, and Astro components are already written; these are the manual
pieces that can't be automated.

Reference plan: `~/.claude/plans/async-swinging-bonbon.md`
Launch gate registry: `~/ai-wiki/projects/aiconsole-core/intel/legacy-product-reveal-gates.md`

---

## Phase A.0 — DNS + placeholder (unblocks everything)

**Before Phase B can deploy, these must all be true.**

1. **Cloudflare zone** — add `opskernel.io` to the existing Cloudflare account that owns
   `opskern.com`. Update registrar nameservers to Cloudflare's. Wait for propagation.

2. **Scoped API token** — create a Cloudflare API token with exactly:
   - `Zone:DNS:Edit` scoped to the `opskernel.io` zone
   - `Account:Cloudflare Pages:Edit` scoped to the `opskernel-io-site` project only
     Store in 1Password as **"opskernel.io Cloudflare"**. Do not reuse the existing
     opskern.com token — scope bleed is the primary gap-7 risk.

3. **Initial DNS records** (Cloudflare UI is fine):
   - `A @ → <Pages IP>` proxied
   - `AAAA @ → <Pages IPv6>` proxied
   - `CNAME www → opskernel.io` proxied
   - `CAA @ → letsencrypt.org`
   - `TXT _dmarc → v=DMARC1; p=none; rua=mailto:postmaster@opskernel.io`
   - **No MX yet** — deferred to A.1.

4. **GitHub repo** — create `OpsKern/opskern-website` (public, Apache 2.0). Push the
   current working tree.

5. **GitHub secrets** — add via `gh secret set`:
   - `CLOUDFLARE_ACCOUNT_ID` — single account ID
   - `CLOUDFLARE_API_TOKEN` — scoped token from step 2
   - `AI_WIKI_DEPLOY_KEY` — read-only SSH deploy key on `OpsKern/ai-wiki` (generate
     with `ssh-keygen -t ed25519 -C opskern-website`, add pubkey to ai-wiki
     Settings → Deploy keys as **read-only**)
   - `FATHOM_SITE_ID` — from Fathom after step 7
   - `LIGHTHOUSE_TOKEN` — optional; skip until LHCI server stood up

6. **Cloudflare Pages project** — create `opskernel-io-site`, connect to
   `OpsKern/opskern-website`, production branch `main`, build command
   `bun run build`, output directory `dist`. First deploy will be the noindex placeholder.

7. **Fathom account** — create site, grab site ID, put in `FATHOM_SITE_ID` secret.

8. **Branch protection on `main`** — require `ci.yml` + `lighthouse.yml` green,
   require 1 reviewer, dismiss stale reviews, no force-push.

9. **Enable Renovate** — install the app on the repo; the committed `renovate.json`
   takes over from there.

---

## Phase A.1 — Waitlist activation (after A.0 is live)

1. **Buttondown signup** — create a Buttondown account with sender `hello@opskernel.io`
   or `newsletter@opskernel.io`. Get the form embed/POST URL.

2. **DMARC/SPF/DKIM** — add Buttondown's published SPF include + DKIM CNAMEs at
   Cloudflare. Observe for 7 days, then tighten `_dmarc` to `p=quarantine`.

3. **Cloudflare Turnstile** — create a free Turnstile site key for opskernel.io.

4. **Flip the waitlist form** — in `src/components/WaitlistForm.astro`, change
   `ACTIVE = false` to `ACTIVE = true` and fill in the Buttondown endpoint + Turnstile
   site key. Open a PR; OK_web-design + OK_dpo-review must approve.

5. **Email forwarding** ✅ — support@/feedback@/postmaster@/privacy@/hello@ routed via
   Cloudflare Email Routing.

6. **Buttondown icon + share image** — in Buttondown Settings → General:
   - Icon: upload `hookd-icon.png` (200×200 px, on ~/Desktop)
   - Share image: upload `hookd-og.png` (1200×630 px, on ~/Desktop)

7. **Buttondown redirect URLs** — in Buttondown Settings → General → Redirects:
   - After subscribing: `https://opskernel.io/subscribed`
   - After confirming: `https://opskernel.io/confirmed`

8. **Welcome sequence** — write at least one automation in Buttondown (Settings →
   Automations) sent after a new subscriber confirms. Subject: "You're in — what hookd
   actually does". See `docs/email-welcome-sequence.md` (TODO) for draft copy.

---

## Phase B prerequisites (local)

These unblock the local build + first deploy from the current working tree.

1. **`brew install poppler`** — needed for `pdftotext`. Without it, the brandbook
   extraction step produces only the skeleton file.

2. **Brandbook extraction** — once poppler is installed, run:

   ```sh
   pdftotext -layout brand/brandbook.pdf brand/brandbook-extracted.txt
   ```

   Then translate the text into `brand/brandbook-extracted.md` (palette hex values,
   type stack, clear-space rules). Update `tailwind.config.mjs` and `brand.md`
   to match — the current tokens are interim placeholders and must be reconciled
   before any public-facing deploy.

3. **`bun install`** — first time only. Subsequent installs are handled by CI and
   the pre-commit hook.

4. **Claude Design workspace** — upload `design/skill.md` to a private Claude Design
   workspace named "aiconsole design system". Do not share until a non-founder
   design reviewer joins.

---

## LLC formation (blocks copyright + sender label)

Until the LLC exists, `package.json` and `LICENSE` should hold
**"operated by Will Smith"** as the copyright holder. On formation:

1. Update `LICENSE` copyright line.
2. Update `package.json` `author`.
3. Update privacy/terms pages — replace "operated by Will Smith (pending LLC
   formation)" with the LLC name + registered agent address.
4. Update Buttondown sender label.

One PR for all four is fine.

---

## Legacy product reveal gates (stay closed at launch)

`legacy-product-reveal-gates.md` is the registry. Three products stay hidden until
their gate passes:

- **AI self-healing engine** — ≥10 paying Team Server customers AND CLM-0036 verified
- **Managed hosting** — Managed Tier Readiness Gate passes all 4 conditions
- **BYOD** — `byod-research-complete.md` exists with sign-off

**Do not cross-link from opskernel.io to opskern.com platform pages.** Enforced by
OK_cmo-review; countersigned exception requires CLO.

---

## What the repo already has (no operator action needed)

- Astro 4 + Tailwind + TS + Bun scaffold (`package.json`, `astro.config.mjs`,
  `tailwind.config.mjs`, `tsconfig.json`)
- Pre-commit hook wired to `.githooks/` (gitleaks + brand-check + prettier + astro
  check + astro build)
- 5 GitHub Actions workflows (ci, lighthouse, preview, deploy, intel-refresh)
- Lighthouse CI config + Renovate config + gitleaks config
- Brandbook vendored + sha256 pinned; `scripts/brand-check.sh` enforces version
- Claude Design `skill.md` + `design.md` manifests + `scripts/fetch-design.sh`
- `_claude-design-drafts/` staging directory (tsconfig-excluded)
- 7 section components (Hero, Trust, Problem, HowItWorks, Features, Pricing,
  WhatsNew) + supporting (WaitlistForm, FathomTag, ConsentBanner, FooterCTA)
- 4 pages (index, privacy, terms, faq) with repo/binary/product naming FAQ
- Intel feed content collection with `visible_public` hard gate
- `public/robots.txt` (disallow-all until post-launch)
- `public/favicon.svg`

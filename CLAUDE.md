# Stub-EASE II™ website — project guide for Claude Code

This repo is the production website of **CSUE Technologies, Inc.** (Chicago, IL; founder
**Jeff Krause**, Founder & Director of Manufacturing and Product Development) at
**https://www.stubease.com** — the Stub-EASE II™ conduit stub-up eliminator. It is a
client site maintained by the Universal Business Studio. The studio's records for this
client (intake, status, changelog, deploy plan) live in the `business-studio` repo under
`clients/stub-ease/`; when you work from the studio, log every change there too.

## Stack
- React 18 + Vite 5 single-page app · react-router-dom 6 · Tailwind CSS 3 · Framer Motion 11.
- Vercel serverless functions (Node) in `api/`: `lead.js`, `checkout.js` (Stripe),
  `inventory.js` (scaffold only).
- `vercel.json`: framework `vite`; rewrites everything except `/api/*` to `index.html`.
- Fonts via Google Fonts in `index.html`: Space Grotesk (display), Inter (body),
  JetBrains Mono (mono). Dark theme only.

## Map
- `src/App.jsx` — routes `/`, `/products`, `/products/:slug`, `/how-it-works`, `/safety`,
  `/about`, `/testimonials`, `/contact`; wrapped in `InventoryProvider` + `CartProvider`;
  `LoadScreen` plays `/videos/stub-ease-ii-loader.mp4` on first load.
- `src/pages/*` — one file per route. `Home.jsx`: hero, stats row, role tabs, ROI
  calculator (`#roi-calculator`), video section. `Products.jsx`: kit configurator,
  `#store`, `#submittals`. `Safety.jsx` is the "Studies & Safety" nav item.
- `src/components/*` — Navbar (Home · How It Works · Products · Studies & Safety · About ·
  Testimonials · Contact · "Calculate Savings" → `/#roi-calculator` · cart icon), Footer,
  CustomCursor, LoadScreen, PageHero, Reveal (scroll reveal), StatCounter, RoleTabs,
  ROICalculator, ExplodedAssembly (scroll-driven exploded view: cap → collar → stand),
  FAQAccordion, VideoModal, CartDrawer, BackorderModal (never shows stock numbers).
- `src/data/*.js` — **all site content lives here, not in JSX.**
  - `products.js`: 7 products (`stub-ease-ii-system` core kit; `seii-cap`, `bend-ease`,
    `stand-ease` components "Included in Kit Only"; `seg18-riser-ease` and `stub-down`
    coming soon; `stub-ease-original` special order) with slug/status/specs/gallery/cta,
    plus `submittals` (7 PDFs) and `metallicTransitionOptions`.
  - `inventory.js`: kit SKUs `SE2-{34|1}-{8|12}-{10|25}` and component SKUs with QOH and
    landed / MSRP / distributor per-unit prices from the CSUE Inventory Valuation Report
    (PO EG2605016, Aug 2026); `roiRepresentativeMsrp`.
  - `roles.js` (audience tabs: concrete, electrical, gc, …), `safety.js` (settlements,
    OSHA record, materials), `about.js` (milestones, differentiators, values),
    `testimonials.js` (Sam Tarbuck, Tim Flores, founder quote).
- `src/config/features.js` — `CHECKOUT_ENABLED`, `SHOW_PRICING` (both `true`). Flip to
  hide cart / prices site-wide without touching anything else.
- `src/lib/` — `integrations.js` (`submitLead` → POST `/api/lead`; `startCheckout` →
  POST `/api/checkout`), `InventoryContext.jsx` (per-browser stock in localStorage key
  `stubease-inventory-v1` — **not shared across visitors**), `CartContext.jsx`.
- `src/index.css` — Tailwind layers + utilities `.bp-grid`, `.bp-grid-fine`, `.hud-frame`,
  `.mono-label`, `.text-glow`, `.gradient-fade-b`, `.cursor-glow`, `.perspective-container`.
- `public/videos/` — the two local videos. **All other media (25 images, 7 videos, 7 PDFs)
  is hot-linked from `https://stubease.pplx.app/`** (a Perplexity app origin). Known
  fragility; moving it into `public/` is a planned, approved-on-request task.

## Brand tokens (`tailwind.config.js`)
`void` #0A0C0F page background · `steel` #12151A / `steel-panel` #171B21 / `steel-line`
#262B33 / `steel-soft` #8A909C / `steel-bright` #E9ECF1 · `signal` #FF5A1F /
`signal-dim` #B4441C / `signal-glow` #FF8A4C · `bg-blueprint` grid · `shadow-signal` ·
`font-display` / `font-body` / `font-mono`. Voice: blunt, field-credible, first-person
founder; NEC 300.15(F) / 300.17(F) and "working walking surface" language throughout.

## Integrations & environment variables (set in the client's Vercel project — never in code)
- `/api/lead` forwards to `GHL_WEBHOOK_URL` (GoHighLevel inbound webhook) and/or
  `CUSTOM_CRM_URL` (+ `CUSTOM_CRM_API_KEY` sent as Bearer). Lead shapes: ROI calculator
  `{ name, company, email, phone, …results, tradeSize, floors, stubUpsPerFloor, damageRate,
  laborCost }`; contact page `{ firstName, lastName, company, email, phone, reason, details,
  source: 'contact-page' }`. Returns 200 even if downstream forwarding fails.
- `/api/checkout` creates a Stripe Checkout session with `STRIPE_SECRET_KEY` and Price IDs
  `STRIPE_PRICE_STUB_EASE_II`, `STRIPE_PRICE_BEND_EASE`, `STRIPE_PRICE_STAND_EASE`;
  redirects to `/products?checkout=success|cancelled`. Returns 500 until the key is set.
- `/api/inventory` is a scaffold (echoes, persists nothing). Real shared stock needs a
  database — the intended steps are in the file's comments.
- Public contact: **info@stubease.com** only. The legacy site stub-ease.com lists phone
  numbers (312-972-7505 / 800-877-1390) that this site omits — ask before adding them.

## How changes ship
- Push to `main` → `.github/workflows/deploy.yml` → credentials check → `vercel pull` /
  `vercel build` → `vercel deploy --prebuilt --prod` into the client's Vercel project
  **`stubease-site`** (team **`stub-ease-ii`**) → alias www.stubease.com. Pushes to any
  other branch produce a **preview deployment** (URL in the run's summary). Changes to
  only `*.md`, `.claude/**`, or `docs/**` do not deploy. Manual run: Actions → "Deploy to
  Vercel" → Run workflow.
- Secrets (repo → Settings → Secrets and variables → Actions): `VERCEL_TOKEN` (a
  "Full Account" or team-scoped token from the client's Vercel login — a project-scoped
  token fails), `VERCEL_ORG_ID` (team_…), `VERCEL_PROJECT_ID` (prj_…).
- Before pushing: `npm ci && npm run build` must pass. After pushing: confirm the Actions
  run is green, then check the live URL (home `<title>`, one deep route such as
  `/products/bend-ease`, and `/api/inventory` returning JSON).
- Rollback: `git revert <sha>` and push, or promote the previous deployment in the
  client's Vercel dashboard.

## Rules
1. **Accuracy over everything.** Prices, SKUs, stock, specs, patents, settlements, OSHA
   data, quotes, and names must trace to a source (the data files name theirs). Never
   invent a claim, review, spec, or number. New pricing or stock comes only from a CSUE
   document.
2. **Content edits go in `src/data/*.js`**, not hard-coded into pages, unless a page is
   the only place that copy exists.
3. **No secrets in the repo.** The repo is public; keys live in Vercel env vars.
4. **Keep the brand system** — tokens above, `hud-frame` cards, mono labels, signal
   accents, Framer Motion reveals — and the founder voice.
5. **Preview risky changes** (checkout, pricing, navigation, anything under `api/`) on a
   branch first; merge to `main` once the preview checks out.
6. **Log every change** in `business-studio/clients/stub-ease/changelog.md` when working
   from the studio, with the Actions run number that shipped it.

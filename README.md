# Stub-EASE II™ — Site Rebuild

## Deploys (how this repo ships)

Every push to `main` deploys to production in the client's Vercel project through
`.github/workflows/deploy.yml` (GitHub Actions → Vercel CLI → the existing
stubease.com project). No zip uploads. The three secrets it needs
(`VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`) are repository Actions secrets.
The run can also be started by hand from the Actions tab ("Run workflow").
Studio records for this client live in the `business-studio` repo under
`clients/stub-ease/`.


A futuristic, motion-driven rebuild of stubease.com. Built with React + Vite +
Tailwind + Framer Motion, ready to deploy on Vercel.

## What's in here

- **Design system**: dark steel + blueprint-grid background, orange (`#FF5A1F`) signal color matching your brand, HUD-style corner-bracket framing on cards, Space Grotesk / Inter / JetBrains Mono type system.
- **Custom cursor**: an orange glow that follows the pointer and expands over anything clickable (`src/components/CustomCursor.jsx`). Automatically disabled on touch devices.
- **Scroll effects**: parallax hero, scroll-triggered reveals throughout (`src/components/Reveal.jsx`), animated stat counters, and a signature scroll-driven 3D exploded-assembly animation of the product (cap → collar → stand) in `src/components/ExplodedAssembly.jsx`.
- **Pages**: Home, How It Works, Products (clean grid), individual Product pages (auto-generated per product from `src/data/products.js`), Studies & Safety, About, Testimonials, Contact.
- **ROI / savings calculator**: fully functional, recalculates live as you type (`src/components/ROICalculator.jsx`), with a lead-capture gate before showing results.
- **All copy, specs, sizes, patents, testimonials, and contact info** carried over from your current homepage — see "A note on content" below.

## Run it locally

```bash
npm install
npm run dev
```

## Deploy to Vercel

1. Push this folder to a GitHub repo (or drag-and-drop deploy via the Vercel dashboard).
2. In Vercel, "Import Project" → select the repo. Framework preset: **Vite**. No config changes needed — `vercel.json` already handles client-side routing.
3. Add environment variables (see below) before connecting Stripe/CRM.
4. Deploy.

## Connecting Stripe, GoHighLevel, and your custom CRM

API keys must never live in frontend code, so both integrations run through
Vercel Serverless Functions in `/api`, which the frontend calls.

### Stripe (`/api/checkout.js` + `/api/stripe-webhook.js`)
No Stripe Dashboard Products/Prices to create — prices are computed server-side,
per exact SKU, from `src/data/inventory.js` at the moment of checkout, so what
Stripe charges always matches what the page showed and a price change is just
an edit to that file.
1. In Vercel → Project → Settings → Environment Variables, add `STRIPE_SECRET_KEY`
   (`sk_test_...` to start, `sk_live_...` once you're ready to take real payments).
2. Clicking "Proceed to Checkout" calls `startCheckout()` → `/api/checkout` →
   redirects to Stripe Checkout.
3. Stripe Dashboard → Developers → Webhooks → Add endpoint →
   `https://www.stubease.com/api/stripe-webhook` → event `checkout.session.completed`
   → copy the signing secret into Vercel as `STRIPE_WEBHOOK_SECRET`. This is what
   decrements stock when a payment actually completes (see "Inventory" below).
   To test before going live: `stripe listen --forward-to <url>/api/stripe-webhook`
   forwards test-mode events without registering anything in the dashboard.

### Inventory (`/api/inventory.js` + `/api/stripe-webhook.js`)
Real, shared stock needs a database. Vercel → Project → Storage → connect a
database (Upstash Redis is the fit here — REST-based, no connection pooling to
manage) — `vercel install upstash`, or the same from the dashboard. Whatever
env vars that adds (`KV_REST_API_URL`/`KV_REST_API_TOKEN` or
`UPSTASH_REDIS_REST_URL`/`UPSTASH_REDIS_REST_TOKEN`), `api/_lib/kv.js` reads
either pair — nothing to rename. Until it's connected, `/api/inventory` falls
back to the static opening balance in `src/data/inventory.js` and the site
still works, just without live numbers.

### GoHighLevel CRM (`/api/lead.js`)
1. In GHL: **Automation → Workflows → New Workflow → Trigger: "Inbound Webhook."** Copy the generated URL.
2. In Vercel env vars, set `GHL_WEBHOOK_URL` to that URL.
3. Every ROI-calculator submission and contact-form submission now forwards there automatically.

### Your custom CRM (built in AI Studio)
1. Set `CUSTOM_CRM_URL` to your CRM's lead-intake endpoint.
2. If it requires an API key, set `CUSTOM_CRM_API_KEY` — it's sent as a `Bearer` header automatically.
3. Both GHL and your custom CRM can be active at the same time; `/api/lead.js` forwards to whichever are configured.

## A note on content

This version pulls real content directly from your live subpages:
`how-it-works.html`, `products.html`, `safety.html`, `about.html`, and
`contact.html` — including the exact SKUs, bulk pricing ($14.33 / $16.47
per piece), OSHA inspection record, six documented settlement cases,
material specs (Pantone 021C orange TPR, Shore A 45, UL file numbers), the
founder milestone timeline, and the FAQ accordion content.

**`testimonials.html` could not be retrieved** — it wasn't reachable by my
fetch tool and didn't turn up in search. `src/pages/Testimonials.jsx`
currently uses the two testimonial quotes (Sam Tarbuck, Tim Flores) that
also appear on your homepage, plus the founder video from the About page.
If you send over the actual testimonials.html content, I'll drop it in
directly — no design changes needed.

**One inconsistency carried over from your live site, not introduced by
me:** the About page lists Jeff's direct contact as `undercover@stubease.com`,
while the Contact page and footer use `info@stubease.com`. Both are kept
exactly as they appear on your site — let me know if one should be
corrected.

**Kit pricing note:** your live products.html has a working cart and
Stripe-processed checkout, but the actual per-kit dollar amount is
rendered dynamically and wasn't present in the static page source I could
retrieve. The kit configurator on `/products` currently shows an
**estimated** per-unit price (sum of the three bulk component prices) for
continuity with the rest of the page, clearly labeled "Est. Per-Unit." Once
you set your real Stripe Price IDs (see below), swap `kitUnitPrice` in
`src/pages/Products.jsx` for the actual number.

## Images & video

All product photos and the trowel-flex video are currently linked directly
from your existing CDN (`stubease.pplx.app`) so nothing is broken on launch.
If you'd rather self-host them, drop the files into `/public/images/` and
`/public/videos/` and update the paths in `src/data/products.js` and the
page files to `/images/...` and `/videos/...`.

## Editing products

Every product page is generated from a single data file:
`src/data/products.js`. Add, remove, or edit a product there and its page
(`/products/:slug`) updates automatically — no separate page file needed
per product.

## Pricing & inventory

`src/data/inventory.js` holds the real SKU-level pricing and stock from
CSUE Technologies' Inventory Valuation Report (PO EG2605016, Aug 2026) —
all 8 kit SKUs (by trade size × height × pack size) and the 4 loose
component SKUs (caps and supports by trade size), each with landed cost,
MSRP, and distributor price per unit, plus current stock.

**Kits are sold by the box** (a pack of 10 or 25) — the price shown and
added to cart is always `MSRP per unit × pack size`, matching how the real
SKUs are structured. Loose components (caps, supports) are sold per piece
at MSRP.

To update pricing or stock later, just edit the numbers in
`src/data/inventory.js` — every page that computes a price pulls from that
one file.

### Stock levels are never shown to customers

Nowhere on the site displays "X in stock" — that was intentional per
request. Stock is tracked entirely behind the scenes to decide one thing:
whether an order can be fulfilled immediately or needs a human to confirm
it first (see below). If you ever want to reintroduce a visible stock
count somewhere, it's `getAvailable(sku)` from `useInventory()` — already
wired into `src/pages/Products.jsx` and `src/pages/ProductDetail.jsx`,
just not rendered to the page.

### The backorder flow

If someone tries to order more of a SKU than is currently available, the
site doesn't block the order or show "Out of Stock." Instead,
`src/components/BackorderModal.jsx` pops up with:

> "The team at Stub-EASE will be reaching out to confirm your order with
> you before your purchase is finalized."

If they click **Continue**, the item is added to the cart exactly as
normal — same checkout flow either way. This is just a heads-up moment,
not a hard stop. The same modal is reused in all three places someone can
add to cart: the kit configurator, the component cards on the Products
page, and the individual component detail pages.

**What this doesn't do on its own:** flag that order anywhere for your
team to actually follow up on. Right now "the team will be reaching out"
is a promise the website makes but doesn't yet keep automatically — see
the GoHighLevel/CRM section above for how form submissions get routed to
you; the natural next step is having `api/checkout.js` post a similar
alert (e.g. to your GHL webhook, tagged "backorder") whenever a submitted
order exceeds stock, so it actually reaches a real person. That's a small
addition once you're ready for it — flag it and I can wire it in.

### How "live inventory" actually works right now

`src/lib/InventoryContext.jsx` tracks stock in the browser (mirrored to
localStorage so a refresh doesn't reset it mid-session). This correctly:
- Decides in real time whether an order exceeds available stock
- Decrements the moment something's added to cart
- Persists through a page refresh for that same visitor

**What it can't do on its own:** keep stock accurate across every visitor
and device at once, because a static site has no shared server memory. Two
people shopping at the same time each see stock deplete independently of
each other, and nothing here is tied to an actual completed Stripe payment
yet — so it's a good approximation, not a real-time source of truth for
your actual warehouse count.

`api/inventory.js` is a scaffold with the exact steps to make stock
genuinely shared and accurate for everyone — in short: add a database
(Vercel KV is the fastest option on Vercel), seed it from
`src/data/inventory.js`, decrement it in `api/checkout.js` before creating
the Stripe session, and add a webhook to restore stock on a cancelled
checkout. The comments in that file walk through it step by step. Stripe
itself doesn't track per-SKU inventory the way this site needs — that's
why this logic lives in your own site/database rather than in Stripe.

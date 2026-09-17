// Vercel Serverless Function — GET/POST /api/inventory
//
// THIS IS A SCAFFOLD, NOT A PRODUCTION INVENTORY SYSTEM YET.
//
// Right now the site tracks stock per-browser (see src/lib/InventoryContext.jsx)
// so the shopping experience feels real and correctly stops a single visitor
// from over-ordering. But a static site has no shared server state, so two
// people shopping at once won't see each other's stock changes.
//
// To make this endpoint the real source of truth for everyone:
//
//   1. Add a database. The fastest option on Vercel is Vercel KV:
//        npm install @vercel/kv
//      then connect a KV store from the Vercel dashboard (Storage tab) —
//      this automatically sets KV_REST_API_URL / KV_REST_API_TOKEN env vars.
//
//   2. Seed it once with the starting stock from
//      src/data/inventory.js (kitSkus[].qohBoxes, componentSkus[].unitsOnHand).
//
//   3. Replace the in-memory `stock` object below with real kv.get/kv.set calls:
//        import { kv } from '@vercel/kv'
//        const available = await kv.get(`stock:${sku}`)
//        await kv.set(`stock:${sku}`, available - qty)
//
//   4. Call this endpoint's POST from /api/checkout.js BEFORE creating the
//      Stripe session, so stock is reserved at checkout time, not just when
//      the frontend optimistically updates.
//
//   5. Add a Stripe webhook (/api/stripe-webhook.js) that restores stock if
//      a checkout session expires or is cancelled without payment.
//
//   6. Update src/lib/InventoryContext.jsx to fetch from this endpoint
//      instead of (or in addition to) localStorage, so every visitor sees
//      the same real number.
//
// Until steps 1–3 are done, this endpoint just echoes back the request so
// the frontend integration point exists and won't error — it does NOT
// persist anything across serverless invocations.

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Would return real current stock levels once a database is connected.
    return res.status(200).json({
      ok: true,
      note: 'Inventory endpoint not yet connected to a database — see comments in api/inventory.js.',
    })
  }

  if (req.method === 'POST') {
    const { sku, qty } = req.body || {}
    if (!sku || !qty) {
      return res.status(400).json({ error: 'Missing sku or qty' })
    }
    // No-op until a real database is wired in — see comments above.
    return res.status(200).json({
      ok: true,
      sku,
      qty,
      note: 'Stock was NOT persisted server-side — connect a database (see api/inventory.js) to make this real.',
    })
  }

  res.setHeader('Allow', 'GET, POST')
  return res.status(405).json({ error: 'Method not allowed' })
}

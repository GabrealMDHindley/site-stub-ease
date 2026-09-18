// Vercel Serverless Function — GET /api/prices
//
// Returns the live price for every SKU that has a matching Stripe Price
// (matched by lookup_key — see api/_lib/stripePrices.js). The frontend uses
// this for what it displays; api/checkout.js uses the same lookup for what
// it actually charges, so the two can never disagree. A SKU missing from the
// response just means no Stripe Price is set up for it yet — the frontend
// and checkout both fall back to the static catalog in
// src/data/inventory.js for that SKU only.
import { getStripePricesBySku } from './_lib/stripePrices.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { prices, stripeConfigured } = await getStripePricesBySku()
  return res.status(200).json({ ok: true, stripeConfigured, prices })
}

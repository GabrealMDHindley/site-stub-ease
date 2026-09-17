// Vercel Serverless Function — POST /api/checkout
//
// Creates a Stripe Checkout session server-side (Stripe secret keys must
// never be exposed in frontend code) and returns the redirect URL.
//
// Prices are computed here, per exact SKU, from src/data/inventory.js —
// not from pre-created Stripe Price IDs. A kit's SKU depends on trade size,
// height, AND pack size (8 different prices), so one flat Stripe Price per
// product would charge the wrong amount for most selections. This way the
// price Stripe charges always matches the price the customer saw on the page,
// and a price change only ever needs an edit in inventory.js.
//
// Setup: in Vercel → Project → Settings → Environment Variables, add
//   STRIPE_SECRET_KEY = sk_test_... (test mode) or sk_live_... (live)
// See CLAUDE.md → Integrations for the webhook that completes the order
// (api/stripe-webhook.js) and decrements stock.

import Stripe from 'stripe'
import { getSkuRecord } from '../src/data/inventory.js'
import { getProductBySlug } from '../src/data/products.js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '')

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: 'Stripe is not configured yet (missing STRIPE_SECRET_KEY).' })
  }

  const { items = [] } = req.body || {}

  const order = []
  const line_items = []

  for (const item of items) {
    const record = item?.sku ? getSkuRecord(item.sku) : null
    const qty = Number(item?.quantity) || 0
    if (!record || qty < 1) continue

    // Kits are priced and sold by the box (unit price × pack size); components
    // are priced and sold per individual piece (pack is always 1 for them).
    const unitAmount = Math.round(record.msrpPerUnit * record.pack * 100)
    if (!Number.isFinite(unitAmount) || unitAmount <= 0) continue

    const product = getProductBySlug(item.slug) || (record.kind === 'kit' ? getProductBySlug('stub-ease-ii-system') : null)
    const label = item.name || product?.name || record.sku
    const detail =
      record.kind === 'kit'
        ? `${record.tradeSize}" · ${record.height}" · pack of ${record.pack}`
        : record.tradeSize
          ? `${record.tradeSize}"`
          : undefined

    line_items.push({
      price_data: {
        currency: 'usd',
        unit_amount: unitAmount,
        product_data: {
          name: detail ? `${label} (${detail})` : label,
          metadata: { sku: record.sku },
        },
      },
      quantity: qty,
    })
    order.push({ sku: record.sku, qty })
  }

  if (line_items.length === 0) {
    return res.status(400).json({ error: 'No valid, priced items in cart.' })
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      success_url: `${req.headers.origin}/products?checkout=success`,
      cancel_url: `${req.headers.origin}/products?checkout=cancelled`,
      // Read back by api/stripe-webhook.js on checkout.session.completed to
      // know exactly which SKUs/quantities to decrement — dynamic price_data
      // line items don't persist as reusable Stripe objects, so this is what
      // survives from the moment of purchase to the moment of fulfillment.
      metadata: { order: JSON.stringify(order) },
    })
    return res.status(200).json({ url: session.url })
  } catch (err) {
    console.error('Stripe checkout error:', err)
    return res.status(500).json({ error: 'Could not create checkout session.' })
  }
}

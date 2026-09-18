// Vercel Serverless Function — POST /api/checkout
//
// Creates a Stripe Checkout session server-side (Stripe secret keys must
// never be exposed in frontend code) and returns the redirect URL.
//
// Prices come from Stripe first: if a SKU has a matching Price (by
// lookup_key — see api/_lib/stripePrices.js), that Price's id is used
// directly as the line item, so whatever Jeff has set in the Stripe
// Dashboard is exactly what's charged — same source src/pages/Products.jsx
// and ProductDetail.jsx display, via /api/prices, so the two can never
// disagree. A SKU with no Stripe Price yet falls back to a price computed
// from src/data/inventory.js, same as before Stripe pricing existed, so
// checkout keeps working for anything not migrated yet.
//
// Setup: in Vercel → Project → Settings → Environment Variables, add
//   STRIPE_SECRET_KEY = sk_test_... (test mode) or sk_live_... (live)
// See CLAUDE.md → Integrations for the webhook that completes the order
// (api/stripe-webhook.js) and decrements stock.

import Stripe from 'stripe'
import { getSkuRecord } from '../src/data/inventory.js'
import { getProductBySlug } from '../src/data/products.js'
import { getStripePricesBySku } from './_lib/stripePrices.js'

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
  const { prices: stripePrices } = await getStripePricesBySku()

  const order = []
  const line_items = []

  for (const item of items) {
    const record = item?.sku ? getSkuRecord(item.sku) : null
    const qty = Number(item?.quantity) || 0
    if (!record || qty < 1) continue

    const live = stripePrices[record.sku]
    if (live) {
      // A real Stripe Price exists for this SKU — charge exactly that.
      line_items.push({ price: live.id, quantity: qty })
    } else {
      // No Stripe Price registered yet for this SKU — fall back to a price
      // computed from the static catalog. Kits are priced and sold by the
      // box (unit price × pack size); components per individual piece
      // (pack is always 1 for them).
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
    }
    order.push({ sku: record.sku, qty })
  }

  if (line_items.length === 0) {
    return res.status(400).json({ error: 'No valid, priced items in cart.' })
  }

  try {
    // Fall back to the production origin if the request carries no Origin
    // header (server-to-server calls, some privacy browsers) — Stripe rejects
    // a session whose redirect URLs are not absolute https URLs.
    const origin = req.headers.origin || 'https://www.stubease.com'

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      success_url: `${origin}/products?checkout=success`,
      cancel_url: `${origin}/products?checkout=cancelled`,
      // Physical goods: Stripe collects the ship-to address and a phone
      // number, and creates a Customer record, so every order arrives in the
      // Stripe Dashboard with who bought it and where it ships. Shipping
      // charges and tax are NOT added here yet — those need Jeff's policy
      // (flat rate? free? Stripe Tax?) before they can be wired in.
      shipping_address_collection: { allowed_countries: ['US'] },
      phone_number_collection: { enabled: true },
      customer_creation: 'always',
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

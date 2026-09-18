// Looks up the live Stripe Price for each of the site's SKUs, matched by
// Stripe's own "lookup_key" field (Price detail page → Lookup key). Jeff
// edits prices in the Stripe Dashboard; whatever a Price's current amount is
// becomes the site's price and what checkout charges, automatically.
//
// A SKU with no lookup_key set on any Price simply isn't returned here — the
// caller falls back to the static catalog in src/data/inventory.js for that
// one SKU, so partially set up pricing still works everywhere else.
//
// Setup, per SKU you want Stripe-managed: open the Price in
// dashboard.stripe.com/prices, click into "Lookup key", and type the exact
// SKU code (e.g. SE2-34-8-10) — same codes as allSkus in
// src/data/inventory.js.

import { getStripe } from './stripe.js'
import { allSkus } from '../../src/data/inventory.js'

// Stripe's prices.list accepts up to 10 lookup_keys per call
// (docs.stripe.com/api/prices/list), so SKUs are fetched in chunks of 10.
const CHUNK_SIZE = 10

// In-memory only — cuts repeat Stripe calls within one warm serverless
// instance. Not required for correctness (Stripe's API is fast and this
// site's traffic is nowhere near its rate limits); a cold start or a new
// instance just fetches fresh.
let cache = null
let cacheAt = 0
const TTL_MS = 60_000

export async function getStripePricesBySku() {
  const stripe = getStripe()
  if (!stripe) return { prices: {}, stripeConfigured: false }

  if (cache && Date.now() - cacheAt < TTL_MS) {
    return { prices: cache, stripeConfigured: true }
  }

  const prices = {}
  for (let i = 0; i < allSkus.length; i += CHUNK_SIZE) {
    const chunk = allSkus.slice(i, i + CHUNK_SIZE)
    const { data } = await stripe.prices.list({ lookup_keys: chunk, active: true, expand: ['data.product'] })
    for (const price of data) {
      if (!price.lookup_key || price.unit_amount == null) continue
      prices[price.lookup_key] = {
        id: price.id,
        unitAmount: price.unit_amount,
        currency: price.currency,
        productName: price.product && typeof price.product === 'object' ? price.product.name : undefined,
      }
    }
  }

  cache = prices
  cacheAt = Date.now()
  return { prices, stripeConfigured: true }
}

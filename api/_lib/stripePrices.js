// Looks up the live Stripe Price for each of the site's SKUs, matched by
// Stripe's own "lookup_key" field on the Price. Jeff edits prices in the
// Stripe Dashboard; whatever a Price's current amount is becomes the site's
// price and what checkout charges, automatically.
//
// A SKU with no lookup_key set on any Price simply isn't returned here — the
// caller falls back to the static catalog in src/data/inventory.js for that
// one SKU, so partially set up pricing still works everywhere else.
//
// Setup, per SKU you want Stripe-managed: set the Price's lookup_key to the
// SKU code. Two spellings are accepted for each kit, so whichever one gets
// typed into Stripe works: the site's own code (SE2-34-8-10, as in allSkus in
// src/data/inventory.js) or CSUE's price-sheet spelling of the same kit
// (SEII-34-8-10). Stripe's Dashboard has no documented field for this on an
// existing Price — the CLI/API does it: `stripe prices update <price_id>
// --lookup-key SE2-34-8-10` (see clients/stub-ease/deploy-plan.md in the
// studio repo for the full list).

import { getStripe } from './stripe.js'
import { allSkus } from '../../src/data/inventory.js'

// Every lookup_key spelling a SKU may be registered under in Stripe, the
// site's own code first.
export function lookupKeyAliases(sku) {
  return sku.startsWith('SE2-') ? [sku, sku.replace(/^SE2-/, 'SEII-')] : [sku]
}

const keyToSku = new Map()
for (const sku of allSkus) {
  for (const key of lookupKeyAliases(sku)) keyToSku.set(key, sku)
}
const allLookupKeys = [...keyToSku.keys()]

// Stripe's prices.list accepts up to 10 lookup_keys per call
// (docs.stripe.com/api/prices/list), so keys are fetched in chunks of 10.
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
  for (let i = 0; i < allLookupKeys.length; i += CHUNK_SIZE) {
    const chunk = allLookupKeys.slice(i, i + CHUNK_SIZE)
    const { data } = await stripe.prices.list({ lookup_keys: chunk, active: true, expand: ['data.product'] })
    for (const price of data) {
      if (!price.lookup_key || price.unit_amount == null) continue
      const sku = keyToSku.get(price.lookup_key)
      if (!sku) continue
      // If both spellings are keyed in Stripe, the site's own code wins.
      if (prices[sku] && price.lookup_key !== sku) continue
      prices[sku] = {
        id: price.id,
        unitAmount: price.unit_amount,
        currency: price.currency,
        lookupKey: price.lookup_key,
        productName: price.product && typeof price.product === 'object' ? price.product.name : undefined,
      }
    }
  }

  cache = prices
  cacheAt = Date.now()
  return { prices, stripeConfigured: true }
}

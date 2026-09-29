// Prices: CSUE Master Pricing 2026 (effective September 2026; supersedes ALL
// prior CSUE pricing files). The site carries MSRP only — the one tier CSUE
// advertises. Wholesale, B2B and Committed-buyer prices, and landed costs, are
// internal: they live in the CRM, never here (this repo and its bundle are public).
// Kits are priced BY THE BOX — one price for the 10-pack and one for the 25-pack
// of each trade size (25-packs carry a 5% bulk discount); the 8" and 12" heights
// are priced the same. Component prices (caps, stands) are per individual piece.
//
// Stock: the Stub-EASE II 2026 Price List (effective Sept 2026) — the newest
// inventory list, confirmed by the client 2026-09-29 because its prices match the
// master pricing; it supersedes the Aug 2026 Inventory Valuation Report (PO
// EG2605016) this file started from. "Units on Hand" = individual kit pieces
// (QOH boxes × pack size). Kits are sold by the box: pricePerBox is what a shopper
// pays for one box; the per-unit figure shown on the site is pricePerBox ÷ pack.
//
// PRICING HERE IS A FALLBACK ONLY (as of 2026-09-18). The real, current price
// of record is whatever Jeff has set in the Stripe Dashboard for that SKU's
// Price (matched by lookup_key — see api/_lib/stripePrices.js). The site
// reads live from Stripe via /api/prices and only falls back to the numbers
// below for a SKU that doesn't have a Stripe Price set up yet. Don't "fix" a
// price a customer reports as wrong by editing this file — check Stripe
// first. These numbers WILL drift from Stripe over time by design; that's
// expected, not a bug to reconcile.
//
// This is a point-in-time snapshot. See src/lib/InventoryContext.jsx for how
// stock is tracked live in the app, and README.md for what's needed to make
// stock levels persist across visitors/devices via a real database.

export const kitSkus = [
  { sku: 'SE2-34-8-10', tradeSize: '3/4', height: '8', pack: 10, qohBoxes: 100, unitsOnHand: 1000, pricePerBox: 164.60 },
  { sku: 'SE2-34-8-25', tradeSize: '3/4', height: '8', pack: 25, qohBoxes: 60, unitsOnHand: 1500, pricePerBox: 390.93 },
  { sku: 'SE2-34-12-10', tradeSize: '3/4', height: '12', pack: 10, qohBoxes: 160, unitsOnHand: 1600, pricePerBox: 164.60 },
  { sku: 'SE2-34-12-25', tradeSize: '3/4', height: '12', pack: 25, qohBoxes: 86, unitsOnHand: 2150, pricePerBox: 390.93 },
  { sku: 'SE2-1-8-10', tradeSize: '1', height: '8', pack: 10, qohBoxes: 100, unitsOnHand: 1000, pricePerBox: 188.00 },
  { sku: 'SE2-1-8-25', tradeSize: '1', height: '8', pack: 25, qohBoxes: 60, unitsOnHand: 1500, pricePerBox: 446.50 },
  { sku: 'SE2-1-12-10', tradeSize: '1', height: '12', pack: 10, qohBoxes: 160, unitsOnHand: 1600, pricePerBox: 188.00 },
  { sku: 'SE2-1-12-25', tradeSize: '1', height: '12', pack: 25, qohBoxes: 86, unitsOnHand: 2150, pricePerBox: 446.50 },
]

// Not sold on their own on this site ("Included in Kit Only" in products.js) — kept
// so a Stripe Price or a future component page has a correct MSRP to fall back on.
export const componentSkus = [
  { sku: 'CAP-34', name: 'Stub-EASE II™ Cap (3/4")', tradeSize: '3/4', unitsOnHand: 100, msrpPerUnit: 3.75 },
  { sku: 'CAP-1', name: 'Stub-EASE II™ Cap (1")', tradeSize: '1', unitsOnHand: 100, msrpPerUnit: 4.25 },
  { sku: 'SES-34', name: 'Stand-EASE™ Support (3/4")', tradeSize: '3/4', unitsOnHand: 100, msrpPerUnit: 6.25 },
  { sku: 'SES-1', name: 'Stand-EASE™ Support (1")', tradeSize: '1', unitsOnHand: 100, msrpPerUnit: 7.25 },
]

export const getKitSku = (tradeSize, height, pack) =>
  kitSkus.find((k) => k.tradeSize === tradeSize && k.height === height && k.pack === Number(pack))

export const getComponentSkusByFamily = (family) =>
  componentSkus.filter((c) => c.sku.startsWith(family))

// Representative per-unit price for the homepage ROI calculator, which only
// asks for trade size (not height/pack). Uses the 25-pack tier — the lowest
// per-unit price point, and the most realistic stand-in for a full project
// order — averaged across the 8"/12" height options for that trade size.
// Derived from pricePerBox so it can never drift from the Products page.
const avgPerUnit25 = (tradeSize) => {
  const tier = kitSkus.filter((k) => k.tradeSize === tradeSize && k.pack === 25)
  return tier.reduce((sum, k) => sum + k.pricePerBox / k.pack, 0) / tier.length
}
export const roiRepresentativeMsrp = {
  '3/4': avgPerUnit25('3/4'), // 390.93 / 25 = 15.6372
  '1': avgPerUnit25('1'), // 446.50 / 25 = 17.86
}

// Unified lookup used by both the client (InventoryContext) and the server
// (api/checkout.js, api/inventory.js) so a SKU never gets priced two different
// ways. `price` is the fallback price of ONE sellable unit — a box for kits
// (pricePerBox), a single piece for components (pack is always 1 for them).
export function getSkuRecord(sku) {
  const kit = kitSkus.find((k) => k.sku === sku)
  if (kit) {
    return { sku, kind: 'kit', pack: kit.pack, price: kit.pricePerBox, tradeSize: kit.tradeSize, height: kit.height }
  }
  const component = componentSkus.find((c) => c.sku === sku)
  if (component) {
    return { sku, kind: 'component', pack: 1, price: component.msrpPerUnit, tradeSize: component.tradeSize, name: component.name }
  }
  return null
}

export const allSkus = [...kitSkus.map((k) => k.sku), ...componentSkus.map((c) => c.sku)]

// The August 2026 opening stock (kits tracked in boxes, components in pieces).
// This is a fallback/seed only — once a database is connected (see
// api/inventory.js), live counts there are the real source of truth and this
// snapshot goes stale on purpose; it's what a fresh SKU starts at.
export function initialStockMap() {
  const stock = {}
  kitSkus.forEach((k) => {
    stock[k.sku] = k.qohBoxes
  })
  componentSkus.forEach((c) => {
    stock[c.sku] = c.unitsOnHand
  })
  return stock
}

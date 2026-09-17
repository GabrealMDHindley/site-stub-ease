// Sourced directly from CSUE Technologies, Inc. — Inventory Valuation Report
// (Based on PO EG2605016 | Pricing: 25% tariff · $2 boxing · 4× markup | Aug 2026)
//
// "Units on Hand" = individual kit pieces currently in stock (QOH boxes × pack size).
// Kits are sold by the box (pack of 10 or 25); Landed/MSRP/Dist prices below are
// PER INDIVIDUAL UNIT — multiply by pack size for the per-box price.
//
// This is a point-in-time snapshot. See src/lib/InventoryContext.jsx for how
// stock is tracked live in the app, and README.md for what's needed to make
// stock levels persist across visitors/devices via a real database.

export const kitSkus = [
  { sku: 'SE2-34-8-10', tradeSize: '3/4', height: '8', pack: 10, qohBoxes: 100, unitsOnHand: 1000, landedPerUnit: 2.26, msrpPerUnit: 9.05, distPerUnit: 7.69 },
  { sku: 'SE2-34-8-25', tradeSize: '3/4', height: '8', pack: 25, qohBoxes: 60, unitsOnHand: 1500, landedPerUnit: 1.96, msrpPerUnit: 7.85, distPerUnit: 6.67 },
  { sku: 'SE2-34-12-10', tradeSize: '3/4', height: '12', pack: 10, qohBoxes: 160, unitsOnHand: 1600, landedPerUnit: 2.33, msrpPerUnit: 9.30, distPerUnit: 7.91 },
  { sku: 'SE2-34-12-25', tradeSize: '3/4', height: '12', pack: 25, qohBoxes: 86, unitsOnHand: 2150, landedPerUnit: 1.99, msrpPerUnit: 7.95, distPerUnit: 6.76 },
  { sku: 'SE2-1-8-10', tradeSize: '1', height: '8', pack: 10, qohBoxes: 100, unitsOnHand: 1000, landedPerUnit: 2.55, msrpPerUnit: 10.20, distPerUnit: 8.67 },
  { sku: 'SE2-1-8-25', tradeSize: '1', height: '8', pack: 25, qohBoxes: 60, unitsOnHand: 1500, landedPerUnit: 2.25, msrpPerUnit: 9.00, distPerUnit: 7.65 },
  { sku: 'SE2-1-12-10', tradeSize: '1', height: '12', pack: 10, qohBoxes: 160, unitsOnHand: 1600, landedPerUnit: 2.61, msrpPerUnit: 10.45, distPerUnit: 8.88 },
  { sku: 'SE2-1-12-25', tradeSize: '1', height: '12', pack: 25, qohBoxes: 86, unitsOnHand: 2150, landedPerUnit: 2.28, msrpPerUnit: 9.10, distPerUnit: 7.74 },
]

export const componentSkus = [
  { sku: 'CAP-34', name: 'Stub-EASE II™ Cap (3/4")', tradeSize: '3/4', unitsOnHand: 100, landedPerUnit: 0.15, msrpPerUnit: 0.60, distPerUnit: 0.51 },
  { sku: 'CAP-1', name: 'Stub-EASE II™ Cap (1")', tradeSize: '1', unitsOnHand: 100, landedPerUnit: 0.16, msrpPerUnit: 0.65, distPerUnit: 0.55 },
  { sku: 'SES-34', name: 'Stand-EASE™ Support (3/4")', tradeSize: '3/4', unitsOnHand: 50, landedPerUnit: 0.50, msrpPerUnit: 2.00, distPerUnit: 1.70 },
  { sku: 'SES-1', name: 'Stand-EASE™ Support (1")', tradeSize: '1', unitsOnHand: 50, landedPerUnit: 0.50, msrpPerUnit: 2.00, distPerUnit: 1.70 },
]

export const getKitSku = (tradeSize, height, pack) =>
  kitSkus.find((k) => k.tradeSize === tradeSize && k.height === height && k.pack === Number(pack))

export const getComponentSkusByFamily = (family) =>
  componentSkus.filter((c) => c.sku.startsWith(family))

// Representative per-unit MSRP for the homepage ROI calculator, which only
// asks for trade size (not height/pack). Uses the 25-pack tier — the lowest
// per-unit price point, and the most realistic stand-in for a full project
// order — averaged across the 8"/12" height options for that trade size.
export const roiRepresentativeMsrp = {
  '3/4': (7.85 + 7.95) / 2, // = 7.90
  '1': (9.0 + 9.1) / 2, // = 9.05
}

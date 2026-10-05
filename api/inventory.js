// Vercel Serverless Function — GET/POST /api/inventory
//
// GET returns the shared stock every visitor sees, from (first that answers):
//   1. the Stub-EASE CRM — the stock of record. When a sale comes in through
//      Stripe the CRM records it and takes the stock down (crm-stub-ease:
//      api/_lib/stripe-sales.ts), and its public stock endpoint pulls any new
//      Stripe sales in before answering, so this request also helps a fresh
//      sale land in the CRM. Website SKU names; kits in boxes, parts in pieces;
//      no prices.
//   2. a connected KV database (see CLAUDE.md → Inventory), if one is set up;
//   3. the static opening balance in src/data/inventory.js.
//
// POST is a manual admin adjustment to the KV copy (restock, correction), gated
// behind INVENTORY_ADMIN_KEY — disabled until that env var is set. Day to day,
// stock is edited in the CRM's Inventory page.

import { allSkus, initialStockMap } from '../src/data/inventory.js'
import { getKv } from './_lib/kv.js'

const CRM_STOCK_URL =
  process.env.CRM_STOCK_URL || 'https://crm-stub-ease.vercel.app/api/inventory?action=public-stock'
const CRM_TIMEOUT_MS = 6000

// The CRM's stock for every SKU this site sells, or null if the CRM can't be reached.
async function crmStock() {
  try {
    const res = await fetch(CRM_STOCK_URL, {
      headers: { accept: 'application/json' },
      signal: AbortSignal.timeout(CRM_TIMEOUT_MS),
    })
    if (!res.ok) return null
    const data = await res.json()
    if (!data?.ok || !data.stock || typeof data.stock !== 'object') return null
    const stock = {}
    for (const sku of allSkus) {
      const n = Number(data.stock[sku])
      if (Number.isFinite(n)) stock[sku] = Math.max(0, Math.floor(n))
    }
    return Object.keys(stock).length > 0 ? stock : null
  } catch (err) {
    console.warn('[inventory] CRM stock unavailable, falling back:', err?.message || err)
    return null
  }
}

export default async function handler(req, res) {
  const kv = getKv()

  if (req.method === 'GET') {
    const fromCrm = await crmStock()
    if (fromCrm) {
      res.setHeader('Cache-Control', 'no-store')
      return res.status(200).json({
        ok: true,
        source: 'crm',
        kvConnected: Boolean(kv),
        stock: { ...initialStockMap(), ...fromCrm },
      })
    }

    if (!kv) {
      return res.status(200).json({
        ok: true,
        kvConnected: false,
        stock: initialStockMap(),
        note: 'No database connected yet — showing the starting stock from src/data/inventory.js, not live numbers. See CLAUDE.md → Inventory.',
      })
    }

    const keys = allSkus.map((sku) => `stock:${sku}`)
    const values = await kv.mget(...keys)
    const baseline = initialStockMap()
    const stock = {}
    allSkus.forEach((sku, i) => {
      const v = values[i]
      stock[sku] = v === null || v === undefined ? baseline[sku] : Number(v)
    })

    return res.status(200).json({ ok: true, kvConnected: true, stock })
  }

  if (req.method === 'POST') {
    const adminKey = process.env.INVENTORY_ADMIN_KEY
    if (!adminKey) {
      return res.status(501).json({
        error: 'Manual stock adjustment is not enabled. Set INVENTORY_ADMIN_KEY in Vercel to enable it, or use the CRM once it exists.',
      })
    }
    if (req.headers['authorization'] !== `Bearer ${adminKey}`) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    if (!kv) {
      return res.status(500).json({ error: 'No database connected — see CLAUDE.md → Inventory.' })
    }

    const { sku, set, adjust } = req.body || {}
    if (!sku || !allSkus.includes(sku)) {
      return res.status(400).json({ error: 'Unknown sku' })
    }
    if (typeof set === 'number') {
      await kv.set(`stock:${sku}`, set)
    } else if (typeof adjust === 'number') {
      // Seed from the opening balance if this SKU has never been touched, so
      // the first adjustment doesn't count from 0 (same rule as the webhook).
      await kv.set(`stock:${sku}`, initialStockMap()[sku], { nx: true })
      await kv.incrby(`stock:${sku}`, adjust)
    } else {
      return res.status(400).json({ error: 'Provide either { sku, set: <number> } or { sku, adjust: <number> }' })
    }
    const now = await kv.get(`stock:${sku}`)
    return res.status(200).json({ ok: true, sku, stock: Number(now) })
  }

  res.setHeader('Allow', 'GET, POST')
  return res.status(405).json({ error: 'Method not allowed' })
}

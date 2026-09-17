// Vercel Serverless Function — GET/POST /api/inventory
//
// GET returns real, shared stock once a database is connected (see
// CLAUDE.md → Inventory). Until then it returns the static August 2026
// opening balance from src/data/inventory.js so the site keeps working —
// every visitor sees the same starting numbers, they just don't move.
//
// The real decrement happens in api/stripe-webhook.js when a Stripe payment
// completes, not here. POST is a manual admin adjustment (restock, correction),
// gated behind INVENTORY_ADMIN_KEY — disabled until that env var is set.

import { allSkus, initialStockMap } from '../src/data/inventory.js'
import { getKv } from './_lib/kv.js'

export default async function handler(req, res) {
  const kv = getKv()

  if (req.method === 'GET') {
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

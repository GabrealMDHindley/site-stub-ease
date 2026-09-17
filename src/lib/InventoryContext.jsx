import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { kitSkus, componentSkus } from '../data/inventory.js'

// -----------------------------------------------------------------------
// LIVE STOCK TRACKING — READ THIS BEFORE ASSUMING THIS IS PRODUCTION-READY
// -----------------------------------------------------------------------
// This context keeps stock counts in memory (and mirrors them to
// localStorage so a refresh doesn't reset them mid-session). That's enough
// to make the shopping experience feel real and correctly prevent a single
// visitor from ordering more than is in stock.
//
// It is NOT enough to keep stock accurate across every visitor and device,
// because a static site has no shared server-side state. Two people
// shopping at the same time in different browsers will each see stock
// deplete independently — neither one affects the other, and nothing here
// is decremented by a real completed Stripe payment.
//
// To make stock genuinely shared and accurate for everyone:
//   1. Add a real database — Vercel KV (@vercel/kv) is the fastest to wire
//      up on Vercel; Postgres/Supabase work too.
//   2. Move the "available stock" numbers into that database.
//   3. In /api/checkout.js, decrement stock there BEFORE creating the
//      Stripe session (so two people can't both buy the last box).
//   4. Add a Stripe webhook (/api/stripe-webhook.js) that re-confirms the
//      decrement on successful payment, and restores stock on a
//      cancelled/expired checkout session.
// Once that's in place, swap the localStorage calls below for fetch calls
// to /api/inventory, and every visitor sees the same real number.
// -----------------------------------------------------------------------

const STORAGE_KEY = 'stubease-inventory-v1'

function buildInitialStock() {
  const stock = {}
  kitSkus.forEach((k) => {
    stock[k.sku] = k.qohBoxes // stock tracked in boxes for kits
  })
  componentSkus.forEach((c) => {
    stock[c.sku] = c.unitsOnHand // stock tracked in individual pieces
  })
  return stock
}

const InventoryContext = createContext(null)

export function InventoryProvider({ children }) {
  const [stock, setStock] = useState(() => {
    if (typeof window === 'undefined') return buildInitialStock()
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved) return { ...buildInitialStock(), ...JSON.parse(saved) }
    } catch {
      // ignore corrupt storage, fall through to fresh state
    }
    return buildInitialStock()
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stock))
    } catch {
      // storage unavailable (private browsing, etc.) — non-fatal
    }
  }, [stock])

  const getAvailable = useCallback((sku) => (sku in stock ? stock[sku] : 0), [stock])

  const reserve = useCallback((sku, qty) => {
    setStock((prev) => {
      const current = sku in prev ? prev[sku] : 0
      return { ...prev, [sku]: Math.max(0, current - qty) }
    })
  }, [])

  const release = useCallback((sku, qty) => {
    setStock((prev) => {
      const current = sku in prev ? prev[sku] : 0
      return { ...prev, [sku]: current + qty }
    })
  }, [])

  const resetInventory = useCallback(() => setStock(buildInitialStock()), [])

  return (
    <InventoryContext.Provider value={{ getAvailable, reserve, release, resetInventory }}>
      {children}
    </InventoryContext.Provider>
  )
}

export function useInventory() {
  const ctx = useContext(InventoryContext)
  if (!ctx) throw new Error('useInventory must be used within InventoryProvider')
  return ctx
}

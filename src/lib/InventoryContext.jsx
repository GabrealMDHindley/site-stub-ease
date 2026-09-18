import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { initialStockMap, getSkuRecord } from '../data/inventory.js'

// -----------------------------------------------------------------------
// LIVE STOCK + PRICING
// -----------------------------------------------------------------------
// On mount this fetches real, shared stock from /api/inventory, and real
// prices from /api/prices. Until a database is connected, /api/inventory
// falls back to the static opening balance in src/data/inventory.js. Until
// a SKU has a matching Stripe Price (lookup_key — see
// api/_lib/stripePrices.js), /api/prices simply omits it and getPrice()
// falls back to that same static catalog for that one SKU. Either way the
// site keeps working; it just isn't live for whatever hasn't been
// connected/set up yet.
//
// Prices are Stripe-managed by design (2026-09-18): Jeff edits a Price's
// amount directly in the Stripe Dashboard and it's live on the site and at
// checkout within a minute (see the TTL below), no code change needed.
// src/data/inventory.js's msrpPerUnit fields are the fallback only — do not
// "fix" a price customers report as wrong by editing that file; check the
// matching Stripe Price first.
//
// `reserve`/`release` only adjust in-memory stock, for "don't let me add
// more to the cart than is currently available" while shopping. They are
// NOT a server-side hold — nothing is decremented until a Stripe payment
// actually completes (api/stripe-webhook.js). Two people can in principle
// both see the last box available and both complete payment before either
// deployment reflects the other's purchase; BackorderModal is the site's
// existing, deliberate way of handling that rather than promising a hard
// real-time lock the architecture doesn't have.
// -----------------------------------------------------------------------

const InventoryContext = createContext(null)

export function InventoryProvider({ children }) {
  const [stock, setStock] = useState(() => initialStockMap())
  const [kvConnected, setKvConnected] = useState(null) // null = not known yet
  const [livePrices, setLivePrices] = useState({}) // sku -> dollars (per box for kits, per piece for components)
  const [stripeConfigured, setStripeConfigured] = useState(null) // null = not known yet

  useEffect(() => {
    let cancelled = false
    fetch('/api/inventory')
      .then((res) => res.json())
      .then((data) => {
        if (cancelled || !data?.stock) return
        setStock(data.stock)
        setKvConnected(Boolean(data.kvConnected))
      })
      .catch((err) => {
        // Stay on the static baseline — the site still works, just not with
        // live numbers, same as before a database is connected.
        console.warn('[inventory] could not fetch /api/inventory, using static baseline.', err)
      })
    fetch('/api/prices')
      .then((res) => res.json())
      .then((data) => {
        if (cancelled || !data?.prices) return
        const dollars = {}
        for (const [sku, p] of Object.entries(data.prices)) dollars[sku] = p.unitAmount / 100
        setLivePrices(dollars)
        setStripeConfigured(Boolean(data.stripeConfigured))
      })
      .catch((err) => {
        console.warn('[pricing] could not fetch /api/prices, using the static catalog.', err)
      })
    return () => {
      cancelled = true
    }
  }, [])

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

  // Price per box (kits) or per piece (components) — matches what
  // api/checkout.js actually charges: Stripe's price if this SKU has one,
  // else the same static computation (msrpPerUnit × pack) used before
  // Stripe pricing existed.
  const getPrice = useCallback(
    (sku) => {
      if (sku in livePrices) return livePrices[sku]
      const record = getSkuRecord(sku)
      return record ? record.msrpPerUnit * record.pack : 0
    },
    [livePrices]
  )

  return (
    <InventoryContext.Provider value={{ getAvailable, reserve, release, kvConnected, getPrice, stripeConfigured }}>
      {children}
    </InventoryContext.Provider>
  )
}

export function useInventory() {
  const ctx = useContext(InventoryContext)
  if (!ctx) throw new Error('useInventory must be used within InventoryProvider')
  return ctx
}

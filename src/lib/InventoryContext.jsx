import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { initialStockMap } from '../data/inventory.js'

// -----------------------------------------------------------------------
// LIVE STOCK TRACKING
// -----------------------------------------------------------------------
// On mount this fetches real, shared stock from /api/inventory. Until a
// database is connected there (see CLAUDE.md → Inventory), that endpoint
// falls back to the static opening balance in src/data/inventory.js, so the
// site keeps working — every visitor just sees the same starting numbers.
//
// `reserve`/`release` only adjust this in-memory state, for "don't let me
// add more to the cart than is currently available" while shopping. They are
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

  return (
    <InventoryContext.Provider value={{ getAvailable, reserve, release, kvConnected }}>
      {children}
    </InventoryContext.Provider>
  )
}

export function useInventory() {
  const ctx = useContext(InventoryContext)
  if (!ctx) throw new Error('useInventory must be used within InventoryProvider')
  return ctx
}

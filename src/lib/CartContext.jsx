import { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([]) // { key, slug, name, tradeSize, height, pack, qty, unitPrice }

  const addItem = (item) => {
    setItems((prev) => {
      const key = `${item.slug}-${item.tradeSize}-${item.height}-${item.pack}`
      const existing = prev.find((i) => i.key === key)
      if (existing) {
        return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + item.qty } : i))
      }
      return [...prev, { ...item, key }]
    })
  }

  const removeItem = (key) => setItems((prev) => prev.filter((i) => i.key !== key))

  const updateQty = (key, qty) =>
    setItems((prev) => prev.map((i) => (i.key === key ? { ...i, qty: Math.max(1, qty) } : i)))

  const clear = () => setItems([])

  const subtotal = useMemo(() => items.reduce((sum, i) => sum + (i.unitPrice || 0) * i.qty, 0), [items])
  const count = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items])

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clear, subtotal, count }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

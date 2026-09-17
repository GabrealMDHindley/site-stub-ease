import { AnimatePresence, motion } from 'framer-motion'
import { useCart } from '../lib/CartContext.jsx'
import { startCheckout } from '../lib/integrations.js'

function currency(n) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

export default function CartDrawer({ open, onClose }) {
  const { items, removeItem, updateQty, subtotal } = useCart()

  const handleCheckout = () => {
    // sku carries trade size / height / pack — /api/checkout looks the exact
    // price up from it server-side, so the amount Stripe charges always
    // matches what's shown here.
    startCheckout(items.map((i) => ({ sku: i.sku, quantity: i.qty, slug: i.slug, name: i.name })))
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 z-[95] flex h-full w-full max-w-md flex-col border-l border-steel-line bg-steel"
          >
            <div className="flex items-center justify-between border-b border-steel-line p-6">
              <h2 className="font-display text-xl font-semibold text-steel-bright">Your Cart</h2>
              <button data-cursor-hover onClick={onClose} className="text-steel-soft hover:text-signal" aria-label="Close cart">
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div>
                  <p className="text-steel-soft">Your cart is empty.</p>
                  <p className="mt-1 text-sm text-steel-soft">Add items from the product list.</p>
                </div>
              ) : (
                <div className="space-y-5">
                  {items.map((i) => (
                    <div key={i.key} className="flex gap-4 border-b border-steel-line pb-5">
                      <div className="flex-1">
                        <div className="font-display text-sm font-semibold text-steel-bright">{i.name}</div>
                        <div className="mono-label mt-1 text-[10px] text-steel-soft">
                          {i.tradeSize && `${i.tradeSize}" · `}
                          {i.height && `${i.height}" · `}
                          {i.pack && `Pack of ${i.pack}`}
                        </div>
                        <div className="mt-2 flex items-center gap-3">
                          <div className="flex items-center border border-steel-line">
                            <button data-cursor-hover onClick={() => updateQty(i.key, i.qty - 1)} className="px-2.5 py-1 text-steel-soft hover:text-signal">
                              −
                            </button>
                            <span className="w-8 text-center font-mono text-xs text-steel-bright">{i.qty}</span>
                            <button data-cursor-hover onClick={() => updateQty(i.key, i.qty + 1)} className="px-2.5 py-1 text-steel-soft hover:text-signal">
                              +
                            </button>
                          </div>
                          <button data-cursor-hover onClick={() => removeItem(i.key)} className="text-xs text-steel-soft hover:text-signal">
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="font-mono text-sm text-steel-bright">{currency((i.unitPrice || 0) * i.qty)}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-steel-line p-6">
              <div className="flex justify-between text-sm text-steel-soft">
                <span>Subtotal</span>
                <span className="font-mono text-steel-bright">{currency(subtotal)}</span>
              </div>
              <p className="mt-2 text-xs text-steel-soft">
                Shipping calculated at checkout. For distributor pricing or PO orders, contact us directly.
              </p>
              <button
                data-cursor-hover
                onClick={handleCheckout}
                disabled={items.length === 0}
                className="mono-label mt-5 w-full bg-signal py-4 text-xs text-void transition-opacity hover:opacity-90 disabled:opacity-40"
              >
                Proceed to Checkout
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

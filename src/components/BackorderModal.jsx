import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// Shown instead of a hard "Out of Stock" block when someone orders more
// than is currently available. Stock levels are never shown to customers —
// this keeps the purchase flow moving while setting the right expectation.
export default function BackorderModal({ open, onConfirm, onCancel }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onCancel()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onCancel])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[998] flex items-center justify-center bg-void/85 p-4 backdrop-blur-sm"
          onClick={onCancel}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="hud-frame w-full max-w-sm border border-signal/40 bg-steel-panel p-8 shadow-signal"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-signal" />
            </span>
            <h3 className="mt-4 font-display text-xl font-semibold text-steel-bright">Order Confirmation Needed</h3>
            <p className="mt-3 text-sm text-steel-soft">
              The team at Stub-EASE will be reaching out to confirm your order with you before your purchase is
              finalized. This helps us make sure your quantity and delivery timeline are handled correctly.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                data-cursor-hover
                onClick={onCancel}
                className="mono-label flex-1 border border-steel-line py-3 text-xs text-steel-soft transition-colors hover:border-steel-soft hover:text-steel-bright"
              >
                Cancel
              </button>
              <button
                data-cursor-hover
                onClick={onConfirm}
                className="mono-label flex-1 bg-signal py-3 text-xs text-void transition-opacity hover:opacity-90"
              >
                Continue
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

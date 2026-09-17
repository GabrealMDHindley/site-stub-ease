import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FAQAccordion({ items }) {
  const [open, setOpen] = useState(null)

  return (
    <div className="divide-y divide-steel-line border-y border-steel-line">
      {items.map((item, i) => (
        <div key={item.q}>
          <button
            data-cursor-hover
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between py-5 text-left"
          >
            <span className="font-display text-base font-medium text-steel-bright md:text-lg">{item.q}</span>
            <span className={`mono-label text-signal transition-transform ${open === i ? 'rotate-45' : ''}`}>+</span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="pb-6 text-sm text-steel-soft md:text-base">{item.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { roles } from '../data/roles.js'

export default function RoleTabs() {
  const [active, setActive] = useState(roles[0].id)
  const role = roles.find((r) => r.id === active)

  return (
    <div>
      <div className="mono-label mb-6 text-xs text-steel-soft">I am a</div>
      <div className="flex flex-wrap gap-2">
        {roles.map((r) => (
          <button
            key={r.id}
            data-cursor-hover
            onClick={() => setActive(r.id)}
            className={`mono-label border px-4 py-2.5 text-[11px] transition-colors ${
              active === r.id
                ? 'border-signal bg-signal/10 text-signal'
                : 'border-steel-line text-steel-soft hover:border-steel-soft hover:text-steel-bright'
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35 }}
          className="mt-10 grid gap-10 lg:grid-cols-5"
        >
          <div className="lg:col-span-2">
            <h3 className="font-display text-2xl font-semibold text-steel-bright md:text-3xl">{role.heading}</h3>
            <p className="mt-4 text-steel-soft">{role.body}</p>
            <Link
              to="/products"
              data-cursor-hover
              className="mono-label mt-6 inline-block border border-signal px-5 py-3 text-xs text-signal transition-colors hover:bg-signal hover:text-void"
            >
              Shop Now
            </Link>

            <div className="mt-10 space-y-4">
              {role.steps.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mono-label flex h-6 w-6 flex-shrink-0 items-center justify-center border border-signal text-[10px] text-signal">
                    {i + 1}
                  </div>
                  <p className="text-sm text-steel-soft">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-3">
            {role.benefits.map((b) => (
              <div key={b.title} className="hud-frame border border-steel-line bg-steel-panel/60 p-6">
                <div className="font-display text-base font-medium text-steel-bright">{b.title}</div>
                <p className="mt-2 text-sm text-steel-soft">{b.body}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

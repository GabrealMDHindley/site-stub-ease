import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../lib/CartContext.jsx'
import CartDrawer from './CartDrawer.jsx'
import { CHECKOUT_ENABLED } from '../config/features.js'

const links = [
  { to: '/', label: 'Home' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/products', label: 'Products' },
  { to: '/safety', label: 'Studies & Safety' },
  { to: '/about', label: 'About' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const { count } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'border-b border-steel-line bg-void/90 backdrop-blur-md'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <Link to="/" data-cursor-hover className="flex items-center gap-3">
          <span className="mono-label text-sm font-semibold text-steel-bright drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
            STUB-<span className="text-signal">EASE</span> II
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              data-cursor-hover
              className={({ isActive }) =>
                `mono-label text-[11px] drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] transition-colors ${
                  isActive ? 'text-signal' : 'text-steel-bright/90 hover:text-signal'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <Link
            to="/#roi-calculator"
            data-cursor-hover
            className="mono-label rounded-sm border border-signal bg-void/40 px-4 py-2 text-[11px] text-signal backdrop-blur-sm transition-colors hover:bg-signal hover:text-void"
          >
            Calculate Savings
          </Link>
          {CHECKOUT_ENABLED && (
            <button
              data-cursor-hover
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 text-steel-bright/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] hover:text-signal"
              aria-label="Open cart"
            >
              <CartIcon />
              {count > 0 && (
                <span className="mono-label absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-signal text-[9px] text-void">
                  {count}
                </span>
              )}
            </button>
          )}
        </div>

        <div className="flex items-center gap-4 lg:hidden">
          {CHECKOUT_ENABLED && (
            <button
              data-cursor-hover
              onClick={() => setCartOpen(true)}
              className="relative text-steel-bright drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
              aria-label="Open cart"
            >
              <CartIcon />
              {count > 0 && (
                <span className="mono-label absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-signal text-[9px] text-void">
                  {count}
                </span>
              )}
            </button>
          )}
          <button
            data-cursor-hover
            onClick={() => setOpen(!open)}
            className="flex flex-col gap-1.5"
            aria-label="Toggle menu"
          >
            <span
              className={`h-[2px] w-6 bg-steel-bright drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`}
            />
            <span className={`h-[2px] w-6 bg-steel-bright drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span
              className={`h-[2px] w-6 bg-steel-bright drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`}
            />
          </button>
        </div>
      </nav>

      {CHECKOUT_ENABLED && <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-steel-line bg-void lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `mono-label py-3 text-xs ${isActive ? 'text-signal' : 'text-steel-soft'}`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <Link
                to="/#roi-calculator"
                onClick={() => setOpen(false)}
                className="mono-label mt-2 rounded-sm border border-signal px-4 py-3 text-center text-xs text-signal"
              >
                Calculate Savings
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="9" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M1 1h3l2.4 12.4a2 2 0 0 0 2 1.6h9.2a2 2 0 0 0 2-1.6L21.4 6H5.1" />
    </svg>
  )
}

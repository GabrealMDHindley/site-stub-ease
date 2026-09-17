import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-steel-line bg-steel px-6 py-16 md:px-10">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-4">
        <div>
          <div className="mono-label text-sm font-semibold text-steel-bright">
            STUB-<span className="text-signal">EASE</span> II
          </div>
          <p className="mt-4 max-w-xs text-sm text-steel-soft">
            The Total Solution to Eliminate Conduit Stub-Ups.
          </p>
          <p className="mt-4 text-xs text-steel-soft">
            Patents: US 10,320,167 B2 · US 10,742,008 B2 · US 11,221,090 B2 · Additional patent pending
          </p>
        </div>

        <div>
          <div className="mono-label mb-4 text-xs text-signal">Product</div>
          <ul className="space-y-3 text-sm text-steel-soft">
            <li><Link data-cursor-hover to="/how-it-works" className="hover:text-steel-bright">How It Works</Link></li>
            <li><Link data-cursor-hover to="/products" className="hover:text-steel-bright">Products & Pricing</Link></li>
            <li><Link data-cursor-hover to="/safety" className="hover:text-steel-bright">Studies & Safety</Link></li>
          </ul>
        </div>

        <div>
          <div className="mono-label mb-4 text-xs text-signal">Company</div>
          <ul className="space-y-3 text-sm text-steel-soft">
            <li><Link data-cursor-hover to="/about" className="hover:text-steel-bright">About CSUE</Link></li>
            <li><Link data-cursor-hover to="/contact" className="hover:text-steel-bright">Contact</Link></li>
            <li><Link data-cursor-hover to="/testimonials" className="hover:text-steel-bright">Testimonials</Link></li>
          </ul>
        </div>

        <div>
          <div className="mono-label mb-4 text-xs text-signal">Contact</div>
          <a data-cursor-hover href="mailto:info@stubease.com" className="block text-sm text-steel-soft hover:text-steel-bright">
            info@stubease.com
          </a>
          <div className="mt-1 text-xs text-steel-soft">Mon–Fri, 8:00 AM – 5:00 PM CT</div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-steel-line pt-6 text-xs text-steel-soft">
        © 2026 CSUE Technologies, Inc. All rights reserved. The Bend-EASE™ elbow was designed and tested to meet UL
        specifications for use as a transition fitting between metallic and PVC conduit systems in concrete
        construction per NEC 300.15(F) (2023 NEC) / NEC 300.17(F) (2026 NEC). Legal & Policies, Return Policy, and
        Shipping Policy pages are linked from the live site footer — send over that copy and I'll wire up matching
        pages here.
      </div>
    </footer>
  )
}

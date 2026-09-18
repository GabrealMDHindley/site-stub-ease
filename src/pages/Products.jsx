import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import BackorderModal from '../components/BackorderModal.jsx'
import { products, submittals } from '../data/products.js'
import { getKitSku } from '../data/inventory.js'
import { useCart } from '../lib/CartContext.jsx'
import { useInventory } from '../lib/InventoryContext.jsx'
import { CHECKOUT_ENABLED, SHOW_PRICING } from '../config/features.js'

const kit = products.find((p) => p.slug === 'stub-ease-ii-system')
const comingSoon = products.filter((p) => p.status === 'coming-soon' || p.status === 'special-order')

function currency(n) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })
}

export default function Products() {
  const { addItem } = useCart()
  const { getAvailable, reserve, getPrice } = useInventory()
  const [tradeSize, setTradeSize] = useState('3/4')
  const [height, setHeight] = useState('8')
  const [pack, setPack] = useState('10')
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [backorderOpen, setBackorderOpen] = useState(false)

  const [filterTrade, setFilterTrade] = useState('All')
  const [filterHeight, setFilterHeight] = useState('All')
  const [filterPack, setFilterPack] = useState('All')

  const selectedSku = getKitSku(tradeSize, height, pack)
  const availableBoxes = selectedSku ? getAvailable(selectedSku.sku) : 0
  // getPrice reads the live Stripe price for this SKU if Jeff has set one,
  // else falls back to the same static math this used to do directly.
  const pricePerBox = selectedSku ? getPrice(selectedSku.sku) : 0
  const perUnitPrice = selectedSku ? pricePerBox / selectedSku.pack : 0

  const commitAdd = () => {
    addItem({
      slug: kit.slug,
      sku: selectedSku.sku,
      name: kit.name,
      tradeSize,
      height,
      pack,
      qty,
      unitPrice: pricePerBox,
    })
    reserve(selectedSku.sku, qty)
    setAdded(true)
    setQty(1)
    setTimeout(() => setAdded(false), 1800)
  }

  const handleAdd = () => {
    if (!selectedSku || qty < 1) return
    if (qty > availableBoxes) {
      setBackorderOpen(true)
      return
    }
    commitAdd()
  }

  const filtersActive = filterTrade !== 'All' || filterHeight !== 'All' || filterPack !== 'All'
  const kitMatchesFilter = useMemo(() => {
    if (!filtersActive) return true
    return (
      (filterTrade === 'All' || kit.filters.tradeSize.includes(filterTrade)) &&
      (filterHeight === 'All' || kit.filters.height.includes(filterHeight)) &&
      (filterPack === 'All' || kit.filters.pack.includes(filterPack))
    )
  }, [filterTrade, filterHeight, filterPack, filtersActive])

  return (
    <>
      <PageHero
        eyebrow="Products & Pricing"
        title="The Complete Stub-EASE II™ System — Every Trade Size, Every Height."
        subtitle="NEC 300.15(F) / 300.17(F) compliant. Configure your kit below, or order individual components from current stock."
      />

      {/* KIT CONFIGURATOR */}
      <section id="store" className="py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal direction="right" className="hud-frame overflow-hidden border border-steel-line bg-steel-panel">
              <img src={kit.image} alt={kit.name} className="w-full object-contain p-8" />
            </Reveal>

            <Reveal direction="left" delay={0.1}>
              <span className="mono-label border border-signal px-2.5 py-1 text-[10px] text-signal">
                {kit.statusLabel}
              </span>
              <h2 className="mt-4 font-display text-3xl font-semibold text-steel-bright">{kit.name}</h2>
              <p className="mt-2 text-steel-soft">{kit.tagline}</p>
              <p className="mt-4 text-steel-bright/90">{kit.description}</p>

              <div className="mt-8 space-y-5">
                <ConfigRow label="Trade Size" options={kit.filters.tradeSize} value={tradeSize} onChange={setTradeSize} suffix={'"'} />
                <ConfigRow label="Height" options={kit.filters.height} value={height} onChange={setHeight} suffix={'"'} />
                <ConfigRow label="Pack Size" options={kit.filters.pack} value={pack} onChange={setPack} prefix="Pack of " />
              </div>

              {selectedSku && (
                <div className="mono-label mt-5 text-[10px] text-steel-soft">SKU: {selectedSku.sku}</div>
              )}

              <div
                className={`mt-6 flex items-end gap-4 border-t border-steel-line pt-6 ${
                  SHOW_PRICING ? 'justify-between' : 'justify-end'
                }`}
              >
                {SHOW_PRICING && (
                  <div>
                    <div className="mono-label text-[10px] text-steel-soft">
                      {currency(pricePerBox)}/box of {pack} · {currency(perUnitPrice)}/unit
                    </div>
                    <div className="font-display text-2xl font-semibold text-signal">
                      {currency(pricePerBox * qty)}
                    </div>
                    {qty > 1 && (
                      <div className="mono-label mt-0.5 text-[10px] text-steel-soft">
                        {qty} boxes × {currency(pricePerBox)}
                      </div>
                    )}
                  </div>
                )}
                <div className="flex items-center border border-steel-line">
                  <button data-cursor-hover onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-4 py-3 text-steel-soft hover:text-signal">
                    −
                  </button>
                  <span className="w-10 text-center font-mono text-steel-bright">{qty}</span>
                  <button data-cursor-hover onClick={() => setQty((q) => q + 1)} className="px-4 py-3 text-steel-soft hover:text-signal">
                    +
                  </button>
                </div>
              </div>

              {CHECKOUT_ENABLED ? (
                <button
                  data-cursor-hover
                  onClick={handleAdd}
                  className="mono-label mt-6 w-full bg-signal py-4 text-xs text-void transition-transform hover:scale-[1.01]"
                >
                  {added ? 'Added ✓' : 'Add to Cart'}
                </button>
              ) : (
                <Link
                  to="/contact"
                  data-cursor-hover
                  className="mono-label mt-6 block w-full border border-signal py-4 text-center text-xs text-signal transition-colors hover:bg-signal hover:text-void"
                >
                  Contact Us to Order
                </Link>
              )}

              <p className="mt-4 text-xs text-steel-soft">{kit.pricingNote}</p>
            </Reveal>
          </div>

          <BackorderModal
            open={backorderOpen}
            onCancel={() => setBackorderOpen(false)}
            onConfirm={() => {
              setBackorderOpen(false)
              commitAdd()
            }}
          />

          {/* FILTERS (browse) */}
          <Reveal className="mt-20 flex flex-wrap items-center gap-6 border-y border-steel-line py-6">
            <FilterGroup label="Trade Size" options={['All', '3/4', '1']} value={filterTrade} onChange={setFilterTrade} />
            <FilterGroup label="Height" options={['All', '8', '12']} value={filterHeight} onChange={setFilterHeight} />
            <FilterGroup label="Pack Size" options={['All', '10', '25']} value={filterPack} onChange={setFilterPack} />
          </Reveal>
          {filtersActive && (
            <p className="mt-4 text-sm text-steel-soft">
              {kitMatchesFilter
                ? 'The Stub-EASE II™ kit above is available in this configuration.'
                : 'This exact configuration isn\u2019t available — try a different combination or contact us for a custom spec.'}
            </p>
          )}
        </div>
      </section>

      {/* CAP ENGINEERING DETAIL */}
      <section className="border-t border-steel-line bg-steel-panel/40 py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal>
            <div className="mono-label text-xs text-signal">Engineering Detail</div>
            <h2 className="mt-3 font-display text-3xl font-semibold text-steel-bright md:text-4xl">
              Inside the Convex Cap
            </h2>
            <p className="mt-4 max-w-2xl text-steel-soft">
              The Stub-EASE II™ (Convex Cap) is a precision-molded assembly. The depressed guide strip centers the
              extraction bit. Four talons project off the top surface, flex flat during the pour, and spring back
              to mark the stub-up location above finished grade.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Reveal className="hud-frame overflow-hidden border border-steel-line">
              <img
                src="https://stubease.pplx.app/images/products/cap-cad-section-copper.jpg"
                alt="Stub-EASE II™ cap CAD cross-section — internal rib structure"
                className="w-full object-cover"
              />
              <p className="p-4 text-xs text-steel-soft">Internal rib structure and guide strip — bronze/copper material view</p>
            </Reveal>
            <Reveal delay={0.08} className="hud-frame overflow-hidden border border-steel-line">
              <img
                src="https://stubease.pplx.app/images/products/cap-cad-section-silver.jpg"
                alt="Stub-EASE II™ cap CAD cross-section — talon geometry"
                className="w-full object-cover"
              />
              <p className="p-4 text-xs text-steel-soft">Talon geometry and convex dome profile — section cut view</p>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="hud-frame mt-6 overflow-hidden border border-steel-line bg-void">
            <video src="https://stubease.pplx.app/videos/seii-extraction-field.mp4" controls muted playsInline className="w-full" />
            <p className="p-4 text-xs text-steel-soft">
              Impact driver in reverse. Matched spade bit. NEC 300.15(F) / 300.17(F) compliant transition.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="mt-8 flex flex-wrap gap-2">
            {['EMT Compatible', 'RMC Compatible', 'PVC Compatible', 'NEC 300.15(F) / 300.17(F)'].map((tag) => (
              <span key={tag} className="mono-label border border-steel-line px-3 py-1.5 text-[10px] text-steel-soft">
                {tag}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* SUBMITTALS */}
      <section id="submittals" className="border-t border-steel-line bg-steel-panel/40 py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal>
            <div className="mono-label text-xs text-signal">Submittals & Documentation</div>
            <h2 className="mt-3 font-display text-3xl font-semibold text-steel-bright md:text-4xl">
              Project-Ready Documents
            </h2>
            <p className="mt-4 max-w-2xl text-steel-soft">
              Download spec sheets, installation guides, and submittals for your project file or design team. No
              sign-up required.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {submittals.map((doc, i) => (
              <Reveal key={doc.title} delay={(i % 3) * 0.06} className="hud-frame border border-steel-line bg-void p-6">
                <div className="font-display text-base font-semibold text-steel-bright">{doc.title}</div>
                <p className="mt-2 text-xs text-steel-soft">{doc.description}</p>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  className="mono-label mt-4 inline-block text-[11px] text-signal hover:underline"
                >
                  Download PDF →
                </a>
              </Reveal>
            ))}
            <Reveal delay={0.3} className="hud-frame border border-steel-line bg-void p-6">
              <div className="font-display text-base font-semibold text-steel-bright">Installation Walkthrough</div>
              <p className="mt-2 text-xs text-steel-soft">
                Step-by-step visual guide showing the full Stub-EASE II™ system from conduit run through cap
                extraction.
              </p>
              <Link to="/how-it-works" data-cursor-hover className="mono-label mt-4 inline-block text-[11px] text-signal hover:underline">
                View Guide →
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* COMING SOON / SPECIAL ORDER */}
      <section className="border-t border-steel-line py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal>
            <div className="mono-label text-xs text-signal">Expanding the System</div>
            <h2 className="mt-3 font-display text-3xl font-semibold text-steel-bright md:text-4xl">
              Coming Soon & Special Order
            </h2>
            <p className="mt-4 max-w-2xl text-steel-soft">
              Metallic Bend-EASE™ and metallic Stand-EASE™ variants have been discontinued. Per NEC 300.15(F) /
              300.17(F), the PVC Bend-EASE™ elbow is the code-compliant path for both metallic and PVC below-slab
              raceways — no metallic elbow required.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {comingSoon.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <Link to={`/products/${p.slug}`} data-cursor-hover className="group hud-frame flex h-full flex-col border border-steel-line bg-steel-panel/40">
                  <div className="aspect-[4/3] overflow-hidden bg-steel-panel">
                    <img src={p.image} alt={p.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="mono-label w-fit border border-steel-line px-2.5 py-1 text-[9px] text-steel-soft">
                      {p.statusLabel}
                    </span>
                    <h3 className="mt-3 font-display text-lg font-semibold text-steel-bright">{p.name}</h3>
                    <p className="mt-2 flex-1 text-sm text-steel-soft">{p.tagline}</p>
                    <div className="mono-label mt-4 text-[11px] text-signal">View Details →</div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function ConfigRow({ label, options, value, onChange, prefix = '', suffix = '' }) {
  return (
    <div>
      <span className="mono-label mb-2 block text-[11px] text-steel-soft">{label}</span>
      <div className="flex gap-3">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            data-cursor-hover
            onClick={() => onChange(opt)}
            className={`flex-1 border px-4 py-3 font-mono text-sm transition-colors ${
              value === opt ? 'border-signal bg-signal/10 text-signal' : 'border-steel-line text-steel-soft hover:border-steel-soft'
            }`}
          >
            {prefix}
            {opt}
            {suffix}
          </button>
        ))}
      </div>
    </div>
  )
}

function FilterGroup({ label, options, value, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <span className="mono-label text-[10px] text-steel-soft">{label}</span>
      <div className="flex gap-1.5">
        {options.map((opt) => (
          <button
            key={opt}
            data-cursor-hover
            onClick={() => onChange(opt)}
            className={`mono-label border px-3 py-1.5 text-[10px] transition-colors ${
              value === opt ? 'border-signal text-signal' : 'border-steel-line text-steel-soft hover:border-steel-soft'
            }`}
          >
            {opt === 'All' ? 'All' : `${opt}"`}
          </button>
        ))}
      </div>
    </div>
  )
}

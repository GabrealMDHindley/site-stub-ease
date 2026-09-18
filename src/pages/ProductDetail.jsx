import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Reveal from '../components/Reveal.jsx'
import BackorderModal from '../components/BackorderModal.jsx'
import { getProductBySlug, products } from '../data/products.js'
import { getComponentSkusByFamily } from '../data/inventory.js'
import { useCart } from '../lib/CartContext.jsx'
import { useInventory } from '../lib/InventoryContext.jsx'
import { CHECKOUT_ENABLED } from '../config/features.js'

function currency(n) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })
}

export default function ProductDetail() {
  const { slug } = useParams()
  const product = getProductBySlug(slug)
  const [activeImage, setActiveImage] = useState(0)
  const { addItem } = useCart()
  const { getAvailable, reserve, getPrice } = useInventory()

  const skuOptions = product?.componentFamily ? getComponentSkusByFamily(product.componentFamily) : []
  const [selectedSku, setSelectedSku] = useState(skuOptions[0])
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [backorderOpen, setBackorderOpen] = useState(false)

  if (!product) return <Navigate to="/products" replace />

  const isKit = product.slug === 'stub-ease-ii-system'
  const isComponent = Boolean(product.componentFamily)
  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3)

  const available = isComponent && selectedSku ? getAvailable(selectedSku.sku) : 0

  const commitAddComponent = () => {
    addItem({
      slug: product.slug,
      sku: selectedSku.sku,
      name: `${product.name.replace(/\s*\(.*\)$/, '')} (${selectedSku.tradeSize}")`,
      tradeSize: selectedSku.tradeSize,
      qty,
      // getPrice reads the live Stripe price for this SKU if Jeff has set
      // one, else falls back to the same static math this used to do
      // directly (selectedSku.msrpPerUnit).
      unitPrice: getPrice(selectedSku.sku),
    })
    reserve(selectedSku.sku, qty)
    setAdded(true)
    setQty(1)
    setTimeout(() => setAdded(false), 1800)
  }

  const handleAddComponent = () => {
    if (!selectedSku || qty < 1) return
    if (qty > available) {
      setBackorderOpen(true)
      return
    }
    commitAddComponent()
  }

  return (
    <div className="pt-32 md:pt-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Link to="/products" data-cursor-hover className="mono-label text-xs text-steel-soft hover:text-signal">
          ← All Products
        </Link>

        <div className="mt-8 grid gap-12 lg:grid-cols-2">
          {/* Gallery */}
          <Reveal direction="right">
            <div className="hud-frame aspect-square overflow-hidden border border-steel-line bg-steel-panel">
              <motion.img
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={product.gallery[activeImage]}
                alt={product.name}
                className="h-full w-full object-contain p-6"
              />
            </div>
            {product.gallery.length > 1 && (
              <div className="mt-4 flex gap-3">
                {product.gallery.map((img, i) => (
                  <button
                    key={img}
                    data-cursor-hover
                    onClick={() => setActiveImage(i)}
                    className={`h-20 w-20 overflow-hidden border ${
                      activeImage === i ? 'border-signal' : 'border-steel-line opacity-60'
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </Reveal>

          {/* Info */}
          <Reveal direction="left" delay={0.1}>
            <span className="mono-label border border-signal px-2.5 py-1 text-[10px] text-signal">
              {product.statusLabel}
            </span>
            <h1 className="mt-4 font-display text-3xl font-semibold text-steel-bright md:text-4xl">
              {product.name}
            </h1>
            <p className="mt-2 text-steel-soft">{product.tagline}</p>
            <p className="mt-6 text-steel-bright/90">{product.description}</p>

            <div className="mt-8 border border-steel-line">
              {product.specs.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex justify-between gap-4 px-5 py-4 text-sm ${
                    i % 2 === 0 ? 'bg-steel-panel/50' : ''
                  }`}
                >
                  <span className="mono-label text-steel-soft">{s.label}</span>
                  <span className="text-right text-steel-bright">{s.value}</span>
                </div>
              ))}
            </div>

            {isComponent && selectedSku && (
              <div className="mt-6 hud-frame border border-steel-line bg-steel-panel/40 p-6">
                <div className="mono-label mb-3 text-[10px] text-steel-soft">Select Trade Size</div>
                <div className="flex gap-2">
                  {skuOptions.map((opt) => (
                    <button
                      key={opt.sku}
                      data-cursor-hover
                      onClick={() => {
                        setSelectedSku(opt)
                        setQty(1)
                      }}
                      className={`flex-1 border px-4 py-2.5 font-mono text-sm transition-colors ${
                        selectedSku.sku === opt.sku
                          ? 'border-signal bg-signal/10 text-signal'
                          : 'border-steel-line text-steel-soft hover:border-steel-soft'
                      }`}
                    >
                      {opt.tradeSize}"
                    </button>
                  ))}
                </div>
                <div className="mono-label mt-3 text-[10px] text-steel-soft">SKU: {selectedSku.sku}</div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <div className="mono-label text-[10px] text-steel-soft">
                      {currency(getPrice(selectedSku.sku))}/unit{qty > 1 && ` × ${qty}`}
                    </div>
                    <div className="font-display text-2xl font-semibold text-steel-bright">
                      {currency(getPrice(selectedSku.sku) * qty)}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-4">
              {isComponent ? (
                <>
                  <div className="flex items-center border border-steel-line">
                    <button
                      data-cursor-hover
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="px-4 py-3 text-steel-soft hover:text-signal"
                    >
                      −
                    </button>
                    <span className="w-10 text-center font-mono text-steel-bright">{qty}</span>
                    <button
                      data-cursor-hover
                      onClick={() => setQty((q) => q + 1)}
                      className="px-4 py-3 text-steel-soft hover:text-signal"
                    >
                      +
                    </button>
                  </div>
                  <button
                    data-cursor-hover
                    onClick={handleAddComponent}
                    className="mono-label bg-signal px-7 py-4 text-xs text-void transition-transform hover:scale-[1.02]"
                  >
                    {added ? 'Added ✓' : 'Add to Cart'}
                  </button>
                </>
              ) : isKit ? (
                <Link
                  to={CHECKOUT_ENABLED ? '/products#store' : '/products'}
                  data-cursor-hover
                  className="mono-label bg-signal px-7 py-4 text-xs text-void transition-transform hover:scale-[1.02]"
                >
                  {CHECKOUT_ENABLED ? 'Configure & Buy →' : 'View Configurations →'}
                </Link>
              ) : (
                <a
                  href={product.ctaLink}
                  data-cursor-hover
                  className="mono-label border border-signal px-7 py-4 text-xs text-signal hover:bg-signal hover:text-void"
                >
                  {product.cta}
                </a>
              )}
              <a
                href="/contact"
                data-cursor-hover
                className="mono-label border border-steel-line px-7 py-4 text-xs text-steel-soft hover:border-signal hover:text-signal"
              >
                Request a Quote
              </a>
            </div>
          </Reveal>
        </div>

        <BackorderModal
          open={backorderOpen}
          onCancel={() => setBackorderOpen(false)}
          onConfirm={() => {
            setBackorderOpen(false)
            commitAddComponent()
          }}
        />

        {/* Related */}
        <div className="mt-24 border-t border-steel-line pt-16 pb-24">
          <div className="mono-label text-xs text-signal">Complete the System</div>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                to={`/products/${p.slug}`}
                data-cursor-hover
                className="group hud-frame block border border-steel-line bg-steel-panel/40"
              >
                <div className="aspect-[4/3] overflow-hidden bg-steel-panel">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <h4 className="font-display text-base font-semibold text-steel-bright">{p.name}</h4>
                  <p className="mt-1 text-xs text-steel-soft">{p.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

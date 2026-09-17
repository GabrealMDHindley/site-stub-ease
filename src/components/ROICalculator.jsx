import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from './Reveal.jsx'
import { submitLead } from '../lib/integrations.js'
import { roiRepresentativeMsrp } from '../data/inventory.js'

// Real MSRP per unit from CSUE Technologies' current price list (25-pack
// tier, averaged across the 8"/12" height options) — see src/data/inventory.js.
const UNIT_PRICE = roiRepresentativeMsrp

function currency(n) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

export default function ROICalculator() {
  const [floors, setFloors] = useState(20)
  const [stubUpsPerFloor, setStubUpsPerFloor] = useState(100)
  const [tradeSize, setTradeSize] = useState('3/4')
  const [damageRate, setDamageRate] = useState(35)
  const [laborCost, setLaborCost] = useState(185)

  const [showLeadForm, setShowLeadForm] = useState(false)
  const [unlocked, setUnlocked] = useState(false)
  const [lead, setLead] = useState({ name: '', company: '', email: '', phone: '' })
  const [submitting, setSubmitting] = useState(false)

  const results = useMemo(() => {
    const totalStubUps = Math.max(0, Math.round(floors * stubUpsPerFloor))
    const damaged = Math.round(totalStubUps * (damageRate / 100))
    const repairExposure = damaged * laborCost
    const systemCost = Math.round(totalStubUps * UNIT_PRICE[tradeSize])
    const netSavings = repairExposure - systemCost
    const roiMultiple = systemCost > 0 ? repairExposure / systemCost : 0
    return { totalStubUps, damaged, repairExposure, systemCost, netSavings, roiMultiple }
  }, [floors, stubUpsPerFloor, tradeSize, damageRate, laborCost])

  const handleLeadSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    await submitLead({ ...lead, ...results, tradeSize, floors, stubUpsPerFloor, damageRate, laborCost })
    setSubmitting(false)
    setUnlocked(true)
  }

  return (
    <section id="roi-calculator" className="relative border-t border-steel-line bg-steel py-28">
      <div className="bp-grid absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        <Reveal>
          <div className="mono-label text-xs text-signal">ROI Calculator</div>
          <h2 className="mt-3 font-display text-3xl font-semibold text-steel-bright md:text-5xl">
            See What Stub-Ups Are Actually Costing You.
          </h2>
          <p className="mt-4 max-w-2xl text-steel-soft">
            Enter your project specs. See your real exposure — and what Stub-EASE II™ costs to fix it.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          {/* Inputs */}
          <Reveal direction="right" className="hud-frame border border-steel-line bg-steel-panel/70 p-8 lg:col-span-2">
            <div className="mono-label mb-6 text-xs text-steel-soft">Your Project</div>

            <label className="mb-5 block">
              <span className="mono-label mb-2 block text-[11px] text-steel-soft">Number of Floors</span>
              <input
                type="number"
                min="1"
                value={floors}
                onChange={(e) => setFloors(Number(e.target.value) || 0)}
                className="w-full border border-steel-line bg-void px-4 py-3 font-mono text-steel-bright outline-none focus:border-signal"
              />
            </label>

            <label className="mb-5 block">
              <span className="mono-label mb-2 block text-[11px] text-steel-soft">Stub-Ups Per Floor</span>
              <input
                type="number"
                min="1"
                value={stubUpsPerFloor}
                onChange={(e) => setStubUpsPerFloor(Number(e.target.value) || 0)}
                className="w-full border border-steel-line bg-void px-4 py-3 font-mono text-steel-bright outline-none focus:border-signal"
              />
            </label>

            <div className="mb-5">
              <span className="mono-label mb-2 block text-[11px] text-steel-soft">Primary Trade Size</span>
              <div className="flex gap-3">
                {['3/4', '1'].map((size) => (
                  <button
                    key={size}
                    type="button"
                    data-cursor-hover
                    onClick={() => setTradeSize(size)}
                    className={`flex-1 border px-4 py-3 font-mono text-sm transition-colors ${
                      tradeSize === size
                        ? 'border-signal bg-signal/10 text-signal'
                        : 'border-steel-line text-steel-soft hover:border-steel-soft'
                    }`}
                  >
                    {size}"
                  </button>
                ))}
              </div>
            </div>

            <label className="mb-5 block">
              <span className="mono-label mb-2 flex justify-between text-[11px] text-steel-soft">
                <span>Estimated Damage Rate</span>
                <span className="text-signal">{damageRate}%</span>
              </span>
              <input
                type="range"
                min="0"
                max="60"
                value={damageRate}
                onChange={(e) => setDamageRate(Number(e.target.value))}
                className="w-full accent-signal"
              />
            </label>

            <label className="block">
              <span className="mono-label mb-2 block text-[11px] text-steel-soft">
                Labor Cost to Repair Each Stub-Up ($)
              </span>
              <input
                type="number"
                min="0"
                value={laborCost}
                onChange={(e) => setLaborCost(Number(e.target.value) || 0)}
                className="w-full border border-steel-line bg-void px-4 py-3 font-mono text-steel-bright outline-none focus:border-signal"
              />
            </label>
          </Reveal>

          {/* Results */}
          <Reveal direction="left" delay={0.1} className="lg:col-span-3">
            <div className="hud-frame relative h-full border border-signal/40 bg-void p-8 shadow-signal">
              <div className="mono-label mb-6 text-xs text-signal">Your Exposure Report</div>

              <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                <Metric label="Total Stub-Ups" value={results.totalStubUps.toLocaleString()} />
                <Metric label="Projected Damaged" value={results.damaged.toLocaleString()} />
                <Metric label="Repair Exposure" value={currency(results.repairExposure)} />
              </div>

              <div className="my-8 h-px w-full bg-steel-line" />

              <AnimatePresence mode="wait">
                {!unlocked ? (
                  <motion.div key="locked" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="font-display text-2xl text-steel-bright">Your savings report is ready.</div>
                        <p className="mt-1 max-w-sm text-sm text-steel-soft">
                          Enter your contact info and we'll send it straight to your inbox — along with pricing for
                          your project size.
                        </p>
                      </div>
                      <button
                        data-cursor-hover
                        onClick={() => setShowLeadForm(true)}
                        className="mono-label whitespace-nowrap border border-signal px-6 py-3 text-xs text-signal transition-colors hover:bg-signal hover:text-void"
                      >
                        Show My Savings Report
                      </button>
                    </div>

                    <AnimatePresence>
                      {showLeadForm && (
                        <motion.form
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          onSubmit={handleLeadSubmit}
                          className="mt-6 grid gap-4 overflow-hidden md:grid-cols-2"
                        >
                          <input
                            required
                            placeholder="Name *"
                            value={lead.name}
                            onChange={(e) => setLead({ ...lead, name: e.target.value })}
                            className="border border-steel-line bg-steel-panel px-4 py-3 text-sm outline-none focus:border-signal"
                          />
                          <input
                            required
                            placeholder="Company *"
                            value={lead.company}
                            onChange={(e) => setLead({ ...lead, company: e.target.value })}
                            className="border border-steel-line bg-steel-panel px-4 py-3 text-sm outline-none focus:border-signal"
                          />
                          <input
                            required
                            type="email"
                            placeholder="Email *"
                            value={lead.email}
                            onChange={(e) => setLead({ ...lead, email: e.target.value })}
                            className="border border-steel-line bg-steel-panel px-4 py-3 text-sm outline-none focus:border-signal"
                          />
                          <input
                            placeholder="Phone (optional)"
                            value={lead.phone}
                            onChange={(e) => setLead({ ...lead, phone: e.target.value })}
                            className="border border-steel-line bg-steel-panel px-4 py-3 text-sm outline-none focus:border-signal"
                          />
                          <button
                            data-cursor-hover
                            type="submit"
                            disabled={submitting}
                            className="mono-label col-span-full bg-signal py-3 text-xs text-void transition-opacity hover:opacity-90 disabled:opacity-50"
                          >
                            {submitting ? 'Submitting…' : 'Show My Savings Report'}
                          </button>
                          <p className="col-span-full text-xs text-steel-soft">
                            No spam. No sales calls unless you want them. Your data goes to Jeff at CSUE Technologies
                            — nobody else.
                          </p>
                        </motion.form>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <motion.div key="unlocked" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="grid gap-6 md:grid-cols-3">
                      <Metric label="Stub-EASE II™ System Cost" value={currency(results.systemCost)} />
                      <Metric
                        label="Net Project Savings"
                        value={currency(results.netSavings)}
                        positive={results.netSavings >= 0}
                      />
                      <Metric
                        label="Return on Investment"
                        value={`${results.roiMultiple.toFixed(1)}x`}
                        accent
                      />
                    </div>
                    <p className="mt-6 text-xs leading-relaxed text-steel-soft">
                      * Stub-EASE II™ system cost is calculated at current MSRP per unit for a 25-pack order. Repair
                      exposure is based on your inputs: total stub-ups × estimated damage rate × labor cost to repair
                      each damaged stub-up. Actual costs will vary by project conditions, trade size, and contract
                      terms.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Metric({ label, value, accent, positive }) {
  return (
    <div>
      <div
        className={`font-display text-2xl font-semibold md:text-3xl ${
          accent ? 'text-signal text-glow' : positive === false ? 'text-red-400' : 'text-steel-bright'
        }`}
      >
        {value}
      </div>
      <div className="mono-label mt-1 text-[10px] text-steel-soft">{label}</div>
    </div>
  )
}

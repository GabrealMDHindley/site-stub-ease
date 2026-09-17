import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

// Animates a numeric value counting up when scrolled into view.
// `value` is the target number, `prefix`/`suffix` wrap it (e.g. "$", "M+").
export default function StatCounter({ value, prefix = '', suffix = '', label, decimals = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1400
    const start = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(value * eased)
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, value])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="hud-frame border border-steel-line bg-steel-panel/60 p-6"
    >
      <div className="font-display text-3xl md:text-4xl font-semibold text-steel-bright text-glow">
        {prefix}
        {display.toFixed(decimals)}
        {suffix}
      </div>
      <div className="mono-label mt-2 text-xs text-signal">{label}</div>
    </motion.div>
  )
}

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'

// Signature interaction: as the user scrolls through this section, the three
// core components fly in from an exploded 3D arrangement and converge into
// an evenly-spaced, assembled formation — a literal visualization of "every
// component plays a part in the total solution."
//
// All three pieces share the same box size/aspect so the final formation is
// visually even. A horizontal "energy" line and per-piece connector ticks
// animate in as the pieces converge, and a pulsing ring marks full assembly.
export default function ExplodedAssembly() {
  const ref = useRef(null)
  const [assembled, setAssembled] = useState(false)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const progress = useTransform(scrollYProgress, [0.15, 0.75], [0, 1], { clamp: true })

  useMotionValueEvent(progress, 'change', (v) => setAssembled(v > 0.96))

  // Cap — descends from above with a tumble and a slight 3D tilt
  const capY = useTransform(progress, [0, 1], [-160, 0])
  const capRotZ = useTransform(progress, [0, 1], [-32, 0])
  const capRotX = useTransform(progress, [0, 1], [35, 0])
  const capOpacity = useTransform(progress, [0, 0.3], [0, 1])

  // Bend-EASE elbow — arrives from the left
  const elbowX = useTransform(progress, [0, 1], [-200, 0])
  const elbowRotZ = useTransform(progress, [0, 1], [28, 0])
  const elbowRotY = useTransform(progress, [0, 1], [-40, 0])
  const elbowOpacity = useTransform(progress, [0, 0.3], [0, 1])

  // Stand-EASE — arrives from the right
  const standX = useTransform(progress, [0, 1], [200, 0])
  const standRotZ = useTransform(progress, [0, 1], [-28, 0])
  const standRotY = useTransform(progress, [0, 1], [40, 0])
  const standOpacity = useTransform(progress, [0, 0.3], [0, 1])

  const rigRotate = useTransform(progress, [0, 1], [5, 0])
  const labelOpacity = useTransform(progress, [0.7, 0.92], [0, 1])
  const assembledOpacity = useTransform(progress, [0.85, 1], [0, 1])
  const energyWidth = useTransform(progress, [0.55, 1], ['0%', '100%'])
  const scanOpacity = useTransform(progress, [0, 0.2, 0.9, 1], [0, 0.5, 0.5, 0])
  const scanX = useTransform(progress, [0, 1], ['0%', '100%'])

  return (
    <div ref={ref} className="relative h-[240vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden bg-void perspective-container">
        <div className="bp-grid pointer-events-none absolute inset-0 opacity-25" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-void via-transparent to-void" />

        <div className="mono-label relative mb-14 text-xs text-signal">Every Component Plays a Part</div>

        {/* RIG: equal-width columns so the assembled formation is always evenly spaced */}
        <motion.div
          style={{ rotate: rigRotate, transformStyle: 'preserve-3d' }}
          className="relative flex w-full max-w-3xl items-center justify-between px-8 sm:px-12"
        >
          {/* corner reticle frame around the whole stage */}
          <div className="pointer-events-none absolute -inset-6 hidden sm:block">
            <span className="absolute left-0 top-0 h-5 w-5 border-l border-t border-signal/40" />
            <span className="absolute right-0 top-0 h-5 w-5 border-r border-t border-signal/40" />
            <span className="absolute bottom-0 left-0 h-5 w-5 border-b border-l border-signal/40" />
            <span className="absolute bottom-0 right-0 h-5 w-5 border-b border-r border-signal/40" />
          </div>

          {/* vertical scanning HUD line sweeping across the rig */}
          <motion.div
            style={{ opacity: scanOpacity, left: scanX }}
            className="pointer-events-none absolute top-0 h-full w-px bg-gradient-to-b from-transparent via-signal to-transparent"
          />

          {/* horizontal energy line drawing in beneath the pieces as they converge */}
          <div className="pointer-events-none absolute left-8 right-8 top-1/2 h-px -translate-y-1/2 bg-steel-line sm:left-12 sm:right-12" />
          <motion.div
            style={{ width: energyWidth }}
            className="pointer-events-none absolute left-8 top-1/2 h-px -translate-y-1/2 bg-signal shadow-signal sm:left-12"
          />

          <AssemblyPiece
            image="https://stubease.pplx.app/images/products/seii-cap-photo.png"
            alt="Stub-EASE II™ convex cap"
            label="01 — Stub-EASE II™ Cap"
            style={{ y: capY, rotateZ: capRotZ, rotateX: capRotX, opacity: capOpacity }}
            accent
            assembledPulse={assembledOpacity}
          />

          <AssemblyPiece
            image="https://stubease.pplx.app/images/products/bend-ease-flat-main.png"
            alt="Bend-EASE™ PVC sweep elbow"
            label="02 — Bend-EASE™"
            imgFit="object-contain p-4"
            style={{ x: elbowX, rotateZ: elbowRotZ, rotateY: elbowRotY, opacity: elbowOpacity }}
          />

          <AssemblyPiece
            image="https://stubease.pplx.app/images/products/stand-ease-upright-new.png"
            alt="Stand-EASE™ galvanized support stand"
            label="03 — Stand-EASE™"
            style={{ x: standX, rotateZ: standRotZ, rotateY: standRotY, opacity: standOpacity }}
          />
        </motion.div>

        <motion.p style={{ opacity: labelOpacity }} className="relative mt-20 max-w-md text-center text-steel-soft sm:mt-14">
          Cap, collar, and stand — one integrated system, one finished-slab height, zero protrusion.
        </motion.p>

        <motion.div
          style={{ opacity: assembledOpacity }}
          className="mono-label relative mt-4 flex items-center gap-2 text-[10px] text-signal"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
          </span>
          System Assembled
        </motion.div>
      </div>
    </div>
  )
}

function AssemblyPiece({ image, alt, label, imgFit = 'object-cover', style, accent, assembledPulse }) {
  return (
    <motion.div
      style={{ ...style, transformStyle: 'preserve-3d' }}
      className="relative z-10 w-[28%] max-w-[150px] sm:max-w-[180px]"
    >
      <div className="relative">
        {/* uniform orange glow behind every piece */}
        <div
          className="absolute -inset-5 rounded-full blur-2xl"
          style={{
            background:
              'radial-gradient(circle, rgba(255,90,31,0.45) 0%, rgba(255,90,31,0.16) 55%, rgba(255,90,31,0) 75%)',
          }}
        />
        {assembledPulse && (
          <motion.div
            style={{ opacity: assembledPulse }}
            className="absolute -inset-3 rounded-full border border-signal/50"
          />
        )}
        <div
          className={`hud-frame relative aspect-[4/5] overflow-hidden border bg-steel-panel ${
            accent ? 'border-signal/50 shadow-signal' : 'border-steel-line'
          }`}
        >
          <img src={image} alt={alt} className={`h-full w-full ${imgFit}`} />
        </div>
        <div className="mono-label absolute -bottom-9 left-1/2 w-max max-w-[140%] -translate-x-1/2 text-center text-[8px] leading-tight text-signal sm:-bottom-7 sm:max-w-none sm:whitespace-nowrap sm:text-[10px]">
          {label}
        </div>
      </div>
    </motion.div>
  )
}

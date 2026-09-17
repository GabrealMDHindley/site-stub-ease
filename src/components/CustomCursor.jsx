import { useEffect, useRef, useState } from 'react'

// A cursor-following orange glow, matching the brand signal color.
// It scales up over anything interactive (links, buttons, [data-cursor-hover]).
export default function CustomCursor() {
  const dotRef = useRef(null)
  const glowRef = useRef(null)
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const pos = { x: 0, y: 0 }
    const glowPos = { x: 0, y: 0 }
    let raf

    const onMove = (e) => {
      pos.x = e.clientX
      pos.y = e.clientY
      if (!visible) setVisible(true)
      const el = e.target.closest?.(
        'a, button, [role="button"], input, [data-cursor-hover]'
      )
      setHovering(Boolean(el))
    }

    const loop = () => {
      // Dot: snaps immediately for precision
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`
      }
      // Glow: eases behind for a trailing torch effect
      glowPos.x += (pos.x - glowPos.x) * 0.16
      glowPos.y += (pos.y - glowPos.y) * 0.16
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glowPos.x}px, ${glowPos.y}px, 0) translate(-50%, -50%)`
      }
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [visible])

  return (
    <div
      className="cursor-glow pointer-events-none fixed inset-0 z-[999] hidden md:block"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.3s ease' }}
      aria-hidden="true"
    >
      <div
        ref={glowRef}
        className="fixed top-0 left-0 rounded-full"
        style={{
          width: hovering ? 140 : 90,
          height: hovering ? 140 : 90,
          background:
            'radial-gradient(circle, rgba(255,90,31,0.35) 0%, rgba(255,90,31,0.12) 45%, rgba(255,90,31,0) 72%)',
          transition: 'width 0.35s cubic-bezier(.2,.8,.2,1), height 0.35s cubic-bezier(.2,.8,.2,1)',
          filter: 'blur(2px)',
        }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 rounded-full bg-signal"
        style={{
          width: hovering ? 10 : 7,
          height: hovering ? 10 : 7,
          boxShadow: '0 0 12px 2px rgba(255,90,31,0.8)',
          transition: 'width 0.2s ease, height 0.2s ease',
        }}
      />
    </div>
  )
}

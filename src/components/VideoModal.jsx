import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// A clean, brand-styled video lightbox. Pauses/unmounts the video on close
// so it doesn't keep playing in the background, and locks page scroll while open.
export default function VideoModal({ open, onClose, src, title }) {
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[998] flex items-center justify-center bg-void/90 p-4 backdrop-blur-sm sm:p-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="hud-frame relative w-full max-w-4xl border border-signal/30 bg-black shadow-signal"
          >
            <button
              data-cursor-hover
              onClick={onClose}
              aria-label="Close video"
              className="absolute -top-11 right-0 flex h-9 w-9 items-center justify-center border border-steel-line text-steel-bright transition-colors hover:border-signal hover:text-signal sm:-top-12"
            >
              ✕
            </button>
            {title && (
              <div className="mono-label absolute -top-11 left-0 text-[10px] text-signal sm:-top-12">{title}</div>
            )}
            {open && (
              <video
                src={src}
                controls
                autoPlay
                playsInline
                className="block max-h-[80vh] w-full"
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

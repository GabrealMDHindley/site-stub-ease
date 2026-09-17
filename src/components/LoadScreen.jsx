import { useCallback, useRef, useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// Plays once when the site is first loaded (a hard refresh / new tab), not
// on internal route navigation, since this mounts once at the App root.
// Muted + no audio track at all (stripped at encode time) — video only.
//
// This version fixes a real race condition from earlier attempts: the
// native `autoPlay` HTML attribute and a separate JS `.play()` call were
// both requesting playback at once, which some mobile browsers treat as a
// conflicting/interrupted request and abort. There is now exactly ONE
// place that ever calls play() — a callback ref that fires the instant the
// <video> DOM node exists, before React's effect phase, which is as early
// as it is possible to act. The `autoPlay` attribute has been removed
// entirely so there is no second, competing request.
//
// iOS Safari's native "tap to play" glyph is suppressed via CSS
// (video::-webkit-media-controls-start-playback-button in index.css).
//
// If autoplay is genuinely blocked at the OS level (iOS Low Power Mode or
// Low Data Mode disable ALL video autoplay with no override available to
// any website), we detect that playback never started and reveal the site
// automatically — never a tap, never a stuck screen.
export default function LoadScreen({ onDone }) {
  const videoRef = useRef(null)
  const [visible, setVisible] = useState(true)
  const [canSkip, setCanSkip] = useState(false)
  const [progress, setProgress] = useState(0)
  const finishedRef = useRef(false)
  const settledRef = useRef(false)

  const finish = useCallback(() => {
    if (finishedRef.current) return
    finishedRef.current = true
    setVisible(false)
    setTimeout(onDone, 500)
  }, [onDone])

  const handleBlocked = useCallback(() => {
    if (settledRef.current) return
    settledRef.current = true
    finish()
  }, [finish])

  // Callback ref: fires synchronously the moment the <video> element is
  // created, which is the earliest and most reliable point to configure
  // and start playback — earlier and more reliable than useEffect.
  const setVideoNode = useCallback((node) => {
    videoRef.current = node
    if (!node) return

    node.muted = true
    node.defaultMuted = true
    node.playsInline = true
    node.setAttribute('muted', '') // belt-and-suspenders for older WebViews
    node.setAttribute('playsinline', '')

    const attemptPlay = () => {
      const p = node.play()
      if (p !== undefined) {
        p.catch(() => {
          // One retry after a short beat — some mobile browsers reject the
          // very first play() call while still finalizing decode setup,
          // but succeed on an immediate second attempt.
          setTimeout(() => {
            node.play().catch(handleBlocked)
          }, 250)
        })
      }
    }

    attemptPlay()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    // If playback still hasn't genuinely started after this window, treat
    // autoplay as blocked (e.g. Low Power Mode) and reveal the site.
    const blockedTimer = setTimeout(() => {
      const v = videoRef.current
      if (!v || v.paused) handleBlocked()
    }, 2200)

    const skipTimer = setTimeout(() => setCanSkip(true), 1200)
    const fallbackTimer = setTimeout(finish, 7000)

    return () => {
      document.body.style.overflow = ''
      clearTimeout(blockedTimer)
      clearTimeout(skipTimer)
      clearTimeout(fallbackTimer)
    }
  }, [finish, handleBlocked])

  const handlePlaying = () => {
    settledRef.current = true
  }

  const handleTimeUpdate = () => {
    const v = videoRef.current
    if (v && v.duration) setProgress(v.currentTime / v.duration)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-void"
          onClick={() => canSkip && finish()}
        >
          <div className="bp-grid pointer-events-none absolute inset-0 opacity-20" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-void via-transparent to-void" />

          <div className="hud-frame relative w-full max-w-sm border border-signal/30 bg-black sm:max-w-md md:max-w-lg">
            <video
              ref={setVideoNode}
              src="/videos/stub-ease-ii-loader.mp4"
              muted
              playsInline
              preload="auto"
              disablePictureInPicture
              controlsList="nodownload nofullscreen noremoteplayback"
              onPlaying={handlePlaying}
              onTimeUpdate={handleTimeUpdate}
              onEnded={finish}
              onError={handleBlocked}
              className="block h-auto w-full"
            />
          </div>

          {/* progress bar tied to actual video playback */}
          <div className="relative mt-8 h-px w-48 overflow-hidden bg-steel-line sm:w-64">
            <motion.div
              className="h-full bg-signal shadow-signal"
              style={{ width: `${Math.min(progress * 100, 100)}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>

          <div className="mono-label relative mt-4 text-[10px] text-signal">
            STUB-EASE II<span className="text-steel-soft"> — Loading System</span>
          </div>

          <AnimatePresence>
            {canSkip && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={(e) => {
                  e.stopPropagation()
                  finish()
                }}
                className="mono-label absolute bottom-8 right-8 border border-steel-line px-4 py-2 text-[10px] text-steel-soft transition-colors hover:border-signal hover:text-signal"
              >
                Skip →
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

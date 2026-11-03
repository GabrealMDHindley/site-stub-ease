import { useEffect } from 'react'

// GoHighLevel's booking-widget iframe needs this script on the page to
// auto-resize itself to the calendar's actual height (otherwise it renders
// at a fixed height with internal scrollbars). Safe to load once per page —
// this guards against adding it twice if Contact re-mounts client-side.
const FORM_EMBED_SRC = 'https://link.msgsndr.com/js/form_embed.js'

export default function GhlCalendarEmbed({ src, title = 'Schedule a meeting' }) {
  useEffect(() => {
    if (!src) return
    if (document.querySelector(`script[src="${FORM_EMBED_SRC}"]`)) return
    const script = document.createElement('script')
    script.src = FORM_EMBED_SRC
    script.async = true
    document.body.appendChild(script)
  }, [src])

  if (!src) return null

  return (
    <iframe
      src={src}
      title={title}
      style={{ width: '100%', border: 'none', overflow: 'hidden' }}
      scrolling="no"
      className="min-h-[760px]"
    />
  )
}

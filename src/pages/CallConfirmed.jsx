import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'

// Destination for GoHighLevel's calendar "Confirmation → Redirect to a URL"
// setting on the calendar embedded at /contact (src/components/
// BookingEmbed.jsx) — so a completed booking lands here instead of
// GHL's generic in-widget confirmation message. See src/config/features.js
// → GHL_CALENDAR_URL for where that's configured.
export default function CallConfirmed() {
  return (
    <>
      <PageHero
        eyebrow="You're Booked"
        title="Your Call with Jeff Is Confirmed"
        subtitle="Thanks for scheduling time with CSUE Technologies. A confirmation with the exact date and time is on its way to your email — add it to your calendar so it doesn't slip."
      />

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6 md:px-10">
          <Reveal className="hud-frame border border-signal/40 bg-void p-8 text-center shadow-signal md:p-10">
            <div className="mono-label text-xs text-signal">What Happens Next</div>
            <ul className="mx-auto mt-6 max-w-lg space-y-3 text-left text-sm text-steel-soft">
              <li>— You'll get a confirmation email with the date, time, and a calendar invite.</li>
              <li>— A reminder goes out before the call so it doesn't catch you mid-pour.</li>
              <li>— Jeff — Founder & Director of Manufacturing and Product Development — takes the call directly. No sales team, no hand-offs.</li>
              <li>— Phone calls, video meetings, and Chicago-area site visits are all available — whatever you booked.</li>
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="mt-8 hud-frame border border-steel-line bg-steel-panel/40 p-8 text-center">
            <div className="mono-label text-[10px] text-signal">Need to Change Something?</div>
            <p className="mt-3 text-sm text-steel-soft">
              Reschedule or cancel from the link in your confirmation email, or reach out directly:
            </p>
            <a href="mailto:info@stubease.com" data-cursor-hover className="mt-3 block font-mono text-signal hover:underline">
              info@stubease.com
            </a>
            <p className="mono-label mt-2 text-[10px] text-steel-soft">Mon–Fri, 8:00 AM – 5:00 PM CT</p>
          </Reveal>

          <Reveal delay={0.16} className="mt-10 text-center">
            <p className="text-sm text-steel-soft">
              While you wait, see the full system in action or run the numbers on your project.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link to="/how-it-works" data-cursor-hover className="mono-label bg-signal px-7 py-4 text-xs text-void">
                See How It Works
              </Link>
              <Link
                to="/#roi-calculator"
                data-cursor-hover
                className="mono-label border border-steel-line px-7 py-4 text-xs text-steel-bright hover:border-signal hover:text-signal"
              >
                Calculate Your Savings
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'

const EFFECTIVE_DATE = 'November 9, 2026'

function Section({ title, children }) {
  return (
    <Reveal className="border-t border-steel-line py-10 first:border-t-0 first:pt-0">
      <h2 className="font-display text-xl font-semibold text-steel-bright md:text-2xl">{title}</h2>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-steel-soft md:text-base">{children}</div>
    </Reveal>
  )
}

export default function PrivacyPolicy() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle={`Effective ${EFFECTIVE_DATE}. This explains what information stubease.com collects, how it's used, and who it's shared with.`}
      />

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6 md:px-10">
          <Reveal className="hud-frame mb-10 border border-steel-line bg-steel-panel/40 p-6 text-sm text-steel-soft">
            CSUE Technologies, Inc. ("CSUE Technologies," "Stub-EASE®," "we," "us," or "our") operates
            stubease.com (the "Site"). This Privacy Policy describes our practices for the Site only.
            Questions about this policy can be sent to{' '}
            <a href="mailto:info@stubease.com" data-cursor-hover className="text-signal hover:underline">
              info@stubease.com
            </a>
            .
          </Reveal>

          <Section title="1. Information You Provide to Us">
            <p>We collect information you choose to give us directly, through:</p>
            <ul className="space-y-2">
              <li>
                — <strong className="text-steel-bright">Contact form</strong> (/contact — "Send a Message"): first
                name, last name, company, email address, the reason for your inquiry, and any project details you
                include.
              </li>
              <li>
                — <strong className="text-steel-bright">Savings calculator</strong> (ROI calculator on the
                homepage): your name, company, email, optional phone number, and the project figures you enter
                (floors, stub-ups per floor, trade size, estimated damage rate, labor cost) and the figures it
                calculates for you.
              </li>
              <li>
                — <strong className="text-steel-bright">Booking a call</strong> (/contact — "Schedule a Meeting"):
                this embeds a scheduling calendar operated by our service provider, GoHighLevel/LeadConnector.
                Information you enter to book a time (such as your name, email, and phone number) is collected by
                GoHighLevel on our behalf and is also subject to{' '}
                <a
                  href="https://www.gohighlevel.com/privacy-policy"
                  target="_blank"
                  rel="noreferrer"
                  data-cursor-hover
                  className="text-signal hover:underline"
                >
                  GoHighLevel's privacy policy
                </a>
                .
              </li>
              <li>
                — <strong className="text-steel-bright">Chat widget</strong>: the Site uses a live chat widget,
                also operated by GoHighLevel/LeadConnector. Messages you send through it, and any contact
                information you provide in that conversation, are collected by GoHighLevel on our behalf.
              </li>
              <li>
                — <strong className="text-steel-bright">Product reviews</strong> (/reviews): your name, optional
                title/company/location, your review text, a star rating, and your email address (used to verify
                and respond to your submission — your email is never published alongside your review).
              </li>
              <li>
                — <strong className="text-steel-bright">Purchases</strong> (/products): checkout is processed
                entirely by Stripe, Inc. on a Stripe-hosted page. Stripe collects your name, email, phone,
                shipping address, and payment details directly — we never see or store your full payment card
                number. See{' '}
                <a
                  href="https://stripe.com/privacy"
                  target="_blank"
                  rel="noreferrer"
                  data-cursor-hover
                  className="text-signal hover:underline"
                >
                  Stripe's privacy policy
                </a>
                .
              </li>
            </ul>
          </Section>

          <Section title="2. Information Collected Automatically">
            <p>
              The Site counts page views using a cookie-free beacon — no cookies, no browser storage, and no
              persistent visitor identifier. Each page view sends only the page path and (on your first page of a
              visit) the referring site. This is converted into a visitor count that rotates to a new anonymous
              hash every day; your IP address and browser string are never stored. We don't run Google Analytics,
              a Meta/Facebook pixel, or any other third-party ad-tracking script on this Site.
            </p>
          </Section>

          <Section title="3. How We Use Your Information">
            <ul className="space-y-2">
              <li>— To respond to inquiries, quote requests, and submittal-package requests</li>
              <li>— To schedule and manage calls or meetings you book with us</li>
              <li>— To process, fulfill, and provide support for orders</li>
              <li>— To review and, if approved, publish product reviews you submit</li>
              <li>— To improve the Site and our products</li>
              <li>— To comply with legal obligations</li>
            </ul>
          </Section>

          <Section title="4. How We Share Your Information">
            <p>
              We do not sell your personal information. We share information only as described here, with the
              service providers who help us run the Site and fulfill orders:
            </p>
            <ul className="space-y-2">
              <li>
                — <strong className="text-steel-bright">GoHighLevel/LeadConnector</strong> — our CRM and
                communications provider. Contact-form and calculator leads, booking-calendar information, and chat
                conversations are sent to GoHighLevel so we can follow up with you.
              </li>
              <li>
                — <strong className="text-steel-bright">Stripe, Inc.</strong> — our payment processor for all
                purchases.
              </li>
              <li>
                — <strong className="text-steel-bright">Our internal order/customer system</strong> — used to
                track orders, inventory, and customer records for fulfillment and support.
              </li>
            </ul>
            <p>
              We may also disclose information if required by law, or to protect the rights, property, or safety
              of CSUE Technologies, our customers, or others.
            </p>
          </Section>

          <Section title="5. Text Messaging (SMS) Privacy">
            <div className="hud-frame border border-signal/40 bg-void p-6">
              <p className="text-steel-bright">
                No mobile information will be shared with third parties/affiliates for marketing/promotional
                purposes. Information sharing to subcontractors in support services, such as customer service, is
                permitted. All other use case categories exclude text messaging originator opt-in data and
                consent; this information will not be shared with any third parties.
              </p>
            </div>
            <p className="mt-4">
              For how to opt in or out of text messages from us, and what to expect from our text messaging
              program, see our{' '}
              <Link to="/terms-of-service" data-cursor-hover className="text-signal hover:underline">
                Terms of Service
              </Link>
              .
            </p>
          </Section>

          <Section title="6. Data Retention">
            <p>
              We keep contact, order, and customer information for as long as needed to respond to you, fulfill
              and support your order, and meet our legal, accounting, and record-keeping obligations. Reviews
              submitted but not approved for publication are retained for moderation purposes.
            </p>
          </Section>

          <Section title="7. Your Choices and Rights">
            <p>
              You can ask us to access, correct, or delete the personal information we hold about you, or ask us
              to stop contacting you, at any time by emailing{' '}
              <a href="mailto:info@stubease.com" data-cursor-hover className="text-signal hover:underline">
                info@stubease.com
              </a>
              . To stop receiving text messages, see the opt-out instructions in our{' '}
              <Link to="/terms-of-service" data-cursor-hover className="text-signal hover:underline">
                Terms of Service
              </Link>
              . Depending on your state of residence, you may have additional rights under applicable privacy
              law; contact us and we'll address your request.
            </p>
          </Section>

          <Section title="8. Children's Privacy">
            <p>
              The Site is intended for business and professional use and is not directed to children under 13. We
              do not knowingly collect personal information from children.
            </p>
          </Section>

          <Section title="9. Security">
            <p>
              We use reasonable administrative and technical safeguards to protect the information we handle. No
              method of transmission or storage is completely secure, and we cannot guarantee absolute security.
            </p>
          </Section>

          <Section title="10. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. The "Effective" date at the top of this page
              reflects the most recent version. Material changes will be reflected by an updated date on this
              page.
            </p>
          </Section>

          <Section title="11. Contact Us">
            <p>
              CSUE Technologies, Inc.
              <br />
              Chicago, Illinois
              <br />
              <a href="mailto:info@stubease.com" data-cursor-hover className="text-signal hover:underline">
                info@stubease.com
              </a>
            </p>
          </Section>
        </div>
      </section>
    </>
  )
}

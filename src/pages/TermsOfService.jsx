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

export default function TermsOfService() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        subtitle={`Effective ${EFFECTIVE_DATE}. These terms govern your use of stubease.com and our text messaging program.`}
      />

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6 md:px-10">
          <Reveal className="hud-frame mb-10 border border-steel-line bg-steel-panel/40 p-6 text-sm text-steel-soft">
            By using stubease.com (the "Site"), operated by CSUE Technologies, Inc. ("CSUE Technologies,"
            "Stub-EASE®," "we," "us," or "our"), you agree to these Terms of Service. If you don't agree, please
            don't use the Site.
          </Reveal>

          <Section title="1. Use of the Site">
            <p>
              The Site provides information about, and the ability to purchase, the Stub-EASE II™ conduit
              stub-up protection system and related products manufactured by CSUE Technologies. You agree to use
              the Site only for lawful purposes and not to interfere with its operation or security.
            </p>
          </Section>

          <Section title="2. Orders, Pricing, and Payment">
            <p>
              Prices shown on the Site are current at the time of your order and are subject to change.
              Checkout, including payment, is processed by Stripe, Inc. We reserve the right to refuse or cancel
              any order, including for pricing errors, suspected fraud, or stock issues; if we cancel a paid
              order, you'll be refunded. Shipping and return terms, where applicable, will be confirmed with your
              order.
            </p>
          </Section>

          <Section title="3. Intellectual Property">
            <p>
              Stub-EASE®, Stub-EASE II™, Bend-EASE™, Stand-EASE™, Stub-Down™, and Riser-EASE™ are trademarks of
              CSUE Technologies, Inc. The Stub-EASE® system is protected by U.S. Patents 10,320,167 B2,
              10,742,008 B2, and 11,221,090 B2, with an additional patent pending. Site content — text, graphics,
              photos, and video — is owned by CSUE Technologies or its licensors and may not be copied or reused
              without permission.
            </p>
          </Section>

          <Section title="4. SMS / Text Messaging Program Terms">
            <p>
              CSUE Technologies, Inc. — by opting in, you agree to receive text messages related to your
              inquiry, project estimate, or scheduled appointment with us (for example, appointment confirmations
              and reminders, and replies to questions you've sent us).
            </p>
            <ol className="list-decimal space-y-3 pl-5">
              <li>
                You can cancel the SMS service at any time. Just text "STOP" in reply to any message you receive
                from us. After you send the SMS message "STOP" to us, we will send you an SMS message to confirm
                that you have been unsubscribed. After this, you will no longer receive SMS messages from us. If
                you want to join again, just sign up as you did the first time and we will start sending SMS
                messages to you again.
              </li>
              <li>
                If you are experiencing issues with the messaging program, you can reply with the keyword HELP
                for more assistance, or you can get help directly at{' '}
                <a href="mailto:info@stubease.com" data-cursor-hover className="text-signal hover:underline">
                  info@stubease.com
                </a>
                .
              </li>
              <li>Carriers are not liable for delayed or undelivered messages.</li>
              <li>
                As always, message and data rates may apply for any messages sent to you from us and to us from
                you. Message frequency varies based on your interactions with us — for example, appointment
                confirmations and reminders, or replies to an inquiry you've sent. If you have any questions
                about your text plan or data plan, it is best to contact your wireless provider.
              </li>
              <li>
                If you have any questions regarding privacy, please read our{' '}
                <Link to="/privacy-policy" data-cursor-hover className="text-signal hover:underline">
                  Privacy Policy
                </Link>
                .
              </li>
            </ol>
          </Section>

          <Section title="5. Disclaimers">
            <p>
              The Site and its content are provided "as is." While we work to keep product, pricing, and
              technical information accurate, we don't warrant that the Site will be uninterrupted or error-free.
              Nothing on the Site is a substitute for a licensed engineer's or code official's review of your
              specific project.
            </p>
          </Section>

          <Section title="6. Limitation of Liability">
            <p>
              To the fullest extent permitted by law, CSUE Technologies is not liable for any indirect,
              incidental, or consequential damages arising from your use of the Site. This section concerns use
              of the website itself — it does not limit any warranty or liability terms that apply to a product
              you purchase from us, which are governed separately by the terms provided with your order.
            </p>
          </Section>

          <Section title="7. Governing Law">
            <p>
              These Terms are governed by the laws of the State of Illinois, without regard to its
              conflict-of-laws principles.
            </p>
          </Section>

          <Section title="8. Changes to These Terms">
            <p>
              We may update these Terms from time to time. The "Effective" date at the top of this page reflects
              the most recent version.
            </p>
          </Section>

          <Section title="9. Contact Us">
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

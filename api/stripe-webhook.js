// Vercel Serverless Function — POST /api/stripe-webhook
//
// Stripe calls this when a checkout session completes. It decrements shared
// stock (via api/_lib/kv.js) for exactly the SKUs/quantities that were paid
// for — the only place stock actually goes down; adding to the cart on the
// site never touches this.
//
// Setup:
//   1. Stripe Dashboard → Developers → Webhooks → Add destination (older
//      accounts: Add endpoint)
//      URL: https://www.stubease.com/api/stripe-webhook
//      Events: checkout.session.completed
//              checkout.session.async_payment_succeeded
//   2. Copy the endpoint's "Signing secret" (whsec_...) into Vercel as
//      STRIPE_WEBHOOK_SECRET.
//   To test before going live: `stripe listen --forward-to <url>/api/stripe-webhook`
//   forwards test-mode events straight from your Stripe account, including to
//   a preview deployment URL — no dashboard registration needed for that.
//
// Stripe needs the RAW request body to verify the signature, so the default
// JSON body parser is disabled below (config.api.bodyParser).

import Stripe from 'stripe'
import getRawBody from 'raw-body'
import { getKv } from './_lib/kv.js'
import { initialStockMap } from '../src/data/inventory.js'

// checkout.session.completed fires the moment checkout finishes. For instant
// methods (cards) the session is already paid; for delayed methods (bank
// debits) it arrives with payment_status 'unpaid' and async_payment_succeeded
// follows once the money clears. Stock only moves on a paid session.
const PAID_EVENTS = new Set(['checkout.session.completed', 'checkout.session.async_payment_succeeded'])

export const config = {
  api: { bodyParser: false },
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '')

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).end('Method not allowed')
  }

  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret) {
    console.error('stripe-webhook: STRIPE_WEBHOOK_SECRET is not set — refusing to process unverifiable events.')
    return res.status(500).send('Webhook not configured')
  }

  let event
  try {
    const rawBody = await getRawBody(req)
    event = stripe.webhooks.constructEvent(rawBody, req.headers['stripe-signature'], secret)
  } catch (err) {
    console.error('stripe-webhook: signature verification failed:', err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  if (PAID_EVENTS.has(event.type)) {
    const session = event.data.object

    if (session.payment_status !== 'paid') {
      return res.status(200).json({ received: true, stockUpdated: false, paymentStatus: session.payment_status })
    }

    const kv = getKv()
    if (!kv) {
      console.warn(
        `stripe-webhook: payment received (session ${session.id}) but no database is connected — stock was NOT decremented. See CLAUDE.md → Inventory.`
      )
      return res.status(200).json({ received: true, stockUpdated: false })
    }

    // Stripe retries a webhook it didn't get a 2xx for, and a delayed-payment
    // session produces two paid-looking events. Keying on the session (not the
    // event) makes every delivery after the first a no-op instead of a
    // double-decrement.
    const firstDelivery = await kv.set(`stripe-order:${session.id}`, '1', { nx: true, ex: 60 * 60 * 24 * 7 })
    if (firstDelivery === null) {
      return res.status(200).json({ received: true, duplicate: true })
    }

    let order = []
    try {
      order = JSON.parse(session.metadata?.order || '[]')
    } catch {
      console.error('stripe-webhook: could not parse metadata.order for session', session.id)
    }

    const baseline = initialStockMap()
    for (const { sku, qty } of order) {
      if (!sku || !qty) continue
      const key = `stock:${sku}`
      // A SKU's counter doesn't exist in the database until something touches
      // it, and DECRBY on a missing key counts down from 0. Seed it with the
      // opening balance first — NX makes this a no-op once the key exists.
      if (baseline[sku] !== undefined) await kv.set(key, baseline[sku], { nx: true })
      await kv.decrby(key, qty)
    }
  }

  return res.status(200).json({ received: true })
}

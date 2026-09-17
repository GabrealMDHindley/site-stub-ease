// Vercel Serverless Function — POST /api/checkout
//
// Creates a Stripe Checkout session server-side (Stripe secret keys must
// never be exposed in frontend code) and returns the redirect URL.
//
// Setup:
//   1. npm install stripe
//   2. In Vercel → Project → Settings → Environment Variables, add:
//        STRIPE_SECRET_KEY = sk_live_... (or sk_test_... while testing)
//   3. Create Products + Prices in the Stripe Dashboard for each SKU
//      (Stub-EASE II™ kit, packs of 10/25, etc.) and map their Price IDs
//      in PRICE_MAP below.

import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '')

// Map each product slug to its Stripe Price ID once created in the Dashboard.
const PRICE_MAP = {
  'stub-ease-ii-system': process.env.STRIPE_PRICE_STUB_EASE_II || '',
  'bend-ease': process.env.STRIPE_PRICE_BEND_EASE || '',
  'stand-ease': process.env.STRIPE_PRICE_STAND_EASE || '',
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: 'Stripe is not configured yet (missing STRIPE_SECRET_KEY).' })
  }

  const { items = [] } = req.body || {}

  const line_items = items
    .map((item) => {
      const price = PRICE_MAP[item.slug]
      if (!price) return null
      return { price, quantity: item.quantity || 1 }
    })
    .filter(Boolean)

  if (line_items.length === 0) {
    return res.status(400).json({ error: 'No valid, priced items in cart yet — map Stripe Price IDs in PRICE_MAP.' })
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      success_url: `${req.headers.origin}/products?checkout=success`,
      cancel_url: `${req.headers.origin}/products?checkout=cancelled`,
    })
    return res.status(200).json({ url: session.url })
  } catch (err) {
    console.error('Stripe checkout error:', err)
    return res.status(500).json({ error: 'Could not create checkout session.' })
  }
}

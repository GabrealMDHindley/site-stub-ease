// Shared Stripe client for every api/*.js file that needs one.
import Stripe from 'stripe'

let client = null

export function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) return null
  if (!client) client = new Stripe(process.env.STRIPE_SECRET_KEY)
  return client
}

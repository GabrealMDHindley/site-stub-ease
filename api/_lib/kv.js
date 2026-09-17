// Shared Redis (Upstash) client for api/inventory.js and api/stripe-webhook.js.
//
// Accepts either env var naming Vercel's storage integrations use — whichever
// one shows up in Project Settings → Environment Variables after connecting a
// database (Storage tab → Marketplace → Upstash, or `vercel install upstash`)
// works with no renaming needed.
import { Redis } from '@upstash/redis'

let client = null

export function getKv() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return null
  if (!client) client = new Redis({ url, token })
  return client
}

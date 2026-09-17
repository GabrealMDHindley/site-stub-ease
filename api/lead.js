// Vercel Serverless Function — POST /api/lead
//
// Receives ROI-calculator and contact-form submissions from the frontend,
// then forwards them to GoHighLevel and/or your custom AI Studio CRM.
// Runs server-side so API keys never touch the browser.
//
// Required environment variables (set in Vercel → Project → Settings → Environment Variables):
//   GHL_WEBHOOK_URL     — GoHighLevel "Inbound Webhook" trigger URL for this pipeline
//   CUSTOM_CRM_URL       — your AI-Studio-built CRM's lead-intake endpoint
//   CUSTOM_CRM_API_KEY   — auth token/header value your custom CRM expects (if any)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const lead = req.body

  if (!lead || !lead.email) {
    return res.status(400).json({ error: 'Missing required lead fields' })
  }

  const forwards = []

  // 1. GoHighLevel — send via an Inbound Webhook trigger URL.
  //    In GHL: Automation → Workflows → New Workflow → Trigger: "Inbound Webhook"
  //    copy that URL into GHL_WEBHOOK_URL below.
  if (process.env.GHL_WEBHOOK_URL) {
    forwards.push(
      fetch(process.env.GHL_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      })
    )
  }

  // 2. Custom CRM (built in AI Studio) — POST to its lead-intake endpoint.
  if (process.env.CUSTOM_CRM_URL) {
    forwards.push(
      fetch(process.env.CUSTOM_CRM_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(process.env.CUSTOM_CRM_API_KEY && {
            Authorization: `Bearer ${process.env.CUSTOM_CRM_API_KEY}`,
          }),
        },
        body: JSON.stringify(lead),
      })
    )
  }

  try {
    await Promise.all(forwards)
  } catch (err) {
    console.error('Lead forwarding error:', err)
    // Still return success to the user — don't block the UI on downstream CRM issues.
  }

  return res.status(200).json({ ok: true })
}

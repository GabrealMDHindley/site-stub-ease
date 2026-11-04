// Static copy for /reviews (src/pages/Reviews.jsx). The reviews themselves are
// NOT stored here: they load at runtime from /api/reviews, which only returns
// reviews a real customer submitted and Jeff or a Stub-EASE admin approved in
// the CRM. Never add a review to this file.

export const reviewsPage = {
  hero: {
    eyebrow: 'Reviews',
    title: 'What Contractors Say',
    subtitle:
      'Reviews written by contractors and customers who have used Stub-EASE II™. Every review is read by our team before it appears here.',
  },
  list: {
    eyebrow: 'Published Reviews',
    title: 'From the Field',
    loading: 'Loading reviews…',
    error: "Reviews couldn't be loaded right now. Please refresh the page or try again later.",
    empty: 'No published reviews yet — be the first.',
  },
  form: {
    eyebrow: 'Write a Review',
    title: 'Used Stub-EASE II™? Tell other contractors how it went.',
    lead: 'Your review goes to our team first and is published once it’s approved. Your email is never shown on the site.',
    fields: {
      rating: 'Your Rating *',
      name: 'Name *',
      title: 'Title / Role',
      company: 'Company',
      location: 'Location (City, State)',
      body: 'Your Review *',
      email: 'Email (private) *',
    },
    bodyHint: '20–2,000 characters.',
    consent:
      'I agree CSUE Technologies may publish my review, name, title and company on stubease.com. My email stays private.',
    submit: 'Submit Review',
    submitting: 'Submitting…',
    successTitle: 'Review Received',
    success: 'Thanks — your review will appear here once it’s approved.',
    errors: {
      rating: 'Pick a rating from 1 to 5.',
      body: 'Your review needs at least 20 characters.',
      consent: 'Please tick the consent box so we can publish your review.',
    },
    genericError: 'Your review could not be submitted. Please try again, or email info@stubease.com.',
  },
  testimonialsCta: {
    eyebrow: 'Reviews',
    title: 'Used Stub-EASE II? Leave a review',
    body: 'Read what other contractors say about the system, or share your own experience from the slab.',
    button: 'Read & Write Reviews',
  },
}

export const ratingLabels = { 1: 'Poor', 2: 'Fair', 3: 'Good', 4: 'Very Good', 5: 'Excellent' }

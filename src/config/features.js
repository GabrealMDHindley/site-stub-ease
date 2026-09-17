// -----------------------------------------------------------------------
// TEMPORARY FEATURE FLAGS
// -----------------------------------------------------------------------
// Checkout and pricing are live site-wide. To turn either one off again,
// just flip the matching flag below to `false` and redeploy — nothing else
// needs to change anywhere else in the codebase.
//
// CHECKOUT_ENABLED = false hides:
//   - "Add to Cart" on the kit configurator (src/pages/Products.jsx)
//   - "Configure & Buy" on the kit's product page (src/pages/ProductDetail.jsx)
//   - The cart icon in the navbar, on both desktop and mobile (src/components/Navbar.jsx)
//
// SHOW_PRICING = false hides:
//   - The per-box / per-unit price line and total on the kit configurator
//   - Everything else (product images, descriptions, specs, trade size,
//     height, pack size, and the quantity selector) stays fully visible
//     and interactive either way — only price and purchasing are affected.
// -----------------------------------------------------------------------

export const CHECKOUT_ENABLED = true
export const SHOW_PRICING = true

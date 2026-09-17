// All copy, specs, SKUs, pricing, and figures below are sourced directly
// from stubease.com (homepage, how-it-works, products, safety, about,
// contact) plus the CSUE Technologies Inventory Valuation Report (PO
// EG2605016, Aug 2026) for real SKU pricing and stock. Nothing invented.

export const submittals = [
  {
    title: 'Stub-EASE II™ Submittal — Rev B',
    description:
      'Architect/engineer-ready submittal with product photos, dimensions, and NEC 300.15(F) (2023 NEC) / 300.17(F) (2026 NEC) compliance language.',
    url: 'https://stubease.pplx.app/documents/CSUE_StubEASE_Submittal_RevB.pdf',
  },
  {
    title: 'Stub-EASE II™ Installation Guide',
    description: 'Installation sequence, pour procedure, power-trowel compatibility, and extraction instructions.',
    url: 'https://stubease.pplx.app/documents/CSUE_StubEASE_Install_Guide.pdf',
  },
  {
    title: 'Stand-EASE™ Submittal — Rev B',
    description:
      'Submittal package for the conduit support stake. Includes product photos, dimensions, materials, and height specifications (SE8 and SE12).',
    url: 'https://stubease.pplx.app/documents/CSUE_StandEASE_Submittal_RevB.pdf',
  },
  {
    title: 'Bend-EASE™ Submittal — Rev B',
    description:
      'Submittal package for the transition elbow. Includes product photos, NEC 300.15(F) / 300.17(F) compliance language, and material notes.',
    url: 'https://stubease.pplx.app/documents/CSUE_BendEASE_Submittal_RevB.pdf',
  },
  {
    title: 'Bend-EASE™ Raceway Compatibility',
    description:
      'Single-page field handout covering metallic (EMT/RMC) and PVC raceway compatibility under NEC 300.15(F) / 300.17(F). Printable for submittals.',
    url: 'https://stubease.pplx.app/documents/CSUE_BendEASE_Raceway_Compatibility.pdf',
  },
  {
    title: 'Safety Positioning Sheet',
    description: 'Safety case for Stub-EASE II™ on active working walking surfaces. Formatted for safety managers and GCs.',
    url: 'https://stubease.pplx.app/documents/StubEASE_Safety_Positioning_Sheet.pdf',
  },
]

export const products = [
  {
    slug: 'stub-ease-ii-system',
    status: 'core',
    statusLabel: 'Core System',
    name: 'Stub-EASE II™',
    tagline: 'The complete conduit protection system.',
    image: 'https://stubease.pplx.app/images/products/system-assembled-kit-photo.png',
    gallery: [
      'https://stubease.pplx.app/images/products/system-assembled-kit-photo.png',
      'https://stubease.pplx.app/images/products/system-assembled-complete.jpg',
      'https://stubease.pplx.app/images/products/cap-collar-section-cut.jpg',
    ],
    description:
      'The complete conduit protection system — Stand-EASE™ galvanized support, Bend-EASE™ elbow, and Stub-EASE II™ cap, assembled and ready for install. Every kit ships from the manufacturer with the cap already threaded onto the elbow. Every trade size, every height. NEC 300.15(F) / 300.17(F) compliant.',
    specs: [
      { label: 'Trade sizes', value: '3/4" and 1"' },
      { label: 'Heights', value: '8" and 12" above slab' },
      { label: 'Pack sizes', value: 'Packs of 10 or 25' },
      { label: 'Code compliance', value: 'NEC 300.15(F) / 300.17(F) — metallic & PVC raceways' },
    ],
    pricingNote:
      'Kit price is calculated live from current MSRP based on the trade size, height, and pack size you select — sold by the box (10 or 25 kits per box). Distributor and purchase-order pricing is available for project quantities; contact Jeff Krause directly for volume pricing.',
    filters: { tradeSize: ['3/4', '1'], height: ['8', '12'], pack: ['10', '25'] },
    cta: 'Add to Cart',
    ctaLink: '/products',
    purchasable: true,
  },
  {
    slug: 'seii-cap',
    status: 'component',
    statusLabel: 'Included in Kit Only',
    name: 'Stub-EASE II™ Cap',
    tagline: 'A convex cap with a depressed guide strip and four spring-back talons.',
    image: 'https://stubease.pplx.app/images/products/seii-cap-photo.png',
    gallery: [
      'https://stubease.pplx.app/images/products/seii-cap-photo.png',
      'https://stubease.pplx.app/images/products/cap-cad-section-copper.jpg',
      'https://stubease.pplx.app/images/products/cap-cad-section-silver.jpg',
    ],
    description:
      'A convex cap with a depressed guide strip to position the extraction spade bit and four talons that project off the top surface. Flexes flat under a power-trowel blade, self-rights in two seconds. Ships pre-assembled in every Stub-EASE II™ kit — not currently sold as a standalone item.',
    specs: [
      { label: 'SKUs', value: 'CAP-34 (3/4") · CAP-1 (1")' },
      { label: 'Material', value: 'Aixing TPR, Shore A 45 — flexible, non-sparking, non-conductive' },
      { label: 'Color', value: 'Pantone 021C orange — for high visibility on the job site' },
      { label: 'Features', value: 'Four spring-back talons · depressed guide strip aligns spade bit for extraction' },
      { label: 'Threading', value: 'Threads into Bend-EASE™ elbow receiver' },
    ],
    cta: 'Contact for Pricing',
    ctaLink: 'mailto:info@stubease.com?subject=Stub-EASE%20II%E2%84%A2%20Cap%20Inquiry',
    purchasable: false,
  },
  {
    slug: 'bend-ease',
    status: 'component',
    statusLabel: 'Included in Kit Only',
    name: 'Bend-EASE™ Elbow',
    tagline: 'Transitions horizontal conduit run to vertical stub-up.',
    image: 'https://stubease.pplx.app/images/products/bend-ease-flat-main.png',
    gallery: ['https://stubease.pplx.app/images/products/bend-ease-flat-main.png'],
    description:
      'Westlake PVC UV-6676 rigid sweep-radius elbow. Transitions horizontal conduit run to vertical stub-up. Click-lock collar accepts Stand-EASE™ support stand. Designed and tested to meet UL specifications under UL 651 and UL 514B (CSUE File E503889) for concrete-tight applications. Ships pre-assembled in every Stub-EASE II™ kit — not currently stocked as a standalone loose-stock item.',
    specs: [
      { label: 'SKUs', value: 'BEPVC-34 (3/4") · BEPVC-100 (1")' },
      { label: 'Material', value: 'Westlake PVC UV-6676, rigid, UV-stabilized for exterior exposure before the pour' },
      { label: 'Testing', value: 'Designed & tested to meet UL specifications — UL 651 / UL 514B (CSUE File E503889)' },
      { label: 'Code compliance', value: 'Compatible with metallic & PVC per NEC 300.15(F) / 300.17(F) — zero added grounding burden' },
    ],
    cta: 'Contact for Pricing',
    ctaLink: 'mailto:info@stubease.com?subject=Bend-EASE%E2%84%A2%20Elbow%20Inquiry',
    purchasable: false,
  },
  {
    slug: 'stand-ease',
    status: 'component',
    statusLabel: 'Included in Kit Only',
    name: 'Stand-EASE™ Support',
    tagline: 'Holds the cap at exact finished-slab height through the pour cycle.',
    image: 'https://stubease.pplx.app/images/products/stand-ease-upright-new.png',
    gallery: [
      'https://stubease.pplx.app/images/products/stand-ease-upright-new.png',
      'https://stubease.pplx.app/images/products/stand-ease-base-new.png',
      'https://stubease.pplx.app/images/products/stand-ease-foot-new.png',
      'https://stubease.pplx.app/images/products/stand-ease-channel.png',
    ],
    description:
      'DC51D+Z80 hot-dip galvanized steel, 0.062" thick. Snaps onto Bend-EASE™ elbow, fastens to deck, and holds the Stub-EASE II™ cap at exact finished-slab height — adjustable to match any slab thickness. Ships pre-assembled in every Stub-EASE II™ kit — not currently sold as a standalone item.',
    specs: [
      { label: 'SKUs', value: 'SES-34 (3/4") · SES-1 (1")' },
      { label: 'Heights', value: 'SE8 (8" / 203mm) · SE12 (12" / 305mm)' },
      { label: 'Material', value: 'DC51D+Z80 hot-dip galvanized steel, 0.062" thick' },
      { label: 'Engagement', value: 'Positive click-lock detents · tie-wire loops · built-in back leg for stability' },
      { label: 'Finish', value: 'Hot-dipped galvanized with orange powder coat, size-stamped feet (3/4" and 1")' },
    ],
    cta: 'Contact for Pricing',
    ctaLink: 'mailto:info@stubease.com?subject=Stand-EASE%E2%84%A2%20Support%20Inquiry',
    purchasable: false,
  },
  {
    slug: 'seg18-riser-ease',
    status: 'coming-soon',
    statusLabel: 'In Development',
    name: 'SEG18 + Riser-EASE™',
    tagline: 'Coming soon — for below-grade and riser applications.',
    image: 'https://stubease.pplx.app/images/products/riser-ease-clean.jpg',
    gallery: [
      'https://stubease.pplx.app/images/products/riser-ease-clean.jpg',
      'https://stubease.pplx.app/images/seg18-stake-clean.png',
    ],
    description:
      'Two components that work in tandem for below-grade and riser applications. The SEG18 is an 18" Z80 galvanized grade stake driven into grade with an impact driver — features an integrated hex attachment point so you hit your exact elevation without guesswork. Riser-EASE™ click-locks onto the SEG18 to accept conduit rising from below the slab, replacing Bend-EASE™ in vertical riser configurations. Patent Pending 19/022,537.',
    specs: [
      { label: 'SEG18 height', value: '18" — impact driver hex drive for precision elevation setting' },
      { label: 'SEG18 material', value: 'Same Z80 galvanized steel as SE8 and SE12' },
      { label: 'Riser-EASE™ engagement', value: 'Dual click-lock to Stand-EASE™ (two engagement points)' },
      { label: 'Riser-EASE™ connection', value: 'PVC glue socket bell-end accepts Schedule 40/80 riser' },
      { label: 'Trade sizes', value: '3/4" and 1"' },
    ],
    cta: 'Get Notified',
    ctaLink: '/contact',
    purchasable: false,
  },
  {
    slug: 'stub-down',
    status: 'coming-soon',
    statusLabel: 'Coming Soon',
    name: 'Stub-Down™',
    tagline: 'A ceiling-mount solution for overhead conduit stub-down.',
    image: 'https://stubease.pplx.app/images/products/stubdown-001.jpg',
    gallery: [
      'https://stubease.pplx.app/images/products/stubdown-001.jpg',
      'https://stubease.pplx.app/images/products/stubdown-002.jpg',
    ],
    description:
      'A ceiling-mount solution for overhead conduit stub-down locations. Protects conduit endpoints dropping from above — same proven cap, inverted application.',
    specs: [
      { label: 'Application', value: 'For overhead / ceiling conduit stub-down runs' },
      { label: 'Compatibility', value: 'Compatible with existing Stub-EASE II™ cap SKUs' },
      { label: 'Code compliance', value: 'NEC 300.15(F) / 300.17(F) compliant' },
      { label: 'Trade sizes', value: '3/4" and 1"' },
    ],
    cta: 'Get Notified',
    ctaLink: '/contact',
    purchasable: false,
  },
  {
    slug: 'stub-ease-original',
    status: 'special-order',
    statusLabel: 'Special Order',
    name: 'Stub-EASE™ Original',
    tagline: 'The first-generation Stub-EASE™ — the product that started it all.',
    image: 'https://stubease.pplx.app/images/products/stubease-original-all-sizes.png',
    gallery: ['https://stubease.pplx.app/images/products/stubease-original-all-sizes.png'],
    description:
      'The first-generation Stub-EASE™ — the product that launched CSUE Technologies. Not in current production inventory, but available for special order.',
    specs: [
      { label: 'SKU SE1-050', value: '1/2" trade size' },
      { label: 'SKU SE1-075', value: '3/4" trade size' },
      { label: 'SKU SE1-100', value: '1" trade size' },
      { label: 'SKU SE1-150', value: '1-1/2" trade size' },
    ],
    cta: 'Request Special Order',
    ctaLink: 'mailto:info@stubease.com?subject=Special Order — Stub-EASE™ Original',
    purchasable: false,
  },
]

export const metallicTransitionOptions = [
  {
    label: 'Option 1 — Preferred',
    title: 'Single-Piece Transition Coupling',
    body: 'SP Products PVC-to-EMT Transition Coupling — glues directly onto the end of the Bend-EASE™ elbow. Manufactured to meet or exceed UL 651 specifications — the same standard as the Bend-EASE™ elbow.',
    skus: '3/4" → Cat # 75PVC/EMT · 1" → Cat # 100PVC/EMT',
  },
  {
    label: 'Option 2 — Traditional',
    title: 'Two-Piece Method',
    body: 'Glue a standard Schedule 40 PVC Female Adapter onto the Bend-EASE™ elbow, then thread a standard EMT connector into the female threads. Standard parts, widely available.',
    skus: null,
  },
]

export const getProductBySlug = (slug) => products.find((p) => p.slug === slug)

export const settlements = [
  {
    amount: '$2,000,000',
    note: '+ $330,000 WC lien waiver',
    body: 'Construction worker tripped over a conduit stub-up at a New York City Board of Education school kitchen renovation. Defense argued the stub-up was "integral to construction." Court denied summary judgment. Parties settled.',
    tag: 'New York · Trip/fall, conduit stub-up',
  },
  {
    amount: '$2,000,000',
    note: null,
    body: 'Electrician, age 42, tripped and fell on stub-ups at the base of a stairway on a New York construction project. Injuries: shoulder surgery and herniated disc at L4-5. Stairway location made the "integral to work" defense difficult to sustain.',
    tag: 'New York · Shoulder surgery, herniated disc L4-5',
  },
  {
    amount: '$1,300,000',
    note: null,
    body: 'High-rise CCIP project. A colleague injured on a conduit stub-up required multiple surgeries and was permanently unable to return to work. This incident is the direct origin of the Stub-EASE™ product line.',
    tag: 'Illinois · CCIP high-rise project',
  },
  {
    amount: '$1,100,000',
    note: null,
    body: 'Tradesman tripped and fell over an electrical conduit stub-up during construction of a high-rise building. An unusual density of mechanical stub-ups on the floor was established. Injuries: broken toe and herniated disc, lower back.',
    tag: 'High-rise construction · Back and foot injury',
  },
  {
    amount: '$700,000',
    note: null,
    body: 'Carpenter tripped over an electrical conduit on a New York construction site, suffering a meniscus injury and aggravation of pre-existing arthritis.',
    tag: 'New York · Meniscus, knee',
  },
  {
    amount: '$600,000',
    note: null,
    body: 'Construction worker fell over an electrical conduit on an Illinois job site, requiring shoulder surgery. Case proceeded on common-law negligence.',
    tag: 'Illinois · Shoulder surgery',
  },
]

export const oshaRecord = {
  violationType: 'Serious',
  standard: 'OSH Act §5(a)(1)',
  instances: 456,
  workersExposed: 50,
  initialPenalty: '$4,000',
  settledPenalty: '$2,400',
  industry: 'Electrical Contractor · Chicago High-Rise',
  source: 'U.S. Department of Labor, OSHA Inspection Record No. 1087741.015, Calumet City Office, August 2015. Public record. Company name withheld.',
}

export const materials = [
  {
    name: 'Stub-EASE II™ Cap',
    specs: ['Aixing TPR, Shore A 45', 'Flexible, non-sparking, non-conductive', 'Pantone 021C orange for high visibility on the job site'],
  },
  {
    name: 'Bend-EASE™ Elbow',
    specs: ['Westlake PVC UV-6676 rigid PVC', 'UV-stabilized for exterior exposure before the pour', 'Designed and tested to meet UL specifications per NEC 300.15(F) / 300.17(F)'],
  },
  {
    name: 'Stand-EASE™ Support',
    specs: ['DC51D+Z80 galvanized steel', '0.062" thick', 'Fastens to deck for stability throughout the pour'],
  },
]

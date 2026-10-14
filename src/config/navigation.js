// Navigation content: mega-menu panels (desktop), menu tabs (phone) and quick chips.
// Each item shows a product photo tile, so the menu itself sells the collection.

export const megaMenus = [
  {
    id: 'sarees',
    label: 'Sarees',
    to: '/shop/sarees',
    columns: [
      {
        title: 'Woven Silks',
        items: [
          { label: 'Banarasi', desc: 'Zari brocade from Varanasi', image: 'p31-1', to: '/shop?fabric=Banarasi' },
          { label: 'Kanjivaram', desc: 'Temple borders, pure silk', image: 'p28-1', to: '/shop?fabric=Kanjivaram' },
          { label: 'Paithani', desc: 'Peacock motifs from Paithan', image: 'p33-1', to: '/shop?fabric=Paithani' },
          { label: 'Soft Silk', desc: 'Light enough for every day', image: 'p20-1', to: '/shop?fabric=Soft+Silk' },
        ],
      },
      {
        title: 'Light & Airy',
        items: [
          { label: 'Organza', desc: 'Sheer, soft and dreamy', image: 'p08-1', to: '/shop?fabric=Organza' },
          { label: 'Tissue', desc: 'A gentle festive glow', image: 'p27-1', to: '/shop?fabric=Tissue' },
          { label: 'Georgette', desc: 'Flowing drapes, easy wear', image: 'p04-1', to: '/shop?fabric=Georgette' },
          { label: 'All Sarees', desc: 'Browse the full collection', image: 'p01-1', to: '/shop/sarees' },
        ],
      },
    ],
    feature: { image: 'p40-2', eyebrow: 'The Bridal Edit', title: 'Heavy Banarasi for the big day', to: '/shop?occasion=wedding' },
  },
  {
    id: 'suits',
    label: 'Suit Sets',
    to: '/shop/suit-sets',
    columns: [
      {
        title: 'Shop by Style',
        items: [
          { label: 'Anarkali Sets', desc: 'Flared, floor-length grace', image: 'p02-1', to: '/shop/suit-sets?q=anarkali' },
          { label: 'Embroidered Sets', desc: 'Handwork on chanderi', image: 'p06-1', to: '/shop/suit-sets?q=embroidered' },
          { label: 'Floral Dupatta Sets', desc: 'Solid kurta, printed dupatta', image: 'p15-1', to: '/shop/suit-sets?q=dupatta' },
          { label: 'Printed Cotton', desc: 'Breathable, workday ready', image: 'p13-1', to: '/shop/suit-sets?fabric=Cotton' },
        ],
      },
    ],
    feature: { image: 'p16-1', eyebrow: 'Just In', title: 'Lime chanderi with scalloped hems', to: '/product/lime-embroidered-kurta-set' },
  },
  {
    id: 'occasions',
    label: 'Occasions',
    to: '/shop',
    columns: [
      {
        title: 'Celebrations',
        items: [
          { label: 'Wedding', desc: 'Bridal reds and rich silks', image: 'p40-1', to: '/shop?occasion=wedding' },
          { label: 'Haldi & Mehendi', desc: 'Sunny yellows and greens', image: 'p10-1', to: '/shop?occasion=mehendi' },
          { label: 'Festive', desc: 'Pujas, Diwali, family days', image: 'p26-1', to: '/shop?occasion=festive' },
        ],
      },
      {
        title: 'Every Day',
        items: [
          { label: 'Party', desc: 'Sequins and soft sheen', image: 'p17-1', to: '/shop?occasion=party' },
          { label: 'Workwear', desc: 'Light silks for long days', image: 'p25-1', to: '/shop?occasion=office' },
          { label: 'Everyday', desc: 'Easy cotton sets', image: 'p14-1', to: '/shop?occasion=everyday' },
        ],
      },
    ],
    feature: { image: 'p31-2', eyebrow: 'Haldi Season', title: 'Sunshine yellow Banarasi', to: '/product/sunshine-yellow-banarasi-silk-saree' },
  },
]

// Plain links that sit after the mega-menu triggers.
export const navLinks = [
  { label: 'New Arrivals', to: '/shop?sort=new' },
  { label: 'Our Story', to: '/about' },
  { label: 'Sale', to: '/shop?sale=1', accent: true },
]

// Swipeable chips under the header on phones.
export const quickChips = [
  { label: 'Sarees', to: '/shop/sarees' },
  { label: 'Suit Sets', to: '/shop/suit-sets' },
  { label: 'Wedding', to: '/shop?occasion=wedding' },
  { label: 'Banarasi', to: '/shop?fabric=Banarasi' },
  { label: 'Kanjivaram', to: '/shop?fabric=Kanjivaram' },
  { label: 'Paithani', to: '/shop?fabric=Paithani' },
  { label: 'New', to: '/shop?sort=new' },
  { label: 'Sale', to: '/shop?sale=1', accent: true },
]

// Brand-level settings. Change the name, nav, offers or contact details here, not in components.
export const site = {
  name: 'Ekatra',
  tagline: 'Handwoven Heritage',
  currency: 'INR',
  locale: 'en-IN',
  freeShippingOver: 1999,
  shippingFee: 99,
  codFee: 49,
  stitchingFee: 499,
  instagram: '@ekatra.sarees',
  phone: '+91 98765 43210',
  email: 'care@ekatra.in',

  announcements: [
    'Free shipping on orders above ₹1,999',
    'Festive offer: extra 10% off with code FESTIVE10',
    'Cash on delivery available across India',
  ],

  // Top category nav. `to` is a router path.
  nav: [
    { label: 'Home', to: '/' },
    { label: 'Sarees', to: '/shop/sarees' },
    { label: 'Suit Sets', to: '/shop/suit-sets' },
    { label: 'Silk', to: '/shop?fabric=Silk' },
    { label: 'Banarasi', to: '/shop?fabric=Banarasi' },
    { label: 'Wedding', to: '/shop?occasion=wedding' },
    { label: 'New Arrivals', to: '/shop?sort=new' },
    { label: 'Sale', to: '/shop?sale=1', accent: true },
  ],

  // Coupon codes accepted at cart / checkout (demo).
  coupons: {
    FESTIVE10: { type: 'percent', value: 10, label: '10% off sitewide' },
    WELCOME15: { type: 'percent', value: 15, label: '15% off your first order', min: 2999 },
    FLAT500: { type: 'flat', value: 500, label: '₹500 off above ₹3,999', min: 3999 },
  },

  footer: {
    blurb: 'Sarees and suit sets woven by artisan clusters across India, finished for the way you dress today.',
    columns: [
      {
        title: 'Shop',
        links: [
          { label: 'All Sarees', to: '/shop/sarees' },
          { label: 'Suit Sets', to: '/shop/suit-sets' },
          { label: 'Wedding Edit', to: '/shop?occasion=wedding' },
          { label: 'New Arrivals', to: '/shop?sort=new' },
          { label: 'Sale', to: '/shop?sale=1' },
        ],
      },
      {
        title: 'Help',
        links: [
          { label: 'Track Order', to: '/account' },
          { label: 'Shipping', to: '/help#shipping' },
          { label: 'Returns & Exchange', to: '/help#returns' },
          { label: 'Saree Care', to: '/help#care' },
          { label: 'Contact Us', to: '/help#contact' },
        ],
      },
      {
        title: 'About',
        links: [
          { label: 'Our Story', to: '/about' },
          { label: 'Our Artisans', to: '/about#artisans' },
          { label: 'Wishlist', to: '/wishlist' },
          { label: 'Privacy Policy', to: '/help#privacy' },
        ],
      },
    ],
    social: [
      { label: 'Instagram', icon: 'instagram', href: 'https://instagram.com' },
      { label: 'Facebook', icon: 'facebook', href: 'https://facebook.com' },
      { label: 'Pinterest', icon: 'pinterest', href: 'https://pinterest.com' },
      { label: 'YouTube', icon: 'youtube', href: 'https://youtube.com' },
    ],
  },
}

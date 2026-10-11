// Brand-level settings. Change the name, nav or contact details here, not in components.
export const site = {
  name: 'ekatra',
  tagline: 'Denim, made for her',
  currency: 'INR',
  locale: 'en-IN',
  freeShippingOver: 2499,
  instagram: '@ekatra',

  // Rotates in the top bar, one at a time.
  announcements: [
    'Free shipping on orders over ₹2,499',
    'New in: the maxi slit denim skirt',
    'Easy 15-day returns with free pickup',
  ],

  nav: [
    { label: 'New in', href: '#trending' },
    { label: 'Jeans', href: '#trending' },
    { label: 'Jackets', href: '#trending' },
    { label: 'Fits', href: '#fits' },
    { label: 'Sale', href: '#trending', accent: true },
  ],

  footer: {
    blurb: 'Denim edited for her. Designed in India, made to be worn every day.',
    columns: [
      {
        title: 'Shop',
        links: [
          { label: 'New in', href: '#trending' },
          { label: 'Jeans', href: '#trending' },
          { label: 'Jackets', href: '#trending' },
          { label: 'Skirts', href: '#trending' },
          { label: 'Sale', href: '#trending' },
        ],
      },
      {
        title: 'Help',
        links: [
          { label: 'Shipping', href: '#' },
          { label: 'Returns', href: '#' },
          { label: 'Size guide', href: '#' },
          { label: 'Contact', href: '#' },
        ],
      },
      {
        title: 'Account',
        links: [
          { label: 'Sign in', href: '#' },
          { label: 'Orders', href: '#' },
          { label: 'Wishlist', href: '#' },
          { label: 'FAQs', href: '#' },
        ],
      },
    ],
    social: [
      { label: 'Instagram', icon: 'instagram', href: 'https://instagram.com' },
      { label: 'Pinterest', icon: 'pinterest', href: 'https://pinterest.com' },
      { label: 'YouTube', icon: 'youtube', href: 'https://youtube.com' },
    ],
  },
}

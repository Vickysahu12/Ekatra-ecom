// Editorial content for the landing page. Kept out of components so the
// client (or a CMS later) can change copy and imagery in one place.

// Hero slider. Full-width, one large cut-out model per slide on a soft pastel glow.
// productId is the piece she is wearing, shown in the "In the look" card.
export const heroSlides = [
  {
    id: 'skirt',
    tint: 'var(--color-blush)',
    label: 'New in',
    title: 'Denim, made for her',
    sub: 'Soft washes, flattering cuts and sizes 24 to 34. Pieces you will reach for every day.',
    cta: { label: 'Shop new in', href: '#trending' },
    model: 'look-07',
    productId: 'p-101',
  },
  {
    id: 'baggy',
    tint: 'var(--color-powder)',
    label: 'The baggy edit',
    title: 'Low rise, loose and easy',
    sub: 'Our most-loved baggy jean, now in three new washes.',
    cta: { label: 'Shop baggy', href: '#fits' },
    model: 'look-01',
    productId: 'p-103',
  },
  {
    id: 'jackets',
    tint: 'var(--color-lilac)',
    label: 'Jackets',
    title: 'The cropped trucker is back',
    sub: 'Boxy, cropped and washed by hand. Pairs with everything in your wardrobe.',
    cta: { label: 'Shop jackets', href: '#trending' },
    model: 'look-08',
    productId: 'p-102',
  },
]

export const categories = [
  { id: 'new', name: 'New in', image: 'look-08', tint: 'var(--color-blush)' },
  { id: 'jeans', name: 'Jeans', image: 'look-02', tint: 'var(--color-powder)' },
  { id: 'jackets', name: 'Jackets', image: 'look-16', tint: 'var(--color-lilac)' },
  { id: 'skirts', name: 'Skirts', image: 'look-07', tint: 'var(--color-soft)', focus: '50% 70%' },
  { id: 'tops', name: 'Tops', image: 'look-36', tint: 'var(--color-blush)' },
  { id: 'co-ords', name: 'Co-ords', image: 'look-12', tint: 'var(--color-powder)' },
  { id: 'sale', name: 'Sale', image: 'look-22', tint: 'var(--color-rose-soft)' },
]

// Filter chips on the trending grid. `id` matches product.category.
export const trendingFilters = [
  { id: 'all', label: 'All' },
  { id: 'jeans', label: 'Jeans' },
  { id: 'jackets', label: 'Jackets' },
  { id: 'skirts', label: 'Skirts' },
  { id: 'tops', label: 'Tops' },
]

// Two-up promo row, after khy: big campaign card + one spotlight product.
export const promo = {
  image: 'look-36',
  label: 'The denim edit',
  title: 'Everything blue, all in one place',
  cta: { label: 'Shop all', href: '#trending' },
  spotlightId: 'p-104',
}

export const fits = [
  { id: 'baggy', name: 'Baggy', cutout: 'look-01', line: 'Low on the hip, loose all the way down.', specs: { Rise: 'Low', Thigh: 'Loose', Leg: 'Wide' } },
  { id: 'straight', name: 'Straight', cutout: 'look-21', line: 'The everyday leg. No taper, no fuss.', specs: { Rise: 'Mid', Thigh: 'Regular', Leg: 'Straight' } },
  { id: 'wide', name: 'Wide', cutout: 'look-04', line: 'High waist, full width to the floor.', specs: { Rise: 'High', Thigh: 'Relaxed', Leg: 'Wide' } },
  { id: 'flare', name: 'Flare', cutout: 'look-02', line: 'Fitted through the thigh, opens below the knee.', specs: { Rise: 'High', Thigh: 'Fitted', Leg: 'Flared' } },
  { id: 'skinny', name: 'Skinny', cutout: 'look-37', line: 'Close all the way down with comfortable stretch.', specs: { Rise: 'Mid', Thigh: 'Slim', Leg: 'Skinny' } },
]

// Shop by occasion list, after the khy category list with a changing photo.
export const edits = [
  { id: 'everyday', name: 'Everyday', image: 'look-32' },
  { id: 'weekend', name: 'Weekend plans', image: 'look-34' },
  { id: 'office', name: 'Office ready', image: 'look-12' },
  { id: 'date', name: 'Date night', image: 'look-11' },
  { id: 'travel', name: 'Travel', image: 'look-19' },
  { id: 'festival', name: 'Festival', image: 'look-17' },
]

// The 40-photo lookbook wall, in display order.
export const lookbook = [
  'look-01', 'look-08', 'look-27', 'look-16', 'look-05', 'look-36',
  'look-32', 'look-24', 'look-02', 'look-19', 'look-14', 'look-33',
  'look-07', 'look-29', 'look-20', 'look-03', 'look-39', 'look-12',
  'look-17', 'look-06', 'look-25', 'look-34', 'look-11', 'look-18',
  'look-04', 'look-28', 'look-35', 'look-09', 'look-13', 'look-38',
  'look-21', 'look-26', 'look-10', 'look-37', 'look-15', 'look-30',
  'look-22', 'look-40', 'look-23', 'look-31',
]

// Sample reviews and summary until real ones come from the store / review app.
export const reviewSummary = { rating: 4.8, count: 1240 }
export const reviews = [
  { name: 'Riya M.', city: 'Delhi', avatar: 'look-13', productId: 'p-103', text: 'Finally a baggy jean that sits right on the hip. Ordered my usual 28 and it was spot on.' },
  { name: 'Sana Q.', city: 'Mumbai', avatar: 'look-36', productId: 'p-104', text: 'Flares that actually flare. Delivery took two days and the exchange was so easy.' },
  { name: 'Ananya R.', city: 'Bengaluru', avatar: 'look-16', productId: 'p-102', text: 'The cropped trucker goes with literally everything I own. Already want the second wash.' },
  { name: 'Meher K.', city: 'Pune', avatar: 'look-20', productId: 'p-101', text: 'The slit skirt is so flattering and the denim is soft from day one. Got so many compliments.' },
]

export const perks = [
  { icon: 'truck', title: 'Free shipping', body: 'On orders over ₹2,499' },
  { icon: 'returns', title: 'Easy returns', body: '15 days, free pickup' },
  { icon: 'cash', title: 'Cash on delivery', body: 'Across India' },
  { icon: 'chat', title: 'Fit help', body: 'Chat with our stylists' },
]

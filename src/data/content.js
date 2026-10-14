// Editorial content for the storefront. Kept out of components so the client
// (or a CMS later) can change copy and imagery in one place.

export const heroSlides = [
  {
    id: 'heritage',
    image: 'p01-1',
    eyebrow: 'The Festive Edit 2026',
    title: 'Timeless Traditions',
    sub: 'Handwoven sarees that carry stories forward, finished for the way you dress today.',
    cta: { label: 'Shop Sarees', to: '/shop/sarees' },
    focus: '50% 30%',
  },
  {
    id: 'banarasi',
    image: 'p31-2',
    eyebrow: 'Pure Banarasi Silk',
    title: 'Woven in Gold, Made for Celebration',
    sub: 'From haldi yellows to bridal reds, our Banarasi edit is woven on traditional handlooms.',
    cta: { label: 'Explore Banarasi', to: '/shop?fabric=Banarasi' },
    focus: '50% 20%',
  },
  {
    id: 'bridal',
    image: 'p40-2',
    eyebrow: 'The Bridal Edit',
    title: 'For the Day You Have Dreamt Of',
    sub: 'Heavy zari, rich jaal and colours chosen to glow under every light.',
    cta: { label: 'Shop Wedding', to: '/shop?occasion=wedding' },
    focus: '50% 20%',
  },
]

export const trustPoints = [
  { icon: 'cash', title: 'Cash on Delivery', body: 'Pay when it arrives' },
  { icon: 'truck', title: 'Free Shipping', body: 'On orders above ₹1,999' },
  { icon: 'seal', title: 'Handpicked Quality', body: 'Checked piece by piece' },
  { icon: 'returns', title: '7-Day Returns', body: 'Easy exchange & refund' },
]

export const occasions = [
  { id: 'wedding', label: 'Wedding', image: 'p40-1', to: '/shop?occasion=wedding' },
  { id: 'festive', label: 'Festive', image: 'p33-1', to: '/shop?occasion=festive' },
  { id: 'party', label: 'Party', image: 'p17-1', to: '/shop?occasion=party' },
  { id: 'mehendi', label: 'Haldi & Mehendi', image: 'p10-1', to: '/shop?occasion=mehendi' },
  { id: 'office', label: 'Workwear', image: 'p20-1', to: '/shop?occasion=office' },
  { id: 'suits', label: 'Suit Sets', image: 'p02-1', to: '/shop/suit-sets' },
]

export const occasionLabels = {
  wedding: 'Wedding',
  festive: 'Festive',
  party: 'Party',
  mehendi: 'Haldi & Mehendi',
  everyday: 'Everyday',
  office: 'Workwear',
}

export const categoryLabels = {
  sarees: 'Sarees',
  'suit-sets': 'Suit Sets',
}

// Tabs on the "Curated Collections" grid. `query` is passed to listProducts().
export const collectionTabs = [
  { id: 'best', label: 'Best Sellers', query: { bestseller: true } },
  { id: 'new', label: 'New Arrivals', query: { sort: 'new' } },
  { id: 'silk', label: 'Silk Sarees', query: { fabric: ['Kanjivaram', 'Banarasi', 'Paithani'] } },
  { id: 'suits', label: 'Suit Sets', query: { category: 'suit-sets' } },
]

export const artisan = {
  image: 'p32-2',
  eyebrow: 'Artisan Spotlight',
  title: 'Handcrafted with Heritage',
  body: 'Every Ekatra piece starts on a loom in Varanasi, Kanchipuram or Paithan. We work directly with weaver families, so the craft stays alive and the hands behind it are paid fairly.',
  cta: { label: 'Meet Our Artisans', to: '/about#artisans' },
  stats: [
    { value: '120+', label: 'Weaver families' },
    { value: '6', label: 'Craft clusters' },
    { value: '18 days', label: 'Average weave time' },
  ],
}

export const promoTiles = [
  {
    id: 'paithani',
    image: 'p36-1',
    eyebrow: 'New Collection',
    title: 'The Paithani Story',
    body: 'Peacock motifs and woven pallus from Maharashtra.',
    cta: { label: 'Shop Paithani', to: '/shop?fabric=Paithani' },
    tone: 'maroon',
  },
  {
    id: 'striped',
    image: 'p20-1',
    eyebrow: 'Eight Colours',
    title: 'Striped Zari Silk',
    body: 'Light enough for a workday, rich enough for a puja.',
    cta: { label: 'Pick Your Colour', to: '/product/teal-striped-zari-silk-saree' },
    tone: 'cream',
  },
]

// "Complete the look": a saree with the pieces that go with it.
export const lookbook = {
  title: 'Style It Your Way',
  sub: 'Pieces our stylists pair together for a festive evening.',
  productIds: ['p28', 'p38', 'p27', 'p31'],
}

export const stylingGuide = [
  { id: 'everyday', title: 'Everyday Elegance', image: 'p13-1', to: '/shop?occasion=everyday' },
  { id: 'festive', title: 'Festive Favourites', image: 'p26-1', to: '/shop?occasion=festive' },
  { id: 'guest', title: 'Wedding Guest Looks', image: 'p08-1', to: '/shop?occasion=party' },
  { id: 'office', title: 'Silk for Work', image: 'p25-1', to: '/shop?occasion=office' },
]

export const offers = [
  { icon: 'percent', eyebrow: 'Seasonal Offer', title: 'Flat ₹500 Off', body: 'On orders above ₹3,999', code: 'FLAT500' },
  { icon: 'gift', eyebrow: 'Festive Special', title: 'Extra 10% Off', body: 'Sitewide, on everything', code: 'FESTIVE10' },
  { icon: 'sparkle', eyebrow: 'New Here?', title: '15% Off First Order', body: 'On orders above ₹2,999', code: 'WELCOME15' },
]

export const testimonials = [
  { name: 'Priya Sharma', city: 'Jaipur', productId: 'p31', text: 'Wore the yellow Banarasi for my haldi. The colour is even richer in person and the zari did not itch at all.' },
  { name: 'Meera Iyer', city: 'Chennai', productId: 'p28', text: 'A Kanjivaram at this price that actually feels like silk. Packaging was beautiful too, came with a muslin bag.' },
  { name: 'Ananya Deshpande', city: 'Pune', productId: 'p33', text: 'My mother cried when she saw the Paithani pallu. Delivered in four days and the blouse piece was generous.' },
  { name: 'Sneha Reddy', city: 'Hyderabad', productId: 'p18', text: 'Bought the striped zari silk in three colours. So light I wore it the whole day at office and then dinner.' },
]

export const serviceRow = [
  { icon: 'returns', title: 'Easy Returns', body: 'Within 7 days' },
  { icon: 'lock', title: 'Secure Payments', body: '100% safe checkout' },
  { icon: 'card', title: 'No-cost EMI', body: 'On orders above ₹4,999' },
  { icon: 'chat', title: 'Styling Help', body: 'Chat with us anytime' },
]

// Review pool used to fill product pages (demo).
export const reviewPool = [
  { name: 'Kavya N.', rating: 5, title: 'Even better in person', text: 'The colour is exactly as shown and the fabric has a lovely fall. Got so many compliments.' },
  { name: 'Ritika S.', rating: 5, title: 'Worth every rupee', text: 'Packaging was neat, came with a care card. The blouse piece is a good length.' },
  { name: 'Aparna M.', rating: 4, title: 'Beautiful weave', text: 'Slightly heavier than I expected but drapes well. Delivery took 5 days.' },
  { name: 'Shruti P.', rating: 5, title: 'Loved it', text: 'Wore it for a family function. Easy to pleat and did not wrinkle.' },
  { name: 'Nandini R.', rating: 4, title: 'Lovely colour', text: 'Very elegant. The zari is soft and does not scratch. Would buy again.' },
]

export const sortOptions = [
  { id: 'featured', label: 'Featured' },
  { id: 'new', label: 'New Arrivals' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'rating', label: 'Top Rated' },
]

export const priceBands = [
  { id: 'u2500', label: 'Under ₹2,500', min: 0, max: 2499 },
  { id: '2500-4000', label: '₹2,500 to ₹4,000', min: 2500, max: 4000 },
  { id: '4000-6000', label: '₹4,000 to ₹6,000', min: 4001, max: 6000 },
  { id: 'o6000', label: 'Above ₹6,000', min: 6001, max: Infinity },
]

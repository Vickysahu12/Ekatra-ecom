// Placeholder catalogue. Shape mirrors what a products API would return,
// so services/catalog.js can switch to fetch() without touching components.
// Names, prices and ratings are sample data until the client shares the real line sheet.

const JEAN_SIZES = ['24', '26', '28', '30', '32', '34']
const TOP_SIZES = ['XS', 'S', 'M', 'L', 'XL']

// Wash colours shown as small swatches on cards.
const WASH = {
  light: '#a9bfd6',
  mid: '#6c8db3',
  dark: '#34507a',
  black: '#2b2a2e',
  grey: '#9a9ca3',
  ecru: '#ece6dc',
}

const product = (p) => ({
  sizes: ['jeans', 'skirts'].includes(p.category) ? JEAN_SIZES : TOP_SIZES,
  rating: 4.7,
  reviews: 48,
  ...p,
})

export const products = [
  product({ id: 'p-101', name: 'Maxi Slit Denim Skirt', category: 'skirts', wash: 'Mid blue', price: 2799, badge: 'New in', trending: true, images: ['look-07'], swatches: [WASH.mid, WASH.dark], rating: 4.9, reviews: 112 }),
  product({ id: 'p-102', name: 'Cropped Trucker Jacket', category: 'jackets', wash: 'Vintage blue', price: 3299, badge: 'Bestseller', trending: true, images: ['look-09', 'look-08'], swatches: [WASH.mid, WASH.light], rating: 4.8, reviews: 236 }),
  product({ id: 'p-103', name: 'Low Rise Baggy Jean', category: 'jeans', wash: 'Mid blue', price: 3299, trending: true, images: ['look-01'], swatches: [WASH.mid, WASH.light, WASH.black] }),
  product({ id: 'p-104', name: 'High Rise Flare', category: 'jeans', wash: 'Vintage grey', price: 3199, compareAt: 3999, trending: true, images: ['look-02'], swatches: [WASH.grey, WASH.dark], rating: 4.8, reviews: 174 }),
  product({ id: 'p-105', name: 'Corset Wide Leg', category: 'jeans', wash: 'Ice blue', price: 2999, badge: 'New in', trending: true, images: ['look-04'], swatches: [WASH.light, WASH.ecru] }),
  product({ id: 'p-106', name: 'Sky Sherpa Jacket', category: 'jackets', wash: 'Light blue', price: 3899, trending: true, images: ['look-18'], swatches: [WASH.light] }),
  product({ id: 'p-107', name: 'Boxy Washed Tee', category: 'tops', wash: 'Ash grey', price: 1499, trending: true, images: ['look-14'], swatches: [WASH.grey, WASH.ecru, WASH.black] }),
  product({ id: 'p-108', name: 'Wide Leg Jean', category: 'jeans', wash: 'Bleached', price: 2999, trending: true, images: ['look-03'], swatches: [WASH.light, WASH.mid] }),
  product({ id: 'p-109', name: 'Split Hem Flare', category: 'jeans', wash: 'Dark vintage', price: 3499, images: ['look-05'], swatches: [WASH.dark] }),
  product({ id: 'p-110', name: 'Mom Jean', category: 'jeans', wash: 'Mid blue', price: 2799, images: ['look-06'], swatches: [WASH.mid, WASH.light] }),
  product({ id: 'p-111', name: 'Straight Leg Jean', category: 'jeans', wash: 'Mid blue', price: 2899, images: ['look-21'], swatches: [WASH.mid, WASH.dark] }),
  product({ id: 'p-112', name: 'Patchwork Skinny', category: 'jeans', wash: 'Dark indigo', price: 2499, compareAt: 3299, images: ['look-22'], swatches: [WASH.dark] }),
  product({ id: 'p-113', name: 'Paperbag Waist Jean', category: 'jeans', wash: 'Mid blue', price: 2799, images: ['look-23'], swatches: [WASH.mid] }),
  product({ id: 'p-114', name: 'Light Wash Skinny', category: 'jeans', wash: 'Light blue', price: 1999, compareAt: 2699, images: ['look-37'], swatches: [WASH.light] }),
  product({ id: 'p-115', name: 'Black Co-ord Set', category: 'co-ords', wash: 'Washed black', price: 3999, images: ['look-12'], swatches: [WASH.black] }),
  product({ id: 'p-116', name: 'Denim Vest', category: 'tops', wash: 'Teal wash', price: 1899, images: ['look-19'], swatches: [WASH.mid] }),
  product({ id: 'p-117', name: 'Oversized Denim Jacket', category: 'jackets', wash: 'Mid blue', price: 3499, images: ['look-20'], swatches: [WASH.mid, WASH.dark] }),
  product({ id: 'p-118', name: 'Raw Indigo Trucker', category: 'jackets', wash: 'Raw indigo', price: 3499, badge: 'Limited', images: ['look-24'], swatches: [WASH.dark] }),
]

export const getProduct = (id) => products.find((p) => p.id === id)

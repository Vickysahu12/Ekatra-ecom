// Demo catalogue built from the client's product photos (public/media/products).
// Shape mirrors what a products API would return, so services/catalog.js can switch
// to fetch() later without touching components. Prices and copy are sample data.

const SAREE_CARE = ['Dry clean only', 'Store folded in a muslin cloth', 'Iron on low heat on the reverse']
const SUIT_CARE = ['Gentle hand wash in cold water', 'Do not bleach', 'Dry in shade, iron on medium heat']

const saree = (p) => ({
  category: 'sarees',
  sizes: null,
  length: '5.5 m saree + 0.8 m unstitched blouse piece',
  care: SAREE_CARE,
  ...p,
})

const suit = (p) => ({
  category: 'suit-sets',
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  length: 'Kurta, bottom and dupatta',
  care: SUIT_CARE,
  ...p,
})

const raw = [
  saree({ n: 1, name: 'Navy Patola Silk Saree', fabric: 'Silk', color: 'Navy', hex: '#24305e', occasions: ['festive', 'wedding'], price: 4499, compareAt: 5999, rating: 4.8, reviews: 212, badge: 'Bestseller', bestseller: true, blurb: 'Classic double ikat patola motifs woven across a deep navy silk body, finished with a rich zari pallu.' }),
  suit({ n: 2, name: 'Lilac Organza Anarkali Set', fabric: 'Organza', color: 'Lilac', hex: '#b9a2cf', occasions: ['party', 'festive'], price: 3899, rating: 4.7, reviews: 96, isNew: true, blurb: 'A flowing floor-length anarkali with a keyhole back, palazzo and a sheer organza dupatta.' }),
  suit({ n: 3, name: 'Rani Pink Banarasi Kurta Set', fabric: 'Banarasi', color: 'Pink', hex: '#d0287a', occasions: ['festive'], price: 3299, compareAt: 3999, rating: 4.6, reviews: 74, blurb: 'Straight kurta and pants in rani pink, paired with a woven Banarasi dupatta.' }),
  saree({ n: 4, name: 'Red Leheriya Georgette Saree', fabric: 'Georgette', color: 'Red', hex: '#c8302f', occasions: ['festive', 'party'], price: 2799, rating: 4.7, reviews: 138, bestseller: true, blurb: 'Bright leheriya stripes on lightweight georgette with a contrast zari border. Easy to drape, easy to carry.' }),
  saree({ n: 5, name: 'Teal Floral Silk Saree', fabric: 'Soft Silk', color: 'Teal', hex: '#3a9aa8', occasions: ['party', 'festive'], price: 3199, rating: 4.5, reviews: 51, blurb: 'Painterly florals on a soft teal silk with a contrast purple border that frames the drape.' }),
  suit({ n: 6, name: 'Wine Embroidered Kurta Set', fabric: 'Chanderi', color: 'Wine', hex: '#4d1f36', occasions: ['festive', 'party'], price: 3499, rating: 4.8, reviews: 88, blurb: 'Hand-embroidered yoke on a wine chanderi kurta, with straight pants and a tissue dupatta.' }),
  suit({ n: 7, name: 'Slate Printed Kurta Set', fabric: 'Cotton', color: 'Grey', hex: '#6b7b93', occasions: ['everyday', 'office'], price: 1899, compareAt: 2499, rating: 4.6, reviews: 164, family: 'print-sets', blurb: 'An all-over block print in slate blue on breathable cotton. Kurta, palazzo and dupatta.' }),
  saree({ n: 8, name: 'Ivory Organza Floral Saree', fabric: 'Organza', color: 'Ivory', hex: '#f1e6da', occasions: ['party', 'wedding'], price: 3599, rating: 4.9, reviews: 47, isNew: true, badge: 'New', blurb: 'Soft ivory organza with blush florals and a satin border. Made for day weddings and brunches.' }),
  saree({ n: 9, name: 'Mehendi Green Buti Silk Saree', fabric: 'Silk', color: 'Green', hex: '#5f7a1f', occasions: ['mehendi', 'festive'], price: 3799, rating: 4.7, reviews: 69, family: 'buti-silk', blurb: 'Gold coin butis scattered over a mehendi green silk with a heavy woven pallu.' }),
  saree({ n: 10, name: 'Mustard Buti Silk Saree', fabric: 'Silk', color: 'Mustard', hex: '#c99a1a', occasions: ['mehendi', 'festive'], price: 3799, rating: 4.8, reviews: 82, family: 'buti-silk', blurb: 'Haldi-ready mustard silk with gold coin butis and a rich zari pallu.' }),
  suit({ n: 11, name: 'Mustard Printed Kurta Set', fabric: 'Cotton', color: 'Mustard', hex: '#b89439', occasions: ['everyday', 'office'], price: 1799, rating: 4.5, reviews: 58, family: 'print-sets', blurb: 'Mustard cotton with a fine geometric print. Straight kurta, palazzo and matching dupatta.' }),
  suit({ n: 12, name: 'Rani Kurta Set with Floral Dupatta', fabric: 'Rayon', color: 'Pink', hex: '#d1307f', occasions: ['festive'], price: 2499, rating: 4.7, reviews: 121, family: 'floral-dupatta', blurb: 'An embroidered rani kurta and pants, paired with a soft floral print dupatta.' }),
  suit({ n: 13, name: 'Coral Printed Kurta Set', fabric: 'Cotton', color: 'Coral', hex: '#e2685f', occasions: ['everyday'], price: 1799, rating: 4.6, reviews: 77, family: 'print-sets', blurb: 'Coral cotton with a delicate all-over print. Light, breezy and easy to style.' }),
  suit({ n: 14, name: 'Sage Printed Kurta Set', fabric: 'Cotton', color: 'Green', hex: '#8a9a6c', occasions: ['everyday', 'office'], price: 1799, rating: 4.6, reviews: 63, family: 'print-sets', blurb: 'Muted sage cotton with a fine print. Kurta, palazzo and dupatta for long workdays.' }),
  suit({ n: 15, name: 'Red Kurta Set with Floral Dupatta', fabric: 'Rayon', color: 'Red', hex: '#c42227', occasions: ['festive'], price: 2699, rating: 4.8, reviews: 104, family: 'floral-dupatta', bestseller: true, badge: 'Bestseller', blurb: 'Sequin-embroidered red kurta and pants with a pastel floral dupatta.' }),
  suit({ n: 16, name: 'Lime Embroidered Kurta Set', fabric: 'Chanderi', color: 'Lime', hex: '#c3d335', occasions: ['mehendi', 'festive'], price: 2899, rating: 4.7, reviews: 39, isNew: true, badge: 'New', blurb: 'A lime chanderi kurta with scalloped embroidered hems and matching pants.' }),
  saree({ n: 17, name: 'Ivory Ombre Sequin Saree', fabric: 'Georgette', color: 'Ivory', hex: '#d9c7ad', occasions: ['party', 'wedding'], price: 4999, rating: 4.8, reviews: 42, isNew: true, badge: 'New', blurb: 'Ivory melting into caramel, scattered with tonal sequins. Cocktail nights, sorted.' }),
  saree({ n: 18, name: 'Purple Striped Zari Silk Saree', fabric: 'Soft Silk', color: 'Purple', hex: '#5a3a8c', occasions: ['festive', 'office'], price: 2499, compareAt: 3199, rating: 4.7, reviews: 186, family: 'striped-zari', bestseller: true, badge: 'Bestseller', blurb: 'Fine zari stripes on a soft silk body that drapes beautifully and weighs next to nothing.' }),
  saree({ n: 19, name: 'Lavender Striped Zari Silk Saree', fabric: 'Soft Silk', color: 'Lavender', hex: '#a68aa6', occasions: ['festive', 'office'], price: 2499, compareAt: 3199, rating: 4.6, reviews: 92, family: 'striped-zari', blurb: 'Fine zari stripes on a soft lavender silk. Light enough for a full day of wear.' }),
  saree({ n: 20, name: 'Teal Striped Zari Silk Saree', fabric: 'Soft Silk', color: 'Teal', hex: '#13707c', occasions: ['festive', 'office'], price: 2499, compareAt: 3199, rating: 4.8, reviews: 117, family: 'striped-zari', blurb: 'Deep teal soft silk with fine zari stripes and a coordinated border.' }),
  saree({ n: 21, name: 'Red Striped Zari Silk Saree', fabric: 'Soft Silk', color: 'Red', hex: '#b02a3b', occasions: ['festive'], price: 2499, compareAt: 3199, rating: 4.7, reviews: 99, family: 'striped-zari', blurb: 'A festive red soft silk with fine zari stripes, light and easy to drape.' }),
  saree({ n: 22, name: 'Magenta Striped Zari Silk Saree', fabric: 'Soft Silk', color: 'Magenta', hex: '#9c2a8c', occasions: ['festive', 'party'], price: 2499, compareAt: 3199, rating: 4.6, reviews: 71, family: 'striped-zari', blurb: 'Magenta soft silk with fine zari stripes that catch the light as you move.' }),
  saree({ n: 23, name: 'Turquoise Striped Zari Silk Saree', fabric: 'Soft Silk', color: 'Blue', hex: '#1b8fb8', occasions: ['festive', 'office'], price: 2499, compareAt: 3199, rating: 4.7, reviews: 84, family: 'striped-zari', blurb: 'Turquoise soft silk with fine zari stripes. Fresh, bright and easy to wear.' }),
  saree({ n: 24, name: 'Maroon Striped Zari Silk Saree', fabric: 'Soft Silk', color: 'Maroon', hex: '#6e1f33', occasions: ['festive'], price: 2499, compareAt: 3199, rating: 4.8, reviews: 126, family: 'striped-zari', blurb: 'Rich maroon soft silk with fine zari stripes and a coordinated pallu.' }),
  saree({ n: 25, name: 'Royal Blue Striped Zari Silk Saree', fabric: 'Soft Silk', color: 'Blue', hex: '#2a3f9c', occasions: ['festive', 'office'], price: 2499, compareAt: 3199, rating: 4.7, reviews: 88, family: 'striped-zari', blurb: 'Royal blue soft silk with fine zari stripes and a woven pallu.' }),
  saree({ n: 26, name: 'Wine Zari Woven Silk Saree', fabric: 'Silk', color: 'Wine', hex: '#7a2a4a', occasions: ['festive', 'wedding'], price: 3999, rating: 4.7, reviews: 58, family: 'zari-woven', blurb: 'Allover zari weave on wine silk with a broad gold border and a matching blouse.' }),
  saree({ n: 27, name: 'Cream Tissue Saree with Gold Border', fabric: 'Tissue', color: 'Ivory', hex: '#efe1bf', occasions: ['festive', 'wedding'], price: 3299, rating: 4.9, reviews: 73, blurb: 'Glowing cream tissue with a classic gold border. Timeless for pujas and day functions.' }),
  saree({ n: 28, name: 'Bottle Green Kanjivaram Silk Saree', fabric: 'Kanjivaram', color: 'Green', hex: '#24503a', occasions: ['wedding', 'festive'], price: 5499, compareAt: 6999, rating: 4.9, reviews: 143, family: 'kanjivaram', bestseller: true, badge: 'Bestseller', blurb: 'Bottle green Kanjivaram with a dense zari body and a heavy temple pallu.' }),
  saree({ n: 29, name: 'Tangerine Kanjivaram Silk Saree', fabric: 'Kanjivaram', color: 'Orange', hex: '#d0512a', occasions: ['wedding', 'festive'], price: 5499, compareAt: 6999, rating: 4.8, reviews: 97, family: 'kanjivaram', blurb: 'A warm tangerine Kanjivaram with copper zari checks and a rich border.' }),
  saree({ n: 30, name: 'Olive Kanjivaram Silk Saree', fabric: 'Kanjivaram', color: 'Olive', hex: '#4e4a2a', occasions: ['wedding', 'festive'], price: 5499, compareAt: 6999, rating: 4.7, reviews: 64, family: 'kanjivaram', blurb: 'Olive Kanjivaram silk with antique gold zari and a contrast black blouse.' }),
  saree({ n: 31, name: 'Sunshine Yellow Banarasi Silk Saree', fabric: 'Banarasi', color: 'Yellow', hex: '#e8b41a', occasions: ['mehendi', 'wedding'], price: 6499, compareAt: 7999, rating: 4.9, reviews: 176, bestseller: true, badge: 'Bestseller', blurb: 'Pure Banarasi silk in sunshine yellow with silver-gold motifs. The haldi saree.' }),
  saree({ n: 32, name: 'Rani Bandhani Banarasi Saree', fabric: 'Banarasi', color: 'Pink', hex: '#a3184e', occasions: ['wedding', 'festive'], price: 5999, rating: 4.8, reviews: 81, blurb: 'Bandhani dots meet Banarasi zari on a rani silk, with a brocade blouse.' }),
  saree({ n: 33, name: 'Purple Sky Paithani Silk Saree', fabric: 'Paithani', color: 'Purple', hex: '#4e2a6e', occasions: ['wedding', 'festive'], price: 4799, rating: 4.8, reviews: 66, family: 'paithani', bestseller: true, blurb: 'Purple Paithani with a sky blue border and peacock motifs on the pallu.' }),
  saree({ n: 34, name: 'Rani Pink Paithani Silk Saree', fabric: 'Paithani', color: 'Pink', hex: '#d0356f', occasions: ['wedding', 'festive'], price: 4799, rating: 4.7, reviews: 52, family: 'paithani', blurb: 'Rani pink Paithani with woven peacock motifs and a contrast green blouse.' }),
  saree({ n: 35, name: 'Mustard Paithani Silk Saree', fabric: 'Paithani', color: 'Mustard', hex: '#c08a1c', occasions: ['mehendi', 'festive'], price: 4799, rating: 4.8, reviews: 49, family: 'paithani', blurb: 'Mustard Paithani silk with a woven border and a bottle green blouse.' }),
  saree({ n: 36, name: 'Emerald Paithani with Yellow Pallu', fabric: 'Paithani', color: 'Green', hex: '#1d4a32', occasions: ['wedding', 'festive'], price: 4999, rating: 4.9, reviews: 38, family: 'paithani', isNew: true, badge: 'New', blurb: 'Emerald silk that melts into a yellow pallu, scattered with woven butas.' }),
  saree({ n: 37, name: 'Royal Blue Paithani Silk Saree', fabric: 'Paithani', color: 'Blue', hex: '#2b2fa0', occasions: ['wedding', 'festive'], price: 5299, rating: 4.8, reviews: 57, blurb: 'Royal blue Paithani with a contrast purple border and a green blouse.' }),
  saree({ n: 38, name: 'Emerald Zari Butta Silk Saree', fabric: 'Silk', color: 'Green', hex: '#1f5a3b', occasions: ['festive', 'wedding'], price: 3999, rating: 4.7, reviews: 61, family: 'zari-woven', blurb: 'Gold zari buttas on emerald silk with a broad woven border.' }),
  saree({ n: 39, name: 'Black Copper Zari Silk Saree', fabric: 'Silk', color: 'Black', hex: '#1d1a1a', occasions: ['party', 'festive'], price: 4299, rating: 4.8, reviews: 72, family: 'zari-woven', blurb: 'Black silk with copper zari butas and a deep woven border. Quietly dramatic.' }),
  saree({ n: 40, name: 'Red Banarasi Bridal Saree', fabric: 'Banarasi', color: 'Red', hex: '#b51b24', occasions: ['wedding'], price: 8999, compareAt: 10999, rating: 5.0, reviews: 64, badge: 'Bridal', bestseller: true, blurb: 'A heavy Banarasi in bridal red with dense floral jaal and a silver-gold border.' }),
  saree({ n: 41, name: 'Beige Tissue Saree with Red Blouse', fabric: 'Tissue', color: 'Beige', hex: '#e5cfa6', occasions: ['festive', 'office'], price: 3499, rating: 4.7, reviews: 45, blurb: 'Beige tissue with a soft sheen and fine stripes, styled with a red blouse.' }),
]

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export const products = raw.map(({ n, ...p }) => {
  const id = `p${String(n).padStart(2, '0')}`
  return {
    id,
    slug: slugify(p.name),
    images: [`${id}-1`, `${id}-2`],
    ...p,
  }
})

export const getProduct = (id) => products.find((p) => p.id === id)
export const getProductBySlug = (slug) => products.find((p) => p.slug === slug)

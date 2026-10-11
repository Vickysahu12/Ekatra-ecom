// Data access layer. Components only talk to these functions.
// Today they read local data; later, point them at the backend:
//   export const listProducts = (query) => api.get('/products', { params: query })
import { products, getProduct as findProduct } from '../data/products'
import { imageSet } from '../data/media'

const withImages = (product) => ({
  ...product,
  media: product.images.map(imageSet),
})

export const listProducts = async ({ category, trending, onSale, limit } = {}) => {
  let items = products
  if (category && category !== 'all') items = items.filter((p) => p.category === category)
  if (trending !== undefined) items = items.filter((p) => Boolean(p.trending) === trending)
  if (onSale) items = items.filter((p) => p.compareAt)
  if (limit) items = items.slice(0, limit)
  return items.map(withImages)
}

export const getProduct = async (id) => {
  const product = findProduct(id)
  return product ? withImages(product) : null
}

// Synchronous variant for static sections that render on first paint.
export const getProductSync = (id) => {
  const product = findProduct(id)
  return product ? withImages(product) : null
}

// Simple local search over name, category and wash. Swap for a search API later.
export const searchProducts = async (query, { limit = 6 } = {}) => {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return products
    .filter((p) => `${p.name} ${p.category} ${p.wash}`.toLowerCase().includes(q))
    .slice(0, limit)
    .map(withImages)
}

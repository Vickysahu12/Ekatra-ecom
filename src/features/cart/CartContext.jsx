import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react'
import { getProductSync } from '../../services/catalog'

// Cart lines are { productId, size, qty }. Product details are looked up on read,
// so prices always come from the catalogue (and later, the API), never from storage.

const STORAGE_KEY = 'ekatra.cart.v2'
const CartContext = createContext(null)

function reducer(state, action) {
  switch (action.type) {
    case 'add': {
      const { productId, size, qty } = action
      const existing = state.lines.find((l) => l.productId === productId && l.size === size)
      const lines = existing
        ? state.lines.map((l) => (l === existing ? { ...l, qty: l.qty + qty } : l))
        : [...state.lines, { productId, size, qty }]
      return { ...state, lines, addedAt: Date.now() }
    }
    case 'setQty': {
      const lines = state.lines
        .map((l, i) => (i === action.index ? { ...l, qty: action.qty } : l))
        .filter((l) => l.qty > 0)
      return { ...state, lines }
    }
    case 'open':
      return { ...state, open: action.open }
    default:
      return state
  }
}

function loadLines() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return Array.isArray(saved) ? saved.filter((l) => getProductSync(l.productId)) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, () => ({ lines: loadLines(), open: false, addedAt: 0 }))

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.lines))
    } catch {
      // Storage can be unavailable (private mode). The cart still works for the session.
    }
  }, [state.lines])

  const add = useCallback((productId, size, qty = 1) => dispatch({ type: 'add', productId, size, qty }), [])
  const setQty = useCallback((index, qty) => dispatch({ type: 'setQty', index, qty }), [])
  const setOpen = useCallback((open) => dispatch({ type: 'open', open }), [])

  const value = useMemo(() => {
    const items = state.lines.map((line) => ({ ...line, product: getProductSync(line.productId) }))
    const count = items.reduce((n, l) => n + l.qty, 0)
    const subtotal = items.reduce((sum, l) => sum + l.qty * l.product.price, 0)
    // addedAt changes on every add, so badges can replay a small bump animation.
    return { items, count, subtotal, open: state.open, addedAt: state.addedAt, add, setQty, setOpen }
  }, [state, add, setQty, setOpen])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// eslint-disable-next-line react/only-export-components
export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}

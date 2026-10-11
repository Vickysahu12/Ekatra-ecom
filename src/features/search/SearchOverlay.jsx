import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { searchProducts } from '../../services/catalog'
import { useOverlay } from '../../hooks/useOverlay'
import { useQuickView } from '../quickview/QuickView'
import { formatPrice } from '../../lib/format'
import { Img } from '../../components/ui/Img'
import { Icon } from '../../components/ui/Icon'

// Search panel that drops from the top. Results update as she types;
// picking one opens quick view. Popular searches fill the empty state.

const POPULAR = ['Baggy', 'Flare', 'Skirt', 'Cropped jacket', 'Wide leg', 'Black']
const SearchContext = createContext(null)

export function SearchProvider({ children }) {
  const [open, setOpen] = useState(false)
  const openSearch = useCallback(() => setOpen(true), [])
  const close = useCallback(() => setOpen(false), [])
  const value = useMemo(() => ({ openSearch }), [openSearch])

  return (
    <SearchContext.Provider value={value}>
      {children}
      <SearchPanel open={open} onClose={close} />
    </SearchContext.Provider>
  )
}

// eslint-disable-next-line react/only-export-components
export function useSearch() {
  const ctx = useContext(SearchContext)
  if (!ctx) throw new Error('useSearch must be used inside <SearchProvider>')
  return ctx
}

function SearchPanel({ open, onClose }) {
  const reduce = useReducedMotion()
  const { openProduct } = useQuickView()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  // Clear the query on the way out so the next open starts fresh.
  const close = useCallback(() => {
    setQuery('')
    onClose()
  }, [onClose])
  const focusRef = useOverlay(open, close)

  useEffect(() => {
    let active = true
    searchProducts(query).then((r) => active && setResults(r))
    return () => {
      active = false
    }
  }, [query])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Search">
          <motion.button
            type="button"
            tabIndex={-1}
            aria-label="Close search"
            className="absolute inset-0 h-full w-full cursor-default bg-ink/40 backdrop-blur-[3px]"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="absolute inset-x-0 top-0 max-h-[100dvh] overflow-y-auto rounded-b-[28px] bg-bg pb-6 shadow-lift"
            initial={reduce ? { opacity: 0 } : { y: '-100%' }}
            animate={reduce ? { opacity: 1 } : { y: 0 }}
            exit={reduce ? { opacity: 0 } : { y: '-100%' }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="shell pt-[max(1rem,env(safe-area-inset-top))]">
              <form
                role="search"
                onSubmit={(e) => {
                  e.preventDefault()
                  if (results[0]) {
                    close()
                    openProduct(results[0].id)
                  }
                }}
                className="flex items-center gap-3"
              >
                <label className="flex h-13 flex-1 items-center gap-3 rounded-full bg-soft px-5 focus-within:ring-2 focus-within:ring-ink">
                  <Icon name="search" size={20} />
                  <span className="sr-only">Search products</span>
                  <input
                    ref={focusRef}
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search jeans, skirts, jackets…"
                    className="h-full min-w-0 flex-1 bg-transparent text-[16px] outline-none placeholder:text-ink-soft"
                  />
                </label>
                <button type="button" onClick={close} className="press text-[14px] font-semibold">
                  Cancel
                </button>
              </form>

              {!query && (
                <div className="mt-6">
                  <p className="text-[13px] font-semibold text-ink-soft">Popular searches</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {POPULAR.map((term) => (
                      <li key={term}>
                        <button
                          type="button"
                          onClick={() => setQuery(term)}
                          className="press h-10 rounded-full border border-line-strong px-4 text-[14px] font-medium hover:border-ink"
                        >
                          {term}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {query && (
                <div className="mt-6" aria-live="polite">
                  <p className="text-[13px] font-semibold text-ink-soft">
                    {results.length ? `${results.length} results for “${query}”` : `No results for “${query}”. Try “baggy” or “skirt”.`}
                  </p>
                  <ul className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
                    {results.map((p, i) => (
                      <li key={p.id} className="anim-fade-up" style={{ '--delay': `${i * 40}ms` }}>
                        <button
                          type="button"
                          onClick={() => {
                            close()
                            openProduct(p.id)
                          }}
                          className="group block w-full text-left"
                        >
                          <Img id={p.images[0]} alt="" sizes="160px" className="aspect-3/4 rounded-[14px] bg-soft" imgClassName="transition-transform duration-700 group-hover:scale-105" />
                          <span className="mt-2 block text-[12px] leading-snug font-medium">{p.name}</span>
                          <span className="block text-[12px] font-bold tabular-nums">{formatPrice(p.price)}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

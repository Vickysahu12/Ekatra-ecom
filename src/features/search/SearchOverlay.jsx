import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { searchProducts } from '../../services/catalog'
import { useOverlay } from '../../hooks/useOverlay'
import { formatPrice } from '../../lib/format'
import { Img } from '../../components/ui/Img'
import { Icon } from '../../components/ui/Icon'

// Search panel that drops from the top. Results update as she types; Enter opens
// the full results page. Popular searches fill the empty state.

const POPULAR = ['Banarasi', 'Kanjivaram', 'Paithani', 'Red', 'Organza', 'Wedding', 'Suit set']
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
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  const close = useCallback(() => {
    setQuery('')
    onClose()
  }, [onClose])
  const focusRef = useOverlay(open, close)

  useEffect(() => {
    let active = true
    searchProducts(query, { limit: 8 }).then((r) => active && setResults(r))
    return () => {
      active = false
    }
  }, [query])

  const submit = (e) => {
    e.preventDefault()
    if (!query.trim()) return
    navigate(`/shop?q=${encodeURIComponent(query.trim())}`)
    close()
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Search">
          <motion.button
            type="button"
            tabIndex={-1}
            aria-label="Close search"
            className="absolute inset-0 h-full w-full cursor-default bg-ink/45 backdrop-blur-[2px]"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="absolute inset-x-0 top-0 max-h-[100dvh] overflow-y-auto bg-ivory pb-8 shadow-lift"
            initial={reduce ? { opacity: 0 } : { y: '-100%' }}
            animate={reduce ? { opacity: 1 } : { y: 0 }}
            exit={reduce ? { opacity: 0 } : { y: '-100%' }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="shell pt-[max(1.25rem,env(safe-area-inset-top))]">
              <form role="search" onSubmit={submit} className="flex items-center gap-3">
                <label className="flex h-13 flex-1 items-center gap-3 border-b-2 border-maroon">
                  <Icon name="search" size={22} className="text-maroon" />
                  <span className="sr-only">Search products</span>
                  <input
                    ref={focusRef}
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for sarees, fabrics, colours…"
                    className="serif h-full min-w-0 flex-1 bg-transparent text-[22px] outline-none placeholder:text-ink-soft/60 sm:text-[26px]"
                  />
                </label>
                <button type="button" onClick={close} className="press grid size-11 place-items-center rounded-full hover:bg-cream" aria-label="Close search">
                  <Icon name="close" size={22} />
                </button>
              </form>

              {!query && (
                <div className="mt-6">
                  <p className="caps text-[11px] text-gold">Popular searches</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {POPULAR.map((term) => (
                      <li key={term}>
                        <button
                          type="button"
                          onClick={() => setQuery(term)}
                          className="press h-9 rounded-full border border-line-strong px-4 text-[13px] transition-colors hover:border-maroon hover:text-maroon"
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
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="text-[13px] text-ink-soft">
                      {results.length ? `Showing top results for “${query}”` : `No results for “${query}”. Try “silk” or “red”.`}
                    </p>
                    {results.length > 0 && (
                      <button type="button" onClick={submit} className="caps link-line shrink-0 text-[11px] text-maroon">
                        See all results
                      </button>
                    )}
                  </div>
                  <ul className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-8">
                    {results.map((p, i) => (
                      <li key={p.id} className="anim-fade-up" style={{ '--delay': `${i * 35}ms` }}>
                        <Link to={`/product/${p.slug}`} onClick={close} className="group block">
                          <Img id={p.images[0]} alt="" sizes="140px" className="aspect-4/5 rounded-[2px]" position="50% 15%" imgClassName="transition-transform duration-700 group-hover:scale-105" />
                          <span className="mt-2 line-clamp-2 block text-[12px] leading-snug group-hover:text-maroon">{p.name}</span>
                          <span className="block text-[12px] font-semibold tabular-nums">{formatPrice(p.price)}</span>
                        </Link>
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

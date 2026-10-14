import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import { queryProducts, getFacets } from '../services/catalog'
import { categoryLabels, occasionLabels, priceBands } from '../data/content'
import { useShopQuery } from '../features/shop/useShopQuery'
import { FilterPanel } from '../features/shop/FilterPanel'
import { SortMenu } from '../features/shop/SortMenu'
import { ProductCard } from '../features/product/ProductCard'
import { Breadcrumbs } from '../components/ui/Breadcrumbs'
import { SideDrawer } from '../components/ui/SideDrawer'
import { Button } from '../components/ui/Button'
import { Icon } from '../components/ui/Icon'
import { Ornament } from '../components/ui/SectionHeading'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const PAGE = 12

function pageTitle(query) {
  if (query.q) return `Results for “${query.q}”`
  if (query.sale) return 'Sale'
  if (query.occasion.length === 1 && !query.category) return `${occasionLabels[query.occasion[0]]} Edit`
  if (query.fabric.length === 1 && !query.category) return `${query.fabric[0]} Collection`
  if (query.sort === 'new' && !query.category) return 'New Arrivals'
  return categoryLabels[query.category] ?? 'All Products'
}

export function ShopPage() {
  const shop = useShopQuery()
  const { query, toggle, setSort, setSale, clearAll, activeCount, update } = shop
  const { search } = useLocation()
  const [filtersOpen, setFiltersOpen] = useState(false)
  // Paging resets whenever the filters (URL) change.
  const [paging, setPaging] = useState({ key: '', n: PAGE })
  const gridTop = useRef(null)

  const pageKey = `${query.category ?? ''}?${search}`
  const visible = paging.key === pageKey ? paging.n : PAGE
  const products = useMemo(() => queryProducts(query), [query])
  const facets = useMemo(() => getFacets({ category: query.category }), [query.category])
  const title = pageTitle(query)
  useDocumentTitle(title)

  // New filter set: bring the grid into view if she has scrolled past it.
  useEffect(() => {
    const top = gridTop.current?.getBoundingClientRect().top ?? 0
    if (top < 0) gridTop.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [search, query.category])

  const chips = [
    ...query.fabric.map((v) => ({ key: `fabric-${v}`, label: v, onRemove: () => toggle('fabric', v) })),
    ...query.occasion.map((v) => ({ key: `occ-${v}`, label: occasionLabels[v] ?? v, onRemove: () => toggle('occasion', v) })),
    ...query.color.map((v) => ({ key: `color-${v}`, label: v, onRemove: () => toggle('color', v) })),
    ...query.price.map((v) => ({ key: `price-${v}`, label: priceBands.find((b) => b.id === v)?.label ?? v, onRemove: () => toggle('price', v) })),
    ...(query.sale ? [{ key: 'sale', label: 'On sale', onRemove: () => setSale(false) }] : []),
    ...(query.q ? [{ key: 'q', label: `“${query.q}”`, onRemove: () => update((n) => n.delete('q')) }] : []),
  ]

  return (
    <>
      {/* Page header */}
      <header className="border-b border-line bg-cream">
        <div className="shell py-8 text-center lg:py-12">
          <div className="flex justify-center">
            <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Shop', to: '/shop' }, ...(query.category || title !== 'All Products' ? [{ label: title }] : [])]} />
          </div>
          <h1 className="serif mt-3 text-[38px] leading-tight text-maroon sm:text-[48px]">{title}</h1>
          <Ornament className="mt-3" />
          <p className="mt-3 text-[14px] text-ink-soft">
            {products.length} {products.length === 1 ? 'piece' : 'pieces'}, handpicked and quality checked
          </p>
        </div>
      </header>

      <div ref={gridTop} className="shell scroll-mt-32 pt-6 lg:grid lg:grid-cols-[250px_1fr] lg:gap-10 lg:pt-10">
        {/* Desktop filters */}
        <aside className="hidden lg:block" aria-label="Filters">
          <div className="sticky top-36">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <p className="serif text-[22px] text-maroon">Filters</p>
              {activeCount > 0 && (
                <button type="button" onClick={clearAll} className="caps link-line text-[11px] text-maroon">
                  Clear all
                </button>
              )}
            </div>
            <FilterPanel facets={facets} shop={shop} />
          </div>
        </aside>

        <div>
          {/* Toolbar */}
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setFiltersOpen(true)}
              className="press flex h-10 items-center gap-2 rounded-soft border border-line-strong px-3.5 text-[13px] lg:hidden"
            >
              <Icon name="filter" size={16} /> Filters
              {activeCount > 0 && (
                <span className="grid size-5 place-items-center rounded-full bg-maroon text-[11px] text-ivory">{activeCount}</span>
              )}
            </button>
            <p className="hidden text-[13px] text-ink-soft lg:block">
              Showing {Math.min(visible, products.length)} of {products.length}
            </p>
            <SortMenu value={query.sort} onChange={setSort} />
          </div>

          {chips.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Active filters">
              {chips.map((c) => (
                <li key={c.key} className="anim-fade-in">
                  <button
                    type="button"
                    onClick={c.onRemove}
                    className="press flex h-8 items-center gap-1.5 rounded-full bg-sand px-3 text-[12px] transition-colors hover:bg-gold-soft"
                    aria-label={`Remove filter ${c.label}`}
                  >
                    {c.label} <Icon name="close" size={12} />
                  </button>
                </li>
              ))}
              <li>
                <button type="button" onClick={clearAll} className="caps link-line h-8 px-2 text-[11px] text-maroon">
                  Clear all
                </button>
              </li>
            </ul>
          )}

          {products.length === 0 ? (
            <div className="flex flex-col items-center py-24 text-center">
              <span className="grid size-16 place-items-center rounded-full bg-cream text-maroon">
                <Icon name="search" size={26} />
              </span>
              <p className="serif mt-5 text-[26px] text-maroon">No pieces match these filters</p>
              <p className="mt-2 max-w-[36ch] text-[14px] text-ink-soft">Try removing a filter or two, or browse the full collection.</p>
              <Button onClick={clearAll} variant="outline" className="mt-6">
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              <ul className="mt-6 grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-5 xl:grid-cols-3">
                {products.slice(0, visible).map((p, i) => (
                  <li key={p.id} className="anim-fade-up" style={{ '--delay': `${(i % PAGE) * 40}ms` }}>
                    <ProductCard product={p} priority={i < 4} sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 35vw, 50vw" />
                  </li>
                ))}
              </ul>
              {visible < products.length && (
                <div className="mt-12 flex flex-col items-center gap-3">
                  <div className="h-0.5 w-48 overflow-hidden rounded-full bg-sand">
                    <div className="h-full origin-left bg-maroon transition-transform duration-500" style={{ transform: `scaleX(${visible / products.length})` }} />
                  </div>
                  <p className="text-[12px] text-ink-soft">
                    You have seen {visible} of {products.length}
                  </p>
                  <Button variant="outline" onClick={() => setPaging({ key: pageKey, n: visible + PAGE })}>
                    Load More
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile filters */}
      <SideDrawer
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        title="Filters"
        count={activeCount || undefined}
        footer={
          <div className="grid grid-cols-2 gap-2 border-t border-line px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <Button variant="ghost" onClick={clearAll}>
              Clear
            </Button>
            <Button onClick={() => setFiltersOpen(false)}>Show {products.length}</Button>
          </div>
        }
      >
        <div className="flex-1 overflow-y-auto px-5">
          <FilterPanel facets={facets} shop={shop} />
        </div>
      </SideDrawer>
    </>
  )
}

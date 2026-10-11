import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { trendingFilters } from '../data/content'
import { listProducts } from '../services/catalog'
import { useAsync } from '../hooks/useAsync'
import { SectionHeading } from '../components/ui/SectionHeading'
import { ProductCard, ProductCardSkeleton } from '../features/product/ProductCard'
import { cn } from '../lib/cn'

const COUNT = 8

// Trending grid with filter chips. The active chip's dark pill slides to the new choice.
export function Trending() {
  const [filter, setFilter] = useState('all')
  const reduce = useReducedMotion()
  const { data: products, error, loading } = useAsync(
    () => listProducts(filter === 'all' ? { trending: true, limit: COUNT } : { category: filter, limit: COUNT }),
    [filter],
  )

  return (
    <section id="trending" className="pt-14 lg:pt-20" aria-labelledby="trending-title">
      <div className="shell">
        <SectionHeading id="trending-title" title="Trending now" link={{ label: 'See all', href: '#trending' }} />
      </div>

      <div
        role="tablist"
        aria-label="Filter trending products"
        className="no-scrollbar mx-auto mt-5 flex max-w-[1400px] gap-2 overflow-x-auto px-4 sm:px-6 lg:mt-6 lg:px-10"
      >
        {trendingFilters.map((f) => {
          const active = f.id === filter
          return (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(f.id)}
              className={cn(
                'press relative h-10 shrink-0 rounded-full px-5 text-[14px] font-semibold transition-colors duration-200',
                active ? 'text-bg' : 'bg-soft text-ink hover:bg-line',
              )}
            >
              {active && (
                <motion.span
                  layoutId="trending-chip"
                  className="absolute inset-0 rounded-full bg-ink"
                  transition={reduce ? { duration: 0 } : { type: 'spring', duration: 0.4, bounce: 0.15 }}
                />
              )}
              <span className="relative">{f.label}</span>
            </button>
          )
        })}
      </div>

      <div className="shell mt-6 lg:mt-8">
        {error ? (
          <p className="text-sm text-ink-soft">We couldn&apos;t load these pieces. Refresh to try again.</p>
        ) : (
          <ul className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:grid-cols-4 lg:gap-y-12">
            {loading
              ? Array.from({ length: 4 }, (_, i) => (
                  <li key={i}>
                    <ProductCardSkeleton />
                  </li>
                ))
              : products.map((p, i) => (
                  <li key={`${filter}-${p.id}`} className="anim-fade-up" style={{ '--delay': `${(i % 4) * 60 + Math.floor(i / 4) * 80}ms` }}>
                    <ProductCard product={p} />
                  </li>
                ))}
          </ul>
        )}
      </div>
    </section>
  )
}

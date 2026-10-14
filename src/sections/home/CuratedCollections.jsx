import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { collectionTabs } from '../../data/content'
import { queryProducts } from '../../services/catalog'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { Button } from '../../components/ui/Button'
import { ProductCard } from '../../features/product/ProductCard'
import { cn } from '../../lib/cn'

// Tabbed product grid. The maroon pill slides between tabs; cards re-enter on change.
export function CuratedCollections() {
  const [tab, setTab] = useState(collectionTabs[0].id)
  const reduce = useReducedMotion()
  const active = collectionTabs.find((t) => t.id === tab)
  const products = useMemo(() => queryProducts({ ...active.query, limit: 8 }), [active])
  const viewAll = active.query.category ? `/shop/${active.query.category}` : active.query.bestseller ? '/shop?sort=rating' : '/shop?sort=new'

  return (
    <section className="pt-16 lg:pt-24" aria-labelledby="curated-title">
      <SectionHeading id="curated-title" title="Curated Collections" />

      <div role="tablist" aria-label="Collections" className="no-scrollbar mt-7 flex justify-start gap-1 overflow-x-auto px-4 sm:justify-center">
        {collectionTabs.map((t) => {
          const selected = t.id === tab
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setTab(t.id)}
              className={cn(
                'caps relative h-9 shrink-0 rounded-full px-5 text-[11px] transition-colors duration-200',
                selected ? 'text-ivory' : 'text-ink hover:text-maroon',
              )}
            >
              {selected && (
                <motion.span
                  layoutId="curated-pill"
                  className="absolute inset-0 rounded-full bg-maroon"
                  transition={reduce ? { duration: 0 } : { type: 'spring', duration: 0.45, bounce: 0.15 }}
                />
              )}
              <span className="relative">{t.label}</span>
            </button>
          )
        })}
      </div>

      <ul className="shell mt-8 grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-5 lg:grid-cols-4 lg:gap-y-12">
        {products.map((p, i) => (
          <li key={`${tab}-${p.id}`} className="anim-fade-up" style={{ '--delay': `${(i % 4) * 60 + Math.floor(i / 4) * 90}ms` }}>
            <ProductCard product={p} />
          </li>
        ))}
      </ul>

      <div className="mt-10 flex justify-center">
        <Button to={viewAll} variant="outline">
          View All {active.label}
        </Button>
      </div>
    </section>
  )
}

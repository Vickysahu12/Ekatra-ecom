import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { lookbook } from '../../data/content'
import { getProductSync } from '../../services/catalog'
import { useCart } from '../../features/cart/CartContext'
import { useToast } from '../../features/toast/Toast'
import { DEFAULT_SAREE_VARIANT } from '../../features/product/ProductCard'
import { useReveal } from '../../hooks/useReveal'
import { formatPrice } from '../../lib/format'
import { Img } from '../../components/ui/Img'
import { Icon } from '../../components/ui/Icon'
import { Button } from '../../components/ui/Button'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { cn } from '../../lib/cn'

// "Style it your way": a set of pieces with checkboxes and one "Add selected" button
// whose total updates as she ticks items in and out.
export function CompleteTheLook() {
  const ref = useReveal()
  const { add, setOpen } = useCart()
  const { show } = useToast()
  const items = useMemo(() => lookbook.productIds.map(getProductSync), [])
  const [picked, setPicked] = useState(() => new Set(lookbook.productIds))
  const total = items.filter((p) => picked.has(p.id)).reduce((s, p) => s + p.price, 0)

  const toggle = (id) =>
    setPicked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const addAll = () => {
    items.filter((p) => picked.has(p.id)).forEach((p) => add(p.id, DEFAULT_SAREE_VARIANT))
    show({ title: `${picked.size} pieces added to bag`, body: 'Blouse pieces come unstitched', action: { label: 'View bag', onClick: () => setOpen(true) } })
  }

  return (
    <section ref={ref} className="shell pt-16 lg:pt-24" aria-labelledby="look-title">
      <SectionHeading id="look-title" title={lookbook.title} sub={lookbook.sub} />
      <div className="mt-9 rounded-soft border border-line bg-cream/60 p-4 sm:p-6 lg:p-8" data-reveal>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-6 lg:grid-cols-4 lg:gap-x-10">
          {items.map((p, i) => {
            const on = picked.has(p.id)
            return (
              <li key={p.id} className="relative">
                {i > 0 && (
                  <span className="absolute top-[38%] -left-[22px] hidden size-6 place-items-center rounded-full bg-ivory text-gold shadow-float lg:grid" aria-hidden="true">
                    <Icon name="plus" size={14} weight="bold" />
                  </span>
                )}
                <div className={cn('relative transition-opacity duration-300', !on && 'opacity-50')}>
                  <Link to={`/product/${p.slug}`} className="group block overflow-hidden rounded-soft">
                    <Img id={p.images[0]} alt={p.name} sizes="(min-width: 1024px) 22vw, 45vw" className="aspect-4/5" position="50% 15%" imgClassName="transition-transform duration-1000 group-hover:scale-105" />
                  </Link>
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={on}
                    aria-label={`Include ${p.name}`}
                    onClick={() => toggle(p.id)}
                    className={cn(
                      'press absolute top-2.5 left-2.5 grid size-7 place-items-center rounded-[3px] border transition-colors duration-200',
                      on ? 'border-maroon bg-maroon text-ivory' : 'border-ink/30 bg-ivory/90 text-transparent',
                    )}
                  >
                    <Icon name="check" size={15} weight="bold" />
                  </button>
                </div>
                <p className="mt-3 line-clamp-1 text-[14px]">{p.name}</p>
                <p className="text-[14px] font-semibold tabular-nums">{formatPrice(p.price)}</p>
              </li>
            )
          })}
        </ul>
        <div className="mt-7 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="text-[14px] text-ink-soft">
            {picked.size} of {items.length} selected
            <span className="ml-3 text-[20px] font-semibold text-ink tabular-nums">{formatPrice(total)}</span>
          </p>
          <Button onClick={addAll} disabled={picked.size === 0} size="lg" className="w-full sm:w-auto">
            <Icon name="bag" size={18} />
            Add Selected to Bag
          </Button>
        </div>
      </div>
    </section>
  )
}

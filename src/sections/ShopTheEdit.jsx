import { useState } from 'react'
import { edits } from '../data/content'
import { useReveal } from '../hooks/useReveal'
import { Img } from '../components/ui/Img'
import { Icon } from '../components/ui/Icon'
import { cn } from '../lib/cn'

// Shop by occasion. Desktop: a list in large type with a photo that follows the hovered
// line (after the khy category list). Phones: a swipeable row of photo cards.
export function ShopTheEdit() {
  const ref = useReveal()
  const [active, setActive] = useState(edits[0].id)

  return (
    <section ref={ref} className="pt-16 lg:pt-24" aria-labelledby="edit-title">
      <div className="shell">
        <h2 id="edit-title" className="title">
          Dress for the day
        </h2>
        <p className="mt-2 text-[15px] text-ink-soft">Outfits put together for wherever you are headed.</p>
      </div>

      {/* Phones and tablets */}
      <ul className="no-scrollbar mt-6 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 sm:scroll-px-6 sm:px-6 lg:hidden">
        {edits.map((e) => (
          <li key={e.id} className="w-[64vw] shrink-0 snap-start sm:w-[38vw]">
            <a href="#trending" className="relative block overflow-hidden rounded-card">
              <Img id={e.image} alt="" sizes="64vw" className="aspect-3/4" />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent to-50%" aria-hidden="true" />
              <span className="absolute inset-x-4 bottom-4 flex items-center justify-between text-[17px] font-bold text-bg">
                {e.name}
                <span className="grid size-9 place-items-center rounded-full bg-bg text-ink">
                  <Icon name="arrow-up-right" size={15} />
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>

      {/* Desktop */}
      <div className="shell mt-8 hidden h-[600px] grid-cols-[1fr_1fr] gap-5 lg:grid" data-reveal>
        <ul onMouseLeave={() => setActive(edits[0].id)} className="flex flex-col justify-center rounded-card bg-soft p-6">
          {edits.map((e) => (
            <li key={e.id}>
              <a
                href="#trending"
                onMouseEnter={() => setActive(e.id)}
                onFocus={() => setActive(e.id)}
                className={cn(
                  'flex items-center justify-between rounded-[16px] px-5 py-4 text-[30px] font-bold tracking-[-0.035em] transition-[background-color,color] duration-300',
                  active === e.id ? 'bg-bg text-ink' : 'text-ink/35',
                )}
              >
                {e.name}
                <Icon
                  name="arrow"
                  size={22}
                  className={cn('transition-[opacity,transform] duration-300', active === e.id ? 'opacity-100' : '-translate-x-2 opacity-0')}
                />
              </a>
            </li>
          ))}
        </ul>
        <div className="relative h-full overflow-hidden rounded-card" aria-hidden="true">
          {edits.map((e) => (
            <Img
              key={e.id}
              id={e.image}
              alt=""
              sizes="45vw"
              className={cn('absolute! inset-0 transition-opacity duration-500', active === e.id ? 'opacity-100' : 'opacity-0')}
              imgClassName={cn('transition-transform duration-[1200ms] ease-out', active === e.id ? 'scale-100' : 'scale-105')}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

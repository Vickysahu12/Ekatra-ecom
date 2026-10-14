import { Link } from 'react-router'
import { stylingGuide } from '../../data/content'
import { useReveal } from '../../hooks/useReveal'
import { Img } from '../../components/ui/Img'
import { Button } from '../../components/ui/Button'
import { Icon } from '../../components/ui/Icon'

// Sand panel with an intro on the left and four look cards that swipe on phones.
export function StylingGuide() {
  const ref = useReveal()

  return (
    <section ref={ref} className="shell pt-16 lg:pt-24" aria-labelledby="guide-title">
      <div className="grid gap-6 rounded-soft bg-sand p-5 sm:p-8 lg:grid-cols-[260px_1fr] lg:items-center lg:gap-10 lg:p-10">
        <div data-reveal>
          <h2 id="guide-title" className="serif text-[34px] leading-tight text-maroon italic sm:text-[40px]">
            Styling Guide
          </h2>
          <p className="mt-3 max-w-[30ch] text-[14px] leading-relaxed text-ink-soft">
            From everyday elegance to wedding nights, here is how our customers wear Ekatra.
          </p>
          <Button to="/shop" className="mt-6">
            Get Inspired
          </Button>
        </div>
        <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0">
          {stylingGuide.map((g, i) => (
            <li key={g.id} className="w-[58vw] shrink-0 snap-start sm:w-[34vw] lg:w-auto" data-reveal style={{ '--reveal-delay': `${i * 70}ms` }}>
              <Link to={g.to} className="group relative block overflow-hidden rounded-soft">
                <Img id={g.image} alt="" sizes="(min-width: 1024px) 18vw, 58vw" className="aspect-[3/4]" position="50% 15%" imgClassName="transition-transform duration-1000 ease-out group-hover:scale-105" />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-transparent" aria-hidden="true" />
                <span className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2 text-ivory">
                  <span className="serif text-[20px] leading-tight">{g.title}</span>
                  <Icon name="arrow" size={18} className="mb-1 shrink-0 -translate-x-1 opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

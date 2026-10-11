import { categories } from '../data/content'
import { useReveal } from '../hooks/useReveal'
import { Img } from '../components/ui/Img'

// Round category shortcuts on pastel tints. Swipeable row on phones.
export function CategoryCircles() {
  const ref = useReveal()

  return (
    <section ref={ref} className="pt-10 lg:pt-14" aria-labelledby="categories-title">
      <h2 id="categories-title" className="sr-only">
        Shop by category
      </h2>
      <ul className="no-scrollbar mx-auto flex max-w-[1400px] snap-x gap-4 overflow-x-auto px-4 sm:gap-6 sm:px-6 lg:justify-between lg:px-10">
        {categories.map((c, i) => (
          <li
            key={c.id}
            className="w-[76px] shrink-0 snap-start sm:w-[96px] lg:w-[120px]"
            data-reveal
            style={{ '--reveal-delay': `${i * 45}ms` }}
          >
            <a href="#trending" className="group block text-center">
              <span
                className="block overflow-hidden rounded-full ring-offset-2 ring-offset-bg transition-[box-shadow] duration-300 group-hover:ring-2 group-hover:ring-ink"
                style={{ backgroundColor: c.tint }}
              >
                <Img
                  id={c.image}
                  alt=""
                  sizes="120px"
                  className="aspect-square"
                  imgClassName="transition-transform duration-700 ease-out group-hover:scale-110"
                  position={c.focus ?? '50% 18%'}
                />
              </span>
              <span className={`mt-2 block text-[13px] font-semibold ${c.id === 'sale' ? 'text-rose' : ''}`}>{c.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

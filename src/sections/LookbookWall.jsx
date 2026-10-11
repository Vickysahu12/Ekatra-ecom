import { useCallback, useState } from 'react'
import { lookbook } from '../data/content'
import { site } from '../config/site'
import { useReveal } from '../hooks/useReveal'
import { Img } from '../components/ui/Img'
import { Icon } from '../components/ui/Icon'
import { Button } from '../components/ui/Button'
import { Lightbox } from '../features/archive/Lightbox'

const FIRST = 12
const altFor = (id) => `Ekatra lookbook photo ${lookbook.indexOf(id) + 1}`

// Square photo wall (after the khy community grid). 12 first, then all 40.
// Any tile opens the full-screen viewer.
export function LookbookWall() {
  const [expanded, setExpanded] = useState(false)
  const [viewing, setViewing] = useState(null)
  const visible = expanded ? lookbook : lookbook.slice(0, FIRST)
  const ref = useReveal([expanded])
  const close = useCallback(() => setViewing(null), [])

  return (
    <section id="lookbook" ref={ref} className="pt-16 lg:pt-24" aria-labelledby="lookbook-title">
      <div className="shell flex items-end justify-between gap-6">
        <div>
          <h2 id="lookbook-title" className="title">
            #ekatragirls
          </h2>
          <p className="mt-2 text-[15px] text-ink-soft">
            Tag {site.instagram} for a chance to be featured.
          </p>
        </div>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="press mb-1 hidden items-center gap-2 rounded-full bg-soft px-4 py-2.5 text-[14px] font-semibold transition-colors hover:bg-line sm:flex"
        >
          <Icon name="instagram" size={18} />
          Follow
        </a>
      </div>

      <ul className="mx-auto mt-6 grid max-w-[1400px] grid-cols-3 gap-1 px-1 sm:mt-8 sm:grid-cols-4 sm:gap-2 sm:px-6 lg:grid-cols-6 lg:px-10">
        {visible.map((id, i) => (
          <li key={id} data-reveal style={{ '--reveal-delay': `${(i % 6) * 40}ms` }}>
            <button
              type="button"
              onClick={() => setViewing(i)}
              className="group relative block w-full cursor-zoom-in overflow-hidden rounded-[6px] sm:rounded-[14px]"
              aria-label={`Open ${altFor(id)}`}
            >
              <Img
                id={id}
                alt={altFor(id)}
                sizes="(min-width: 1024px) 16vw, (min-width: 640px) 25vw, 33vw"
                className="aspect-square"
                position="50% 30%"
                imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              />
              <span className="absolute inset-0 grid place-items-center bg-ink/0 text-bg opacity-0 transition-[opacity,background-color] duration-300 group-hover:bg-ink/25 group-hover:opacity-100">
                <Icon name="expand" size={22} />
              </span>
            </button>
          </li>
        ))}
      </ul>

      {!expanded && (
        <div className="mt-6 flex justify-center">
          <Button variant="outline" onClick={() => setExpanded(true)}>
            View all {lookbook.length} looks
          </Button>
        </div>
      )}

      <Lightbox ids={visible} index={viewing} onClose={close} onChange={setViewing} altFor={altFor} />
    </section>
  )
}

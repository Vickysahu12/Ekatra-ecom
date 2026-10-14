import { useRef, useState } from 'react'
import { imageSet } from '../../data/media'
import { Img } from '../../components/ui/Img'
import { Icon } from '../../components/ui/Icon'
import { cn } from '../../lib/cn'

/**
 * Product gallery.
 * Desktop: thumbnails on the left, main photo with a hover magnifier (follows the cursor).
 * Phones: full-width swipeable photos with dots.
 */
export function Gallery({ images, name }) {
  const [active, setActive] = useState(0)
  const [zoom, setZoom] = useState(null) // { x, y } in % while hovering
  const railRef = useRef(null)

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 })
  }

  return (
    <div>
      {/* Phones */}
      <div className="relative -mx-4 sm:-mx-6 lg:hidden">
        <div
          ref={railRef}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto"
          onScroll={(e) => setActive(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
        >
          {images.map((id, i) => (
            <Img key={id} id={id} alt={`${name}, photo ${i + 1}`} sizes="100vw" priority={i === 0} className="aspect-4/5 w-full shrink-0 snap-start" position="50% 15%" />
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5" aria-hidden="true">
          {images.map((id, i) => (
            <span key={id} className={cn('h-1.5 rounded-full bg-ivory shadow transition-all duration-300', i === active ? 'w-6' : 'w-1.5 opacity-60')} />
          ))}
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden gap-4 lg:grid lg:grid-cols-[84px_1fr]">
        <ul className="flex flex-col gap-3" aria-label="Choose photo">
          {images.map((id, i) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                aria-label={`Show photo ${i + 1}`}
                aria-current={i === active}
                className={cn(
                  'block w-full overflow-hidden rounded-[2px] border-2 transition-colors duration-200',
                  i === active ? 'border-maroon' : 'border-transparent opacity-70 hover:opacity-100',
                )}
              >
                <Img id={id} alt="" sizes="84px" className="aspect-4/5" position="50% 15%" />
              </button>
            </li>
          ))}
        </ul>

        <div
          className="relative aspect-4/5 cursor-zoom-in overflow-hidden rounded-soft bg-cream"
          onMouseMove={onMove}
          onMouseLeave={() => setZoom(null)}
        >
          {images.map((id, i) => (
            <Img
              key={id}
              id={id}
              alt={i === active ? `${name}, photo ${i + 1}` : ''}
              sizes="(min-width: 1024px) 45vw, 100vw"
              priority={i === 0}
              position="50% 15%"
              className={cn('absolute! inset-0 transition-opacity duration-500', i === active ? 'opacity-100' : 'opacity-0')}
            />
          ))}
          {/* Magnifier layer: the full-res photo at 2.2x, panned to the cursor */}
          <div
            aria-hidden="true"
            className={cn('pointer-events-none absolute inset-0 bg-no-repeat transition-opacity duration-200', zoom ? 'opacity-100' : 'opacity-0')}
            style={{
              backgroundImage: `url(${imageSet(images[active]).src})`,
              backgroundSize: '220%',
              backgroundPosition: zoom ? `${zoom.x}% ${zoom.y}%` : 'center',
            }}
          />
          <span
            className={cn(
              'pointer-events-none absolute right-4 bottom-4 flex items-center gap-1.5 rounded-full bg-ivory/85 px-3 py-1.5 text-[12px] backdrop-blur-sm transition-opacity duration-200',
              zoom && 'opacity-0',
            )}
          >
            <Icon name="zoom" size={15} /> Hover to zoom
          </span>
        </div>
      </div>
    </div>
  )
}

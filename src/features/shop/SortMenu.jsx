import { useEffect, useRef, useState } from 'react'
import { sortOptions } from '../../data/content'
import { Icon } from '../../components/ui/Icon'
import { cn } from '../../lib/cn'

/** Custom sort dropdown. Opens from its trigger, closes on outside click or Escape. */
export function SortMenu({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const current = sortOptions.find((o) => o.id === value) ?? sortOptions[0]

  useEffect(() => {
    if (!open) return
    const onDown = (e) => !ref.current?.contains(e.target) && setOpen(false)
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex h-10 items-center gap-2 rounded-soft border border-line-strong px-3.5 text-[13px] transition-colors hover:border-maroon"
      >
        <span className="text-ink-soft">Sort:</span> {current.label}
        <Icon name="caret-down" size={13} className={cn('transition-transform duration-300', open && 'rotate-180')} />
      </button>
      <ul
        role="listbox"
        aria-label="Sort products"
        className={cn(
          'absolute top-[calc(100%+6px)] right-0 z-30 w-[220px] origin-top-right rounded-soft border border-line bg-ivory p-1.5 shadow-lift',
          'transition-[opacity,transform] duration-200 ease-out',
          open ? 'scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0',
        )}
      >
        {sortOptions.map((o) => (
          <li key={o.id}>
            <button
              type="button"
              role="option"
              aria-selected={o.id === value}
              tabIndex={open ? 0 : -1}
              onClick={() => {
                onChange(o.id)
                setOpen(false)
              }}
              className={cn(
                'flex w-full items-center justify-between rounded-[2px] px-3 py-2.5 text-left text-[14px] transition-colors hover:bg-cream',
                o.id === value && 'text-maroon',
              )}
            >
              {o.label}
              {o.id === value && <Icon name="check" size={15} />}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

import { Link } from 'react-router'
import { cn } from '../../lib/cn'

/** Small gold diamond flanked by hairlines, the brand's one ornament. */
export function Ornament({ className, light }) {
  return (
    <span className={cn('flex items-center justify-center gap-2', className)} aria-hidden="true">
      <span className={cn('h-px w-10 sm:w-16', light ? 'bg-gold-soft/60' : 'bg-gold/50')} />
      <span className={cn('size-1.5 rotate-45', light ? 'bg-gold-soft' : 'bg-gold')} />
      <span className={cn('h-px w-10 sm:w-16', light ? 'bg-gold-soft/60' : 'bg-gold/50')} />
    </span>
  )
}

/** Centred serif section title with the ornament, optional subtitle and "view all" link. */
export function SectionHeading({ title, sub, link, id, className, align = 'center' }) {
  if (align === 'left') {
    return (
      <div className={cn('flex items-end justify-between gap-6', className)}>
        <div>
          <h2 id={id} className="serif text-[30px] leading-tight text-maroon sm:text-[38px]">
            {title}
          </h2>
          {sub && <p className="mt-1.5 text-[14px] text-ink-soft">{sub}</p>}
        </div>
        {link && (
          <Link to={link.to} className="caps link-line mb-1.5 shrink-0 text-[12px] text-maroon">
            {link.label}
          </Link>
        )}
      </div>
    )
  }
  return (
    <div className={cn('text-center', className)}>
      <h2 id={id} className="serif text-[30px] leading-tight text-maroon sm:text-[38px]">
        {title}
      </h2>
      <Ornament className="mt-3" />
      {sub && <p className="mx-auto mt-3 max-w-[52ch] text-[15px] text-ink-soft">{sub}</p>}
      {link && (
        <Link to={link.to} className="caps link-line mt-4 inline-block text-[12px] text-maroon">
          {link.label}
        </Link>
      )}
    </div>
  )
}

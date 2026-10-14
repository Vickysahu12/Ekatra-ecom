import { Link } from 'react-router'
import { site } from '../../config/site'
import { cn } from '../../lib/cn'

// Serif wordmark with a small gold tagline. Swap for the client's logo SVG when it exists.
export function Wordmark({ className, light }) {
  return (
    <Link to="/" className={cn('inline-flex flex-col items-center leading-none', className)} aria-label={`${site.name} home`}>
      <span className={cn('serif text-[30px] font-semibold tracking-[0.02em] lg:text-[36px]', light ? 'text-ivory' : 'text-maroon')}>
        {site.name}
      </span>
      <span className={cn('caps mt-1 text-[8.5px] tracking-[0.32em] lg:text-[9.5px]', light ? 'text-gold-soft' : 'text-gold')}>
        {site.tagline}
      </span>
    </Link>
  )
}

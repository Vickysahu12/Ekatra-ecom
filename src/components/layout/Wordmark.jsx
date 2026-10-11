import { site } from '../../config/site'
import { cn } from '../../lib/cn'

// Lowercase heavy wordmark. Swap for the client's logo SVG when it exists.
export function Wordmark({ className }) {
  return (
    <a
      href="#top"
      className={cn('text-[26px] leading-none font-extrabold tracking-[-0.06em] lg:text-[30px]', className)}
      aria-label={`${site.name} home`}
    >
      {site.name}
    </a>
  )
}

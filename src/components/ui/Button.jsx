import { Link } from 'react-router'
import { cn } from '../../lib/cn'

const variants = {
  primary: 'bg-maroon text-ivory hover:bg-maroon-deep',
  gold: 'bg-gold text-white hover:bg-[#9a7239]',
  outline: 'border border-maroon text-maroon hover:bg-maroon hover:text-ivory',
  ghost: 'border border-line-strong text-ink hover:border-ink',
  light: 'bg-ivory text-maroon hover:bg-white',
}

const sizes = {
  sm: 'h-10 px-5 text-[12px]',
  md: 'h-12 px-7 text-[13px]',
  lg: 'h-14 px-9 text-[13px]',
}

/**
 * Rectangular button with uppercase label. Renders a router <Link> when given `to`,
 * an <a> for `href`, otherwise a <button>.
 */
export function Button({ to, href, variant = 'primary', size = 'md', className, children, ...props }) {
  const classes = cn(
    'press caps inline-flex items-center justify-center gap-2.5 rounded-soft whitespace-nowrap',
    'transition-[background-color,border-color,color,transform,opacity] duration-200 disabled:pointer-events-none disabled:opacity-50',
    variants[variant],
    sizes[size],
    className,
  )
  if (to) return <Link to={to} className={classes} {...props}>{children}</Link>
  if (href) return <a href={href} className={classes} {...props}>{children}</a>
  return <button type="button" className={classes} {...props}>{children}</button>
}

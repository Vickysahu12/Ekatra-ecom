import { cn } from '../../lib/cn'

const variants = {
  solid: 'bg-ink text-bg hover:bg-ink/85',
  white: 'bg-bg text-ink shadow-float hover:bg-white',
  outline: 'border border-line-strong text-ink hover:border-ink',
  soft: 'bg-soft text-ink hover:bg-line',
}

const sizes = {
  sm: 'h-10 px-5 text-[13px]',
  md: 'h-12 px-6 text-[14px]',
  lg: 'h-13 px-8 text-[15px]',
}

/** Pill button. Renders an <a> when given href. */
export function Button({ as, href, variant = 'solid', size = 'md', className, children, ...props }) {
  const Tag = as ?? (href ? 'a' : 'button')
  return (
    <Tag
      href={href}
      className={cn(
        'press inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap',
        'transition-[background-color,border-color,color,transform] duration-200',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}

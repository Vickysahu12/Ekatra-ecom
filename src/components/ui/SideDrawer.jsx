import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useOverlay } from '../../hooks/useOverlay'
import { Icon } from './Icon'

/** Right-hand panel used by the bag and the wishlist. Floats with a gap on desktop. */
export function SideDrawer({ open, onClose, title, count, children, footer }) {
  const reduce = useReducedMotion()
  const focusRef = useOverlay(open, onClose)

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={title}>
          <motion.button
            type="button"
            tabIndex={-1}
            aria-label={`Close ${title.toLowerCase()}`}
            className="absolute inset-0 h-full w-full cursor-default bg-ink/40 backdrop-blur-[3px]"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
          <motion.aside
            className="absolute inset-y-0 right-0 flex w-full max-w-[440px] flex-col bg-bg shadow-lift sm:inset-y-2 sm:right-2 sm:w-[calc(100%-16px)] sm:rounded-card"
            initial={reduce ? { opacity: 0 } : { transform: 'translateX(105%)' }}
            animate={reduce ? { opacity: 1 } : { transform: 'translateX(0%)' }}
            exit={reduce ? { opacity: 0 } : { transform: 'translateX(105%)' }}
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
          >
            <header className="flex items-center justify-between px-5 pt-[max(1.25rem,env(safe-area-inset-top))] pb-4">
              <p className="text-[20px] font-bold tracking-tight">
                {title}
                {count !== undefined && <span className="ml-1.5 text-[15px] font-medium text-ink-soft">({count})</span>}
              </p>
              <button
                ref={focusRef}
                type="button"
                onClick={onClose}
                className="press grid size-10 place-items-center rounded-full bg-soft hover:bg-line"
                aria-label={`Close ${title.toLowerCase()}`}
              >
                <Icon name="close" size={18} />
              </button>
            </header>
            <div className="flex min-h-0 flex-1 flex-col">{children}</div>
            {footer}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}

/** Empty state shared by both drawers. */
export function DrawerEmpty({ icon, title, body, action }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-10 pb-16 text-center">
      <span className="grid size-16 place-items-center rounded-full bg-blush">
        <Icon name={icon} size={26} />
      </span>
      <p className="mt-5 text-[18px] font-bold">{title}</p>
      <p className="mt-2 max-w-[30ch] text-[14px] text-ink-soft">{body}</p>
      {action}
    </div>
  )
}

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useOverlay } from '../../hooks/useOverlay'
import { Icon } from './Icon'

/** Centred dialog that scales in from slightly smaller. */
export function Modal({ open, onClose, title, children }) {
  const reduce = useReducedMotion()
  const focusRef = useOverlay(open, onClose)

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4" role="dialog" aria-modal="true" aria-label={title}>
          <motion.button
            type="button"
            tabIndex={-1}
            aria-label="Close"
            className="absolute inset-0 h-full w-full cursor-default bg-ink/45 backdrop-blur-[2px]"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="relative max-h-[90dvh] w-full max-w-[560px] overflow-y-auto rounded-soft bg-ivory p-6 shadow-lift sm:p-8"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98, transition: { duration: 0.15 } }}
            transition={{ type: 'spring', duration: 0.4, bounce: 0.12 }}
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="serif text-[28px] text-maroon">{title}</h2>
              <button ref={focusRef} type="button" onClick={onClose} aria-label="Close" className="press -mt-1 -mr-2 grid size-10 place-items-center rounded-full hover:bg-cream">
                <Icon name="close" size={20} />
              </button>
            </div>
            <div className="mt-4">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

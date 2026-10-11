import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { site } from '../../config/site'
import { categories } from '../../data/content'
import { useOverlay } from '../../hooks/useOverlay'
import { Img } from '../ui/Img'
import { Icon } from '../ui/Icon'
import { Wordmark } from './Wordmark'
import { cn } from '../../lib/cn'

// Phone menu: slides in from the left with big links and category thumbnails.
export function MobileMenu({ open, onClose }) {
  const reduce = useReducedMotion()
  const focusRef = useOverlay(open, onClose)

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <motion.button
            type="button"
            tabIndex={-1}
            aria-label="Close menu"
            className="absolute inset-0 h-full w-full cursor-default bg-ink/40 backdrop-blur-[3px]"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.nav
            aria-label="Mobile"
            className="absolute inset-y-0 left-0 flex w-[86%] max-w-[380px] flex-col overflow-y-auto bg-bg"
            initial={reduce ? { opacity: 0 } : { x: '-100%' }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: '-100%' }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="flex h-16 items-center justify-between px-5 pt-[env(safe-area-inset-top)]">
              <Wordmark />
              <button
                ref={focusRef}
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="press grid size-10 place-items-center rounded-full bg-soft"
              >
                <Icon name="close" size={18} />
              </button>
            </div>

            <ul className="mt-4 px-5">
              {site.nav.map((item, i) => (
                <li key={item.label} className="anim-fade-up" style={{ '--delay': `${60 + i * 40}ms` }}>
                  <a
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      'flex items-center justify-between border-b border-line py-4 text-[22px] font-bold tracking-tight',
                      item.accent && 'text-rose',
                    )}
                  >
                    {item.label}
                    <Icon name="caret-right" size={18} className="text-ink-soft" />
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-8 px-5 text-[13px] font-semibold text-ink-soft">Shop by category</p>
            <ul className="mt-3 grid grid-cols-3 gap-x-3 gap-y-4 px-5">
              {categories.slice(0, 6).map((c) => (
                <li key={c.id}>
                  <a href="#trending" onClick={onClose} className="block text-center">
                    <span className="block overflow-hidden rounded-[16px]" style={{ backgroundColor: c.tint }}>
                      <Img id={c.image} alt="" sizes="110px" className="aspect-square" imgClassName="object-top" />
                    </span>
                    <span className="mt-1.5 block text-[12px] font-medium">{c.name}</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-auto space-y-3 px-5 pt-10 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-[14px] text-ink-soft">
              <a href="#" className="flex items-center gap-2.5">
                <Icon name="user" size={18} className="text-ink" /> Sign in or create account
              </a>
              <a href="#" className="flex items-center gap-2.5">
                <Icon name="chat" size={18} className="text-ink" /> Help and contact
              </a>
            </div>
          </motion.nav>
        </div>
      )}
    </AnimatePresence>
  )
}

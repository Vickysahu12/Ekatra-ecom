import { useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { imageSet } from '../../data/media'
import { Icon } from '../../components/ui/Icon'
import { useOverlay } from '../../hooks/useOverlay'

/**
 * Full-screen viewer for a list of media ids.
 * Arrow keys / buttons / horizontal swipe to move, Escape or backdrop to close.
 */
export function Lightbox({ ids, index, onClose, onChange, altFor }) {
  const reduce = useReducedMotion()
  const open = index !== null
  const count = ids.length
  // Escape, scroll lock and focus come from the shared overlay hook.
  const closeRef = useOverlay(open, onClose)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'ArrowRight') onChange((index + 1) % count)
      if (e.key === 'ArrowLeft') onChange((index - 1 + count) % count)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, index, count, onChange])

  const img = open ? imageSet(ids[index]) : null

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col bg-ink/95 text-bg"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="shell flex h-16 shrink-0 items-center justify-between">
            <p className="text-[13px] tabular-nums text-bg/70">
              {index + 1} / {count}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="press -mr-2 grid size-10 place-items-center"
              aria-label="Close viewer"
            >
              <Icon name="close" size={22} />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-6 sm:px-20">
            {/* Backdrop click closes */}
            <button type="button" aria-label="Close viewer" tabIndex={-1} className="absolute inset-0" onClick={onClose} />

            <motion.img
              key={img.id}
              src={img.src}
              alt={altFor(ids[index])}
              width={img.w}
              height={img.h}
              className="relative h-auto max-h-full w-auto max-w-full touch-pan-y select-none"
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              drag={reduce ? false : 'x'}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={(_, info) => {
                const swipe = info.offset.x
                const fast = Math.abs(info.velocity.x) > 400
                if (swipe < -60 || (fast && swipe < 0)) onChange((index + 1) % count)
                else if (swipe > 60 || (fast && swipe > 0)) onChange((index - 1 + count) % count)
              }}
            />

            <button
              type="button"
              onClick={() => onChange((index - 1 + count) % count)}
              className="press absolute left-2 hidden size-12 place-items-center sm:grid lg:left-6"
              aria-label="Previous image"
            >
              <Icon name="caret-left" size={26} />
            </button>
            <button
              type="button"
              onClick={() => onChange((index + 1) % count)}
              className="press absolute right-2 hidden size-12 place-items-center sm:grid lg:right-6"
              aria-label="Next image"
            >
              <Icon name="caret-right" size={26} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

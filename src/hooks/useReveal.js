import { useEffect, useRef } from 'react'

/**
 * Fades children marked with [data-reveal] up into place the first time
 * they enter the viewport. Pass deps when the marked children render later.
 * Styles live in styles/index.css and are skipped under prefers-reduced-motion.
 */
export function useReveal(deps = []) {
  const ref = useRef(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const targets = root.matches('[data-reveal]') ? [root] : [...root.querySelectorAll('[data-reveal]')]

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.dataset.reveal = 'in'
          io.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    )
    targets.forEach((t) => t.dataset.reveal !== 'in' && io.observe(t))
    return () => io.disconnect()
    // Re-scan when content that renders later (async data, filters) changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return ref
}

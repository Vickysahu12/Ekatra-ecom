import { useState } from 'react'
import { imageSet } from '../../data/media'
import { cn } from '../../lib/cn'

/**
 * Responsive image backed by the media manifest.
 * - Fills its parent by default (`fill`), or reserves its own aspect ratio.
 * - Shows the photo's average tone until the file loads, then fades in.
 * - Cut-out shots on pure white are multiplied onto the page tone so they sit in the palette.
 * - `position` sets object-position, for crops that should favour the face or the hem.
 */
export function Img({ id, alt = '', sizes = '100vw', priority = false, fill = true, position, className, imgClassName }) {
  const [loaded, setLoaded] = useState(false)
  const img = imageSet(id)

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      style={{ backgroundColor: img.knockout ? 'var(--color-soft)' : img.tone, aspectRatio: fill ? undefined : `${img.w} / ${img.h}` }}
    >
      <img
        src={img.src}
        srcSet={`${img.srcSm} 640w, ${img.src} ${img.w}w`}
        sizes={sizes}
        width={img.w}
        height={img.h}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
        style={position ? { objectPosition: position } : undefined}
        onLoad={() => setLoaded(true)}
        ref={(el) => {
          // Cached images can finish before React attaches onLoad.
          if (el?.complete && el.naturalWidth) setLoaded(true)
        }}
        className={cn(
          'absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out',
          loaded ? 'opacity-100' : 'opacity-0',
          img.knockout && 'mix-blend-multiply',
          imgClassName,
        )}
      />
    </div>
  )
}

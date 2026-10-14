import { useState } from 'react'
import { imageSet } from '../../data/media'
import { cn } from '../../lib/cn'

/**
 * Product photo backed by the media manifest (all photos are 4:5).
 * - Fills its parent; set the box size / aspect with className.
 * - Shows the photo's average colour until the file loads, then fades in.
 * - `position` sets object-position, e.g. '50% 20%' to favour the face.
 */
export function Img({ id, alt = '', sizes = '100vw', priority = false, position, className, imgClassName }) {
  const [loaded, setLoaded] = useState(false)
  const img = imageSet(id)

  return (
    <div className={cn('relative overflow-hidden', className)} style={{ backgroundColor: img.tone }}>
      <img
        src={img.src}
        srcSet={`${img.srcSm} 480w, ${img.src} 1000w`}
        sizes={sizes}
        width={1000}
        height={1250}
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
          imgClassName,
        )}
      />
    </div>
  )
}

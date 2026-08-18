import { useState } from 'react'
import type { ImageRef } from '@/data'
import { asset, cn } from '@/lib/utils'
import { GeneratedPlate } from './GeneratedPlate'

/**
 * A project image, or a generated technical plate when there is not one yet.
 *
 * Images are lazy-loaded and decoded off the main thread, and fade in once
 * decoded so a slow connection does not make the grid flicker. Supplying
 * `width` and `height` in the data file stops the layout shifting.
 */
export function Thumbnail({
  image,
  seed,
  category,
  label,
  className,
  /** Turn off for the first card on a page, which is usually above the fold. */
  lazy = true,
  sizes,
}: {
  image?: ImageRef
  seed: string
  category?: string
  label?: string
  className?: string
  lazy?: boolean
  sizes?: string
}) {
  const [loaded, setLoaded] = useState(false)

  if (!image) {
    return (
      <GeneratedPlate
        seed={seed}
        category={category}
        label={label}
        className={cn('size-full object-cover', className)}
      />
    )
  }

  return (
    <img
      src={asset(image.src)}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      loading={lazy ? 'lazy' : 'eager'}
      decoding="async"
      onLoad={() => setLoaded(true)}
      className={cn(
        'size-full object-cover transition-opacity duration-500',
        loaded ? 'opacity-100' : 'opacity-0',
        className,
      )}
    />
  )
}

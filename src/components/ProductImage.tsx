import { useEffect, useState } from 'react'

interface ProductImageProps {
  urls: string[]
  alt: string
  className?: string
}

/**
 * Renders the first URL that loads. `items` documents carry the image in one of
 * a few shapes (see catalog.ts `resolveImages`), and generated R2 variants may
 * or may not exist, so each candidate is tried in turn before falling back to a
 * generated placeholder.
 */
export function ProductImage({ urls, alt, className }: ProductImageProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    setIndex(0)
  }, [urls])

  const placeholder = `https://placehold.co/600x600/f1f5f9/94a3b8?text=${encodeURIComponent(alt || 'Ragwa')}`
  const src = index < urls.length ? urls[index] : placeholder

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={className}
      onError={() => setIndex(i => i + 1)}
    />
  )
}

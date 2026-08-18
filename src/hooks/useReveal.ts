import { useEffect, useRef } from 'react'

/**
 * Reveal an element the first time it scrolls into view.
 *
 * Attach the returned ref and the `reveal` class:
 *   const ref = useReveal<HTMLDivElement>()
 *   <div ref={ref} className="reveal">…</div>
 *
 * The observer disconnects after firing, so nothing keeps running once the
 * page has been read. Under `prefers-reduced-motion` the element is marked
 * revealed immediately and no observer is created at all — the CSS also
 * neutralizes the transition, so this is belt and braces on purpose: content
 * must never be left invisible because an observer did not fire.
 */
export function useReveal<T extends HTMLElement>(options?: { rootMargin?: string }) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      el.dataset.revealed = 'true'
      return
    }

    // Already on screen at mount (above the fold): show it without waiting.
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.dataset.revealed = 'true'
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            ;(entry.target as HTMLElement).dataset.revealed = 'true'
            observer.disconnect()
          }
        }
      },
      { rootMargin: options?.rootMargin ?? '0px 0px -12% 0px', threshold: 0.01 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [options?.rootMargin])

  return ref
}

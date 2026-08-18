import type { ElementType, ReactNode } from 'react'
import { useReveal } from '@/hooks/useReveal'
import { cn } from '@/lib/utils'

interface RevealProps {
  children: ReactNode
  /** Which element to render. Defaults to a div. */
  as?: ElementType
  className?: string
  /** Stagger, in milliseconds. Keep small — 60 to 120 is plenty. */
  delay?: number
}

/**
 * Fades and lifts its children in the first time they scroll into view.
 * Does nothing at all when the visitor prefers reduced motion.
 */
export function Reveal({ children, as: Tag = 'div', className, delay = 0 }: RevealProps) {
  const ref = useReveal<HTMLElement>()
  return (
    <Tag
      ref={ref}
      className={cn('reveal', className)}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  )
}

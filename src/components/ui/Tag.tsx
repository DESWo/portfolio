import type { ReactNode } from 'react'
import { copy } from '@/data'
import { cn, fill } from '@/lib/utils'

/**
 * A small flat label. Used for categories, technologies and research topics.
 * Deliberately not a pill — pills everywhere is the fastest way to make a site
 * look like a template.
 */
export function Tag({
  children,
  className,
  emphasis = 'normal',
}: {
  children: ReactNode
  className?: string
  emphasis?: 'normal' | 'quiet'
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center border px-2 py-[0.2rem] font-mono text-[0.6875rem] tracking-[0.06em] whitespace-nowrap',
        emphasis === 'normal'
          ? 'border-rule-strong/70 text-ink-muted'
          : 'border-rule text-ink-faint',
        className,
      )}
    >
      {children}
    </span>
  )
}

export function TagRow({
  items,
  max,
  className,
  emphasis,
}: {
  items: readonly string[]
  /** Show at most this many, then "+n". Omit to show all of them. */
  max?: number
  className?: string
  emphasis?: 'normal' | 'quiet'
}) {
  if (items.length === 0) return null
  const shown = max ? items.slice(0, max) : items
  const hidden = items.length - shown.length

  return (
    <ul className={cn('flex flex-wrap gap-1.5', className)}>
      {shown.map((item) => (
        <li key={item}>
          <Tag emphasis={emphasis}>{item}</Tag>
        </li>
      ))}
      {hidden > 0 ? (
        <li>
          <Tag emphasis="quiet">{fill(copy.small.moreTags, { count: hidden })}</Tag>
        </li>
      ) : null}
    </ul>
  )
}

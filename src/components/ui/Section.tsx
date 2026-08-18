import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Reveal } from './Reveal'

/**
 * The standard page gutter. Everything on the site sits inside one of these,
 * so the left and right margins line up from page to page. The maximum width
 * is `--content-width` in index.css.
 */
export function Container({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn('mx-auto w-full max-w-[var(--content-width)] px-5 sm:px-8 lg:px-12', className)}
    >
      {children}
    </div>
  )
}

/**
 * The small mono label above a section heading. Everywhere else on the site
 * this is the plain `.overline` class from index.css; this wrapper exists only
 * for SectionHeader below.
 */
function Overline({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn('overline', className)}>{children}</p>
}

/**
 * A horizontal section of the page, with the hairline rule that separates it
 * from the one before.
 */
export function Section({
  children,
  className,
  id,
  divider = true,
  /**
   * Set false to supply your own vertical padding in `className`. Two classes
   * of equal specificity do not reliably override each other in Tailwind, so
   * this is a switch rather than something to fight with `pt-*`.
   */
  padded = true,
  as: Tag = 'section',
}: {
  children: ReactNode
  className?: string
  id?: string
  divider?: boolean
  padded?: boolean
  as?: 'section' | 'div'
}) {
  return (
    <Tag
      id={id}
      className={cn(
        padded && 'py-16 sm:py-20 lg:py-24',
        divider && 'border-t border-rule',
        className,
      )}
    >
      {children}
    </Tag>
  )
}

/**
 * The heading block that opens a section: a numbered overline, a title, and an
 * optional line of description with an optional action on the right.
 */
export function SectionHeader({
  overline,
  title,
  description,
  action,
  className,
}: {
  overline?: ReactNode
  title: ReactNode
  description?: ReactNode
  action?: ReactNode
  className?: string
}) {
  return (
    <Reveal className={cn('mb-10 sm:mb-14', className)}>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          {overline ? <Overline className="mb-3">{overline}</Overline> : null}
          <h2 className="text-heading font-semibold text-ink">{title}</h2>
          {description ? (
            <p className="mt-4 text-[0.975rem] leading-relaxed text-ink-muted sm:text-base">
              {description}
            </p>
          ) : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </Reveal>
  )
}

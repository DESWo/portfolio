import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { asset, cn, isExternal } from '@/lib/utils'
import { Icon, type IconGlyph } from './Icon'

type Variant = 'solid' | 'outline' | 'text'

const BASE =
  'inline-flex items-center gap-2 font-medium transition-colors duration-150 disabled:opacity-50'

const VARIANTS: Record<Variant, string> = {
  solid:
    'bg-ink px-4 py-2.5 text-[0.9rem] text-paper hover:bg-accent focus-visible:bg-accent',
  outline:
    'border border-rule-strong px-4 py-2.5 text-[0.9rem] text-ink hover:border-accent hover:text-accent',
  text: 'text-[0.9rem] text-ink hover:text-accent',
}

interface ActionLinkProps {
  /**
   * Where it goes. A path starting with `/` that is not a file becomes a
   * client-side route; anything else (http, mailto, a PDF under public/) is a
   * real link with the right attributes set for you.
   */
  href: string
  children: ReactNode
  variant?: Variant
  icon?: IconGlyph
  /** Put the icon after the label instead of before it. Defaults to true. */
  iconTrailing?: boolean
  className?: string
}

/** Paths that are inside the app rather than files served from public/. */
function isRoute(href: string): boolean {
  return href.startsWith('/') && !/\.[a-z0-9]{2,5}$/i.test(href)
}

export function ActionLink({
  href,
  children,
  variant = 'text',
  icon,
  iconTrailing = true,
  className,
}: ActionLinkProps) {
  const external = isExternal(href)
  const glyph: IconGlyph | undefined = icon ?? (external ? 'arrow-up-right' : undefined)

  const content = (
    <>
      {glyph && !iconTrailing ? <Icon name={glyph} className="shrink-0" /> : null}
      <span
        className={cn(
          variant === 'text' &&
            'underline decoration-rule-strong decoration-1 underline-offset-[5px] transition-colors group-hover:decoration-accent',
        )}
      >
        {children}
      </span>
      {glyph && iconTrailing ? (
        <Icon
          name={glyph}
          className={cn(
            'shrink-0 transition-transform duration-200',
            glyph === 'arrow-right' && 'group-hover:translate-x-0.5',
            glyph === 'arrow-up-right' && 'group-hover:-translate-y-0.5 group-hover:translate-x-0.5',
          )}
        />
      ) : null}
    </>
  )

  const classes = cn('group', BASE, VARIANTS[variant], className)

  if (isRoute(href)) {
    return (
      <Link to={href} className={classes}>
        {content}
      </Link>
    )
  }

  return (
    <a
      href={asset(href)}
      className={classes}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {content}
    </a>
  )
}

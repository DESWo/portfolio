import type { ReactNode } from 'react'
import { Container } from './Section'
import { Reveal } from './Reveal'

/** The masthead every page except the home page opens with. */
export function PageHeader({
  overline,
  title,
  description,
  meta,
  children,
}: {
  overline?: ReactNode
  title: ReactNode
  description?: ReactNode
  /** A small mono line under the description — counts, dates, status. */
  meta?: ReactNode
  children?: ReactNode
}) {
  return (
    <Container className="pt-12 pb-10 sm:pt-16 sm:pb-12 lg:pt-20">
      <Reveal className="max-w-3xl">
        {overline ? <p className="overline mb-5">{overline}</p> : null}
        <h1 className="text-title font-semibold text-ink">{title}</h1>
        {description ? <p className="mt-5 text-lead text-ink-muted">{description}</p> : null}
        {meta ? (
          <p className="mt-6 font-mono text-[0.6875rem] tracking-[0.12em] text-ink-faint uppercase">
            {meta}
          </p>
        ) : null}
      </Reveal>
      {children}
    </Container>
  )
}

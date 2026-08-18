import { Link } from 'react-router-dom'
import type { Project } from '@/data'
import { categoryLabel } from '@/data'
import { cn } from '@/lib/utils'
import { Thumbnail } from '@/components/media/Thumbnail'
import { StatusPill } from '@/components/ui/StatusPill'
import { TagRow } from '@/components/ui/Tag'
import { Icon } from '@/components/ui/Icon'

/**
 * The standard project card: image plate, a line of metadata, title, summary
 * and the tools used.
 *
 * The whole card is one link. The visible affordances — the image lifting, the
 * title taking the accent colour, the arrow sliding — are all driven from the
 * group hover on that single link, so there is exactly one tab stop per card
 * and no nested interactive elements.
 */
export function ProjectCard({
  project,
  priority = false,
  className,
  headingLevel = 3,
}: {
  project: Project
  /** Load the image eagerly. Use for the first card or two on a page. */
  priority?: boolean
  className?: string
  /**
   * Which heading tag the title renders as. Use 2 when the cards sit directly
   * under the page's h1, and 3 when they sit inside a section that already has
   * an h2 — heading levels should never skip a step.
   */
  headingLevel?: 2 | 3
}) {
  const primary = project.categories[0]
  const Heading = headingLevel === 2 ? 'h2' : 'h3'

  return (
    <article className={cn('group', className)}>
      <Link
        to={`/projects/${project.slug}`}
        className="block focus-visible:outline-offset-4"
        aria-label={`${project.title} — ${project.summary}`}
      >
        <div className="relative aspect-[8/5] overflow-hidden border border-rule bg-paper-sunken">
          <Thumbnail
            image={project.thumbnail}
            seed={project.slug}
            category={primary}
            label={primary ? categoryLabel(primary) : undefined}
            lazy={!priority}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ boxShadow: 'inset 0 0 0 1px var(--accent)' }}
          />
        </div>

        <div className="mt-5">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[0.6875rem] tracking-[0.1em] text-ink-faint uppercase">
            {primary ? <span className="text-ink-muted">{categoryLabel(primary)}</span> : null}
            <span aria-hidden="true" className="text-rule-strong">
              /
            </span>
            <span>{project.date}</span>
            <StatusPill status={project.status} className="ml-auto" />
          </div>

          <Heading className="mt-3 flex items-start gap-2 text-[1.1875rem] leading-snug font-semibold tracking-[-0.015em] text-ink transition-colors duration-200 group-hover:text-accent">
            {project.title}
            <Icon
              name="arrow-right"
              size="0.9em"
              className="mt-[0.35em] shrink-0 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
            />
          </Heading>

          {project.subtitle ? (
            <p className="mt-1 text-[0.875rem] text-ink-faint">{project.subtitle}</p>
          ) : null}

          <p className="mt-2.5 text-[0.925rem] leading-relaxed text-ink-muted">{project.summary}</p>

          {project.technologies?.length ? (
            <TagRow items={project.technologies} max={4} className="mt-4" emphasis="quiet" />
          ) : null}
        </div>
      </Link>
    </article>
  )
}

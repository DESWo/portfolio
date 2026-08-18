import { Link } from 'react-router-dom'
import type { Project } from '@/data'
import { categoryLabel } from '@/data'
import { cn } from '@/lib/utils'
import { Thumbnail } from '@/components/media/Thumbnail'
import { StatusPill } from '@/components/ui/StatusPill'
import { TagRow } from '@/components/ui/Tag'
import { ActionLink } from '@/components/ui/ActionLink'
import { Reveal } from '@/components/ui/Reveal'

/**
 * The home-page treatment for a featured project: a large plate on one side
 * and the write-up on the other, alternating sides down the page so the
 * section does not read as a stack of identical cards.
 */
export function FeaturedProject({
  project,
  index,
  priority = false,
}: {
  project: Project
  index: number
  priority?: boolean
}) {
  const flipped = index % 2 === 1
  const primary = project.categories[0]

  return (
    <Reveal
      as="article"
      className={cn(
        'group grid items-center gap-8 lg:gap-14',
        // The wider track always belongs to the image, whichever side it is on.
        flipped
          ? 'lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]'
          : 'lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]',
      )}
    >
      <div className={cn(flipped && 'lg:order-2')}>
        <Link
          to={`/projects/${project.slug}`}
          tabIndex={-1}
          aria-hidden="true"
          className="block aspect-[8/5] overflow-hidden border border-rule bg-paper-sunken"
        >
          <Thumbnail
            image={project.thumbnail}
            seed={project.slug}
            category={primary}
            label={primary ? categoryLabel(primary) : undefined}
            lazy={!priority}
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="transition-transform duration-[700ms] ease-out group-hover:scale-[1.02]"
          />
        </Link>
      </div>

      <div className={cn(flipped && 'lg:order-1')}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.6875rem] tracking-[0.1em] text-ink-faint uppercase">
          <span className="text-accent tabular">{String(index + 1).padStart(2, '0')}</span>
          <span className="text-ink-muted">
            {project.categories.slice(0, 2).map(categoryLabel).join(' · ')}
          </span>
          <span aria-hidden="true" className="text-rule-strong">
            /
          </span>
          <span>{project.date}</span>
        </div>

        <h3 className="mt-4 text-title font-semibold text-ink">
          <Link
            to={`/projects/${project.slug}`}
            className="transition-colors duration-200 hover:text-accent"
          >
            {project.title}
          </Link>
        </h3>

        {project.subtitle ? (
          <p className="mt-2 font-serif text-[1.0625rem] text-ink-faint italic">
            {project.subtitle}
          </p>
        ) : null}

        <p className="mt-4 text-lead text-ink-muted">{project.summary}</p>

        {project.achievements?.length ? (
          <ul className="mt-5 space-y-2">
            {project.achievements.slice(0, 2).map((item) => (
              <li key={item} className="relative pl-5 text-[0.875rem] leading-relaxed text-ink-muted">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-[0.68em] block h-px w-3 bg-accent"
                />
                {item}
              </li>
            ))}
          </ul>
        ) : null}

        {project.technologies?.length ? (
          <TagRow items={project.technologies} max={5} className="mt-5" emphasis="quiet" />
        ) : null}

        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
          <ActionLink href={`/projects/${project.slug}`} icon="arrow-right" variant="text">
            {project.caseStudy ? 'Read the case study' : 'Project details'}
          </ActionLink>
          {project.liveDemo ? (
            <ActionLink href={project.liveDemo} variant="text">
              Live
            </ActionLink>
          ) : null}
          {project.repo ? (
            <ActionLink href={project.repo} variant="text">
              Source
            </ActionLink>
          ) : null}
          <StatusPill status={project.status} />
        </div>
      </div>
    </Reveal>
  )
}

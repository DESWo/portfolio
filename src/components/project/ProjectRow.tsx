import { Link } from 'react-router-dom'
import type { Project } from '@/data'
import { categoryLabel } from '@/data'
import { StatusPill } from '@/components/ui/StatusPill'
import { Icon } from '@/components/ui/Icon'

/**
 * The dense alternative to the card grid — a drawing index rather than a
 * gallery. Same information, one line each, scannable in a glance. On a phone
 * it becomes a two-line stack rather than a squashed table.
 */
export function ProjectRow({ project, index }: { project: Project; index: number }) {
  return (
    <li className="group border-b border-rule">
      <Link
        to={`/projects/${project.slug}`}
        className="grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 gap-y-1.5 py-5 sm:grid-cols-[3rem_minmax(0,1fr)_minmax(0,9rem)_minmax(0,10rem)_1.5rem] sm:items-center sm:gap-x-6"
      >
        <span className="font-mono text-[0.75rem] text-ink-faint tabular">
          {String(index + 1).padStart(2, '0')}
        </span>

        <span className="min-w-0">
          <span className="block truncate text-[1.0625rem] font-semibold tracking-[-0.01em] text-ink transition-colors duration-200 group-hover:text-accent">
            {project.title}
          </span>
          <span className="mt-0.5 block truncate text-[0.8125rem] text-ink-faint">
            {project.subtitle ?? project.summary}
          </span>
        </span>

        <span className="col-start-2 font-mono text-[0.6875rem] tracking-[0.1em] text-ink-muted uppercase sm:col-start-3">
          {project.categories.map((c) => categoryLabel(c)).join(' · ')}
        </span>

        <span className="col-start-3 row-start-1 flex items-center gap-3 justify-self-end sm:col-start-4 sm:row-auto sm:justify-self-start">
          <span className="font-mono text-[0.6875rem] tracking-[0.08em] text-ink-faint uppercase">
            {project.date}
          </span>
          <StatusPill status={project.status} />
        </span>

        <Icon
          name="arrow-right"
          className="hidden shrink-0 text-ink-faint transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-accent sm:block"
        />
      </Link>
    </li>
  )
}

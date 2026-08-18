import { Link } from 'react-router-dom'
import type { ResearchEntry } from '@/data'
import { copy, getProject } from '@/data'
import { StatusPill } from '@/components/ui/StatusPill'
import { TagRow } from '@/components/ui/Tag'
import { ActionLink } from '@/components/ui/ActionLink'
import { Reveal } from '@/components/ui/Reveal'

/**
 * One research entry on the index: everything a reader needs to decide whether
 * to open it, laid out like an abstract in a proceedings listing.
 */
export function ResearchCard({ entry, index }: { entry: ResearchEntry; index: number }) {
  const project = entry.relatedProject ? getProject(entry.relatedProject) : undefined
  const hasPage = Boolean(entry.body)

  return (
    <Reveal as="article" delay={Math.min(index, 3) * 70} className="border-b border-rule py-10 first:pt-0">
      <div className="grid gap-6 lg:grid-cols-[8rem_minmax(0,1fr)] lg:gap-10">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 lg:flex-col lg:items-start lg:gap-2">
          <span className="font-mono text-[0.6875rem] tracking-[0.1em] text-ink-faint uppercase">
            {entry.date}
          </span>
          <StatusPill status={entry.status} kind="research" />
        </div>

        <div>
          <h2 className="text-[1.25rem] leading-snug font-semibold tracking-[-0.015em] text-ink sm:text-[1.4rem]">
            {hasPage ? (
              <Link
                to={`/research/${entry.slug}`}
                className="transition-colors duration-200 hover:text-accent"
              >
                {entry.title}
              </Link>
            ) : (
              entry.title
            )}
          </h2>

          <p className="mt-2 text-[0.8125rem] text-ink-faint">{entry.authors.join(', ')}</p>

          <p className="prose-body mt-4 text-[1rem] sm:text-[1.0625rem]">{entry.abstract}</p>

          {entry.progress?.length ? (
            <div className="mt-6">
              <p className="overline mb-3">{copy.researchDetail.progress}</p>
              <ul className="space-y-2">
                {entry.progress.map((line) => (
                  <li key={line} className="relative pl-5 text-[0.875rem] leading-relaxed text-ink-muted">
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-[0.68em] block h-px w-3 bg-rule-strong"
                    />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <TagRow items={entry.topics} className="mt-6" emphasis="quiet" />

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            {hasPage ? (
              <ActionLink href={`/research/${entry.slug}`} icon="arrow-right">
                {copy.research.readMore}
              </ActionLink>
            ) : null}
            {entry.pdf ? (
              <ActionLink href={entry.pdf} icon="document" iconTrailing={false}>
                {copy.research.pdf}
              </ActionLink>
            ) : null}
            {entry.publication?.href ? (
              <ActionLink href={entry.publication.href}>{entry.publication.label}</ActionLink>
            ) : null}
            {entry.doi ? (
              <ActionLink href={`https://doi.org/${entry.doi}`}>DOI {entry.doi}</ActionLink>
            ) : null}
            {project ? (
              <ActionLink href={`/projects/${project.slug}`} icon="arrow-right">
                {project.title}
              </ActionLink>
            ) : null}
          </div>
        </div>
      </div>
    </Reveal>
  )
}

import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { copy, getProject, getResearch } from '@/data'
import { asset, fill } from '@/lib/utils'
import { usePageMeta } from '@/hooks/usePageMeta'
import { Container } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Icon } from '@/components/ui/Icon'
import { TagRow } from '@/components/ui/Tag'
import { StatusPill } from '@/components/ui/StatusPill'
import { ActionLink } from '@/components/ui/ActionLink'
import { Article, ContentsRail, resolveSections } from '@/components/content/Article'
import { NotFound } from './NotFound'

export function ResearchDetail() {
  const { slug } = useParams<{ slug: string }>()
  const entry = slug ? getResearch(slug) : undefined

  const sections = useMemo(
    () => (entry?.body ? resolveSections(entry.body) : []),
    [entry],
  )

  usePageMeta({
    title: entry?.title ?? copy.researchDetail.notFound,
    description: entry?.abstract,
    path: `/research/${slug ?? ''}`,
    type: 'article',
  })

  if (!entry) return <NotFound />

  const project = entry.relatedProject ? getProject(entry.relatedProject) : undefined

  return (
    <>
      <Container className="pt-8 sm:pt-10">
        <Link
          to="/research"
          className="group inline-flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.12em] text-ink-faint uppercase transition-colors hover:text-ink"
        >
          <Icon
            name="arrow-left"
            size={13}
            className="transition-transform duration-200 group-hover:-translate-x-0.5"
          />
          {copy.researchDetail.back}
        </Link>
      </Container>

      <Container className="pt-8 pb-12 sm:pt-10 sm:pb-14">
        <Reveal className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.6875rem] tracking-[0.1em] text-ink-faint uppercase">
            <span>{entry.date}</span>
            <StatusPill status={entry.status} kind="research" />
          </div>

          <h1 className="mt-5 text-title font-semibold text-ink">{entry.title}</h1>
          <p className="mt-4 text-[0.9rem] text-ink-faint">{entry.authors.join(', ')}</p>
        </Reveal>
      </Container>

      <Container className="pb-20 sm:pb-24">
        <div className="grid gap-12 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="mb-8">
              <p className="overline mb-3">{copy.researchDetail.topics}</p>
              <TagRow items={entry.topics} emphasis="quiet" />
            </div>

            {(entry.pdf || entry.publication || entry.doi || project) && (
              <div className="mb-8">
                <p className="overline mb-3">{copy.researchDetail.links}</p>
                <ul className="space-y-2">
                  {entry.pdf ? (
                    <li>
                      <ActionLink href={entry.pdf} className="text-[0.875rem]">
                        {copy.researchDetail.downloadPdf}
                      </ActionLink>
                    </li>
                  ) : null}
                  {entry.publication?.href ? (
                    <li>
                      <ActionLink href={entry.publication.href} className="text-[0.875rem]">
                        {entry.publication.label}
                      </ActionLink>
                    </li>
                  ) : null}
                  {entry.doi ? (
                    <li>
                      <ActionLink href={`https://doi.org/${entry.doi}`} className="text-[0.875rem]">
                        {fill(copy.researchDetail.doi, { doi: entry.doi })}
                      </ActionLink>
                    </li>
                  ) : null}
                  {project ? (
                    <li>
                      <ActionLink
                        href={`/projects/${project.slug}`}
                        icon="arrow-right"
                        className="text-[0.875rem]"
                      >
                        {project.title}
                      </ActionLink>
                    </li>
                  ) : null}
                </ul>
              </div>
            )}

            {sections.length > 1 ? (
              <ContentsRail sections={sections} className="hidden lg:block" />
            ) : null}
          </aside>

          <div>
            <Reveal className="mb-12">
              <p className="overline mb-4">{copy.researchDetail.abstract}</p>
              <p className="prose-body">{entry.abstract}</p>
            </Reveal>

            {entry.progress?.length ? (
              <Reveal className="mb-14">
                <p className="overline mb-4">{copy.researchDetail.progress}</p>
                <ul className="divide-y divide-rule border-y border-rule">
                  {entry.progress.map((line) => (
                    <li key={line} className="py-3.5 text-[0.925rem] leading-relaxed text-ink-muted">
                      {line}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}

            {sections.length ? <Article sections={sections} /> : null}

            {entry.figures?.length ? (
              <Reveal className="mt-14 space-y-8">
                {entry.figures.map((figure, i) => (
                  <figure key={i}>
                    <img
                      src={asset(figure.src)}
                      alt={figure.alt}
                      width={figure.width}
                      height={figure.height}
                      loading="lazy"
                      decoding="async"
                      className="w-full border border-rule bg-paper-sunken"
                    />
                    {figure.caption ? (
                      <figcaption className="mt-3 text-[0.8125rem] text-ink-faint">
                        {figure.caption}
                      </figcaption>
                    ) : null}
                  </figure>
                ))}
              </Reveal>
            ) : null}

            {entry.citation ? (
              <Reveal className="mt-16 border-t border-rule pt-8">
                <p className="overline mb-3">{copy.researchDetail.citation}</p>
                <p className="border-l-2 border-rule-strong bg-paper-sunken px-5 py-4 font-mono text-[0.8125rem] leading-relaxed text-ink-muted">
                  {entry.citation}
                </p>
              </Reveal>
            ) : null}
          </div>
        </div>
      </Container>
    </>
  )
}

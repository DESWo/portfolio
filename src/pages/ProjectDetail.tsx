import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { categoryLabel, copy, getProject, getResearch, orderedProjects } from '@/data'
import type { Project } from '@/data'
import { asset, cn } from '@/lib/utils'
import { usePageMeta } from '@/hooks/usePageMeta'
import { Container, Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Icon } from '@/components/ui/Icon'
import { TagRow } from '@/components/ui/Tag'
import { StatusPill } from '@/components/ui/StatusPill'
import { ActionLink } from '@/components/ui/ActionLink'
import { Article, ContentsRail, resolveSections } from '@/components/content/Article'
import { ProjectCard } from '@/components/project/ProjectCard'
import { NotFound } from './NotFound'

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProject(slug) : undefined

  const sections = useMemo(
    () => (project?.caseStudy ? resolveSections(project.caseStudy.sections) : []),
    [project],
  )

  const index = project ? orderedProjects.findIndex((p) => p.slug === project.slug) : -1
  const previous = index > 0 ? orderedProjects[index - 1] : undefined
  const next = index >= 0 && index < orderedProjects.length - 1 ? orderedProjects[index + 1] : undefined

  usePageMeta({
    title: project?.title ?? copy.project.notFound,
    description: project?.summary,
    path: `/projects/${slug ?? ''}`,
    image: project?.caseStudy?.hero?.src ?? project?.thumbnail?.src,
    type: 'article',
  })

  if (!project) return <NotFound />

  const study = project.caseStudy
  const related = (project.relatedProjects ?? [])
    .map((s) => orderedProjects.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
  const relatedResearch = (project.relatedResearch ?? [])
    .map((s) => getResearch(s))
    .filter((r): r is NonNullable<typeof r> => Boolean(r))

  const externalLinks = [
    ...(project.liveDemo ? [{ label: copy.project.liveSite, href: project.liveDemo }] : []),
    ...(project.repo ? [{ label: copy.project.sourceCode, href: project.repo }] : []),
    ...(project.links ?? []),
  ]

  return (
    <>
      <Container className="pt-8 sm:pt-10">
        <Link
          to="/projects"
          className="group inline-flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.12em] text-ink-faint uppercase transition-colors hover:text-ink"
        >
          <Icon
            name="arrow-left"
            size={13}
            className="transition-transform duration-200 group-hover:-translate-x-0.5"
          />
          {copy.project.back}
        </Link>
      </Container>

      <Container className="pt-8 pb-12 sm:pt-10 sm:pb-14">
        <Reveal className="max-w-4xl">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.6875rem] tracking-[0.1em] text-ink-faint uppercase">
            <span className="text-ink-muted">
              {project.categories.map(categoryLabel).join(' · ')}
            </span>
            <span aria-hidden="true" className="text-rule-strong">
              /
            </span>
            <span>{project.date}</span>
            <StatusPill status={project.status} />
          </div>

          <h1 className="mt-5 text-title font-semibold text-ink">{project.title}</h1>

          {project.subtitle ? (
            <p className="mt-3 font-serif text-[1.2rem] text-ink-faint italic sm:text-[1.35rem]">
              {project.subtitle}
            </p>
          ) : null}

          <p className="mt-6 max-w-2xl text-lead text-ink-muted">
            {study?.summary ?? project.summary}
          </p>
        </Reveal>
      </Container>

      {study?.hero ? (
        <Container className="pb-14 sm:pb-16">
          <Reveal>
            <img
              src={asset(study.hero.src)}
              alt={study.hero.alt}
              width={study.hero.width}
              height={study.hero.height}
              className="w-full border border-rule bg-paper-sunken"
            />
            {study.hero.caption ? (
              <p className="mt-3 text-[0.8125rem] text-ink-faint">{study.hero.caption}</p>
            ) : null}
          </Reveal>
        </Container>
      ) : null}

      <Container className="pb-20 sm:pb-24">
        <div className="grid gap-12 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
          {/* On a phone this stacks above the article, which puts the links and
              the headline facts first — the two things a visitor wants soonest. */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            {study?.facts?.length ? (
              <dl className="mb-8 divide-y divide-rule border-y border-rule">
                {study.facts.map((fact) => (
                  <div key={fact.label} className="py-3">
                    <dt className="font-mono text-[0.625rem] tracking-[0.12em] text-ink-faint uppercase">
                      {fact.label}
                    </dt>
                    <dd className="mt-1 text-[0.875rem] leading-snug text-ink">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}

            {externalLinks.length ? (
              <div className="mb-8">
                <p className="overline mb-3">{copy.project.links}</p>
                <ul className="space-y-2">
                  {externalLinks.map((link) => (
                    <li key={link.label}>
                      {link.href ? (
                        <ActionLink href={link.href} variant="text" className="text-[0.875rem]">
                          {link.label}
                        </ActionLink>
                      ) : (
                        <span className="text-[0.875rem] text-ink-faint">
                          {link.label}
                          {'note' in link && link.note ? (
                            <span className="mt-0.5 block text-[0.8125rem]">{link.note}</span>
                          ) : null}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {project.technologies?.length ? (
              <div className="mb-8">
                <p className="overline mb-3">{copy.project.builtWith}</p>
                <TagRow items={project.technologies} emphasis="quiet" />
              </div>
            ) : null}

            {sections.length > 1 ? (
              <ContentsRail sections={sections} className="hidden lg:block" />
            ) : null}
          </aside>

          <div>
            {project.achievements?.length ? (
              <Reveal className="mb-14">
                <p className="overline mb-4">{copy.project.outcomes}</p>
                <ul className="divide-y divide-rule border-y border-rule">
                  {project.achievements.map((item) => (
                    <li key={item} className="flex gap-3 py-3.5">
                      <span
                        aria-hidden="true"
                        className="mt-[0.62em] block h-px w-3 shrink-0 bg-accent"
                      />
                      <span className="text-[0.925rem] leading-relaxed text-ink-muted">{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}

            {sections.length ? (
              <Article sections={sections} />
            ) : (
              <Reveal className="prose-body">
                <p>
                  {copy.project.noCaseStudy}
                  {externalLinks.length ? copy.project.noCaseStudyWithLinks : ''}
                  {copy.project.noCaseStudyEnd}
                </p>
              </Reveal>
            )}

            {relatedResearch.length ? (
              <Reveal className="mt-16 border-t border-rule pt-8">
                <p className="overline mb-4">{copy.project.relatedResearch}</p>
                <ul className="space-y-3">
                  {relatedResearch.map((entry) => (
                    <li key={entry.slug}>
                      <Link
                        to={entry.body ? `/research/${entry.slug}` : '/research'}
                        className="link text-[0.95rem]"
                      >
                        {entry.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}
          </div>
        </div>
      </Container>

      {related.length ? (
        <Section>
          <Container>
            <h2 className="overline mb-8">{copy.project.nextToRead}</h2>
            <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ProjectCard key={item.slug} project={item} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {(previous || next) && (
        <Section padded={false} className="py-10 sm:py-12">
          <Container>
            <nav aria-label={copy.project.pagerLabel} className="grid gap-px bg-rule sm:grid-cols-2">
              <PagerLink project={previous} direction="previous" />
              <PagerLink project={next} direction="next" />
            </nav>
          </Container>
        </Section>
      )}
    </>
  )
}

function PagerLink({
  project,
  direction,
}: {
  project: Project | undefined
  direction: 'previous' | 'next'
}) {
  if (!project) return <div className="bg-paper" />
  const isNext = direction === 'next'
  return (
    <Link
      to={`/projects/${project.slug}`}
      className={cn('group flex items-center gap-4 bg-paper p-6', isNext && 'sm:justify-end sm:text-right')}
    >
      {!isNext ? (
        <Icon
          name="arrow-left"
          className="shrink-0 text-ink-faint transition-transform duration-200 group-hover:-translate-x-0.5"
        />
      ) : null}
      <span className={cn('min-w-0', isNext && 'sm:order-first')}>
        <span className="block font-mono text-[0.625rem] tracking-[0.12em] text-ink-faint uppercase">
          {isNext ? copy.project.next : copy.project.previous}
        </span>
        <span className="mt-1 block truncate text-[0.975rem] font-semibold text-ink transition-colors duration-200 group-hover:text-accent">
          {project.title}
        </span>
      </span>
      {isNext ? (
        <Icon
          name="arrow-right"
          className="shrink-0 text-ink-faint transition-transform duration-200 group-hover:translate-x-0.5"
        />
      ) : null}
    </Link>
  )
}

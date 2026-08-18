import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CATEGORIES, countByCategory, getCategory, orderedProjects, usedCategoryIds } from '@/data'
import { cn } from '@/lib/utils'
import { usePageMeta } from '@/hooks/usePageMeta'
import { Container, Section } from '@/components/ui/Section'
import { PageHeader } from '@/components/ui/PageHeader'
import { Reveal } from '@/components/ui/Reveal'
import { Icon } from '@/components/ui/Icon'
import { ProjectCard } from '@/components/project/ProjectCard'
import { ProjectRow } from '@/components/project/ProjectRow'

/**
 * The project index.
 *
 * The active filter and the layout both live in the URL, so a filtered view
 * can be shared, bookmarked and stepped through with the browser's back
 * button — which is what people expect from a filter and rarely get.
 *
 * Only categories that a visible project actually uses are offered, so adding
 * a category to src/data/categories.ts ahead of time costs nothing.
 */
export function Projects() {
  const [params, setParams] = useSearchParams()
  const active = params.get('category')
  const view = params.get('view') === 'index' ? 'index' : 'grid'

  const available = useMemo(() => {
    const used = new Set(usedCategoryIds())
    return CATEGORIES.filter((c) => used.has(c.id))
  }, [])

  const filtered = useMemo(() => {
    if (!active) return orderedProjects
    return orderedProjects.filter((p) => (p.categories as readonly string[]).includes(active))
  }, [active])

  const activeCategory = active ? getCategory(active) : undefined

  const setParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(params)
    if (value === null) next.delete(key)
    else next.set(key, value)
    setParams(next, { replace: true, preventScrollReset: true })
  }

  usePageMeta({
    title: 'Projects',
    description:
      'Engineering projects by Desmond Wong: reactor and plasma simulations, structural solvers, and interactive technical explainers.',
    path: '/projects',
  })

  return (
    <>
      <PageHeader
        overline="Work"
        title="Projects"
        description="Things I built to understand how something works. Most have a case study going through the model, the assumptions and the trade-offs."
        meta={`${orderedProjects.length} projects · ${available.length} categories`}
      />

      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4 border-y border-rule py-3">
          {/* Filters. A group of buttons rather than a <select>: there are few
              enough to show them all, and each one carries its count.
              They wrap onto a second line from `sm` up, where there is room —
              a hidden filter is a filter nobody uses. Only on a phone does the
              row scroll sideways instead. */}
          <div className="-mx-1 flex flex-1 flex-wrap gap-1 px-1 py-0.5 max-sm:flex-nowrap max-sm:overflow-x-auto">
            <FilterButton
              label="All"
              count={orderedProjects.length}
              active={!active}
              onClick={() => setParam('category', null)}
            />
            {available.map((category) => (
              <FilterButton
                key={category.id}
                label={category.label}
                count={countByCategory(category.id)}
                active={active === category.id}
                onClick={() => setParam('category', category.id)}
              />
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-0.5" role="group" aria-label="Layout">
            <ViewButton
              label="Grid"
              glyph="grid"
              active={view === 'grid'}
              onClick={() => setParam('view', null)}
            />
            <ViewButton
              label="Index"
              glyph="list"
              active={view === 'index'}
              onClick={() => setParam('view', 'index')}
            />
          </div>
        </div>

        {activeCategory?.description ? (
          <p className="mt-5 max-w-2xl text-[0.9rem] leading-relaxed text-ink-muted">
            {activeCategory.description}
          </p>
        ) : null}
      </Container>

      <Section divider={false} padded={false} className="pt-10 pb-20 sm:pt-12 sm:pb-24">
        <Container>
          {filtered.length === 0 ? (
            <p className="py-16 text-center text-ink-muted">
              No projects in this category yet.
            </p>
          ) : view === 'grid' ? (
            <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((project, i) => (
                <Reveal key={project.slug} delay={Math.min(i, 3) * 70}>
                  <ProjectCard project={project} priority={i < 3} headingLevel={2} />
                </Reveal>
              ))}
            </div>
          ) : (
            <ul className="border-t border-rule">
              {filtered.map((project, i) => (
                <ProjectRow key={project.slug} project={project} index={i} />
              ))}
            </ul>
          )}
        </Container>
      </Section>
    </>
  )
}

function FilterButton({
  label,
  count,
  active,
  onClick,
}: {
  label: string
  count: number
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'inline-flex shrink-0 items-center gap-1.5 border px-3 py-1.5 font-mono text-[0.6875rem] tracking-[0.08em] whitespace-nowrap uppercase transition-colors duration-150',
        active
          ? 'border-ink bg-ink text-paper'
          : 'border-transparent text-ink-muted hover:border-rule-strong hover:text-ink',
      )}
    >
      {label}
      <span className={cn('tabular', active ? 'text-paper/60' : 'text-ink-faint')}>{count}</span>
    </button>
  )
}

function ViewButton({
  label,
  glyph,
  active,
  onClick,
}: {
  label: string
  glyph: 'grid' | 'list'
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      title={`${label} view`}
      className={cn(
        'inline-flex size-8 items-center justify-center border transition-colors duration-150',
        active ? 'border-rule-strong text-ink' : 'border-transparent text-ink-faint hover:text-ink',
      )}
    >
      <Icon name={glyph} size={15} title={`${label} view`} />
    </button>
  )
}

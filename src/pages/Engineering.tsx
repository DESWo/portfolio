import { Link } from 'react-router-dom'
import { getProject, skillGroups } from '@/data'
import { usePageMeta } from '@/hooks/usePageMeta'
import { Container, Section } from '@/components/ui/Section'
import { PageHeader } from '@/components/ui/PageHeader'
import { Reveal } from '@/components/ui/Reveal'

/**
 * Capabilities, grouped, with links to the work that demonstrates each one.
 *
 * No bars, no percentages, no star ratings. Every claim on this page can be
 * checked by clicking through to a repository.
 */
export function Engineering() {
  usePageMeta({
    title: 'Engineering',
    description:
      'Tools, methods and subject matter Desmond Wong has used in practice, each linked to the project that demonstrates it.',
    path: '/engineering',
  })

  const total = skillGroups.reduce((sum, group) => sum + group.skills.length, 0)

  return (
    <>
      <PageHeader
        overline="Capabilities"
        title="Engineering & tools"
        description="What I can actually do, and where I have done it. Everything with a link next to it has a repository behind it — there are no self-assessed proficiency levels on this page because I do not think they mean anything."
        meta={`${total} entries · ${skillGroups.length} groups`}
      />

      {skillGroups.map((group, groupIndex) => (
        <Section key={group.id} id={group.id} className="scroll-mt-24">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-14">
              <Reveal>
                <p className="overline mb-3 tabular">
                  {String(groupIndex + 1).padStart(2, '0')}
                </p>
                <h2 className="text-heading font-semibold text-ink">{group.title}</h2>
                {group.description ? (
                  <p className="mt-4 max-w-sm text-[0.925rem] leading-relaxed text-ink-muted">
                    {group.description}
                  </p>
                ) : null}
              </Reveal>

              <div>
                {/* Cell separators are drawn as a 1px ring on each cell rather
                    than as gaps over a coloured container. Adjacent rings
                    overlap into a single hairline, and — unlike a gap — an odd
                    number of skills leaves no stray coloured cell at the end. */}
                <ul className="grid sm:grid-cols-2">
                  {group.skills.map((skill) => {
                    const evidence = (skill.evidence ?? [])
                      .map((slug) => getProject(slug))
                      .filter((p): p is NonNullable<typeof p> => Boolean(p))

                    return (
                      <li
                        key={skill.name}
                        className="p-5 shadow-[0_0_0_1px_var(--rule)]"
                      >
                        <p className="text-[0.95rem] font-semibold text-ink">{skill.name}</p>
                        {skill.note ? (
                          <p className="mt-1.5 text-[0.85rem] leading-relaxed text-ink-muted">
                            {skill.note}
                          </p>
                        ) : null}
                        {evidence.length ? (
                          <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[0.6875rem] tracking-[0.06em] text-ink-faint uppercase">
                            {evidence.map((project) => (
                              <Link
                                key={project.slug}
                                to={`/projects/${project.slug}`}
                                className="underline decoration-rule-strong underline-offset-[3px] transition-colors hover:text-accent hover:decoration-accent"
                              >
                                {project.title}
                              </Link>
                            ))}
                          </p>
                        ) : null}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </Container>
        </Section>
      ))}
    </>
  )
}

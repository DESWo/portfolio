import { Link } from 'react-router-dom'
import {
  featuredProjects,
  orderedProjects,
  profile,
  site,
  visibleResearch,
  RESEARCH_STATUS_LABEL,
} from '@/data'
import { usePageMeta } from '@/hooks/usePageMeta'
import { Container, Section, SectionHeader } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { ActionLink } from '@/components/ui/ActionLink'
import { Hero } from '@/components/home/Hero'
import { FeaturedProject } from '@/components/project/FeaturedProject'
import { ContactStrip } from '@/components/layout/ContactStrip'

export function Home() {
  // Fall back to the first three projects if nothing has been marked featured,
  // so the home page is never empty just because a flag was forgotten.
  const featured = featuredProjects.length ? featuredProjects : orderedProjects.slice(0, 3)
  const research = visibleResearch.slice(0, 3)

  usePageMeta({
    path: '/',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: profile.name,
      description: profile.role,
      url: site.url,
      email: 'wongdesmond414@gmail.com',
      sameAs: ['https://github.com/DESWo'],
      knowsAbout: ['Nuclear engineering', 'Fusion energy', 'Physics simulation', 'Software'],
    },
  })

  return (
    <>
      <Hero />

      {profile.focus?.length ? (
        <Section id="focus">
          <Container>
            <SectionHeader overline="What I work on" title="Three things, mostly" />
            <div className="grid sm:grid-cols-3">
              {profile.focus.map((item, i) => (
                <Reveal
                  key={item.title}
                  delay={i * 80}
                  className="p-6 shadow-[0_0_0_1px_var(--rule)] sm:p-8"
                >
                  <p className="font-mono text-[0.6875rem] tracking-[0.12em] text-accent tabular">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-4 text-[1.0625rem] font-semibold text-ink">{item.title}</h3>
                  <p className="mt-3 text-[0.9rem] leading-relaxed text-ink-muted">
                    {item.description}
                  </p>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <Section id="work">
        <Container>
          <SectionHeader
            overline="Selected work"
            title="Projects"
            description="Each one started as something I wanted to understand. The case studies go through the model, the assumptions, and what I would do differently."
            action={
              <ActionLink href="/projects" icon="arrow-right">
                All projects
              </ActionLink>
            }
          />
          <div className="space-y-20 sm:space-y-24 lg:space-y-28">
            {featured.map((project, i) => (
              <FeaturedProject
                key={project.slug}
                project={project}
                index={i}
                priority={i === 0}
              />
            ))}
          </div>
        </Container>
      </Section>

      {research.length ? (
        <Section id="research">
          <Container>
            <SectionHeader
              overline="Research"
              title="Open questions"
              description="Technical writing and investigations, including work that has not produced a result yet. The status next to each one is accurate."
              action={
                <ActionLink href="/research" icon="arrow-right">
                  All research
                </ActionLink>
              }
            />
            <ul className="border-t border-rule">
              {research.map((entry, i) => (
                <Reveal as="li" key={entry.slug} delay={i * 60} className="border-b border-rule">
                  <Link
                    to={entry.body ? `/research/${entry.slug}` : '/research'}
                    className="group grid gap-2 py-6 sm:grid-cols-[minmax(0,1fr)_10rem] sm:items-baseline sm:gap-8"
                  >
                    <div>
                      <h3 className="text-[1.0625rem] leading-snug font-semibold text-ink transition-colors duration-200 group-hover:text-accent">
                        {entry.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-[0.9rem] leading-relaxed text-ink-muted">
                        {entry.abstract}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 font-mono text-[0.6875rem] tracking-[0.1em] text-ink-faint uppercase sm:flex-col sm:items-end sm:gap-1.5">
                      <span>{RESEARCH_STATUS_LABEL[entry.status]}</span>
                      <span>{entry.date}</span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <ContactStrip />
    </>
  )
}

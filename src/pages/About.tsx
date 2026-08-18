import { certifications, education, experience, profile } from '@/data'
import { asset } from '@/lib/utils'
import { usePageMeta } from '@/hooks/usePageMeta'
import { Container, Section, SectionHeader } from '@/components/ui/Section'
import { PageHeader } from '@/components/ui/PageHeader'
import { Reveal } from '@/components/ui/Reveal'
import { TagRow } from '@/components/ui/Tag'
import { ActionLink } from '@/components/ui/ActionLink'
import { ContactStrip } from '@/components/layout/ContactStrip'

/**
 * About, experience, education and certifications.
 *
 * Every section below is skipped entirely when its data file is empty, so the
 * page never shows a heading with nothing under it. Adding the first entry to
 * src/data/experience.ts or certifications.ts makes the section appear.
 */
export function About() {
  usePageMeta({
    title: 'About',
    description: profile.about[0] ?? profile.intro,
    path: '/about',
  })

  return (
    <>
      <PageHeader overline="About" title={profile.name} description={profile.role} />

      <Container className="pb-16 sm:pb-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal>
            <div className="prose-body space-y-6">
              {profile.about.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {profile.resume ? (
              <div className="mt-9">
                <ActionLink
                  href={profile.resume.href}
                  variant="outline"
                  icon="document"
                  iconTrailing={false}
                >
                  {profile.resume.label}
                </ActionLink>
              </div>
            ) : null}
          </Reveal>

          <Reveal className="lg:border-l lg:border-rule lg:pl-16" delay={80}>
            {profile.photo ? (
              <img
                src={asset(profile.photo.src)}
                alt={profile.photo.alt}
                width={profile.photo.width}
                height={profile.photo.height}
                loading="lazy"
                decoding="async"
                className="mb-8 aspect-[4/5] w-full border border-rule object-cover"
              />
            ) : null}

            {profile.facts?.length ? (
              <dl className="divide-y divide-rule border-y border-rule">
                {profile.facts.map((fact) => (
                  <div key={fact.label} className="grid grid-cols-[6.5rem_1fr] gap-4 py-3.5">
                    <dt className="font-mono text-[0.6875rem] tracking-[0.12em] text-ink-faint uppercase">
                      {fact.label}
                    </dt>
                    <dd className="text-[0.9rem] leading-snug text-ink">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </Reveal>
        </div>
      </Container>

      {experience.length ? (
        <Section id="experience" className="scroll-mt-24">
          <Container>
            <SectionHeader overline="Record" title="Experience" />
            <ol className="border-t border-rule">
              {experience.map((item, i) => (
                <Reveal as="li" key={item.id} delay={Math.min(i, 3) * 60} className="border-b border-rule">
                  <div className="grid gap-4 py-8 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-12">
                    <div>
                      <p className="font-mono text-[0.6875rem] tracking-[0.1em] text-ink-faint uppercase">
                        {item.period}
                      </p>
                      {item.location ? (
                        <p className="mt-1.5 text-[0.8125rem] text-ink-faint">{item.location}</p>
                      ) : null}
                    </div>

                    <div>
                      <h3 className="text-[1.0625rem] font-semibold text-ink">
                        {item.role}
                        {item.organization ? (
                          <span className="text-ink-muted"> · {item.organization}</span>
                        ) : null}
                      </h3>

                      {item.summary ? (
                        <p className="mt-2.5 text-[0.925rem] leading-relaxed text-ink-muted">
                          {item.summary}
                        </p>
                      ) : null}

                      {item.highlights?.length ? (
                        <ul className="mt-4 space-y-2">
                          {item.highlights.map((line) => (
                            <li
                              key={line}
                              className="relative pl-5 text-[0.875rem] leading-relaxed text-ink-muted"
                            >
                              <span
                                aria-hidden="true"
                                className="absolute left-0 top-[0.68em] block h-px w-3 bg-rule-strong"
                              />
                              {line}
                            </li>
                          ))}
                        </ul>
                      ) : null}

                      {item.technologies?.length ? (
                        <TagRow items={item.technologies} className="mt-4" emphasis="quiet" />
                      ) : null}

                      {item.links?.length ? (
                        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                          {item.links.map((link) => (
                            <ActionLink key={link.href} href={link.href} className="text-[0.875rem]">
                              {link.label}
                            </ActionLink>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </Container>
        </Section>
      ) : null}

      {education.length ? (
        <Section id="education" className="scroll-mt-24">
          <Container>
            <SectionHeader overline="Record" title="Education" />
            <ol className="border-t border-rule">
              {education.map((item) => (
                <Reveal as="li" key={item.id} className="border-b border-rule">
                  <div className="grid gap-4 py-8 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-12">
                    <div>
                      <p className="font-mono text-[0.6875rem] tracking-[0.1em] text-ink-faint uppercase">
                        {item.period}
                      </p>
                      {item.location ? (
                        <p className="mt-1.5 text-[0.8125rem] text-ink-faint">{item.location}</p>
                      ) : null}
                    </div>

                    <div>
                      <h3 className="text-[1.0625rem] font-semibold text-ink">
                        {item.institution}
                      </h3>
                      {item.credential ? (
                        <p className="mt-1 text-[0.925rem] text-ink-muted">{item.credential}</p>
                      ) : null}
                      {item.note ? (
                        <p className="mt-2.5 text-[0.9rem] text-ink-muted">{item.note}</p>
                      ) : null}

                      {item.coursework?.length ? (
                        <TagRow items={item.coursework} className="mt-4" emphasis="quiet" />
                      ) : null}

                      {item.highlights?.length ? (
                        <ul className="mt-4 space-y-2">
                          {item.highlights.map((line) => (
                            <li
                              key={line}
                              className="relative pl-5 text-[0.875rem] leading-relaxed text-ink-muted"
                            >
                              <span
                                aria-hidden="true"
                                className="absolute left-0 top-[0.68em] block h-px w-3 bg-rule-strong"
                              />
                              {line}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </Container>
        </Section>
      ) : null}

      {certifications.length ? (
        <Section id="certifications" className="scroll-mt-24">
          <Container>
            <SectionHeader overline="Record" title="Certifications" />
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3">
              {certifications.map((item) => (
                <li key={item.id} className="p-5 shadow-[0_0_0_1px_var(--rule)]">
                  <p className="text-[0.95rem] font-semibold text-ink">{item.name}</p>
                  <p className="mt-1 text-[0.875rem] text-ink-muted">{item.issuer}</p>
                  <p className="mt-3 font-mono text-[0.6875rem] tracking-[0.1em] text-ink-faint uppercase">
                    {item.date}
                    {item.expires ? ` — ${item.expires}` : ''}
                  </p>
                  {item.href ? (
                    <ActionLink href={item.href} className="mt-3 text-[0.8125rem]">
                      Verify
                    </ActionLink>
                  ) : null}
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <ContactStrip />
    </>
  )
}

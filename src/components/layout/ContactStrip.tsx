import { activeContactLinks, copy, profile } from '@/data'
import { asset, fill } from '@/lib/utils'
import { Container, Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Icon } from '@/components/ui/Icon'

/**
 * The contact block. Appears at the foot of the home page and as the last
 * section of the About page, where it is the target of /about#contact.
 *
 * There is no form. A form needs a backend or a third-party service to
 * receive it, and an email address that works everywhere is better than
 * either. Links with no address filled in are skipped entirely — see
 * src/data/links.ts.
 */
export function ContactStrip({ id = 'contact' }: { id?: string }) {
  const links = [
    ...activeContactLinks,
    ...(profile.resume
      ? [
          {
            id: 'resume',
            label: copy.contact.resume,
            display: profile.resume.updated
              ? fill(copy.contact.resumeUpdated, { date: profile.resume.updated })
              : profile.resume.label,
            href: asset(profile.resume.href),
            icon: 'document' as const,
          },
        ]
      : []),
  ]

  return (
    <Section id={id} className="scroll-mt-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-16">
          <Reveal>
            <p className="overline mb-4">{copy.contact.overline}</p>
            <h2 className="text-title font-semibold text-ink">{copy.contact.title}</h2>
            <p className="mt-5 max-w-md text-lead text-ink-muted">{copy.contact.description}</p>
          </Reveal>

          <Reveal delay={80}>
            <ul className="border-t border-rule">
              {links.map((link) => {
                const external = link.href.startsWith('http')
                return (
                  <li key={link.id} className="border-b border-rule">
                    <a
                      href={link.href}
                      className="group flex items-center gap-4 py-5"
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      <Icon
                        name={link.icon}
                        size={18}
                        className="shrink-0 text-ink-faint transition-colors duration-200 group-hover:text-accent"
                      />
                      <span className="min-w-0 grow">
                        <span className="block font-mono text-[0.6875rem] tracking-[0.12em] text-ink-faint uppercase">
                          {link.label}
                        </span>
                        <span className="mt-1 block truncate text-[0.975rem] text-ink transition-colors duration-200 group-hover:text-accent">
                          {link.display || link.href}
                        </span>
                      </span>
                      <Icon
                        name={external ? 'arrow-up-right' : 'arrow-right'}
                        size={16}
                        className="shrink-0 text-ink-faint transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-accent"
                      />
                    </a>
                  </li>
                )
              })}
            </ul>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}

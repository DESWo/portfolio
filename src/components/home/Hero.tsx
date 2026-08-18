import { activeContactLinks, profile } from '@/data'
import { asset } from '@/lib/utils'
import { Container } from '@/components/ui/Section'
import { ActionLink } from '@/components/ui/ActionLink'
import { Icon } from '@/components/ui/Icon'

/**
 * The opening of the site.
 *
 * Deliberately not a full-viewport statement with nothing in it. The facts
 * panel on the right carries real information, and the first project is
 * visible almost immediately underneath — so the hero introduces the work
 * rather than delaying it.
 */
export function Hero() {
  return (
    <Container className="pt-14 pb-16 sm:pt-20 sm:pb-20 lg:pt-24 lg:pb-28">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          {profile.disciplines?.length ? (
            <p className="overline mb-6">{profile.disciplines.join(' · ')}</p>
          ) : null}

          <h1 className="text-display font-semibold text-ink">{profile.name}</h1>

          <p className="mt-6 max-w-[24ch] font-serif text-[1.4rem] leading-[1.3] text-ink sm:max-w-none sm:text-[1.75rem]">
            {profile.tagline}
          </p>

          <p className="mt-6 max-w-2xl text-lead text-ink-muted">{profile.intro}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ActionLink href="/projects" variant="solid" icon="arrow-right">
              View projects
            </ActionLink>
            {profile.resume ? (
              <ActionLink href={profile.resume.href} variant="outline" icon="document" iconTrailing={false}>
                {profile.resume.label}
              </ActionLink>
            ) : null}
            <ActionLink href="/about" variant="outline">
              About
            </ActionLink>
          </div>
        </div>

        <div className="lg:border-l lg:border-rule lg:pl-16">
          {profile.photo ? (
            <img
              src={asset(profile.photo.src)}
              alt={profile.photo.alt}
              width={profile.photo.width}
              height={profile.photo.height}
              className="mb-8 aspect-square w-full max-w-56 border border-rule object-cover"
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

          {activeContactLinks.length ? (
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {activeContactLinks
                .filter((l) => l.primary)
                .map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      className="link inline-flex items-center gap-2 text-[0.875rem]"
                      {...(link.href.startsWith('http')
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                    >
                      <Icon name={link.icon} size={15} className="text-ink-faint" />
                      {link.label}
                    </a>
                  </li>
                ))}
            </ul>
          ) : null}
        </div>
      </div>
    </Container>
  )
}

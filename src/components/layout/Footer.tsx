import { Link } from 'react-router-dom'
import { activeContactLinks, copy, footerNav, primaryNav, profile, site } from '@/data'
import { asset, fill } from '@/lib/utils'
import { Container } from '@/components/ui/Section'
import { Icon } from '@/components/ui/Icon'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer data-print="hide" className="mt-auto border-t border-rule">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-12">
          <div>
            <p className="text-[1.05rem] font-semibold text-ink">{profile.name}</p>
            <p className="mt-1.5 max-w-sm text-[0.9rem] leading-relaxed text-ink-muted">
              {profile.role}
            </p>
            {profile.location ? (
              <p className="mt-3 font-mono text-[0.6875rem] tracking-[0.12em] text-ink-faint uppercase">
                {profile.location}
              </p>
            ) : null}
          </div>

          <nav aria-label={copy.chrome.navSite}>
            <p className="overline mb-4">{copy.footer.site}</p>
            <ul className="space-y-2.5">
              {primaryNav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="link text-[0.9rem]">
                    {item.label}
                  </Link>
                </li>
              ))}
              {footerNav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="link text-[0.9rem]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="overline mb-4">{copy.footer.elsewhere}</p>
            <ul className="space-y-2.5">
              {activeContactLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className="link inline-flex items-center gap-2.5 text-[0.9rem]"
                    {...(link.href.startsWith('http')
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    <Icon name={link.icon} size={15} className="shrink-0 text-ink-faint" />
                    {link.display || link.label}
                  </a>
                </li>
              ))}
              {profile.resume ? (
                <li>
                  <a
                    href={asset(profile.resume.href)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link inline-flex items-center gap-2.5 text-[0.9rem]"
                  >
                    <Icon name="document" size={15} className="shrink-0 text-ink-faint" />
                    {profile.resume.label}
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-rule pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.6875rem] tracking-[0.1em] text-ink-faint uppercase">
            {fill(copy.footer.copyright, { year, name: profile.name })}
          </p>
          {site.footerNote ? (
            <p className="font-mono text-[0.6875rem] tracking-[0.1em] text-ink-faint uppercase">
              {site.footerNote}
            </p>
          ) : null}
        </div>
      </Container>
    </footer>
  )
}

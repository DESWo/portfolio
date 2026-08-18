import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { copy, primaryNav, profile, site } from '@/data'
import { asset, cn, fill } from '@/lib/utils'
import { Container } from '@/components/ui/Section'
import { Icon } from '@/components/ui/Icon'
import { ThemeToggle } from './ThemeToggle'

/**
 * The site header.
 *
 * Sticky, with the hairline underneath appearing only once the page has been
 * scrolled — so the top of every page starts clean. On small screens the links
 * move into a panel that closes on Escape, on navigation, and on a click
 * outside it.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const panelRef = useRef<HTMLDivElement | null>(null)
  const toggleRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Any navigation closes the panel, including in-page anchors.
  useEffect(() => setOpen(false), [location.pathname, location.hash])

  useEffect(() => {
    if (!open) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const onPointer = (e: PointerEvent) => {
      const target = e.target as Node
      if (panelRef.current?.contains(target) || toggleRef.current?.contains(target)) return
      setOpen(false)
    }

    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
      document.body.style.overflow = ''
    }
  }, [open])

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'relative py-1 text-[0.9rem] transition-colors duration-150',
      isActive ? 'text-ink' : 'text-ink-muted hover:text-ink',
    )

  return (
    <header
      data-print="hide"
      className={cn(
        'sticky top-0 z-50 border-b bg-paper/85 backdrop-blur-md transition-colors duration-300',
        scrolled ? 'border-rule' : 'border-transparent',
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-6 sm:h-[4.5rem]">
          <Link
            to="/"
            className="group flex items-baseline gap-2.5 whitespace-nowrap"
            aria-label={fill(copy.chrome.homeLabel, { name: profile.name })}
          >
            <span className="text-[0.975rem] font-semibold tracking-[-0.01em] text-ink">
              {profile.name}
            </span>
            <span className="hidden font-mono text-[0.6875rem] tracking-[0.12em] text-ink-faint uppercase sm:inline">
              {site.shortName === profile.name ? copy.chrome.badge : site.shortName}
            </span>
          </Link>

          <nav aria-label={copy.chrome.navPrimary} className="hidden items-center gap-7 md:flex">
            {primaryNav.map((item) => (
              <NavLink key={item.to} to={item.to} className={navLinkClass}>
                {({ isActive }) => (
                  <>
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute -bottom-0.5 left-0 h-px bg-accent transition-all duration-300',
                        isActive ? 'w-full' : 'w-0',
                      )}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            {profile.resume ? (
              <a
                href={asset(profile.resume.href)}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-2 border border-rule-strong px-3.5 py-2 text-[0.8125rem] text-ink transition-colors duration-150 hover:border-accent hover:text-accent sm:inline-flex"
              >
                {copy.chrome.resume}
                <Icon name="arrow-up-right" size={13} />
              </a>
            ) : null}

            <ThemeToggle />

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? copy.chrome.menuClose : copy.chrome.menuOpen}
              className="inline-flex size-9 items-center justify-center border border-transparent text-ink transition-colors duration-150 hover:border-rule md:hidden"
            >
              <Icon name={open ? 'close' : 'menu'} size={19} />
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile panel */}
      <div
        id="site-menu"
        ref={panelRef}
        hidden={!open}
        className="border-t border-rule bg-paper md:hidden"
      >
        <Container className="py-4">
          <nav aria-label={copy.chrome.navPrimaryMobile}>
            <ul>
              {primaryNav.map((item) => (
                <li key={item.to} className="border-b border-rule last:border-b-0">
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center justify-between py-3.5 text-[1.05rem]',
                        isActive ? 'text-accent' : 'text-ink',
                      )
                    }
                  >
                    {item.label}
                    <Icon name="arrow-right" size={16} className="text-ink-faint" />
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          {profile.resume ? (
            <a
              href={asset(profile.resume.href)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 border border-rule-strong px-4 py-3 text-[0.95rem] text-ink"
            >
              {copy.chrome.resume}
              <Icon name="arrow-up-right" size={15} />
            </a>
          ) : null}
        </Container>
      </div>
    </header>
  )
}

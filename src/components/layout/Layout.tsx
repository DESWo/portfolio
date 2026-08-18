import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { copy } from '@/data'
import { Header } from './Header'
import { Footer } from './Footer'

/**
 * Restores scroll position on navigation.
 *
 * Going to a new page starts at the top; following an in-page anchor jumps to
 * the target instead; and the browser's own back/forward restoration is left
 * alone, so returning to the projects index keeps your place in the grid.
 */
function ScrollManager() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView({ behavior: 'auto', block: 'start' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash, key])

  return null
}

export function Layout() {
  const { pathname } = useLocation()

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:border focus:border-rule-strong focus:bg-paper focus:px-4 focus:py-2 focus:text-[0.9rem] focus:text-ink"
      >
        {copy.small.skipToContent}
      </a>

      <ScrollManager />
      <Header />

      {/* Keyed on the path so each navigation replays the entrance. */}
      <main id="main" key={pathname} className="page-enter grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

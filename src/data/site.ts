import type { SiteConfig } from './types.ts'

/**
 * Site-wide settings: the browser tab, the share preview, the canonical URL.
 *
 * `url` must agree with `BASE_PATH` in vite.config.ts. If you move the site to
 * a custom domain, change both.
 */
export const site: SiteConfig = {
  title: 'Desmond Wong — Engineering Portfolio',
  shortName: 'Desmond Wong',
  description:
    'Engineering portfolio of Desmond Wong: nuclear and fusion energy, physical simulation, and the models and sources behind them.',
  url: 'https://wongdesmond.com/',
  ogImage: '/og-card.png',
  locale: 'en',
  footerNote: 'Built and maintained by hand.',
}

/**
 * The header navigation, in order. Every entry also appears in the footer.
 *
 * Adding a link here does not create the page — see src/App.tsx for the route
 * table if you are adding a whole new section to the site.
 */
export const primaryNav: { label: string; to: string }[] = [
  { label: 'Projects', to: '/projects' },
  { label: 'Research', to: '/research' },
  { label: 'Engineering', to: '/engineering' },
  { label: 'About', to: '/about' },
]

/**
 * The extra links in the footer, under the primary ones.
 *
 * These point at anchors inside a page rather than at pages of their own, so
 * they belong in the footer but not in the header. Same shape as above — add,
 * remove or reorder freely. An empty array simply shortens the column.
 */
export const footerNav: { label: string; to: string }[] = [
  { label: 'Experience', to: '/about#experience' },
  { label: 'Education', to: '/about#education' },
  { label: 'Contact', to: '/about#contact' },
]

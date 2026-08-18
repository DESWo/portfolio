/** Join class names, dropping anything falsy. */
export function cn(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(' ')
}

/**
 * Turn a path written from the site root into one that works wherever the
 * site is deployed.
 *
 *   asset('/images/projects/radiant.png')
 *     dev  -> /images/projects/radiant.png
 *     prod -> /portfolio/images/projects/radiant.png
 *
 * Content files always write paths from the root; this is the single place
 * that knows about the deployment prefix. External URLs pass straight through.
 */
export function asset(path: string): string {
  if (/^(https?:|mailto:|tel:|data:|#)/i.test(path)) return path
  const base = import.meta.env.BASE_URL // '/' in dev, '/portfolio/' in production
  return base.replace(/\/$/, '') + '/' + path.replace(/^\//, '')
}

/** The site's own absolute URL for a route, used for canonical and share tags. */
export function absoluteUrl(siteUrl: string, routePath: string): string {
  const root = siteUrl.replace(/\/$/, '')
  if (routePath === '/' || routePath === '') return `${root}/`
  return `${root}/${routePath.replace(/^\//, '')}`
}

/** "What I built" -> "what-i-built". Used for case-study section anchors. */
export function slugify(input: string): string {
  return input
    .normalize('NFKD')
    .replace(/\p{M}/gu, '') // strip combining accents left by NFKD
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** True for links that leave the site and therefore need rel="noreferrer". */
export function isExternal(href: string): boolean {
  return /^https?:\/\//i.test(href)
}

/**
 * A stable number in [0, 1) derived from a string. Used to give each project
 * without a thumbnail its own generated plate, deterministically — the same
 * project always draws the same figure.
 */
export function hash01(input: string, salt = 0): number {
  let h = 2166136261 ^ salt
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return ((h >>> 0) % 100000) / 100000
}

import { useEffect } from 'react'
import { site } from '@/data'
import { absoluteUrl } from '@/lib/utils'

interface PageMeta {
  /** Page title without the site name — that gets appended automatically. */
  title?: string
  description?: string
  /** Route path, e.g. '/projects/radiant'. Used for the canonical URL. */
  path: string
  /** Share image path under public/, e.g. '/images/projects/radiant.png'. */
  image?: string
  type?: 'website' | 'article'
  /** Structured data for search engines. Serialised into a JSON-LD script. */
  jsonLd?: Record<string, unknown>
}

function setTag(selector: string, create: () => HTMLElement, attr: string, value: string) {
  let el = document.head.querySelector<HTMLElement>(selector)
  if (!el) {
    el = create()
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

function setMeta(kind: 'name' | 'property', key: string, value: string) {
  setTag(
    `meta[${kind}="${key}"]`,
    () => {
      const m = document.createElement('meta')
      m.setAttribute(kind, key)
      return m
    },
    'content',
    value,
  )
}

/**
 * Sets the title, description, canonical URL and share tags for a page.
 *
 * This is a single-page app, so the tags in index.html are only ever the
 * defaults for the first paint; every route calls this to replace them. Crawlers
 * that execute JavaScript — which the major ones do — see the right values.
 */
export function usePageMeta({ title, description, path, image, type = 'website', jsonLd }: PageMeta) {
  const fullTitle = title ? `${title} · ${site.shortName}` : site.title
  const desc = description ?? site.description
  const canonical = absoluteUrl(site.url, path)
  const shareImage = image ?? site.ogImage

  useEffect(() => {
    document.title = fullTitle

    setMeta('name', 'description', desc)
    setTag(
      'link[rel="canonical"]',
      () => {
        const l = document.createElement('link')
        l.setAttribute('rel', 'canonical')
        return l
      },
      'href',
      canonical,
    )

    setMeta('property', 'og:title', title ?? site.title)
    setMeta('property', 'og:description', desc)
    setMeta('property', 'og:url', canonical)
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:site_name', site.shortName)
    setMeta('name', 'twitter:card', shareImage ? 'summary_large_image' : 'summary')
    setMeta('name', 'twitter:title', title ?? site.title)
    setMeta('name', 'twitter:description', desc)

    if (shareImage) {
      // Share scrapers do not resolve relative paths, so this has to be the
      // full public URL — built from site.url, not from the dev server.
      const absolute = /^https?:/i.test(shareImage)
        ? shareImage
        : absoluteUrl(site.url, shareImage)
      setMeta('property', 'og:image', absolute)
      setMeta('name', 'twitter:image', absolute)
    }
  }, [fullTitle, desc, canonical, title, type, shareImage])

  useEffect(() => {
    if (!jsonLd) return
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(jsonLd)
    document.head.appendChild(script)
    return () => {
      script.remove()
    }
    // The object is rebuilt on every render by callers, so compare by value.
  }, [JSON.stringify(jsonLd ?? null)])
}

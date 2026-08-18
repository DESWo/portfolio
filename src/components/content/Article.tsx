import { useEffect, useMemo, useState } from 'react'
import type { CaseStudySection } from '@/data'
import { cn, slugify } from '@/lib/utils'
import { Reveal } from '@/components/ui/Reveal'
import { BlockList, createNumbering, numberBlocks } from './Blocks'

export interface ResolvedSection extends CaseStudySection {
  anchor: string
}

/** Gives every section a stable anchor, from `id` or from its title. */
export function resolveSections(sections: CaseStudySection[]): ResolvedSection[] {
  const used = new Set<string>()
  return sections.map((section, i) => {
    let anchor = section.id ?? slugify(section.title) ?? `section-${i + 1}`
    if (!anchor) anchor = `section-${i + 1}`
    // Two sections called "Results" would otherwise fight over the same anchor.
    let candidate = anchor
    let n = 2
    while (used.has(candidate)) candidate = `${anchor}-${n++}`
    used.add(candidate)
    return { ...section, anchor: candidate }
  })
}

/**
 * Highlights the contents entry for whichever section is currently on screen.
 * Uses a band across the upper third of the viewport so the active entry
 * changes when a section reaches reading position, not when it first appears.
 */
function useActiveSection(anchors: string[]): string | null {
  const [active, setActive] = useState<string | null>(anchors[0] ?? null)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined' || anchors.length === 0) return

    const visible = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id
          if (entry.isIntersecting) visible.add(id)
          else visible.delete(id)
        }
        // Keep document order rather than intersection order.
        const first = anchors.find((a) => visible.has(a))
        if (first) setActive(first)
      },
      { rootMargin: '-88px 0px -62% 0px', threshold: 0 },
    )

    for (const anchor of anchors) {
      const el = document.getElementById(anchor)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [anchors.join('|')])

  return active
}

/** The sticky "Contents" rail beside a case study. */
export function ContentsRail({
  sections,
  className,
}: {
  sections: ResolvedSection[]
  className?: string
}) {
  const anchors = useMemo(() => sections.map((s) => s.anchor), [sections])
  const active = useActiveSection(anchors)

  if (sections.length < 2) return null

  return (
    <nav aria-label="Contents" className={className}>
      <p className="overline mb-4">Contents</p>
      <ol className="space-y-0.5">
        {sections.map((section, i) => {
          const isActive = active === section.anchor
          return (
            <li key={section.anchor}>
              <a
                href={`#${section.anchor}`}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'flex gap-3 border-l py-1.5 pl-3 text-[0.8125rem] leading-snug transition-colors duration-150',
                  isActive
                    ? 'border-accent text-ink'
                    : 'border-rule text-ink-faint hover:border-rule-strong hover:text-ink-muted',
                )}
              >
                <span className="font-mono text-[0.6875rem] tabular">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{section.title}</span>
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

/** The body of a case study or research page. */
export function Article({ sections }: { sections: ResolvedSection[] }) {
  // Number every figure, table and equation once, across the whole article.
  const numbering = useMemo(() => {
    const n = createNumbering()
    sections.forEach((section, i) => numberBlocks(n, `s${i}`, section.blocks))
    return n
  }, [sections])

  return (
    <div className="space-y-16 sm:space-y-20">
      {sections.map((section, i) => (
        <section key={section.anchor} id={section.anchor} className="scroll-mt-28">
          <Reveal className="article-grid mb-7">
            <header>
              {section.kicker ? (
                <p className="overline mb-2.5">{section.kicker}</p>
              ) : null}
              <h2 className="text-[1.375rem] font-semibold tracking-[-0.015em] text-ink sm:text-[1.6rem]">
                {section.title}
              </h2>
            </header>
          </Reveal>
          <BlockList blocks={section.blocks} prefix={`s${i}`} numbering={numbering} />
        </section>
      ))}
    </div>
  )
}

import type { Block, ImageRef } from '@/data'
import { asset, cn } from '@/lib/utils'

/**
 * Draws the content blocks a case study or research page is made of.
 *
 * Figures, tables and equations are numbered automatically and continuously
 * across the whole page, the way they are in a report — so a caption can say
 * "Fig. 3" and mean it. The numbers are worked out once by `numberBlocks`
 * below and passed in, rather than being counted during render.
 */

export interface BlockNumbering {
  figures: Map<string, number>
  tables: Map<string, number>
  equations: Map<string, number>
}

export function createNumbering(): BlockNumbering {
  return { figures: new Map(), tables: new Map(), equations: new Map() }
}

/** Assigns numbers to every numbered block in a list, in document order. */
export function numberBlocks(numbering: BlockNumbering, prefix: string, blocks: Block[]) {
  blocks.forEach((block, i) => {
    const key = `${prefix}:${i}`
    if (block.kind === 'figure' || block.kind === 'gallery' || block.kind === 'video') {
      numbering.figures.set(key, numbering.figures.size + 1)
    } else if (block.kind === 'table') {
      numbering.tables.set(key, numbering.tables.size + 1)
    } else if (block.kind === 'equation') {
      numbering.equations.set(key, numbering.equations.size + 1)
    }
  })
}

/* ------------------------------------------------------------------ */
/* Pieces                                                              */
/* ------------------------------------------------------------------ */

function Caption({ number, children }: { number?: number; children?: React.ReactNode }) {
  if (!children && number === undefined) return null
  return (
    <figcaption className="mt-3 text-[0.8125rem] leading-relaxed text-ink-faint">
      {number !== undefined ? (
        <span className="mr-1.5 font-mono text-[0.75rem] tracking-[0.08em] text-ink-muted uppercase">
          Fig. {number}
        </span>
      ) : null}
      {children}
    </figcaption>
  )
}

function Picture({ image, className }: { image: ImageRef; className?: string }) {
  return (
    <img
      src={asset(image.src)}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading="lazy"
      decoding="async"
      className={cn('w-full border border-rule bg-paper-sunken', className)}
    />
  )
}

/* ------------------------------------------------------------------ */
/* The renderer                                                        */
/* ------------------------------------------------------------------ */

function BlockView({
  block,
  id,
  numbering,
}: {
  block: Block
  id: string
  numbering: BlockNumbering
}) {
  switch (block.kind) {
    case 'text': {
      const paragraphs = Array.isArray(block.text) ? block.text : [block.text]
      return (
        <div className="prose-body space-y-5">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      )
    }

    case 'list': {
      const Tag = block.ordered ? 'ol' : 'ul'
      return (
        <Tag
          className={cn(
            'prose-body space-y-2.5 pl-5',
            block.ordered
              ? 'list-decimal marker:font-mono marker:text-[0.85em] marker:text-ink-faint'
              : 'list-none',
          )}
        >
          {block.items.map((item, i) => (
            <li key={i} className={cn(!block.ordered && 'relative')}>
              {!block.ordered ? (
                <span
                  aria-hidden="true"
                  className="absolute -left-5 top-[0.72em] block h-px w-3 bg-rule-strong"
                />
              ) : null}
              {item}
            </li>
          ))}
        </Tag>
      )
    }

    case 'definitions':
      return (
        <dl className="divide-y divide-rule border-y border-rule">
          {block.items.map((item, i) => (
            <div key={i} className="grid gap-1.5 py-5 sm:grid-cols-[minmax(0,11rem)_1fr] sm:gap-6">
              <dt className="text-[0.9rem] leading-snug font-semibold text-ink">{item.term}</dt>
              <dd className="prose-body text-[1rem] sm:text-[1.0625rem]">{item.description}</dd>
            </div>
          ))}
        </dl>
      )

    case 'figure':
      return (
        <figure>
          <Picture image={block.image} />
          <Caption number={numbering.figures.get(id)}>{block.image.caption}</Caption>
        </figure>
      )

    case 'gallery':
      return (
        <figure>
          <div
            className={cn(
              'grid gap-3',
              block.columns === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2',
            )}
          >
            {block.images.map((image, i) => (
              <Picture key={i} image={image} />
            ))}
          </div>
          <Caption number={numbering.figures.get(id)}>
            {block.images
              .map((im) => im.caption)
              .filter(Boolean)
              .join(' · ')}
          </Caption>
        </figure>
      )

    case 'equation': {
      const n = numbering.equations.get(id)
      return (
        <figure className="border-y border-rule py-6">
          <div className="flex items-baseline gap-4">
            <p className="grow overflow-x-auto font-serif text-[1.15rem] leading-relaxed text-ink sm:text-[1.35rem]">
              {block.expression}
            </p>
            {n !== undefined ? (
              <span className="shrink-0 font-mono text-[0.8125rem] text-ink-faint tabular">
                ({n})
              </span>
            ) : null}
          </div>
          {block.where?.length ? (
            <dl className="mt-4 space-y-1.5 text-[0.85rem] text-ink-muted">
              <dt className="font-mono text-[0.6875rem] tracking-[0.12em] text-ink-faint uppercase">
                where
              </dt>
              {block.where.map((w, i) => (
                <dd key={i} className="flex gap-3">
                  <span className="w-14 shrink-0 font-serif text-ink">{w.symbol}</span>
                  <span>{w.meaning}</span>
                </dd>
              ))}
            </dl>
          ) : null}
          {block.caption ? (
            <figcaption className="mt-4 text-[0.8125rem] leading-relaxed text-ink-faint">
              {block.caption}
            </figcaption>
          ) : null}
        </figure>
      )
    }

    case 'callout':
      return (
        <aside
          className={cn(
            'border-l-2 bg-paper-sunken px-5 py-4 sm:px-6 sm:py-5',
            block.tone === 'caution' ? 'border-accent' : 'border-rule-strong',
          )}
        >
          {block.title ? (
            <p className="mb-2 font-mono text-[0.6875rem] font-medium tracking-[0.12em] text-ink uppercase">
              {block.title}
            </p>
          ) : null}
          <p className="text-[0.925rem] leading-relaxed text-ink-muted">{block.text}</p>
        </aside>
      )

    case 'table':
      return (
        <figure>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[34rem] text-left text-[0.875rem]">
              <thead>
                <tr className="border-y border-rule-strong">
                  {block.columns.map((col) => (
                    <th
                      key={col}
                      scope="col"
                      className="py-2.5 pr-4 font-mono text-[0.6875rem] font-medium tracking-[0.1em] text-ink-muted uppercase"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-rule">
                {block.rows.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className={cn(
                          'py-3 pr-4 align-top leading-relaxed tabular',
                          j === 0 ? 'text-ink' : 'text-ink-muted',
                        )}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.caption ? (
            <figcaption className="mt-3 text-[0.8125rem] leading-relaxed text-ink-faint">
              <span className="mr-1.5 font-mono text-[0.75rem] tracking-[0.08em] text-ink-muted uppercase">
                Table {numbering.tables.get(id)}
              </span>
              {block.caption}
            </figcaption>
          ) : null}
        </figure>
      )

    case 'metrics':
      return (
        // A 1px ring per cell rather than gaps over a coloured container, so
        // any number of metrics tiles cleanly. See Engineering.tsx.
        <dl className="grid sm:grid-cols-3">
          {block.items.map((item, i) => (
            <div key={i} className="px-5 py-6 shadow-[0_0_0_1px_var(--rule)]">
              <dd className="text-[1.75rem] leading-none font-semibold text-ink tabular">
                {item.value}
              </dd>
              <dt className="mt-2 text-[0.8125rem] text-ink-muted">{item.label}</dt>
              {item.note ? (
                <p className="mt-1 font-mono text-[0.6875rem] tracking-[0.08em] text-ink-faint uppercase">
                  {item.note}
                </p>
              ) : null}
            </div>
          ))}
        </dl>
      )

    case 'steps':
      return (
        <ol className="divide-y divide-rule border-y border-rule">
          {block.items.map((item, i) => (
            <li key={i} className="grid gap-2 py-5 sm:grid-cols-[3rem_1fr] sm:gap-4">
              <span className="font-mono text-[0.8125rem] text-ink-faint tabular">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <p className="text-[0.95rem] font-semibold text-ink">{item.title}</p>
                <p className="prose-body mt-1.5 text-[1rem] sm:text-[1.0625rem]">{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      )

    case 'code':
      return (
        <figure>
          <pre className="overflow-x-auto border border-rule bg-paper-sunken px-4 py-4 text-[0.8125rem] leading-relaxed text-ink">
            <code>{block.code}</code>
          </pre>
          {block.caption ? (
            <figcaption className="mt-3 text-[0.8125rem] leading-relaxed text-ink-faint">
              {block.caption}
            </figcaption>
          ) : null}
        </figure>
      )

    case 'quote':
      return (
        <blockquote className="border-l-2 border-accent pl-5 sm:pl-6">
          <p className="font-serif text-[1.15rem] leading-relaxed text-ink italic sm:text-[1.3rem]">
            {block.text}
          </p>
          {block.attribution ? (
            <footer className="mt-3 font-mono text-[0.6875rem] tracking-[0.1em] text-ink-faint uppercase">
              {block.attribution}
            </footer>
          ) : null}
        </blockquote>
      )

    case 'video':
      return (
        <figure>
          <video
            src={asset(block.src)}
            poster={block.poster ? asset(block.poster) : undefined}
            controls
            preload="none"
            aria-label={block.alt}
            className="w-full border border-rule bg-paper-sunken"
          />
          <Caption number={numbering.figures.get(id)}>{block.caption}</Caption>
        </figure>
      )

    case 'embed':
      return (
        <div
          className="w-full border border-rule bg-paper-sunken"
          style={{ aspectRatio: block.aspect ?? '16/9' }}
        >
          <iframe
            src={block.src}
            title={block.title}
            loading="lazy"
            allowFullScreen
            className="size-full"
          />
        </div>
      )
  }
}

/** The width lane each block sits in. */
function widthOf(block: Block): 'text' | 'wide' | 'full' {
  switch (block.kind) {
    case 'figure':
      return block.width ?? 'wide'
    case 'gallery':
    case 'table':
    case 'metrics':
    case 'video':
    case 'embed':
      return 'wide'
    default:
      return 'text'
  }
}

export function BlockList({
  blocks,
  prefix,
  numbering,
}: {
  blocks: Block[]
  /** Unique per section, so numbering keys do not collide. */
  prefix: string
  numbering: BlockNumbering
}) {
  return (
    <div className="article-grid">
      {blocks.map((block, i) => {
        const id = `${prefix}:${i}`
        return (
          <div key={id} data-width={widthOf(block)}>
            <BlockView block={block} id={id} numbering={numbering} />
          </div>
        )
      })}
    </div>
  )
}

import type { Project } from '../types.ts'

/**
 * ============================================================================
 * COPY THIS FILE TO ADD A PROJECT
 * ============================================================================
 *
 *   1. Duplicate this file and rename it after your project, e.g. `heat-sink.ts`
 *   2. Rename the exported constant (`templateProject` -> `heatSink`)
 *   3. Fill in the fields below and delete the ones you do not need
 *   4. Register it in `index.ts` — that file controls the order projects appear in
 *
 * This file is NOT registered, so nothing here ever appears on the site. It is
 * safe to experiment in. Every field is documented in `../types.ts`, and your
 * editor will autocomplete all of them.
 *
 * The only required fields are: slug, title, summary, categories, status, date.
 * Everything else is optional and is simply left out of the page when missing.
 */
export const templateProject: Project = {
  /** URL segment. Lowercase, hyphens, unique. -> /projects/example-project */
  slug: 'example-project',

  title: 'Example Project',

  /** Optional second line. Good for expanding an acronym or a one-line hook. */
  subtitle: 'What it is, in five words',

  /** The card blurb. One or two sentences, under about 220 characters. */
  summary:
    'One or two sentences describing what this is and why it exists. This is what people read on the projects page before deciding whether to click.',

  /**
   * Pick from the ids in `../categories.ts`. The first one is treated as the
   * primary label. Your editor will list the valid options as you type.
   */
  categories: ['mechanical', 'cad'],

  /** 'active' | 'in-progress' | 'complete' | 'maintained' | 'paused' | 'concept' */
  status: 'in-progress',

  /** Shown exactly as written. */
  date: '2026',

  /** Machine-readable version of the same thing, for sorting and metadata. */
  sortDate: '2026-01',

  /** true puts it on the home page and pins it to the top of /projects. */
  featured: false,

  /**
   * Card image. Put the file in `public/images/projects/` and reference it
   * from the site root as below. Leave `thumbnail` out entirely and the site
   * draws a generated technical plate instead — which looks intentional, so
   * there is no rush.
   */
  thumbnail: {
    src: '/images/projects/example.png',
    alt: 'Describe what the picture shows, for anyone who cannot see it.',
    width: 1600,
    height: 1000,
  },

  /** Small tags under the summary. Tools, languages, materials, standards. */
  technologies: ['Autodesk Fusion', 'Python'],

  repo: 'https://github.com/DESWo/example',
  liveDemo: 'https://example.com',

  /** Anything that is not a repo or a demo: itch.io, a PDF, a video, a write-up. */
  links: [
    { label: 'Play on itch.io', href: 'https://example.itch.io/example' },
    { label: 'Design report', href: '/papers/example-report.pdf', note: 'PDF' },
  ],

  /** Short, factual outcomes. If you do not have any yet, delete this field. */
  achievements: ['Something specific and true that came out of the work.'],

  /** Slugs from this folder and from `../research.ts`. */
  relatedProjects: [],
  relatedResearch: [],

  /**
   * ---------------------------------------------------------------------
   * THE CASE STUDY (optional)
   * ---------------------------------------------------------------------
   * Delete this whole `caseStudy` block and the project stays a card with no
   * page of its own — which is the right choice for small projects.
   *
   * Keep it and you get a full page at /projects/<slug>, with a contents rail
   * built automatically from your section titles.
   *
   * Sections are yours to name. There is no required set. Common ones:
   * Motivation · What I built · How it works · Design process · Results ·
   * Challenges · Trade-offs · What I learned · Next.
   */
  caseStudy: {
    hero: {
      src: '/images/projects/example-hero.png',
      alt: 'A wide image at the top of the case study.',
      width: 2000,
      height: 1000,
    },

    /** One or two sentences under the title. */
    summary: 'The one-paragraph version of the whole page.',

    /** The sidebar facts. Role, dates, scale, team, constraints. */
    facts: [
      { label: 'Role', value: 'Sole author' },
      { label: 'Duration', value: 'Six weeks' },
    ],

    sections: [
      {
        title: 'Motivation',
        kicker: 'Why',
        blocks: [
          // --- Prose. A single string, or an array for several paragraphs. ---
          { kind: 'text', text: ['First paragraph.', 'Second paragraph.'] },
        ],
      },
      {
        title: 'Every block type, for reference',
        blocks: [
          { kind: 'text', text: 'Plain paragraphs.' },

          { kind: 'list', items: ['A bullet', 'Another bullet'], ordered: false },

          {
            kind: 'definitions',
            items: [{ term: 'Term', description: 'What it means in this project.' }],
          },

          {
            kind: 'figure',
            width: 'wide', // 'text' | 'wide' | 'full'
            image: {
              src: '/images/projects/example-figure.png',
              alt: 'What the figure shows.',
              caption: 'Figures are numbered automatically.',
              width: 1600,
              height: 900,
            },
          },

          {
            kind: 'gallery',
            columns: 2,
            images: [
              { src: '/images/projects/a.png', alt: 'First.' },
              { src: '/images/projects/b.png', alt: 'Second.' },
            ],
          },

          {
            kind: 'equation',
            // Plain text with real Unicode symbols — no LaTeX needed.
            expression: 'σ = F / A',
            where: [
              { symbol: 'σ', meaning: 'normal stress' },
              { symbol: 'F', meaning: 'applied force' },
              { symbol: 'A', meaning: 'cross-sectional area' },
            ],
            caption: 'Optional line underneath.',
          },

          {
            kind: 'callout',
            tone: 'caution', // 'note' | 'caution'
            title: 'A limitation worth stating',
            text: 'Use these for assumptions, caveats and trade-offs.',
          },

          {
            kind: 'table',
            caption: 'Optional caption.',
            columns: ['Option', 'Mass', 'Verdict'],
            rows: [
              ['Aluminum', '120 g', 'Chosen'],
              ['Steel', '340 g', 'Too heavy'],
            ],
          },

          {
            kind: 'metrics',
            items: [
              { value: '12 kN', label: 'Peak load', note: 'measured' },
              { value: '0.8 mm', label: 'Max deflection' },
            ],
          },

          {
            kind: 'steps',
            items: [
              { title: 'First', text: 'What happened first.' },
              { title: 'Then', text: 'What happened next.' },
            ],
          },

          {
            kind: 'code',
            language: 'python',
            caption: 'Optional caption.',
            code: 'def solve(k, f):\n    return k.solve(f)',
          },

          { kind: 'quote', text: 'A short pulled-out line.', attribution: 'Source' },

          {
            kind: 'video',
            src: '/video/example.mp4',
            poster: '/images/projects/example-poster.png',
            alt: 'What happens in the video.',
            caption: 'Optional caption.',
          },

          {
            kind: 'embed',
            src: 'https://itch.io/embed/000000',
            title: 'Playable build',
            aspect: '16/9',
          },
        ],
      },
    ],
  },
}

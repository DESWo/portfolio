import type { ResearchEntry } from './types.ts'

/**
 * Research and technical writing.
 *
 * The order of this array is the order entries appear on /research.
 * An entry with a `body` gets its own page at /research/<slug>; without one it
 * stays a card on the index.
 *
 * Statuses, in the order work usually moves through them:
 *
 *   exploring    reading around a subject, no question yet
 *   researching  a question is being worked, nothing written up
 *   draft        being written
 *   under-review submitted somewhere and waiting
 *   published    out in the world, with a link or a DOI
 *
 * Only ever move an entry to `published` when something is actually published.
 * The site prints the status next to the title, so it is doing real work.
 */
export const research: ResearchEntry[] = [
  {
    slug: 'tokamak-stellarator-comparison',
    title: 'Tokamak and stellarator reactor architectures: finding a question worth answering',
    authors: ['Desmond Wong'],
    date: 'August 2026 – present',
    sortDate: '2026-08',
    status: 'researching',
    topics: ['Fusion', 'Magnetic confinement', 'Plasma physics', 'Systems modeling'],
    abstract:
      'A phased project with two goals that advance together: learning magnetic-confinement physics well enough to independently defend every equation and assumption used, and producing a reproducible quantitative study of how tokamak and stellarator reactor architectures trade off. The research question is deliberately not yet chosen — it has to emerge from the literature rather than be assumed, and if the initial framing turns out to be weak, oversimplified, or already answered, the framing changes. A null result is an acceptable outcome.',
    relatedProject: 'fusion-sandbox',
    progress: [
      'Phase 1 (foundations): tutored lesson sequence in progress, working from reaction cross-sections and the triple product toward confinement scalings.',
      'Phase 2 (literature): triage queue assembled. Every citation recalled rather than read is marked unverified until it has been checked against the real source.',
      'Phase 3 (research gap): not started. No question is locked until one survives an evaluation for significance, novelty and feasibility.',
      'No model, no data, and no results yet — and none will be reported before the phase that produces them.',
    ],
    body: [
      {
        title: 'The shape of the project',
        kicker: 'Method',
        blocks: [
          {
            kind: 'text',
            text: 'The pipeline is gated, and the gates are the point. Skipping ahead to a model is the standard way an independent project produces a confident answer to a question nobody asked, so each phase has a written exit condition and none of them is "it seemed fine".',
          },
          {
            kind: 'table',
            columns: ['Phase', 'Exit gate'],
            rows: [
              [
                'Foundations',
                'The core concepts can be explained and defended unaided, in my own words.',
              ],
              [
                'Literature review',
                'Enough full-text-read anchor papers to map what is already known.',
              ],
              [
                'Research-gap search',
                'One question survives evaluation for significance, novelty and feasibility — and hostile review.',
              ],
              ['Research specification', 'The whole specification is written, reviewed and understood.'],
              [
                'Computational study',
                'The model reproduces published or analytic references before any novel comparison is run.',
              ],
              [
                'Results and manuscript',
                'Claims sized to the evidence; conclusions derived from results, never the reverse.',
              ],
            ],
          },
        ],
      },
      {
        title: 'Ground rules',
        kicker: 'Discipline',
        blocks: [
          {
            kind: 'list',
            items: [
              'No predetermined winner. A null result — no dramatic difference between architectures — is reportable.',
              'Literature read-status is labeled: full text examined, or abstract and metadata only. The distinction is never blurred.',
              'Any citation recalled from memory rather than read starts as unverified and must be checked against the real source before it is used.',
              'Every constant, equation, empirical scaling and parameter range in the eventual model needs provenance.',
              'No fabricated data, sources or results, and no silent tuning toward an expected answer. A hypothesis that changes after seeing data is documented, not hidden.',
              'The eventual model gets described as what it is — reduced-order and systems-level — and never as more.',
              'A continuously maintained log of where AI assistance was used, for later disclosure.',
            ],
          },
          {
            kind: 'callout',
            tone: 'note',
            title: 'Why this is on the site before there is a result',
            text: 'Because the method is the part I can currently vouch for. If this page still says "researching" in a year, that is information too.',
          },
        ],
      },
    ],
  },

  {
    slug: 'radiant-paper',
    title: 'Radiant: The Case for Nuclear Energy',
    authors: ['Desmond Wong'],
    date: '2026',
    sortDate: '2026-06',
    // TODO(Desmond): move this to 'under-review' once it is submitted, and to
    // 'published' when it is out — and fill in `publication` and `doi` then.
    // Either way, drop the PDF in public/papers/ and set `pdf` below.
    status: 'draft',
    topics: ['Nuclear energy', 'Energy policy', 'Science communication'],
    abstract:
      'An evidence-based argument for nuclear power assembled from primary sources: comparative death rates per terawatt-hour, lifecycle carbon intensity, capacity factors and operating costs, set against the accident record and the objections that are actually serious. Written with a limitations section that argues the other side — construction cost, financing risk, waste-repository politics, mining impacts, proliferation, and the genuine uncertainty around small modular reactors.',
    relatedProject: 'radiant',
    // TODO(Desmond): put the PDF at public/papers/radiant.pdf and uncomment.
    // pdf: '/papers/radiant.pdf',
    citation:
      'Wong, D. (2026). Radiant: The Case for Nuclear Energy. Unpublished manuscript.',
    progress: [
      'The argument and its full source list are already public as an interactive site — see the RADIANT project.',
      'Currently reaching out to nuclear policy and materials researchers as potential co-authors, with the aim of taking it toward publication.',
      'The written manuscript itself is not posted here yet.',
    ],
  },
]

/* ---------------------------------------------------------------------------
 * ADDING AN ENTRY
 *
 * Copy this into the array above and fill it in. Only slug, title, authors,
 * date, status, topics and abstract are required.
 *
 *   {
 *     slug: 'divertor-heat-flux',
 *     title: 'A short, specific title',
 *     authors: ['Desmond Wong'],
 *     date: 'Spring 2027',
 *     sortDate: '2027-03',
 *     status: 'exploring',
 *     topics: ['Fusion', 'Materials'],
 *     abstract: 'A paragraph: the question, and how it is being approached.',
 *     pdf: '/papers/divertor-heat-flux.pdf',      // file in public/papers/
 *     publication: { label: 'arXiv', href: 'https://arxiv.org/abs/...' },
 *     doi: '10.0000/example',                     // only when one exists
 *     relatedProject: 'fusion-sandbox',           // a slug from data/projects/
 *     figures: [{ src: '/images/research/fig1.png', alt: '...' }],
 *     citation: 'Wong, D. (2027). ...',
 *     progress: ['What is done', 'What is not'],
 *     body: [ ...sections, same block system as a project case study... ],
 *   }
 * ------------------------------------------------------------------------- */

export const visibleResearch: ResearchEntry[] = research.filter((r) => !r.draft)

export function getResearch(slug: string): ResearchEntry | undefined {
  return visibleResearch.find((r) => r.slug === slug)
}

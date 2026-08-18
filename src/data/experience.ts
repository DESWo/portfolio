import type { Experience } from './types.ts'

/**
 * Internships, programmes, jobs, leadership, and self-directed work.
 *
 * The order of this array is the order the timeline shows. Newest first reads
 * best. If this array is empty, the whole Experience section disappears from
 * the About page — nothing renders an empty heading.
 *
 * A full example with every field is at the bottom of this file. Copy it.
 *
 * TODO(Desmond): the `period` on the three entries below is a best guess from
 * your résumé, which listed them without dates. Correct them.
 */
export const experience: Experience[] = [
  {
    id: 'independent-engineering',
    role: 'Independent engineering projects',
    period: 'July 2026 – present',
    sortDate: '2026-07',
    kind: 'independent',
    summary:
      'Self-directed work: choosing a system I want to understand, building a model of it, and publishing the model with its sources and its limitations.',
    highlights: [
      'Five projects shipped or in progress across nuclear, fusion, structural and control systems.',
      'Every published model is backed by automated checks that run in CI, including physics validated against closed-form results and against independent reference integrations.',
      'Roughly 350 commits across the public repositories to date.',
    ],
    technologies: ['Python', 'TypeScript', 'React', 'Godot', 'Playwright', 'GitHub Actions'],
  },
  {
    id: 'jhu-see',
    role: 'Sustainable Energy Engineering',
    organization: 'Johns Hopkins Whiting School of Engineering — Pre-College Program',
    location: 'Pasadena, California',
    period: 'Summer 2026',
    sortDate: '2026-06',
    kind: 'program',
    summary:
      'University pre-college programme in sustainable energy engineering, carrying three transferable credits.',
  },
  {
    id: 'wcn',
    role: 'Core Member',
    organization: 'WCN (nonprofit)',
    period: '2025 – present',
    sortDate: '2025-01',
    kind: 'leadership',
    summary:
      'Design client websites and lead client outreach for a student-run nonprofit.',
    highlights: ['The team has facilitated over $100,000 in client revenue.'],
    technologies: ['Wix', 'Figma'],
  },
  {
    id: 'ans',
    role: 'Member',
    organization: 'American Nuclear Society',
    period: '2026 – present',
    sortDate: '2026-01',
    kind: 'program',
  },

  /* ---------------------------------------------------------------------
   * TODO(Desmond): add internships, programmes, jobs and further leadership
   * roles here as they happen. Copy the block below, fill it in, and put it
   * above the entry that came before it.
   *
   * {
   *   id: 'summer-lab-2027',
   *   role: 'Research Intern',
   *   organization: 'Some National Laboratory',
   *   location: 'Somewhere, CA',
   *   period: 'Jun 2027 – Aug 2027',
   *   sortDate: '2027-06',
   *   kind: 'internship',   // work | internship | program | leadership | coursework | independent
   *   summary: 'One sentence of context — what the group does and what you were there for.',
   *   highlights: [
   *     'What you actually did, specifically.',
   *     'A second thing. Two to four lines reads best.',
   *   ],
   *   technologies: ['Python', 'MATLAB'],
   *   links: [{ label: 'Programme page', href: 'https://example.org' }],
   * },
   * ------------------------------------------------------------------- */
]

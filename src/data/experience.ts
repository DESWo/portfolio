import type { Experience } from './types.ts'

/**
 * Internships, programmes, jobs, leadership, and self-directed work.
 *
 * The order of this array is the order the timeline shows. Newest first reads
 * best. If this array is empty, the whole Experience section disappears from
 * the About page — nothing renders an empty heading.
 *
 * A full example with every field is at the bottom of this file. Copy it.
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
      'Four projects shipped or in progress across nuclear, fusion, structural and control systems.',
      'Every published model is backed by automated checks that run in CI, including physics validated against closed-form results and against independent reference integrations.',
      'Roughly 350 commits across the public repositories to date.',
    ],
    technologies: ['Python', 'TypeScript', 'React', 'Godot', 'Playwright', 'GitHub Actions'],
  },

  /* ---------------------------------------------------------------------
   * TODO(Desmond): add internships, programmes, jobs, clubs and leadership
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

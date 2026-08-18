/**
 * One import for everything.
 *
 *   import { profile, orderedProjects, skillGroups } from '@/data'
 *
 * Components read from here. You edit the individual files next to this one —
 * this file only re-exports them, and never needs changing unless you add a
 * whole new kind of content.
 */

export * from './types.ts'
export * from './categories.ts'
export { site, primaryNav } from './site.ts'
export { profile } from './profile.ts'
export { contactLinks, activeContactLinks } from './links.ts'
export type { ContactLink, IconName } from './links.ts'
export {
  projects,
  visibleProjects,
  orderedProjects,
  featuredProjects,
  getProject,
  usedCategoryIds,
  countByCategory,
} from './projects/index.ts'
export { research, visibleResearch, getResearch } from './research.ts'
export { experience } from './experience.ts'
export { education } from './education.ts'
export { certifications } from './certifications.ts'
export { skillGroups } from './skills.ts'

import type { ProjectStatus, ResearchStatus } from './types.ts'

/** How each project status is written on screen. */
export const PROJECT_STATUS_LABEL: Record<ProjectStatus, string> = {
  active: 'Active',
  'in-progress': 'In progress',
  complete: 'Complete',
  maintained: 'Maintained',
  paused: 'Paused',
  concept: 'Concept',
}

/** How each research status is written on screen. */
export const RESEARCH_STATUS_LABEL: Record<ResearchStatus, string> = {
  exploring: 'Exploring',
  researching: 'Researching',
  draft: 'Draft',
  'under-review': 'Under review',
  published: 'Published',
}

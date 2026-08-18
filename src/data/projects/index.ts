import type { Project } from '../types.ts'

import { radiant } from './radiant.ts'
import { fusioncore } from './fusioncore.ts'
import { neutronTransport } from './neutron-transport.ts'
import { engineeringExplorer } from './engineering-explorer.ts'
import { fusionSandbox } from './fusion-sandbox.ts'
import { digitalElectronics } from './digital-electronics.ts'
import { principlesOfEngineering } from './principles-of-engineering.ts'
import { introEngineeringDesign } from './intro-engineering-design.ts'
import { outreachTool } from './outreach-tool.ts'

/**
 * ============================================================================
 * THE PROJECT REGISTRY — this array is the order projects appear in
 * ============================================================================
 *
 * Add a project    : copy `_template.ts`, then add one import line above and
 *                    one entry to the array below.
 * Remove a project : delete its line from the array. Keep or delete the file;
 *                    a file that is not listed here is simply not on the site.
 * Reorder projects : move lines around in this array. That is the whole
 *                    mechanism — there is no `order:` number to keep in sync.
 *
 * Featured projects are pinned above the rest wherever order matters, so this
 * array only decides the order *within* the featured group and *within* the
 * rest. Set `featured: true` in a project file to promote it.
 *
 * Four are featured, which is about as many as the home page carries before it
 * gets long. The self-directed work leads; the coursework builds follow.
 */
export const projects: Project[] = [
  radiant,
  fusioncore,
  neutronTransport,
  engineeringExplorer,
  fusionSandbox,
  digitalElectronics,
  principlesOfEngineering,
  introEngineeringDesign,
  outreachTool,
]

/** Everything except drafts. This is what the site actually renders. */
export const visibleProjects: Project[] = projects.filter((p) => !p.draft)

/** Featured first, then the rest, each keeping the order of the array above. */
export const orderedProjects: Project[] = [
  ...visibleProjects.filter((p) => p.featured),
  ...visibleProjects.filter((p) => !p.featured),
]

export const featuredProjects: Project[] = visibleProjects.filter((p) => p.featured)

export function getProject(slug: string): Project | undefined {
  return visibleProjects.find((p) => p.slug === slug)
}

/** Category ids that at least one visible project uses — the filter options. */
export function usedCategoryIds(): string[] {
  const seen = new Set<string>()
  for (const project of visibleProjects) {
    for (const id of project.categories) seen.add(id)
  }
  return [...seen]
}

/** How many visible projects carry a given category. */
export function countByCategory(id: string): number {
  return visibleProjects.filter((p) => (p.categories as readonly string[]).includes(id)).length
}

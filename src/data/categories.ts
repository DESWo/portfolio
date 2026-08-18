import type { Category } from './types.ts'

/**
 * The vocabulary of project categories.
 *
 * Only categories that at least one visible project actually uses appear as a
 * filter on /projects, so it is safe to define one here ahead of time and
 * start using it the day you have a project for it. Nothing empty is ever
 * shown to a visitor.
 *
 * To add a category: add an entry to this array. Your editor will immediately
 * offer the new id in the `categories: [...]` field of every project file, and
 * flag any typo as an error.
 *
 * To remove one: delete the entry, then fix the projects your editor
 * underlines. `npm run check` also reports it.
 */
export const CATEGORIES = [
  {
    id: 'nuclear',
    label: 'Nuclear',
    description: 'Fission systems, reactor physics, and the case for nuclear power.',
  },
  {
    id: 'fusion',
    label: 'Fusion',
    description: 'Magnetic confinement, plasma physics, and fusion energy systems.',
  },
  {
    id: 'simulation',
    label: 'Simulation',
    description: 'Physical models solved numerically and driven in real time.',
  },
  {
    id: 'software',
    label: 'Software',
    description: 'Applications built end to end, from the model to the interface.',
  },
  {
    id: 'research',
    label: 'Research',
    description: 'Literature work, method design, and quantitative investigation.',
  },
  {
    id: 'data',
    label: 'Data',
    description: 'Sourcing, checking, and presenting numbers honestly.',
  },
  {
    id: 'education',
    label: 'Education',
    description: 'Explaining technical systems to people who do not already know them.',
  },
  {
    id: 'cad',
    label: 'CAD',
    description: 'Parts and assemblies modelled in Autodesk Fusion.',
  },
  {
    id: 'mechanical',
    label: 'Mechanical',
    description: 'Structures, mechanisms, and mechanical design.',
  },
  {
    id: 'electrical',
    label: 'Electrical',
    description: 'Circuits, controls, and instrumentation.',
  },
  {
    id: 'civil',
    label: 'Civil',
    description: 'Structural and infrastructure engineering.',
  },
] as const satisfies readonly Category[]

/**
 * Every id above, as a type. This is what makes `categories: ['fusionn']` a
 * red squiggle instead of a filter that silently matches nothing.
 */
export type CategoryId = (typeof CATEGORIES)[number]['id']

const BY_ID = new Map<string, Category>(CATEGORIES.map((c) => [c.id, c]))

export function getCategory(id: string): Category | undefined {
  return BY_ID.get(id)
}

/** The display label for a category id, falling back to the id itself. */
export function categoryLabel(id: string): string {
  return BY_ID.get(id)?.label ?? id
}

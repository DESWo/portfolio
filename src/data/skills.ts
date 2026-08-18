import type { SkillGroup } from './types.ts'

/**
 * What you can actually do, grouped.
 *
 * There is deliberately no proficiency level, star rating or percentage bar.
 * A number out of ten is unfalsifiable and everyone marks themselves 8/10.
 * Instead, a skill can point at the projects that demonstrate it, and the site
 * turns each one into a link — so the evidence is one click away.
 *
 *   evidence: ['fusioncore', 'radiant']   <- slugs from data/projects/
 *
 * A skill with no evidence yet is fine. It just renders without links.
 * `npm run check` will tell you if you typo a slug.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: 'engineering',
    title: 'Engineering & physics',
    description: 'Subject matter I have modelled, not subject matter I have read about.',
    skills: [
      {
        name: 'Reactor physics',
        note: 'Point kinetics, delayed neutrons, Doppler and coolant feedback, xenon poisoning, decay heat.',
        evidence: ['radiant', 'fusioncore'],
      },
      {
        name: 'Magnetic confinement',
        note: 'Charged-particle motion in magnetic fields, confinement scaling, density and beta limits.',
        evidence: ['fusion-sandbox', 'fusioncore'],
      },
      {
        name: 'Fusion reaction physics',
        note: 'Maxwellian-averaged reactivity, the triple product, engineering versus physics Q.',
        evidence: ['fusioncore'],
      },
      {
        name: 'Structural analysis',
        note: 'Direct stiffness method for trusses; recognising a mechanism from a singular system.',
        evidence: ['engineering-explorer'],
      },
      {
        name: 'Mechanical vibration',
        note: 'Base-excitation transmissibility, resonance, and what happens past the crossover.',
        evidence: ['engineering-explorer'],
      },
      {
        name: 'Energy systems',
        note: 'Generation mix, capacity factor, carbon intensity, levelised cost, recirculating power.',
        evidence: ['radiant', 'fusioncore'],
      },
      {
        name: 'CAD',
        // TODO(Desmond): once a CAD project is on the site, add its slug to
        // `evidence` here and this line grows a link to it.
        note: 'Part and assembly modelling in Autodesk Fusion.',
      },
    ],
  },

  {
    id: 'modelling',
    title: 'Modelling & numerical methods',
    description: 'Turning a physical system into something a computer can answer questions about.',
    skills: [
      {
        name: 'Numerical integration',
        note: 'Boris pusher for charged particles; Runge–Kutta used as an independent reference.',
        evidence: ['fusion-sandbox', 'radiant'],
      },
      {
        name: 'Linear systems',
        note: 'Assembling and solving stiffness systems by Gaussian elimination with partial pivoting.',
        evidence: ['engineering-explorer'],
      },
      {
        name: 'Curve fitting',
        note: 'Log–log polynomial fits to tabulated reaction data, checked against a published parameterisation away from the anchors.',
        evidence: ['fusioncore'],
      },
      {
        name: 'Model validation',
        note: 'Analytic comparison, convergence-order testing, and mutation testing to prove the tests can actually fail.',
        evidence: ['fusion-sandbox', 'engineering-explorer'],
      },
      {
        name: 'Real-time simulation',
        note: 'Fixed-tick engines that stay stable and readable while a person is changing the inputs.',
        evidence: ['fusioncore', 'engineering-explorer'],
      },
    ],
  },

  {
    id: 'software',
    title: 'Software',
    description: 'Languages and libraries I have shipped something non-trivial in.',
    skills: [
      { name: 'Python', note: 'Physics backends, packaging, pytest.', evidence: ['fusion-sandbox'] },
      {
        name: 'TypeScript',
        note: 'Typed simulation and application code.',
        evidence: ['engineering-explorer'],
      },
      {
        name: 'JavaScript',
        note: 'Plain ES modules with no build step, when that is the right call.',
        evidence: ['radiant'],
      },
      {
        name: 'React',
        note: 'Application structure and state, with the physics kept outside the components.',
        evidence: ['fusioncore', 'engineering-explorer'],
      },
      {
        name: 'HTML & CSS',
        note: 'Semantic markup, modern layout, and design systems built on custom properties.',
        evidence: ['radiant'],
      },
      { name: 'GDScript & Godot', note: 'Interactive 3D front ends.', evidence: ['fusion-sandbox'] },
      { name: 'Three.js', note: 'Real-time 3D in the browser.', evidence: ['fusioncore'] },
      { name: 'SVG', note: 'Hand-authored technical diagrams and animated schematics.', evidence: ['radiant'] },
    ],
  },

  {
    id: 'practice',
    title: 'Tools & practice',
    description: 'How the work gets checked, shipped and kept honest.',
    skills: [
      {
        name: 'Git & GitHub',
        note: 'Branching, review, and GitHub Actions running the checks on every push.',
        evidence: ['radiant', 'engineering-explorer'],
      },
      {
        name: 'Automated testing',
        note: 'Playwright end-to-end suites, pytest, and headless engine smoke tests.',
        evidence: ['radiant', 'fusion-sandbox'],
      },
      {
        name: 'Sourcing & citation',
        note: 'Primary sources only, with access dates, and read-status tracked honestly.',
        evidence: ['radiant'],
      },
      {
        name: 'Accessibility',
        note: 'Keyboard paths for every control, contrast asserted by script, reduced-motion support.',
        evidence: ['fusioncore', 'engineering-explorer'],
      },
      { name: 'Autodesk Fusion', note: 'Parametric modelling.' },
      { name: 'Excel & Google Sheets', note: 'Data tidying and quick analysis.' },
      { name: 'Technical writing', note: 'Documenting what a model assumes and where it bends.' },
    ],
  },
]

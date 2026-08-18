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
    description: 'Subject matter I have modeled or built, not subject matter I have read about.',
    skills: [
      {
        name: 'Reactor physics',
        note: 'Point kinetics, delayed neutrons, Doppler and coolant feedback, xenon poisoning, decay heat.',
        evidence: ['radiant', 'fusioncore'],
      },
      {
        name: 'Neutron transport',
        note: 'Monte Carlo histories, continuous-energy cross sections, criticality calculation.',
        evidence: ['neutron-transport'],
      },
      {
        name: 'Magnetic confinement',
        note: 'Charged-particle motion in magnetic fields, confinement scaling, density and beta limits.',
        evidence: ['fusion-sandbox', 'fusioncore'],
      },
      {
        name: 'Fusion reaction physics',
        note: 'Maxwellian-averaged reactivity, the Lawson criterion and triple product, engineering versus physics Q.',
        evidence: ['fusioncore'],
      },
      {
        name: 'Structural analysis',
        note: 'Direct stiffness method for trusses, force-to-weight optimization, recognizing a mechanism from a singular system.',
        evidence: ['principles-of-engineering', 'engineering-explorer'],
      },
      {
        name: 'Mechanical systems',
        note: 'Base-excitation transmissibility and resonance; hydraulics and Pascal’s law in a working mechanism.',
        evidence: ['engineering-explorer', 'principles-of-engineering'],
      },
      {
        name: 'Materials testing',
        note: 'Reading stress–strain curves for yield point, ultimate strength, modulus of elasticity and modulus of resilience.',
        evidence: ['principles-of-engineering'],
      },
      {
        name: 'Digital logic',
        note: 'Combinational and sequential design, K-mapping, Boolean minimization, universal-gate implementation.',
        evidence: ['digital-electronics'],
      },
      {
        name: 'Energy systems',
        note: 'Generation mix, capacity factor, carbon intensity, levelized cost, recirculating power, thermal insulation.',
        evidence: ['radiant', 'fusioncore'],
      },
    ],
  },

  {
    id: 'modeling',
    title: 'Modeling & numerical methods',
    description: 'Turning a physical system into something a computer can answer questions about.',
    skills: [
      {
        name: 'Monte Carlo methods',
        note: 'Sampling particle histories and reading the answer out of the statistics rather than out of an equation.',
        evidence: ['neutron-transport'],
      },
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
        note: 'Log–log polynomial fits to tabulated reaction data, checked against a published parameterization away from the anchors.',
        evidence: ['fusioncore'],
      },
      {
        name: 'Statistical analysis',
        note: 'Chi-square goodness-of-fit against a stated null hypothesis, standard deviation, and testing enough samples to tell a real difference from spread.',
        evidence: ['principles-of-engineering', 'intro-engineering-design'],
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
      {
        name: 'Python',
        note: 'Physics backends, packaging, pytest, robotics and sensor code.',
        evidence: ['fusion-sandbox', 'principles-of-engineering', 'digital-electronics'],
      },
      { name: 'C++', note: 'College coursework — Programming I.' },
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
      {
        name: 'SVG',
        note: 'Hand-authored technical diagrams and animated schematics.',
        evidence: ['radiant'],
      },
    ],
  },

  {
    id: 'making',
    title: 'CAD & fabrication',
    description: 'The half of engineering that ends up on a bench rather than on a screen.',
    skills: [
      {
        name: 'Autodesk Fusion 360',
        note: 'Certified user. Parametric part and assembly modeling for printed and machined parts.',
        evidence: ['principles-of-engineering', 'intro-engineering-design'],
      },
      {
        name: 'Technical drawing',
        note: 'Isometric and multiview projection, GD&T, fully dimensioned drawings somebody else could build from.',
        evidence: ['intro-engineering-design'],
      },
      {
        name: '3D printing',
        note: 'Designing for the process, and iterating a part across several prints.',
        evidence: ['principles-of-engineering', 'intro-engineering-design'],
      },
      {
        name: 'Breadboarding & soldering',
        note: 'Building logic circuits on the bench, and moving them onto programmable logic.',
        evidence: ['digital-electronics'],
      },
      {
        name: 'Sensors & embedded I/O',
        note: 'Raspberry Pi with distance and motion sensors, turning physical movement into input a program can act on.',
        evidence: ['digital-electronics'],
      },
      {
        name: 'Hydraulics & mechanisms',
        note: 'Syringe hydraulics, scissor lifts, and linkages that have to survive being operated.',
        evidence: ['principles-of-engineering'],
      },
      {
        name: 'Robotics',
        note: 'VEX V5 construction and control code with distance and color sensing.',
        evidence: ['principles-of-engineering'],
      },
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
      {
        name: 'Project management',
        note: 'Gantt charts, SCRUM logs, decision matrices, and iterative design and testing.',
        evidence: ['intro-engineering-design'],
      },
      { name: 'Multisim & MDSolids', note: 'Circuit simulation and structural analysis.' },
      { name: 'Figma', note: 'Interface and editorial layout work.' },
      { name: 'Technical writing', note: 'Documenting what a model assumes and where it bends.' },
    ],
  },
]

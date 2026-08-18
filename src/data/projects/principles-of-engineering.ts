import type { Project } from '../types.ts'

export const principlesOfEngineering: Project = {
  slug: 'principles-of-engineering',
  title: 'Principles of Engineering',
  subtitle: 'Trusses, hydraulics, robotics and thermal design',
  summary:
    'A year of physical builds with a number attached to each one: a balsa truss bridge optimised for force-to-weight, a syringe-hydraulic claw, VEX robots in Python, and an insulation panel validated with probe testing.',
  categories: ['mechanical', 'civil', 'electrical', 'cad'],
  status: 'complete',
  date: '2024 – 2025',
  sortDate: '2024-08',
  technologies: [
    'MDSolids',
    'Autodesk Fusion 360',
    '3D printing',
    'VEX V5',
    'Python',
    'Syringe hydraulics',
    'Vernier probes',
  ],

  caseStudy: {
    summary:
      'Second year of the PLTW sequence, and the first one where every project had a measurable target rather than just a working/not-working outcome.',
    facts: [
      { label: 'Course', value: 'PLTW Principles of Engineering — Year 2' },
      { label: 'School', value: 'Diamond Bar High School' },
      { label: 'Year', value: '2024 – 2025' },
    ],
    sections: [
      {
        title: 'Ten designs before one bridge',
        kicker: 'Structures',
        blocks: [
          {
            kind: 'text',
            text: 'Ten truss configurations were modelled in MDSolids before anything was cut. Analysing them first is the point of the exercise: the software shows you which members go into tension and which into compression, and by how much, so you can see a design fail on screen instead of finding out on the test rig.',
          },
          {
            kind: 'text',
            text: 'The chosen design was then calculated by hand and built from balsa, optimised for force-to-weight efficiency under a strict weight limit. That constraint is what makes the problem real — a bridge that carries the load is easy, and a bridge that carries the load while weighing almost nothing is a structural argument about where material actually needs to be.',
          },
          {
            kind: 'equation',
            expression: 'efficiency = F_max / W',
            where: [
              { symbol: 'F_max', meaning: 'load at failure' },
              { symbol: 'W', meaning: 'mass of the structure' },
            ],
            caption:
              'The figure the whole build was tuned against. Adding material almost always raises F_max and always raises W, so every decision is a trade rather than an improvement.',
          },
        ],
      },
      {
        title: 'Pressure, and printed parts',
        kicker: 'Mechanisms',
        blocks: [
          {
            kind: 'text',
            text: 'A hydraulic claw machine driven by syringe hydraulics and a scissor-lift mechanism. Pascal’s law does the work: pressure applied to a confined fluid is transmitted undiminished, so a small force over a large piston area becomes a large force at the claw. The custom parts were modelled in Fusion 360 and 3D printed, which was the first time a dimension being wrong in CAD cost me an hour of printing rather than a minute of redrawing.',
          },
        ],
      },
      {
        title: 'Robots, and 575 lines that did not need to exist',
        kicker: 'Controls',
        blocks: [
          {
            kind: 'text',
            text: 'VEX V5 robots programmed in Python — distance sensing, colour sensing, conditional logic — and a working pinball machine, wired and coded end to end.',
          },
          {
            kind: 'metrics',
            items: [
              { value: '700+', label: 'Lines in the first working version' },
              { value: '125', label: 'Lines after refactoring', note: 'same behaviour' },
            ],
          },
          {
            kind: 'text',
            text: 'The pinball control code started at over seven hundred lines and ended at a hundred and twenty-five, entirely by pulling repeated blocks into functions and loops. Nothing about what the machine did changed. What changed was that the version I could still read a week later was the short one — which is the lesson, and it is not one you learn from a program that was short to begin with.',
          },
        ],
      },
      {
        title: 'Insulation, measured rather than claimed',
        kicker: 'Thermal',
        blocks: [
          {
            kind: 'text',
            text: 'A composite insulation lid built from recycled materials, reaching an estimated R-value of 14 to 16. The number came from Vernier temperature probe testing rather than from the datasheet of any one material — which matters for a composite, where the assembled performance is not the sum of the parts.',
          },
        ],
      },
    ],
  },
}

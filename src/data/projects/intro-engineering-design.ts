import type { Project } from '../types.ts'

export const introEngineeringDesign: Project = {
  slug: 'intro-engineering-design',
  title: 'Introduction to Engineering Design',
  subtitle: 'The design process, run end to end',
  summary:
    'First year of the sequence: a spring-launched projectile device refined through decision matrices and statistical testing, and an arcade skee-ball machine built entirely from reclaimed materials.',
  categories: ['cad', 'mechanical'],
  status: 'complete',
  date: '2023 – 2024',
  sortDate: '2023-08',
  technologies: [
    'Autodesk Fusion 360',
    '3D printing',
    'Decision matrices',
    'Gantt charts',
    'SCRUM',
  ],

  caseStudy: {
    summary:
      'The year the process itself was the subject. Every build had to be justified with a decision matrix, tracked on a schedule, and tested against numbers rather than against whether it looked finished.',
    facts: [
      { label: 'Course', value: 'PLTW Introduction to Engineering Design — Year 1' },
      { label: 'School', value: 'Diamond Bar High School' },
      { label: 'Year', value: '2023 – 2024' },
    ],
    sections: [
      {
        title: 'A launcher, and the case for testing',
        kicker: 'Process',
        blocks: [
          {
            kind: 'text',
            text: 'A spring-launched projectile device, taken through the full design process: decision matrices to choose between concepts, iterative prototyping, and statistical testing of the result rather than a single triumphant launch.',
          },
          {
            kind: 'text',
            text: 'The statistics are the part that stuck. One good throw tells you almost nothing about a launcher, because the spread between shots is usually larger than the difference between two designs. Testing enough shots to say which design is actually better — rather than which one happened to win — is the first genuinely engineering-shaped thing I remember doing.',
          },
        ],
      },
      {
        title: 'Skee-ball, from a skip',
        kicker: 'Build',
        blocks: [
          {
            kind: 'text',
            text: 'I led the design and construction of a working arcade skee-ball machine built entirely from reclaimed materials. The build was managed with a Gantt chart and daily SCRUM logs, which on a machine that size is less bureaucracy than it sounds: a ramp angle decided on Tuesday constrains a scoring ring that somebody else is cutting on Wednesday.',
          },
          {
            kind: 'callout',
            tone: 'note',
            title: 'What the constraint taught',
            text: 'Building only from reclaimed material inverts the usual design order. You do not specify a part and then source it; you look at what you have and design around its dimensions. It is a real constraint, and it is the same one that makes recycling hard at industrial scale.',
          },
        ],
      },
      {
        title: 'Drawing properly',
        kicker: 'CAD',
        blocks: [
          {
            kind: 'text',
            text: 'Isometric, multiview and fully dimensioned drawings produced in Fusion 360, then 3D printed and iterated through several cycles. A fully dimensioned drawing is not decoration — it is the difference between a model only you can build from and a model somebody else can manufacture without asking you a question.',
          },
        ],
      },
    ],
  },
}

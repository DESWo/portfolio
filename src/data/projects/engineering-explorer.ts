import type { Project } from '../types.ts'

export const engineeringExplorer: Project = {
  slug: 'engineering-explorer',
  title: 'Engineering Explorer',
  subtitle: 'Twelve fields, thirty-six simulations',
  summary:
    'A browser app for finding out what engineers actually do. Every challenge is a real solver — a truss stiffness method, closed-form inverse kinematics, a transmissibility model — not a quiz with a picture on it.',
  categories: ['software', 'simulation', 'education', 'mechanical', 'civil', 'electrical'],
  status: 'active',
  date: 'July 2026 – present',
  sortDate: '2026-07',
  featured: true,
  thumbnail: {
    src: '/images/projects/engineering-explorer.jpg',
    alt: 'The Engineering Explorer landing page, showing the twelve engineering fields as sketch-styled cards.',
    width: 1600,
    height: 1000,
  },
  technologies: [
    'React 19',
    'TypeScript',
    'Vite',
    'Tailwind CSS',
    'Framer Motion',
    'Rough.js',
    'Matter.js',
    'Node.js',
  ],
  repo: 'https://github.com/DESWo/Eng-Ex',
  liveDemo: 'https://deswo.github.io/Eng-Ex/',
  achievements: [
    'Twelve fields, thirty-six simulations, five levels each — playable end to end.',
    'Six of the physics models are pinned by offline scripts that re-derive every level’s intended lesson.',
    'No simulation uses a slider: every control is direct manipulation, and every draggable handle has a keyboard path.',
  ],
  relatedProjects: ['fusioncore', 'radiant'],

  caseStudy: {
    summary:
      'Most “explore engineering” material describes a field. This one hands you its actual problem, at a size you can solve in five minutes, and lets you fail at it in the way the field fails.',
    facts: [
      { label: 'Role', value: 'Sole author' },
      { label: 'Started', value: 'July 2026' },
      { label: 'Scope', value: '12 fields · 36 simulations · 5 levels each' },
      { label: 'Backend', value: 'None — everything runs client side' },
    ],
    sections: [
      {
        title: 'The problem with career exploration',
        kicker: 'Motivation',
        blocks: [
          {
            kind: 'text',
            text: [
              'Everything written to introduce teenagers to engineering describes fields from the outside: civil engineers build bridges, electrical engineers work with circuits. That tells you what the output is and nothing about what the work feels like, which is the only thing a fifteen-year-old is actually trying to find out.',
              'What distinguishes the fields is the shape of their problems. Structural work is about load paths and the moment a structure stops being a structure. Controls is about lag. Chemical is about equilibrium moving under you. You cannot get that from a description — you get it from having the problem.',
            ],
          },
        ],
      },
      {
        title: 'Simulations, not quizzes',
        kicker: 'What I built',
        blocks: [
          {
            kind: 'text',
            text: 'Twelve fields, three challenges each, five levels deep, plus a short intro, reflection questions and a project you can build at home. It all runs client side and saves to localStorage — no server, no account. The ones worth looking at:',
          },
          {
            kind: 'definitions',
            items: [
              {
                term: 'Bridge Builder — civil',
                description:
                  'A 2D truss stiffness solver. It assembles the global stiffness system from whatever joints and members you drew, solves it by Gaussian elimination with partial pivoting, and re-solves at every road joint as the truck crosses, keeping the worst member force it sees. Draw too few triangles and the deflections blow up — which is how it detects that you have built a mechanism rather than a structure.',
              },
              {
                term: 'Robot Arm — robotics',
                description:
                  'Closed-form inverse kinematics for a two-link arm: both the elbow-up and elbow-down solutions, with joint limits and a shelf to reach around.',
              },
              {
                term: 'Smooth Ride — mechanical',
                description:
                  'One-degree-of-freedom base-excitation transmissibility, numerator and all. The firm suspension that wins level 2 shakes apart on the washboard road in level 3 because the road frequency lands on its natural frequency — and level 4 turns on the part most textbooks stop before, where past the crossover the dampers that saved you at resonance start feeding the road back into the body.',
              },
              {
                term: 'Reactor Control — nuclear',
                description:
                  'A lagged feedback simulation on a 300 ms tick. The core closes a fraction of the gap to demand each tick, so chasing the setpoint overshoots it. Lag is the entire lesson.',
              },
              {
                term: 'The Right Dose — chemical',
                description:
                  'A weak-acid titration curve computed from a pKa, so the buffer region is genuinely gentle and the equivalence point is genuinely nearly vertical.',
              },
            ],
          },
          {
            kind: 'equation',
            expression: 'K u = f',
            where: [
              { symbol: 'K', meaning: 'global stiffness matrix, assembled from the members you drew' },
              { symbol: 'u', meaning: 'joint displacements — what the solver returns' },
              { symbol: 'f', meaning: 'applied loads, including the truck at its current position' },
            ],
            caption:
              'The bridge challenge in one line. A singular K isn’t a numerical accident here — it’s the game telling you the structure is a mechanism.',
          },
        ],
      },
      {
        title: 'No sliders',
        kicker: 'Interface decision',
        blocks: [
          {
            kind: 'text',
            text: 'Not one of the thirty-six challenges uses a slider. Every control is direct manipulation: drag the launch arrow, drag the fulcrum, drag the rod bank, paint surfaces onto a site grid. A slider abstracts the thing you are supposed to be building intuition about into a number, and the number is exactly the part a student can guess their way through.',
          },
          {
            kind: 'callout',
            tone: 'note',
            title: 'The cost of that decision',
            text: 'Direct manipulation is much harder to make accessible than a slider, which is a native control with keyboard support built in. So every draggable handle in the app has an arrow-key path written for it by hand. That was a large part of the work and none of it is visible in a screenshot.',
          },
        ],
      },
      {
        title: 'Proving the physics is right',
        kicker: 'Verification',
        blocks: [
          {
            kind: 'text',
            text: 'Six of the simulations have offline guards: the truss solver, the earthquake model, the inverse kinematics, the suspension model, the reactor lag and the titration curve. Each one does two jobs.',
          },
          {
            kind: 'steps',
            items: [
              {
                title: 'Check the model against something outside the code',
                text: 'Hand-worked member forces, closed-form natural frequencies, textbook special cases. If the solver and the hand calculation disagree, the script fails.',
              },
              {
                title: 'Re-derive what each level is supposed to teach',
                text: 'Usually by enumerating every design a player could possibly build, then asserting that the intended lesson still holds — that the firm suspension really does fail on the washboard road, that no clever truss beats the intended one. Tuning a level to be easier and quietly breaking its lesson is caught here.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'CI runs the guards on every push and nothing deploys on a red check. The app also carries a /technical page documenting each model’s equations, its assumptions, and what its script actually proves — so a teacher can check my working rather than trust it.',
          },
        ],
      },
      {
        title: 'What is not done',
        kicker: 'Limitations',
        blocks: [
          {
            kind: 'list',
            items: [
              'No sync. Progress is localStorage in one browser; moving it to another computer means exporting a save file or a transfer code and pasting it in by hand. Automatic sync needs a backend, and there is deliberately no backend.',
              'No accounts in the real sense. A profile is a typed name with no password, which only namespaces the save key so two students can share a computer. It is not security, and the dialog says so in as many words.',
              'The content is written for middle and high school readers and has not been reviewed by a teacher.',
            ],
          },
          {
            kind: 'text',
            text: 'The last one is the gap I would most like to close. The physics is checked by script; the pedagogy is checked by nobody.',
          },
        ],
      },
    ],
  },
}

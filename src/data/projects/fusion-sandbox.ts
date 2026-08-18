import type { Project } from '../types.ts'

export const fusionSandbox: Project = {
  slug: 'fusion-sandbox',
  title: 'Fusion Sandbox',
  subtitle: 'Python computes, Godot shows',
  summary:
    'A fusion research sandbox built the slow way: a Python physics backend that is the single source of truth, a Godot workstation that only displays it, and a validation layer that has to pass before any phase is called finished.',
  categories: ['fusion', 'simulation', 'software', 'research'],
  status: 'in-progress',
  date: 'August 2026 – present',
  sortDate: '2026-08',
  // Not featured only because four blocks is as many as the home page carries
  // comfortably. Set this to true and unfeature another to swap it in.
  featured: false,
  technologies: ['Python 3.11', 'Godot 4.7', 'GDScript', 'NumPy', 'pytest', 'JSON-lines IPC'],
  achievements: [
    'Phase 1A and 1B complete: a validated Boris pusher and an interactive experiment workstation.',
    'Physics validated analytically and by convergence order, then re-checked by mutation testing.',
  ],
  relatedProjects: ['fusioncore'],
  relatedResearch: ['tokamak-stellarator-comparison'],
  links: [
    {
      label: 'Not yet published',
      href: '',
      note: 'Local repository. It goes public when Phase 1C is done.',
    },
  ],

  caseStudy: {
    summary:
      'FusionCore taught me that a simulation is only as trustworthy as the discipline around it. This project is the same subject built with that discipline first: one source of truth for the physics, a documented assumption for every model, and a phase gate that will not open on my say-so.',
    facts: [
      { label: 'Role', value: 'Sole author' },
      { label: 'Started', value: 'August 2026' },
      { label: 'Stack', value: 'Python backend · Godot 4.7 front end' },
      { label: 'Phase', value: '1B complete · 1C next' },
    ],
    sections: [
      {
        title: 'Why build it a second time',
        kicker: 'Motivation',
        blocks: [
          {
            kind: 'text',
            text: [
              'FusionCore is a game, and it’s honest that its plasma is a single volume-averaged zone. That approximation is what makes it run at 10 Hz in a browser, and it is also a ceiling: there is no version of that model that answers a question I do not already know the answer to.',
              'Fusion Sandbox starts from the other end. Instead of a plausible whole machine, it builds one thing at a time, correctly, and refuses to move on until that thing is validated. Right now that thing is a single charged particle in a uniform magnetic field. That is a much smaller claim than “fusion simulator”, and it is a claim I can actually defend.',
            ],
          },
          {
            kind: 'quote',
            text: 'This is not a plasma simulator yet, and nothing it produces should be described as one.',
            attribution: 'The project README, second paragraph',
          },
        ],
      },
      {
        title: 'One rule',
        kicker: 'Architecture',
        blocks: [
          {
            kind: 'text',
            text: 'Python computes. Godot shows. The Python package is the sole source of truth for every scientific calculation — no model exists in two places, and there is no physics in GDScript, ever. If a number appears on screen and I cannot point at the Python function that produced it, that is a bug, not a detail.',
          },
          {
            kind: 'text',
            text: 'The two halves talk over a JSON-lines pipe on standard I/O, with the message protocol written down before it was implemented. Three versions are tracked independently — the physics model, the save schema, and the wire protocol — because they change for different reasons and pretending they change together is how a saved experiment silently stops meaning what it used to.',
          },
          {
            kind: 'definitions',
            items: [
              {
                term: 'simulation/',
                description: 'The physics package and its tests. Runs and is verified with no game engine present.',
              },
              {
                term: 'game/',
                description:
                  'The Godot 4.7 workstation: configure a shot, run it in the backend, scrub the trajectory, read the diagnostics, change a parameter, run it again.',
              },
              {
                term: 'docs/',
                description:
                  'Architecture, physics, validation, data sources, assumptions, model versions, roadmap. Every model is documented and categorized before it is written.',
              },
            ],
          },
        ],
      },
      {
        title: 'Validation in layers',
        kicker: 'Method',
        blocks: [
          {
            kind: 'steps',
            items: [
              {
                title: 'Against the analytic answer',
                text: 'A charged particle in a uniform magnetic field has a closed-form solution — a helix with a known gyroradius and gyrofrequency. The integrator is checked against it directly.',
              },
              {
                title: 'Against itself, at different step sizes',
                text: 'Convergence tests confirm the error falls at the order the scheme is supposed to deliver. Being close to the right answer isn’t the same as being correct, and the convergence order is what tells the two apart.',
              },
              {
                title: 'Against a deliberately broken copy',
                text: 'Mutation testing: introduce a small defect into the physics on purpose and confirm the suite notices. A green test run only means something if it can go red.',
              },
              {
                title: 'Through the real front end, headlessly',
                text: 'Godot scripts drive the bridge and the workstation with no display attached and exit non-zero on failure, so an integration that only works when a human is watching does not count as working.',
              },
            ],
          },
          {
            kind: 'callout',
            tone: 'note',
            title: 'Phase gates',
            text: 'No phase counts as finished until every layer above is green, and the next one doesn’t start just because I’m excited about it. Both completed phases went through an adversarial review pass afterwards, and both times it found real defects.',
          },
        ],
      },
      {
        title: 'Things the platform taught me the hard way',
        kicker: 'Engineering notes',
        blocks: [
          {
            kind: 'list',
            items: [
              'Godot serializes float64 with truncated precision by default. A trajectory that round-trips through JSON quietly loses digits unless full precision is requested explicitly — which is invisible until you compare against an analytic result.',
              'Godot’s Vector3 is float32. Any number shown to the user has to come from the float64 arrays, never from the scene’s vectors, or the diagnostics disagree with the physics that produced them.',
              'Python decodes standard input as the Windows code page unless told otherwise, which turns a cross-platform pipe into a machine-specific one.',
            ],
          },
          {
            kind: 'text',
            text: 'None of these are physics problems and all three would have produced wrong numbers on screen with a completely correct model behind them. They are written up in the architecture notes so the next person hitting them — probably me — does not spend the evening again.',
          },
        ],
      },
      {
        title: 'Where it goes',
        kicker: 'Next',
        blocks: [
          {
            kind: 'text',
            text: 'Phase 1C extends the field geometry, and each later phase adds one physical effect with its own validation before anything else is allowed to depend on it. The repository goes public when there is something worth reading in it rather than something worth announcing.',
          },
        ],
      },
    ],
  },
}

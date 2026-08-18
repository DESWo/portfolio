import type { Project } from '../types.ts'

export const fusioncore: Project = {
  slug: 'fusioncore',
  title: 'FusionCore',
  subtitle: 'Confine a star, keep it lit, and sell the power',
  summary:
    'A browser game about operating a tokamak, where the plasma physics is real enough to teach you something and documented where it is not. Eight missions, each a real milestone in the history of the field.',
  categories: ['fusion', 'nuclear', 'simulation', 'software'],
  status: 'active',
  date: 'July 2026 – present',
  sortDate: '2026-07',
  featured: true,
  thumbnail: {
    src: '/images/projects/fusioncore.jpg',
    alt: 'The FusionCore title screen: a 3D tokamak with its toroidal and poloidal field coils around a glowing plasma torus.',
    width: 1600,
    height: 1000,
  },
  technologies: [
    'React 19',
    'Three.js',
    'React Three Fiber',
    'Zustand',
    'Tailwind CSS',
    'Vite',
    'Playwright',
    'Node.js',
  ],
  repo: 'https://github.com/DESWo/fusioncore',
  liveDemo: 'https://deswo.github.io/fusioncore/',
  achievements: [
    'Reaction-rate fit pinned against the Bosch–Hale parameterization to within 10% from 3–40 keV.',
    'A check script proves all eight missions are winnable inside the slider bounds before anything deploys.',
    'Every physics constant traces to a cited source, shown inline in the game rather than in a footnote.',
  ],
  relatedProjects: ['fusion-sandbox', 'radiant'],
  relatedResearch: ['tokamak-stellarator-comparison'],

  caseStudy: {
    summary:
      'You run a tokamak from a control room with three sliders — magnetic field, heating power, fuel injection — and everything else follows from those. The machine fights back, and it fights back for reasons that are in the literature.',
    facts: [
      { label: 'Role', value: 'Sole author — physics, engine, interface' },
      { label: 'Started', value: 'July 2026' },
      { label: 'Missions', value: '8, each a real milestone in the field' },
      { label: 'Simulation rate', value: '10 Hz, in the browser' },
    ],
    sections: [
      {
        title: 'Why a game',
        kicker: 'Motivation',
        blocks: [
          {
            kind: 'text',
            text: [
              'Fusion is explained to the public almost entirely in terms of temperature. A hundred million degrees is a memorable number and it is also the least interesting constraint in the machine. The interesting part is that temperature, density and confinement time trade against each other, that each one has a ceiling set by different physics, and that the ceilings are what make the engineering hard.',
              'That structure is very difficult to write down in a paragraph and very easy to feel after ten minutes of pushing a slider into a disruption. So I built the control room.',
            ],
          },
        ],
      },
      {
        title: 'What you actually do',
        kicker: 'The design',
        blocks: [
          {
            kind: 'text',
            text: 'Three controls do most of the work. Push density too hard and the plasma disrupts. Push the field past the coil rating and the magnets quench. Run the divertor over its thermal limit and it erodes while you watch. Every violation gives you a grace window first, and the alarm board latches until you acknowledge it — which is how a real control room behaves and, more usefully, teaches that a limit is a thing you approach deliberately rather than discover.',
          },
          {
            kind: 'table',
            caption: 'The mission list. Each objective is a milestone the field actually had to pass.',
            columns: ['#', 'Mission', 'Objective'],
            rows: [
              ['1', 'First Light', 'Sustain a stable plasma'],
              ['2', 'Heating Up', '100 million °C (8.6 keV)'],
              ['3', 'First Fusion', 'Measurable neutron flux'],
              ['4', 'Breakeven', 'Q > 1.0 — more energy out than in'],
              ['5', 'Endurance', 'One hour without breaking the machine'],
              ['6', 'First Customers', 'Net electricity to the grid'],
              ['7', 'City Scale', 'Power a million homes'],
              ['8', 'Commercial Era', 'Beat $100/MWh at commercial scale'],
            ],
          },
          {
            kind: 'text',
            text: 'Research points buy real technology — H-mode confinement, REBCO high-temperature superconducting magnets, tungsten divertors, lithium breeding blankets, a stellarator conversion — and each one changes the machine’s physics constants. None of them is a straight upgrade; every one is a trade.',
          },
        ],
      },
      {
        title: 'The physics',
        kicker: 'Model',
        blocks: [
          {
            kind: 'text',
            text: 'Fusion power comes from the volumetric reaction rate for a 50/50 deuterium–tritium mix:',
          },
          {
            kind: 'equation',
            expression: 'P = ¼ n² ⟨σv⟩ E V',
            where: [
              { symbol: 'n', meaning: 'total ion density' },
              { symbol: '⟨σv⟩', meaning: 'reactivity, averaged over the Maxwellian velocity distribution' },
              { symbol: 'E', meaning: 'energy released per reaction' },
              { symbol: 'V', meaning: 'plasma volume' },
            ],
            caption:
              '⟨σv⟩ is a 5th-degree log–log polynomial fitted through six NRL Plasma Formulary points between 1 and 50 keV.',
          },
          {
            kind: 'text',
            text: 'Energy confinement time uses a scaling inspired by IPB98(y,2), with machine size folded into the leading constant:',
          },
          {
            kind: 'equation',
            expression: 'τ_E = H · c₁ · B^0.15 · P^−0.69 · n^0.41',
            where: [
              { symbol: 'H', meaning: 'confinement enhancement factor — what H-mode buys you' },
              { symbol: 'B', meaning: 'toroidal magnetic field' },
              { symbol: 'P', meaning: 'heating power' },
              { symbol: 'n', meaning: 'density' },
            ],
          },
          {
            kind: 'text',
            text: 'The Greenwald density limit and a Troyon-like beta limit drive disruption probability. Divertor erosion runs at one percent per second over the thermal limit, and first-wall neutron damage depletes over two hours at 500 MW. On the economic side: spot price with noise, tritium at $30,000 per gram, 35% thermal conversion, and recirculating power taken off the top before anything reaches the meter.',
          },
          {
            kind: 'text',
            text: 'There is a second reactor too. The fission plant runs point kinetics with delayed neutrons under the prompt-jump approximation, with Doppler and coolant temperature feedback, xenon poisoning, decay heat and fuel burnup — the same control problem from the other side of the nuclear field.',
          },
        ],
      },
      {
        title: 'Where the model bends, and why',
        kicker: 'Honesty',
        blocks: [
          {
            kind: 'callout',
            tone: 'caution',
            title: 'This section is in the game, not just the README',
            text: 'Being upfront about the approximations is the point of the project. A simulation that hides them teaches the wrong lesson.',
          },
          {
            kind: 'definitions',
            items: [
              {
                term: 'The plasma is a single zone',
                description:
                  'No radial profiles, no transport equation. Real tokamaks have peaked density and temperature profiles that change the answer; here everything is volume-averaged. This is the largest simplification in the model and it is what makes a 10 Hz browser game possible at all.',
              },
              {
                term: 'τ_E is calibrated, not derived',
                description:
                  'With the source specification’s own scaling exponents, Q > 1 is mathematically unreachable inside the slider bounds and the game is unwinnable at mission 4. The engine uses a leading constant that puts τ_E near one second at the start instead, and the check suite verifies where that lands: breakeven at Q ≈ 1.26 on a maxed non-superconducting machine, with gigawatt scale requiring the H-mode and HTS path.',
              },
              {
                term: 'Disruptions are probabilistic, not predicted',
                description:
                  'Real disruption physics is an open research problem. Crossing a limit here raises a probability rather than triggering a simulated instability.',
              },
              {
                term: 'Q is engineering Q',
                description:
                  'Measured against wall-plug heating draw, which is a tougher standard than the physics Q usually quoted for JET and NIF. A machine at Q = 1 here has genuinely broken even.',
              },
            ],
          },
        ],
      },
      {
        title: 'How it is checked',
        kicker: 'Verification',
        blocks: [
          {
            kind: 'text',
            text: 'There is no type checker in this repository, so the check scripts are the safety net. They import the same pure engine modules in Node that the browser runs, which means a tuning change that quietly makes a mission unreachable fails on my machine instead of in someone’s playthrough.',
          },
          {
            kind: 'code',
            language: 'bash',
            caption: 'The four guards. CI runs them; nothing ships on a red check.',
            code: `npm run balance   # proves all 8 missions are winnable inside the slider bounds
npm run career    # career systems against the written spec
npm run tokens    # palette contrast claims, measured
npm run test:e2e  # browser smoke: boots and plays the real app at 3 widths`,
          },
          {
            kind: 'text',
            text: 'The reactivity fit is the check I’m most glad I wrote. It’s pinned against the Bosch–Hale parameterization at eight temperatures that are not fit anchors, and asserted to stay monotonic — so a typo in a single anchor point cannot quietly bend the curve and make the whole game easier.',
          },
        ],
      },
      {
        title: 'Accessibility',
        kicker: 'Interface',
        blocks: [
          {
            kind: 'list',
            items: [
              'Text-to-speech on every message.',
              'Three colorblind palettes, with status shape-coded — never color alone.',
              'Reduced-motion support and full keyboard operation.',
              'A locally hosted OpenDyslexic option and UI scaling from 75% to 150%.',
              'Contrast asserted by script rather than eyeballed: the token check reads the live palette and fails the build if any documented ratio drifts.',
            ],
          },
        ],
      },
      {
        title: 'What I learned',
        kicker: 'Reflection',
        blocks: [
          {
            kind: 'text',
            text: [
              'The hardest problem was not the physics. It was deciding what to do when the honest model made the game unplayable — the calibration question above. Keeping the real exponents and shipping an unwinnable mission would have been faithful and useless; silently retuning it would have been playable and dishonest. Writing down exactly which constant was changed, why, and what the check script now proves about the consequence was the only version of it I was happy with, and it is the habit I have carried into everything since.',
              'The other lesson is that a pure engine you can run in Node is worth the extra structure. Every guarantee this project makes about itself exists because the physics is importable outside the browser.',
            ],
          },
          {
            kind: 'callout',
            tone: 'note',
            title: 'Disclosure',
            text: 'FusionCore was built with AI assistance. The physics, the citations and the deliberate deviations above are the parts worth reading, and they are mine.',
          },
        ],
      },
    ],
  },
}

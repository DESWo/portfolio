import type { Project } from '../types.ts'

export const radiant: Project = {
  slug: 'radiant',
  title: 'RADIANT',
  subtitle: 'The Case for Nuclear Energy',
  summary:
    'A museum-style site arguing the case for nuclear power from primary sources, with three reactor and grid models you operate yourself. Built with no framework and no build step.',
  categories: ['nuclear', 'data', 'education', 'simulation'],
  status: 'maintained',
  date: 'July 2026 – present',
  sortDate: '2026-07',
  featured: true,
  thumbnail: {
    src: '/images/projects/radiant.jpg',
    alt: 'The RADIANT home page: a warm-toned museum entrance with the title “The Case for Nuclear Energy”.',
    width: 1600,
    height: 1000,
  },
  technologies: [
    'HTML',
    'CSS',
    'JavaScript (ES modules)',
    'SVG',
    'GSAP',
    'Node.js',
    'Python',
    'Playwright',
    'GitHub Actions',
  ],
  repo: 'https://github.com/DESWo/RADIANT',
  liveDemo: 'https://deswo.github.io/RADIANT/',
  achievements: [
    'Every statistic on the page carries a primary citation — 18 numbered references with links and access dates.',
    'Three original interactive models, unit-tested against closed-form results and a Runge–Kutta reference integration.',
    'Five automated test suites run in CI on every push.',
  ],
  relatedProjects: ['fusioncore', 'engineering-explorer'],
  relatedResearch: ['radiant-paper'],

  caseStudy: {
    summary:
      'Nuclear energy loses public arguments it should win on the evidence. RADIANT is an attempt to put the evidence somewhere a person will actually read it, and to let them operate the physics rather than take my word for it.',
    facts: [
      { label: 'Role', value: 'Sole author — research, code, illustration' },
      { label: 'Started', value: 'July 2026' },
      { label: 'Dependencies at runtime', value: 'None' },
      { label: 'Source', value: 'Adapted from my paper of the same name' },
    ],
    sections: [
      {
        title: 'The problem',
        kicker: 'Motivation',
        blocks: [
          {
            kind: 'text',
            text: [
              'Public argument about nuclear power is dominated by the two accidents most people can name and by a general sense that the waste problem is unsolved. The numbers that would settle most of those arguments exist, are not secret, and are published by the EIA, the IPCC, UNSCEAR and the NRC. They are just filed in places nobody reads.',
              'The failure is one of presentation, not evidence. So the design question was not “what is the argument” — I had already written that as a paper — but “what form does the argument have to take before someone finishes it”.',
            ],
          },
        ],
      },
      {
        title: 'A museum, not a page',
        kicker: 'Concept',
        blocks: [
          {
            kind: 'text',
            text: 'The site is presented as a museum: five wings, each answering exactly one question, walked a page at a time rather than scrolled. Scrolling encourages skimming and makes it impossible to control what someone has seen before they reach a conclusion. Walking does not.',
          },
          {
            kind: 'definitions',
            items: [
              {
                term: 'I · The Atom',
                description:
                  'What is happening? Fission as one split becoming a chain reaction, and control as the thing that keeps it steady.',
              },
              {
                term: 'II · The Reactor',
                description:
                  'How does that become electricity? A six-stage walk from core to grid over an annotated PWR schematic, and a nine-stage construction sequence.',
              },
              {
                term: 'III · The Record',
                description:
                  'Does the evidence support it? Death rates per TWh, the three accidents feared against found, radiation in everyday context, then uptime and cost.',
              },
              {
                term: 'IV · The Frontier',
                description:
                  'What is still hard? Construction, financing, waste, mining and water, proliferation, workforce, and the genuine uncertainty around small modular reactors.',
              },
              {
                term: 'V · The Field',
                description:
                  'How do I join? Myths as a reference shelf, careers, named programmes each linked to the organization that runs it, and the full source list.',
              },
            ],
          },
        ],
      },
      {
        title: 'Three models you can operate',
        kicker: 'What I built',
        blocks: [
          {
            kind: 'text',
            text: 'Three of the exhibits are not illustrations. They are original models, and the visitor drives them.',
          },
          {
            kind: 'definitions',
            items: [
              {
                term: 'Chain-reaction lab',
                description:
                  'One fission becoming many. The point is the difference between a multiplication factor slightly under one, exactly one, and slightly over one — which is the whole of reactor control in a single parameter.',
              },
              {
                term: 'Point-kinetics reactor',
                description:
                  'Pull the rods and the power rises; delayed neutrons and Doppler feedback push back; scram it and watch what decay heat means. This is the exhibit that makes “a reactor is controllable” a thing you have done rather than a thing you were told.',
              },
              {
                term: 'Grid-mix simulator',
                description:
                  'Pick a generation mix and see the carbon intensity, the capacity and the firm share that follow. It’s the fastest way I know to show why “just build more solar” and “decarbonise the grid” are not the same sentence.',
              },
            ],
          },
          {
            kind: 'callout',
            tone: 'note',
            title: 'Why models instead of charts',
            text: 'A chart tells you what happened once. A model lets someone try the thing they were about to argue for and watch it not work. Nobody has ever changed their mind about grid mixes because of my bar chart.',
          },
        ],
      },
      {
        title: 'Every number has a source',
        kicker: 'Method',
        blocks: [
          {
            kind: 'text',
            text: 'The rule the project is built around: no statistic appears on the page without a primary citation. Not a news article about a study — the study, the agency table, or the dataset. The footer carries a numbered reference list with links and access dates, each chart carries its source line, and each carries a “how to read this” note covering what the number does and does not include.',
          },
          {
            kind: 'table',
            caption:
              'A sample of the reference list. Lifecycle emissions and death rates are the two figures the argument leans on hardest, so both are cited to more than one independent assessment.',
            columns: ['Claim', 'Primary source'],
            rows: [
              [
                'Death rates per TWh by source',
                'Our World in Data, after Markandya & Wilkinson (2007), The Lancet; Sovacool et al. (2016)',
              ],
              ['Median lifecycle emissions', 'IPCC AR5 WG3 Annex III, Table A.III.2; UNECE (2021)'],
              ['Capacity factors and operating cost', 'U.S. EIA, Electric Power Monthly and Annual'],
              ['Accident health effects', 'UNSCEAR (2008, 2013)'],
              ['Everyday radiation doses', 'U.S. NRC, “Doses in Our Daily Lives”'],
            ],
          },
          {
            kind: 'text',
            text: 'The site also argues against itself. A Limitations section covers construction cost overruns, financing risk, waste-repository politics, accident severity, mining and water impacts, proliferation, and the fact that small modular reactors are still largely a promise. Leaving those out would have made the rest of it less believable, not more.',
          },
        ],
      },
      {
        title: 'No framework, no build step',
        kicker: 'Engineering',
        blocks: [
          {
            kind: 'text',
            text: 'RADIANT is one HTML file for content with styles, scripts and datasets split across plain ES modules. There is nothing to install and nothing to compile: the repository is what the browser runs. Fonts and the two animation libraries are vendored under the repo, so a visitor never sends a request to a third party just to read the page.',
          },
          {
            kind: 'list',
            items: [
              'No CDN links anywhere — the whole site is self-contained and works offline once cached.',
              'Deploys straight from the main branch on GitHub Pages, with no build configuration.',
              'The only development dependency is Playwright, used by the test suites.',
            ],
          },
          {
            kind: 'callout',
            tone: 'caution',
            title: 'The trade I made',
            text: 'No build step means no bundler, no type checker and no component model, so nothing catches a renamed CSS class or a broken citation index for me. That is exactly why the test suite below exists — the tests are doing the job the missing toolchain would have done.',
          },
        ],
      },
      {
        title: 'How it is checked',
        kicker: 'Verification',
        blocks: [
          {
            kind: 'steps',
            items: [
              {
                title: 'Markup and citation integrity',
                text: 'Checks the structure of the page and that every reference marker resolves to a real entry in the source list. Three of the simulation notes cite references by index, so a citation inserted in the wrong place is a test failure rather than a silent misattribution.',
              },
              {
                title: 'Models, directly',
                text: 'Both physics models are unit-tested against closed-form results and against a Runge–Kutta reference integration — the model is compared to maths done outside the model.',
              },
              {
                title: 'Models, through the browser',
                text: 'The same models are re-checked through the real UI, so a correct model wired to the wrong slider still fails.',
              },
              {
                title: 'Navigation and deep links',
                text: 'Museum navigation and every deep link into a wing.',
              },
              {
                title: 'Rendering',
                text: 'Three viewports, including the keyboard-only and reduced-motion paths.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'The suites run in CI on every push. The no-browser subset finishes in about a second, which is the reason I actually run it before every commit rather than hoping.',
          },
        ],
      },
      {
        title: 'Keeping it current',
        kicker: 'Operations',
        blocks: [
          {
            kind: 'text',
            text: 'The frontier section carries live headlines. A scheduled GitHub Action runs a Python script every six hours that pulls from World Nuclear News and Google News, dedupes, and commits the result only when something actually changed. If the fetch fails the page falls back to a baked-in set, so a dead upstream feed can never leave a blank section on the site.',
          },
        ],
      },
      {
        title: 'What I would do differently',
        kicker: 'Reflection',
        blocks: [
          {
            kind: 'list',
            items: [
              'The no-build-step constraint was the right call for longevity and the wrong call for the day I needed to rename something across nineteen files. I would keep it, and I would add the static checks much earlier than I did.',
              'Citations by numeric index are fragile. They work because a test pins them; a keyed reference system would not have needed the test.',
              'The next honest step is publishing the datasets and the calculations behind the charts, so a reader can reproduce the figures rather than trust the footnote.',
            ],
          },
        ],
      },
    ],
  },
}

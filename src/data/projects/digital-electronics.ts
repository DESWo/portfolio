import type { Project } from '../types.ts'

export const digitalElectronics: Project = {
  slug: 'digital-electronics',
  title: 'Digital Electronics',
  subtitle: 'Combinational and sequential logic, on breadboard and on silicon',
  summary:
    'A year of building logic from the gate up: minimising circuits with K-maps, chaining counters into timers, and rebuilding finished designs in NAND and NOR alone to cut the chip count.',
  categories: ['electrical', 'software'],
  status: 'complete',
  date: '2025 – 2026',
  sortDate: '2025-08',
  technologies: [
    'Multisim',
    'Breadboarding',
    'PLD / CPLD',
    'K-maps',
    'Boolean algebra',
    'Raspberry Pi',
    'Python',
  ],

  caseStudy: {
    summary:
      'Third year of the PLTW engineering sequence. Every build started as a written specification and ended as hardware that either worked on the bench or did not — which is a much less forgiving feedback loop than a simulation.',
    facts: [
      { label: 'Course', value: 'PLTW Digital Electronics — Year 3' },
      { label: 'School', value: 'Diamond Bar High School' },
      { label: 'Year', value: '2025 – 2026' },
      { label: 'Built on', value: 'Breadboard and programmable logic' },
    ],
    sections: [
      {
        title: 'Minimising before building',
        kicker: 'Combinational logic',
        blocks: [
          {
            kind: 'text',
            text: 'The first substantial build displayed a date of birth on a seven-segment display. The interesting part was not getting it to work — it was getting it to work with as little hardware as possible. Karnaugh mapping and Boolean simplification reduced the design down to two gate types outside the standard AND-OR-invert set, and it was then implemented twice: once on breadboard, and once on a programmable logic device.',
          },
          {
            kind: 'callout',
            tone: 'note',
            title: 'Why build the same thing twice',
            text: 'Breadboarding it teaches you what the logic physically is. Putting it on a PLD teaches you that past a certain complexity, wiring by hand stops being the sensible way to do anything — which is the whole argument for programmable logic in one afternoon.',
          },
        ],
      },
      {
        title: 'Counters, and the logic that stops them',
        kicker: 'Sequential logic',
        blocks: [
          {
            kind: 'definitions',
            items: [
              {
                term: 'Dual-digit "Now Serving" counter',
                description:
                  'MSI and SSI counters, multiplexers and decoders combined into a two-digit display, with custom suspend and reset logic engineered to cap the count at 80. Most of the work was in the stopping condition, not the counting.',
              },
              {
                term: '60-second timer',
                description:
                  'A synchronous ones-place counter chained into an asynchronous tens-place counter, with reset logic tuned to roll over at 60 rather than at the 99 the hardware would otherwise reach. Mixing synchronous and asynchronous stages is where the timing problems live.',
              },
            ],
          },
        ],
      },
      {
        title: 'Specification to circuit',
        kicker: 'Design',
        blocks: [
          {
            kind: 'text',
            text: 'Two builds started as prose rather than as a truth table: a majority-vote circuit, and a safety cutoff for a gas fireplace. Translating a written requirement into a truth table is the step where most of the errors get made, because an ambiguity in the sentence becomes a wrong output that looks perfectly deliberate.',
          },
          {
            kind: 'text',
            text: 'Both were then rebuilt entirely in NAND gates, and again entirely in NOR gates. Because each is functionally complete, any logic function can be expressed in one of them alone — and in practice that means fewer distinct chips on the board, which is cheaper and easier to stock than a mixed set.',
          },
        ],
      },
      {
        title: 'A controller with no buttons',
        kicker: 'Beyond the gate level',
        blocks: [
          {
            kind: 'text',
            text: 'The last build stepped up a level of abstraction: a motion-controlled game controller built on a Raspberry Pi with distance and motion sensors, with Python translating physical movement into keyboard input for a browser game. After a year of discrete logic, doing input handling in software made the trade between the two very concrete — the gates are faster and cheaper, and the software is the only one of the two you can change in an afternoon.',
          },
        ],
      },
    ],
  },
}

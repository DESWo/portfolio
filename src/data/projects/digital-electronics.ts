import type { Project } from '../types.ts'

export const digitalElectronics: Project = {
  slug: 'digital-electronics',
  title: 'Digital Electronics',
  subtitle: 'Combinational and sequential logic, on breadboard and on silicon',
  summary:
    'A year of building logic from the gate up: minimizing circuits with K-maps, chaining counters into timers, and rebuilding finished designs in NAND and NOR alone to cut the chip count.',
  categories: ['electrical', 'software'],
  status: 'complete',
  date: '2025 – 2026',
  sortDate: '2025-08',
  technologies: [
    'Multisim',
    'Breadboarding',
    'PLD / CPLD',
    'Digilent S7',
    'K-maps',
    'Boolean algebra',
    'MSI / SSI counters',
    'Raspberry Pi',
    'Python',
  ],
  achievements: [
    'Reduced a seven-output display decoder to minimal form by K-map, then rebuilt the simplest segments in NAND and NOR universal gates to cut the IC count.',
    'Built a two-digit counter that suspends at 80, with a reset that clears both counter stages from one button.',
    'Built a 00–59 timer cascading a synchronous ones stage into a tens stage through ripple-out.',
  ],

  caseStudy: {
    summary:
      'Third year of the PLTW sequence. Every build started as a written specification and ended as hardware that either worked on the bench or did not — a much less forgiving feedback loop than a simulation, and the year I learned how much of engineering is troubleshooting.',
    facts: [
      { label: 'Course', value: 'PLTW Digital Electronics — Year 3' },
      { label: 'School', value: 'Diamond Bar High School' },
      { label: 'Year', value: '2025 – 2026' },
      { label: 'Built on', value: 'Breadboard, myDAQ and programmable logic' },
    ],
    sections: [
      {
        title: 'A date of birth on seven segments',
        kicker: 'Combinational logic',
        blocks: [
          {
            kind: 'text',
            text: 'The first substantial build displayed my date of birth — 03·18·09 — on a seven-segment display, driven by three switches counting through eight states. The specification added one real constraint: the design had to use two gate types outside the standard AND-OR-invert set.',
          },
          {
            kind: 'metrics',
            items: [
              { value: '3', label: 'Input switches', note: '8 states' },
              { value: '7', label: 'Segment outputs', note: 'A through G' },
              { value: '4', label: 'Rebuilds of the physical circuit' },
            ],
          },
          {
            kind: 'steps',
            items: [
              {
                title: 'Truth table',
                text: 'Eight input states down the left, seven segment outputs across the right. The right-hand side is the hard part: for each state you have to work out which of A–G have to light to form that digit.',
              },
              {
                title: 'Karnaugh mapping',
                text: 'Seven maps, one per segment, each a 4×2 grid — the four combinations of the two most significant inputs against the two states of the third. Grouping adjacent ones eliminates whichever variable differs between them, which is what turns a long sum-of-products into something buildable.',
              },
              {
                title: 'Universal-gate conversion',
                text: 'The segments that simplified furthest were converted into NAND-only and NOR-only implementations. Both are functionally complete, so any expression can be built from one of them alone — and one gate type on the board means fewer distinct chips to buy and stock.',
              },
              {
                title: 'Simulation, then hardware, then silicon',
                text: 'Built in Multisim first, then wired on a myDAQ breadboard, then implemented on a Digilent S7 programmable logic device with the switches mapped to PIO pins and the display to the segment outputs.',
              },
            ],
          },
          {
            kind: 'callout',
            tone: 'caution',
            title: 'The physical build never worked',
            text: 'The simulation was correct and the PLD version was correct. The breadboard wasn’t. I took it apart and rebuilt it four times and it never ran. My best guess is still that I wired inputs into IC outputs somewhere in it. A working design and a working board are two different things, and I only had one of them.',
          },
          {
            kind: 'quote',
            text: 'Over the course of this project, I rebuilt this circuit 4 times, and none of them worked.',
            attribution: 'Date of Birth technical paper',
          },
          {
            kind: 'text',
            text: 'Two segments were wrong in the simulation at first too. Tracing them back found a double inversion — two inverters I hadn’t noticed canceling each other out — which is the kind of mistake a schematic hides and a truth table doesn’t.',
          },
        ],
      },
      {
        title: 'Counting to eighty',
        kicker: 'Sequential logic',
        blocks: [
          {
            kind: 'text',
            text: 'A "Now Serving" display: two digits, counting to eighty, with a reset button. It needed two counter stages of deliberately different kinds — a medium-scale integrated counter for the ones place, and a stage built from discrete D flip-flops for the tens.',
          },
          {
            kind: 'definitions',
            items: [
              {
                term: 'Ones place — MSI counter',
                description:
                  'Inverters placed on the lines matching binary 1010 feed a four-input NAND, so the count clears at ten. NAND rather than AND because clear is active low — the gate has to produce a zero at the moment the pattern matches.',
              },
              {
                term: 'Tens place — D flip-flops',
                description:
                  'A mod-8 chain clocked from the ones stage’s clear line, so the tens digit advances exactly when the ones digit rolls over. Eight tens by ten ones is the eighty the specification asked for.',
              },
              {
                term: 'Display — decoder and multiplexers',
                description:
                  'A decoder turns four counter bits into seven segment lines. Multiplexers alternate the two counters onto a shared display pair fast enough to look simultaneous, driven by a binary counter with a buffer and an inverter generating the select signal. The displays are common cathode, so every segment line needs inverting on the way out.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'The reset took the longest, and not because it was complicated. I built it with an AND gate first, so the count ran but the reset did nothing. A classmate pointed out it had to be a NAND. Then it reset the ones stage and left the tens counting, and it took me a while to realize the fix was just wiring the tens stage’s clear to the same button instead of building a second reset network for it.',
          },
          {
            kind: 'callout',
            tone: 'note',
            title: 'Time management',
            text: 'This one came together in the last five minutes of the last period. It worked, and I would not want to repeat how that felt.',
          },
        ],
      },
      {
        title: 'Sixty seconds, on the clock',
        kicker: 'Synchronous design',
        blocks: [
          {
            kind: 'text',
            text: 'A timer counting 00 to 59 and resetting, with a synchronous ones stage and an asynchronous tens stage — the point being to build both in one circuit and feel the difference.',
          },
          {
            kind: 'definitions',
            items: [
              {
                term: 'Asynchronous',
                description:
                  'Each flip-flop clocks the next, so the clock signal ripples down the chain and each stage divides the frequency again. Simple to wire, and the accumulated delay gets worse with every stage you add.',
              },
              {
                term: 'Synchronous',
                description:
                  'Every flip-flop shares one clock, so all stages change on the same edge. No ripple delay, more reliable at speed — and because the reset waits for the clock, you can set it to the number you actually want rather than one past it.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'That last difference is the practical one. On the synchronous stage the reset logic goes to the load input rather than to clear, the ones stage is set to reload at nine and the tens at six, and an AND gate across both clear lines gives a single button that resets the whole timer.',
          },
          {
            kind: 'text',
            text: 'It didn’t work for a long time. The count wouldn’t cascade and the reset fired at the wrong number. Probing it line by line found the NAND wired to 0100 where it needed 1011. The cascade fixed itself once I stopped clocking the second stage from the first and used the ripple-out pin instead, which is what it’s for and what the activity notes said all along.',
          },
        ],
      },
      {
        title: 'From a written specification',
        kicker: 'Design',
        blocks: [
          {
            kind: 'text',
            text: 'Two builds started as prose rather than as a truth table: a majority-vote circuit, and a safety cutoff for a gas fireplace. Translating a written requirement into a truth table is where most of the errors get made, because an ambiguity in the sentence becomes a wrong output that looks perfectly deliberate. Both were then rebuilt entirely in NAND, and again entirely in NOR.',
          },
        ],
      },
      {
        title: 'A controller shaped like a pig',
        kicker: 'Beyond the gate level',
        blocks: [
          {
            kind: 'text',
            text: 'The final build stepped up a level of abstraction: a game controller for Crossy Road, built around a Raspberry Pi, and shaped like a pig. Lifting the whole controller off the table moves the character forward — a distance sensor watches the gap to the ground and the Pi sends an up-arrow keypress once it passes a threshold. A motion sensor crossing its own threshold handles the sideways moves.',
          },
          {
            kind: 'text',
            text: 'The first attempt used an accelerometer, which would have been the more elegant answer and which I could not get working. I spent long enough on it that the code I actually shipped got less attention than it should have. The controller was also far bigger than it needed to be — smaller would have used less material and taken less time to build.',
          },
          {
            kind: 'text',
            text: 'After a year of discrete logic, doing input handling in software made the trade between the two very concrete. The gates are faster and cheaper. The software is the only one of the two I could change in an afternoon.',
          },
        ],
      },
      {
        title: 'What the year taught me',
        kicker: 'Reflection',
        blocks: [
          {
            kind: 'list',
            items: [
              'A correct design and a working board are separate problems, and I was a lot better at the first one than the second.',
              'Most of my lost time came from over-complicating something the activity notes had already answered — the ripple-out pin, the NAND for an active-low clear.',
              'Troubleshooting is a process. Probing line by line to find where the power actually stops found every one of these faults eventually.',
              'Using one gate type across a board saves real money and real bench time. I only believed that after wiring both versions.',
            ],
          },
        ],
      },
    ],
  },
}

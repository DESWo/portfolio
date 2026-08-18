import type { Project } from '../types.ts'

export const principlesOfEngineering: Project = {
  slug: 'principles-of-engineering',
  title: 'Principles of Engineering',
  subtitle: 'Trusses, materials, hydraulics, robotics and statistics',
  summary:
    'A year of builds with a number attached to each one: balsa trusses tested to destruction and compared by load per gram, materials pulled apart in tension, syringe hydraulics, VEX robotics, and a chi-square test on a case of sweets.',
  categories: ['mechanical', 'civil', 'electrical', 'cad', 'data'],
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
    'Solenoids & relays',
    'Google Sheets',
  ],
  achievements: [
    'Tested three truss designs to destruction and ranked them by load per gram — our own design came last, which is where the useful conclusions came from.',
    'Cut pinball control code from over 700 lines to 125 by extracting functions and loops, with no change in behavior.',
    'Identified which factory produced a 48-pack case of sweets with a chi-square goodness-of-fit test.',
  ],

  caseStudy: {
    summary:
      'Second year of the PLTW sequence, and the first one where every project had a measurable target rather than a working/not-working outcome. It was also the year I learned that finishing is a skill, because twice I did not.',
    facts: [
      { label: 'Course', value: 'PLTW Principles of Engineering — Year 2' },
      { label: 'School', value: 'Diamond Bar High School' },
      { label: 'Year', value: '2024 – 2025' },
      { label: 'Team size', value: 'Group projects throughout' },
    ],
    sections: [
      {
        title: 'Ten trusses before one bridge',
        kicker: 'Analysis',
        blocks: [
          {
            kind: 'text',
            text: 'Ten truss configurations were modeled in MDSolids before anything was cut. Analyzing first is the point. MDSolids gives you the force in every member and whether it’s tension or compression, so you can watch a design fail on screen instead of on the test rig.',
          },
          {
            kind: 'text',
            text: 'We picked a Pratt truss for the bridge because the forces came out close to evenly distributed across the members, and because it was simple enough to build accurately — which mattered more than we expected. The requirements were a symmetrical bridge, two identical trusses 1.5 inches apart, under twenty grams, built from balsa with the provided wood glue. We went with a 16-inch base over a 14-inch one because the longer stock bent less.',
          },
          // TODO(Desmond): check truss 2's mass against your notebook. The
          // table there records 3.91 g with an efficiency of 3.19, but
          // 10.17 / 3.91 is 2.60 — the efficiency you wrote only works out if
          // the mass was 3.19 g. I have used 3.19 here so the row divides
          // correctly. Confirm which number is the typo before anyone reads it.
          {
            kind: 'table',
            caption:
              'Three trusses tested to failure on the structural stress analyzer. Efficiency is load at failure divided by mass, so it is a measure of how well the material was placed rather than how much of it there was.',
            columns: ['Truss', 'Mass (g)', 'Load at failure (lb)', 'Efficiency (lb/g)'],
            rows: [
              ['1 — prescribed design', '2.40', '6.78', '2.82'],
              ['2 — prescribed design', '3.19', '10.17', '3.19'],
              ['3 — our own design', '12.74', '9.40', '0.74'],
            ],
          },
          {
            kind: 'callout',
            tone: 'caution',
            title: 'Our design was the worst of the three',
            text: 'It held a middling load and weighed more than five times what the best one did, so it came out at about a quarter of the efficiency. Adding material usually raises the load a truss can take, but it always raises the mass. Only one of those helps your score.',
          },
          {
            kind: 'text',
            text: 'We drew two conclusions from the tests. Shorter members are stronger, because there’s less length for the wood to buckle or split along. And more members beat fewer, because the load spreads out and no single member takes enough to fail. Both point the same way: more short members instead of fewer long ones. That’s what the winning team built, and what I’d build next time.',
          },
          {
            kind: 'text',
            text: 'We predicted failure in the upper members where the calculated forces concentrated. It did break near there, and it also broke toward the bottom, which we had not expected.',
          },
        ],
      },
      {
        title: 'What balsa taught me',
        kicker: 'Fabrication',
        blocks: [
          {
            kind: 'text',
            text: 'The analysis was the easy part. Building a truss accurately out of 3/32-inch balsa is a manual skill, and I didn’t have it yet.',
          },
          {
            kind: 'list',
            items: [
              'Measuring and cutting was the biggest time sink. Pieces kept coming out too long or too short, which wasted both the balsa and the period. Once a piece was right it was easy to replicate, so I should have made a cutting template much sooner than I did.',
              'Box cutters were the wrong tool. A vertical blade cut balsa far more cleanly and accurately, and switching to one changed the quality of every joint after that.',
              'Glue matters in both directions. Too little and the joint fails before the wood does. Too much and you’ve just added mass, which is the one thing the efficiency score punishes. Another team lost on weight for exactly that reason.',
              'Peeling the finished truss off its paper template cracked the bottom chord in the middle, which is the worst place for it. We replaced the whole 16-inch member instead of gluing the crack, because a repaired joint at mid-span is where it would have failed anyway.',
              'The cross supports dried short and crooked, so we cut them off and built a VEX jig to hold the next set square while the glue set. That worked. Then we glued the second truss on backwards, and the finished bridge had its two trusses mirrored rather than matched.',
            ],
          },
        ],
      },
      {
        title: 'Materials, pulled apart',
        kicker: 'Testing',
        blocks: [
          {
            kind: 'text',
            text: 'Alongside the trusses, a unit on material testing: reading stress–strain curves and extracting the proportional limit, yield point, ultimate strength, failure stress, modulus of elasticity and modulus of resilience from them.',
          },
          {
            kind: 'definitions',
            items: [
              {
                term: 'Before the yield point',
                description:
                  'Deformation is elastic. Stop the test and the specimen returns to its original shape.',
              },
              {
                term: 'After the yield point',
                description:
                  'Deformation is plastic and permanent. This is the line a structure isn’t allowed to cross in use, which is why yield strength, not ultimate strength, is usually the design limit.',
              },
              {
                term: 'Modulus of elasticity',
                description:
                  'The slope of the elastic region — how stiffly a material resists being deformed at all. Across the metals we tested, steel came out stiffest, then aluminum, then brass.',
              },
            ],
          },
          // TODO(Desmond): your résumé mentions a composite insulation lid made
          // from recycled materials, R-value estimated at 14–16 and checked
          // with Vernier temperature probes. It is not in the notebook you sent,
          // so I left it out rather than guess at the details. If you want it,
          // it belongs right here — add a `text` block describing it.
        ],
      },
      {
        title: 'Pascal’s law, and a claw that did not work',
        kicker: 'Fluid power',
        blocks: [
          {
            kind: 'text',
            text: 'The unit project was a claw machine driven entirely by syringe hydraulics — no motors — able to pick up something about the size of an easter egg, with a non-electronic timer, a non-electric sound indicator and a prize chute. Two syringes joined by a tube, one full of water and one empty: push the first and the second extends, because pressure in a confined fluid is transmitted undiminished. A VEX frame carried the gantry, tongue-depressor scissor arms did the lifting, and the claw and a pipe bracket were modeled in Fusion 360 and printed.',
          },
          {
            kind: 'callout',
            tone: 'caution',
            title: 'It did not work',
            text: 'The only mechanism that worked properly was the timer, and we ran out of time to integrate even that into the machine. The claw machine as a whole never functioned, and the reason was time management rather than any single technical problem.',
          },
          {
            kind: 'steps',
            items: [
              {
                title: 'The scissor lift was too long for the frame',
                text: 'Extending the frame cost about ten minutes and was the cheapest problem of the project.',
              },
              {
                title: 'The gantry bound up',
                text: 'Cardboard would not slide freely on the pipes. We replaced it with a VEX channel and a sliding piece, and cured the remaining resistance by swapping which face slid against which.',
              },
              {
                title: 'The scissor arms were redesigned and printed',
                text: 'Filleted rectangles in Fusion 360 replaced the tongue depressors and moved far better. By then there was no time left to redesign the gantry to match.',
              },
              {
                title: 'The vertical axis never moved properly',
                text: 'Zip ties holding the scissor mechanism generated enough friction to stop it traveling. Loosening them did not help, and we ran out of time and shipped it that way.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'The timer is the part I’m still happy with. A syringe raises a platform holding a one-pound weight. Gravity pulls the weight back down, which pushes the water back into the first syringe. When the platform reaches the bottom it closes a bare-wire contact, completing a circuit that sounds a buzzer. It’s a hydraulic clock with an electrical alarm on the end, and it worked the first time.',
          },
          {
            kind: 'text',
            text: 'The rest of it traces back to a decision we made on day one: we copied a video. The machine in it was smaller than ours had to be and the person building it knew a lot more than we did, so every dimension we borrowed was wrong for our requirements. Building the whole thing in VEX from the start, instead of cardboard, would have been more stable and faster.',
          },
        ],
      },
      {
        title: 'Pinball: seven hundred lines to a hundred and twenty-five',
        kicker: 'Controls',
        blocks: [
          {
            kind: 'text',
            text: 'A working pinball machine, mechanical and electrical: six large VEX plates for the frame, solenoid-driven flippers, sensor-triggered scoring, and a display running scoring, start-up and high-score animations. Each solenoid runs through a relay so the switching surge never reaches the button, and the relay is what the button actually drives.',
          },
          {
            kind: 'metrics',
            items: [
              { value: '700+', label: 'Lines in the first working version' },
              { value: '125', label: 'Lines after refactoring', note: 'same behavior' },
            ],
          },
          {
            kind: 'text',
            text: 'The control code started at over seven hundred lines and ended at a hundred and twenty-five, entirely by pulling repeated blocks into functions and loops. Nothing the machine did changed. What changed was that the version I could still read a week later was the short one.',
          },
          {
            kind: 'callout',
            tone: 'caution',
            title: 'We missed the deadline',
            text: 'The obstacles were the hard part and we left them late. Printed ramps came out too steep for the ball, or the ball couldn’t roll through them at all, and they went through several rounds of redesign. Meanwhile I was adding features to code that already worked. We handed it in late and got penalized for it. I spent the time on the wrong thing.',
          },
        ],
      },
      {
        title: 'Chi-square on a case of sweets',
        kicker: 'Statistics',
        blocks: [
          {
            kind: 'text',
            text: 'The statistics unit had a genuinely good problem in it. Given the color counts from a 48-pack case and the two published color formulas of the two factories that make them, work out which factory the case came from.',
          },
          {
            kind: 'steps',
            items: [
              {
                title: 'Describe the data',
                text: 'Mean, median, mode and sample standard deviation per color, then a histogram for each binned at ±1, 2 and 3 standard deviations from the mean. They came out close to symmetric.',
              },
              {
                title: 'State the hypotheses',
                text: 'Null: no significant difference between the observed counts and the counts that factory’s formula predicts. Alternative: there is one.',
              },
              {
                title: 'Run the test',
                text: 'Sum of (observed − expected)² / expected across the six colors, against five degrees of freedom and a critical value of 11.07 at p = 0.05.',
              },
              {
                title: 'Read the result',
                text: 'One factory produced a test statistic far below the critical value, so the null could not be rejected for it — the case matched the Charlotte formula, and orange was the color distributed most consistently.',
              },
            ],
          },
          {
            kind: 'text',
            text: 'This was the first time I used a hypothesis test to answer a question instead of to fill in a worksheet. It’s also where "we can’t reject the null" started meaning something to me: not proof the case came from that factory, just no evidence that it didn’t.',
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
              'Two of the three big projects were finished late or not at all, and neither was blocked by a problem I couldn’t solve. Both were blocked by spending time on the wrong part — polishing code that already worked, or copying a design that didn’t fit the requirements.',
              'Build the jig before you need it. The VEX fixture that held the truss supports square took ten minutes and would have saved a rebuild if it had existed first.',
              'Prototype the moving parts before committing to the frame around them. The gantry and the vertical axis were both discovered to be too stiff after everything else was already built around them.',
              'The truss result is the one I’d show somebody first. Our design lost, the data said exactly why, and the fix — shorter members, more of them — was readable in the numbers before anyone explained it.',
            ],
          },
        ],
      },
    ],
  },
}

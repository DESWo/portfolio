import type { Project } from '../types.ts'

export const neutronTransport: Project = {
  slug: 'neutron-transport',
  title: 'Neutron Transport Monte Carlo Code',
  subtitle: 'Following neutrons one history at a time',
  summary:
    'A Monte Carlo neutron transport simulator written from scratch, modeled on how OpenMC and MCNP work. Currently handles continuous-energy cross sections and criticality calculations.',
  categories: ['nuclear', 'simulation', 'software', 'research'],
  status: 'in-progress',
  date: 'July 2026 – present',
  sortDate: '2026-07',
  featured: true,

  // TODO(Desmond): add the language and libraries once you are ready to say —
  // e.g. technologies: ['Python', 'NumPy'].
  //
  // TODO(Desmond): when the repository goes public, add:
  //   repo: 'https://github.com/DESWo/…',
  // and a `caseStudy` block. This is the project on the site with the least
  // written about it relative to how interesting it is.

  achievements: [
    'Reached criticality modeling and continuous-energy cross sections in the physics engine.',
  ],
  relatedProjects: ['fusion-sandbox', 'radiant'],

  caseStudy: {
    // TODO(Desmond): READ THIS SECTION BEFORE PUBLISHING. The facts below come
    // from your résumé, but unlike the other case studies on this site there
    // was no README to write the reasoning from, so the "Why write one"
    // narrative is a draft of what your motivation probably was. Rewrite it in
    // your own words — it should be the easiest section on the site for you to
    // improve.
    summary:
      'Reactor physics at the level most textbooks stop at is a set of averaged equations. Monte Carlo transport is the other approach: simulate individual neutron histories and let the averages fall out. I wanted to know how the codes the field actually runs on are built, so I started writing one.',
    facts: [
      { label: 'Role', value: 'Sole author' },
      { label: 'Started', value: 'July 2026' },
      { label: 'Reference tools', value: 'OpenMC, MCNP' },
      { label: 'Stage', value: 'Criticality and continuous-energy cross sections' },
    ],
    sections: [
      {
        title: 'Why write one',
        kicker: 'Motivation',
        blocks: [
          {
            kind: 'text',
            text: [
              'RADIANT and FusionCore both model reactors with lumped, averaged physics — point kinetics on one side, a single volume-averaged plasma zone on the other. Those models are useful and I have been careful about saying where they bend, but neither of them tells you where a neutron actually goes.',
              'Monte Carlo transport answers that question directly. Instead of solving a transport equation, you follow individual neutron histories: sample a distance to the next collision from the material’s cross sections, sample what kind of collision it is, sample the outgoing energy and direction, and repeat until the neutron is absorbed or leaks out. Run enough histories and the quantities you care about — the multiplication factor, flux distributions, reaction rates — emerge as statistics rather than as the output of an equation you had to trust.',
              'It is also the honest way to learn what OpenMC and MCNP are doing, which matters if I ever want to use their results and defend them.',
            ],
          },
        ],
      },
      {
        title: 'Where it has got to',
        kicker: 'Status',
        blocks: [
          {
            kind: 'list',
            items: [
              'Continuous-energy cross sections rather than a multigroup approximation, so a neutron’s interaction probability follows the real energy dependence instead of a binned average.',
              'Criticality calculation — iterating fission generations to find the multiplication factor rather than assuming a fixed source.',
            ],
          },
          {
            kind: 'callout',
            tone: 'caution',
            title: 'What this is not, yet',
            text: 'This is a learning build, not a validated code. Nothing it produces should be compared against a published benchmark until it has been checked against one — which is the next piece of work, and the point at which it becomes worth anyone else reading.',
          },
        ],
      },
    ],
  },
}

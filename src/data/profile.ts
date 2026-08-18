import type { Profile } from './types.ts'

/**
 * You: the hero, the About page, and the small facts panel.
 *
 * Everything here is plain text. Edit a sentence, save, and the page changes.
 * No sentence in this file is used in more than one place, so you can rewrite
 * any of it without checking what else it affects.
 */
export const profile: Profile = {
  name: 'Desmond Wong',

  /** The line directly under your name, in the header and the hero. */
  role: 'Engineering student — nuclear energy, fusion, and simulation',

  /**
   * The small line at the very top of the home page. Three words reads best.
   */
  disciplines: ['Nuclear', 'Fusion', 'Simulation'],

  location: 'California, USA',

  /**
   * The largest sentence on the site. It should say what you work on, not how
   * good you are at it.
   */
  tagline: 'Energy systems, and the physics you have to get right to model them.',

  /** The paragraph under the tagline on the home page. Keep it to one. */
  intro:
    'I am a twelfth-grade student working toward nuclear engineering. I build simulations and explanatory tools to understand how energy systems actually behave — reactors, plasmas, structures — and I publish the assumptions and sources underneath them along with the result.',

  /**
   * The facts panel in the hero. Four or five reads best; more starts to look
   * like a form. Update `Currently` whenever what you are working on changes —
   * it is the line that makes the site look alive.
   */
  facts: [
    { label: 'Focus', value: 'Nuclear & fusion energy' },
    { label: 'Studying', value: 'Diamond Bar High School, Class of 2027' },
    { label: 'Based in', value: 'Diamond Bar, California' },
    { label: 'Currently', value: 'Writing a Monte Carlo neutron transport code' },
  ],

  /**
   * The three columns under the hero. These are what you work on, in your own
   * words — not a skills list.
   */
  focus: [
    {
      title: 'Energy systems',
      description:
        'Fission and fusion: how a core holds a chain reaction, how a magnetic bottle holds a plasma, and what sets the limits on both. The physics is settled enough to compute; the engineering is not finished.',
    },
    {
      title: 'Simulation',
      description:
        'Writing a physical system down as equations, solving it numerically, and then making it operable — because a model you can drive tells you things a model you can only read does not.',
    },
    {
      title: 'Showing the working',
      description:
        'Every model I publish carries its sources, its assumptions, and a plain statement of what it deliberately simplifies. A simulation that hides its approximations teaches the wrong lesson.',
    },
  ],

  /** The About page. One string per paragraph. */
  about: [
    'I build things to find out how they work. That is most of it. A question I cannot put down turns into a model, the model turns into something you can operate, and by the time it runs I understand the system in a way that reading about it never got me.',
    'Not all of it is software. Three years of my school’s engineering sequence meant a balsa truss bridge tuned for force-to-weight against a strict mass limit, a claw run on syringe hydraulics with its own 3D-printed parts, and logic circuits minimised on paper and then built twice — once on a breadboard and once on a programmable device. Physical builds give a different kind of feedback. A simulation does what it was told to; a bridge tells you where it actually breaks.',
    'Most of what I make ends up somewhere near energy. Fission and fusion are the clearest cases I know of a field where the physics is settled enough to compute and the engineering is still genuinely open — the arguments are about materials, confinement, cost and risk, not about whether the reaction works.',
    'The habit I care about most is being honest about the model. FusionCore has a section on what it deliberately gets wrong. RADIANT carries a primary citation for every number on the page, and a limitations section that argues against itself. Engineering Explorer’s physics is pinned by scripts that re-derive the answers from outside the code, and nothing deploys on a red check. I would rather ship a model that says where it bends than one that looks authoritative and is not.',
    'Right now that means two things at once: writing a Monte Carlo neutron transport code from scratch to find out how the tools the field actually runs on are built, and working through magnetic-confinement physics properly — reaction rates, confinement scaling, and enough of the tokamak and stellarator literature to find a question narrow enough that I could answer it. I am still in high school, so none of this is credentialed work. It is checked, sourced, and mine.',
  ],

  /**
   * Optional headshot. The layout is designed to look right without one, so
   * leave it out until you have a photo you like.
   *
   * photo: { src: '/images/desmond.jpg', alt: 'Desmond Wong', width: 800, height: 800 },
   */

  /**
   * Your résumé.
   *
   * TODO(Desmond): drop the PDF at public/resume/Desmond-Wong-Resume.pdf and
   * replace `null` below with the commented-out object. Until then the site
   * simply does not show a résumé button anywhere — nothing breaks, and there
   * is no dead link.
   *
   * resume: {
   *   href: '/resume/Desmond-Wong-Resume.pdf',
   *   label: 'Résumé (PDF)',
   *   updated: 'August 2026',
   * },
   */
  resume: null,
}

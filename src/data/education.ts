import type { Education } from './types.ts'

/**
 * Schools and degrees, newest first.
 *
 * `coursework` is optional and only worth filling in with classes that are
 * genuinely relevant — a full transcript belongs on a transcript.
 */
export const education: Education[] = [
  {
    id: 'diamond-bar-hs',
    institution: 'Diamond Bar High School',
    credential: 'High School Diploma',
    location: 'Diamond Bar, California',
    period: 'Expected 2027',
    note: 'Class of 2027 — currently in twelfth grade.',

    // TODO(Desmond): list the relevant classes you have actually taken, e.g.
    // coursework: ['AP Physics C: Mechanics', 'AP Calculus BC', 'AP Chemistry'],
    //
    // TODO(Desmond): anything worth calling out — clubs, competitions, awards.
    // highlights: ['...'],
  },
]

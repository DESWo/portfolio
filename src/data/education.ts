import type { Education } from './types.ts'

/**
 * Schools and degrees, newest first.
 *
 * `coursework` is deliberately the *relevant* classes rather than a full
 * transcript — a portfolio is not a transcript, and a list nobody reads is
 * worse than a short one somebody does. The humanities and language APs are
 * left off for that reason; add them if you want them here.
 */
export const education: Education[] = [
  {
    id: 'diamond-bar-hs',
    institution: 'Diamond Bar High School',
    credential: 'High School Diploma — four-year PLTW engineering program',
    location: 'Diamond Bar, California',
    period: '2023 – 2027',
    note: 'Class of 2027, currently in twelfth grade. Unweighted GPA 3.62 · UC capped weighted GPA 4.3.',
    coursework: [
      'PLTW Introduction to Engineering Design',
      'PLTW Principles of Engineering',
      'PLTW Digital Electronics',
      'PLTW Engineering Design & Development',
      'AP Physics C',
      'AP Physics 1',
      'AP Statistics',
      'AP Precalculus',
      'Honors Biology',
      'Pre-AP Chemistry',
    ],
    highlights: [
      'Completing the four-year PLTW engineering sequence; the senior capstone, Engineering Design & Development, is in progress.',
      'Each of the first three years produced a set of builds that are written up as projects on this site.',
    ],
  },
  {
    id: 'dual-enrollment',
    institution: 'Chaffey College · Mt. San Antonio College · Pasadena City College',
    credential: 'Dual enrollment',
    location: 'California',
    period: '2024 – present',
    note: 'College coursework taken alongside high school.',
    coursework: ['Calculus', 'Programming I (C++)', 'Statistics', 'Biology', 'Anthropology', 'Public Speaking'],
  },
]

import type { Certification } from './types.ts'

/**
 * Certifications, licences and completed courses.
 *
 * The section is hidden on the About page when this array is empty, so adding
 * an entry is all it takes to make it appear.
 */
export const certifications: Certification[] = [
  {
    id: 'autodesk-fusion',
    name: 'Autodesk Certified User — Fusion 360',
    issuer: 'Autodesk',
    // TODO(Desmond): replace with the month you actually certified, and add
    // `credentialId` and `href` if you have a verification link.
    date: '2025',
  },
]

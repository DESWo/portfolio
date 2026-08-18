import type { Certification } from './types.ts'

/**
 * Certifications, licences and completed courses.
 *
 * This is empty on purpose — the section is hidden on the About page until
 * there is something real to put in it. Add an entry and it appears.
 *
 * Good candidates when you get them: Autodesk Fusion certification, an OSHA
 * card, a completed university-run summer course, a radiation-safety course.
 *
 *   {
 *     id: 'autodesk-fusion',
 *     name: 'Autodesk Certified User — Fusion',
 *     issuer: 'Autodesk',
 *     date: 'March 2027',
 *     credentialId: 'ABC-12345',        // optional
 *     href: 'https://verify.example',   // optional link to the credential
 *     expires: 'March 2030',            // omit if it does not expire
 *   },
 */
export const certifications: Certification[] = []

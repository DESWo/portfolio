/**
 * Where people can reach you, and everything the site links out to.
 *
 * Leave `href` as an empty string for anything you do not have yet. Empty
 * entries are skipped everywhere — the header, the footer, the contact
 * section — so there are never dead links on the site.
 */

/** Which small inline icon to draw. See src/components/ui/Icon.tsx. */
export type IconName = 'email' | 'github' | 'linkedin' | 'itch' | 'document' | 'link'

export interface ContactLink {
  id: string
  label: string
  /** What is actually shown as the link text, e.g. the address or the handle. */
  display?: string
  href: string
  icon: IconName
  /** Show this one in the site footer and the hero. */
  primary?: boolean
}

export const contactLinks: ContactLink[] = [
  {
    id: 'email',
    label: 'Email',
    display: 'wongdesmond414@gmail.com',
    href: 'mailto:wongdesmond414@gmail.com',
    icon: 'email',
    primary: true,
  },
  {
    id: 'github',
    label: 'GitHub',
    display: 'github.com/DESWo',
    href: 'https://github.com/DESWo',
    icon: 'github',
    primary: true,
  },
  {
    // TODO(Desmond): paste your LinkedIn URL here and it appears everywhere.
    id: 'linkedin',
    label: 'LinkedIn',
    display: '',
    href: '',
    icon: 'linkedin',
    primary: true,
  },
  {
    // TODO(Desmond): if you publish anything on itch.io, put the profile here.
    id: 'itch',
    label: 'itch.io',
    display: '',
    href: '',
    icon: 'itch',
  },
]

/** Only the links that have actually been filled in. */
export const activeContactLinks = contactLinks.filter((l) => l.href.trim() !== '')

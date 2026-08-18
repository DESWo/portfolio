/**
 * Every icon on the site, drawn inline.
 *
 * Hand-drawn rather than pulled from an icon package: there are fourteen of
 * them, they never change, and a dependency would ship a hundred more.
 *
 * All are 24×24 with a 1.5 stroke so they sit consistently next to text.
 */

export type IconGlyph =
  | 'email'
  | 'github'
  | 'linkedin'
  | 'itch'
  | 'document'
  | 'link'
  | 'arrow-right'
  | 'arrow-up-right'
  | 'arrow-left'
  | 'sun'
  | 'moon'
  | 'system'
  | 'menu'
  | 'close'
  | 'grid'
  | 'list'

const PATHS: Record<IconGlyph, React.ReactNode> = {
  email: (
    <>
      <rect x="2.75" y="4.75" width="18.5" height="14.5" rx="1.5" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </>
  ),
  github: (
    // Solid mark; the only icon that reads better filled than stroked.
    <path
      fill="currentColor"
      stroke="none"
      d="M12 1.7a10.3 10.3 0 0 0-3.26 20.07c.52.1.7-.22.7-.5v-1.9c-2.86.63-3.47-1.2-3.47-1.2-.47-1.2-1.15-1.52-1.15-1.52-.94-.64.07-.63.07-.63 1.04.07 1.58 1.07 1.58 1.07.92 1.58 2.42 1.12 3.01.86.1-.67.36-1.13.65-1.39-2.28-.26-4.68-1.14-4.68-5.08 0-1.12.4-2.04 1.06-2.76-.11-.26-.46-1.31.1-2.72 0 0 .86-.28 2.83 1.05a9.75 9.75 0 0 1 5.15 0c1.96-1.33 2.83-1.05 2.83-1.05.56 1.41.2 2.46.1 2.72.66.72 1.06 1.64 1.06 2.76 0 3.95-2.41 4.82-4.7 5.07.37.32.7.95.7 1.92v2.84c0 .28.19.6.71.5A10.3 10.3 0 0 0 12 1.7Z"
    />
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7.5 10.5v6.25M7.5 7.6v.05M11.75 16.75V10.5M11.75 13.4c0-1.6.9-2.6 2.2-2.6s2.3.9 2.3 2.7v3.25" />
    </>
  ),
  itch: (
    <>
      <path d="M3.6 4.75h16.8l1.6 3.4a2 2 0 0 1-3.7 1.05 2 2 0 0 1-3.65 0 2 2 0 0 1-3.65 0 2 2 0 0 1-3.65 0A2 2 0 0 1 2 8.15Z" />
      <path d="M4.4 10.6v7.15c0 .83.67 1.5 1.5 1.5h12.2c.83 0 1.5-.67 1.5-1.5V10.6" />
      <path d="M10 19.25V15.5h4v3.75" />
    </>
  ),
  document: (
    <>
      <path d="M14 2.75H6.75c-.83 0-1.5.67-1.5 1.5v15.5c0 .83.67 1.5 1.5 1.5h10.5c.83 0 1.5-.67 1.5-1.5V7.5Z" />
      <path d="M14 2.75V7.5h4.75M8.5 12.5h7M8.5 16h5" />
    </>
  ),
  link: (
    <>
      <path d="M10.3 13.7a3.6 3.6 0 0 0 5.1 0l2.9-2.9a3.6 3.6 0 0 0-5.1-5.1l-1.2 1.2" />
      <path d="M13.7 10.3a3.6 3.6 0 0 0-5.1 0l-2.9 2.9a3.6 3.6 0 0 0 5.1 5.1l1.2-1.2" />
    </>
  ),
  'arrow-right': <path d="M4.75 12h14.5m-5.5-5.5L19.25 12l-5.5 5.5" />,
  'arrow-up-right': <path d="M7 17 17 7m-8.2 0H17v8.2" />,
  'arrow-left': <path d="M19.25 12H4.75m5.5-5.5L4.75 12l5.5 5.5" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.75v2M12 19.25v2M2.75 12h2M19.25 12h2M5.5 5.5 6.9 6.9M17.1 17.1l1.4 1.4M18.5 5.5 17.1 6.9M6.9 17.1 5.5 18.5" />
    </>
  ),
  moon: <path d="M20 14.4A8.2 8.2 0 0 1 9.6 4a8.4 8.4 0 1 0 10.4 10.4Z" />,
  system: (
    <>
      <rect x="2.75" y="4.75" width="18.5" height="12.5" rx="1.5" />
      <path d="M8.5 21.25h7M12 17.25v4" />
    </>
  ),
  menu: <path d="M3.75 7.5h16.5M3.75 12h16.5M3.75 16.5h16.5" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  grid: (
    <>
      <rect x="3.75" y="3.75" width="7" height="7" rx="1" />
      <rect x="13.25" y="3.75" width="7" height="7" rx="1" />
      <rect x="3.75" y="13.25" width="7" height="7" rx="1" />
      <rect x="13.25" y="13.25" width="7" height="7" rx="1" />
    </>
  ),
  list: <path d="M4 6.5h16M4 12h16M4 17.5h16" />,
}

interface IconProps {
  name: IconGlyph
  /** Pixel size. Defaults to 1em so the icon tracks the text next to it. */
  size?: number | string
  className?: string
  /**
   * Give the icon a label only when it is the sole content of a control.
   * Next to visible text it should stay hidden from screen readers.
   */
  title?: string
}

export function Icon({ name, size = '1em', className, title }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {PATHS[name]}
    </svg>
  )
}

import { useTheme } from '@/hooks/useTheme'
import { Icon, type IconGlyph } from '@/components/ui/Icon'

const NEXT_LABEL = {
  light: 'Switch to dark theme',
  dark: 'Follow the system theme',
  system: 'Switch to light theme',
} as const

const GLYPH: Record<'light' | 'dark' | 'system', IconGlyph> = {
  light: 'sun',
  dark: 'moon',
  system: 'system',
}

const CURRENT_LABEL = {
  light: 'Light theme',
  dark: 'Dark theme',
  system: 'System theme',
} as const

/**
 * Cycles light → dark → follow-the-system.
 *
 * The button announces the current state, and its title says what pressing it
 * will do — so the control is usable without seeing which icon is showing.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { choice, cycle } = useTheme()

  return (
    <button
      type="button"
      onClick={cycle}
      title={NEXT_LABEL[choice]}
      aria-label={`${CURRENT_LABEL[choice]}. ${NEXT_LABEL[choice]}.`}
      className={
        'inline-flex size-9 items-center justify-center border border-transparent text-ink-muted transition-colors duration-150 hover:border-rule hover:text-ink ' +
        (className ?? '')
      }
    >
      <Icon name={GLYPH[choice]} size={17} />
    </button>
  )
}

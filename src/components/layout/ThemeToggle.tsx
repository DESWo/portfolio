import { copy } from '@/data'
import { fill } from '@/lib/utils'
import { useTheme } from '@/hooks/useTheme'
import { Icon, type IconGlyph } from '@/components/ui/Icon'

/** What pressing the button does from each state. The cycle is light → dark → system. */
const NEXT_LABEL = {
  light: copy.theme.toDark,
  dark: copy.theme.toSystem,
  system: copy.theme.toLight,
} as const

const GLYPH: Record<'light' | 'dark' | 'system', IconGlyph> = {
  light: 'sun',
  dark: 'moon',
  system: 'system',
}

const CURRENT_LABEL = {
  light: copy.theme.light,
  dark: copy.theme.dark,
  system: copy.theme.system,
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
      aria-label={fill(copy.theme.announce, {
        current: CURRENT_LABEL[choice],
        next: NEXT_LABEL[choice],
      })}
      className={
        'inline-flex size-9 items-center justify-center border border-transparent text-ink-muted transition-colors duration-150 hover:border-rule hover:text-ink ' +
        (className ?? '')
      }
    >
      <Icon name={GLYPH[choice]} size={17} />
    </button>
  )
}

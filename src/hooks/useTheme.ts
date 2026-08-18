import { useCallback, useEffect, useState } from 'react'

export type ThemeChoice = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'dw:theme'

function systemPrefersDark(): boolean {
  return (
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )
}

function readStored(): ThemeChoice {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === 'light' || raw === 'dark' || raw === 'system') return raw
  } catch {
    // Private mode, or storage disabled. Fall through to the system default.
  }
  return 'system'
}

/** Write the resolved theme onto <html>, which is what the CSS keys off. */
function apply(choice: ThemeChoice) {
  const dark = choice === 'dark' || (choice === 'system' && systemPrefersDark())
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
}

/**
 * Light / dark / follow-the-system, persisted.
 *
 * The same logic runs as a tiny inline script in index.html before first
 * paint, so the page never flashes the wrong theme on load. This hook keeps it
 * in sync afterwards, including when the operating system changes underneath
 * a visitor who chose "system".
 */
export function useTheme() {
  const [choice, setChoice] = useState<ThemeChoice>(() =>
    typeof window === 'undefined' ? 'system' : readStored(),
  )

  useEffect(() => {
    apply(choice)
    try {
      localStorage.setItem(STORAGE_KEY, choice)
    } catch {
      // Not being able to remember the choice is not worth breaking the page.
    }
  }, [choice])

  useEffect(() => {
    if (choice !== 'system' || typeof window.matchMedia !== 'function') return
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => apply('system')
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [choice])

  /** Cycles light -> dark -> system. */
  const cycle = useCallback(() => {
    setChoice((c) => (c === 'light' ? 'dark' : c === 'dark' ? 'system' : 'light'))
  }, [])

  return { choice, setChoice, cycle }
}

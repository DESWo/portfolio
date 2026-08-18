import type { ProjectStatus, ResearchStatus } from '@/data'
import { PROJECT_STATUS_LABEL, RESEARCH_STATUS_LABEL } from '@/data'
import { cn } from '@/lib/utils'

/**
 * How each status is drawn: a filled dot means the work is live or finished, a
 * hollow one means it is under way or provisional. Colour is never the only
 * signal — the label is always spelled out next to it.
 */
type Tone = 'live' | 'progress' | 'settled' | 'quiet'

const PROJECT_TONE: Record<ProjectStatus, Tone> = {
  active: 'live',
  'in-progress': 'progress',
  maintained: 'settled',
  complete: 'settled',
  paused: 'quiet',
  concept: 'quiet',
}

const RESEARCH_TONE: Record<ResearchStatus, Tone> = {
  published: 'live',
  'under-review': 'progress',
  draft: 'progress',
  researching: 'progress',
  exploring: 'quiet',
}

const DOT: Record<Tone, string> = {
  live: 'bg-accent',
  progress: 'border border-accent bg-transparent',
  settled: 'bg-ink-faint',
  quiet: 'border border-ink-faint bg-transparent',
}

export function StatusPill({
  status,
  kind = 'project',
  className,
}: {
  status: ProjectStatus | ResearchStatus
  kind?: 'project' | 'research'
  className?: string
}) {
  const isProject = kind === 'project'
  const label = isProject
    ? PROJECT_STATUS_LABEL[status as ProjectStatus]
    : RESEARCH_STATUS_LABEL[status as ResearchStatus]
  const tone = isProject
    ? PROJECT_TONE[status as ProjectStatus]
    : RESEARCH_TONE[status as ResearchStatus]

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-mono text-[0.6875rem] font-medium tracking-[0.12em] whitespace-nowrap text-ink-muted uppercase',
        className,
      )}
    >
      <span className={cn('size-1.5 shrink-0 rounded-full', DOT[tone])} aria-hidden="true" />
      {label}
    </span>
  )
}

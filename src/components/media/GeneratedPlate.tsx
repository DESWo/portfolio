import { hash01 } from '@/lib/utils'

/**
 * The drawing used when a project has no screenshot yet.
 *
 * It is not a placeholder box and it is not a stock photo. It is a small
 * technical plate — a drafting grid with one figure on it, chosen from the
 * project's primary category and varied by a hash of its slug, so the same
 * project always draws the same plate and no two sit next to each other
 * looking identical.
 *
 * The moment you add a `thumbnail` to the project's data file, this disappears.
 */

const GRID = 50 // drafting grid pitch, in viewBox units
const W = 1600
const H = 1000

function Grid() {
  const lines: React.ReactNode[] = []
  for (let x = GRID; x < W; x += GRID) {
    lines.push(<line key={`v${x}`} x1={x} y1={0} x2={x} y2={H} />)
  }
  for (let y = GRID; y < H; y += GRID) {
    lines.push(<line key={`h${y}`} x1={0} y1={y} x2={W} y2={y} />)
  }
  return (
    <g stroke="var(--rule)" strokeWidth={1} opacity={0.55}>
      {lines}
    </g>
  )
}

/** A tokamak-like nested cross-section: a D-shaped boundary and flux surfaces. */
function PlasmaFigure(r: number) {
  const cx = W / 2
  const cy = H / 2
  const rings = [1, 0.76, 0.54, 0.34, 0.16]
  const triangularity = 0.28 + r * 0.16
  const elongation = 1.35 + r * 0.25

  const surface = (k: number) => {
    const a = 300 * k
    const b = a * elongation
    const d = triangularity * k
    const points: string[] = []
    for (let i = 0; i <= 72; i++) {
      const t = (i / 72) * Math.PI * 2
      const x = cx + a * Math.cos(t + d * Math.sin(t))
      const y = cy + b * Math.sin(t)
      points.push(`${x.toFixed(1)},${y.toFixed(1)}`)
    }
    return points.join(' ')
  }

  return (
    <g fill="none">
      {rings.map((k, i) => (
        <polyline
          key={k}
          points={surface(k)}
          stroke={i === 0 ? 'var(--accent)' : 'var(--rule-strong)'}
          strokeWidth={i === 0 ? 3 : 1.5}
          opacity={i === 0 ? 0.9 : 0.7 - i * 0.1}
        />
      ))}
      <line x1={cx} y1={90} x2={cx} y2={H - 90} stroke="var(--rule-strong)" strokeWidth={1} strokeDasharray="10 8" />
    </g>
  )
}

/** Concentric shells around a core — the fission/atom family. */
function CoreFigure(r: number) {
  const cx = W / 2
  const cy = H / 2
  const shells = [340, 260, 180]
  return (
    <g fill="none">
      {shells.map((rad, i) => (
        <ellipse
          key={rad}
          cx={cx}
          cy={cy}
          rx={rad}
          ry={rad * (0.42 + i * 0.06)}
          stroke="var(--rule-strong)"
          strokeWidth={1.5}
          opacity={0.75 - i * 0.12}
          transform={`rotate(${-60 + i * 60 + r * 20} ${cx} ${cy})`}
        />
      ))}
      <circle cx={cx} cy={cy} r={46} fill="var(--accent)" opacity={0.85} />
      <circle cx={cx} cy={cy} r={92} stroke="var(--accent)" strokeWidth={2} opacity={0.5} />
    </g>
  )
}

/** A sampled response curve — the simulation family. */
function CurveFigure(r: number) {
  const x0 = 180
  const x1 = W - 180
  const baseline = H - 240
  const amp = 240 + r * 60
  const k = 2.2 + r * 1.4

  const path: string[] = []
  const dots: { x: number; y: number }[] = []
  const steps = 120
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const x = x0 + (x1 - x0) * t
    // A damped resonance-shaped response: rises, peaks, decays.
    const y = baseline - amp * (Math.exp(-k * t) * Math.sin(t * Math.PI * 2.2 + 0.4) + t * 0.35)
    path.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`)
    if (i % 15 === 0) dots.push({ x, y })
  }

  return (
    <g fill="none">
      <line x1={x0} y1={baseline} x2={x1} y2={baseline} stroke="var(--rule-strong)" strokeWidth={1.5} />
      <line x1={x0} y1={160} x2={x0} y2={baseline} stroke="var(--rule-strong)" strokeWidth={1.5} />
      <path d={path.join(' ')} stroke="var(--accent)" strokeWidth={3} />
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={5} fill="var(--paper-sunken)" stroke="var(--accent)" strokeWidth={2} />
      ))}
    </g>
  )
}

/** A triangulated truss — the structural family. */
function TrussFigure(r: number) {
  const y0 = 340
  const y1 = 660
  const bays = 5
  const span = W - 320
  const step = span / bays
  const members: [number, number, number, number][] = []

  for (let i = 0; i < bays; i++) {
    const x = 160 + i * step
    members.push([x, y1, x + step, y1]) // bottom chord
    members.push([x, y0, x + step, y0]) // top chord
    members.push([x, y0, x, y1]) // vertical
    // Alternate the diagonal so it reads as a real Pratt/Warren pattern.
    if ((i + Math.round(r * 2)) % 2 === 0) members.push([x, y1, x + step, y0])
    else members.push([x, y0, x + step, y1])
  }
  members.push([160 + span, y0, 160 + span, y1])

  return (
    <g fill="none" stroke="var(--rule-strong)" strokeWidth={2.5} strokeLinecap="round">
      {members.map((m, i) => (
        <line key={i} x1={m[0]} y1={m[1]} x2={m[2]} y2={m[3]} />
      ))}
      <line
        x1={160 + step}
        y1={y1}
        x2={160 + step * 2}
        y2={y0}
        stroke="var(--accent)"
        strokeWidth={4}
      />
      <path
        d={`M${160 + step * 2} ${y1 + 40} l0 60 m-24 -24 l24 24 l24 -24`}
        stroke="var(--accent)"
        strokeWidth={2.5}
      />
    </g>
  )
}

/** A column chart — the data family. */
function DataFigure(r: number) {
  const baseline = H - 240
  const x0 = 200
  const bars = 7
  const width = 96
  const gap = 52
  const heights = Array.from({ length: bars }, (_, i) => 90 + hash01(`bar${i}`, Math.round(r * 1000)) * 420)

  return (
    <g>
      <line x1={x0 - 40} y1={baseline} x2={x0 + bars * (width + gap)} y2={baseline} stroke="var(--rule-strong)" strokeWidth={1.5} />
      {heights.map((h, i) => (
        <rect
          key={i}
          x={x0 + i * (width + gap)}
          y={baseline - h}
          width={width}
          height={h}
          fill={i === 2 ? 'var(--accent)' : 'none'}
          stroke={i === 2 ? 'var(--accent)' : 'var(--rule-strong)'}
          strokeWidth={2}
          opacity={i === 2 ? 0.9 : 0.8}
        />
      ))}
    </g>
  )
}

/** Nested modules — the software family. */
function ModuleFigure(r: number) {
  const boxes = [
    { x: 220, y: 250, w: 480, h: 220 },
    { x: 760, y: 250, w: 620, h: 220 },
    { x: 220, y: 530, w: 300, h: 220 },
    { x: 580, y: 530, w: 800, h: 220 },
  ]
  const highlight = Math.floor(r * boxes.length)
  return (
    <g fill="none" strokeWidth={2}>
      {boxes.map((b, i) => (
        <g key={i}>
          <rect
            x={b.x}
            y={b.y}
            width={b.w}
            height={b.h}
            stroke={i === highlight ? 'var(--accent)' : 'var(--rule-strong)'}
            opacity={i === highlight ? 0.95 : 0.8}
          />
          <line x1={b.x} y1={b.y + 52} x2={b.x + b.w} y2={b.y + 52} stroke="var(--rule)" />
        </g>
      ))}
      <path d="M700 360 L760 360 M520 640 L580 640" stroke="var(--rule-strong)" strokeDasharray="8 8" />
    </g>
  )
}

const FIGURES = {
  plasma: PlasmaFigure,
  core: CoreFigure,
  curve: CurveFigure,
  truss: TrussFigure,
  data: DataFigure,
  module: ModuleFigure,
} as const

type FigureKey = keyof typeof FIGURES

/** Which figure suits which category. */
const CATEGORY_FIGURE: Record<string, FigureKey> = {
  fusion: 'plasma',
  nuclear: 'core',
  simulation: 'curve',
  mechanical: 'curve',
  civil: 'truss',
  cad: 'truss',
  electrical: 'module',
  software: 'module',
  research: 'curve',
  data: 'data',
  education: 'module',
}

export function GeneratedPlate({
  seed,
  category,
  label,
  className,
}: {
  /** Anything stable and unique — the project slug. */
  seed: string
  /** Primary category id, which chooses the figure. */
  category?: string
  /** Small mono caption in the corner. */
  label?: string
  className?: string
}) {
  const r = hash01(seed)
  const key: FigureKey = (category && CATEGORY_FIGURE[category]) || 'module'
  const draw = FIGURES[key]

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      role="img"
      aria-label={label ? `${label} — placeholder technical plate` : 'Placeholder technical plate'}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width={W} height={H} fill="var(--paper-sunken)" />
      <Grid />
      {draw(r)}
      {/* Drawing border and plate number, like a title block. */}
      <rect
        x={24}
        y={24}
        width={W - 48}
        height={H - 48}
        fill="none"
        stroke="var(--rule-strong)"
        strokeWidth={2}
      />
      {label ? (
        <text
          x={56}
          y={H - 56}
          fill="var(--ink-faint)"
          fontFamily="var(--font-mono)"
          fontSize={30}
          letterSpacing={4}
        >
          {label.toUpperCase()}
        </text>
      ) : null}
    </svg>
  )
}

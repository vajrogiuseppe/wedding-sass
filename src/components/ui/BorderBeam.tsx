import { cn } from '@/lib/utils'

interface BorderBeamProps {
  className?: string
  duration?: number
  colorFrom?: string
  colorTo?: string
  delay?: number
}

/**
 * BorderBeam — a luminous spot that travels around the card border.
 *
 * Technique:
 * - Outer span uses CSS mask-composite:exclude to create a border-only visible zone
 * - Inner rotator (141% square) spins with a conic-gradient arc (~30deg gold)
 * - Result: only the border ring lights up as the arc sweeps past
 */
export function BorderBeam({
  className,
  duration = 8,
  colorFrom = '#c9a96e',
  colorTo = '#e8d5b0',
  delay = 0,
}: BorderBeamProps) {
  return (
    <span
      className={cn('border-beam__outer pointer-events-none', className)}
      aria-hidden="true"
    >
      <span
        className="border-beam__rotator"
        style={
          {
            '--duration': `${duration}s`,
            '--delay': `${delay}s`,
            '--color-from': colorFrom,
            '--color-to': colorTo,
          } as React.CSSProperties
        }
      />
    </span>
  )
}

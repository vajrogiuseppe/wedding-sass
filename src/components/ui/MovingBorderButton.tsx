import { cn } from '@/lib/utils'
import { useEffect, useRef } from 'react'

interface MovingBorderButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  duration?: number
  children: React.ReactNode
  borderRadius?: string
  containerClassName?: string
}

export function MovingBorderButton({
  duration = 3000,
  children,
  className,
  borderRadius = '9999px',
  containerClassName,
  style,
  ...props
}: MovingBorderButtonProps) {
  const pathRef = useRef<SVGRectElement>(null)
  const dotRef = useRef<HTMLSpanElement>(null)
  const frameRef = useRef<number>(0)
  const startRef = useRef<number>(0)

  useEffect(() => {
    const path = pathRef.current
    const dot = dotRef.current
    if (!path || !dot) return

    const totalLength = path.getTotalLength?.() ?? 0
    if (!totalLength) return

    const animate = (ts: number) => {
      if (!startRef.current) startRef.current = ts
      const elapsed = ts - startRef.current
      const progress = (elapsed % duration) / duration

      const point = path.getPointAtLength(progress * totalLength)
      const svgEl = path.ownerSVGElement
      if (!svgEl) return

      const svgRect = svgEl.getBoundingClientRect()
      const containerEl = svgEl.parentElement
      if (!containerEl) return
      const containerRect = containerEl.getBoundingClientRect()

      // Convert SVG point to container-relative coords
      const x = ((point.x / svgEl.viewBox.baseVal.width) * svgRect.width) + (svgRect.left - containerRect.left)
      const y = ((point.y / svgEl.viewBox.baseVal.height) * svgRect.height) + (svgRect.top - containerRect.top)

      dot.style.left = `${x}px`
      dot.style.top = `${y}px`

      frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameRef.current)
  }, [duration])

  return (
    <button
      className={cn(
        'group relative flex cursor-pointer items-center justify-center overflow-hidden px-8 py-4 text-sm font-medium text-warm-dark transition-colors duration-300 hover:text-gold',
        containerClassName
      )}
      style={{ borderRadius, ...style }}
      {...props}
    >
      {/* SVG path the dot follows */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 200 56"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* Visible border */}
        <rect
          x="1" y="1" width="198" height="54"
          rx="27" ry="27"
          stroke="currentColor"
          strokeOpacity="0.3"
          strokeWidth="1.5"
          className="text-gold"
        />
        {/* Motion path (invisible) */}
        <rect
          ref={pathRef}
          x="1" y="1" width="198" height="54"
          rx="27" ry="27"
          fill="none"
          stroke="none"
        />
      </svg>

      {/* Moving glow dot */}
      <span
        ref={dotRef}
        className="moving-border-dot"
        aria-hidden="true"
      />

      <span className="relative z-10">{children}</span>
    </button>
  )
}

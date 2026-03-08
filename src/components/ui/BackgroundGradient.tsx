import { cn } from '@/lib/utils'
import { useRef, useState } from 'react'

interface BackgroundGradientProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  animate?: boolean
}

export function BackgroundGradient({
  children,
  className,
  containerClassName,
  animate = true,
}: BackgroundGradientProps) {
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className={cn('relative group/gradient p-[2px] rounded-2xl', containerClassName)}
      onMouseEnter={() => animate && setIsHovered(true)}
      onMouseLeave={() => animate && setIsHovered(false)}
    >
      {/* Animated gradient border layer */}
      <span
        className={cn(
          'absolute inset-0 rounded-[inherit] z-0 transition-opacity duration-500',
          isHovered ? 'opacity-100' : 'opacity-0'
        )}
        style={{
          background: 'conic-gradient(from var(--angle, 0deg), #c9a96e, #e8d5b0, #fdfcfa, #c9a96e, #8a7f72, #c9a96e)',
          animation: isHovered ? 'border-angle 3s linear infinite' : 'none',
        }}
        aria-hidden="true"
      />
      {/* Static subtle border when not hovered */}
      <span
        className={cn(
          'absolute inset-0 rounded-[inherit] z-0 transition-opacity duration-500',
          isHovered ? 'opacity-0' : 'opacity-100'
        )}
        style={{
          background: 'linear-gradient(135deg, rgba(201,169,110,0.3), rgba(232,213,176,0.15), rgba(201,169,110,0.3))',
        }}
        aria-hidden="true"
      />
      {/* Inner content */}
      <div className={cn('relative z-10 rounded-[calc(1rem-2px)]', className)}>
        {children}
      </div>
    </div>
  )
}

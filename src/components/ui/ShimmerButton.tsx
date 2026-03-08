import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string
  background?: string
  borderRadius?: string
  shimmerDuration?: string
  children: React.ReactNode
}

const ShimmerButton = forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = '#c9a96e',
      background = '#1e1a14',
      borderRadius = '100px',
      shimmerDuration = '3s',
      className,
      children,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        style={
          {
            '--shimmer-color': shimmerColor,
            '--bg': background,
            '--radius': borderRadius,
            '--speed': shimmerDuration,
            borderRadius,
            ...style,
          } as React.CSSProperties
        }
        className={cn(
          'shimmer-button',
          'group relative flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap px-8 py-4 text-sm font-medium text-cream',
          'transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px hover:scale-105',
          className
        )}
        {...props}
      >
        {/* Spinning conic-gradient layer — the shimmer border */}
        <span
          className="shimmer-button__gradient"
          aria-hidden="true"
        />
        {/* Inner fill — covers the center, exposes only the border ring */}
        <span
          className="shimmer-button__inner"
          aria-hidden="true"
          style={{ borderRadius: `calc(${borderRadius} - 2px)` }}
        />
        {/* Content */}
        <span className="relative z-10">{children}</span>
      </button>
    )
  }
)
ShimmerButton.displayName = 'ShimmerButton'

export { ShimmerButton }

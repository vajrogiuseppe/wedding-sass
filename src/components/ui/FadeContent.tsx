import { useEffect, useRef, useState } from 'react'

interface FadeContentProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  blur?: boolean
  duration?: number
  easing?: string
  initialOpacity?: number
  delay?: number
  threshold?: number
  translateY?: number
}

const isMobile = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

export function FadeContent({
  children,
  className,
  style = {},
  blur = false,
  duration = 700,
  easing = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  initialOpacity = 0,
  delay = 0,
  threshold = 0.1,
  translateY = 28,
}: FadeContentProps) {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])

  // On mobile: opacity only — no blur, no translateY (both cause GPU/layout cost during scroll)
  const mobileStyle = {
    opacity: inView ? 1 : initialOpacity,
    transition: `opacity ${duration}ms ${easing} ${delay}ms`,
    willChange: 'opacity',
  }

  const desktopStyle = {
    opacity: inView ? 1 : initialOpacity,
    transform: inView ? 'translateY(0px)' : `translateY(${translateY}px)`,
    filter: blur ? (inView ? 'blur(0px)' : 'blur(10px)') : 'none',
    transition: [
      `opacity ${duration}ms ${easing} ${delay}ms`,
      `transform ${duration}ms ${easing} ${delay}ms`,
      blur ? `filter ${duration}ms ${easing} ${delay}ms` : '',
    ].filter(Boolean).join(', '),
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...(isMobile ? mobileStyle : desktopStyle), ...style }}
    >
      {children}
    </div>
  )
}

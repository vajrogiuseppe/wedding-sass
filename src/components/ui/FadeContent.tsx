import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface FadeContentProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export function FadeContent({ children, className, style }: FadeContentProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.65], [1, 0.95])
  const blur = useTransform(scrollYProgress, [0.25, 0.65], [0, 14])
  const filter = useTransform(blur, (v) => `blur(${v}px)`)

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale, filter, ...style }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

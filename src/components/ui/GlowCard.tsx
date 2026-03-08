import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { useRef, useState } from 'react'

interface GlowCardProps {
  className?: string
  children: React.ReactNode
}

export function GlowCard({ className, children }: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        'relative overflow-hidden rounded-2xl border border-gold/20 bg-white/60 p-6 backdrop-blur-sm transition-all duration-300',
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4, boxShadow: '0 20px 60px rgba(201, 169, 110, 0.15)' }}
    >
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300"
          style={{
            opacity: 1,
            background: `radial-gradient(200px circle at ${mousePos.x}px ${mousePos.y}px, rgba(201, 169, 110, 0.12), transparent 80%)`,
          }}
        />
      )}
      {children}
    </motion.div>
  )
}

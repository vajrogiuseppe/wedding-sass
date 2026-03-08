import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface FlowingMenuItem {
  label: string
  sub: string
  img?: string
  href?: string
  onClick?: () => void
}

interface FlowingMenuProps {
  items: FlowingMenuItem[]
  className?: string
}

export function FlowingMenu({ items, className }: FlowingMenuProps) {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <nav className={cn('relative w-full', className)}>
      <ul className="divide-y divide-zinc-800/50">
        {items.map((item, i) => (
          <li
            key={i}
            className="group relative overflow-hidden"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Hover background fill */}
            <motion.div
              className="absolute inset-0 bg-zinc-800/40"
              initial={{ x: '-100%' }}
              animate={{ x: hovered === i ? '0%' : '-100%' }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            />

            {/* Image reveal on hover */}
            {item.img && (
              <AnimatePresence>
                {hovered === i && (
                  <motion.div
                    key={`img-${i}`}
                    className="absolute right-12 top-1/2 -translate-y-1/2 w-24 h-16 md:w-40 md:h-28 rounded-xl overflow-hidden z-10"
                    initial={{ opacity: 0, scale: 0.85, y: '-40%' }}
                    animate={{ opacity: 1, scale: 1, y: '-50%' }}
                    exit={{ opacity: 0, scale: 0.85, y: '-40%' }}
                    transition={{ duration: 0.3 }}
                  >
                    <img src={item.img} alt={item.label} className="w-full h-full object-cover" />
                  </motion.div>
                )}
              </AnimatePresence>
            )}

            <button
              onClick={item.onClick}
              className="relative z-20 flex w-full items-center justify-between px-6 md:px-12 py-6 md:py-8"
            >
              <div className="flex items-baseline gap-4">
                {/* Number */}
                <span className="text-xs text-zinc-600 font-mono w-6">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {/* Label */}
                <motion.span
                  className="font-display text-3xl md:text-5xl font-semibold text-zinc-100"
                  animate={{ x: hovered === i ? 12 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  {item.label}
                </motion.span>
              </div>
              {/* Sub */}
              <motion.span
                className="hidden md:block text-sm text-zinc-500"
                animate={{ opacity: hovered === i ? 1 : 0.4, x: hovered === i ? 0 : 8 }}
                transition={{ duration: 0.3 }}
              >
                {item.sub}
              </motion.span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

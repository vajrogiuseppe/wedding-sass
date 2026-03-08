import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export interface CarouselItem {
  src: string
  alt: string
  title?: string
  subtitle?: string
}

interface GradientCarouselProps {
  items: CarouselItem[]
  autoPlayInterval?: number
}

// ── Color extraction ───────────────────────────────────────────────────────────
function extractDominantColor(img: HTMLImageElement): [number, number, number] {
  try {
    const cv = document.createElement('canvas')
    cv.width = 8; cv.height = 8
    const ctx = cv.getContext('2d')!
    ctx.drawImage(img, 0, 0, 8, 8)
    const data = ctx.getImageData(0, 0, 8, 8).data
    let r = 0, g = 0, b = 0
    for (let i = 0; i < data.length; i += 4) {
      r += data[i]; g += data[i + 1]; b += data[i + 2]
    }
    const px = data.length / 4
    return [Math.round(r / px), Math.round(g / px), Math.round(b / px)]
  } catch {
    return [16, 185, 129]
  }
}

// ── Card 3-D position ──────────────────────────────────────────────────────────
function getCardStyle(offset: number) {
  const abs = Math.abs(offset)
  const sign = Math.sign(offset)
  if (abs > 2) return { opacity: 0, pointerEvents: 'none' as const, zIndex: 0, x: 0, rotateY: 0, scale: 0.5 }
  return {
    x: sign * (abs === 0 ? 0 : abs === 1 ? 290 : 500),
    rotateY: sign * (abs === 0 ? 0 : abs === 1 ? 18 : 30),
    scale: abs === 0 ? 1 : abs === 1 ? 0.82 : 0.65,
    opacity: abs === 0 ? 1 : abs === 1 ? 0.68 : 0.35,
    zIndex: 10 - abs * 3,
    pointerEvents: abs === 0 ? 'auto' as const : 'none' as const,
  }
}

// ── Component ──────────────────────────────────────────────────────────────────
export function GradientCarousel({ items, autoPlayInterval = 4500 }: GradientCarouselProps) {
  const [active, setActive] = useState(0)
  const [bgColor, setBgColor] = useState<[number, number, number]>([16, 185, 129])

  // refs — no re-render side effects
  const activeRef = useRef(0)
  const colorsRef = useRef<Map<number, [number, number, number]>>(new Map())
  const autoRef = useRef<ReturnType<typeof setTimeout>>()

  const n = items.length

  // Keep activeRef in sync
  useEffect(() => { activeRef.current = active }, [active])

  const goTo = useCallback((idx: number) => {
    const next = ((idx % n) + n) % n
    setActive(next)
    activeRef.current = next
    const col = colorsRef.current.get(next)
    if (col) setBgColor(col)
  }, [n])

  // Auto-play
  useEffect(() => {
    clearTimeout(autoRef.current)
    autoRef.current = setTimeout(() => goTo(active + 1), autoPlayInterval)
    return () => clearTimeout(autoRef.current)
  }, [active, autoPlayInterval, goTo])

  // Called when an image loads — safe: no setState inside ref callback
  const handleLoad = useCallback((idx: number, img: HTMLImageElement) => {
    if (colorsRef.current.has(idx)) return
    const col = extractDominantColor(img)
    colorsRef.current.set(idx, col)
    if (activeRef.current === idx) setBgColor(col)
  }, [])

  const [r, g, b] = bgColor

  return (
    <div className="relative w-full overflow-hidden select-none">
      {/* Dynamic background — uses mask-image so background-color can transition */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundColor: `rgb(${r},${g},${b})`,
          opacity: 0.14,
          maskImage: 'radial-gradient(ellipse 80% 65% at 50% 65%, black 0%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 65% at 50% 65%, black 0%, transparent 100%)',
          transition: 'background-color 1.2s ease, opacity 1.2s ease',
        }}
      />

      {/* 3-D carousel */}
      <div
        className="relative mx-auto flex items-center justify-center"
        style={{ height: 480, perspective: '1100px' }}
      >
        {items.map((item, idx) => {
          const raw = idx - active
          const offset = ((raw + Math.floor(n / 2)) % n) - Math.floor(n / 2)
          const s = getCardStyle(offset)

          return (
            <motion.div
              key={item.src}
              className="absolute"
              animate={{ x: s.x, rotateY: s.rotateY, scale: s.scale, opacity: s.opacity, zIndex: s.zIndex }}
              transition={{ type: 'spring', stiffness: 280, damping: 32 }}
              style={{ transformStyle: 'preserve-3d', pointerEvents: s.pointerEvents }}
              onClick={() => offset !== 0 && goTo(idx)}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-2xl" style={{ width: 300, height: 400 }}>
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                  onLoad={(e) => handleLoad(idx, e.currentTarget)}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-5 pb-5 pt-12">
                  {item.title && <p className="text-zinc-50 font-semibold text-sm leading-snug">{item.title}</p>}
                  {item.subtitle && <p className="text-zinc-400 text-xs mt-0.5">{item.subtitle}</p>}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Controls */}
      <div className="relative z-20 flex items-center justify-center gap-5 mt-6 pb-4">
        <button
          onClick={() => goTo(active - 1)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200 transition-colors"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="flex items-center gap-2">
          {items.map((_, idx) => (
            <button key={idx} onClick={() => goTo(idx)}>
              <span
                className="block rounded-full transition-all duration-500"
                style={{
                  width: idx === active ? 22 : 5,
                  height: 5,
                  background: idx === active ? `rgb(${r},${g},${b})` : 'rgba(255,255,255,0.18)',
                }}
              />
            </button>
          ))}
        </div>

        <button
          onClick={() => goTo(active + 1)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200 transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}

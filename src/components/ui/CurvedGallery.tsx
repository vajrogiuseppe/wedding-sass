import { useEffect, useRef, useState } from 'react'

export interface CurvedGalleryItem {
  image: string
  text?: string
  title: string
  subtitle: string
  caption?: string
  demoUrl?: string
}

interface CurvedGalleryProps {
  items: CurvedGalleryItem[]
  bendPx?: number
  scrollSpeed?: number
  scrollEase?: number
  initialOffset?: number
}

const COPIES = 3

function getCardDims(containerW: number) {
  const mobile = containerW < 640
  const w = mobile ? Math.min(290, containerW * 0.76) : 340
  const h = mobile ? 370 : 440
  const gap = mobile ? 20 : 56
  return { w, h, gap, itemW: w + gap }
}

export function CurvedGallery({
  items,
  bendPx = 90,
  scrollSpeed = 1,
  scrollEase = 0.065,
  initialOffset = 0,
}: CurvedGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const scrollRef = useRef({ cur: 0, tgt: 0 })
  const dragRef = useRef({ active: false, startX: 0, startScroll: 0 })
  const rafRef = useRef(0)
  const dimsRef = useRef(getCardDims(900))
  const initRef = useRef(false)

  // For JSX re-render on resize
  const [dims, setDims] = useState(() => getCardDims(900))
  const allItems = Array.from({ length: COPIES }, () => items).flat()

  // ResizeObserver — update dims + re-init scroll on mobile/desktop switch
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      const cw = entry.contentRect.width
      const next = getCardDims(cw)
      const prev = dimsRef.current
      const changed = Math.abs(next.w - prev.w) > 1 || Math.abs(next.gap - prev.gap) > 1
      dimsRef.current = next
      if (changed) {
        // Re-init scroll to middle copy with new itemW
        const singleW = items.length * next.itemW
        scrollRef.current.cur = singleW - initialOffset
        scrollRef.current.tgt = singleW - initialOffset
        setDims({ ...next })
      }
    })
    ro.observe(el)
    // Init immediately
    const cw = el.clientWidth
    const d = getCardDims(cw)
    dimsRef.current = d
    const singleW = items.length * d.itemW
    scrollRef.current.cur = singleW - initialOffset
    scrollRef.current.tgt = singleW - initialOffset
    initRef.current = true
    setDims({ ...d })
    return () => ro.disconnect()
  }, [items, initialOffset])

  // Animation loop
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let running = true

    function frame() {
      if (!running || !el) return

      const s = scrollRef.current
      const d = dimsRef.current
      s.cur += (s.tgt - s.cur) * scrollEase

      const singleW = items.length * d.itemW
      if (s.cur > singleW * 2) { s.cur -= singleW; s.tgt -= singleW }
      if (s.cur < 0) { s.cur += singleW; s.tgt += singleW }

      const W = el.clientWidth
      const H = W / 2
      const B = Math.max(bendPx, 1)
      const R = (H * H + B * B) / (2 * B)

      cardRefs.current.forEach((card, i) => {
        if (!card) return
        const xFromCenter = i * d.itemW - s.cur + d.w / 2
        const transX = W / 2 - d.w / 2 + (xFromCenter - d.w / 2)
        const absX = Math.min(Math.abs(xFromCenter), H)
        const arc = R - Math.sqrt(Math.max(0, R * R - absX * absX))
        const sinVal = Math.min(absX / R, 0.9999)
        const rotZ = Math.sign(xFromCenter) * Math.asin(sinVal) * (180 / Math.PI)
        const distRatio = Math.abs(xFromCenter) / (H * 0.85)
        const opacity = Math.max(0.15, 1 - distRatio * 0.78)
        const scale = Math.max(0.72, 1 - distRatio * 0.14)
        card.style.transform = `translateX(${transX}px) translateY(${arc}px) rotateZ(${rotZ}deg) scale(${scale})`
        card.style.opacity = opacity.toFixed(3)
        // Keep card width in sync with current dims
        card.style.width = d.w + 'px'
      })

      rafRef.current = requestAnimationFrame(frame)
    }

    rafRef.current = requestAnimationFrame(frame)

    const onDown = (e: MouseEvent | TouchEvent) => {
      e.preventDefault()
      dragRef.current = {
        active: true,
        startX: 'touches' in e ? e.touches[0].clientX : e.clientX,
        startScroll: scrollRef.current.tgt,
      }
      el.style.cursor = 'grabbing'
    }
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragRef.current.active) return
      const x = 'touches' in e ? e.touches[0].clientX : e.clientX
      scrollRef.current.tgt = dragRef.current.startScroll + (dragRef.current.startX - x) * scrollSpeed
    }
    const onUp = () => { dragRef.current.active = false; el.style.cursor = 'grab' }
    const onWheel = (e: WheelEvent) => { scrollRef.current.tgt += e.deltaY * scrollSpeed * 0.6 }

    el.addEventListener('mousedown', onDown)
    el.addEventListener('touchstart', onDown as EventListener, { passive: false })
    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onMove as EventListener, { passive: true })
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchend', onUp)
    el.addEventListener('wheel', onWheel, { passive: true })

    return () => {
      running = false
      cancelAnimationFrame(rafRef.current)
      el.removeEventListener('mousedown', onDown)
      el.removeEventListener('touchstart', onDown as EventListener)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onMove as EventListener)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchend', onUp)
      el.removeEventListener('wheel', onWheel)
    }
  }, [items, bendPx, scrollSpeed, scrollEase])

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: dims.h + 140,
        overflow: 'hidden',
        cursor: 'grab',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        position: 'relative',
      }}
    >
      {allItems.map((item, i) => {
        const hasUrl = !!item.demoUrl
        return (
          <div
            key={i}
            ref={el => { cardRefs.current[i] = el }}
            style={{
              position: 'absolute',
              top: 24,
              left: 0,
              width: dims.w,
              height: dims.h,
              willChange: 'transform, opacity',
              transformOrigin: 'center top',
              borderRadius: 20,
              overflow: 'hidden',
              boxShadow: '0 20px 64px rgba(0,0,0,0.55)',
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              draggable={false}
              loading="lazy"
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'cover', display: 'block',
                pointerEvents: 'none',
              }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.08) 40%, rgba(0,0,0,0.82) 100%)',
            }} />

            {/* Top badge */}
            <div style={{
              position: 'absolute', top: 16, left: 16,
              borderRadius: 9999,
              background: 'rgba(201,169,110,0.18)',
              border: '1px solid rgba(201,169,110,0.45)',
              padding: '5px 12px',
              fontSize: 10, fontWeight: 700,
              color: '#e8c97a',
              letterSpacing: '0.13em',
              textTransform: 'uppercase',
              backdropFilter: 'blur(8px)',
            }}>
              {item.subtitle}
            </div>

            {/* Bottom content */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 20px 22px' }}>
              <h3 style={{
                fontSize: dims.w < 300 ? 18 : 22,
                fontWeight: 600, color: '#f5f0e8',
                margin: '0 0 4px', lineHeight: 1.2,
                fontFamily: 'Fraunces, serif',
                textShadow: '0 2px 8px rgba(0,0,0,0.4)',
              }}>
                {item.title}
              </h3>
              {item.caption && (
                <p style={{ fontSize: 11, color: 'rgba(245,240,232,0.5)', margin: '0 0 14px', lineHeight: 1.4 }}>
                  {item.caption}
                </p>
              )}
              {hasUrl ? (
                <a
                  href={item.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseDown={e => e.stopPropagation()}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    borderRadius: 9999, background: '#c9a96e', color: '#0e0c0a',
                    fontSize: 12, fontWeight: 700, padding: '8px 18px',
                    textDecoration: 'none', letterSpacing: '0.03em',
                    boxShadow: '0 4px 16px rgba(201,169,110,0.35)',
                  }}
                >
                  Guarda Demo →
                </a>
              ) : (
                <span style={{
                  display: 'inline-flex', borderRadius: 9999,
                  background: 'rgba(201,169,110,0.1)',
                  border: '1px solid rgba(201,169,110,0.28)',
                  color: 'rgba(201,169,110,0.5)',
                  fontSize: 12, fontWeight: 600, padding: '7px 14px',
                }}>
                  Prossimamente
                </span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default CurvedGallery

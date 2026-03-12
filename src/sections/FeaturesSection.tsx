import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import ProfileCard from '@/components/ui/ProfileCard'
import GradienText from '@/components/ui/GradienText'
import { FadeContent } from '@/components/ui/FadeContent'

const glowShapes = [
  { top: '3%', left: '1%', w: 540, c: 'rgba(210,60,170,0.28)', dur: 9 },
  { top: '38%', right: '0%', w: 480, c: 'rgba(180,100,0,0.32)', dur: 11 },
  { top: '-8%', left: '36%', w: 420, c: 'rgba(130,40,220,0.25)', dur: 8 },
]

const showcaseItems = [
  {
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    name: 'Giuseppe & Maria',
    title: 'Moderno Premium',
    status: '28 Giu 2027 · 124 ospiti',
    demoUrl: 'https://giuseppevajro.it/invito/',
    behindGlowColor: 'hsla(280, 80%, 65%, 0.55)',
    innerGradient: 'linear-gradient(145deg, hsla(280, 60%, 30%, 0.6) 0%, hsla(320, 70%, 60%, 0.25) 100%)',
  },
  {
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80',
    name: 'Anna & Luca',
    title: 'Boho Romantico',
    status: '7 Set 2025 · 86 ospiti',
    demoUrl: '',
    behindGlowColor: 'hsla(35, 90%, 60%, 0.5)',
    innerGradient: 'linear-gradient(145deg, hsla(30, 60%, 25%, 0.6) 0%, hsla(45, 80%, 55%, 0.2) 100%)',
  },
  {
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
    name: 'Giulia & Francesco',
    title: 'Rustico Toscano',
    status: '23 Mag 2025 · 210 ospiti',
    demoUrl: '',
    behindGlowColor: 'hsla(15, 70%, 55%, 0.5)',
    innerGradient: 'linear-gradient(145deg, hsla(20, 50%, 22%, 0.65) 0%, hsla(35, 60%, 50%, 0.22) 100%)',
  },
  {
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80',
    name: 'Martina & Roberto',
    title: 'Minimal Moderno',
    status: '12 Lug 2025 · 68 ospiti',
    demoUrl: '',
    behindGlowColor: 'hsla(220, 80%, 65%, 0.5)',
    innerGradient: 'linear-gradient(145deg, hsla(220, 60%, 20%, 0.65) 0%, hsla(240, 70%, 60%, 0.22) 100%)',
  },
  {
    image: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80',
    name: 'Chiara & Davide',
    title: 'Grandioso Storico',
    status: '4 Ott 2025 · 180 ospiti',
    demoUrl: '',
    behindGlowColor: 'hsla(355, 80%, 65%, 0.55)',
    innerGradient: 'linear-gradient(145deg, hsla(350, 55%, 22%, 0.65) 0%, hsla(15, 70%, 55%, 0.22) 100%)',
  },
  {
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80',
    name: 'Laura & Andrea',
    title: 'Giardino Segreto',
    status: '28 Ago 2025 · 95 ospiti',
    demoUrl: '',
    behindGlowColor: 'hsla(140, 60%, 55%, 0.45)',
    innerGradient: 'linear-gradient(145deg, hsla(140, 40%, 18%, 0.65) 0%, hsla(160, 60%, 45%, 0.22) 100%)',
  },
]

const CARD_W = 300
const CARD_GAP = 24
const ITEM_W = CARD_W + CARD_GAP
const AUTO_SPEED = 0.5 // px per frame
const SCROLL_EASE = 0.08

// Duplicate for seamless loop
const allItems = [...showcaseItems, ...showcaseItems, ...showcaseItems]

export function FeaturesSection() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const stateRef = useRef({ x: 0, targetX: 0, dragging: false, startX: 0, startScroll: 0, velocity: 0, lastX: 0 })
  const rafRef = useRef(0)

  // RAF animation loop
  useEffect(() => {
    const singleW = showcaseItems.length * ITEM_W
    stateRef.current.x = singleW
    stateRef.current.targetX = singleW

    const frame = () => {
      const s = stateRef.current
      const track = trackRef.current
      if (!track) { rafRef.current = requestAnimationFrame(frame); return }

      if (!s.dragging) {
        s.targetX += AUTO_SPEED
      }

      s.x += (s.targetX - s.x) * SCROLL_EASE

      const sW = showcaseItems.length * ITEM_W
      if (s.x > sW * 2) { s.x -= sW; s.targetX -= sW }
      if (s.x < 0)       { s.x += sW; s.targetX += sW }

      track.style.transform = `translateX(${-s.x}px)`
      rafRef.current = requestAnimationFrame(frame)
    }

    rafRef.current = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  // Pointer-based drag with capture — prevents conflict with ProfileCard tilt
  useEffect(() => {
    const wrap = wrapRef.current
    const track = trackRef.current
    if (!wrap || !track) return
    const s = stateRef.current

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return
      e.preventDefault()
      wrap.setPointerCapture(e.pointerId)
      s.dragging = true
      s.startX = e.clientX
      s.lastX = e.clientX
      s.startScroll = s.targetX
      s.velocity = 0
      track.style.cursor = 'grabbing'
      // Block ProfileCard tilt while dragging
      track.classList.add('is-dragging')
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!s.dragging) return
      s.velocity = e.clientX - s.lastX
      s.lastX = e.clientX
      s.targetX = s.startScroll - (e.clientX - s.startX)
    }

    const onPointerUp = () => {
      if (!s.dragging) return
      s.dragging = false
      // Apply momentum
      s.targetX -= s.velocity * 4
      track.style.cursor = 'grab'
      track.classList.remove('is-dragging')
    }

    const onWheel = (e: WheelEvent) => {
      s.targetX += e.deltaX !== 0 ? e.deltaX * 0.8 : e.deltaY * 0.6
    }

    wrap.addEventListener('pointerdown', onPointerDown)
    wrap.addEventListener('pointermove', onPointerMove)
    wrap.addEventListener('pointerup', onPointerUp)
    wrap.addEventListener('pointercancel', onPointerUp)
    wrap.addEventListener('wheel', onWheel, { passive: true })

    return () => {
      wrap.removeEventListener('pointerdown', onPointerDown)
      wrap.removeEventListener('pointermove', onPointerMove)
      wrap.removeEventListener('pointerup', onPointerUp)
      wrap.removeEventListener('pointercancel', onPointerUp)
      wrap.removeEventListener('wheel', onWheel)
    }
  }, [])

  return (
    <section
      id="showcase"
      style={{ position: 'relative', background: 'transparent', paddingTop: 100, overflow: 'hidden' }}
    >
      {/* Floating glow shapes */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {glowShapes.map((g, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -20, 0], scale: [1, 1.06, 1] }}
            transition={{ duration: g.dur, repeat: Infinity, ease: 'easeInOut', delay: i * 2 }}
            style={{
              position: 'absolute',
              top: g.top,
              left: (g as any).left,
              right: (g as any).right,
              width: g.w,
              height: g.w,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${g.c} 0%, transparent 68%)`,
              filter: 'blur(55px)',
            }}
          />
        ))}
      </div>

      {/* Header */}
      <FadeContent blur duration={800} style={{ textAlign: 'center', padding: '0 24px', marginBottom: 48 }}>
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            display: 'inline-block', borderRadius: 9999,
            border: '1px solid rgba(201,169,110,0.3)', background: 'rgba(201,169,110,0.08)',
            padding: '6px 16px', fontSize: 11, fontWeight: 600, color: '#c9a96e',
            letterSpacing: '0.15em', textTransform: 'uppercase' as const, marginBottom: 20,
          }}
        >
          Showcase
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display"
          style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: 600, color: '#f5f0e8', lineHeight: 1.1, marginBottom: 12 }}
        >
          Inviti che lasciano
          <br />
          <GradienText colors={['#faf6f0', '#f79adb', '#cf8300']}>
            <span style={{ fontStyle: 'italic' }}>il segno.</span>
          </GradienText>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: 15, color: 'rgba(245,240,232,0.45)' }}
        >
          Trascina per esplorare. Ogni template è completamente personalizzabile.
        </motion.p>
      </FadeContent>

      {/* Carousel — clip only horizontally so the behind-glow is not cut */}
      <div
        ref={wrapRef}
        style={{ overflowX: 'clip', overflowY: 'visible', padding: '40px 0 56px', touchAction: 'pan-y' }}
      >
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            gap: CARD_GAP,
            width: 'max-content',
            cursor: 'grab',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            willChange: 'transform',
          }}
        >
          {allItems.map((item, i) => (
            <div key={i} style={{ flexShrink: 0 }}>
              <ProfileCard
                avatarUrl={item.image}
                name={item.name}
                title={item.title}
                status={item.status}
                handle={item.name}
                contactText={item.demoUrl ? 'Guarda Demo' : ''}
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                behindGlowEnabled={true}
                behindGlowColor={item.behindGlowColor}
                innerGradient={item.innerGradient}
                onContactClick={item.demoUrl ? () => window.open(item.demoUrl, '_blank') : undefined}
              />
            </div>
          ))}
        </div>
      </div>

      <div style={{ paddingBottom: 40 }} />
    </section>
  )
}

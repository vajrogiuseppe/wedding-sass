import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'
import { Calendar, Users, Image, Play, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'

// ── Easy-to-edit showcase items ───────────────────────────────────────────────
// media.type   → 'image' | 'video'
// media.src    → URL immagine (Unsplash ecc.) oppure URL embed video (YouTube/Vimeo)
// mediaHeight  → altezza area media in px (default 340)
// demoUrl      → link "Guarda Demo" — lascia '' per nascondere il bottone

const showcaseItems = [
  {
    title: 'Giuseppe & Maria',
    date: '28 Giugno 2027',
    guests: 124,
    style: 'Moderno Premium',
    mediaHeight: 450,
    demoUrl: 'https://giuseppevajro.it/invito/',
    media: { type: 'image' as const, src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80' },
  },
  {
    title: 'Anna & Luca',
    date: '7 Settembre 2025',
    guests: 86,
    style: 'Boho Romantico',
    mediaHeight: 450,
    demoUrl: '',
    media: { type: 'image' as const, src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80' },
  },
  {
    title: 'Giulia & Francesco',
    date: '23 Maggio 2025',
    guests: 210,
    style: 'Rustico Toscano',
    mediaHeight: 450,
    demoUrl: '',
    media: { type: 'image' as const, src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80' },
  },
  {
    title: 'Martina & Roberto',
    date: '12 Luglio 2025',
    guests: 68,
    style: 'Minimal Moderno',
    mediaHeight: 450,
    demoUrl: '',
    media: { type: 'image' as const, src: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&q=80' },
  },
  {
    title: 'Chiara & Davide',
    date: '4 Ottobre 2025',
    guests: 180,
    style: 'Grandioso Storico',
    mediaHeight: 450,
    demoUrl: '',
    media: { type: 'image' as const, src: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&q=80' },
  },
  {
    title: 'Laura & Andrea',
    date: '28 Agosto 2025',
    guests: 95,
    style: 'Giardino Segreto',
    mediaHeight: 450,
    demoUrl: '#',
    media: { type: 'image' as const, src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80' },
  },
]

type Item = typeof showcaseItems[0]


function ShowcaseCard({ item }: { item: Item }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const mediaH = item.mediaHeight ?? 340

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const cx = (e.clientX - rect.left) / rect.width - 0.5
    const cy = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: cy * -14, y: cx * 14 })
  }, [])

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        width: 350,
        height: 500,
        flexShrink: 0,
        borderRadius: 20,
        overflow: 'hidden',
        border: '1px solid #e0d8cc',
        background: '#ffffff',
        cursor: 'inherit',
        userSelect: 'none',
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${tilt.x !== 0 || tilt.y !== 0 ? 1.02 : 1})`,
        transition: 'transform 0.15s ease-out, box-shadow 0.2s',
        boxShadow: tilt.x !== 0 || tilt.y !== 0
          ? '0 12px 40px rgba(30,26,20,0.15), 0 0 0 1px rgba(201,169,110,0.3)'
          : '0 2px 12px rgba(30,26,20,0.07)',
        transformStyle: 'preserve-3d',
        position: 'relative',
      }}
    >
      {/* Media area */}
      <div style={{ position: 'relative', height: mediaH, background: '#f0ebe0', overflow: 'hidden' }}>
        {item.media.type === 'image' ? (
          <img
            src={item.media.src}
            alt={item.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            loading="lazy"
            draggable={false}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1a1510' }}>
            <Play size={36} color="#c9a96e" />
          </div>
        )}

        {/* Media type badge */}
        <div style={{
          position: 'absolute', top: 12, left: 12, width: 28, height: 28, borderRadius: 8,
          background: 'rgba(255,252,248,0.9)', backdropFilter: 'blur(6px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {(item.media.type as string) === 'video' ? <Play size={12} color="#a07838" /> : <Image size={12} color="#a07838" />}
        </div>

        {/* Bottom overlay */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: 'linear-gradient(to top, rgba(28,27,26,0.97) 0%, transparent 100%)',
          padding: '32px 16px 14px',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 10,
        }}>
          <div>
            <h3 className="font-display" style={{ fontSize: 18, fontWeight: 600, color: '#fff', lineHeight: 1.1, marginBottom: 4 }}>
              {item.title}
            </h3>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'rgba(255,255,255,0.75)' }}>
                <Users size={10} /> {item.guests} ospiti
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'rgba(255,255,255,0.75)' }}>
                <Calendar size={10} /> {item.date}
              </span>
            </div>
          </div>
          {item.demoUrl && (
            <a
              href={item.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flexShrink: 0,
                display: 'flex', alignItems: 'center', gap: 5,
                borderRadius: 9999, background: '#c9a96e',
                padding: '8px 16px', fontSize: 12, fontWeight: 700,
                color: '#fff', textDecoration: 'none',
                boxShadow: '0 2px 12px rgba(201,169,110,0.4)',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#a07838')}
              onMouseLeave={e => (e.currentTarget.style.background = '#c9a96e')}
            >
              Guarda Demo <ExternalLink size={11} />
            </a>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#c9a96e', letterSpacing: '0.06em' }}>
          {item.style}
        </span>
        <div style={{ display: 'flex', gap: 4 }}>
          {[1, 2, 3].map(n => (
            <div key={n} style={{ width: 6, height: 6, borderRadius: '50%', background: n === 1 ? '#c9a96e' : '#e0d8cc' }} />
          ))}
        </div>
      </div>
    </div>
  )
}

const CARD_STEP = 240 + 20 // card width + gap

export function FeaturesSection() {
  const x = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [fadeH, setFadeH] = useState(390)

  useEffect(() => {
    if (containerRef.current) setFadeH(containerRef.current.offsetHeight)
  }, [])

  const getMinX = () => {
    if (!containerRef.current || !trackRef.current) return 0
    return -(trackRef.current.scrollWidth - containerRef.current.clientWidth)
  }

  const scrollPrev = () =>
    animate(x, Math.min(x.get() + CARD_STEP * 3, 0), { type: 'spring', stiffness: 300, damping: 30 })
  const scrollNext = () =>
    animate(x, Math.max(x.get() - CARD_STEP * 3, getMinX()), { type: 'spring', stiffness: 300, damping: 30 })

  return (
    <section id="showcase" style={{ padding: '100px 0', background: '#faf7f2', overflow: 'hidden' }}>
      {/* Header */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-14">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            display: 'inline-block',
            borderRadius: 9999,
            border: '1px solid rgba(201,169,110,0.3)',
            background: 'rgba(201,169,110,0.08)',
            padding: '6px 16px',
            fontSize: 11,
            fontWeight: 600,
            color: '#c9a96e',
            letterSpacing: '0.15em',
            textTransform: 'uppercase' as const,
            marginBottom: 16,
          }}
        >
          Showcase
        </motion.span>
        <div className="flex items-end justify-between gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display"
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
              fontWeight: 600,
              color: '#1e1a14',
              lineHeight: 1.1,
            }}
          >
            Inviti che lasciano
            <br />
            <span className="text-gradient-gold">il segno</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ fontSize: 13, color: '#5a5248', maxWidth: 180, textAlign: 'right', flexShrink: 0 }}
          >
            Trascina per esplorare
          </motion.p>
        </div>
      </div>

      {/* Draggable track */}
      <div ref={containerRef} className="cursor-drag" style={{ overflow: 'hidden' }}>
        <motion.div
          ref={trackRef}
          drag="x"
          dragConstraints={containerRef}
          dragElastic={0.08}
          style={{
            display: 'flex',
            gap: 20,
            paddingLeft: 'clamp(16px, 4vw, 48px)',
            paddingRight: 'clamp(16px, 4vw, 48px)',
            width: 'max-content',
            touchAction: 'pan-y',
            x,
          }}
        >
          {showcaseItems.map((item, i) => (
            <ShowcaseCard key={i} item={item} />
          ))}
        </motion.div>
      </div>

      {/* Edge fades */}
      <div
        style={{
          position: 'relative',
          pointerEvents: 'none',
          marginTop: -fadeH,
          height: fadeH,
          background:
            'linear-gradient(to right, #faf7f2 0%, transparent 80px, transparent calc(100% - 80px), #faf7f2 100%)',
        }}
      />

      {/* Navigation arrows */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 28 }}>
        <button
          onClick={scrollPrev}
          style={{
            width: 44, height: 44, borderRadius: '50%',
            border: '1px solid #e0d8cc', background: '#ffffff',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#7a6f63', transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#c9a96e'; e.currentTarget.style.color = '#a07838' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#e0d8cc'; e.currentTarget.style.color = '#7a6f63' }}
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={scrollNext}
          style={{
            width: 44, height: 44, borderRadius: '50%',
            border: 'none', background: '#c9a96e',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#ffffff', transition: 'background 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#a07838' }}
          onMouseLeave={e => { e.currentTarget.style.background = '#c9a96e' }}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  )
}

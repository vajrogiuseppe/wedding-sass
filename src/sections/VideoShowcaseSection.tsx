import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion'
import { X, Play, ChevronLeft, ChevronRight } from 'lucide-react'

// ── Easy-to-edit reel items ───────────────────────────────────────────────────
// embedUrl: URL iframe del reel (Instagram, TikTok, YouTube Shorts, ecc.)
//   Instagram: https://www.instagram.com/p/SHORTCODE/embed/
//   TikTok:    https://www.tiktok.com/embed/v2/VIDEO_ID
//   YouTube:   https://www.youtube.com/embed/VIDEO_ID
// thumbnail: immagine di anteprima mostrata nella card
const reels = [
  {
    username: '@sofia_marco_2025',
    caption: 'Il nostro invito digitale ha fatto impazzire tutti gli ospiti! 🤍',
    thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&q=85',
    embedUrl: 'https://www.youtube.com/embed/XqZsoesa55w?autoplay=1&rel=0',
  },
  {
    username: '@anna_luca_wedding',
    caption: 'Finalmente un invito che si apre sul telefono in un secondo ✨',
    thumbnail: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=500&q=85',
    embedUrl: 'https://www.youtube.com/embed/2Vv-BfVoq4g?autoplay=1&rel=0',
  },
  {
    username: '@giulia_e_fran',
    caption: 'Abbiamo ricevuto 180 conferme in 3 giorni 🥹 inviti.studio è pazzesco',
    thumbnail: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=500&q=85',
    embedUrl: 'https://www.youtube.com/embed/rtOvBOTyX00?autoplay=1&rel=0',
  },
  {
    username: '@chiara_davide_23',
    caption: 'La dashboard RSVP è una meraviglia! Setup in 10 minuti 💛',
    thumbnail: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=500&q=85',
    embedUrl: 'https://www.youtube.com/embed/AkNjGZHcMOE?autoplay=1&rel=0',
  },
  {
    username: '@martina_roberto',
    caption: "Tutti ci chiedono come abbiamo fatto l'invito! Il segreto è inviti.studio",
    thumbnail: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=500&q=85',
    embedUrl: 'https://www.youtube.com/embed/kXYiU_JCYtU?autoplay=1&rel=0',
  },
  {
    username: '@laura_andrea_ws',
    caption: 'Link condiviso la mattina, 50 conferme entro sera. Magico! 🌿',
    thumbnail: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=500&q=85',
    embedUrl: 'https://www.youtube.com/embed/450p7goxZqg?autoplay=1&rel=0',
  },
]

// ── Layout config — modifica qui per cambiare dimensioni ─────────────────────
const REEL_CARD_WIDTH = 350   // larghezza card in px
const REEL_CARD_HEIGHT = Math.round(REEL_CARD_WIDTH * 16 / 9) + 24 // 9:16 + offset stagger max
// ─────────────────────────────────────────────────────────────────────────────

const REEL_STEP = REEL_CARD_WIDTH + 16 // card width + gap

type Reel = typeof reels[0]

// ── Card ──────────────────────────────────────────────────────────────────────
function ReelCard({ item, onOpen }: { item: Reel; onOpen: () => void }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const cx = (e.clientX - rect.left) / rect.width - 0.5
    const cy = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: cy * -12, y: cx * 12 })
  }, [])

  return (
    <div
      onClick={onOpen}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false) }}
      style={{
        width: REEL_CARD_WIDTH,
        flexShrink: 0,
        borderRadius: 18,
        overflow: 'hidden',
        border: '1px solid rgba(201,169,110,0.25)',
        background: '#1a1510',
        cursor: 'inherit',
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.03 : 1})`,
        transition: 'transform 0.15s ease-out, box-shadow 0.2s',
        boxShadow: hovered
          ? '0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,169,110,0.35)'
          : '0 4px 16px rgba(0,0,0,0.3)',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Thumbnail 9:16 */}
      <div style={{ position: 'relative', aspectRatio: '9/16', overflow: 'hidden', background: '#0e0c0a' }}>
        <img
          src={item.thumbnail}
          alt={item.username}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          loading="lazy"
          draggable={false}
        />

        {/* Gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, transparent 40%, rgba(0,0,0,0.8) 100%)',
          pointerEvents: 'none',
        }} />

        {/* Play button */}
        <motion.div
          animate={{ scale: hovered ? 1 : 0.85, opacity: hovered ? 1 : 0.7 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 44, height: 44, borderRadius: '50%',
            background: 'rgba(201,169,110,0.9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
          }}
        >
          <Play size={18} color="#fff" fill="#fff" style={{ marginLeft: 2 }} />
        </motion.div>

        {/* Caption */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 12px 14px' }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#c9a96e', marginBottom: 3 }}>
            {item.username}
          </div>
          <p style={{
            fontSize: 10, color: '#d4c4b0', lineHeight: 1.5, margin: 0,
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>
            {item.caption}
          </p>
        </div>
      </div>
    </div>
  )
}

// ── Modal con iframe ──────────────────────────────────────────────────────────
function ReelModal({ item, onClose, onPrev, onNext, hasPrev, hasNext }: {
  item: Reel
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  hasPrev: boolean
  hasNext: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(6,5,4,0.92)', backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24, gap: 20,
      }}
    >
      {/* Prev arrow */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        disabled={!hasPrev}
        style={{
          width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
          border: '1px solid rgba(201,169,110,0.3)', background: 'rgba(201,169,110,0.08)',
          cursor: hasPrev ? 'pointer' : 'default', opacity: hasPrev ? 1 : 0.3,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#c9a96e', transition: 'all 0.2s',
        }}
        onMouseEnter={e => { if (hasPrev) e.currentTarget.style.background = 'rgba(201,169,110,0.18)' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(201,169,110,0.08)' }}
      >
        <ChevronLeft size={20} />
      </button>

      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 24 }}
        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 340,
          borderRadius: 22,
          overflow: 'hidden',
          boxShadow: '0 40px 100px rgba(0,0,0,0.8)',
          border: '1px solid rgba(201,169,110,0.3)',
          background: '#0e0c0a',
          aspectRatio: '9/16',
        }}
      >
        <iframe
          src={item.embedUrl}
          allow="autoplay; fullscreen; clipboard-write; encrypted-media; picture-in-picture"
          allowFullScreen
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
          title={item.username}
        />
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 14, right: 14,
            width: 34, height: 34, borderRadius: '50%',
            background: 'rgba(14,12,10,0.75)', backdropFilter: 'blur(6px)',
            border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 10,
          }}
        >
          <X size={16} color="#f5f0e8" />
        </button>
      </motion.div>

      {/* Next arrow */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext() }}
        disabled={!hasNext}
        style={{
          width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
          border: 'none', background: hasNext ? '#c9a96e' : 'rgba(201,169,110,0.15)',
          cursor: hasNext ? 'pointer' : 'default', opacity: hasNext ? 1 : 0.3,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#ffffff', transition: 'background 0.2s',
        }}
        onMouseEnter={e => { if (hasNext) e.currentTarget.style.background = '#a07838' }}
        onMouseLeave={e => { e.currentTarget.style.background = hasNext ? '#c9a96e' : 'rgba(201,169,110,0.15)' }}
      >
        <ChevronRight size={20} />
      </button>
    </motion.div>
  )
}

// ── Sezione ───────────────────────────────────────────────────────────────────
export function VideoShowcaseSection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const x = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const getMinX = () => {
    if (!containerRef.current || !trackRef.current) return 0
    return -(trackRef.current.scrollWidth - containerRef.current.clientWidth)
  }

  const scrollPrev = () =>
    animate(x, Math.min(x.get() + REEL_STEP * 2, 0), { type: 'spring', stiffness: 300, damping: 30 })
  const scrollNext = () =>
    animate(x, Math.max(x.get() - REEL_STEP * 2, getMinX()), { type: 'spring', stiffness: 300, damping: 30 })

  return (
    <section style={{ padding: 'clamp(64px, 8vw, 100px) 0', background: '#0e0c0a', overflow: 'hidden' }}>
      {/* Header */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-12">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            display: 'inline-block', borderRadius: 9999,
            border: '1px solid rgba(201,169,110,0.3)', background: 'rgba(201,169,110,0.08)',
            padding: '6px 16px', fontSize: 11, fontWeight: 600, color: '#c9a96e',
            letterSpacing: '0.15em', textTransform: 'uppercase' as const, marginBottom: 16,
          }}
        >
          Clienti reali
        </motion.span>
        <div className="flex items-end justify-between gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: 600, color: '#f5f0e8', lineHeight: 1.1 }}
          >
            Chi lo ha usato
            <br />
            <span className="text-gradient-gold">ne parla così</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ fontSize: 13, color: '#5a5248', maxWidth: 180, textAlign: 'right', flexShrink: 0 }}
          >
            Clicca per guardare
          </motion.p>
        </div>
      </div>

      {/* Draggable carousel */}
      <div ref={containerRef} className="cursor-drag" style={{ overflow: 'hidden' }}>
        <motion.div
          ref={trackRef}
          drag="x"
          dragConstraints={containerRef}
          dragElastic={0.08}
          onDragStart={() => { isDragging.current = true }}
          onDragEnd={() => { requestAnimationFrame(() => { isDragging.current = false }) }}
          style={{
            display: 'flex',
            gap: 16,
            paddingLeft: 'clamp(16px, 4vw, 48px)',
            paddingRight: 'clamp(16px, 4vw, 48px)',
            width: 'max-content',
            touchAction: 'pan-y',
            alignItems: 'flex-end',
            x,
          }}
        >
          {reels.map((item, i) => (
            <div key={i} style={{ marginTop: i % 3 === 1 ? 24 : i % 3 === 2 ? 12 : 0 }}>
              <ReelCard item={item} onOpen={() => { if (!isDragging.current) setSelectedIndex(i) }} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Edge fades */}
      <div style={{
        position: 'relative', pointerEvents: 'none',
        marginTop: -REEL_CARD_HEIGHT, height: REEL_CARD_HEIGHT,
        background: 'linear-gradient(to right, #0e0c0a 0%, transparent 80px, transparent calc(100% - 80px), #0e0c0a 100%)',
      }} />

      {/* Navigation arrows */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 28 }}>
        <button
          onClick={scrollPrev}
          style={{
            width: 44, height: 44, borderRadius: '50%',
            border: '1px solid rgba(201,169,110,0.3)', background: 'rgba(201,169,110,0.08)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#c9a96e', transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,169,110,0.18)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(201,169,110,0.08)' }}
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

      {/* Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <ReelModal
            item={reels[selectedIndex]}
            onClose={() => setSelectedIndex(null)}
            onPrev={() => setSelectedIndex(i => i !== null ? Math.max(0, i - 1) : null)}
            onNext={() => setSelectedIndex(i => i !== null ? Math.min(reels.length - 1, i + 1) : null)}
            hasPrev={selectedIndex > 0}
            hasNext={selectedIndex < reels.length - 1}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

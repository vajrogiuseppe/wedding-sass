import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { ArrowRight, MapPin, Clock, Heart } from 'lucide-react'

// ─── Layout constants ──────────────────────────────────────────────────────────
const HERO_H  = 720
const SEC_H   = 800
const FOOT_H  = 360
const TOTAL_H = HERO_H + SEC_H * 4 + FOOT_H  // 4280

// ─── SVG coordinate space ──────────────────────────────────────────────────────
// preserveAspectRatio="none" → x coords map linearly to actual page width %
const VW   = 1000
const CX   = 500   // 50% — center
const LX   = 110   // 11% — left apex
const RX   = 890   // 89% — right apex
const CTRL = 240   // bezier control arm

const DIRS  = [LX, RX, LX, RX]
const apexY = (i: number) => HERO_H + i * SEC_H + SEC_H / 2

function buildPath(): string {
  let d = `M ${CX},0 L ${CX},${HERO_H}`
  DIRS.forEach((ax, i) => {
    const y0 = HERO_H + i * SEC_H
    const ym = apexY(i)
    const y1 = y0 + SEC_H
    d += ` C ${CX},${y0 + CTRL} ${ax},${y0 + CTRL} ${ax},${ym}`
    d += ` C ${ax},${y1 - CTRL} ${CX},${y1 - CTRL} ${CX},${y1}`
  })
  d += ` L ${CX},${TOTAL_H}`
  return d
}

const PATH_D = buildPath()

// ─── Mobile SVG path ───────────────────────────────────────────────────────────
function buildMobilePath(w: number, h: number): string {
  const cx = w / 2, lx = w * 0.18, rx = w * 0.82
  const heroH = h * 0.15
  const secH = (h * 0.78) / 4
  const dirs = [lx, rx, lx, rx]
  let d = `M ${cx},0 L ${cx},${heroH}`
  dirs.forEach((ax, i) => {
    const y0 = heroH + i * secH
    const ym = y0 + secH / 2
    const y1 = y0 + secH
    const ctrl = secH * 0.3
    d += ` C ${cx},${y0 + ctrl} ${ax},${y0 + ctrl} ${ax},${ym}`
    d += ` C ${ax},${y1 - ctrl} ${cx},${y1 - ctrl} ${cx},${y1}`
  })
  d += ` L ${cx},${h}`
  return d
}

// ─── Responsive hook ───────────────────────────────────────────────────────────
function useIsDesktop() {
  const [v, setV] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 900 : true
  )
  useEffect(() => {
    const fn = () => setV(window.innerWidth >= 900)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])
  return v
}

// ─── Section data ──────────────────────────────────────────────────────────────
interface Section {
  badge: string
  title: string
  subtitle: string
  desc: string
  img: string
  extraImgs?: string[]
  dir: 'left' | 'right'
  isRSVP?: boolean
  icon: 'clock' | 'map' | 'heart'
}

const sections: Section[] = [
  {
    badge: 'Cerimonia',
    title: 'Chiesa di\nSanta Maria Novella',
    subtitle: '14 Giugno 2026  ·  ore 16:00',
    desc: 'Piazza di Santa Maria Novella, Firenze\n\nVi aspettiamo per celebrare insieme il momento più emozionante della nostra vita.',
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=85',
    dir: 'left',
    icon: 'clock',
  },
  {
    badge: 'Ricevimento',
    title: 'Villa Carminati',
    subtitle: 'ore 18:30  ·  Greve in Chianti',
    desc: 'Via del Pino 12, Greve in Chianti (FI)\n\nCena, musica e balli nel cuore della campagna toscana. Una serata che non dimenticherete.',
    img: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=85',
    dir: 'right',
    icon: 'map',
  },
  {
    badge: 'La nostra storia',
    title: 'Quattro anni\ninsieme',
    subtitle: 'Dal 2022  ·  Per sempre',
    desc: 'Ogni istante vissuto insieme ci ha portato qui, a questo giorno meraviglioso. Grazie per essere parte del nostro viaggio.',
    img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=85',
    extraImgs: [
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&q=80',
      'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=400&q=80',
    ],
    dir: 'left',
    icon: 'heart',
  },
  {
    badge: 'RSVP',
    title: 'Conferma la\ntua presenza',
    subtitle: 'Entro il 1 Maggio 2026',
    desc: 'Comunicaci la tua presenza e le eventuali esigenze alimentari.\nSiamo felici di averti con noi.',
    img: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=85',
    dir: 'right',
    icon: 'heart',
    isRSVP: true,
  },
]

// ─── Decorative: Leaf SVG ──────────────────────────────────────────────────────
interface LeafProps {
  x: string | number; y: number
  rotate?: number; size?: number; opacity?: number; delay?: number
  variant?: 1 | 2 | 3
}

function Leaf({ x, y, rotate = 0, size = 70, opacity = 0.15, delay = 0, variant = 1 }: LeafProps) {
  const paths: Record<number, string> = {
    1: 'M30,2 C50,8 62,30 58,55 C54,72 42,84 30,90 C18,84 6,72 2,55 C-2,30 10,8 30,2Z',
    2: 'M15,2 C35,5 55,25 52,55 C50,75 35,90 15,88 C5,72 -2,50 2,30 C5,12 10,0 15,2Z',
    3: 'M30,0 C55,5 65,35 60,60 C55,80 40,92 30,95 C20,92 5,80 0,60 C-5,35 5,5 30,0Z',
  }
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotate: rotate - 20 }}
      whileInView={{ opacity: 1, scale: 1, rotate }}
      transition={{ duration: 1.4, ease: [0.22, 0.61, 0.36, 1], delay }}
      viewport={{ once: true, amount: 0.4 }}
      style={{
        position: 'absolute', left: x, top: y,
        width: size, height: size * 1.6,
        pointerEvents: 'none', zIndex: 0,
      }}
    >
      <svg viewBox="0 0 60 95" fill="none" width="100%" height="100%">
        <path
          d={paths[variant]}
          fill={`rgba(140,105,45,${opacity})`}
        />
        <line
          x1="30" y1="2" x2="30" y2="92"
          stroke={`rgba(140,105,45,${opacity * 1.6})`}
          strokeWidth="0.8"
        />
        <path
          d="M30,25 Q48,42 58,55"
          stroke={`rgba(140,105,45,${opacity * 1.1})`}
          strokeWidth="0.6" fill="none"
        />
        <path
          d="M30,25 Q12,42 2,55"
          stroke={`rgba(140,105,45,${opacity * 1.1})`}
          strokeWidth="0.6" fill="none"
        />
        <path
          d="M30,50 Q44,62 56,70"
          stroke={`rgba(140,105,45,${opacity * 0.7})`}
          strokeWidth="0.5" fill="none"
        />
        <path
          d="M30,50 Q16,62 4,70"
          stroke={`rgba(140,105,45,${opacity * 0.7})`}
          strokeWidth="0.5" fill="none"
        />
      </svg>
    </motion.div>
  )
}

// Tiny floating petal
function Petal({ x, y, rotate = 0, size = 28, delay = 0 }: { x: string | number; y: number; rotate?: number; size?: number; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.3 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay }}
      viewport={{ once: true }}
      style={{ position: 'absolute', left: x, top: y, pointerEvents: 'none', zIndex: 0 }}
    >
      <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
        <ellipse cx="18" cy="18" rx="7" ry="16"
          fill="rgba(201,169,110,0.13)"
          transform={`rotate(${rotate} 18 18)`}
        />
        <ellipse cx="18" cy="18" rx="7" ry="16"
          fill="none"
          stroke="rgba(201,169,110,0.18)"
          strokeWidth="0.5"
          transform={`rotate(${rotate} 18 18)`}
        />
      </svg>
    </motion.div>
  )
}

// Ornamental dot cluster
function DotCluster({ x, y, delay = 0 }: { x: string; y: number; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      style={{ position: 'absolute', left: x, top: y, pointerEvents: 'none', zIndex: 0 }}
    >
      <svg width={40} height={40} viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="1.5" fill="rgba(201,169,110,0.4)" />
        <circle cx="10" cy="10" r="1" fill="rgba(201,169,110,0.25)" />
        <circle cx="30" cy="10" r="1" fill="rgba(201,169,110,0.25)" />
        <circle cx="10" cy="30" r="1" fill="rgba(201,169,110,0.25)" />
        <circle cx="30" cy="30" r="1" fill="rgba(201,169,110,0.25)" />
        <circle cx="20" cy="6" r="0.8" fill="rgba(201,169,110,0.2)" />
        <circle cx="20" cy="34" r="0.8" fill="rgba(201,169,110,0.2)" />
        <circle cx="6" cy="20" r="0.8" fill="rgba(201,169,110,0.2)" />
        <circle cx="34" cy="20" r="0.8" fill="rgba(201,169,110,0.2)" />
      </svg>
    </motion.div>
  )
}

// ─── Ornamental divider ────────────────────────────────────────────────────────
function GoldDivider({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 1, ease: 'easeOut', delay }}
      viewport={{ once: true }}
      style={{ display: 'flex', alignItems: 'center', gap: 14 }}
    >
      <div style={{ height: 1, flex: 1, background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.45))' }} />
      <span style={{ color: '#c9a96e', fontSize: 12, letterSpacing: '0.4em' }}>✦</span>
      <span style={{ color: '#c9a96e', fontSize: 8, letterSpacing: '0.4em', opacity: 0.6 }}>✦</span>
      <span style={{ color: '#c9a96e', fontSize: 12, letterSpacing: '0.4em' }}>✦</span>
      <div style={{ height: 1, flex: 1, background: 'linear-gradient(to left, transparent, rgba(201,169,110,0.45))' }} />
    </motion.div>
  )
}

// ─── Desktop section block ──────────────────────────────────────────────────────
const CONTENT_H = 460

interface TextColProps { data: Section; isLeft: boolean; IconComp: React.ElementType }
function TextCol({ data, isLeft, IconComp }: TextColProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? 30 : -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.75, ease: 'easeOut', delay: 0.15 }}
      viewport={{ once: true, amount: 0.25 }}
      style={{ textAlign: isLeft ? 'left' : 'right' }}
    >
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 7, marginBottom: 18,
        borderRadius: 9999,
        border: '1px solid rgba(201,169,110,0.4)',
        background: 'rgba(201,169,110,0.07)',
        padding: '5px 16px',
      }}>
        <IconComp size={10} color="#a07838" />
        <span style={{ fontSize: 9, fontWeight: 700, color: '#a07838', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
          {data.badge}
        </span>
      </div>

      <h3 className="font-display" style={{
        fontSize: 'clamp(1.9rem, 2.6vw, 3rem)', fontWeight: 600,
        color: '#1e1a14', lineHeight: 1.08, marginBottom: 14,
        whiteSpace: 'pre-line',
      }}>
        {data.title}
      </h3>

      <p style={{ fontSize: 12, fontWeight: 600, color: '#c9a96e', letterSpacing: '0.1em', marginBottom: 16 }}>
        {data.subtitle}
      </p>

      <p style={{ fontSize: 14, color: '#7a6e65', lineHeight: 1.85, whiteSpace: 'pre-line' }}>
        {data.desc}
      </p>

      {data.isRSVP && (
        <motion.a
          href="#rsvp"
          whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(201,169,110,0.5)' }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 10, marginTop: 26,
            borderRadius: 9999, background: '#c9a96e',
            padding: '14px 36px', fontSize: 13, fontWeight: 700,
            color: '#fff', textDecoration: 'none',
            boxShadow: '0 6px 24px rgba(201,169,110,0.38)',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#a07838' }}
          onMouseLeave={e => { e.currentTarget.style.background = '#c9a96e' }}
        >
          Conferma presenza <ArrowRight size={14} />
        </motion.a>
      )}
    </motion.div>
  )
}

interface PhotoColProps { data: Section }
function PhotoCol({ data }: PhotoColProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.25 }}
    >
      {data.extraImgs ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{
            gridRow: 'span 2', borderRadius: 18, overflow: 'hidden',
            boxShadow: '0 20px 56px rgba(30,26,20,0.2)',
          }}>
            <img src={data.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
          </div>
          {data.extraImgs.map((src, i) => (
            <div key={i} style={{ borderRadius: 14, overflow: 'hidden', aspectRatio: '4/3', boxShadow: '0 10px 28px rgba(30,26,20,0.15)' }}>
              <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
            </div>
          ))}
        </div>
      ) : (
        <div style={{
          borderRadius: 22, overflow: 'hidden', aspectRatio: '4/3',
          boxShadow: '0 24px 64px rgba(30,26,20,0.2)',
          border: '1px solid rgba(201,169,110,0.15)',
        }}>
          <img src={data.img} alt={data.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
        </div>
      )}
    </motion.div>
  )
}

function DesktopSection({ data, index }: { data: Section; index: number }) {
  const isLeft = data.dir === 'left'
  const topY = HERO_H + index * SEC_H + (SEC_H - CONTENT_H) / 2

  const IconComp = data.icon === 'clock' ? Clock : data.icon === 'map' ? MapPin : Heart

  return (
    <div style={{
      position: 'absolute', top: topY,
      left: isLeft ? '22%' : '4%',
      right: isLeft ? '4%' : '22%',
      height: CONTENT_H,
      display: 'grid', gridTemplateColumns: '1fr 1fr',
      gap: 56, alignItems: 'center', zIndex: 2,
    }}>
      {isLeft
        ? <><PhotoCol data={data} /><TextCol data={data} isLeft={isLeft} IconComp={IconComp} /></>
        : <><TextCol data={data} isLeft={isLeft} IconComp={IconComp} /><PhotoCol data={data} /></>
      }
    </div>
  )
}

// ─── Mobile section ────────────────────────────────────────────────────────────
function MobileSection({ data, isLast }: { data: Section; isLast: boolean }) {
  const IconComp = data.icon === 'clock' ? Clock : data.icon === 'map' ? MapPin : Heart

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true, amount: 0.12 }}
      style={{ position: 'relative', marginBottom: isLast ? 0 : 64, textAlign: 'center' }}
    >
      {/* Photo */}
      <div style={{ borderRadius: 16, overflow: 'hidden', aspectRatio: '4/3', marginBottom: 20, boxShadow: '0 8px 28px rgba(30,26,20,0.14)', border: '1px solid rgba(201,169,110,0.1)' }}>
        <img src={data.img} alt={data.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
      </div>
      {/* Badge */}
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 12, borderRadius: 9999, border: '1px solid rgba(201,169,110,0.35)', background: 'rgba(201,169,110,0.07)', padding: '5px 14px' }}>
        <IconComp size={9} color="#a07838" />
        <span style={{ fontSize: 9, fontWeight: 700, color: '#a07838', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
          {data.badge}
        </span>
      </div>
      <h3 className="font-display" style={{ fontSize: '1.75rem', fontWeight: 600, color: '#1e1a14', lineHeight: 1.1, marginBottom: 8, whiteSpace: 'pre-line' }}>
        {data.title}
      </h3>
      <p style={{ fontSize: 11, fontWeight: 600, color: '#c9a96e', letterSpacing: '0.1em', marginBottom: 12 }}>
        {data.subtitle}
      </p>
      <p style={{ fontSize: 13, color: '#7a6e65', lineHeight: 1.85, whiteSpace: 'pre-line' }}>
        {data.desc}
      </p>
      {data.isRSVP && (
        <a href="#rsvp" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 20,
          borderRadius: 9999, background: '#c9a96e', padding: '13px 30px',
          fontSize: 13, fontWeight: 700, color: '#fff', textDecoration: 'none',
          boxShadow: '0 4px 18px rgba(201,169,110,0.4)',
        }}>
          Conferma presenza <ArrowRight size={14} />
        </a>
      )}
    </motion.div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function JourneyPage() {
  const { scrollYProgress } = useScroll()
  // Desktop: spring morbida per un effetto fluido
  // Mobile: scroll diretto senza spring (evita lag e scatti su touch)
  const pathProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20, restDelta: 0.001 })
  const isDesktop = useIsDesktop()

  const mobileContainerRef = useRef<HTMLDivElement>(null)
  const [mobileDims, setMobileDims] = useState({ w: 390, h: 2800 })

  useEffect(() => { window.scrollTo(0, 0) }, [])

  useEffect(() => {
    if (isDesktop) return
    const el = mobileContainerRef.current
    if (!el) return
    const update = () => {
      // offsetWidth/offsetHeight includono padding, clientWidth no → usiamo offsetWidth per la larghezza reale
      // Per l'altezza usiamo offsetHeight (l'altezza occupata dal container nel flow)
      setMobileDims({ w: el.offsetWidth, h: el.offsetHeight })
    }
    const ro = new ResizeObserver(update)
    ro.observe(el)
    // Aspetta il prossimo frame per avere layout completo
    requestAnimationFrame(update)
    return () => ro.disconnect()
  }, [isDesktop])

  // ── MOBILE ────────────────────────────────────────────────────────────────────
  if (!isDesktop) {
    const { w: mw, h: mh } = mobileDims
    const mobPathD = buildMobilePath(mw, mh)
    const heroH = mh * 0.15
    const secH = (mh * 0.78) / 4
    const mobDirs = [mw * 0.18, mw * 0.82, mw * 0.18, mw * 0.82]

    return (
      <div style={{ background: '#faf7f2', minHeight: '100vh' }}>
        <Navbar />
        <div ref={mobileContainerRef} style={{ position: 'relative', padding: '120px 24px 80px' }}>

          {/* ── Animated SVG path ── */}
          <svg
            width={mw} height={mh}
            viewBox={`0 0 ${mw} ${mh}`}
            preserveAspectRatio="none"
            style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 1 }}
          >
            <defs>
              <filter id="mob-glow" x="-50%" y="-5%" width="200%" height="110%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Ambient ghost */}
            <path d={mobPathD} fill="none" stroke="rgba(201,169,110,0.07)" strokeWidth={18} strokeLinecap="round" />
            {/* Ghost dashed */}
            <path d={mobPathD} fill="none" stroke="rgba(201,169,110,0.13)" strokeWidth={1} strokeLinecap="round" strokeDasharray="3 10" />
            {/* Animated gold band — usa scrollYProgress diretto, senza spring */}
            <motion.path d={mobPathD} fill="none" stroke="rgba(201,169,110,0.28)" strokeWidth={5} strokeLinecap="round" style={{ pathLength: scrollYProgress }} />
            {/* Animated bright inner */}
            <motion.path d={mobPathD} fill="none" stroke="#c9a96e" strokeWidth={1.5} strokeLinecap="round" filter="url(#mob-glow)" style={{ pathLength: scrollYProgress }} />
          </svg>

          {/* ── Apex dots ── */}
          {mobDirs.map((ax, i) => {
            const ym = heroH + i * secH + secH / 2
            return (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.95 }}
                transition={{ type: 'spring', stiffness: 250, delay: 0.05 }}
                style={{ position: 'absolute', left: ax, top: ym, transform: 'translate(-50%, -50%)', zIndex: 4 }}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: 'rgba(201,169,110,0.06)',
                  border: '1px solid rgba(201,169,110,0.35)',
                  boxShadow: '0 0 0 8px rgba(201,169,110,0.04)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#c9a96e', boxShadow: '0 0 10px rgba(201,169,110,0.65)' }} />
                </div>
              </motion.div>
            )
          })}

          {/* Hero mobile */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            style={{ textAlign: 'center', marginBottom: 72, paddingBottom: 48, position: 'relative', zIndex: 2 }}
          >
            <p style={{ fontSize: 9, letterSpacing: '0.3em', color: '#a07838', fontWeight: 700, textTransform: 'uppercase', marginBottom: 20 }}>
              14 Giugno 2026
            </p>
            <h1 className="font-display" style={{ fontSize: 'clamp(3.5rem, 14vw, 5rem)', fontWeight: 600, color: '#1e1a14', lineHeight: 0.92, marginBottom: 6 }}>
              Sofia
            </h1>
            <p style={{ fontSize: 18, color: '#c9a96e', fontWeight: 300, letterSpacing: '0.25em', marginBottom: 6 }}>&amp;</p>
            <h1 className="font-display" style={{ fontSize: 'clamp(3.5rem, 14vw, 5rem)', fontWeight: 600, color: '#1e1a14', lineHeight: 0.92, marginBottom: 28 }}>
              Marco
            </h1>
            <GoldDivider />
            <p style={{ fontSize: 12, color: '#7a6e65', letterSpacing: '0.1em', marginTop: 20, lineHeight: 1.7 }}>
              Vi aspettiamo per celebrare con noi<br />il giorno più bello della nostra vita
            </p>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
              style={{ marginTop: 36, color: 'rgba(201,169,110,0.6)', fontSize: 20 }}
            >
              ↓
            </motion.div>
          </motion.div>

          {/* Sections */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            {sections.map((sec, i) => (
              <MobileSection key={i} data={sec} isLast={i === sections.length - 1} />
            ))}
          </div>

          {/* Footer mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', paddingTop: 56, marginTop: 40, position: 'relative', zIndex: 2 }}
          >
            <GoldDivider />
            <p className="font-display" style={{ fontSize: '1.4rem', color: '#1e1a14', marginTop: 28, marginBottom: 6 }}>Con amore,</p>
            <p className="font-display" style={{ fontSize: '2rem', color: '#c9a96e', fontStyle: 'italic' }}>Sofia &amp; Marco</p>
            <p style={{ fontSize: 18, color: 'rgba(201,169,110,0.4)', marginTop: 16 }}>✦</p>
          </motion.div>
        </div>
      </div>
    )
  }

  // ── DESKTOP ───────────────────────────────────────────────────────────────────
  return (
    <div style={{ background: '#faf7f2' }}>
      <Navbar />
      <div style={{ position: 'relative', height: TOTAL_H }}>

        {/* ── Double SVG animated path ──────────────────────────────────── */}
        <svg
          width="100%" height={TOTAL_H}
          viewBox={`0 0 ${VW} ${TOTAL_H}`}
          preserveAspectRatio="none"
          style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 1 }}
        >
          <defs>
            <filter id="inv-glow" x="-40%" y="-5%" width="180%" height="110%">
              <feGaussianBlur stdDeviation="10" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Layer 1 – very wide soft ambient */}
          <path d={PATH_D} fill="none" stroke="rgba(201,169,110,0.05)" strokeWidth={36} strokeLinecap="round" />
          {/* Layer 2 – medium glow track */}
          <path d={PATH_D} fill="none" stroke="rgba(201,169,110,0.08)" strokeWidth={16} strokeLinecap="round" />
          {/* Layer 3 – dashed ghost showing full path */}
          <path d={PATH_D} fill="none" stroke="rgba(201,169,110,0.13)" strokeWidth={1.5} strokeLinecap="round" strokeDasharray="3 12" />
          {/* Layer 4 – ghost solid thin */}
          <path d={PATH_D} fill="none" stroke="rgba(201,169,110,0.09)" strokeWidth={4} strokeLinecap="round" />

          {/* Animated: outer wide gold band */}
          <motion.path
            d={PATH_D} fill="none"
            stroke="rgba(201,169,110,0.2)" strokeWidth={10} strokeLinecap="round"
            style={{ pathLength: pathProgress }}
          />
          {/* Animated: mid line */}
          <motion.path
            d={PATH_D} fill="none"
            stroke="rgba(201,169,110,0.35)" strokeWidth={4} strokeLinecap="round"
            style={{ pathLength: pathProgress }}
          />
          {/* Animated: precise bright inner line */}
          <motion.path
            d={PATH_D} fill="none"
            stroke="#c9a96e" strokeWidth={1.5} strokeLinecap="round"
            filter="url(#inv-glow)"
            style={{ pathLength: pathProgress }}
          />
        </svg>

        {/* ── Decorative leaves ─────────────────────────────────────────── */}
        {/* Hero area */}
        <Leaf x="1%"  y={60}  rotate={-30} size={100} opacity={0.12} delay={0.4} variant={1} />
        <Leaf x="5%"  y={200} rotate={20}  size={65}  opacity={0.08} delay={0.6} variant={2} />
        <Leaf x="88%" y={80}  rotate={40}  size={90}  opacity={0.11} delay={0.5} variant={3} />
        <Leaf x="93%" y={260} rotate={-15} size={60}  opacity={0.08} delay={0.7} variant={1} />
        <Petal x="12%" y={HERO_H * 0.45} rotate={35}  size={32} />
        <Petal x="85%" y={HERO_H * 0.55} rotate={-50} size={28} delay={0.2} />
        <DotCluster x="16%" y={HERO_H * 0.3} />
        <DotCluster x="80%" y={HERO_H * 0.65} delay={0.3} />

        {/* Around section 1 (apex left) */}
        <Leaf x="0%"  y={apexY(0) - 120} rotate={-45} size={110} opacity={0.13} variant={2} />
        <Leaf x="3%"  y={apexY(0) + 80}  rotate={25}  size={70}  opacity={0.09} variant={3} />
        <Leaf x="36%" y={apexY(0) - 60}  rotate={15}  size={55}  opacity={0.08} delay={0.2} variant={1} />
        <Leaf x="88%" y={apexY(0) - 90}  rotate={-20} size={80}  opacity={0.10} variant={2} />
        <Petal x="28%" y={apexY(0) + 120} rotate={60}  size={26} delay={0.15} />
        <DotCluster x="82%" y={apexY(0) + 60} delay={0.1} />

        {/* Around section 2 (apex right) */}
        <Leaf x="2%"  y={apexY(1) + 50}  rotate={30}  size={85}  opacity={0.12} variant={1} />
        <Leaf x="62%" y={apexY(1) - 110} rotate={-35} size={65}  opacity={0.09} variant={3} />
        <Leaf x="91%" y={apexY(1) - 60}  rotate={10}  size={100} opacity={0.13} delay={0.2} variant={2} />
        <Leaf x="94%" y={apexY(1) + 100} rotate={-25} size={55}  opacity={0.07} variant={1} />
        <Petal x="18%" y={apexY(1) - 80} rotate={-40} size={30} delay={0.1} />
        <DotCluster x="6%" y={apexY(1) + 20} delay={0.2} />

        {/* Around section 3 (apex left) */}
        <Leaf x="0%"  y={apexY(2) - 80}  rotate={-20} size={90}  opacity={0.11} variant={3} />
        <Leaf x="4%"  y={apexY(2) + 100} rotate={40}  size={60}  opacity={0.08} variant={1} />
        <Leaf x="30%" y={apexY(2) + 60}  rotate={50}  size={50}  opacity={0.07} delay={0.3} variant={2} />
        <Leaf x="90%" y={apexY(2) - 50}  rotate={-30} size={85}  opacity={0.12} delay={0.1} variant={3} />
        <Petal x="75%" y={apexY(2) + 130} rotate={25}  size={24} delay={0.25} />
        <DotCluster x="84%" y={apexY(2) - 30} delay={0.15} />

        {/* Around section 4 (apex right) */}
        <Leaf x="3%"  y={apexY(3) + 40}  rotate={22}  size={75}  opacity={0.11} variant={2} />
        <Leaf x="60%" y={apexY(3) - 100} rotate={-15} size={70}  opacity={0.09} variant={1} />
        <Leaf x="88%" y={apexY(3) - 70}  rotate={45}  size={95}  opacity={0.13} delay={0.2} variant={3} />
        <Leaf x="93%" y={apexY(3) + 80}  rotate={-10} size={55}  opacity={0.07} variant={2} />
        <Petal x="20%" y={apexY(3) - 70} rotate={55}  size={28} />
        <DotCluster x="5%" y={apexY(3) - 10} delay={0.1} />

        {/* Footer area */}
        <Leaf x="2%"  y={TOTAL_H - FOOT_H * 0.7} rotate={-35} size={80} opacity={0.10} variant={1} />
        <Leaf x="90%" y={TOTAL_H - FOOT_H * 0.8} rotate={25}  size={70} opacity={0.09} variant={3} />
        <DotCluster x="45%" y={TOTAL_H - FOOT_H + 20} />

        {/* ── Hero ───────────────────────────────────────────────────────── */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: HERO_H,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', textAlign: 'center',
          padding: '80px 32px 0', zIndex: 2,
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <motion.p
              initial={{ opacity: 0, letterSpacing: '0.5em' }}
              animate={{ opacity: 1, letterSpacing: '0.3em' }}
              transition={{ duration: 1.2, delay: 0.2 }}
              style={{ fontSize: 10, fontWeight: 700, color: '#a07838', textTransform: 'uppercase', marginBottom: 24 }}
            >
              14 Giugno 2026
            </motion.p>

            <h1 className="font-display" style={{
              fontSize: 'clamp(5rem, 10vw, 9rem)', fontWeight: 600,
              color: '#1e1a14', lineHeight: 0.88, letterSpacing: '-0.02em', marginBottom: 4,
            }}>
              Sofia
            </h1>
            <motion.p
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 3 }}
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.6rem)', color: '#c9a96e', fontWeight: 300, letterSpacing: '0.2em', margin: '4px 0' }}
            >
              &amp;
            </motion.p>
            <h1 className="font-display" style={{
              fontSize: 'clamp(5rem, 10vw, 9rem)', fontWeight: 600,
              color: '#1e1a14', lineHeight: 0.88, letterSpacing: '-0.02em', marginBottom: 36,
            }}>
              Marco
            </h1>

            <div style={{ maxWidth: 440, margin: '0 auto 28px' }}>
              <GoldDivider />
            </div>

            <p style={{ fontSize: 14, color: '#7a6e65', letterSpacing: '0.08em', lineHeight: 1.8 }}>
              Vi aspettiamo per celebrare con noi<br />il giorno più bello della nostra vita
            </p>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              style={{ marginTop: 48, color: 'rgba(201,169,110,0.6)', fontSize: 22 }}
            >
              ↓
            </motion.div>
          </motion.div>
        </div>

        {/* ── Apex dots ─────────────────────────────────────────────────── */}
        {DIRS.map((ax, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 250, delay: 0.05 }}
            viewport={{ once: true, amount: 0.95 }}
            style={{
              position: 'absolute',
              left: `${((ax / VW) * 100).toFixed(2)}%`,
              top: apexY(i),
              transform: 'translate(-50%, -50%)',
              zIndex: 4,
            }}
          >
            {/* Outer ring */}
            <div style={{
              width: 52, height: 52, borderRadius: '50%',
              background: 'rgba(201,169,110,0.06)',
              border: '1px solid rgba(201,169,110,0.35)',
              boxShadow: '0 0 0 10px rgba(201,169,110,0.04)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {/* Inner dot */}
              <div style={{
                width: 14, height: 14, borderRadius: '50%',
                background: '#c9a96e',
                boxShadow: '0 0 12px rgba(201,169,110,0.6)',
              }} />
            </div>
          </motion.div>
        ))}

        {/* ── Section section-ornament lines between sections ────────────── */}
        {[0, 1, 2, 3].map(i => {
          const y = HERO_H + i * SEC_H
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
              style={{
                position: 'absolute', top: y, left: '22%', right: '22%',
                height: 1, background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.2) 30%, rgba(201,169,110,0.2) 70%, transparent)',
                zIndex: 2,
              }}
            />
          )
        })}

        {/* ── Desktop sections ───────────────────────────────────────────── */}
        {sections.map((sec, i) => (
          <DesktopSection key={i} data={sec} index={i} />
        ))}

        {/* ── Footer ────────────────────────────────────────────────────── */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: FOOT_H,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: 0, textAlign: 'center', zIndex: 2,
          padding: '0 32px',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            style={{ width: '100%', maxWidth: 480 }}
          >
            <GoldDivider />
            <p className="font-display" style={{
              fontSize: 'clamp(1.4rem, 2vw, 2rem)', color: '#7a6e65',
              fontWeight: 400, marginTop: 36, marginBottom: 8,
            }}>
              Con immensa gioia,
            </p>
            <h2 className="font-display" style={{
              fontSize: 'clamp(3rem, 5vw, 5rem)', fontWeight: 600,
              color: '#1e1a14', lineHeight: 0.95, letterSpacing: '-0.01em', marginBottom: 24,
            }}>
              Sofia <span style={{ color: '#c9a96e', fontWeight: 300 }}>&amp;</span> Marco
            </h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
              <span style={{ color: 'rgba(201,169,110,0.3)', fontSize: 20 }}>✦</span>
              <span style={{ color: '#c9a96e', fontSize: 20 }}>✦</span>
              <span style={{ color: 'rgba(201,169,110,0.3)', fontSize: 20 }}>✦</span>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  )
}

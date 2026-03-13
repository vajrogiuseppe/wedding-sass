import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { FadeContent } from '@/components/ui/FadeContent'
import {
  Search, Plus, Edit2, Trash2, CheckCircle2, Clock, XCircle, Users,
} from 'lucide-react'
import { useInView, useCountUp } from '@/hooks/useInView'
import GradienText from "@/components/ui/GradienText";

function useIsMobile() {
  const [is, setIs] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768)
  useEffect(() => {
    const h = () => setIs(window.innerWidth < 768)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])
  return is
}

// ─── Types ────────────────────────────────────────────────────────────────────
type Status = 'confirmed' | 'pending' | 'declined'

interface Guest {
  id: number
  name: string
  status: Status
  intolleranze: string[]
  pax: number
}

// ─── Config ───────────────────────────────────────────────────────────────────
const STATUS_CFG: Record<Status, { label: string; color: string; bg: string; Icon: React.ComponentType<{ size?: number }> }> = {
  confirmed: { label: 'Confermato', color: '#34d399', bg: 'rgba(52,211,153,0.14)', Icon: CheckCircle2 },
  pending:   { label: 'In attesa',  color: '#fbbf24', bg: 'rgba(251,191,36,0.14)',  Icon: Clock },
  declined:  { label: 'Non partecipa', color: '#f87171', bg: 'rgba(248,113,113,0.14)', Icon: XCircle },
}

const INTOLL_CFG: Record<string, { label: string; color: string; bg: string }> = {
  glutine:  { label: '🌾 Glutine',    color: '#d97706', bg: 'rgba(217,119,6,0.15)' },
  lattosio: { label: '🥛 Lattosio',   color: '#3b82f6', bg: 'rgba(59,130,246,0.15)' },
  vegan:    { label: '🌱 Vegan',      color: '#10b981', bg: 'rgba(16,185,129,0.15)' },
  noci:     { label: '🥜 F.a Guscio', color: '#a855f7', bg: 'rgba(168,85,247,0.15)' },
}

const AVATAR_COLORS = ['#c9a96e', '#7ab4d4', '#b89fd4', '#7abda0', '#d47a7a', '#d4b47a']

const INITIAL_GUESTS: Guest[] = [
  { id: 1, name: 'Giulia Rossi',    status: 'confirmed', intolleranze: ['lattosio'],          pax: 2 },
  { id: 2, name: 'Marco Bianchi',   status: 'pending',   intolleranze: [],                    pax: 4 },
  { id: 3, name: 'Anna Ferrari',    status: 'confirmed', intolleranze: ['glutine'],            pax: 2 },
  { id: 4, name: 'Luca Conti',      status: 'declined',  intolleranze: [],                    pax: 0 },
  { id: 5, name: 'Sofia Marino',    status: 'confirmed', intolleranze: ['vegan'],              pax: 1 },
  { id: 6, name: 'Roberto De Luca', status: 'pending',   intolleranze: ['noci'],              pax: 3 },
]

// Pending guests that will confirm during the animation loop
const PENDING_IDS = INITIAL_GUESTS.filter(g => g.status === 'pending').map(g => g.id)

// ─── Sub-components ───────────────────────────────────────────────────────────
function StatCard({
  label, Icon, color, bg, value, inView,
}: {
  label: string; Icon: React.ComponentType<{ size?: number; color?: string }>
  color: string; bg: string; value: number; inView: boolean
}) {
  const count = useCountUp(value, 1600, inView)
  return (
    <div style={{
      borderRadius: 10, background: bg,
      border: '1px solid rgba(255,255,255,0.06)',
      padding: '8px 10px',
      display: 'flex', alignItems: 'center', gap: 8,
    }}>
      <div style={{
        width: 28, height: 28, borderRadius: 7,
        background: 'rgba(255,255,255,0.05)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <Icon size={13} color={color} />
      </div>
      <div>
        <div style={{ fontSize: 17, fontWeight: 700, color, lineHeight: 1 }}>{count}</div>
        <div style={{ fontSize: 9.5, color: '#6b7280', fontWeight: 500, marginTop: 2 }}>{label}</div>
      </div>
    </div>
  )
}

function Badge({ text, color, bg }: { text: string; color: string; bg: string }) {
  return (
    <span style={{
      display: 'inline-block', padding: '2px 7px', borderRadius: 6,
      fontSize: 9.5, fontWeight: 600, color, background: bg,
      border: `1px solid ${color}28`, whiteSpace: 'nowrap' as const,
    }}>
      {text}
    </span>
  )
}

function StatusBadge({ status }: { status: Status }) {
  const cfg = STATUS_CFG[status]
  const Icon = cfg.Icon
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '3px 8px', borderRadius: 20,
      fontSize: 9.5, fontWeight: 600, color: cfg.color, background: cfg.bg,
      border: `1px solid ${cfg.color}28`, whiteSpace: 'nowrap' as const,
    }}>
      <Icon size={10} /> {cfg.label}
    </span>
  )
}

// ─── Dashboard UI ─────────────────────────────────────────────────────────────
function DashboardUI() {
  const [guests, setGuests] = useState<Guest[]>(INITIAL_GUESTS)
  const [toast, setToast] = useState<{ name: string; pax: number } | null>(null)
  const [highlightedId, setHighlightedId] = useState<number | null>(null)
  const [activeFilter, setActiveFilter] = useState<string>('tutti')
  const pendingCycleRef = useRef(0)

  const { ref: statsRef, inView: statsInView } = useInView<HTMLDivElement>({ threshold: 0.3 })

  // Stats computed from current guest state
  const total     = guests.reduce((a, g) => a + Math.max(g.pax, 1), 0) + 100
  const confirmed = guests.filter(g => g.status === 'confirmed').reduce((a, g) => a + g.pax, 0) + 81
  const pending   = guests.filter(g => g.status === 'pending').reduce((a, g) => a + g.pax, 0) + 17
  const declined  = guests.filter(g => g.status === 'declined').length + 12

  const statCards = [
    { label: 'Invitati totali',  Icon: Users,        color: '#a1a1aa', bg: 'rgba(161,161,170,0.08)', value: total },
    { label: 'Confermati',       Icon: CheckCircle2, color: '#34d399', bg: 'rgba(52,211,153,0.08)',   value: confirmed },
    { label: 'In attesa',        Icon: Clock,        color: '#fbbf24', bg: 'rgba(251,191,36,0.08)',   value: pending },
    { label: 'Non partecipa',    Icon: XCircle,      color: '#f87171', bg: 'rgba(248,113,113,0.08)', value: declined },
  ]

  // RSVP animation loop
  useEffect(() => {
    const loop = setInterval(() => {
      const id = PENDING_IDS[pendingCycleRef.current % PENDING_IDS.length]
      const guest = guests.find(g => g.id === id)
      if (!guest) { pendingCycleRef.current++; return }

      // Highlight row
      setHighlightedId(id)

      // After short delay, change status
      setTimeout(() => {
        setGuests(prev => prev.map(g =>
          g.id === id ? { ...g, status: 'confirmed' } : g
        ))
        setToast({ name: guest.name, pax: guest.pax })
      }, 700)

      // Hide toast after 3.5s
      setTimeout(() => {
        setToast(null)
        setHighlightedId(null)
      }, 4500)

      // Reset guest to pending after full cycle for looping demo
      setTimeout(() => {
        setGuests(prev => prev.map(g =>
          g.id === id ? { ...g, status: 'pending' } : g
        ))
      }, 6500)

      pendingCycleRef.current++
    }, 8000)

    return () => clearInterval(loop)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Filtered guests
  const filteredGuests = activeFilter === 'tutti'
    ? guests
    : guests.filter(g =>
        activeFilter in INTOLL_CFG
          ? g.intolleranze.includes(activeFilter)
          : g.status === activeFilter
      )

  const filterButtons = [
    { key: 'tutti', label: 'Tutti' },
    { key: 'confirmed', label: 'Confermati' },
    { key: 'pending', label: 'In attesa' },
    { key: 'declined', label: 'Rifiutati' },
  ]

  const intollButtons = Object.entries(INTOLL_CFG).map(([key, v]) => ({ key, label: v.label.split(' ')[1], color: v.color }))

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#0d0d0f', position: 'relative', overflow: 'hidden' }}>

      {/* ── Toast ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, x: 60, y: 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 60 }}
            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
            style={{
              position: 'absolute', top: 10, right: 10, zIndex: 50,
              background: 'rgba(17,24,17,0.96)', backdropFilter: 'blur(12px)',
              border: '1px solid rgba(52,211,153,0.35)',
              borderRadius: 10, padding: '8px 12px',
              display: 'flex', alignItems: 'center', gap: 8,
              boxShadow: '0 4px 24px rgba(52,211,153,0.15)',
            }}
          >
            <div style={{ width: 22, height: 22, borderRadius: 6, background: 'rgba(52,211,153,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={12} color="#34d399" />
            </div>
            <div>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: '#d1fae5', lineHeight: 1.2 }}>
                {toast.name} ha confermato!
              </div>
              <div style={{ fontSize: 9, color: '#6ee7b7', marginTop: 1 }}>+{toast.pax} {toast.pax === 1 ? 'ospite' : 'ospiti'} aggiunti</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Header ────────────────────────────────────────────── */}
      <div style={{ padding: '10px 14px 8px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#e4e4e7' }}>Lista Ospiti — Giuseppe & Maria</div>
          <div style={{ fontSize: 9, color: '#6b7280', fontWeight: 500 }}>28 Giugno 2027</div>
        </div>

        {/* Stat cards */}
        <div ref={statsRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, marginBottom: 8 }}>
          {statCards.map(s => (
            <StatCard key={s.label} {...s} inView={statsInView} />
          ))}
        </div>

        {/* Search + filters row */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 6 }}>
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', gap: 6,
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 7, padding: '4px 8px',
          }}>
            <Search size={10} color="#6b7280" />
            <span style={{ fontSize: 10, color: '#4b5563' }}>Cerca ospite...</span>
          </div>
          {filterButtons.map(f => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              style={{
                padding: '4px 8px', borderRadius: 6, fontSize: 9.5, fontWeight: 600, cursor: 'pointer',
                background: activeFilter === f.key ? 'rgba(201,169,110,0.18)' : 'rgba(255,255,255,0.04)',
                color: activeFilter === f.key ? '#c9a96e' : '#6b7280',
                border: activeFilter === f.key ? '1px solid rgba(201,169,110,0.35)' : '1px solid rgba(255,255,255,0.07)',
                transition: 'all 0.15s',
              }}
            >
              {f.label}
            </button>
          ))}
          <button style={{
            display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px',
            borderRadius: 6, fontSize: 9.5, fontWeight: 600, cursor: 'pointer',
            background: 'rgba(201,169,110,0.15)', color: '#c9a96e',
            border: '1px solid rgba(201,169,110,0.3)',
          }}>
            <Plus size={10} /> Ospite
          </button>
        </div>

        {/* Intolerance filters */}
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          <span style={{ fontSize: 9, color: '#4b5563', fontWeight: 600 }}>Intolleranze:</span>
          {intollButtons.map(b => (
            <button
              key={b.key}
              onClick={() => setActiveFilter(prev => prev === b.key ? 'tutti' : b.key)}
              style={{
                padding: '2px 7px', borderRadius: 5, fontSize: 9, fontWeight: 600, cursor: 'pointer',
                background: activeFilter === b.key ? `${b.color}22` : 'rgba(255,255,255,0.03)',
                color: activeFilter === b.key ? b.color : '#6b7280',
                border: activeFilter === b.key ? `1px solid ${b.color}44` : '1px solid rgba(255,255,255,0.06)',
                transition: 'all 0.15s',
              }}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Table ─────────────────────────────────────────────── */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {/* Table header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '28px 1fr 100px 1fr 32px 52px',
          gap: 6, padding: '5px 14px',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          background: 'rgba(255,255,255,0.02)',
        }}>
          {['', 'Nome', 'Stato', 'Intolleranze', 'Pax', ''].map((h, i) => (
            <div key={i} style={{ fontSize: 9, fontWeight: 700, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</div>
          ))}
        </div>

        {/* Rows */}
        <AnimatePresence>
          {filteredGuests.map((guest, i) => {
            const isHighlighted = highlightedId === guest.id
            const avatarColor = AVATAR_COLORS[guest.id % AVATAR_COLORS.length]
            return (
              <motion.div
                key={guest.id}
                layout
                initial={{ opacity: 0, x: -8 }}
                animate={{
                  opacity: 1, x: 0,
                  background: isHighlighted ? 'rgba(52,211,153,0.07)' : 'transparent',
                }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '28px 1fr 100px 1fr 32px 52px',
                  gap: 6, padding: '7px 14px',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                  alignItems: 'center',
                }}
              >
                {/* Avatar */}
                <div style={{
                  width: 24, height: 24, borderRadius: 6, flexShrink: 0,
                  background: `${avatarColor}22`, border: `1px solid ${avatarColor}44`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 9.5, fontWeight: 700, color: avatarColor,
                }}>
                  {guest.name[0]}
                </div>

                {/* Name */}
                <div style={{ fontSize: 10.5, fontWeight: 600, color: '#d4d4d8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {guest.name}
                </div>

                {/* Status */}
                <motion.div layout animate={{ opacity: 1 }}>
                  <StatusBadge status={guest.status} />
                </motion.div>

                {/* Intolleranze */}
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' as const }}>
                  {guest.intolleranze.length === 0
                    ? <span style={{ fontSize: 9.5, color: '#374151' }}>—</span>
                    : guest.intolleranze.map(k => {
                        const cfg = INTOLL_CFG[k]
                        return cfg ? <Badge key={k} text={cfg.label} color={cfg.color} bg={cfg.bg} /> : null
                      })
                  }
                </div>

                {/* Pax */}
                <div style={{ fontSize: 10.5, fontWeight: 600, color: '#9ca3af', textAlign: 'center' }}>
                  {guest.pax > 0 ? guest.pax : '—'}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 4 }}>
                  <button style={{ width: 20, height: 20, borderRadius: 5, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <Edit2 size={9} color="#6b7280" />
                  </button>
                  <button style={{ width: 20, height: 20, borderRadius: 5, background: 'rgba(248,113,113,0.06)', border: '1px solid rgba(248,113,113,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <Trash2 size={9} color="#f87171" />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}

const FEATURE_PILLS = [
  { icon: '✓', text: 'RSVP in tempo reale', color: '#34d399' },
  { icon: '✓', text: 'Filtri per intolleranze', color: '#34d399' },
  { icon: '✓', text: 'Aggiungi & modifica ospiti', color: '#34d399' },
  { icon: '✓', text: 'Notifiche automatiche', color: '#34d399' },
]

// ─── Main Section ─────────────────────────────────────────────────────────────
export function DashboardPreviewSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'center center'],
  })

  const scale    = useTransform(scrollYProgress, [0, 1], [0.84, 1])
  const rotateX  = useTransform(scrollYProgress, [0, 1], [18, 0])
  const opacity  = useTransform(scrollYProgress, [0, 0.35], [0.2, 1])
  const y        = useTransform(scrollYProgress, [0, 1], [50, 0])

  const sectionHeader = (
    <div style={{ textAlign: 'center', marginBottom: isMobile ? 32 : 64 }}>
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          display: 'inline-block', borderRadius: 9999,
          border: '1px solid rgba(213, 213, 213, 0.3)',
          background: 'rgba(52,211,153,0.07)',
          padding: '6px 16px', fontSize: 11, fontWeight: 600,
          color: '#fff',
          textTransform: 'uppercase' as const, marginBottom: 20,
        }}
      >
        Dashboard RSVP
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="font-display"
        style={{
          fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
          fontWeight: 600, color: '#f5f0e8', lineHeight: 1.1, marginBottom: 16,
        }}
      >
        Non solo un invito.
        <br />
         <GradienText colors={["#faf6f0", "#f79adb", "#cf8300"]}>
            <span style={{ fontStyle: "italic" }}>
              merita un invito perfetto.
            </span>
          </GradienText>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        style={{ fontSize: 16, color: 'rgba(245,240,232,0.55)', maxWidth: 500, margin: '0 auto' }}
      >
        Gestisci conferme, intolleranze e ospiti in tempo reale dalla tua dashboard personale.
      </motion.p>
    </div>
  )

  const featurePills = (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: isMobile ? 'column' : 'row' as const,
        alignItems: isMobile ? 'stretch' : 'center',
        gap: isMobile ? 8 : 12,
        marginTop: isMobile ? 24 : 48,
        flexWrap: 'wrap' as const,
      }}
    >
      {FEATURE_PILLS.map((pill, i) => (
        <span key={i} style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '8px 16px', borderRadius: 9999,
          background: 'rgba(52,211,153,0.07)',
          border: '1px solid rgba(52,211,153,0.2)',
          fontSize: 13, fontWeight: 500, color: 'rgba(245,240,232,0.7)',
          justifyContent: isMobile ? 'center' : 'flex-start',
        }}>
          <span style={{ color: pill.color, fontWeight: 700 }}>{pill.icon}</span> {pill.text}
        </span>
      ))}
    </motion.div>
  )

  // ── Mobile layout ──────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <section
        id="dashboard"
        style={{
          padding: '80px 0 60px',
          background: 'transparent',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
<FadeContent blur duration={800} style={{ position: 'relative', zIndex: 1, padding: '0 16px', maxWidth: 600, margin: '0 auto' }}>
          {sectionHeader}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            style={{
              borderRadius: 16, overflow: 'hidden', height: 540,
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}
          >
            {/* Browser bar */}
            <div style={{
              background: '#18181b', borderBottom: '1px solid rgba(255,255,255,0.07)',
              padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <div style={{ display: 'flex', gap: 4 }}>
                {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
                  <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 4 }}>
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ width: 5, height: 5, borderRadius: '50%', background: '#34d399' }}
                />
                <span style={{ fontSize: 9, color: '#34d399', fontWeight: 600 }}>Live</span>
              </div>
            </div>
            <DashboardUI />
          </motion.div>
          {featurePills}
        </FadeContent>
      </section>
    )
  }

  // ── Desktop layout ─────────────────────────────────────────────────────────
  return (
    <section
      id="dashboard"
      style={{
        padding: '120px 0 100px',
        background: '#0e0c0a',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <FadeContent blur duration={800} style={{ position: 'relative', zIndex: 1 }}>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {sectionHeader}

        {/* MacBook */}
        <div ref={containerRef} style={{ perspective: '1400px' }}>
          <motion.div
            style={{ scale, rotateX, opacity, y, transformStyle: 'preserve-3d', transformOrigin: 'bottom center' }}
          >
            {/* Screen bezel */}
            <div style={{
              borderRadius: '16px 16px 0 0',
              background: '#1c1c1e',
              border: '8px solid #2a2a2e',
              boxShadow: '0 40px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)',
              position: 'relative',
            }}>
              {/* Notch */}
              <div style={{
                position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)',
                height: 6, width: 60, borderRadius: 3, background: '#111',
              }} />

              {/* Screen */}
              <div style={{ borderRadius: 8, overflow: 'hidden', aspectRatio: '16/10', background: '#0d0d0f' }}>

                {/* Browser chrome */}
                <div style={{
                  background: '#18181b', borderBottom: '1px solid rgba(255,255,255,0.07)',
                  padding: '6px 12px',
                  display: 'flex', alignItems: 'center', gap: 10,
                }}>
                  <div style={{ display: 'flex', gap: 5 }}>
                    {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
                      <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
                    ))}
                  </div>
                  <div style={{
                    flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 5, padding: '3px 10px',
                    display: 'flex', alignItems: 'center', gap: 6,
                  }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399' }} />
                    <span style={{ fontSize: 9.5, color: '#6b7280', fontFamily: 'monospace' }}>
                      lovivity/dashboard/giuseppe-maria
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <motion.div
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399' }}
                    />
                    <span style={{ fontSize: 9, color: '#34d399', fontWeight: 600 }}>Live</span>
                  </div>
                </div>

                {/* Dashboard */}
                <DashboardUI />
              </div>
            </div>

            {/* MacBook base */}
            <div style={{ margin: '0 auto', height: 12, width: '72%', borderRadius: '0 0 4px 4px', background: '#2a2a2e', boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }} />
            <div style={{ margin: '0 auto', height: 4, width: '88%', borderRadius: '0 0 8px 8px', background: '#1c1c1e' }} />
          </motion.div>
        </div>

        {featurePills}
      </div>
      </FadeContent>
    </section>
  )
}

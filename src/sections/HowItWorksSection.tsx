import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutTemplate, Palette, Rocket } from 'lucide-react'
import GradienText from '@/components/ui/GradienText'
import { FadeContent } from '@/components/ui/FadeContent'

/* ─── Steps ──────────────────────────────────────────────────── */
const steps = [
  {
    icon: LayoutTemplate,
    title: 'Scegli il layout',
    description: 'Sfoglia i nostri template esclusivi e scegli lo stile che racconta al meglio la vostra storia.',
    media: 'assets/Gif/Screen1.gif ',
  },
  {
    icon: Palette,
    title: 'Inviaci i materiali',
    description: 'Condividici nomi, date, foto e preferenze. Ci occupiamo noi di personalizzare ogni dettaglio.',
    media: undefined as string | undefined,
  },
  {
    icon: Rocket,
    title: 'Ricevi e condividi',
    description: 'In 48 ore il vostro invito è pronto: link unico, QR code stampabile e dashboard ospiti inclusi.',
    media: undefined as string | undefined,
  },
]

/* ─── Fallback screens (usati se media è undefined) ─────────── */
function FallbackScreen0() {
  return (
    <div style={{ padding: '24px 16px', height: '100%', background: '#fff5f7', display: 'flex', flexDirection: 'column', gap: 12, boxSizing: 'border-box' }}>
      <p style={{ fontSize: 11, color: '#bbb', margin: 0 }}>21:41</p>
      <p style={{ fontSize: 13, color: '#888', margin: 0 }}>Ciao Sofia,</p>
      <p style={{ fontSize: 20, fontWeight: 800, color: '#1a0a2e', margin: '4px 0 14px', lineHeight: 1.15 }}>
        Quale stile<br />preferisci?
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        {[['🌿', 'Botanica'], ['◻', 'Minimal'], ['🌸', 'Romantico'], ['✦', 'Moderno']].map(([e, t], i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: i === 0 ? '#f0ebff' : '#fff', borderRadius: 14,
            padding: '11px 16px',
            border: i === 0 ? '1.5px solid #c4b5fd' : '1.5px solid #f2f2f2',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          }}>
            <span style={{ fontSize: 13, fontWeight: i === 0 ? 700 : 400, color: i === 0 ? '#7c6fff' : '#555' }}>{e}  {t}</span>
            {i === 0 && <span style={{ fontSize: 11, color: '#7c6fff', fontWeight: 700 }}>✓</span>}
          </div>
        ))}
      </div>
      <div style={{ borderRadius: 40, background: 'linear-gradient(90deg,#7c6fff,#f79adb)', padding: '11px', textAlign: 'center' }}>
        <span style={{ color: '#fff', fontSize: 12, fontWeight: 700 }}>Usa questo template</span>
      </div>
    </div>
  )
}

function FallbackScreen1() {
  return (
    <div style={{ padding: '24px 16px', height: '100%', background: '#fff5fb', display: 'flex', flexDirection: 'column', gap: 14, boxSizing: 'border-box' }}>
      <p style={{ fontSize: 11, color: '#bbb', margin: 0 }}>21:41</p>
      <p style={{ fontSize: 20, fontWeight: 800, color: '#1a0a2e', lineHeight: 1.15, margin: '0 0 4px' }}>I tuoi<br />materiali</p>
      <div style={{ borderRadius: 16, background: '#fff', padding: '14px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
        <p style={{ fontSize: 10, color: '#bbb', margin: '0 0 10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Colore principale</p>
        <div style={{ display: 'flex', gap: 10 }}>
          {['#f79adb', '#7c6fff', '#c9a96e', '#4cc9f0', '#ff8fab'].map((c, i) => (
            <div key={i} style={{ width: 28, height: 28, borderRadius: '50%', background: c, boxShadow: i === 0 ? `0 0 0 2.5px #fff, 0 0 0 4.5px ${c}` : 'none', flexShrink: 0 }} />
          ))}
        </div>
      </div>
      <div style={{ borderRadius: 16, background: '#fff', padding: '14px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
        <p style={{ fontSize: 10, color: '#bbb', margin: '0 0 10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Font</p>
        <div style={{ padding: '8px 12px', background: '#f5f0ff', borderRadius: 10, fontSize: 13, fontFamily: 'Georgia,serif', fontStyle: 'italic', color: '#7c6fff' }}>
          Cormorant Garamond ✓
        </div>
      </div>
      <div style={{ borderRadius: 16, background: '#fff', padding: '14px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', flex: 1 }}>
        <p style={{ fontSize: 10, color: '#bbb', margin: '0 0 8px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Nomi sposi</p>
        <div style={{ background: '#f9f9f9', borderRadius: 8, padding: '8px 10px', fontSize: 14, fontFamily: 'Georgia,serif', fontStyle: 'italic', color: '#333' }}>
          Sofia &amp; Marco
        </div>
      </div>
    </div>
  )
}

function FallbackScreen2() {
  return (
    <div style={{ padding: '24px 16px', height: '100%', background: '#f0f8ff', display: 'flex', flexDirection: 'column', gap: 12, boxSizing: 'border-box' }}>
      <p style={{ fontSize: 11, color: '#bbb', margin: 0 }}>21:41</p>
      <p style={{ fontSize: 20, fontWeight: 800, color: '#1a0a2e', lineHeight: 1.15, margin: '0 0 4px' }}>Il tuo invito<br />è pronto</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {[{ l: 'Invitati', v: '128', c: '#7c6fff' }, { l: 'Confermati', v: '94', c: '#4ade80' }, { l: 'In attesa', v: '28', c: '#fbbf24' }, { l: 'Declinati', v: '6', c: '#f87171' }].map((s, i) => (
          <div key={i} style={{ borderRadius: 14, background: '#fff', padding: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <p style={{ margin: 0, fontSize: 24, fontWeight: 800, color: s.c }}>{s.v}</p>
            <p style={{ margin: 0, fontSize: 10, color: '#aaa' }}>{s.l}</p>
          </div>
        ))}
      </div>
      <div style={{ borderRadius: 14, background: '#fff', padding: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', flex: 1 }}>
        <p style={{ fontSize: 10, color: '#bbb', margin: '0 0 10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Ultimi RSVP</p>
        {[{ n: 'Giulia M.', s: '✓', c: '#4ade80' }, { n: 'Luca B.', s: '✓', c: '#4ade80' }, { n: 'Sara C.', s: '?', c: '#fbbf24' }].map((g, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: i < 2 ? '1px solid #f5f5f5' : 'none' }}>
            <span style={{ fontSize: 12, color: '#555' }}>{g.n}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: g.c }}>{g.s}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const FALLBACKS = [<FallbackScreen0 />, <FallbackScreen1 />, <FallbackScreen2 />]

/* ─── MediaContent ───────────────────────────────────────────── */
function MediaContent({ src, fallback }: { src?: string; fallback: React.ReactNode }) {
  if (!src) return <>{fallback}</>

  const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(src) || src.includes('.mp4') || src.includes('.webm')
  const isGif = /\.gif$/i.test(src)

  if (isVideo) {
    return (
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    )
  }

  return (
    <img
      src={src}
      alt=""
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
    />
  )
}

/* ─── iPhone Mockup ──────────────────────────────────────────── */
// PHONE_W / PHONE_H define the size — tweak here to resize all phones
const PHONE_W = 280
const PHONE_H = 580

function IPhoneMockup({
  media,
  fallback,
  active,
}: {
  media?: string
  fallback: React.ReactNode
  active: boolean
}) {
  const frameThickness = 11
  const screenW = PHONE_W - frameThickness * 2
  const screenH = PHONE_H - frameThickness * 2

  return (
    <div
      style={{
        position: 'relative',
        width: PHONE_W,
        height: PHONE_H,
        flexShrink: 0,
      }}
    >
      {/* ── Side buttons (volume left) ── */}
      {[72, 112, 152].map((top, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: -4,
            top,
            width: 4,
            height: i === 0 ? 28 : 44,
            borderRadius: '3px 0 0 3px',
            background: 'linear-gradient(90deg,#8a8a8e,#aeaeb2)',
            boxShadow: '-1px 0 3px rgba(0,0,0,0.3)',
          }}
        />
      ))}
      {/* ── Power button (right) ── */}
      <div
        style={{
          position: 'absolute',
          right: -4,
          top: 100,
          width: 4,
          height: 64,
          borderRadius: '0 3px 3px 0',
          background: 'linear-gradient(90deg,#aeaeb2,#8a8a8e)',
          boxShadow: '1px 0 3px rgba(0,0,0,0.3)',
        }}
      />

      {/* ── Outer frame ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 52,
          background: 'linear-gradient(145deg, #d1d1d6 0%, #8a8a8e 30%, #636366 60%, #48484a 100%)',
          boxShadow: active
            ? '0 50px 100px rgba(0,0,0,0.30), 0 20px 40px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.25)'
            : '0 16px 40px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.18)',
        }}
      />

      {/* ── Inner bezel (screen surround) ── */}
      <div
        style={{
          position: 'absolute',
          inset: frameThickness,
          borderRadius: 42,
          background: '#000',
          overflow: 'hidden',
        }}
      >
        {/* Screen content */}
        <div style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={media ?? String(fallback)}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.32, ease: 'easeInOut' }}
              style={{ width: '100%', height: '100%' }}
            >
              <MediaContent src={media} fallback={fallback} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dynamic Island */}
        <div
          style={{
            position: 'absolute',
            top: 12,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 90,
            height: 28,
            borderRadius: 20,
            background: '#000',
            zIndex: 10,
            boxShadow: '0 0 0 1.5px #111',
          }}
        />

        {/* Screen glare */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 42,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%)',
            pointerEvents: 'none',
            zIndex: 20,
          }}
        />
      </div>

      {/* ── Frame highlight (top edge reflection) ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 52,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 40%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}

/* ─── Cascade positions ──────────────────────────────────────── */
const CASCADE = [
  { x: 0,   y: 0,  rotate: -6, scale: 1,    filter: 'brightness(1)',    zIndex: 3 },
  { x: 130, y: 30, rotate:  3, scale: 0.86,  filter: 'brightness(0.62)', zIndex: 2 },
  { x: 240, y: 55, rotate: 10, scale: 0.74,  filter: 'brightness(0.38)', zIndex: 1 },
]

function PhoneInCascade({
  stepIndex,
  posIndex,
  active,
}: {
  stepIndex: number
  posIndex: number
  active: boolean
}) {
  const pos = CASCADE[posIndex]
  const step = steps[stepIndex]

  return (
    <motion.div
      animate={{
        x: pos.x,
        y: pos.y,
        rotate: pos.rotate,
        scale: pos.scale,
        filter: pos.filter,
        zIndex: pos.zIndex,
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 28 }}
      style={{ position: 'absolute', top: 0, left: 0, transformOrigin: 'bottom center' }}
    >
      <IPhoneMockup
        media={step.media}
        fallback={FALLBACKS[stepIndex]}
        active={active}
      />
    </motion.div>
  )
}

/* ─── Section ────────────────────────────────────────────────── */
export function HowItWorksSection() {
  const [active, setActive] = useState(0)
  const order = [active, ...([0, 1, 2].filter(i => i !== active))]

  return (
    <section
      id="come-funziona"
      style={{
        background: 'linear-gradient(160deg, #fce8ea 0%, #fadadd 40%, #f5d0e8 100%)',
        padding: 'clamp(60px,10vw,100px) clamp(20px,5vw,48px) clamp(60px,10vw,120px)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Floating glow shapes */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {[
          { top: '-10%', left: '58%', w: 560, c: 'rgba(130,40,220,0.28)', dur: 8 },
          { top: '52%', left: '-6%', w: 480, c: 'rgba(210,60,170,0.32)', dur: 10 },
          { top: '15%', left: '28%', w: 420, c: 'rgba(180,100,0,0.3)', dur: 13 },
        ].map((g, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -20, 0], scale: [1, 1.06, 1] }}
            transition={{ duration: g.dur, repeat: Infinity, ease: 'easeInOut', delay: i * 1.8 }}
            style={{
              position: 'absolute',
              top: g.top,
              left: g.left,
              width: g.w,
              height: g.w,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${g.c} 0%, transparent 68%)`,
              filter: 'blur(55px)',
            }}
          />
        ))}
      </div>
      <FadeContent blur duration={800}
        className="mx-auto grid grid-cols-1 lg:grid-cols-2"
        style={{ maxWidth: 1100, gap: 'clamp(40px,6vw,80px)', alignItems: 'center' }}
      >
        {/* Mobile: solo il telefono attivo, centrato */}
        <div className="flex lg:hidden justify-center" style={{ marginTop: 32, marginBottom: 8 }}>
          <div style={{ position: 'relative', width: PHONE_W, height: PHONE_H + 40 }}>
            <IPhoneMockup
              media={steps[active].media}
              fallback={FALLBACKS[active]}
              active={true}
            />
          </div>
        </div>

        {/* LEFT */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display"
            style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 600, color: '#1a0a12', lineHeight: 1.08, marginBottom: 16 }}
          >
            Tre passi verso
            <br />
            <GradienText colors={['#1a0a12', '#f79adb', '#cf8300']}>
              <span style={{ fontStyle: 'italic' }}>l'invito perfetto.</span>
            </GradienText>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: 15.5, color: 'rgba(26,10,18,0.48)', lineHeight: 1.65, marginBottom: 52, maxWidth: 380 }}
          >
            Pochi minuti separano la vostra storia da un invito che i vostri ospiti non dimenticheranno.
          </motion.p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {steps.map((step, i) => {
              const Icon = step.icon
              const isActive = active === i
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  style={{
                    borderRadius: 20,
                    padding: '18px 22px',
                    cursor: 'pointer',
                    background: isActive ? '#fff' : 'rgba(255,255,255,0.38)',
                    boxShadow: isActive
                      ? '0 8px 32px rgba(0,0,0,0.09), 0 1px 3px rgba(0,0,0,0.04)'
                      : 'none',
                    border: `1.5px solid ${isActive ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.45)'}`,
                    transition: 'all 0.22s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                  }}
                >
                  <div style={{
                    width: 42, height: 42, borderRadius: 13, flexShrink: 0,
                    background: isActive ? 'rgba(124,111,255,0.1)' : 'rgba(0,0,0,0.04)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.22s',
                  }}>
                    <Icon size={18} color={isActive ? '#7c6fff' : '#ccc'} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{
                      margin: 0, fontSize: 14.5, fontWeight: 700,
                      color: isActive ? '#1a0a12' : 'rgba(26,10,18,0.45)',
                      transition: 'color 0.22s',
                    }}>
                      {step.title}
                    </p>
                    <p style={{
                      margin: '4px 0 0', fontSize: 13, lineHeight: 1.55,
                      color: isActive ? 'rgba(26,10,18,0.52)' : 'rgba(26,10,18,0.28)',
                      transition: 'color 0.22s',
                    }}>
                      {step.description}
                    </p>
                  </div>
                  <motion.div
                    animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 4 }}
                    style={{ width: 7, height: 7, borderRadius: '50%', background: '#7c6fff', flexShrink: 0 }}
                  />
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* RIGHT — phone cascade */}
        <div className="hidden lg:flex" style={{ alignItems: 'center', justifyContent: 'center', paddingRight: 60 }}>
          <div style={{ position: 'relative', width: PHONE_W + 260, height: PHONE_H + 80 }}>
            {order.map((phoneIndex, posIndex) => (
              <PhoneInCascade
                key={phoneIndex}
                stepIndex={phoneIndex}
                posIndex={posIndex}
                active={posIndex === 0}
              />
            ))}
          </div>
        </div>

      </FadeContent>
    </section>
  )
}

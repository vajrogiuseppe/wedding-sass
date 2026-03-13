import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Bell, Lock, ChevronLeft, ChevronRight } from 'lucide-react'

// ── Phone frame wrapper ───────────────────────────────────────────────────────
function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      position: 'relative',
      background: '#1a1510',
      borderRadius: 44,
      padding: '16px 10px 20px',
      boxShadow: '0 0 0 2px #2e2820, 0 0 0 4px #141210, 0 32px 64px rgba(0,0,0,0.35)',
      maxWidth: 320,
      margin: '0 auto',
    }}>
      {/* Dynamic Island / notch */}
      <div style={{
        position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)',
        width: 72, height: 8, borderRadius: 999,
        background: '#0a0806', zIndex: 10,
      }} />
      {/* Side buttons */}
      <div style={{ position: 'absolute', left: -3, top: 90, width: 3, height: 32, borderRadius: '2px 0 0 2px', background: '#2e2820' }} />
      <div style={{ position: 'absolute', left: -3, top: 132, width: 3, height: 32, borderRadius: '2px 0 0 2px', background: '#2e2820' }} />
      <div style={{ position: 'absolute', right: -3, top: 110, width: 3, height: 48, borderRadius: '0 2px 2px 0', background: '#2e2820' }} />
      {/* Screen */}
      <div style={{ borderRadius: 32, overflow: 'hidden', position: 'relative' }}>
        {children}
      </div>
    </div>
  )
}

// ── Save the Date steps ────────────────────────────────────────────────────────
const saveTheDateSteps = [
  {
    number: '01',
    title: 'Scegli il template',
    description:
      'Oltre 20 design eleganti pensati per il vostro giorno speciale. Dal classico al moderno.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=90',
  },
  {
    number: '02',
    title: 'Personalizza i dettagli',
    description:
      "Aggiungi il countdown, la location con mappa integrata e tutti i dettagli dell'evento.",
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=90',
  },
  {
    number: '03',
    title: 'Condividi con gli ospiti',
    description:
      'Il link personalizzato è pronto. Condividilo via WhatsApp, email o social in un secondo.',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=90',
  },
]

// ── RSVP Landing steps ────────────────────────────────────────────────────────
const rsvpSteps = [
  {
    number: '01',
    title: "Gli ospiti ricevono l'invito",
    description:
      'Un link elegante da aprire su qualsiasi dispositivo. Nessuna app, nessuna registrazione.',
    visual: 'invite',
  },
  {
    number: '02',
    title: 'Confermano la presenza',
    description:
      'Form RSVP: numero di accompagnatori, preferenze alimentari, intolleranze. Tutto in pochi tocchi.',
    visual: 'rsvp',
  },
  {
    number: '03',
    title: 'Tu gestisci dalla dashboard',
    description:
      'Area riservata con login sicuro. Monitora confermati, in attesa e declinati in tempo reale.',
    visual: 'dashboard',
  },
]

// ── Save the Date — 2-col layout (steps left, preview right) ──────────────────
function SaveTheDateOverlay({ step }: { step: number }) {
  if (step === 0) {
    return (
      <div style={{
        position: 'absolute', bottom: 20, left: 16, right: 16,
        background: 'rgba(255,255,255,0.97)', borderRadius: 14, padding: '16px 18px',
        backdropFilter: 'blur(8px)', boxShadow: '0 4px 20px rgba(30,26,20,0.15)',
      }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: '#a07838', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 6 }}>
          Save the Date
        </p>
        <h4 className="font-display" style={{ fontSize: 22, color: '#1e1a14', lineHeight: 1.1, marginBottom: 4 }}>
          Sofia & Marco
        </h4>
        <p style={{ fontSize: 12, color: '#7a6f63', marginBottom: 12 }}>14 Giugno 2025 · Villa Carminati, Toscana</p>
        <div style={{ height: 1, background: '#e0d8cc', marginBottom: 12 }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 11, color: '#b5a898' }}>sofiaemarco.lovivity</span>
          <div style={{
            borderRadius: 9999, background: '#c9a96e', color: '#ffffff',
            padding: '5px 14px', fontSize: 11, fontWeight: 700,
          }}>
            Salva la data
          </div>
        </div>
      </div>
    )
  }
  if (step === 1) {
    return (
      <div style={{
        position: 'absolute', bottom: 20, left: 16, right: 16,
        background: 'rgba(255,255,255,0.97)', borderRadius: 14, padding: '16px 18px',
        backdropFilter: 'blur(8px)', boxShadow: '0 4px 20px rgba(30,26,20,0.15)',
      }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          {[
            { label: 'Mancano', val: '127', unit: 'giorni' },
            { label: 'Location', val: 'Villa', unit: 'Carminati' },
          ].map(({ label, val, unit }) => (
            <div key={label} style={{ flex: 1, borderRadius: 10, border: '1px solid #e0d8cc', background: '#faf7f2', padding: '8px 10px', textAlign: 'center' }}>
              <div style={{ fontSize: 8, color: '#b5a898', fontWeight: 600, letterSpacing: '0.08em', marginBottom: 2 }}>{label}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#a07838', lineHeight: 1 }}>{val}</div>
              <div style={{ fontSize: 9, color: '#b5a898' }}>{unit}</div>
            </div>
          ))}
        </div>
        <div style={{ borderRadius: 8, background: 'rgba(201,169,110,0.06)', border: '1px solid rgba(201,169,110,0.2)', padding: '8px 10px', fontSize: 11, color: '#a07838' }}>
          📍 Via del Pino 12, Firenze — <span style={{ textDecoration: 'underline' }}>Vedi mappa</span>
        </div>
      </div>
    )
  }
  return (
    <div style={{
      position: 'absolute', bottom: 20, left: 16, right: 16,
      background: 'rgba(255,255,255,0.97)', borderRadius: 14, padding: '16px 18px',
      backdropFilter: 'blur(8px)', boxShadow: '0 4px 20px rgba(30,26,20,0.15)',
    }}>
      <p style={{ fontSize: 12, color: '#7a6f63', marginBottom: 10 }}>Condividi il link con i tuoi ospiti:</p>
      <div style={{ borderRadius: 9, border: '1px solid #e0d8cc', background: '#faf7f2', padding: '9px 12px', fontSize: 12, color: '#1e1a14', fontWeight: 600, marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        sofiaemarco.lovivity
        <span style={{ fontSize: 10, color: '#a07838', fontWeight: 700 }}>Copia</span>
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        {['WhatsApp', 'Email', 'Instagram'].map((s) => (
          <div key={s} style={{ flex: 1, borderRadius: 9999, border: '1px solid #e0d8cc', padding: '6px 0', textAlign: 'center', fontSize: 10, fontWeight: 600, color: '#7a6f63' }}>
            {s}
          </div>
        ))}
      </div>
    </div>
  )
}

function ImageStepper() {
  const [active, setActive] = useState(0)

  const photos = [
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=90',
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=90',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=90',
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 48, alignItems: 'center' }}>
      {/* Left: steps (like RSVP right side) */}
      <div>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          borderRadius: 9999, border: '1px solid rgba(201,169,110,0.4)',
          background: 'rgba(201,169,110,0.08)', padding: '6px 14px',
          fontSize: 11, fontWeight: 600, color: '#a07838', letterSpacing: '0.12em', marginBottom: 24,
        }}>
          Save the Date
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 28 }}>
          {saveTheDateSteps.map((s, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                textAlign: 'left', padding: '16px 20px', borderRadius: 14,
                border: `1px solid ${i === active ? 'rgba(201,169,110,0.4)' : '#e0d8cc'}`,
                background: i === active ? 'rgba(201,169,110,0.06)' : '#ffffff',
                cursor: 'pointer', transition: 'all 0.25s', fontFamily: 'inherit',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: i === active ? 8 : 0 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: i === active ? '#a07838' : '#b5a898', letterSpacing: '0.1em', transition: 'color 0.2s' }}>
                  {s.number}
                </span>
                <span style={{ fontSize: 15, fontWeight: 600, color: i === active ? '#1e1a14' : '#7a6f63', transition: 'color 0.2s' }}>
                  {s.title}
                </span>
              </div>
              {i === active && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  style={{ fontSize: 13, color: '#7a6f63', lineHeight: 1.7, paddingLeft: 28 }}
                >
                  {s.description}
                </motion.p>
              )}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 10, paddingLeft: 20 }}>
          <button
            onClick={() => setActive(Math.max(0, active - 1))}
            disabled={active === 0}
            style={{
              width: 36, height: 36, borderRadius: '50%',
              border: '1px solid #e0d8cc', background: '#ffffff',
              color: active === 0 ? '#e0d8cc' : '#7a6f63',
              cursor: active === 0 ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s',
            }}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => setActive(Math.min(saveTheDateSteps.length - 1, active + 1))}
            disabled={active === saveTheDateSteps.length - 1}
            style={{
              width: 36, height: 36, borderRadius: '50%', border: 'none',
              background: active === saveTheDateSteps.length - 1 ? '#e0d8cc' : '#c9a96e',
              color: '#ffffff',
              cursor: active === saveTheDateSteps.length - 1 ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s',
            }}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Right: big photo in phone frame */}
      <div className="order-first md:order-last">
        <PhoneFrame>
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(_, info) => {
            if (info.offset.x < -50) setActive(Math.min(saveTheDateSteps.length - 1, active + 1))
            else if (info.offset.x > 50) setActive(Math.max(0, active - 1))
          }}
          style={{ position: 'relative', touchAction: 'pan-y' }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.4 }}
              style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', aspectRatio: '9/19.5' }}
            >
              <img
                src={photos[active]}
                alt={saveTheDateSteps[active].title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
                background: 'linear-gradient(to top, rgba(30,26,20,0.6) 0%, transparent 100%)',
              }} />
              <SaveTheDateOverlay step={active} />
            </motion.div>
          </AnimatePresence>

          {/* Photo arrow overlays */}
          <button
            onClick={() => setActive(Math.max(0, active - 1))}
            style={{
              position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(6px)',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#1e1a14', opacity: active === 0 ? 0.3 : 1,
              transition: 'opacity 0.2s', zIndex: 10,
            }}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => setActive(Math.min(saveTheDateSteps.length - 1, active + 1))}
            style={{
              position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(6px)',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#1e1a14', opacity: active === saveTheDateSteps.length - 1 ? 0.3 : 1,
              transition: 'opacity 0.2s', zIndex: 10,
            }}
          >
            <ChevronRight size={16} />
          </button>

          {/* Dot indicators */}
          <div style={{
            position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)',
            display: 'flex', gap: 6, zIndex: 10,
          }}>
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  width: i === active ? 20 : 6, height: 6, borderRadius: 999,
                  background: i === active ? '#ffffff' : 'rgba(255,255,255,0.5)',
                  border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s',
                }}
              />
            ))}
          </div>
        </motion.div>
        </PhoneFrame>
      </div>
    </div>
  )
}

// ── RSVP Dashboard mock ────────────────────────────────────────────────────────
function DashboardMock() {
  return (
    <div style={{
      borderRadius: 16, border: '1px solid #e0d8cc', background: '#ffffff',
      overflow: 'hidden', boxShadow: '0 8px 32px rgba(30,26,20,0.1)',
    }}>
      <div style={{
        background: '#1e1a14', borderBottom: '1px solid #2e2820',
        padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span className="font-display" style={{ fontSize: 14, fontStyle: 'italic', color: '#f5f0e8' }}>
          Lovivity<span style={{ color: '#c9a96e' }}>.</span>
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Lock size={10} color="#c9a96e" />
          <span style={{ fontSize: 10, color: '#c9a96e', fontWeight: 600 }}>Area Riservata</span>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, padding: '14px 14px 0' }}>
        {[
          { n: 142, label: 'Totali', c: '#7a6f63' },
          { n: 98, label: 'Confermati', c: '#a07838' },
          { n: 31, label: 'In attesa', c: '#b5a898' },
        ].map(({ n, label, c }) => (
          <div key={label} style={{
            borderRadius: 10, border: '1px solid #e0d8cc', background: '#faf7f2',
            padding: '10px 8px', textAlign: 'center',
          }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: c }}>{n}</div>
            <div style={{ fontSize: 10, color: '#b5a898', marginTop: 2 }}>{label}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: '12px 14px 14px' }}>
        {['Sofia B. · Confermata', 'Marco R. · In attesa', 'Elena F. · Confermata'].map((g, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '7px 0', borderBottom: i < 2 ? '1px solid #ede8df' : 'none',
          }}>
            <span style={{ fontSize: 12, color: '#7a6f63' }}>{g.split(' · ')[0]}</span>
            <span style={{
              fontSize: 10, fontWeight: 600,
              color: g.includes('Confermata') ? '#a07838' : '#b5a898',
            }}>
              {g.split(' · ')[1]}
            </span>
          </div>
        ))}
      </div>
      <div style={{
        margin: '0 14px 14px',
        borderRadius: 8, background: 'rgba(201,169,110,0.06)', border: '1px solid rgba(201,169,110,0.25)',
        padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <Bell size={12} color="#a07838" />
        <span style={{ fontSize: 11, color: '#a07838' }}>Nuova conferma da Elena Ferrari</span>
      </div>
    </div>
  )
}

function RSVPStepper() {
  const [active, setActive] = useState(0)

  const photos = [
    'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=700&q=90',
    'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=700&q=90',
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=700&q=90',
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 48, alignItems: 'center' }}>
      {/* Left: big photo in phone frame */}
      <div className="order-last md:order-first" style={{ position: 'relative' }}>
        <PhoneFrame>
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(_, info) => {
            if (info.offset.x < -50) setActive(Math.min(rsvpSteps.length - 1, active + 1))
            else if (info.offset.x > 50) setActive(Math.max(0, active - 1))
          }}
          style={{ position: 'relative', touchAction: 'pan-y' }}
        >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4 }}
            style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', aspectRatio: '9/19.5' }}
          >
            <img
              src={photos[active]}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div
              style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
                background: 'linear-gradient(to top, rgba(30,26,20,0.85) 0%, transparent 100%)',
              }}
            />
            {/* Overlay card */}
            {active === 0 && (
              <div style={{
                position: 'absolute', bottom: 20, left: 20, right: 20,
                background: 'rgba(255,255,255,0.97)', borderRadius: 14,
                padding: '16px 18px', backdropFilter: 'blur(8px)',
              }}>
                <h4 className="font-display" style={{ fontSize: 18, color: '#1e1a14', marginBottom: 4 }}>
                  Sofia & Marco
                </h4>
                <p style={{ fontSize: 12, color: '#7a6f63', marginBottom: 14 }}>14 Giugno 2025 · Villa Carminati</p>
                <div style={{
                  borderRadius: 9999, background: '#c9a96e', color: '#ffffff',
                  padding: '9px 0', textAlign: 'center', fontSize: 13, fontWeight: 700,
                }}>
                  Conferma la tua presenza
                </div>
              </div>
            )}
            {active === 1 && (
              <div style={{
                position: 'absolute', bottom: 20, left: 20, right: 20,
                background: 'rgba(255,255,255,0.97)', borderRadius: 14,
                padding: '16px 18px', backdropFilter: 'blur(8px)',
              }}>
                <h4 className="font-display" style={{ fontSize: 16, color: '#1e1a14', marginBottom: 12 }}>Conferma presenza</h4>
                {[{ label: 'Accompagnatori', val: '2' }, { label: 'Preferenze', val: 'Vegetariano' }].map(({ label, val }) => (
                  <div key={label} style={{ marginBottom: 8 }}>
                    <div style={{ fontSize: 10, color: '#a07838', fontWeight: 600, letterSpacing: '0.08em', marginBottom: 3 }}>{label}</div>
                    <div style={{ borderRadius: 7, border: '1px solid #e0d8cc', background: '#faf7f2', padding: '8px 10px', fontSize: 12, color: '#1e1a14' }}>{val}</div>
                  </div>
                ))}
                <div style={{
                  marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  borderRadius: 9999, background: '#c9a96e', color: '#ffffff',
                  padding: '9px 0', fontSize: 13, fontWeight: 700,
                }}>
                  <CheckCircle2 size={13} /> Confermo
                </div>
              </div>
            )}
            {active === 2 && (
              <div style={{
                position: 'absolute', bottom: 20, left: 20, right: 20,
                backdropFilter: 'blur(2px)',
              }}>
                <DashboardMock />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Photo arrow overlays */}
        <button
          onClick={() => setActive(Math.max(0, active - 1))}
          style={{
            position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
            width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(6px)',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#1e1a14', opacity: active === 0 ? 0.3 : 1,
            transition: 'opacity 0.2s', zIndex: 10,
          }}
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={() => setActive(Math.min(rsvpSteps.length - 1, active + 1))}
          style={{
            position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
            width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(6px)',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#1e1a14', opacity: active === rsvpSteps.length - 1 ? 0.3 : 1,
            transition: 'opacity 0.2s', zIndex: 10,
          }}
        >
          <ChevronRight size={16} />
        </button>

        {/* Dot indicators */}
        <div style={{
          position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', gap: 6, zIndex: 10,
        }}>
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: i === active ? 20 : 6, height: 6, borderRadius: 999,
                background: i === active ? '#ffffff' : 'rgba(255,255,255,0.5)',
                border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s',
              }}
            />
          ))}
        </div>
        </motion.div>
        </PhoneFrame>
      </div>

      {/* Right: steps */}
      <div>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          borderRadius: 9999, border: '1px solid rgba(201,169,110,0.4)',
          background: 'rgba(201,169,110,0.08)', padding: '6px 14px',
          fontSize: 11, fontWeight: 600, color: '#a07838', letterSpacing: '0.12em', marginBottom: 24,
        }}>
          <Lock size={10} /> Landing RSVP + Area Riservata
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 28 }}>
          {rsvpSteps.map((s, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                textAlign: 'left', padding: '16px 20px', borderRadius: 14,
                border: `1px solid ${i === active ? 'rgba(201,169,110,0.4)' : '#e0d8cc'}`,
                background: i === active ? 'rgba(201,169,110,0.06)' : '#ffffff',
                cursor: 'pointer', transition: 'all 0.25s', fontFamily: 'inherit',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: i === active ? 8 : 0 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: i === active ? '#a07838' : '#b5a898', letterSpacing: '0.1em', transition: 'color 0.2s' }}>
                  {s.number}
                </span>
                <span style={{ fontSize: 15, fontWeight: 600, color: i === active ? '#1e1a14' : '#7a6f63', transition: 'color 0.2s' }}>
                  {s.title}
                </span>
              </div>
              {i === active && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  style={{ fontSize: 13, color: '#7a6f63', lineHeight: 1.7, paddingLeft: 28 }}
                >
                  {s.description}
                </motion.p>
              )}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 10, paddingLeft: 20 }}>
          <button
            onClick={() => setActive(Math.max(0, active - 1))}
            disabled={active === 0}
            style={{
              width: 36, height: 36, borderRadius: '50%',
              border: '1px solid #e0d8cc', background: '#ffffff',
              color: active === 0 ? '#e0d8cc' : '#7a6f63',
              cursor: active === 0 ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => setActive(Math.min(rsvpSteps.length - 1, active + 1))}
            disabled={active === rsvpSteps.length - 1}
            style={{
              width: 36, height: 36, borderRadius: '50%',
              border: 'none',
              background: active === rsvpSteps.length - 1 ? '#e0d8cc' : '#c9a96e',
              color: '#ffffff',
              cursor: active === rsvpSteps.length - 1 ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────
export function InvitationShowcaseSection() {
  return (
    <section id="inviti" style={{ padding: 'clamp(64px, 8vw, 100px) 0', background: '#faf7f2' }}>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Save the Date ─────────────────────────────── */}
        <div style={{ marginBottom: 100 }}>
          <div style={{ marginBottom: 48 }}>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                display: 'inline-block', borderRadius: 9999,
                border: '1px solid rgba(201,169,110,0.4)', background: 'rgba(201,169,110,0.08)',
                padding: '6px 16px', fontSize: 11, fontWeight: 600, color: '#a07838',
                letterSpacing: '0.15em', textTransform: 'uppercase' as const, marginBottom: 16,
              }}
            >
              Save the Date
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 600, color: '#1e1a14', lineHeight: 1.1 }}
            >
              Annuncia il grande giorno
              <br />
              <span className="text-gradient-gold">con stile e semplicità</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <ImageStepper />
          </motion.div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'linear-gradient(to right, transparent, #e0d8cc, transparent)', marginBottom: 100 }} />

        {/* ── Landing RSVP ──────────────────────────────── */}
        <div>
          <div style={{ marginBottom: 48 }}>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                display: 'inline-block', borderRadius: 9999,
                border: '1px solid rgba(201,169,110,0.4)', background: 'rgba(201,169,110,0.08)',
                padding: '6px 16px', fontSize: 11, fontWeight: 600, color: '#a07838',
                letterSpacing: '0.15em', textTransform: 'uppercase' as const, marginBottom: 16,
              }}
            >
              Landing RSVP
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 600, color: '#1e1a14', lineHeight: 1.1 }}
            >
              Dashboard & Area Riservata
              <br />
              <span className="text-gradient-gold">tutto sotto controllo</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <RSVPStepper />
          </motion.div>
        </div>

      </div>
    </section>
  )
}

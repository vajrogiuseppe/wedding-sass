import { useEffect, useRef, useState } from 'react'
import confetti from 'canvas-confetti'
import { ArrowLeft, MapPin, CalendarPlus, Clock, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import LightRays from '@/components/ui/LightRays'

// ─── Personalizzazione ────────────────────────────────────────────────────────
const SEAL_BG       = '#c9a96e'
const SEAL_ACCENT   = '#a07838'
const SEAL_INITIALS = 'S & M'

const WEDDING = {
  date:     'Sabato 14 Giugno 2026',
  time:     'ore 16:00',
  location: 'Chiesa di Santa Maria Novella, Firenze',
  reception:'Villa Medici, Via della Petraia 40, Firenze',
  rsvpBy:   '30 Aprile 2026',
  rsvpMail: 'sofia.marco2026@gmail.com',
  mapsUrl:  'https://maps.google.com/?q=Piazza+Santa+Maria+Novella+Firenze',
  calTitle: 'Matrimonio Sofia & Marco',
  calDate:  '20260614',
  calEnd:   '20260614',
}

function buildGCalUrl() {
  return (
    'https://calendar.google.com/calendar/render?action=TEMPLATE' +
    `&text=${encodeURIComponent(WEDDING.calTitle)}` +
    `&dates=${WEDDING.calDate}/${WEDDING.calEnd}` +
    `&location=${encodeURIComponent(WEDDING.location)}`
  )
}

// ─── Letter cards data ────────────────────────────────────────────────────────
const LETTER_CARDS = [
  {
    id: 1,
    label: 'Save the Date',
    content: (
      <>
        <div className="lc-ornament top" />
        <p className="lc-label">Save the Date</p>
        <h2 className="font-display lc-names">
          Sofia <em className="lc-amp">&amp;</em> Marco
        </h2>
        <div className="lc-rule"><span /><span>✦</span><span /></div>
        <p className="font-display lc-date">{WEDDING.date}</p>
        <p className="lc-time">{WEDDING.time}</p>
        <p className="lc-loc">{WEDDING.location}</p>
        <div className="lc-btns">
          <a href={WEDDING.mapsUrl} target="_blank" rel="noopener noreferrer" className="lc-btn lc-outline">
            <MapPin size={10} /> Posizione
          </a>
          <a href={buildGCalUrl()} target="_blank" rel="noopener noreferrer" className="lc-btn lc-fill">
            <CalendarPlus size={10} /> Aggiungi al calendario
          </a>
        </div>
        <div className="lc-ornament bottom" />
      </>
    ),
  },
  
 
]

// ─── Drag helper ─────────────────────────────────────────────────────────────
function makeDraggable(el: HTMLElement) {
  el.style.cursor = 'grab'
  let ox = 0, oy = 0

  function onDown(e: MouseEvent | TouchEvent) {
    const isTouch = e instanceof TouchEvent
    const src = isTouch ? (e as TouchEvent).touches[0] : (e as MouseEvent)
    const t = (e as MouseEvent).target as HTMLElement
    if (t.tagName === 'A' || t.closest('a')) return

    // FIX: disable transition FIRST to prevent snap-back, then capture rect
    el.style.transition = 'none'
    const rect = el.getBoundingClientRect()
    el.style.position = 'fixed'
    el.style.left     = `${rect.left}px`
    el.style.top      = `${rect.top}px`
    el.style.transform = 'none'
    el.style.zIndex   = '300'
    el.style.cursor   = 'grabbing'
    ox = src.clientX - rect.left
    oy = src.clientY - rect.top

    const move = (ev: MouseEvent | TouchEvent) => {
      const p = ev instanceof TouchEvent ? ev.touches[0] : ev as MouseEvent
      el.style.left = `${p.clientX - ox}px`
      el.style.top  = `${p.clientY - oy}px`
    }
    const up = () => {
      el.style.cursor = 'grab'
      document.removeEventListener('mousemove', move as EventListener)
      document.removeEventListener('mouseup', up)
      document.removeEventListener('touchmove', move as EventListener)
      document.removeEventListener('touchend', up)
    }
    document.addEventListener('mousemove', move as EventListener)
    document.addEventListener('mouseup', up)
    document.addEventListener('touchmove', move as EventListener, { passive: false })
    document.addEventListener('touchend', up)
  }

  el.addEventListener('mousedown', onDown as EventListener)
  el.addEventListener('touchstart', onDown as EventListener, { passive: true })
}

// ─── Confetti burst ───────────────────────────────────────────────────────────
function fireConfetti() {
  const colors = ['#c9a96e', '#f5ede0', '#e8d5b0', '#ffffff', '#a07838', '#f0c070']
  confetti({ particleCount: 80, spread: 70, origin: { x: 0.5, y: 0.55 }, colors, scalar: 0.9 })
  setTimeout(() => confetti({ particleCount: 60, spread: 90, origin: { x: 0.3, y: 0.5 }, colors, scalar: 0.8 }), 200)
  setTimeout(() => confetti({ particleCount: 60, spread: 90, origin: { x: 0.7, y: 0.5 }, colors, scalar: 0.8 }), 350)
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function EnvelopePage() {
  const [opened, setOpened] = useState(false)
  const sectionRef  = useRef<HTMLElement>(null)
  const envelopeRef = useRef<HTMLDivElement>(null)
  const letterRefs  = useRef<(HTMLDivElement | null)[]>([])

  // Center letters horizontally + place them inside envelope on mount
  useEffect(() => {
    function init() {
      const section  = sectionRef.current
      const envelope = envelopeRef.current
      if (!section || !envelope) return
      const cx = section.offsetWidth / 2
      letterRefs.current.forEach((el) => {
        if (!el) return
        el.style.left = `${cx - el.offsetWidth / 2}px`
        el.style.top  = `${envelope.offsetTop + 10}px`
      })
    }
    init()
    window.addEventListener('resize', init)
    return () => window.removeEventListener('resize', init)
  }, [])

  function handleOpen() {
    if (opened) return
    setOpened(true)
    fireConfetti()

    const envelope = envelopeRef.current
    if (!envelope) return
    const riseAmount = envelope.offsetTop

    // Stagger each letter with slight horizontal offset + delay
    letterRefs.current.forEach((el, i) => {
      if (!el) return
      const delay = 450 + i * 160  // letters come out one after another
      const xOffset = (i - 1) * 14 // slight fan: -14, 0, +14 px

      setTimeout(() => {
        el.style.zIndex    = `${200 - i}`
        el.style.transition = `transform 0.85s cubic-bezier(0.22, 1, 0.36, 1)`
        el.style.transform  = `translateX(${xOffset}px) translateY(-${riseAmount}px)`

        // Enable drag after letter finishes rising
        setTimeout(() => makeDraggable(el), 900)
      }, delay)
    })
  }

  return (
    <>
      <Link to="/" className="ep-back">
        <ArrowLeft size={14} /> Home
      </Link>

      {/* LightRays background */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#c9a96e"
          raysSpeed={0.6}
          lightSpread={0.8}
          rayLength={2.5}
          followMouse={true}
          mouseInfluence={0.08}
          fadeDistance={0.9}
          saturation={0.7}
          pulsating={false}
        />
      </div>

      <section ref={sectionRef} className="cssletter">

        {/* ── Letters (z-index 1, behind envelope z-index 2) ─────────────── */}
        {LETTER_CARDS.map((card, i) => (
          <div
            key={card.id}
            ref={el => { letterRefs.current[i] = el }}
            className="ep-letter"
            style={{ zIndex: 1 }}
          >
            {card.content}
          </div>
        ))}

        {/* ── Envelope (z-index 2, covers letters) ──────────────────────── */}
        <div ref={envelopeRef} className={`envelope ${opened ? 'active' : ''}`}>

          <button className="seal-btn" aria-label="Apri la busta" onClick={handleOpen}>
            <svg viewBox="0 0 80 80" width="100%" height="100%" fill="none">
              <defs>
                <radialGradient id="sg" cx="38%" cy="32%">
                  <stop offset="0%" stopColor="rgba(255,240,170,0.35)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>
              {Array.from({ length: 22 }, (_, i) => {
                const a = (i / 22) * Math.PI * 2
                return <circle key={i} cx={40 + Math.cos(a) * 34} cy={40 + Math.sin(a) * 34} r="5" fill={SEAL_ACCENT} opacity="0.72" />
              })}
              <circle cx="40" cy="40" r="27" fill={SEAL_BG} />
              <circle cx="40" cy="40" r="27" fill="url(#sg)" />
              <circle cx="40" cy="40" r="20" fill={SEAL_ACCENT} />
              <text x="40" y="45" textAnchor="middle" fontSize="11" fontFamily="Georgia, serif" fontStyle="italic" fill="#fff8e8" letterSpacing="0.5">
                {SEAL_INITIALS}
              </text>
            </svg>
            <span className="seal-label">Apri</span>
          </button>

          <div className="envelope-flap" />
          <div className="envelope-folds">
            <div className="envelope-left" />
            <div className="envelope-right" />
            <div className="envelope-bottom" />
          </div>
        </div>

      </section>

      <style>{`
        body { background: #1a0a00; }

        .ep-back {
          position: fixed; top: 16px; left: 16px; z-index: 1000;
          display: flex; align-items: center; gap: 7px;
          font-size: 10px; font-weight: 600; letter-spacing: 0.12em;
          text-transform: uppercase; color: #a07838;
          text-decoration: none; opacity: 0.7; transition: opacity 0.2s;
        }
        .ep-back:hover { opacity: 1; }

        /* Section */
        .cssletter {
          position: relative;
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 6vh;
          user-select: none;
          -webkit-user-select: none;
          z-index: 1;
        }

        /* ── Letters: z-index 1, behind envelope ───────────────────────── */
        .ep-letter {
          position: absolute;
          z-index: 1;
          box-sizing: border-box;
          background: #fffdf8;
          box-shadow: inset 0 0 20px -6px #c9b894, 0 10px 40px rgba(0,0,0,0.35);
          padding: 1.4rem 1rem 1rem;
          text-align: center;
          display: flex; align-items: center;
          justify-content: center; flex-direction: column;
          cursor: default;
          /* mobile */
          width: min(260px, calc(100vw - 48px));
          height: calc(min(260px, calc(100vw - 48px)) * 0.85);
        }
        @media (min-width: 650px) {
          .ep-letter {
            width: 480px;
            height: calc(400px - 1.5rem - 10px);
            padding: 2rem 1.8rem 1.5rem;
          }
        }

        /* ── Envelope ──────────────────────────────────────────────────── */
        .envelope {
          position: relative;
          width: min(300px, calc(100vw - 32px));
          height: calc(min(300px, calc(100vw - 32px)) / 1.5);
          background: #f0e6d0;
          box-shadow: inset 0 0 30px -5px #c4a87a, 0 0 50vw 0 rgba(0,0,0,0.85);
          z-index: 2;
          flex-shrink: 0;
        }
        @media (min-width: 650px) {
          .envelope { width: 600px; height: 400px; }
        }

        /* Flap — identical to reference */
        .envelope-flap {
          width: 100%; height: 71%;
          position: absolute; top: 0; z-index: 3;
          overflow: hidden;
          transition: 0.6s linear all;
          transform-origin: top;
          pointer-events: all;
        }
        .envelope-flap::before,
        .envelope-left::before,
        .envelope-right::before,
        .envelope-bottom::before {
          content: "";
          transform: rotate(45deg);
          background: #f0e6d0;
          box-shadow: 0 0 30px -5px #c4a87a;
          width: 100%; aspect-ratio: 1;
          display: block; position: absolute; top: 60%;
        }
        .envelope-flap::before { border-radius: 5rem; bottom: 18%; top: auto; }
        @media (min-width: 650px) { .envelope-flap::before { bottom: 25%; } }
        .envelope-left::before  { top: 10%; left: -65%; }
        .envelope-right::before { top: 10%; right: -65%; }
        .envelope-bottom::before { top: 60%; border-radius: 5rem; }

        .envelope-folds {
          width: 100%; height: 100%; overflow: hidden; z-index: 2;
          position: absolute; inset: 0;
        }

        /* Active */
        .envelope.active * { pointer-events: none; }
        .envelope.active .envelope-flap {
          transform: rotateX(-180deg) translateY(0);
          perspective: 10px;
        }
        .envelope.active .envelope-flap::before { box-shadow: inset 0 0 30px -5px #c4a87a; }
        .envelope.active .seal-btn { display: none; }

        /* Seal */
        .seal-btn {
          z-index: 4; position: relative;
          box-shadow: none; border: none; background: transparent;
          width: clamp(55px, 20%, 100px); aspect-ratio: 1;
          left: 50%; top: 68%;
          transform: translate(-50%, -50%);
          cursor: pointer;
          display: flex; flex-direction: column;
          align-items: center; gap: 4px; padding: 0;
          transition: transform 0.2s;
        }
        .seal-btn:hover { transform: translate(-50%, -50%) scale(1.07); }
        .seal-btn:focus { outline: none; }
        .seal-label {
          font-size: 8px; font-weight: 600; color: ${SEAL_ACCENT};
          letter-spacing: 0.2em; text-transform: uppercase;
          white-space: nowrap; opacity: 0.8;
        }

        /* ── Letter card content ─────────────────────────────────────── */
        .lc-ornament.top { margin-bottom: 10px; }
        .lc-ornament.bottom { margin-top: 10px; }
        .lc-ornament.top::before, .lc-ornament.bottom::before {
          content: '';
          display: block;
          width: 60px; height: 1px;
          background: linear-gradient(to right, transparent, rgba(201,169,110,0.5), transparent);
          margin: 0 auto;
        }

        .lc-label {
          font-size: 7px; font-weight: 700; color: ${SEAL_ACCENT};
          letter-spacing: 0.45em; text-transform: uppercase; margin-bottom: 8px;
        }
        .lc-names {
          font-size: clamp(1.2rem, 5vw, 2.2rem);
          font-weight: 600; color: #1e1a14; line-height: 1.0; margin: 0 0 8px;
        }
        .lc-amp {
          display: inline; font-size: 0.5em; font-weight: 400;
          color: ${SEAL_BG}; letter-spacing: 0.3em; font-style: italic; margin: 0 6px;
        }
        .lc-rule {
          display: flex; align-items: center; justify-content: center;
          gap: 7px; margin-bottom: 10px;
        }
        .lc-rule span:first-child, .lc-rule span:last-child {
          display: block; height: 1px; width: 24px; background: rgba(160,120,56,0.35);
        }
        .lc-rule span:nth-child(2) { color: ${SEAL_BG}; font-size: 7px; }
        .lc-date { font-size: clamp(0.7rem, 2vw, 0.9rem); color: #5a4a35; font-style: italic; margin-bottom: 3px; }
        .lc-time { font-size: 8px; color: ${SEAL_ACCENT}; letter-spacing: 0.1em; margin-bottom: 8px; }
        .lc-loc  { font-size: 8px; color: #7a6e65; line-height: 1.6; margin-bottom: 10px; }

        .lc-btns { display: flex; gap: 6px; justify-content: center; flex-wrap: wrap; }
        .lc-btn {
          display: inline-flex; align-items: center; gap: 5px;
          border-radius: 9999px; padding: 6px 12px;
          font-size: 8px; font-weight: 700; letter-spacing: 0.05em;
          text-decoration: none; white-space: nowrap; transition: all 0.2s;
        }
        .lc-outline {
          border: 1px solid rgba(160,120,56,0.4);
          background: rgba(201,169,110,0.1); color: ${SEAL_ACCENT};
        }
        .lc-outline:hover { background: rgba(201,169,110,0.2); border-color: ${SEAL_BG}; }
        .lc-fill {
          background: ${SEAL_BG}; color: #0e0c0a;
          border: 1px solid transparent;
          box-shadow: 0 2px 10px rgba(201,169,110,0.35);
        }
        .lc-fill:hover { background: #e8d5b0; }

        /* Detail card */
        .lc-detail-row {
          display: flex; align-items: flex-start; gap: 10px;
          text-align: left; width: 100%; margin-bottom: 4px;
        }
        .lc-detail-title { font-size: 8px; font-weight: 700; color: ${SEAL_ACCENT}; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 2px; }
        .lc-detail-text  { font-size: 8px; color: #5a4a35; line-height: 1.55; }
        .lc-detail-sep   { width: 100%; height: 1px; background: rgba(201,169,110,0.2); margin: 8px 0; }
        .lc-detail-note  { font-size: 8px; color: #7a6e65; line-height: 1.6; text-align: center; }

        /* ── Mobile touch friendliness ───────────────────────────────── */
        @media (max-width: 649px) {
          .ep-letter { padding: 1.2rem 0.9rem 0.9rem; }
          .lc-names  { font-size: 1.4rem; }
        }
      `}</style>
    </>
  )
}

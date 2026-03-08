import { useRef, useState, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, Float, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from 'gsap'
import confetti from 'canvas-confetti'
import { Link } from 'react-router-dom'
import { ArrowLeft, MapPin, CalendarPlus, Clock, Heart } from 'lucide-react'

// ─── Wedding data ─────────────────────────────────────────────────────────────
const SEAL_INITIALS = 'S & M'
const WEDDING = {
  date:     'Sabato 14 Giugno 2026',
  time:     'ore 16:00',
  location: 'Chiesa di Santa Maria Novella, Firenze',
  reception:'Villa Medici, Via della Petraia 40, Firenze',
  rsvpBy:   '30 Aprile 2026',
  rsvpMail: 'sofia.marco2026@gmail.com',
  mapsUrl:  'https://maps.google.com/?q=Piazza+Santa+Maria+Novella+Firenze',
}
function buildGCalUrl() {
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Matrimonio Sofia & Marco')}&dates=20260614/20260614&location=${encodeURIComponent(WEDDING.location)}`
}

// ─── Envelope dimensions ──────────────────────────────────────────────────────
const EW = 2.4   // envelope width
const EH = 1.5   // envelope height
const ED = 0.01  // envelope depth (paper thin)

// ─── Reusable materials ───────────────────────────────────────────────────────
const CREAM    = '#f0e6d0'
const CREAM2   = '#e4d4b8'
const CREAM3   = '#d8c8a4'
const GOLD     = '#c9a96e'
const GOLD_D   = '#a07838'
const PAPER    = '#fffdf8'

// ─── Shape builders ───────────────────────────────────────────────────────────
function makeTriangle(ax: number, ay: number, bx: number, by: number, cx: number, cy: number) {
  const s = new THREE.Shape()
  s.moveTo(ax, ay); s.lineTo(bx, by); s.lineTo(cx, cy); s.closePath()
  return s
}

// ─── Envelope body parts ──────────────────────────────────────────────────────
function EnvelopeBody() {
  const halfW = EW / 2, halfH = EH / 2

  // Bottom fold triangle (V pointing up)
  const bottomShape = useMemo(() =>
    makeTriangle(-halfW, -halfH, 0, 0, halfW, -halfH), [halfW, halfH])

  // Left fold triangle
  const leftShape = useMemo(() =>
    makeTriangle(-halfW, -halfH, -halfW, halfH, 0, 0), [halfW, halfH])

  // Right fold triangle
  const rightShape = useMemo(() =>
    makeTriangle(halfW, -halfH, halfW, halfH, 0, 0), [halfW, halfH])

  return (
    <group>
      {/* Back panel */}
      <mesh position={[0, 0, -ED]}>
        <planeGeometry args={[EW, EH]} />
        <meshStandardMaterial color={CREAM3} roughness={0.85} metalness={0} />
      </mesh>

      {/* Inside (dark, visible once flap opens) */}
      <mesh position={[0, 0, -ED * 0.5]}>
        <planeGeometry args={[EW * 0.98, EH * 0.98]} />
        <meshStandardMaterial color="#2a1c0c" roughness={0.9} />
      </mesh>

      {/* Bottom fold */}
      <mesh position={[0, 0, ED]}>
        <shapeGeometry args={[bottomShape]} />
        <meshStandardMaterial color={CREAM2} roughness={0.8} side={THREE.DoubleSide} />
      </mesh>

      {/* Left fold */}
      <mesh position={[0, 0, ED * 2]}>
        <shapeGeometry args={[leftShape]} />
        <meshStandardMaterial color={CREAM} roughness={0.8} side={THREE.DoubleSide} />
      </mesh>

      {/* Right fold */}
      <mesh position={[0, 0, ED * 2]}>
        <shapeGeometry args={[rightShape]} />
        <meshStandardMaterial color={CREAM2} roughness={0.8} side={THREE.DoubleSide} />
      </mesh>

      {/* Seam line — thin dark line at fold edges */}
      <lineSegments position={[0, 0, ED * 2.5]}>
        <edgesGeometry args={[new THREE.PlaneGeometry(EW, EH)]} />
        <lineBasicMaterial color={CREAM3} transparent opacity={0.5} />
      </lineSegments>
    </group>
  )
}

// ─── Wax seal ─────────────────────────────────────────────────────────────────
function Seal({ visible, onClick }: { visible: boolean; onClick: () => void }) {
  const ref = useRef<THREE.Group>(null)
  const hovered = useRef(false)

  useFrame(() => {
    if (!ref.current) return
    const target = visible ? 1 : 0
    ref.current.scale.lerp(new THREE.Vector3(target, target, target), 0.12)
  })

  return (
    <group
      ref={ref}
      position={[0, -0.06, ED * 6]}
      onClick={e => { e.stopPropagation(); onClick() }}
      onPointerOver={() => { hovered.current = true; document.body.style.cursor = 'pointer' }}
      onPointerOut={() => { hovered.current = false; document.body.style.cursor = 'auto' }}
    >
      {/* Outer scallop petals */}
      {Array.from({ length: 20 }, (_, i) => {
        const a = (i / 20) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(a) * 0.28, Math.sin(a) * 0.28, 0]}>
            <circleGeometry args={[0.045, 8]} />
            <meshStandardMaterial color={GOLD_D} roughness={0.4} metalness={0.6} />
          </mesh>
        )
      })}
      {/* Main disc */}
      <mesh>
        <cylinderGeometry args={[0.22, 0.22, 0.025, 32]} />
        <meshStandardMaterial color={GOLD} roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Inner ring */}
      <mesh position={[0, 0, 0.01]}>
        <cylinderGeometry args={[0.16, 0.16, 0.02, 32]} />
        <meshStandardMaterial color={GOLD_D} roughness={0.25} metalness={0.8} />
      </mesh>
      {/* Initials as Html overlay */}
      <Html center style={{ pointerEvents: 'none', userSelect: 'none' }}>
        <div style={{
          fontFamily: 'Georgia, serif', fontStyle: 'italic',
          fontSize: 10, color: '#fff8e8', whiteSpace: 'nowrap',
          letterSpacing: '0.5px', textShadow: '0 1px 2px rgba(0,0,0,0.3)',
        }}>
          {SEAL_INITIALS}
        </div>
      </Html>
      {/* Click hint */}
      {visible && (
        <Html center position={[0, -0.38, 0]} style={{ pointerEvents: 'none' }}>
          <div style={{
            fontSize: 8, fontWeight: 700, color: GOLD_D,
            letterSpacing: '0.18em', textTransform: 'uppercase', whiteSpace: 'nowrap', opacity: 0.8,
          }}>
            clicca per aprire
          </div>
        </Html>
      )}
    </group>
  )
}

// ─── Top flap ─────────────────────────────────────────────────────────────────
function Flap({ opened }: { opened: boolean }) {
  const pivotRef = useRef<THREE.Group>(null)
  const halfW = EW / 2, halfH = EH / 2

  // Flap shape: triangle pointing down, base at top
  const flapShape = useMemo(() => {
    const s = new THREE.Shape()
    s.moveTo(-halfW, 0)
    s.lineTo(0, -halfH * 0.92)
    s.lineTo(halfW, 0)
    s.closePath()
    return s
  }, [halfW, halfH])

  // Flap back (dark inside, visible when rotated)
  const flapBackShape = useMemo(() => {
    const s = new THREE.Shape()
    s.moveTo(-halfW, 0)
    s.lineTo(0, -halfH * 0.92)
    s.lineTo(halfW, 0)
    s.closePath()
    return s
  }, [halfW, halfH])

  useFrame(() => {
    if (!pivotRef.current) return
    const targetX = opened ? -Math.PI : 0
    pivotRef.current.rotation.x += (targetX - pivotRef.current.rotation.x) * 0.055
  })

  return (
    // Pivot at the top edge of the envelope
    <group ref={pivotRef} position={[0, halfH, ED * 5]}>
      {/* Flap front face */}
      <mesh position={[0, -halfH * 0.46, 0]} rotation={[0, 0, 0]}>
        <shapeGeometry args={[flapShape]} />
        <meshStandardMaterial color={CREAM} roughness={0.75} side={THREE.FrontSide} />
      </mesh>
      {/* Flap back face (inside, dark) */}
      <mesh position={[0, -halfH * 0.46, -0.001]}>
        <shapeGeometry args={[flapBackShape]} />
        <meshStandardMaterial color="#1e1208" roughness={0.9} side={THREE.BackSide} />
      </mesh>
      {/* Crease line */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array([-halfW, -halfH * 0.46, 0.001, halfW, -halfH * 0.46, 0.001]), 3]}
            count={2}
          />
        </bufferGeometry>
        <lineBasicMaterial color={CREAM3} />
      </line>
    </group>
  )
}

// ─── Letter card (rises from inside envelope) ─────────────────────────────────
type LetterProps = {
  opened: boolean
  index: number
  total: number
  title: string
  children: React.ReactNode
}

function LetterCard({ opened, index, total, title, children }: LetterProps) {
  const groupRef = useRef<THREE.Group>(null)
  const xOffset = (index - (total - 1) / 2) * 0.08  // slight fan
  const targetY = opened ? 1.65 + index * 0.04 : -0.15
  const targetX = opened ? xOffset : 0
  const delay = index * 0.18  // stagger

  const startedRef = useRef(false)
  const timeRef = useRef(0)

  useFrame((_, delta) => {
    if (!groupRef.current) return
    if (opened && !startedRef.current) {
      timeRef.current += delta
      if (timeRef.current < delay) return
      startedRef.current = true
    }
    if (!opened) {
      startedRef.current = false
      timeRef.current = 0
    }
    const speed = 0.07
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * speed
    groupRef.current.position.x += (targetX - groupRef.current.position.x) * speed
    // Slight Z offset so cards fan
    const targetZ = opened ? (ED * 8 + index * 0.015) : ED * 3
    groupRef.current.position.z += (targetZ - groupRef.current.position.z) * speed
  })

  return (
    <group ref={groupRef} position={[0, -0.15, ED * 3]}>
      {/* Paper */}
      <mesh castShadow>
        <planeGeometry args={[EW * 0.82, EH * 1.05]} />
        <meshStandardMaterial color={PAPER} roughness={0.9} />
      </mesh>
      {/* Slight shadow border */}
      <mesh position={[0, 0, -0.001]}>
        <planeGeometry args={[EW * 0.84, EH * 1.07]} />
        <meshStandardMaterial color="#c0a870" transparent opacity={0.15} />
      </mesh>
      {/* Content via Html */}
      <Html
        center
        transform={false}
        style={{
          width: `${EW * 0.82 * 100}px`,
          pointerEvents: opened ? 'auto' : 'none',
          opacity: opened ? 1 : 0,
          transition: `opacity 0.4s ease ${delay + 0.3}s`,
        }}
      >
        <div className="letter3d-card">
          {children}
        </div>
      </Html>
    </group>
  )
}

// ─── Camera rig ───────────────────────────────────────────────────────────────
function CameraRig({ opened }: { opened: boolean }) {
  const { camera } = useThree()

  useFrame(() => {
    const targetZ = opened ? 3.8 : 3.2
    const targetY = opened ? 0.4 : 0.15
    camera.position.z += (targetZ - camera.position.z) * 0.025
    camera.position.y += (targetY - camera.position.y) * 0.025
    camera.lookAt(0, opened ? 0.3 : 0, 0)
  })
  return null
}

// ─── Main 3D scene ────────────────────────────────────────────────────────────
function Scene({ opened, onOpen }: { opened: boolean; onOpen: () => void }) {
  return (
    <>
      <CameraRig opened={opened} />

      {/* Lights */}
      <ambientLight intensity={0.4} color="#f5e8d0" />
      <directionalLight position={[3, 5, 4]} intensity={1.2} color="#fff5e0" castShadow />
      <pointLight position={[-3, 2, 2]} intensity={0.6} color="#c9a96e" />
      <pointLight position={[3, -2, 3]} intensity={0.3} color="#e8d5b0" />
      <spotLight position={[0, 6, 3]} angle={0.4} penumbra={0.8} intensity={0.8} color="#fff8ee" castShadow />

      <Float speed={1.2} rotationIntensity={0.06} floatIntensity={0.12} enabled={!opened}>
        <group rotation={[-0.08, 0.05, 0]}>
          {/* Envelope body */}
          <EnvelopeBody />

          {/* Letter cards — behind envelope, rise on open */}
          <LetterCard opened={opened} index={0} total={3} title="Save the Date">
            <div className="lc-ornament-top" />
            <p className="lc-label">Save the Date</p>
            <h2 className="font-display lc-names">Sofia <em className="lc-amp">&amp;</em> Marco</h2>
            <div className="lc-rule"><span /><span>✦</span><span /></div>
            <p className="font-display lc-date">{WEDDING.date}</p>
            <p className="lc-time">{WEDDING.time}</p>
            <p className="lc-loc">{WEDDING.location}</p>
            <div className="lc-btns">
              <a href={WEDDING.mapsUrl} target="_blank" rel="noopener noreferrer" className="lc-btn lc-outline"><MapPin size={10} /> Posizione</a>
              <a href={buildGCalUrl()} target="_blank" rel="noopener noreferrer" className="lc-btn lc-fill"><CalendarPlus size={10} /> Calendario</a>
            </div>
            <div className="lc-ornament-bottom" />
          </LetterCard>

          <LetterCard opened={opened} index={1} total={3} title="Dettagli">
            <div className="lc-ornament-top" />
            <p className="lc-label">Dettagli</p>
            <div className="lc-detail-row"><Clock size={11} style={{ color: '#c9a96e', flexShrink: 0 }} /><div><p className="lc-detail-title">Cerimonia</p><p className="lc-detail-text">{WEDDING.date} — {WEDDING.time}</p><p className="lc-detail-text">{WEDDING.location}</p></div></div>
            <div className="lc-detail-sep" />
            <div className="lc-detail-row"><Heart size={11} style={{ color: '#c9a96e', flexShrink: 0 }} /><div><p className="lc-detail-title">Ricevimento</p><p className="lc-detail-text">{WEDDING.reception}</p></div></div>
            <div className="lc-detail-sep" />
            <p className="lc-detail-note">Dress code: elegante. Vi chiediamo di evitare il bianco.</p>
            <div className="lc-ornament-bottom" />
          </LetterCard>

          <LetterCard opened={opened} index={2} total={3} title="RSVP">
            <div className="lc-ornament-top" />
            <p className="lc-label">RSVP</p>
            <Heart size={24} style={{ color: '#c9a96e', margin: '6px auto 10px', display: 'block' }} />
            <p className="lc-detail-note">Conferma la tua presenza entro il</p>
            <p className="font-display lc-date" style={{ margin: '6px 0 12px' }}>{WEDDING.rsvpBy}</p>
            <a href={`mailto:${WEDDING.rsvpMail}`} className="lc-btn lc-fill" style={{ margin: '0 auto' }}>{WEDDING.rsvpMail}</a>
            <div className="lc-ornament-bottom" />
          </LetterCard>

          {/* Flap */}
          <Flap opened={opened} />

          {/* Seal */}
          <Seal visible={!opened} onClick={onOpen} />
        </group>
      </Float>
    </>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function EnvelopePage3D() {
  const [opened, setOpened] = useState(false)

  function handleOpen() {
    if (opened) return
    setOpened(true)
    const colors = ['#c9a96e', '#f5ede0', '#e8d5b0', '#ffffff', '#a07838']
    confetti({ particleCount: 80, spread: 70, origin: { x: 0.5, y: 0.55 }, colors, scalar: 0.9 })
    setTimeout(() => confetti({ particleCount: 50, spread: 90, origin: { x: 0.3, y: 0.5 }, colors }), 220)
    setTimeout(() => confetti({ particleCount: 50, spread: 90, origin: { x: 0.7, y: 0.5 }, colors }), 380)
  }

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#0e0c0a', overflow: 'hidden', position: 'relative' }}>
      <Link to="/" style={{
        position: 'fixed', top: 20, left: 20, zIndex: 10,
        display: 'flex', alignItems: 'center', gap: 8,
        fontSize: 10, fontWeight: 600, letterSpacing: '0.12em',
        textTransform: 'uppercase', color: '#a07838',
        textDecoration: 'none', opacity: 0.75, transition: 'opacity 0.2s',
      }}
        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1' }}
        onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.75' }}
      >
        <ArrowLeft size={14} /> Home
      </Link>

      <Link to="/busta" style={{
        position: 'fixed', top: 20, right: 20, zIndex: 10,
        fontSize: 10, fontWeight: 600, letterSpacing: '0.12em',
        textTransform: 'uppercase', color: '#a07838',
        textDecoration: 'none', opacity: 0.6,
      }}>
        ← versione 2D
      </Link>

      <Canvas
        camera={{ position: [0, 0.15, 3.2], fov: 45 }}
        shadows
        gl={{ antialias: true, alpha: false }}
        style={{ background: '#0e0c0a' }}
      >
        <color attach="background" args={['#0e0c0a']} />
        <fog attach="fog" args={['#0e0c0a', 8, 20]} />
        <Scene opened={opened} onOpen={handleOpen} />
      </Canvas>

      <style>{`
        /* Letter card content styles — injected into Html portal */
        .letter3d-card {
          font-family: 'Manrope', sans-serif;
          background: #fffdf8;
          width: 240px;
          padding: 18px 16px 14px;
          text-align: center;
          display: flex; flex-direction: column;
          align-items: center;
          box-sizing: border-box;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        }
        @media (min-width: 650px) { .letter3d-card { width: 340px; padding: 22px 22px 18px; } }

        .lc-ornament-top, .lc-ornament-bottom {
          width: 80px; height: 1px;
          background: linear-gradient(to right, transparent, rgba(201,169,110,0.5), transparent);
          margin: 0 auto 10px;
        }
        .lc-ornament-bottom { margin: 10px auto 0; }

        .lc-label {
          font-size: 7px; font-weight: 700; color: #a07838;
          letter-spacing: 0.45em; text-transform: uppercase; margin-bottom: 8px;
        }
        .lc-names {
          font-family: 'Vidaloka', serif;
          font-size: clamp(1.1rem, 4vw, 1.8rem);
          font-weight: 600; color: #1e1a14; line-height: 1.0; margin: 0 0 8px;
        }
        .lc-amp {
          font-size: 0.5em; font-weight: 400; color: #c9a96e;
          letter-spacing: 0.3em; font-style: italic; margin: 0 5px;
        }
        .lc-rule {
          display: flex; align-items: center; justify-content: center;
          gap: 7px; margin-bottom: 10px;
        }
        .lc-rule span:first-child, .lc-rule span:last-child {
          display: block; height: 1px; width: 22px; background: rgba(160,120,56,0.35);
        }
        .lc-rule span:nth-child(2) { color: #c9a96e; font-size: 7px; }
        .lc-date { font-size: clamp(0.65rem, 1.5vw, 0.85rem); color: #5a4a35; font-style: italic; margin-bottom: 3px; font-family: 'Vidaloka', serif; }
        .lc-time { font-size: 8px; color: #a07838; letter-spacing: 0.1em; margin-bottom: 8px; }
        .lc-loc  { font-size: 8px; color: #7a6e65; line-height: 1.6; margin-bottom: 10px; }

        .lc-btns { display: flex; gap: 6px; justify-content: center; flex-wrap: wrap; }
        .lc-btn {
          display: inline-flex; align-items: center; gap: 4px;
          border-radius: 9999px; padding: 5px 10px;
          font-size: 8px; font-weight: 700; letter-spacing: 0.05em;
          text-decoration: none; white-space: nowrap; transition: all 0.2s;
        }
        .lc-outline {
          border: 1px solid rgba(160,120,56,0.4);
          background: rgba(201,169,110,0.1); color: #a07838;
        }
        .lc-outline:hover { background: rgba(201,169,110,0.2); }
        .lc-fill {
          background: #c9a96e; color: #0e0c0a;
          border: 1px solid transparent;
          box-shadow: 0 2px 8px rgba(201,169,110,0.35);
        }
        .lc-fill:hover { background: #e8d5b0; }

        .lc-detail-row {
          display: flex; align-items: flex-start; gap: 8px;
          text-align: left; width: 100%; margin-bottom: 4px;
        }
        .lc-detail-title { font-size: 7px; font-weight: 700; color: #a07838; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 2px; }
        .lc-detail-text  { font-size: 7.5px; color: #5a4a35; line-height: 1.5; }
        .lc-detail-sep   { width: 100%; height: 1px; background: rgba(201,169,110,0.2); margin: 7px 0; }
        .lc-detail-note  { font-size: 7.5px; color: #7a6e65; line-height: 1.6; text-align: center; }
      `}</style>
    </div>
  )
}

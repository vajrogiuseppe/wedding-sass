import { useRef, useState } from 'react'

interface TiltedCardProps {
  imageSrc: string
  altText?: string
  title: string
  subtitle?: string
  captionText?: string
  demoUrl?: string
  rotateAmplitude?: number
  scaleOnHover?: number
}

export function TiltedCard({
  imageSrc,
  altText = '',
  title,
  subtitle,
  captionText,
  demoUrl,
  rotateAmplitude = 10,
  scaleOnHover = 1.03,
}: TiltedCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const ox = e.clientX - rect.left - rect.width / 2
    const oy = e.clientY - rect.top - rect.height / 2
    setRotateX((oy / (rect.height / 2)) * -rotateAmplitude)
    setRotateY((ox / (rect.width / 2)) * rotateAmplitude)
  }

  return (
    <div
      ref={ref}
      style={{ perspective: '900px', cursor: 'default', height: '100%', width: '100%' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setRotateX(0); setRotateY(0) }}
    >
      <div
        style={{
          /* same height as sibling cards */
          height: '100%',
          display: 'flex',
          flexDirection: 'column',

          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${isHovered ? scaleOnHover : 1})`,
          transition: isHovered
            ? 'transform 0.08s linear, box-shadow 0.2s, border-color 0.2s'
            : 'transform 0.45s cubic-bezier(0.23,1,0.32,1), box-shadow 0.35s, border-color 0.35s',
          borderRadius: 20,
          overflow: 'hidden',
          /* Hero palette: deep indigo border */
          border: isHovered
            ? '1px solid rgba(255,255,255,0.25)'
            : '1px solid rgba(43,95,236,0.22)',
          boxShadow: isHovered
            ? '0 24px 60px rgba(0,0,0,0.6), 0 0 32px rgba(66,16,202,0.18)'
            : '0 6px 28px rgba(0,0,0,0.45)',
          /* Hero palette bg: deep indigo-navy */
          background: 'linear-gradient(160deg, #0d0a1e 0%, #0a0615 100%)',
        }}
      >
        {/* Image */}
        <div style={{ position: 'relative', height: 260, flexShrink: 0, overflow: 'hidden' }}>
          <img
            src={imageSrc}
            alt={altText || title}
            draggable={false}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            loading="lazy"
          />
          {/* gradient overlay — hero indigo tones */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(10,6,21,1) 0%, rgba(13,10,30,0.45) 55%, transparent 100%)',
          }} />
          {/* subtle blue shimmer top-right */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse 60% 40% at 80% 10%, rgba(43,95,236,0.14) 0%, transparent 70%)',
          }} />
        </div>

        {/* Content — grows to fill card */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '18px 20px 22px',
        }}>
          {subtitle && (
            <span style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: 'rgba(245,240,232,0.7)', fontFamily: 'inherit',
              display: 'block', marginBottom: 8,
            }}>
              {subtitle}
            </span>
          )}

          <h3 className="font-display" style={{
            fontSize: 'clamp(1.05rem, 1.8vw, 1.35rem)',
            fontWeight: 600, color: '#f5f0e8', lineHeight: 1.2,
            marginBottom: captionText ? 6 : 0,
          }}>
            {title}
          </h3>

          {captionText && (
            <p style={{
              fontSize: 12,
              color: 'rgba(180,170,220,0.5)', /* hero lavender tone */
              marginBottom: 0,
            }}>
              {captionText}
            </p>
          )}

          {/* Spacer pushes CTA to bottom */}
          <div style={{ flex: 1 }} />

          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                borderRadius: 9999, background: 'linear-gradient(135deg, #6d28d9, #9333ea)',
                padding: '9px 20px', fontSize: 12, fontWeight: 700,
                color: '#fff', textDecoration: 'none',
                transition: 'background 0.2s',
                alignSelf: 'flex-start',
                marginTop: 16,
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'linear-gradient(135deg, #5b21b6, #7c3aed)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'linear-gradient(135deg, #6d28d9, #9333ea)')}
            >
              Guarda Demo
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M1 10L10 1M10 1H3M10 1V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

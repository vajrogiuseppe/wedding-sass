import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Ballpit from '@/components/ui/Ballpit'
import GradienText from '@/components/ui/GradienText'

const people = [
  {
    name: 'Sofia',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80',
  },
  {
    name: 'Marco',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80',
  },
  {
    name: 'Anna',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80',
  },
  {
    name: 'Luca',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80',
  },
  {
    name: 'Giulia',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80',
  },
]

export function MarketingHeroSection() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 300)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        background: '#151515',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Ballpit background — full canvas, mouse interaction preserved */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <Ballpit
          count={100}
          gravity={0.7}
          friction={1}
          wallBounce={1}
          followCursor={false}
          colors={[0xc9a96e, 0xe8d5b0, 0xd4a854, 0xa07838, 0xf0e0c0, 0xb8904e]}
          minSize={0.3}
          maxSize={0.9}
        />
      </div>

      {/* Warm overlay — keeps text readable, pointer-events none so mouse reaches canvas */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: 'rgba(14,12,10,0.62)',
        }}
      />
      {/* Extra center softening — cream warmth over balls */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(246, 174, 18, 0.04) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          padding: '0 24px',
          maxWidth: '100%',
          margin: '0 auto',
        }}
      >
        {/* Payoff small */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            fontSize: 11,
            fontWeight: 700,
            textTransform: 'uppercase',
            color: '#c9a96e',
            marginBottom: 28,
          }}
          className="font-mono"
        >
          La piattaforma per inviti digitali da matrimonio
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display titlehero"
          style={{
            fontSize: 'clamp(2rem, 10vw, 5rem)',
            fontWeight: 600,
            color: '#f5f0e8',
            lineHeight: 1.0,
            marginBottom: 24,
          }}
          
        >
          <GradienText>
          Il giorno più bello
          <br />
          <span className="text-gradient-gold" style={{ fontStyle: 'italic' }}>
            merita un invito perfetto.
          </span>
          </GradienText>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          style={{
            fontSize: 17,
            lineHeight: 1.75,
            color: '#fff',
            maxWidth: 520,
            margin: '0 auto 48px',
          }}
        >
          Crea in pochi minuti un invito digitale elegante con RSVP integrato,
          gestione ospiti e un link unico da condividere ovunque.
        </motion.p>

        {/* Avatar circles + social proof */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
            marginBottom: 44,
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {people.map((p, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10, scale: 1.15, zIndex: 10 }}
                transition={{ type: 'spring', stiffness: 500, damping: 22 }}
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid rgba(201,169,110,0.5)',
                  marginLeft: i > 0 ? -12 : 0,
                  position: 'relative',
                  zIndex: people.length - i,
                  boxShadow: '0 0 0 2px #0e0c0a',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                <img
                  src={p.avatar}
                  alt={p.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: '#fff', textAlign: 'left' }}>
            <span style={{ color: '#f5f0e8', fontWeight: 600 }}>50+ coppie</span> hanno già
            <br />
            scelto inviti.studio
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 14,
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={() =>
              document.querySelector('#come-funziona')?.scrollIntoView({ behavior: 'smooth' })
            }
            style={{
              borderRadius: 9999,
              background: 'transparent',
              color: '#fffff0e8',
              padding: '13px 32px',
              fontSize: 15,
              fontWeight: 500,
              border: '1px solid #fffff0e8',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#5a5248'
              e.currentTarget.style.color = '#f5f0e8'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#2e2820'
              e.currentTarget.style.color = '#9a8e83'
            }}
          >
            Scopri di più
          </button>

          <button
            onClick={() =>
              document.querySelector('#contatti')?.scrollIntoView({ behavior: 'smooth' })
            }
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              borderRadius: 9999,
              background: '#c9a96e',
              color: '#0e0c0a',
              padding: '13px 32px',
              fontSize: 15,
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 28px rgba(201,169,110,0.35)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#e8d5b0'
              e.currentTarget.style.boxShadow = '0 4px 36px rgba(201,169,110,0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#c9a96e'
              e.currentTarget.style.boxShadow = '0 4px 28px rgba(201,169,110,0.35)'
            }}
          >
            Inizia subito il tuo invito <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 120,
          pointerEvents: 'none',
          background: 'linear-gradient(to bottom, transparent, #0e0c0a)',
        }}
      />
    </section>
  )
}

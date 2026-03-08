import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import NoiseMaskHeroNew from '@/components/NoiseMaskHeroNew'

export function HeroSection() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 2100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: '#eeeeee' }}>

      <NoiseMaskHeroNew
        imageUrl="https://assets.unicorn.studio/images/d86YggFJjQTQnc3f9iBINHmvAMJ3/remix_16453%20(1).jpg"
        titleLines={['Where Purpose', 'Gathers.']}
        subtitle="Asterisk Digital is a lifelong learning community for people who are changing the face of venture capital."
      />

      {/* CTA button — appears after ellipse animation (~2.1s) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: show ? 1 : 0, y: show ? 0 : 10 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ position: 'absolute', top: '71%', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}
      >
        <button
          onClick={() => document.querySelector('#contatti')?.scrollIntoView({ behavior: 'smooth' })}
          style={{
            background: '#292929',
            color: '#f5f0e8',
            borderRadius: 9999,
            padding: '12px 32px',
            fontSize: 14,
            fontWeight: 500,
            border: 'none',
            cursor: 'pointer',
            letterSpacing: '0.01em',
          }}
        >
          Crea il tuo invito
        </button>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: show ? 0.6 : 0 }}
        transition={{ delay: 0.5 }}
        onClick={() => document.querySelector('#come-funziona')?.scrollIntoView({ behavior: 'smooth' })}
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          color: '#888',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <span style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Scorri</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
          <ArrowDown size={16} />
        </motion.div>
      </motion.button>

    </section>
  )
}

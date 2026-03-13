import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import NoiseMaskHeroNew from '@/components/NoiseMaskHeroNew'
import StarBorder from '@/components/ui/StarBorder'

export function HeroSection() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 2100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section style={{ position: 'relative', width: '100%', height: '100svh', overflow: 'hidden', background: '#eeeeee' }}>

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
        <StarBorder
          color="#c9a96e"
          speed="4s"
          thickness={1}
          onClick={() => document.querySelector('#contatti')?.scrollIntoView({ behavior: 'smooth' })}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
        >
          <span style={{
            display: 'block', background: '#292929', color: '#f5f0e8',
            padding: '11px 32px', fontSize: 14, fontWeight: 500,
            letterSpacing: '0.01em', borderRadius: 9999,
          }}>
            Crea il tuo invito
          </span>
        </StarBorder>
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

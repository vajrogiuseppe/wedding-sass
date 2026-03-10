import { motion } from 'framer-motion'
import { CurvedGallery } from '@/components/ui/CurvedGallery'
import GradienText from '@/components/ui/GradienText'

const showcaseItems = [
  {
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    text: 'Moderno Premium',
    title: 'Giuseppe & Maria',
    subtitle: 'Moderno Premium',
    caption: '28 Giugno 2027 · 124 ospiti',
    demoUrl: 'https://giuseppevajro.it/invito/',
  },
  {
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80',
    text: 'Boho Romantico',
    title: 'Anna & Luca',
    subtitle: 'Boho Romantico',
    caption: '7 Settembre 2025 · 86 ospiti',
    demoUrl: '',
  },
  {
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
    text: 'Rustico Toscano',
    title: 'Giulia & Francesco',
    subtitle: 'Rustico Toscano',
    caption: '23 Maggio 2025 · 210 ospiti',
    demoUrl: '',
  },
  {
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80',
    text: 'Minimal Moderno',
    title: 'Martina & Roberto',
    subtitle: 'Minimal Moderno',
    caption: '12 Luglio 2025 · 68 ospiti',
    demoUrl: '',
  },
  {
    image: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80',
    text: 'Grandioso Storico',
    title: 'Chiara & Davide',
    subtitle: 'Grandioso Storico',
    caption: '4 Ottobre 2025 · 180 ospiti',
    demoUrl: '',
  },
  {
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80',
    text: 'Giardino Segreto',
    title: 'Laura & Andrea',
    subtitle: 'Giardino Segreto',
    caption: '28 Agosto 2025 · 95 ospiti',
    demoUrl: '',
  },
]

export function FeaturesSection() {
  return (
    <section
      id="showcase"
      style={{ position: 'relative', background: 'transparent', paddingTop: 100 }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', padding: '0 24px', marginBottom: 16 }}>
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            display: 'inline-block', borderRadius: 9999,
            border: '1px solid rgba(201,169,110,0.3)', background: 'rgba(201,169,110,0.08)',
            padding: '6px 16px', fontSize: 11, fontWeight: 600, color: '#c9a96e',
            letterSpacing: '0.15em', textTransform: 'uppercase' as const, marginBottom: 20,
          }}
        >
          Showcase
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display"
          style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: 600, color: '#f5f0e8', lineHeight: 1.1, marginBottom: 12 }}
        >
          Inviti che lasciano
          <br />
          <GradienText colors={['#faf6f0', '#f79adb', '#cf8300']}>
            <span style={{ fontStyle: 'italic' }}>il segno.</span>
          </GradienText>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: 15, color: 'rgba(245,240,232,0.45)' }}
        >
          Trascina per esplorare. Ogni template è completamente personalizzabile.
        </motion.p>
      </div>

      {/* Curved Gallery */}
      <CurvedGallery
        items={showcaseItems}
        bendPx={60}
        scrollSpeed={2.2}
        scrollEase={0.065}
        initialOffset={-198}
      />

      <div style={{ paddingBottom: 80 }} />
    </section>
  )
}

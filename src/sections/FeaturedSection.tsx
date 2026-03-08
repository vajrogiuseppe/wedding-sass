import { useCallback } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, CheckCircle2, BarChart3, Link, Bell, MapPin, Image, Smartphone } from 'lucide-react'

const features = [
  {
    Icon: Sparkles,
    title: 'Design elegante',
    description: 'Oltre 20 template raffinati ispirati ai migliori matrimoni italiani. Ogni stile curato nei dettagli.',
  },
  {
    Icon: CheckCircle2,
    title: 'RSVP integrato',
    description: 'Form di conferma personalizzabile con domande su accompagnatori e preferenze alimentari.',
  },
  {
    Icon: BarChart3,
    title: 'Dashboard live',
    description: "Monitora confermati, in attesa e declinati in tempo reale da un'area riservata sicura.",
  },
  {
    Icon: Link,
    title: 'Link personalizzato',
    description: 'Un URL unico da condividere via WhatsApp, email o social. Accessibile su qualsiasi dispositivo.',
  },
  {
    Icon: Bell,
    title: 'Notifiche istantanee',
    description: 'Ricevi una notifica ad ogni conferma. Non ti perdi nessuna risposta degli ospiti.',
  },
  {
    Icon: MapPin,
    title: 'Mappa integrata',
    description: 'Location con mappa interattiva, indicazioni stradali e info sul parcheggio.',
  },
  {
    Icon: Image,
    title: 'Gallery fotografica',
    description: 'Aggiungi le vostre foto più belle in una gallery elegante visibile a tutti gli ospiti.',
  },
  {
    Icon: Smartphone,
    title: 'Mobile first',
    description: 'Ottimizzato per smartphone. Nessuna app da installare: si apre nel browser in un secondo.',
  },
]

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onMouseMove={handleMouseMove}
      className="spotlight-card"
      style={{
        background: '#ffffff',
        border: '1px solid #e0d8cc',
        borderRadius: 18,
        padding: '28px 24px',
        cursor: 'default',
        transition: 'box-shadow 0.2s, border-color 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(30,26,20,0.1)'
        e.currentTarget.style.borderColor = 'rgba(201,169,110,0.4)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.borderColor = '#e0d8cc'
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          border: '1.5px solid rgba(201,169,110,0.5)',
          background: 'rgba(201,169,110,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 16,
        }}
      >
        <feature.Icon size={20} color="#a07838" />
      </div>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1e1a14', marginBottom: 8, lineHeight: 1.3 }}>
        {feature.title}
      </h3>
      <p style={{ fontSize: 13, color: '#7a6f63', lineHeight: 1.7, margin: 0 }}>
        {feature.description}
      </p>
    </motion.div>
  )
}

export function FeaturedSection() {
  return (
    <section id="funzionalita" style={{ padding: 'clamp(64px, 8vw, 100px) 0', background: '#f5f0e8' }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              display: 'inline-block',
              borderRadius: 9999,
              border: '1px solid rgba(201,169,110,0.4)',
              background: 'rgba(201,169,110,0.08)',
              padding: '6px 16px',
              fontSize: 11,
              fontWeight: 600,
              color: '#a07838',
              letterSpacing: '0.15em',
              textTransform: 'uppercase' as const,
              marginBottom: 16,
            }}
          >
            Funzionalità
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display"
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              fontWeight: 600,
              color: '#1e1a14',
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            Tutto quello che serve,
            <br />
            <span className="text-gradient-gold">niente di superfluo</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ fontSize: 15, color: '#7a6f63', maxWidth: 420, margin: '0 auto' }}
          >
            Ogni funzione è pensata per rendere il vostro invito digitale unico e la gestione ospiti semplice.
          </motion.p>
        </div>

        {/* 4×2 grid */}
        <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: 16 }}>
          {features.map((feature, i) => (
            <FeatureCard key={i} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

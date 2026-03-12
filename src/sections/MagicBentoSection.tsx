import { motion } from 'framer-motion'
import GradienText from '@/components/ui/GradienText'
import { FadeContent } from '@/components/ui/FadeContent'

const features = [
  {
    label: 'Template',
    title: 'Layout esclusivi',
    description: 'Scegli tra i nostri template curati dai nostri designer. Ogni stile è pensato per essere elegante e unico.',
    glow: 'rgba(147,51,234,0.18)',
  },
  {
    label: 'Personalizzazione',
    title: 'Fatto da noi per voi',
    description: 'Inviaci i materiali e personalizziamo tutto: colori, font, testi e foto. Zero stress per voi.',
    glow: 'rgba(247,154,219,0.18)',
  },
  {
    label: 'Velocità',
    title: 'Pronto in 48 ore',
    description: "Dall'invio dei materiali alla consegna del link: massimo 48 ore. Con approvazione finale sempre vostra.",
    glow: 'rgba(207,131,0,0.16)',
  },
  {
    label: 'Dashboard',
    title: 'Gestione ospiti',
    description: "RSVP integrato, preferenze alimentari, lista ospiti e posti a sedere — tutto in un'unica dashboard live.",
    glow: 'rgba(147,51,234,0.14)',
  },
  {
    label: 'Condivisione',
    title: 'Link & QR Code',
    description: 'Un link unico da condividere via WhatsApp, email o social. QR code stampabile incluso per le partecipazioni cartacee.',
    glow: 'rgba(247,154,219,0.14)',
  },
  {
    label: 'Automatico',
    title: 'Notifiche automatiche',
    description: 'Reminder e aggiornamenti inviati automaticamente agli ospiti. Niente più telefonate di conferma.',
    glow: 'rgba(207,131,0,0.14)',
  },
]

export function MagicBentoSection() {
  return (
    <section id="funzionalita" style={{ padding: '100px 0', background: '#f5f0e8', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle background glows */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {[
          { top: '-10%', left: '5%', w: 500, c: 'rgba(147,51,234,0.07)' },
          { top: '60%', right: '3%', w: 420, c: 'rgba(201,169,110,0.09)' },
          { top: '25%', left: '42%', w: 380, c: 'rgba(236,72,153,0.06)' },
        ].map((g, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: g.top,
              left: (g as any).left,
              right: (g as any).right,
              width: g.w,
              height: g.w,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${g.c} 0%, transparent 70%)`,
              filter: 'blur(60px)',
            }}
          />
        ))}
      </div>

      <FadeContent blur duration={800} style={{ position: 'relative', zIndex: 1 }} className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Header */}
        <div style={{ marginBottom: 64, textAlign: 'center' }}>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              display: 'inline-block',
              borderRadius: 9999,
              border: '1px solid rgba(201,169,110,0.3)',
              background: 'rgba(201,169,110,0.08)',
              padding: '6px 16px',
              fontSize: 11,
              fontWeight: 600,
              color: '#c9a96e',
              letterSpacing: '0.15em',
              textTransform: 'uppercase' as const,
              marginBottom: 20,
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
              fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
              fontWeight: 600,
              color: '#1e1a14',
              lineHeight: 1.1,
            }}
          >
            Tutto ciò che serve
            <br />
            <GradienText colors={['#1e1a14', '#f79adb', '#cf8300']}>
              <span style={{ fontStyle: 'italic' }}>in un unico servizio.</span>
            </GradienText>
          </motion.h2>
        </div>

        {/* Feature grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
            gap: 20,
          }}
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              className="bento-card"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
                e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
                e.currentTarget.style.setProperty('--glow-color', f.glow)
              }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              style={{
                borderRadius: 20,
                padding: '32px 28px',
                background: '#fff',
                border: '1px solid rgba(30,26,20,0.08)',
                boxShadow: '0 2px 12px rgba(30,26,20,0.05)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Label */}
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: '#b5a898',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase' as const,
                  display: 'block',
                  marginBottom: 10,
                }}
              >
                {f.label}
              </span>

              {/* Title */}
              <h3
                className="font-display"
                style={{
                  fontSize: 20,
                  fontWeight: 600,
                  color: '#1e1a14',
                  margin: '0 0 12px',
                  lineHeight: 1.2,
                }}
              >
                {f.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: 14,
                  color: '#7a6f63',
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>
      </FadeContent>
    </section>
  )
}

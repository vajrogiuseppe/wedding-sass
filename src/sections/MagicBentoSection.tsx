import { motion } from 'framer-motion'
import MagicBento from '@/components/ui/MagicBento'
import GradienText from "@/components/ui/GradienText";

const cards = [
  {
    color: '#0a0a0f',
    label: 'Eleganza',
    title: 'Design personalizzato',
    description: 'Template esclusivi realizzati da designer. Font, colori, layout — ogni dettaglio rispecchia il vostro stile unico.',
  },
  {
    color: '#0a0a0f',
    label: 'Real-time',
    title: 'RSVP integrato',
    description: 'Conferme di presenza digitali in tempo reale. Niente più telefonate.',
  },
  {
    color: '#0a0a0f',
    label: 'Condivisione',
    title: 'Link & QR Code',
    description: 'Un link unico da condividere via WhatsApp, email o social. QR code stampabile incluso.',
  },
  {
    color: '#0a0a0f',
    label: 'Dashboard',
    title: 'Gestione ospiti',
    description: 'Dashboard completa per gestire conferme, lista ospiti, intolleranze e posti a sedere — tutto in un posto.',
  },
  {
    color: '#0a0a0f',
    label: 'Automatico',
    title: 'Notifiche automatiche',
    description: 'Reminder e aggiornamenti inviati automaticamente agli ospiti.',
  },
  {
    color: '#0a0a0f',
    label: 'Ovunque',
    title: 'Multicanale',
    description: 'WhatsApp, email, Instagram. Il vostro invito raggiunge gli ospiti dove preferiscono.',
  },
]

export function MagicBentoSection() {
  return (
    <section id="funzionalita" style={{ padding: '120px 0', background: '#f5f0e8', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'relative', zIndex: 1 }} className="mx-auto max-w-6xl px-6 lg:px-8">
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
            <GradienText colors={["#faf6f0", "#f79adb", "#cf8300"]}>
            <span style={{ fontStyle: "italic" }}>
              merita un invito perfetto.
            </span>
          </GradienText>
          </motion.h2>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <MagicBento
            cards={cards}
            textAutoHide={true}
            enableStars
            enableSpotlight
            enableBorderGlow={true}
            enableTilt={false}
            clickEffect
            spotlightRadius={400}
            particleCount={12}
            glowColor="201, 169, 110"
          />
        </div>
      </div>
    </section>
  )
}

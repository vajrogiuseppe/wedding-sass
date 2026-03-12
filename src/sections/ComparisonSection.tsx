import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import GradienText from '@/components/ui/GradienText'
import { FadeContent } from '@/components/ui/FadeContent'

const rows = [
  { label: 'Costo medio', digital: 'Da €35 una tantum', paper: '€3–8 per invito (×100 = €300–800+)' },
  { label: 'Modifiche last-minute', digital: 'Istantanee, senza costi extra', paper: 'Ristampa completa a pagamento' },
  { label: 'RSVP e conferme', digital: 'Automatico con dashboard live', paper: 'Telefonate e raccolta manuale' },
  { label: 'Condivisione', digital: 'Link + QR code ovunque', paper: 'Spedizione postale (tempi e costi)' },
  { label: 'Impatto ambientale', digital: 'Zero carta, zero sprechi', paper: 'Carta, stampa, imballaggi, trasporto' },
  { label: 'Tempi di consegna', digital: 'Pronto in 48 ore', paper: '2–4 settimane tra stampa e spedizione' },
  { label: 'Informazioni extra', digital: 'Mappa, countdown, gallery, info hotel…', paper: 'Spazio limitato, inserti aggiuntivi a parte' },
]

const digitalYes = [true, true, true, true, true, true, true]
const paperNo = [false, false, false, false, false, false, false]

export function ComparisonSection() {
  return (
    <section
      id="confronto"
      style={{ padding: '100px 0 120px', position: 'relative' }}
    >
      {/* Background glows */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '-8%', left: '10%',
          width: 560, height: 560, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(147,51,234,0.18) 0%, transparent 65%)',
          filter: 'blur(80px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-5%', right: '8%',
          width: 480, height: 480, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(207,131,0,0.16) 0%, transparent 65%)',
          filter: 'blur(80px)',
        }} />
      </div>

      <FadeContent blur duration={800} style={{ position: 'relative', zIndex: 1 }} className="mx-auto max-w-5xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
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
              marginBottom: 16,
            }}
          >
            Digitale vs Cartaceo
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
              color: '#f5f0e8',
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            Perché scegliere
            <br />
            <GradienText colors={['#faf6f0', '#f79adb', '#cf8300']}>
              <span style={{ fontStyle: 'italic' }}>il digitale.</span>
            </GradienText>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ fontSize: 15, color: 'rgba(245,240,232,0.5)', maxWidth: 460, margin: '0 auto' }}
          >
            Un invito digitale non è solo moderno — è più pratico, più economico e più sostenibile di quello cartaceo.
          </motion.p>
        </div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{
            borderRadius: 24,
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* Header row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              background: 'rgba(255,255,255,0.04)',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div style={{ padding: '16px 24px', fontSize: 11, fontWeight: 700, color: 'rgba(245,240,232,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Aspetto
            </div>
            <div style={{
              padding: '16px 24px',
              fontSize: 12,
              fontWeight: 700,
              color: '#f5f0e8',
              letterSpacing: '0.05em',
              background: 'linear-gradient(135deg, rgba(109,40,217,0.25) 0%, rgba(192,38,211,0.15) 100%)',
              borderLeft: '1px solid rgba(147,51,234,0.3)',
              borderRight: '1px solid rgba(147,51,234,0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <span style={{
                display: 'inline-block',
                width: 8, height: 8, borderRadius: '50%',
                background: 'linear-gradient(135deg, #9333ea, #c026d3)',
              }} />
              Invito Digitale
            </div>
            <div style={{ padding: '16px 24px', fontSize: 12, fontWeight: 700, color: 'rgba(245,240,232,0.4)', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: 'rgba(245,240,232,0.25)' }} />
              Invito Cartaceo
            </div>
          </div>

          {/* Data rows */}
          {rows.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 * i }}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                borderBottom: i < rows.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',
              }}
            >
              {/* Label */}
              <div style={{
                padding: '18px 24px',
                fontSize: 13,
                color: 'rgba(245,240,232,0.6)',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
              }}>
                {row.label}
              </div>

              {/* Digital */}
              <div style={{
                padding: '18px 24px',
                borderLeft: '1px solid rgba(147,51,234,0.2)',
                borderRight: '1px solid rgba(147,51,234,0.2)',
                background: 'rgba(109,40,217,0.06)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 10,
              }}>
                <Check size={14} color="#a78bfa" style={{ marginTop: 2, flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: 'rgba(245,240,232,0.85)', lineHeight: 1.5 }}>
                  {row.digital}
                </span>
              </div>

              {/* Paper */}
              <div style={{
                padding: '18px 24px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 10,
              }}>
                <X size={14} color="rgba(245,240,232,0.25)" style={{ marginTop: 2, flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: 'rgba(245,240,232,0.4)', lineHeight: 1.5 }}>
                  {row.paper}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom callout */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          style={{
            textAlign: 'center',
            marginTop: 32,
            fontSize: 13,
            color: 'rgba(245,240,232,0.3)',
          }}
        >
          Ogni anno in Italia vengono stampati milioni di inviti cartacei. Il tuo matrimonio può fare la differenza.
        </motion.p>
      </FadeContent>
    </section>
  )
}

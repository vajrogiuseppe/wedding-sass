import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeContent } from '@/components/ui/FadeContent'

const faqs = [
  {
    q: 'Come funziona esattamente il servizio?',
    a: 'Semplice: scegli il layout che preferisci, ci invii i materiali (nomi, date, foto, testi) e noi personalizziamo tutto — colori, font, contenuti. In 48 ore ricevi il link del vostro invito pronto da condividere.',
  },
  {
    q: 'Cosa devo inviarvi per iniziare?',
    a: 'Basta un messaggio con: nomi degli sposi, data e luogo del matrimonio, testi che vuoi inserire e, se ce li hai, qualche foto. Per il resto ti guidiamo noi passo dopo passo.',
  },
  {
    q: 'Gli ospiti devono installare un\'app?',
    a: 'No! Il link si apre direttamente nel browser di qualsiasi dispositivo. Nessuna registrazione, nessun download. Basta un tap sul link o inquadrare il QR code.',
  },
  {
    q: 'Posso richiedere modifiche dopo la consegna?',
    a: 'Certo. Ogni pacchetto include revisioni per aggiornare testi, date e contenuti. Le modifiche si riflettono in tempo reale senza dover ri-condividere il link.',
  },
  {
    q: 'Come funziona il sistema RSVP?',
    a: 'Gli ospiti aprono il link e compilano il form con numero di accompagnatori e preferenze alimentari. Voi vedete tutto in tempo reale nella dashboard e ricevete una notifica ad ogni risposta.',
  },
  {
    q: 'Quanto tempo ci vuole per avere l\'invito?',
    a: 'Di solito 24-48 ore dall\'invio dei vostri materiali. Non pubblichiamo nulla senza la vostra approvazione finale, quindi siete sempre in controllo.',
  },
]

function BubbleFAQ({ faq, index, open, onToggle }: {
  faq: typeof faqs[0]
  index: number
  open: boolean
  onToggle: () => void
}) {
  return (
    <div style={{ marginBottom: 20 }}>
      {/* Question bubble — right side */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
        <motion.button
          onClick={onToggle}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
          style={{
            background: open ? 'linear-gradient(135deg, #6d28d9 0%, #9333ea 45%, #c026d3 100%)' : 'rgba(255,252,248,0.08)',
            border: `1.5px solid ${open ? 'transparent' : 'rgba(255,255,255,0.14)'}`,
            borderRadius: '18px 18px 4px 18px',
            padding: '12px 18px',
            fontSize: 14,
            fontWeight: 600,
            color: '#f5f0e8',
            cursor: 'pointer',
            textAlign: 'left',
            maxWidth: 480,
            lineHeight: 1.5,
            fontFamily: 'inherit',
            transition: 'background 0.25s, border-color 0.25s, box-shadow 0.25s',
            backdropFilter: 'blur(6px)',
            boxShadow: open
              ? '0 4px 22px rgba(147,51,234,0.45)'
              : '0 2px 8px rgba(0,0,0,0.2)',
          }}
        >
          {faq.q}
        </motion.button>
      </div>

      {/* Answer bubble — left side */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              {/* Brand avatar */}
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: '#1e1a14',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: 4,
                }}
              >
                <span
                  className="font-display"
                  style={{ fontSize: 12, color: '#c9a96e', fontStyle: 'normal', fontWeight: 700 }}
                >
                  L
                </span>
              </div>
              <div
                style={{
                  background: 'rgba(255,252,248,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '4px 18px 18px 18px',
                  padding: '12px 18px',
                  fontSize: 14,
                  color: 'rgba(245,240,232,0.65)',
                  lineHeight: 1.7,
                  maxWidth: 480,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                  backdropFilter: 'blur(4px)',
                }}
              >
                {faq.a}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0)

  const toggle = (i: number) => setOpen(open === i ? null : i)

  return (
    <section id="faq" style={{ padding: '100px 0', background: 'transparent', position: 'relative', overflow: 'hidden' }}>
      <FadeContent blur duration={800} className="mx-auto max-w-2xl px-6 lg:px-8" style={{ position: 'relative', zIndex: 1 }}>
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
              color: '#c9a96e',
              letterSpacing: '0.15em',
              textTransform: 'uppercase' as const,
              marginBottom: 16,
            }}
          >
            FAQ
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display"
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
              fontWeight: 600,
              color: '#f5f0e8',
              lineHeight: 1.1,
              marginBottom: 14,
            }}
          >
            Domande frequenti
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ fontSize: 15, color: 'rgba(245,240,232,0.55)' }}
          >
            Clicca su una domanda per leggere la risposta.
          </motion.p>
        </div>

        {/* Chat bubbles */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {faqs.map((faq, i) => (
            <BubbleFAQ
              key={i}
              faq={faq}
              index={i}
              open={open === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </motion.div>
      </FadeContent>
    </section>
  )
}

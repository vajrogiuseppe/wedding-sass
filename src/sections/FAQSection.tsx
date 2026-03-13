import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FadeContent } from '@/components/ui/FadeContent'

function BubbleFAQ({ faq, index, open, onToggle }: {
  faq: { q: string; a: string }
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
  const { t } = useTranslation()
  const [open, setOpen] = useState<number | null>(0)
  const faqs = t('faq.items', { returnObjects: true }) as Array<{ q: string; a: string }>

  const toggle = (i: number) => setOpen(open === i ? null : i)

  return (
    <section id="faq" style={{ padding: '0 0 100px 0', background: 'transparent', position: 'relative', overflow: 'hidden' }}>
      {/* Glow viola — spostato da PricingSection */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '-8%', left: '2%',
          width: 520, height: 520, borderRadius: '50%', pointerEvents: 'none',
          background: 'radial-gradient(circle, rgba(147,51,234,0.32) 0%, transparent 68%)',
          filter: 'blur(60px)', zIndex: 0,
        }}
      />
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
            {t('faq.badge')}
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
            {t('faq.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ fontSize: 15, color: 'rgba(245,240,232,0.55)' }}
          >
            {t('faq.subtitle')}
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

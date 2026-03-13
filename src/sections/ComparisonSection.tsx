import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import GradienText from '@/components/ui/GradienText'
import { FadeContent } from '@/components/ui/FadeContent'

export function ComparisonSection() {
  const { t } = useTranslation()
  const rows = t('comparison.rows', { returnObjects: true }) as Array<{ label: string; digital: string; paper: string }>
  return (
    <section
      id="confronto"
      style={{ padding: '120px 0 0px', position: 'relative' }}
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
            {t('comparison.badge')}
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
            {t('comparison.title')}
            <br />
            <GradienText colors={['#faf6f0', '#f79adb', '#cf8300']}>
              <span style={{ fontStyle: 'italic' }}>{t('comparison.titleItalic')}</span>
            </GradienText>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ fontSize: 15, color: 'rgba(245,240,232,0.5)', maxWidth: 460, margin: '0 auto' }}
          >
            {t('comparison.subtitle')}
          </motion.p>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', borderRadius: 24, border: '1px solid rgba(255,255,255,0.08)' }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{
            borderRadius: 24,
            overflow: 'hidden',
            minWidth: 520,
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
              {t('comparison.colAspect')}
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
              {t('comparison.colDigital')}
            </div>
            <div style={{ padding: '16px 24px', fontSize: 12, fontWeight: 700, color: 'rgba(245,240,232,0.4)', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: 'rgba(245,240,232,0.25)' }} />
              {t('comparison.colPaper')}
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
        </div>

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
          {t('comparison.footNote')}
        </motion.p>
      </FadeContent>
    </section>
  )
}

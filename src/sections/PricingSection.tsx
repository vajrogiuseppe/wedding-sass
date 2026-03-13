import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Plus, Minus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import GradienText from '@/components/ui/GradienText'
import GlareHover from '@/components/ui/GlareHover'
import { FadeContent } from '@/components/ui/FadeContent'

const saveDateFeatures = [
  'Scegli tra i template Save the Date',
  'Personalizzazione testi e colori',
  'Countdown al grande giorno',
  'Info location con mappa',
  'Link unico + QR Code',
  'Mobile ottimizzato',
]
const rsvpAddOnFeatures = [
  'Form RSVP personalizzato',
  'Preferenze alimentari ospiti',
  'Dashboard ospiti live',
  'Notifiche automatiche',
]

const landingFeatures = [
  'Tutto di "Save the Date + RSVP"',
  'Gallery fotografica',
  'Programma completo evento',
  'Dominio personalizzato',
  'Revisioni incluse',
  'Export CSV lista ospiti',
  'Supporto prioritario 7/7',
]

const customFeatures = [
  'Progetto completamente su misura',
  'Design esclusivo da zero',
  'Animazioni e interazioni custom',
  'Integrazioni esterne (music, video)',
  'Supporto dedicato pre/post evento',
  'Revisioni illimitate',
  'Consegna prioritaria',
]

export function PricingSection() {
  const [rsvpAddon, setRsvpAddon] = useState(false)
  const { t } = useTranslation()
  const scrollToContact = () =>
    document.querySelector('#contatti')?.scrollIntoView({ behavior: 'smooth' })
  const sdFeatures = t('pricing.saveDate.features', { returnObjects: true }) as string[]
  const rsvpFeatures = t('pricing.saveDate.rsvpFeatures', { returnObjects: true }) as string[]
  const landingFeatures = t('pricing.landing.features', { returnObjects: true }) as string[]
  const customFeatures = t('pricing.custom.features', { returnObjects: true }) as string[]

  return (
    <section id="prezzi" style={{ padding: '120px 0 100px', position: 'relative', overflow: 'clip' }}>
      {/* Floating glow shapes — solo y, niente scale per evitare overflow */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {[
          { top: '48%', left: '2%', w: 440, c: 'rgba(207,131,0,0.30)', dur: 10 },
          { top: '10%', left: '38%', w: 420, c: 'rgba(247,154,219,0.28)', dur: 12 },
        ].map((g, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: g.dur, repeat: Infinity, ease: 'easeInOut', delay: i * 2.5 }}
            style={{
              position: 'absolute',
              top: g.top,
              left: g.left,
              width: g.w,
              height: g.w,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${g.c} 0%, transparent 68%)`,
              filter: 'blur(60px)',
            }}
          />
        ))}
      </div>
      <FadeContent blur duration={800} style={{ position: 'relative', zIndex: 1 }} className="mx-auto max-w-6xl px-6 lg:px-8">
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
            Prezzi
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
            {t('pricing.title')}
            <br />
            <GradienText colors={['#faf6f0', '#f79adb', '#cf8300']}>
              <span style={{ fontStyle: 'italic' }}>{t('pricing.titleItalic')}</span>
            </GradienText>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ fontSize: 15, color: 'rgba(245,240,232,0.5)', maxWidth: 420, margin: '0 auto' }}
          >
            {t('pricing.subtitle')}
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 20, alignItems: 'start' }}>

          {/* ── Card 1: Save the Date (con toggle RSVP) ── */}
          <motion.div
            className="spotlight-card spotlight-card-dark"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
              e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              borderRadius: 24,
              padding: '32px 28px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
              backdropFilter: 'blur(4px)',
            }}
          >
            {/* Badge */}
            <div style={{ marginBottom: 20 }}>
              <span style={{
                display: 'inline-block', borderRadius: 9999, padding: '4px 12px',
                fontSize: 11, fontWeight: 600, background: 'rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.16)',
              }}>
                {t('pricing.saveDate.badge')}
              </span>
            </div>

            {/* Price animato */}
            <div style={{ marginBottom: 4, display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <motion.span
                key={rsvpAddon ? '60' : '35'}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="font-display"
                style={{ fontSize: 52, fontWeight: 600, color: 'rgba(245,240,232,0.85)', lineHeight: 1 }}
              >
                €{rsvpAddon ? '60' : '35'}
              </motion.span>
              {rsvpAddon && (
                <motion.span
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  style={{ fontSize: 12, color: 'rgba(245,240,232,0.4)', textDecoration: 'line-through' }}
                >
                  €35 + €25
                </motion.span>
              )}
            </div>
            <div style={{ fontSize: 12, color: 'rgba(245,240,232,0.5)', marginBottom: 14 }}>{t('pricing.period')}</div>
            <p style={{ fontSize: 13, color: 'rgba(245,240,232,0.65)', marginBottom: 20, lineHeight: 1.6 }}>
              {rsvpAddon
                ? t('pricing.saveDate.descriptionRsvp')
                : t('pricing.saveDate.description')}
            </p>

            {/* Features base */}
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 12px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {sdFeatures.map((feat) => (
                <li key={feat} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <Check size={14} color="rgba(255,255,255,0.4)" style={{ marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: 'rgba(245,240,232,0.65)' }}>{feat}</span>
                </li>
              ))}
            </ul>

            {/* Toggle RSVP add-on */}
            <button
              onClick={() => setRsvpAddon(!rsvpAddon)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '10px 14px', borderRadius: 12, border: `1px solid ${rsvpAddon ? 'rgba(192,132,252,0.5)' : 'rgba(255,255,255,0.14)'}`,
                background: rsvpAddon ? 'rgba(147,51,234,0.12)' : 'rgba(255,255,255,0.04)',
                color: rsvpAddon ? 'rgba(245,240,232,0.9)' : 'rgba(245,240,232,0.55)',
                fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
                transition: 'all 0.25s ease', marginBottom: 12,
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {rsvpAddon
                  ? <Minus size={13} style={{ color: '#c084fc' }} />
                  : <Plus size={13} />}
                {t('pricing.addRsvp')}
                <span style={{
                  fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 9999,
                  background: rsvpAddon ? 'rgba(192,132,252,0.2)' : 'rgba(255,255,255,0.08)',
                  color: rsvpAddon ? '#c084fc' : 'rgba(255,255,255,0.4)',
                  border: `1px solid ${rsvpAddon ? 'rgba(192,132,252,0.3)' : 'rgba(255,255,255,0.12)'}`,
                }}>+€25</span>
              </span>
            </button>

            {/* RSVP features animate */}
            <AnimatePresence>
              {rsvpAddon && (
                <motion.ul
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ listStyle: 'none', padding: 0, margin: '0 0 16px', display: 'flex', flexDirection: 'column', gap: 10, overflow: 'hidden' }}
                >
                  {rsvpFeatures.map((feat) => (
                    <li key={feat} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <Check size={14} color="#c084fc" style={{ marginTop: 2, flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: 'rgba(245,240,232,0.65)' }}>{feat}</span>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>

            {!rsvpAddon && <div style={{ marginBottom: 16 }} />}

            {/* CTA */}
            <GlareHover
              width="100%" height="auto"
              background="rgba(255,255,255,0.07)"
              borderRadius="9999px"
              borderColor="rgba(255,255,255,0.18)"
              glareColor="#ffffff"
              glareOpacity={0.2}
              glareAngle={-45}
              glareSize={220}
              transitionDuration={600}
              onClick={scrollToContact}
              style={{ padding: '12px 0', fontSize: 14, fontWeight: 600, color: '#fff', backdropFilter: 'blur(8px)', textAlign: 'center' } as React.CSSProperties}
            >
              {rsvpAddon ? t('pricing.saveDate.ctaRsvp') : t('pricing.saveDate.cta')}
            </GlareHover>
          </motion.div>

          {/* ── Card 2: Landing Completa (featured) ── */}
          <div style={{ position: 'relative', paddingTop: 14 }}>
            <div style={{
              position: 'absolute', top: '20px', left: '50%',
              transform: 'translateX(-50%) translateY(-50%)',
              background: 'rgba(255,255,255,0.32)', backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,0.28)',
              borderRadius: 9999, padding: '5px 14px', fontSize: 11, fontWeight: 700,
              color: '#fff', display: 'flex', alignItems: 'center', gap: 5,
              whiteSpace: 'nowrap', zIndex: 2, boxShadow: '0 2px 12px rgba(147,51,234,0.3)',
            }}>
              {t('pricing.landing.mostChosen')}
            </div>
            <motion.div
              className="spotlight-card spotlight-card-dark pricing-card-featured"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
                e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                borderRadius: 24, padding: '36px 32px',
                background: 'linear-gradient(145deg, rgba(124,111,255,0.14) 0%, rgba(192,38,211,0.08) 50%, rgba(247,154,219,0.06) 100%)',
                border: '1.5px solid rgba(255,255,255,0.18)',
                boxShadow: '0 12px 40px rgba(124,111,255,0.18), inset 0 1px 0 rgba(255,255,255,0.1)',
                transform: 'scale(1.03)', backdropFilter: 'blur(4px)',
              }}
            >
              <div style={{ marginBottom: 20 }}>
                <span style={{
                  display: 'inline-block', borderRadius: 9999, padding: '4px 12px',
                  fontSize: 11, fontWeight: 600, background: 'rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.16)',
                }}>
                  {t('pricing.landing.badge')}
                </span>
              </div>
              <div style={{ marginBottom: 4 }}>
                <span className="font-display" style={{ fontSize: 52, fontWeight: 600, color: '#f5f0e8', lineHeight: 1 }}>€120</span>
              </div>
              <div style={{ fontSize: 12, color: 'rgba(245,240,232,0.5)', marginBottom: 14 }}>{t('pricing.period')}</div>
              <p style={{ fontSize: 13, color: 'rgba(245,240,232,0.65)', marginBottom: 24, lineHeight: 1.6 }}>
                {t('pricing.landing.description')}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {landingFeatures.map((feat) => (
                  <li key={feat} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <Check size={14} color="rgba(255,255,255,0.85)" style={{ marginTop: 2, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: 'rgba(245,240,232,0.65)' }}>{feat}</span>
                  </li>
                ))}
              </ul>
              <GlareHover
                width="100%" height="auto"
                background="linear-gradient(135deg, #6d28d9 0%, #9333ea 45%, #c026d3 100%)"
                borderRadius="9999px" borderColor="transparent"
                glareColor="#f79adb" glareOpacity={0.55} glareAngle={-45} glareSize={220} transitionDuration={600}
                onClick={scrollToContact}
                style={{ padding: '12px 0', fontSize: 14, fontWeight: 600, color: '#fff', textAlign: 'center' } as React.CSSProperties}
              >
                {t('pricing.landing.cta')}
              </GlareHover>
            </motion.div>
          </div>

          {/* ── Card 3: Custom ── */}
          <motion.div
            className="spotlight-card spotlight-card-dark"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
              e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              borderRadius: 24, padding: '32px 28px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
              backdropFilter: 'blur(4px)',
            }}
          >
            <div style={{ marginBottom: 20 }}>
              <span style={{
                display: 'inline-block', borderRadius: 9999, padding: '4px 12px',
                fontSize: 11, fontWeight: 600, background: 'rgba(201,169,110,0.12)',
                color: '#c9a96e', border: '1px solid rgba(201,169,110,0.25)',
              }}>
                {t('pricing.custom.badge')}
              </span>
            </div>
            <div style={{ marginBottom: 4 }}>
              <span className="font-display" style={{ fontSize: 52, fontWeight: 600, color: 'rgba(245,240,232,0.85)', lineHeight: 1 }}>€220</span>
            </div>
            <div style={{ fontSize: 12, color: 'rgba(245,240,232,0.5)', marginBottom: 14 }}>{t('pricing.period')}</div>
            <p style={{ fontSize: 13, color: 'rgba(245,240,232,0.65)', marginBottom: 24, lineHeight: 1.6 }}>
              {t('pricing.custom.description')}
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {customFeatures.map((feat) => (
                <li key={feat} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <Check size={14} color="rgba(201,169,110,0.7)" style={{ marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: 'rgba(245,240,232,0.65)' }}>{feat}</span>
                </li>
              ))}
            </ul>
            <GlareHover
              width="100%" height="auto"
              background="rgba(255,255,255,0.07)"
              borderRadius="9999px"
              borderColor="rgba(201,169,110,0.3)"
              glareColor="#c9a96e" glareOpacity={0.25} glareAngle={-45} glareSize={220} transitionDuration={600}
              onClick={scrollToContact}
              style={{ padding: '12px 0', fontSize: 14, fontWeight: 600, color: '#c9a96e', backdropFilter: 'blur(8px)', textAlign: 'center' } as React.CSSProperties}
            >
              {t('pricing.custom.cta')}
            </GlareHover>
          </motion.div>

        </div>
      </FadeContent>
    </section>
  )
}

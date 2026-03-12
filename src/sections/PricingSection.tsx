import React from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import GradienText from '@/components/ui/GradienText'
import GlareHover from '@/components/ui/GlareHover'
import { FadeContent } from '@/components/ui/FadeContent'

const plans = [
  {
    badge: 'Save the Date',
    price: '35',
    period: 'una tantum',
    description: 'Annuncia la data con eleganza. Perfetto per chi vuole un tocco digitale semplice e raffinato.',
    features: [
      'Scegli tra i template Save the Date',
      'Personalizzazione testi e colori',
      'Countdown al grande giorno',
      'Info location con mappa',
      'Link unico + QR Code',
      'Mobile ottimizzato',
    ],
    cta: 'Scegli Save the Date',
    featured: false,
    tip: null,
  },
  {
    badge: 'Invito + RSVP',
    price: '60',
    period: 'una tantum',
    description: 'Invito digitale completo con raccolta conferme integrata e gestione ospiti in tempo reale.',
    features: [
      'Tutto di "Save the Date"',
      'Form RSVP personalizzato',
      'Preferenze alimentari ospiti',
      'Dashboard ospiti live',
      'Notifiche automatiche',
    ],
    cta: 'Scegli Invito + RSVP',
    featured: false,
    tip: null,
  },
  {
    badge: 'Landing Completa',
    price: '120',
    period: 'una tantum',
    description: 'La soluzione più completa: tutto incluso, revisioni, gallery e supporto dedicato.',
    features: [
      'Tutto di "Invito + RSVP"',
      'Gallery fotografica',
      'Programma completo evento',
      'Dominio personalizzato',
      'Revisioni incluse',
      'Export CSV lista ospiti',
      'Supporto prioritario 7/7',
    ],
    cta: 'Scegli Landing Completa',
    featured: true,
    tip: '⭐ Il più scelto',
  },
]

export function PricingSection() {
  const scrollToContact = () =>
    document.querySelector('#contatti')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="prezzi" style={{ padding: '120px 0 100px', position: 'relative' }}>
      {/* Floating glow shapes */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {[
          { top: '-5%', left: '2%', w: 560, c: 'rgba(147,51,234,0.38)', dur: 8 },
          { top: '48%', right: '1%', w: 500, c: 'rgba(207,131,0,0.35)', dur: 10 },
          { top: '10%', left: '38%', w: 440, c: 'rgba(247,154,219,0.32)', dur: 12 },
        ].map((g, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -24, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: g.dur, repeat: Infinity, ease: 'easeInOut', delay: i * 2.5 }}
            style={{
              position: 'absolute',
              top: g.top,
              left: (g as any).left,
              right: (g as any).right,
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
            Prezzi chiari,
            <br />
            <GradienText colors={['#faf6f0', '#f79adb', '#cf8300']}>
              <span style={{ fontStyle: 'italic' }}>zero sorprese.</span>
            </GradienText>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ fontSize: 15, color: 'rgba(245,240,232,0.5)', maxWidth: 420, margin: '0 auto' }}
          >
            Pagamento una tantum, nessun abbonamento. Scegliete il pacchetto, inviaci i materiali — il resto lo facciamo noi.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 20, alignItems: 'start' }}>
          {plans.map((plan, i) => (
            /* Outer wrapper — no overflow:hidden so badge is visible */
            <div key={plan.badge} style={{ position: 'relative', paddingTop: plan.featured ? 14 : 0 }}>
              {/* "Più scelto" badge — outside the spotlight-card overflow */}
              {plan.featured && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: '50%',
                    transform: 'translateX(-50%) translateY(-50%)',
                    background: 'rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(14px)',
                    WebkitBackdropFilter: 'blur(14px)',
                    border: '1px solid rgba(255,255,255,0.28)',
                    borderRadius: 9999,
                    padding: '5px 14px',
                    fontSize: 11,
                    fontWeight: 700,
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                    whiteSpace: 'nowrap',
                    zIndex: 2,
                    boxShadow: '0 2px 12px rgba(147,51,234,0.3)',
                  }}
                >
                  Il più scelto
                </div>
              )}

              <motion.div
                className={`spotlight-card spotlight-card-dark${plan.featured ? ' pricing-card-featured' : ''}`}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
                  e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
                }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{
                  position: 'relative',
                  borderRadius: 24,
                  padding: plan.featured ? '36px 32px' : '32px 28px',
                  background: plan.featured
                    ? 'linear-gradient(145deg, rgba(124,111,255,0.14) 0%, rgba(192,38,211,0.08) 50%, rgba(247,154,219,0.06) 100%)'
                    : 'rgba(255,255,255,0.04)',
                  border: plan.featured
                    ? '1.5px solid rgba(255,255,255,0.18)'
                    : '1px solid rgba(255,255,255,0.1)',
                  boxShadow: plan.featured
                    ? '0 12px 40px rgba(124,111,255,0.18), inset 0 1px 0 rgba(255,255,255,0.1)'
                    : 'inset 0 1px 0 rgba(255,255,255,0.06)',
                  transform: plan.featured ? 'scale(1.03)' : 'scale(1)',
                  backdropFilter: 'blur(4px)',
                }}
              >
                {/* Plan type badge */}
                <div style={{ marginBottom: 20 }}>
                  <span
                    style={{
                      display: 'inline-block',
                      borderRadius: 9999,
                      padding: '4px 12px',
                      fontSize: 11,
                      fontWeight: 600,
                      background: 'rgba(255,255,255,0.08)',
                      color: 'rgba(255,255,255,0.7)',
                      border: '1px solid rgba(255,255,255,0.16)',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    {plan.badge}
                  </span>
                  {plan.tip && (
                    <p style={{ fontSize: 10, color: 'rgba(245,240,232,0.5)', margin: '4px 0 0', letterSpacing: '0.05em' }}>
                      {plan.tip}
                    </p>
                  )}
                </div>

                {/* Price */}
                <div style={{ marginBottom: 4 }}>
                  <span
                    className="font-display"
                    style={{
                      fontSize: 52,
                      fontWeight: 600,
                      color: plan.featured ? '#f5f0e8' : 'rgba(245,240,232,0.85)',
                      lineHeight: 1,
                    }}
                  >
                    €{plan.price}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: 'rgba(245,240,232,0.5)', marginBottom: 14 }}>{plan.period}</div>
                <p style={{ fontSize: 13, color: 'rgba(245,240,232,0.65)', marginBottom: 24, lineHeight: 1.6 }}>
                  {plan.description}
                </p>

                {/* Features */}
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 28px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                  }}
                >
                  {plan.features.map((feat) => (
                    <li key={feat} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <Check
                        size={14}
                        color={plan.featured ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.4)'}
                        style={{ marginTop: 2, flexShrink: 0 }}
                      />
                      <span style={{ fontSize: 13, color: 'rgba(245,240,232,0.65)' }}>
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <GlareHover
                  width="100%"
                  height="auto"
                  background={plan.featured
                    ? 'linear-gradient(135deg, #6d28d9 0%, #9333ea 45%, #c026d3 100%)'
                    : 'rgba(255,255,255,0.07)'}
                  borderRadius="9999px"
                  borderColor={plan.featured ? 'transparent' : 'rgba(255,255,255,0.18)'}
                  glareColor={plan.featured ? '#f79adb' : '#ffffff'}
                  glareOpacity={plan.featured ? 0.55 : 0.2}
                  glareAngle={-45}
                  glareSize={220}
                  transitionDuration={600}
                  onClick={scrollToContact}
                  style={{
                    padding: '12px 0',
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#fff',
                    backdropFilter: plan.featured ? 'none' : 'blur(8px)',
                  } as React.CSSProperties}
                >
                  {plan.cta}
                </GlareHover>
              </motion.div>
            </div>
          ))}
        </div>
      </FadeContent>
    </section>
  )
}

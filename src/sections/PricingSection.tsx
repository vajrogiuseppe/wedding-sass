import { motion } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'

const plans = [
  {
    badge: 'Save the Date',
    price: '50',
    period: 'una tantum',
    description: 'Perfetto per annunciare il grande giorno con stile e semplicità.',
    features: [
      'Pagina intro animata',
      'Salva la data (countdown)',
      'Info location con mappa',
      'Link personalizzato',
      'Mobile ottimizzato',
    ],
    cta: 'Inizia con Save the Date',
    featured: false,
  },
  {
    badge: 'Landing RSVP',
    price: '120',
    period: 'una tantum',
    description: 'La scelta completa: invito elegante, raccolta conferme e dashboard live.',
    features: [
      'Tutto di "Save the Date"',
      'Form RSVP personalizzato',
      'Preferenze alimentari',
      'Dashboard ospiti live',
      'Notifiche WhatsApp & email',
      'Export CSV ospiti',
      'Supporto prioritario',
    ],
    cta: 'Scegli Landing RSVP',
    featured: true,
  },
  {
    badge: 'Premium Plus',
    price: '220',
    period: 'una tantum',
    description: 'Tutto incluso con revisioni illimitate e dominio personalizzato.',
    features: [
      'Tutto di "Landing RSVP"',
      'Dominio personalizzato',
      'Revisioni illimitate',
      'Gallery fotografica',
      'Programma evento',
      'Playlist Spotify integrata',
      'Supporto dedicato 7/7',
    ],
    cta: 'Scegli Premium Plus',
    featured: false,
  },
]

export function PricingSection() {
  const scrollToContact = () =>
    document.querySelector('#contatti')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="prezzi" style={{ padding: '100px 0', background: '#0e0c0a', position: 'relative' }}>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
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
            Semplice, trasparente,
            <br />
            <span className="text-gradient-gold">senza sorprese</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ fontSize: 15, color: 'rgba(245,240,232,0.5)', maxWidth: 420, margin: '0 auto' }}
          >
            Pagamento una tantum, nessun abbonamento. Il vostro invito resta online fino al
            giorno del matrimonio.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 20, alignItems: 'start' }}>
          {plans.map((plan, i) => (
            <motion.div
              key={plan.badge}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{
                position: 'relative',
                borderRadius: 24,
                padding: plan.featured ? '36px 32px' : '32px 28px',
                background: plan.featured ? 'rgba(255,252,248,0.06)' : 'rgba(255,255,255,0.03)',
                border: plan.featured
                  ? '1.5px solid rgba(201,169,110,0.5)'
                  : '1px solid rgba(255,255,255,0.08)',
                boxShadow: plan.featured
                  ? '0 12px 40px rgba(201,169,110,0.12)'
                  : 'none',
                transform: plan.featured ? 'scale(1.03)' : 'scale(1)',
              }}
            >
              {/* "Più scelto" badge */}
              {plan.featured && (
                <div
                  style={{
                    position: 'absolute',
                    top: -12,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#c9a96e',
                    color: '#0e0c0a',
                    borderRadius: 9999,
                    padding: '4px 14px',
                    fontSize: 11,
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                    whiteSpace: 'nowrap',
                  }}
                >
                  <Sparkles size={10} />
                  Più scelto
                </div>
              )}

              {/* Badge */}
              <div style={{ marginBottom: 20 }}>
                <span
                  style={{
                    display: 'inline-block',
                    borderRadius: 9999,
                    padding: '4px 12px',
                    fontSize: 11,
                    fontWeight: 600,
                    background: plan.featured
                      ? 'rgba(201,169,110,0.15)'
                      : 'rgba(255,255,255,0.04)',
                    color: plan.featured ? '#c9a96e' : 'rgba(245,240,232,0.35)',
                    border: `1px solid ${plan.featured ? 'rgba(201,169,110,0.3)' : 'rgba(255,255,255,0.1)'}`,
                  }}
                >
                  {plan.badge}
                </span>
              </div>

              {/* Price */}
              <div style={{ marginBottom: 4 }}>
                <span
                  className="font-display"
                  style={{
                    fontSize: 52,
                    fontWeight: 600,
                    color: plan.featured ? '#f5f0e8' : 'rgba(245,240,232,0.35)',
                    lineHeight: 1,
                  }}
                >
                  €{plan.price}
                </span>
              </div>
              <div style={{ fontSize: 12, color: 'rgba(245,240,232,0.35)', marginBottom: 14 }}>{plan.period}</div>
              <p style={{ fontSize: 13, color: 'rgba(245,240,232,0.5)', marginBottom: 24, lineHeight: 1.6 }}>
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
                      color={plan.featured ? '#c9a96e' : '#5a5248'}
                      style={{ marginTop: 2, flexShrink: 0 }}
                    />
                    <span
                      style={{
                        fontSize: 13,
                        color: plan.featured ? 'rgba(245,240,232,0.65)' : 'rgba(245,240,232,0.35)',
                      }}
                    >
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={scrollToContact}
                style={{
                  width: '100%',
                  borderRadius: 9999,
                  padding: '12px 0',
                  fontSize: 14,
                  fontWeight: 600,
                  border: plan.featured ? 'none' : '1px solid rgba(255,255,255,0.12)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  background: plan.featured ? '#c9a96e' : 'transparent',
                  color: plan.featured ? '#0e0c0a' : 'rgba(245,240,232,0.45)',
                  fontFamily: 'inherit',
                }}
                onMouseEnter={(e) => {
                  if (plan.featured) {
                    e.currentTarget.style.background = '#e8d5b0'
                  } else {
                    e.currentTarget.style.borderColor = '#c9a96e'
                    e.currentTarget.style.color = '#a07838'
                  }
                }}
                onMouseLeave={(e) => {
                  if (plan.featured) {
                    e.currentTarget.style.background = '#c9a96e'
                  } else {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                    e.currentTarget.style.color = 'rgba(245,240,232,0.45)'
                  }
                }}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

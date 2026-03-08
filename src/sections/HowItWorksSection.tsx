import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Palette, Send, ChevronLeft, ChevronRight } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Mail,
    title: 'Contatta per email',
    description:
      "Scrivici a ciao@inviti.studio con la data del vostro matrimonio e le vostre preferenze di stile. Ti risponderemo entro 24 ore con una proposta personalizzata e un preventivo su misura.",
    tag: 'ciao@inviti.studio',
    color: '#c9a96e',
  },
  {
    number: '02',
    icon: Palette,
    title: 'Personalizza',
    description:
      'Lavoriamo insieme per scegliere template, colori, font e contenuti che rispecchino la vostra storia. Ogni dettaglio — dal titolo alla gallery fotografica — viene curato con attenzione.',
    tag: 'Design su misura',
    color: '#e8d5b0',
  },
  {
    number: '03',
    icon: Send,
    title: 'Invia il tuo invito',
    description:
      'Ricevi il link del tuo invito digitale pronto da condividere via WhatsApp, email o social. Monitora le conferme in tempo reale dalla dashboard e gestisci la lista ospiti comodamente.',
    tag: 'Link pronto in 48h',
    color: '#d4b896',
  },
]

export function HowItWorksSection() {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setActive((prev) => (prev + 1) % steps.length)
    }, 9000)
    return () => clearInterval(timer)
  }, [])

  const go = (idx: number) => {
    setDirection(idx > active ? 1 : -1)
    setActive(idx)
  }

  const prev = () => {
    setDirection(-1)
    setActive((prev) => (prev - 1 + steps.length) % steps.length)
  }

  const next = () => {
    setDirection(1)
    setActive((prev) => (prev + 1) % steps.length)
  }

  const step = steps[active]

  return (
    <section
      id="come-funziona"
      style={{ padding: '100px 0', background: '#f5f0e8', overflow: 'hidden' }}
    >
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
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
            Come funziona
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
            }}
          >
            Tre passi verso
            <br />
            <span className="text-gradient-gold">il vostro invito perfetto</span>
          </motion.h2>
        </div>

        {/* Step tabs */}
        <div
          style={{
            display: 'flex',
            gap: 4,
            marginBottom: 4,
            background: '#ede8df',
            borderRadius: '16px 16px 0 0',
            padding: '8px 8px 0',
            border: '1px solid #e0d8cc',
            borderBottom: 'none',
          }}
        >
          {steps.map((s, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              style={{
                flex: 1,
                padding: '10px 16px',
                borderRadius: '10px 10px 0 0',
                border: 'none',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 600,
                background: i === active ? '#ffffff' : 'transparent',
                color: i === active ? s.color : '#b5a898',
                transition: 'all 0.25s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                fontFamily: 'inherit',
              }}
            >
              <s.icon size={14} />
              <span className="hidden sm:inline">{s.title}</span>
              <span className="sm:hidden">{s.number}</span>
            </button>
          ))}
        </div>

        {/* Main slide */}
        <div
          style={{
            borderRadius: '0 0 20px 20px',
            border: '1px solid #e0d8cc',
            borderTop: 'none',
            background: '#ffffff',
            overflow: 'hidden',
            position: 'relative',
            minHeight: 280,
          }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active}
              custom={direction}
              initial={{ opacity: 0, x: direction * 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 50 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col sm:flex-row items-start sm:items-center"
              style={{ padding: 'clamp(24px, 4vw, 48px) clamp(20px, 5vw, 56px)', gap: 'clamp(24px, 4vw, 52px)' }}
            >
              {/* Left: icon + number */}
              <div style={{ flexShrink: 0, textAlign: 'center' }}>
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 18,
                    background: `rgba(201,169,110,0.08)`,
                    border: `1px solid rgba(201,169,110,0.2)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px',
                  }}
                >
                  <step.icon size={28} color={step.color} />
                </div>
                <span
                  className="font-display"
                  style={{ fontSize: 64, fontWeight: 600, color: '#e0d8cc', lineHeight: 1 }}
                >
                  {step.number}
                </span>
              </div>

              {/* Right: content */}
              <div style={{ flex: 1 }}>
                <span
                  style={{
                    display: 'inline-block',
                    borderRadius: 9999,
                    padding: '4px 12px',
                    fontSize: 11,
                    fontWeight: 600,
                    background: 'rgba(201,169,110,0.08)',
                    color: step.color,
                    border: '1px solid rgba(201,169,110,0.2)',
                    marginBottom: 16,
                    letterSpacing: '0.05em',
                  }}
                >
                  {step.tag}
                </span>
                <h3
                  className="font-display"
                  style={{
                    fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                    fontWeight: 600,
                    color: '#1e1a14',
                    marginBottom: 16,
                    lineHeight: 1.1,
                  }}
                >
                  {step.title}
                </h3>
                <p style={{ fontSize: 15, lineHeight: 1.8, color: '#7a6e65', maxWidth: 460 }}>
                  {step.description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress bar */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 2,
              background: '#e0d8cc',
            }}
          >
            <motion.div
              key={active}
              style={{ height: '100%', background: step.color, transformOrigin: 'left' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 9, ease: 'linear' }}
            />
          </div>
        </div>

        {/* Navigation */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 20,
          }}
        >
          {/* Dots */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {steps.map((s, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                style={{
                  width: i === active ? 28 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: i === active ? s.color : '#e0d8cc',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  padding: 0,
                }}
              />
            ))}
          </div>

          {/* Arrows */}
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={prev}
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'transparent',
                border: '1px solid #e0d8cc',
                color: '#b5a898',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#c9a96e'
                e.currentTarget.style.color = '#c9a96e'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e0d8cc'
                e.currentTarget.style.color = '#b5a898'
              }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: '#c9a96e',
                border: 'none',
                color: '#0e0c0a',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#e8d5b0' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#c9a96e' }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

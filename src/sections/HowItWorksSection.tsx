import { motion } from 'framer-motion'
import { LayoutTemplate, Palette, Rocket } from 'lucide-react'
import GradienText from "@/components/ui/GradienText"

const steps = [
  {
    number: '01',
    icon: LayoutTemplate,
    title: 'Scegli il modello',
    description: 'Sfoglia la nostra collezione di template per Save the Date e Landing RSVP. Design esclusivi, pronti in un click.',
    color: '#7c6fff',
    glow: 'rgba(124,111,255,0.25)',
  },
  {
    number: '02',
    icon: Palette,
    title: 'Personalizza',
    description: 'Font, colori, testi, foto — tutto su misura. Lavoriamo insieme finché ogni dettaglio rispecchia la vostra storia.',
    color: '#c9a96e',
    glow: 'rgba(201,169,110,0.25)',
  },
  {
    number: '03',
    icon: Rocket,
    title: 'Lancia e monitora',
    description: 'Un link unico via WhatsApp o social. RSVP in tempo reale, gestione ospiti e notifiche automatiche dalla dashboard.',
    color: '#4cc9f0',
    glow: 'rgba(76,201,240,0.25)',
  },
]

export function HowItWorksSection() {
  return (
    <section
      id="come-funziona"
      style={{ background: '#0a0a0f', padding: '140px 24px', position: 'relative', overflow: 'hidden' }}
    >
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '20%', left: '10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,111,255,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      </div>

      <div className="mx-auto max-w-6xl" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 100 }}>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              display: 'inline-block', borderRadius: 9999,
              border: '1px solid rgba(124,111,255,0.3)', background: 'rgba(124,111,255,0.08)',
              padding: '6px 16px', fontSize: 11, fontWeight: 600, color: '#7c6fff',
              letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 24,
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
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 600, color: '#f5f0e8', lineHeight: 1.05 }}
          >
            Dal link all'altare,
            <br />
           <GradienText colors={["#faf6f0", "#f79adb", "#cf8300"]}>
            <span style={{ fontStyle: "italic" }}>
              merita un invito perfetto.
            </span>
          </GradienText>
          </motion.h2>
        </div>

        <div style={{ position: 'relative' }}>
          <div
            className="hidden md:block"
            style={{
              position: 'absolute', top: 36, left: '16.66%', right: '16.66%', height: 1,
              background: 'linear-gradient(90deg, rgba(124,111,255,0.4), rgba(201,169,110,0.4), rgba(76,201,240,0.4))',
              zIndex: 0,
            }}
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 40, position: 'relative', zIndex: 1 }}>
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
                >
                  <div style={{
                    width: 72, height: 72, borderRadius: '50%',
                    background: `radial-gradient(circle, ${step.glow} 0%, rgba(10,10,15,0) 70%)`,
                    border: `1px solid ${step.color}44`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 32, position: 'relative',
                    boxShadow: `0 0 32px ${step.glow}`,
                  }}>
                    <Icon size={28} color={step.color} />
                    <div style={{
                      position: 'absolute', top: -8, right: -8,
                      width: 22, height: 22, borderRadius: '50%',
                      background: step.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 10, fontWeight: 800, color: '#0a0a0f',
                    }}>
                      {i + 1}
                    </div>
                  </div>

                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: step.color, textTransform: 'uppercase', marginBottom: 16, fontFamily: 'monospace' }}>
                    Step {step.number}
                  </div>

                  <h3 className="font-display" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.75rem)', fontWeight: 600, color: '#f5f0e8', lineHeight: 1.2, marginBottom: 16 }}>
                    {step.title}
                  </h3>

                  <p style={{ fontSize: 15, lineHeight: 1.8, color: 'rgba(245,240,232,0.45)', maxWidth: 300 }}>
                    {step.description}
                  </p>

                  <div style={{ marginTop: 32, width: 40, height: 2, borderRadius: 2, background: step.color, opacity: 0.6 }} />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

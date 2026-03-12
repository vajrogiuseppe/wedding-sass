import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeContent } from '@/components/ui/FadeContent'
import { useState } from 'react'
import { Loader2, Send } from 'lucide-react'
import { toast } from 'sonner'
import { saveLead } from '@/lib/firebase'
import GlareHover from '@/components/ui/GlareHover'

interface FormData {
  name: string
  email: string
  phone: string
  service: string
  message: string
}
interface FormErrors {
  name?: string
  email?: string
  message?: string
}

function FloatingInput({
  label,
  id,
  type = 'text',
  value,
  onChange,
  error,
}: {
  label: string
  id: string
  type?: string
  value: string
  onChange: (v: string) => void
  error?: string
}) {
  const [focused, setFocused] = useState(false)
  const floated = focused || value.length > 0

  return (
    <div style={{ position: 'relative' }}>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%',
          borderRadius: 10,
          border: `1px solid ${error ? '#c0736a' : focused ? '#c9a96e' : '#e0d8cc'}`,
          background: '#faf7f2',
          padding: '22px 14px 8px',
          fontSize: 14,
          color: '#1e1a14',
          outline: 'none',
          transition: 'border-color 0.2s',
          fontFamily: 'inherit',
        }}
      />
      <label
        htmlFor={id}
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          left: 14,
          transition: 'all 0.2s',
          top: floated ? 7 : 15,
          fontSize: floated ? 10 : 14,
          color: floated ? '#a07838' : '#b5a898',
          fontWeight: floated ? 600 : 400,
          letterSpacing: floated ? '0.06em' : 0,
        }}
      >
        {label}
      </label>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{
              overflow: 'hidden',
              fontSize: 11,
              color: '#c0736a',
              marginTop: 4,
              marginLeft: 4,
            }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

function FloatingTextarea({
  label,
  id,
  value,
  onChange,
  error,
}: {
  label: string
  id: string
  value: string
  onChange: (v: string) => void
  error?: string
}) {
  const [focused, setFocused] = useState(false)
  const floated = focused || value.length > 0

  return (
    <div style={{ position: 'relative' }}>
      <textarea
        id={id}
        value={value}
        rows={4}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%',
          borderRadius: 10,
          border: `1px solid ${error ? '#c0736a' : focused ? '#c9a96e' : '#e0d8cc'}`,
          background: '#faf7f2',
          padding: '22px 14px 8px',
          fontSize: 14,
          color: '#1e1a14',
          outline: 'none',
          transition: 'border-color 0.2s',
          fontFamily: 'inherit',
          resize: 'none',
        }}
      />
      <label
        htmlFor={id}
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          left: 14,
          transition: 'all 0.2s',
          top: floated ? 7 : 15,
          fontSize: floated ? 10 : 14,
          color: floated ? '#a07838' : '#b5a898',
          fontWeight: floated ? 600 : 400,
          letterSpacing: floated ? '0.06em' : 0,
        }}
      >
        {label}
      </label>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{
              overflow: 'hidden',
              fontSize: 11,
              color: '#c0736a',
              marginTop: 4,
              marginLeft: 4,
            }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

function FloatingSelect({
  label,
  id,
  value,
  onChange,
  options,
}: {
  label: string
  id: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  const [focused, setFocused] = useState(false)
  const floated = focused || value.length > 0

  return (
    <div style={{ position: 'relative' }}>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%',
          borderRadius: 10,
          border: `1px solid ${focused ? '#c9a96e' : '#e0d8cc'}`,
          background: '#faf7f2',
          padding: '22px 14px 8px',
          fontSize: 14,
          color: value ? '#1e1a14' : 'transparent',
          outline: 'none',
          transition: 'border-color 0.2s',
          fontFamily: 'inherit',
          appearance: 'none',
          cursor: 'pointer',
        }}
      >
        <option value="" disabled />
        {options.map((o) => (
          <option key={o.value} value={o.value} style={{ color: '#1e1a14' }}>
            {o.label}
          </option>
        ))}
      </select>
      <label
        htmlFor={id}
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          left: 14,
          transition: 'all 0.2s',
          top: floated ? 7 : 15,
          fontSize: floated ? 10 : 14,
          color: floated ? '#a07838' : '#b5a898',
          fontWeight: floated ? 600 : 400,
          letterSpacing: floated ? '0.06em' : 0,
        }}
      >
        {label}
      </label>
      {/* Chevron */}
      <div style={{
        position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
        pointerEvents: 'none', color: '#b5a898',
      }}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  )
}

export function ContactSection() {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const validate = (): boolean => {
    const e: FormErrors = {}
    if (!form.name.trim()) e.name = 'Il nome è obbligatorio'
    if (!form.email.trim()) e.email = "L'email è obbligatoria"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email non valida'
    if (!form.message.trim()) e.message = 'Il messaggio è obbligatorio'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    saveLead({
      name: form.name,
      email: form.email,
      phone: form.phone,
      message: form.message,
    })
    setLoading(false)
    setSubmitted(true)
    toast.success('Richiesta inviata!', { description: 'Ti risponderemo entro 24 ore.' })
    setForm({ name: '', email: '', phone: '', service: '', message: '' })
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <section id="contatti" style={{ padding: '100px 0', background: '#f5f0e8' }}>
      <FadeContent blur duration={800} className="mx-auto max-w-xl px-6">
        {/* Header */}
        <div className="text-center mb-12">
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
            Contatti
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
              marginBottom: 14,
            }}
          >
            Inizia il vostro
            <br />
            <span className="text-gradient-gold">progetto insieme</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ fontSize: 15, color: '#7a6e65' }}
          >
            Scegli il pacchetto, raccontaci del vostro matrimonio e ti risponderemo entro 24 ore.
          </motion.p>
        </div>

        {/* Form */}
        <motion.div
          className="spotlight-card"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
            e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          style={{
            borderRadius: 20,
            border: '1px solid #e0d8cc',
            background: '#ffffff',
            padding: 32,
            boxShadow: '0 4px 24px rgba(30,26,20,0.08)',
          }}
        >
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <FloatingInput
              label="Nome e cognome *"
              id="name"
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
              error={errors.name}
            />
            <FloatingInput
              label="Email *"
              id="email"
              type="email"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
              error={errors.email}
            />
            <FloatingInput
              label="Telefono"
              id="phone"
              type="tel"
              value={form.phone}
              onChange={(v) => setForm({ ...form, phone: v })}
            />
            <FloatingSelect
              label="Tipologia di servizio *"
              id="service"
              value={form.service}
              onChange={(v) => setForm({ ...form, service: v })}
              options={[
                { value: 'save-the-date', label: 'Save the Date — €35' },
                { value: 'invito-rsvp', label: 'Invito + RSVP — €60' },
                { value: 'landing-completa', label: 'Landing Completa — €120' },
                { value: 'premium', label: 'Premium su Misura — €200' },
              ]}
            />
            <FloatingTextarea
              label="Raccontaci del vostro matrimonio *"
              id="message"
              value={form.message}
              onChange={(v) => setForm({ ...form, message: v })}
              error={errors.message}
            />

            <GlareHover
              width="100%"
              height="auto"
              background={submitted ? '#e0d8cc' : 'linear-gradient(135deg, #6d28d9 0%, #9333ea 45%, #c026d3 100%)'}
              borderRadius="9999px"
              borderColor="transparent"
              glareColor="#f79adb"
              glareOpacity={0.5}
              glareAngle={-45}
              glareSize={220}
              transitionDuration={600}
              style={{ marginTop: 4, opacity: loading || submitted ? 0.7 : 1 } as React.CSSProperties}
            >
              <button
                type="submit"
                disabled={loading || submitted}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  color: submitted ? '#b5a898' : '#fff',
                  padding: '14px 0',
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: loading || submitted ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  fontFamily: 'inherit',
                }}
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Invio in corso...</span>
                  </>
                ) : submitted ? (
                  <span>Richiesta inviata!</span>
                ) : (
                  <>
                    <span>Invia richiesta</span>
                    <Send size={14} />
                  </>
                )}
              </button>
            </GlareHover>
          </form>
        </motion.div>
      </FadeContent>
    </section>
  )
}

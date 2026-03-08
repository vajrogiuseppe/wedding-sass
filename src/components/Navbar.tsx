import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { X, Menu, Instagram, MessageCircle, Mail, ArrowRight } from 'lucide-react'

const navLinks = [
  { label: 'Come funziona', href: '#come-funziona' },
  { label: 'Showcase', href: '#showcase' },
  { label: 'Testimonianze', href: '#testimonianze' },
  { label: 'Prezzi', href: '#prezzi' },
  { label: 'Contatti', href: '#contatti' },
]

const socialLinks = [
  { href: 'https://instagram.com/inviti.studio', Icon: Instagram, label: 'Instagram' },
  { href: 'https://wa.me/393401234567', Icon: MessageCircle, label: 'WhatsApp' },
  { href: 'mailto:ciao@inviti.studio', Icon: Mail, label: 'Email' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  const scrollTo = (href: string) => {
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Fixed bottom bar — only logo + burger */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: 'flex',
          justifyContent: 'center',
          pointerEvents: 'none',
          padding: '0 0 20px',
        }}
      >
        <div
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: 'rgba(20,17,12,0.95)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderRadius: 9999,
            border: '1px solid #2e2820',
            padding: '10px 16px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          }}
        >
          {/* Logo */}
          <a
            href="/"
            className="font-display"
            style={{
              fontSize: 16,
              fontStyle: 'italic',
              fontWeight: 600,
              color: '#f5f0e8',
              textDecoration: 'none',
            }}
          >
            inviti<span style={{ color: '#c9a96e' }}>.</span>studio
          </a>

          {/* Burger */}
          <button
            onClick={() => setOpen(!open)}
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              border: '1px solid #2e2820',
              background: open ? '#c9a96e' : 'transparent',
              color: open ? '#0e0c0a' : '#9a8e83',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            aria-label="Menu"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Expanded menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="bottom-menu"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: 'fixed',
              bottom: 80,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 99,
              width: 'min(440px, calc(100vw - 32px))',
              background: 'rgba(20,17,12,0.97)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: 20,
              border: '1px solid #2e2820',
              boxShadow: '0 -8px 40px rgba(0,0,0,0.6)',
              overflow: 'hidden',
            }}
          >
            {/* Links */}
            <div style={{ padding: '8px 8px 0' }}>
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => scrollTo(link.href)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '13px 16px',
                    borderRadius: 12,
                    border: 'none',
                    background: 'transparent',
                    color: '#9a8e83',
                    fontSize: 15,
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontFamily: 'inherit',
                    textAlign: 'left',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#1f1a14'
                    e.currentTarget.style.color = '#f5f0e8'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = '#9a8e83'
                  }}
                >
                  <span>{link.label}</span>
                  <span style={{ fontSize: 12, color: '#3a3028' }}>0{i + 1}</span>
                </motion.button>
              ))}
            </div>

            <div style={{ height: 1, background: '#1f1a14', margin: '8px 16px' }} />

            {/* Bottom: social + CTA */}
            <div
              style={{
                padding: '12px 16px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', gap: 8 }}>
                {socialLinks.map(({ href, Icon, label }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      border: '1px solid #2e2820',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#5a5248',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(201,169,110,0.4)'
                      e.currentTarget.style.color = '#c9a96e'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#2e2820'
                      e.currentTarget.style.color = '#5a5248'
                    }}
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>

              <button
                onClick={() => scrollTo('#contatti')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  borderRadius: 9999,
                  background: '#c9a96e',
                  color: '#0e0c0a',
                  padding: '9px 20px',
                  fontSize: 13,
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontFamily: 'inherit',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#e8d5b0')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#c9a96e')}
              >
                Inizia ora <ArrowRight size={12} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 98,
              background: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(2px)',
            }}
          />
        )}
      </AnimatePresence>
    </>
  )
}

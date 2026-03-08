import { motion } from 'framer-motion'
import { Instagram, MessageCircle, Mail, ArrowUp } from 'lucide-react'

const navLinks = [
  ['Come funziona', '#come-funziona'],
  ['Showcase', '#showcase'],
  ['Prezzi', '#prezzi'],
  ['Contatti', '#contatti'],
]

const socialLinks = [
  { href: 'https://instagram.com/inviti.studio', Icon: Instagram, label: 'Instagram' },
  { href: 'https://wa.me/393401234567', Icon: MessageCircle, label: 'WhatsApp' },
  { href: 'mailto:ciao@inviti.studio', Icon: Mail, label: 'Email' },
]

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer style={{ position: 'relative', background: '#0e0c0a', overflow: 'hidden' }}>

      {/* Large background text */}
      <div
        style={{
          position: 'absolute',
          bottom: -20,
          left: '50%',
          transform: 'translateX(-50%)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <span
          className="font-display"
          style={{
            fontSize: 'clamp(80px, 18vw, 200px)',
            fontWeight: 600,
            fontStyle: 'italic',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(201,169,110,0.08)',
            letterSpacing: '-0.03em',
            lineHeight: 1,
            display: 'block',
          }}
        >
          inviti.studio
        </span>
      </div>

      {/* Glow */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: 0,
          transform: 'translateX(-50%)',
          width: 600,
          height: 300,
          background:
            'radial-gradient(ellipse at 50% 100%, rgba(201,169,110,0.06) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, padding: '80px 0 48px' }}>
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginBottom: 10 }}
          >
            <span
              className="font-display"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                fontWeight: 600,
                color: '#f5f0e8',
                fontStyle: 'italic',
                letterSpacing: '-0.02em',
              }}
            >
              inviti<span style={{ color: '#c9a96e' }}>.</span>studio
            </span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{
              fontSize: 14,
              color: '#5a5248',
              marginBottom: 32,
              maxWidth: 300,
              margin: '0 auto 32px',
            }}
          >
            Il modo più elegante per condividere il vostro giorno speciale.
          </motion.p>

          {/* Nav links */}
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            style={{
              display: 'flex',
              gap: 24,
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: 28,
            }}
          >
            {navLinks.map(([label, href]) => (
              <a
                key={href}
                href={href}
                style={{
                  fontSize: 13,
                  color: '#5a5248',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#c9a96e')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#5a5248')}
              >
                {label}
              </a>
            ))}
          </motion.nav>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{
              display: 'flex',
              gap: 12,
              justifyContent: 'center',
              marginBottom: 48,
            }}
          >
            {socialLinks.map(({ href, Icon, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  border: '1px solid #1f1a14',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#5a5248',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(201,169,110,0.4)'
                  e.currentTarget.style.color = '#c9a96e'
                  e.currentTarget.style.background = 'rgba(201,169,110,0.05)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#1f1a14'
                  e.currentTarget.style.color = '#5a5248'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                <Icon size={16} />
              </a>
            ))}
          </motion.div>

          {/* Divider */}
          <div
            style={{
              height: 1,
              background:
                'linear-gradient(to right, transparent, rgba(201,169,110,0.15), transparent)',
              marginBottom: 24,
            }}
          />

          {/* Bottom bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <p style={{ fontSize: 12, color: '#3a3028' }}>
              © {new Date().getFullYear()} inviti.studio — Tutti i diritti riservati
            </p>
            <button
              onClick={scrollToTop}
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                border: '1px solid #2e2820',
                background: 'transparent',
                color: '#5a5248',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#c9a96e'
                e.currentTarget.style.color = '#c9a96e'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#2e2820'
                e.currentTarget.style.color = '#5a5248'
              }}
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

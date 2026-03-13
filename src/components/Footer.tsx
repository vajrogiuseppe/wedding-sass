import { motion } from 'framer-motion'
import { Instagram, MessageCircle, Mail, ArrowUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'

function TikTokIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.16 8.16 0 004.77 1.52V6.82a4.85 4.85 0 01-1-.13z"/>
    </svg>
  )
}

const socialLinks = [
  { href: 'https://www.instagram.com/lovivity?igsh=MXAwc2J3MzFmOTk3ag%3D%3D&utm_source=qr', Icon: Instagram, label: 'Instagram' },
  { href: 'https://tiktok.com/@lovivity', Icon: TikTokIcon, label: 'TikTok' },
  { href: 'https://wa.me/393401234567', Icon: MessageCircle, label: 'WhatsApp' },
  { href: 'mailto:info@lovivity.com', Icon: Mail, label: 'Email' },
]

export function Footer() {
  const { t } = useTranslation()
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const navLinks = [
    [t('nav.links.howItWorks'), '#come-funziona'],
    [t('nav.links.features'), '#showcase'],
    [t('nav.links.advantages'), '#vantaggi'],
    [t('nav.links.contact'), '/assistenza'],
  ]

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
            background: 'linear-gradient(135deg, #faf6f0 0%, #f79adb 50%, #cf8300 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.03em',
            lineHeight: 1,
            display: 'block',
            opacity: 0.07,
          }}
        >
         Lovivity
        </span>
      </div>

      {/* Glow shapes */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: '20%', right: '10%',
          width: 500, height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(147,51,234,0.18) 0%, rgba(192,38,211,0.10) 40%, transparent 70%)',
          filter: 'blur(60px)',
        }} />
        <div style={{
          position: 'absolute',
          top: '40%', right: '25%',
          width: 300, height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(247,154,219,0.12) 0%, transparent 68%)',
          filter: 'blur(50px)',
        }} />
      </div>

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
              Lovivity<span style={{ color: 'rgba(245,240,232,0.4)' }}>.</span>
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
              color: '#bab8b5',
              marginBottom: 32,
              maxWidth: '100%',
              margin: '0 auto 32px',
            }}
          >
            {t('footer.tagline')}
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
                  color: 'rgba(245,240,232,0.55)',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #faf6f0 0%, #f79adb 50%, #cf8300 100%)'
                  e.currentTarget.style.webkitBackgroundClip = 'text'
                  e.currentTarget.style.webkitTextFillColor = 'transparent'
                  e.currentTarget.style.backgroundClip = 'text'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'none'
                  e.currentTarget.style.webkitBackgroundClip = 'unset'
                  e.currentTarget.style.webkitTextFillColor = 'rgba(245,240,232,0.55)'
                  e.currentTarget.style.backgroundClip = 'unset'
                }}
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
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(245,240,232,0.45)',
                  background: 'rgba(255,255,255,0.04)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #6d28d9 0%, #9333ea 45%, #c026d3 100%)'
                  e.currentTarget.style.borderColor = 'transparent'
                  e.currentTarget.style.color = '#fff'
                  e.currentTarget.style.boxShadow = '0 0 16px rgba(147,51,234,0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                  e.currentTarget.style.color = 'rgba(245,240,232,0.45)'
                  e.currentTarget.style.boxShadow = 'none'
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
                'linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)',
              marginBottom: 24,
            }}
          />

          {/* Bottom bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <p style={{ fontSize: 12, color: '#fff', margin: 0 }}>
              © {new Date().getFullYear()} Lovivity — {t('footer.rights')}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              {[['Privacy Policy', '/privacy'], ['Termini e Condizioni', '/termini']].map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  style={{ fontSize: 12, color: '#5a5248', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'rgba(245,240,232,0.9)'}
                  onMouseLeave={e => e.currentTarget.style.color = '#5a5248'}
                >
                  {label}
                </a>
              ))}
              <button
                onClick={scrollToTop}
                style={{
                  width: 36, height: 36, borderRadius: '50%', border: 'none',
                  background: 'linear-gradient(135deg, #6d28d9 0%, #9333ea 45%, #c026d3 100%)',
                  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', transition: 'opacity 0.2s',
                  boxShadow: '0 0 16px rgba(147,51,234,0.4)',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                <ArrowUp size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

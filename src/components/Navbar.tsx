import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { X, Menu, ArrowRight, Instagram, MessageCircle, Mail } from 'lucide-react'
import GlassSurface from '@/components/ui/GlassSurface'
import { BackgroundGradient } from '@/components/ui/BackgroundGradient'

const navLinks = [
  { label: 'Come funziona', href: '#come-funziona' },
  { label: 'Funzionalità', href: '#funzionalita' },
  { label: 'Prezzi', href: '#prezzi' },
  { label: 'Contatti', href: '#contatti' },
]

const socialLinks = [
  { href: 'https://instagram.com/inviti.studio', Icon: Instagram, label: 'Instagram' },
  { href: 'https://wa.me/393401234567', Icon: MessageCircle, label: 'WhatsApp' },
  { href: 'mailto:ciao@inviti.studio', Icon: Mail, label: 'Email' },
]

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return isMobile
}

export function Navbar() {
  const isMobile = useIsMobile()
  const [expanded, setExpanded] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const [isOverDark, setIsOverDark] = useState(true)

  useEffect(() => {
    const sections = document.querySelectorAll('#hero, footer, #come-funziona, #funzionalita, #dashboard')
    if (!sections.length) return

    const darkSections = new Set(['hero', 'come-funziona', 'funzionalita', 'dashboard'])
    const intersectingMap = new Map<Element, boolean>()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const id = (entry.target as HTMLElement).id || entry.target.tagName.toLowerCase()
          const isDark = darkSections.has(id) || entry.target.tagName.toLowerCase() === 'footer'
          if (isDark) {
            intersectingMap.set(entry.target, entry.isIntersecting)
          }
        })
        const anyDark = Array.from(intersectingMap.values()).some(Boolean)
        setIsOverDark(anyDark)
      },
      { rootMargin: '-72% 0px 0px 0px' }
    )

    sections.forEach(sec => observer.observe(sec))
    return () => sections.forEach(sec => observer.unobserve(sec))
  }, [])

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    setExpanded(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => { if (!isMobile) setMenuOpen(false) }, [isMobile])

  const textColor = isOverDark ? '#fff' : '#1a1410'
  const glBrightness = isOverDark ? 18 : 90
  const glBgOpacity = isOverDark ? 0.10 : 0.62

  const pill = (
    <GlassSurface
      width="auto" height="auto" borderRadius={9999}
      mixBlendMode="normal"
      brightness={glBrightness}
      backgroundOpacity={glBgOpacity}
      style={{ pointerEvents: 'auto', boxShadow: '0 4px 24px rgba(0,0,0,0.18)', transition: 'all 0.5s ease' }}
    >
      {isMobile ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px 10px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
            <a href="/" className="font-display" style={{
              fontSize: 15, fontStyle: 'italic', fontWeight: 600,
              color: textColor, textDecoration: 'none', flex: 1,
              letterSpacing: '0.01em', textShadow: isOverDark ? '0 1px 4px rgba(0,0,0,0.4)' : 'none',
              transition: 'color 0.35s ease',
            }}>
              lovivity<span style={{ color: '#c9a96e' }}></span>
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                width: 36, height: 36, borderRadius: '50%',
                border: `1px solid ${isOverDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)'}`,
                background: menuOpen ? '#fff' : 'rgba(255,255,255,0.15)',
                color: menuOpen ? '#000' : textColor,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'all 0.2s', flexShrink: 0,
              }}
              aria-label="Menu"
            >
              {menuOpen ? <X size={15} /> : <Menu size={15} />}
            </button>
          </div>
        </div>
      ) : (
        <motion.div
          layout
          onHoverStart={() => setExpanded(true)}
          onHoverEnd={() => setExpanded(false)}
          style={{
            display: 'flex', alignItems: 'center',
            padding: '11px 18px', cursor: 'default',
            overflow: 'hidden', whiteSpace: 'nowrap',
          }}
          transition={{ layout: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } }}
        >
          <a href="/" className="font-display" style={{
            fontSize: 15, fontStyle: 'italic', fontWeight: 600,
            color: textColor, textDecoration: 'none', flexShrink: 0,
            letterSpacing: '0.01em', textShadow: isOverDark ? '0 1px 4px rgba(0,0,0,0.4)' : 'none',
            transition: 'color 0.35s ease',
          }}>
            lovivity<span style={{ color: '#c9a96e' }}>.</span>
          </a>

          <AnimatePresence mode="wait">
            {!expanded ? (
              <motion.div key="dots"
                initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }} transition={{ duration: 0.2 }}
                style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 14, overflow: 'hidden' }}
              >
                {[0, 1, 2].map(i => (
                  <motion.span key={i}
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.2 }}
                    style={{ width: 4, height: 4, borderRadius: '50%', background: `rgba(${isOverDark ? '255,255,255,0.6' : '0,0,0,0.6'})`, display: 'block', flexShrink: 0 }}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div key="links"
                initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }} transition={{ duration: 0.25 }}
                style={{ display: 'flex', alignItems: 'center', gap: 2, marginLeft: 16, overflow: 'hidden' }}
              >
                <span style={{ width: 1, height: 16, background: `rgba(${isOverDark ? '255,255,255,0.25' : '0,0,0,0.25'})`, marginRight: 14, flexShrink: 0 }} />
                {navLinks.map((link, i) => (
                  <motion.button key={link.href}
                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => scrollTo(link.href)}
                    style={{
                      background: 'none', border: 'none', color: textColor,
                      fontSize: 13, fontWeight: 500, padding: '4px 10px', borderRadius: 6,
                      cursor: 'pointer', fontFamily: 'inherit',
                      transition: 'color 0.35s ease, background 0.15s',
                      flexShrink: 0,
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = textColor; e.currentTarget.style.background = 'rgba(226,212,212,0.12)' }}
                    onMouseLeave={e => { e.currentTarget.style.color = textColor; e.currentTarget.style.background = 'none' }}
                  >
                    {link.label}
                  </motion.button>
                ))}
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: navLinks.length * 0.05 + 0.05 }}
                  whileHover={{ scale: 1.05, background: '#e0c080' } as any}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => scrollTo('#contatti')}
                  style={{
                    marginLeft: 8, display: 'inline-flex', alignItems: 'center', gap: 5,
                    borderRadius: 9999, background: '#c9a96e', color: '#0e0c0a',
                    padding: '7px 14px', fontSize: 12, fontWeight: 700,
                    border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                    flexShrink: 0,
                  }}
                >
                  Inizia ora <ArrowRight size={11} />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </GlassSurface>
  )

  return (
    <>
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        zIndex: 100, display: 'flex', justifyContent: 'center',
        pointerEvents: 'none', padding: '0 0 24px',
      }}>
        {!isMobile
          ? (isOverDark
              ? pill
              : <BackgroundGradient containerClassName="rounded-full" className="rounded-full" animate={false}>{pill}</BackgroundGradient>
            )
          : pill
        }
      </div>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {isMobile && menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: 'fixed', bottom: 88, left: 16, right: 16,
              zIndex: 99, maxWidth: 440, margin: '0 auto',
            }}
          >
            <GlassSurface width="100%" height="auto" borderRadius={20} brightness={90} backgroundOpacity={0.65} mixBlendMode="normal">
              <div style={{ padding: '8px 8px 0', width: '100%' }}>
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => scrollTo(link.href)}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center',
                      justifyContent: 'space-between', padding: '14px 16px',
                      borderRadius: 12, border: 'none', background: 'transparent',
                      color: '#1a1410', fontSize: 15, fontWeight: 500,
                      cursor: 'pointer', transition: 'all 0.2s',
                      fontFamily: 'inherit', textAlign: 'left',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.05)'; e.currentTarget.style.color = '#c9a96e' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1a1410' }}
                  >
                    <span>{link.label}</span>
                    <span style={{ fontSize: 11, color: 'rgba(0,0,0,0.25)' }}>0{i + 1}</span>
                  </motion.button>
                ))}
              </div>

              <div style={{ height: 1, background: 'rgba(0,0,0,0.08)', margin: '8px 16px' }} />

              <div style={{ padding: '12px 16px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: 8 }}>
                  {socialLinks.map(({ href, Icon, label }) => (
                    <a key={href} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                      style={{
                        width: 36, height: 36, borderRadius: 10,
                        border: '1px solid rgba(0,0,0,0.12)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'rgba(26,20,16,0.4)', transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,169,110,0.5)'; e.currentTarget.style.color = '#c9a96e' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.12)'; e.currentTarget.style.color = 'rgba(26,20,16,0.4)' }}
                    >
                      <Icon size={14} />
                    </a>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05, background: '#e0c080' } as any}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => scrollTo('#contatti')}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    borderRadius: 9999, background: '#c9a96e', color: '#0e0c0a',
                    padding: '9px 20px', fontSize: 13, fontWeight: 700,
                    border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                  }}
                >
                  Inizia ora <ArrowRight size={12} />
                </motion.button>
              </div>
            </GlassSurface>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BACKDROP MOBILE */}
      <AnimatePresence>
        {isMobile && menuOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            style={{ position: 'fixed', inset: 0, zIndex: 98, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(2px)' }}
          />
        )}
      </AnimatePresence>
    </>
  )
}

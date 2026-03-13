import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { X, Menu, Instagram, MessageCircle, Mail } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import GlassSurface from '@/components/ui/GlassSurface'
import { BackgroundGradient } from '@/components/ui/BackgroundGradient'
import StarBorder from '@/components/ui/StarBorder'
import GlareHover from '@/components/ui/GlareHover'

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
  const [ctaHover, setCtaHover] = useState(false)
  const { t, i18n } = useTranslation()

  const navLinks = [
    { label: t('nav.links.howItWorks'), href: '#come-funziona' },
    { label: t('nav.links.features'), href: '#funzionalita' },
    { label: t('nav.links.pricing'), href: '#prezzi' },
    { label: t('nav.links.contact'), href: '#contatti' },
  ]

  const LangSwitch = ({ dark }: { dark: boolean }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {(['it', 'en'] as const).map((lang, idx) => (
        <React.Fragment key={lang}>
          {idx > 0 && (
            <span style={{ fontSize: 10, color: dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)', padding: '0 1px' }}>|</span>
          )}
          <button
            onClick={() => i18n.changeLanguage(lang)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 11, fontWeight: i18n.language === lang ? 700 : 400,
              color: i18n.language === lang
                ? (dark ? '#fff' : '#1a1410')
                : (dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.35)'),
              padding: '2px 4px', fontFamily: 'inherit',
              transition: 'color 0.2s',
              letterSpacing: '0.05em',
            }}
          >
            {lang.toUpperCase()}
          </button>
        </React.Fragment>
      ))}
    </div>
  )

  useEffect(() => {
    // Light sections = navbar text dark. Everything else = navbar text white.
    const lightIds = new Set(['come-funziona', 'testimonianze', 'contatti'])
    const allIds = ['hero', 'come-funziona', 'funzionalita', 'showcase', 'dashboard', 'testimonianze', 'confronto', 'prezzi', 'faq', 'contatti']
    const elements: Element[] = [
      ...allIds.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[],
      document.querySelector('footer'),
    ].filter(Boolean) as Element[]

    const activeLight = new Set<Element>()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const id = (entry.target as HTMLElement).id || ''
          if (lightIds.has(id)) {
            if (entry.isIntersecting) activeLight.add(entry.target)
            else activeLight.delete(entry.target)
          }
        })
        setIsOverDark(activeLight.size === 0)
      },
      { rootMargin: '-35% 0px -35% 0px' }
    )

    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
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

  const mobilePill = (
    <div
      style={{
        pointerEvents: 'auto',
        borderRadius: 9999,
        display: 'flex', alignItems: 'center',
        padding: '10px 12px 10px 20px',
        background: isOverDark ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.72)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${isOverDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.08)'}`,
        boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
        transition: 'background 0.5s ease, border-color 0.5s ease',
        gap: 12,
      }}
    >
      <a href="/" className="font-display" style={{
        fontSize: 15, fontStyle: 'italic', fontWeight: 600,
        color: textColor, textDecoration: 'none', flex: 1,
        letterSpacing: '0.01em', textShadow: isOverDark ? '0 1px 4px rgba(0,0,0,0.4)' : 'none',
        transition: 'color 0.35s ease',
      }}>
        Lovivity<span style={{ color: '#c9a96e' }}></span>
      </a>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          width: 36, height: 36, borderRadius: '50%',
          border: `1px solid ${isOverDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)'}`,
          background: menuOpen ? '#fff' : (isOverDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.06)'),
          color: menuOpen ? '#000' : textColor,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', transition: 'all 0.2s', flexShrink: 0,
        }}
        aria-label="Menu"
      >
        {menuOpen ? <X size={15} /> : <Menu size={15} />}
      </button>
    </div>
  )

  const pill = (
    <GlassSurface
      width="auto" height="auto" borderRadius={9999}
      mixBlendMode="normal"
      brightness={glBrightness}
      backgroundOpacity={glBgOpacity}
      style={{ pointerEvents: 'auto', boxShadow: '0 4px 24px rgba(0,0,0,0.18)', transition: 'all 0.5s ease' }}
    >
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
            Lovivity<span style={{ color: '#c9a96e' }}>.</span>
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
                <motion.div
                  initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }}
                  transition={{ delay: navLinks.length * 0.05 + 0.02, duration: 0.2 }}
                  style={{ marginLeft: 8, flexShrink: 0, overflow: 'hidden' }}
                >
                  <LangSwitch dark={isOverDark} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: navLinks.length * 0.05 + 0.05 }}
                  whileTap={{ scale: 0.97 }}
                  onMouseEnter={() => setCtaHover(true)}
                  onMouseLeave={() => setCtaHover(false)}
                  style={{
                    marginLeft: 8, flexShrink: 0, borderRadius: 9999,
                    boxShadow: ctaHover
                      ? '0 0 22px rgba(192,132,252,0.9), 0 0 42px rgba(139,92,246,0.55), 0 0 64px rgba(192,132,252,0.25)'
                      : '0 0 12px rgba(192,132,252,0.55), 0 0 26px rgba(139,92,246,0.3), 0 0 40px rgba(192,132,252,0.14)',
                    transition: 'box-shadow 0.3s ease',
                  }}
                >
                  <StarBorder
                    color="#f0abfc"
                    speed="2.5s"
                    thickness={1}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
                  >
                    <GlareHover
                      width="auto"
                      height="auto"
                      background={ctaHover
                        ? 'linear-gradient(135deg, #9333ea 0%, #c026d3 45%, #f472b6 100%)'
                        : 'linear-gradient(135deg, #6d28d9 0%, #9333ea 45%, #c026d3 100%)'}
                      borderRadius="9999px"
                      borderColor="transparent"
                      glareColor="#f79adb"
                      glareOpacity={0.55}
                      glareAngle={-45}
                      glareSize={200}
                      transitionDuration={550}
                      onClick={() => scrollTo('#contatti')}
                      style={{
                        padding: '6px 16px',
                        fontSize: 12,
                        fontWeight: 600,
                        color: '#fff',
                        whiteSpace: 'nowrap',
                        letterSpacing: '0.02em',
                        transition: 'background 0.4s ease',
                      } as React.CSSProperties}
                    >
                      {t('nav.cta')}
                    </GlareHover>
                  </StarBorder>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
    </GlassSurface>
  )

  return (
    <>
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        zIndex: 100, display: 'flex', justifyContent: 'center',
        pointerEvents: 'none', padding: '0 0 24px',
      }}>
        {isMobile
          ? mobilePill
          : (isOverDark
              ? pill
              : <BackgroundGradient containerClassName="rounded-full" className="rounded-full" animate={false}>{pill}</BackgroundGradient>
            )
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
              borderRadius: 20,
              background: 'rgba(255,255,255,0.88)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.6)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
              overflow: 'hidden',
            }}
          >
            {/* Nav links */}
            <div style={{ padding: '8px 8px 0' }}>
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
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(147,51,234,0.08)'; e.currentTarget.style.color = '#9333ea' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1a1410' }}
                >
                  <span>{link.label}</span>
                  <span style={{ fontSize: 11, color: 'rgba(0,0,0,0.25)' }}>0{i + 1}</span>
                </motion.button>
              ))}
            </div>

            <div style={{ height: 1, background: 'rgba(0,0,0,0.08)', margin: '8px 16px' }} />

            {/* CTA */}
            <div style={{ padding: '4px 16px 0' }}>
              <motion.div
                whileTap={{ scale: 0.97 }}
                style={{
                  borderRadius: 9999,
                  boxShadow: '0 0 12px rgba(192,132,252,0.55), 0 0 26px rgba(139,92,246,0.3)',
                  width: '100%',
                }}
              >
                <StarBorder
                  color="#f0abfc"
                  speed="2.5s"
                  thickness={1}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit', width: '100%', display: 'block' }}
                >
                  <GlareHover
                    width="100%"
                    height="auto"
                    background="linear-gradient(135deg, #6d28d9 0%, #9333ea 45%, #c026d3 100%)"
                    borderRadius="9999px"
                    borderColor="transparent"
                    glareColor="#f79adb"
                    glareOpacity={0.55}
                    glareAngle={-45}
                    glareSize={200}
                    transitionDuration={550}
                    onClick={() => scrollTo('#contatti')}
                    style={{
                      padding: '12px 22px',
                      fontSize: 14,
                      fontWeight: 600,
                      color: '#fff',
                      textAlign: 'center',
                      letterSpacing: '0.02em',
                    } as React.CSSProperties}
                  >
                    {t('nav.cta')}
                  </GlareHover>
                </StarBorder>
              </motion.div>
            </div>

            <div style={{ height: 1, background: 'rgba(0,0,0,0.08)', margin: '12px 16px 0' }} />

            {/* Lang switch */}
            <div style={{ padding: '0 16px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
              <LangSwitch dark={false} />
            </div>

            {/* Social links */}
            <div style={{ padding: '12px 16px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
              {socialLinks.map(({ href, Icon, label }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  style={{
                    width: 38, height: 38, borderRadius: 10,
                    border: '1px solid rgba(0,0,0,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(26,20,16,0.45)', transition: 'all 0.2s',
                    background: 'rgba(0,0,0,0.03)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(147,51,234,0.4)'; e.currentTarget.style.color = '#9333ea' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.12)'; e.currentTarget.style.color = 'rgba(26,20,16,0.45)' }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
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

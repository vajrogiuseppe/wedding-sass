import { lazy, Suspense, useRef } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import { useScroll, useTransform, motion, MotionConfig } from 'framer-motion'

const isMobileDevice = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { MarketingHeroSection } from '@/sections/MarketingHeroSection'
import { HowItWorksSection } from '@/sections/HowItWorksSection'
import { MagicBentoSection } from '@/sections/MagicBentoSection'
import { DashboardPreviewSection } from '@/sections/DashboardPreviewSection'
import { GallerySection } from '@/sections/GallerySection'
import { ComparisonSection } from '@/sections/ComparisonSection'
import { PricingSection } from '@/sections/PricingSection'
import { FAQSection } from '@/sections/FAQSection'
import { ScrollVelocity } from '@/components/ui/ScrollVelocity'
import { FeaturesSection } from '@/sections/FeaturesSection'
import { LinkColorProvider } from './components/LinkColorContext'
import { CookieBanner } from '@/components/CookieBanner'

const AdminDashboard  = lazy(() => import('@/pages/AdminDashboard'))
const JourneyPage     = lazy(() => import('@/pages/JourneyPage'))
const EnvelopePage    = lazy(() => import('@/pages/EnvelopePage'))
const GraziePage      = lazy(() => import('@/pages/GraziePage'))
const AssistenzaPage  = lazy(() => import('@/pages/AssistenzaPage'))
const PrivacyPage     = lazy(() => import('@/pages/PrivacyPage'))

function ShowcaseDashboardBg({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const shapeY = useTransform(scrollYProgress, [0, 1], ['-20%', '20%'])

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        background: `
          radial-gradient(ellipse 50% 45% at 85% 80%, rgba(185,175,202,0.12) 0%, transparent 48%),
          linear-gradient(150deg, #110d20 0%, #2b1a6e 55%, #110d20 100%)
        `,
        overflow: 'hidden',
      }}
    >
      {/* Animated shape #444b4d */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          y: shapeY,
          background: 'radial-gradient(ellipse 65% 50% at 20% 50%, rgba(68,75,77,0.55) 0%, transparent 55%)',
          willChange: 'transform',
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  )
}

function LandingPage() {
  return (
    <MotionConfig reducedMotion={isMobileDevice ? 'always' : 'never'}>
    <div style={{ background: '#0e0c0a' }}>
      {/* Fixed base bg */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', background: '#0e0c0a' }} />

      {/* Content sits above the fixed background */}
      <div style={{ position: 'relative', zIndex: 1 }}>
      <Navbar />
      <LinkColorProvider isLight={true}>
        <main>
          <LinkColorProvider isLight={false}>
            <MarketingHeroSection />
          </LinkColorProvider>

          <HowItWorksSection />
          <MagicBentoSection />
          <ShowcaseDashboardBg>
            <FeaturesSection />
            <DashboardPreviewSection />
          </ShowcaseDashboardBg>

          <ScrollVelocity
            texts={['Save The Date | RSVP', 'Wedding Invitation | Digital Invitation']}
            velocity={90}
            numCopies={12}
            className="custom-scroll-text"
            parallaxStyle={{ padding: '0px 0', background: 'rgb(21 15 46)' }}
            scrollerStyle={{ fontSize: 54, fontWeight: 600 }}
          />

       

          <GallerySection />

          {/* Comparison + Pricing — stesso sfondo scuro sfumato blu/viola */}
          <div style={{ position: 'relative', background: 'linear-gradient(180deg, #0e0c0a 0%, #0d0b1c 30%, #100d20 55%, #0e0b1a 80%, #0e0c0a 100%)', overflow: 'hidden' }}>
            {/* Glow shapes in cima a tutto, pointer-events none */}
            <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
              {/* Nebulosa centrale tra le due sezioni */}
              <div style={{
                position: 'absolute', left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)',
                width: 800, height: 400,
                borderRadius: '50%',
                background: 'radial-gradient(ellipse, rgba(147,51,234,0.32) 0%, rgba(192,38,211,0.18) 40%, transparent 70%)',
                filter: 'blur(80px)',
              }} />
              {/* Flare oro — sinistra */}
              <div style={{
                position: 'absolute', left: '8%', top: '48%',
                transform: 'translateY(-50%)',
                width: 400, height: 300,
                borderRadius: '50%',
                background: 'radial-gradient(ellipse, rgba(207,131,0,0.28) 0%, transparent 65%)',
                filter: 'blur(60px)',
              }} />
              {/* Flare rosa — destra */}
              <div style={{
                position: 'absolute', right: '6%', top: '52%',
                transform: 'translateY(-50%)',
                width: 360, height: 280,
                borderRadius: '50%',
                background: 'radial-gradient(ellipse, rgba(247,154,219,0.24) 0%, transparent 65%)',
                filter: 'blur(56px)',
              }} />
            </div>
            <ComparisonSection />
            <PricingSection />
          </div>
          <FAQSection />
        </main>

        <LinkColorProvider isLight={false}>
          <Footer />
        </LinkColorProvider>
      </LinkColorProvider>
      <CookieBanner />
      </div>
    </div>
    </MotionConfig>
  )
}

export default function App() {
  return (
    <BrowserRouter basename="/">
      <Toaster position="bottom-right" richColors theme="dark" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/percorso"
          element={
            <Suspense fallback={<div style={{ minHeight: '100vh', background: '#faf7f2' }} />}>
              <JourneyPage />
            </Suspense>
          }
        />
        <Route
          path="/busta"
          element={
            <Suspense fallback={<div style={{ minHeight: '100vh', background: '#f0e6d0' }} />}>
              <EnvelopePage />
            </Suspense>
          }
        />
    
        <Route
          path="/grazie"
          element={
            <Suspense fallback={<div style={{ minHeight: '100vh', background: '#0e0c0a' }} />}>
              <GraziePage />
            </Suspense>
          }
        />
        <Route
          path="/assistenza"
          element={
            <Suspense fallback={<div style={{ minHeight: '100vh', background: '#0e0c0a' }} />}>
              <AssistenzaPage />
            </Suspense>
          }
        />
        <Route
          path="/privacy"
          element={
            <Suspense fallback={<div style={{ minHeight: '100vh', background: '#0e0c0a' }} />}>
              <PrivacyPage />
            </Suspense>
          }
        />
        <Route
          path="/admin"
          element={
            <Suspense
              fallback={
                <div style={{ minHeight: '100vh', background: '#0e0c0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ color: '#5a5248', fontSize: 14 }}>Caricamento...</div>
                </div>
              }
            >
              <AdminDashboard />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

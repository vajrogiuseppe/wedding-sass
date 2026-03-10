import { lazy, Suspense, useRef } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import { useScroll, useTransform, motion } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { MarketingHeroSection } from '@/sections/MarketingHeroSection'
import { HowItWorksSection } from '@/sections/HowItWorksSection'
import { MagicBentoSection } from '@/sections/MagicBentoSection'
import { DashboardPreviewSection } from '@/sections/DashboardPreviewSection'
import { GallerySection } from '@/sections/GallerySection'
import { PricingSection } from '@/sections/PricingSection'
import { FAQSection } from '@/sections/FAQSection'
import { ContactSection } from '@/sections/ContactSection'
import { ScrollVelocity } from '@/components/ui/ScrollVelocity'
import { FeaturesSection } from '@/sections/FeaturesSection'
import { LinkColorProvider } from './components/LinkColorContext'

const AdminDashboard  = lazy(() => import('@/pages/AdminDashboard'))
const JourneyPage     = lazy(() => import('@/pages/JourneyPage'))
const EnvelopePage    = lazy(() => import('@/pages/EnvelopePage'))

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
    <div style={{ background: '#0e0c0a' }}>
      {/* Fixed base bg */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', background: '#0e0c0a' }} />

      {/* Content sits above the fixed background */}
      <div style={{ position: 'relative', zIndex: 1 }}>
      <Navbar />
      <LinkColorProvider isLight={true}>
        <main style={{ paddingBottom: 80 }}>
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
            parallaxStyle={{ padding: '0px 0', background: '#1e1a14' }}
            scrollerStyle={{ fontSize: 54, fontWeight: 600 }}
          />

       

          <GallerySection />
          <PricingSection />
          <FAQSection />
          <ContactSection />
        </main>

        <LinkColorProvider isLight={false}>
          <Footer />
        </LinkColorProvider>
      </LinkColorProvider>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter basename="/demo">
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

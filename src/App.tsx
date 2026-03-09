import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { MarketingHeroSection } from '@/sections/MarketingHeroSection'
import { HowItWorksSection } from '@/sections/HowItWorksSection'
import { FeaturedSection } from '@/sections/FeaturedSection'
import { FeaturesSection } from '@/sections/FeaturesSection'
import { InvitationShowcaseSection } from '@/sections/InvitationShowcaseSection'
import { GallerySection } from '@/sections/GallerySection'
import { PricingSection } from '@/sections/PricingSection'
import { FAQSection } from '@/sections/FAQSection'
import { ContactSection } from '@/sections/ContactSection'
import { ScrollVelocity } from '@/components/ui/ScrollVelocity'
import { LinkColorProvider } from './components/LinkColorContext'

const AdminDashboard  = lazy(() => import('@/pages/AdminDashboard'))
const JourneyPage     = lazy(() => import('@/pages/JourneyPage'))
const EnvelopePage    = lazy(() => import('@/pages/EnvelopePage'))
const EnvelopePage3D  = lazy(() => import('@/pages/EnvelopePage3D'))
function LandingPage() {
  return (
    <>
      <Navbar />
        <LinkColorProvider isLight={true}>
        <main style={{ paddingBottom: 80 }}>
          <LinkColorProvider isLight={false}>
            <MarketingHeroSection />
          </LinkColorProvider>
          <HowItWorksSection />
          <FeaturedSection />
          <FeaturesSection />

          <ScrollVelocity
            texts={['inviti digitali eleganti', 'RSVP integrato']}
            velocity={90}
            numCopies={12}
            className="custom-scroll-text"
            parallaxStyle={{ padding: '10px 0', background: '#1e1a14' }}
            scrollerStyle={{ fontSize: 35, fontWeight: 700, color: '#c9a96e', letterSpacing: '0.05em' }}
          />

          <InvitationShowcaseSection />
          <GallerySection />
          <PricingSection />
          <FAQSection />
          <ContactSection />
        </main>

        <LinkColorProvider isLight={false}>
          <Footer />
        </LinkColorProvider>
      </LinkColorProvider>
    </>
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
          path="/busta2"
          element={
            <Suspense fallback={<div style={{ minHeight: '100vh', background: '#0e0c0a' }} />}>
              <EnvelopePage3D />
            </Suspense>
          }
        />
        
        <Route
          path="/admin"
          element={
            <Suspense
              fallback={
                <div
                  style={{
                    minHeight: '100vh',
                    background: '#0e0c0a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
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

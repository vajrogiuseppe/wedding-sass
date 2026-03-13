import GradienText from "@/components/ui/GradienText";
import { FadeContent } from '@/components/ui/FadeContent'

interface Testimonial {
  name: string
  role: string
  text: string
  rating: number
  initials: string
}

const testimonials: Testimonial[] = [
  {
    name: 'Sofia Bianchi',
    role: 'Sposa · Giugno 2025',
    text: 'Incredibile! Il nostro invito digitale era esattamente come lo avevo immaginato. Tutti i nostri ospiti sono rimasti meravigliati dalla cura dei dettagli.',
    rating: 5,
    initials: 'SB',
  },
  {
    name: 'Marco Ferretti',
    role: 'Sposo · Maggio 2025',
    text: 'Setup in meno di 10 minuti e il risultato era professionale come un sito web vero. La dashboard RSVP ci ha salvato tantissimo tempo.',
    rating: 5,
    initials: 'MF',
  },
  {
    name: 'Anna Conti',
    role: 'Sposa · Settembre 2025',
    text: "Non avrei potuto gestire 180 ospiti senza questa piattaforma. Le notifiche in tempo reale e l'export CSV sono stati preziosissimi.",
    rating: 5,
    initials: 'AC',
  },
  {
    name: 'Giulia Romano',
    role: 'Sposa · Aprile 2025',
    text: "Design da urlo, semplicità d'uso assoluta. In 24 ore avevamo già ricevuto le prime conferme. Servizio top!",
    rating: 5,
    initials: 'GR',
  },
  {
    name: 'Luca Marino',
    role: 'Sposo · Luglio 2025',
    text: 'Abbiamo scelto il pacchetto Landing RSVP e ne vale assolutamente la pena. Il link personalizzato ha stupito tutti i nostri invitati.',
    rating: 5,
    initials: 'LM',
  },
  {
    name: 'Chiara Esposito',
    role: 'Sposa · Agosto 2025',
    text: 'Il supporto è stato eccezionale. Risposta entro poche ore e disponibilità totale per ogni modifica. Altamente raccomandato.',
    rating: 5,
    initials: 'CE',
  },
  {
    name: 'Roberto Vitale',
    role: 'Sposo · Marzo 2025',
    text: "Cercavo qualcosa di moderno e non il solito PDF. Lovivity ha superato ogni aspettativa. L'interfaccia ospiti è bellissima.",
    rating: 5,
    initials: 'RV',
  },
  {
    name: 'Martina Gallo',
    role: 'Sposa · Ottobre 2025',
    text: 'Finalmente un servizio italiano di qualità! Prezzi onesti e risultato che vale il doppio. Consigliatissimo a tutte le coppie.',
    rating: 5,
    initials: 'MG',
  },
  {
    name: 'Davide Costa',
    role: 'Sposo · Novembre 2025',
    text: 'Ho apprezzato la possibilità di aggiornare i contenuti dopo la pubblicazione. Perfetto quando i dettagli della location cambiano.',
    rating: 5,
    initials: 'DC',
  },
]

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div
      style={{
        borderRadius: 16,
        border: '1px solid #e0d8cc',
        background: '#ffffff',
        padding: '20px 22px',
        marginBottom: 14,
        boxShadow: '0 2px 12px rgba(30,26,20,0.07)',
      }}
    >
      {/* Stars */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
        {[1, 2, 3, 4, 5].map((n) => (
          <div
            key={n}
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: n <= t.rating ? 'rgba(245,240,232,0.8)' : '#e0d8cc',
            }}
          />
        ))}
      </div>

      <p style={{ fontSize: 13, lineHeight: 1.7, color: '#7a6f63', marginBottom: 16 }}>
        &ldquo;{t.text}&rdquo;
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: '50%',
            background: 'rgba(201,169,110,0.1)',
            border: '1px solid rgba(201,169,110,0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 11,
            fontWeight: 700,
            color: 'rgba(245,240,232,0.7)',
            flexShrink: 0,
          }}
        >
          {t.initials}
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#1e1a14' }}>{t.name}</div>
          <div style={{ fontSize: 11, color: '#b5a898' }}>{t.role}</div>
        </div>
      </div>
    </div>
  )
}

function MarqueeColumn({ items, reverse = false }: { items: Testimonial[]; reverse?: boolean }) {
  const doubled = [...items, ...items]
  return (
    <div style={{ overflow: 'hidden', flex: 1 }}>
      <div style={{
        display: 'flex', flexDirection: 'column',
        animation: `${reverse ? 'marquee-down' : 'marquee-up'} 32s linear infinite`,
      }}>
        {doubled.map((t, i) => (
          <TestimonialCard key={i} t={t} />
        ))}
      </div>
    </div>
  )
}

function MarqueeRow({ items }: { items: Testimonial[] }) {
  const doubled = [...items, ...items]
  return (
    <div style={{ overflow: 'hidden', width: '100%' }}>
      <div style={{
        display: 'flex', gap: 12, width: 'max-content', paddingLeft: 20,
        animation: 'marquee-left 40s linear infinite',
      }}>
        {doubled.map((t, i) => (
          <div key={i} style={{ width: 280, flexShrink: 0 }}>
            <TestimonialCard t={t} />
          </div>
        ))}
      </div>
    </div>
  )
}

export function GallerySection() {
  const col1 = testimonials.slice(0, 3)
  const col2 = testimonials.slice(3, 6)
  const col3 = testimonials.slice(6, 9)

  return (
    <section id="testimonianze" style={{ padding: '100px 0', background: '#f5f0e8', overflow: 'hidden', position: 'relative' }}>
      {/* Header */}
      <FadeContent blur duration={800} className="mx-auto max-w-7xl px-6 lg:px-8 mb-16 text-center">
        <span style={{
            display: 'inline-block',
            borderRadius: 9999,
            border: '1px solid rgba(201,169,110,0.4)',
            background: 'rgba(201,169,110,0.08)',
            padding: '6px 16px',
            fontSize: 11,
            fontWeight: 600,
            color: '#a07838',
            letterSpacing: '0.15em',
            textTransform: 'uppercase' as const,
            marginBottom: 16,
          }}
        >
          Testimonianze
        </span>
        <h2
          className="font-display"
          style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            fontWeight: 600,
            color: '#1e1a14',
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          <GradienText colors={["#faf6f0", "#f79adb", "#cf8300"]}>
            <span style={{ fontStyle: "italic" }}>
              merita un invito perfetto.
            </span>
          </GradienText>
        </h2>
        <p style={{ fontSize: 15, color: '#7a6e65', maxWidth: 400, margin: '0 auto' }}>
          Più di 500 matrimoni realizzati con inviti digitali che hanno emozionato.
        </p>
      </FadeContent>

      {/* Desktop: 3-column vertical marquee */}
      <div
        className="hidden md:grid"
        style={{
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 14,
          paddingLeft: 48,
          paddingRight: 48,
          maxHeight: 580,
          overflow: 'hidden',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <MarqueeColumn items={col1} />
        <MarqueeColumn items={col2} reverse />
        <MarqueeColumn items={col3} />
      </div>

      {/* Mobile: horizontal marquee animato */}
      <div className="md:hidden">
        <MarqueeRow items={testimonials} />
      </div>
    </section>
  )
}

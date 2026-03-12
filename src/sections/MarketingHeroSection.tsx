import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import StarBorder from "@/components/ui/StarBorder";
import Ballpit from "@/components/ui/Ballpit";
import GradienText from "@/components/ui/GradienText";
import Grainient from "@/components/ui/Grainient";
import GlareHover from "@/components/ui/GlareHover";

const people = [
  {
    name: "Chiara",
    avatar: "assets/people/chiara.png",
  },
  {
    name: "Maria",
    avatar: "assets/people/maria.png",
  },
  {
    name: "Pietro",
    avatar: "assets/people/pietro.png",
  },
  {
    name: "Luca",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80",
  },
  
];

export function MarketingHeroSection() {
  const [ready, setReady] = useState(false);
  const [iniziaHover, setIniziaHover] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        background: "#0e0c0a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Grainient background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Grainient
          color1="#444b4d"
          color2="#2b1a6e"
          color3="#b9afca"
          warpStrength={1.2}
          warpFrequency={2}
          grainAmount={0.08}
          contrast={1.4}
          timeSpeed={1}
        />
      </div>

      {/* Ballpit background */}
      <div style={{ position: "absolute", inset: 0 }}>
        <Ballpit
          count={80}
          gravity={0.2}
          friction={0.99}
          wallBounce={0.95}
          followCursor={false}
          colors={[0xf5e4c2, 0xe8c87c, 0xd4a060, 0xf0d8b4, 0xd0907a, 0xfaf0e0]}
          minSize={0.3}
          maxSize={0.9}
        />
      </div>

      {/* Central luxury glow */}
      <div
        style={{
          position: "absolute",
          top: "35%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 900,
          height: 500,
          pointerEvents: "none",
          background:
            "radial-gradient(circle, rgba(248, 223, 177, 0.45), rgba(200,140,100,0.18) 50%, transparent 72%)",
          filter: "blur(90px)",
        }}
      />

      {/* Main overlay (soft vignette) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `
          radial-gradient(
            ellipse 80% 70% at 50% 40%,
            rgba(43, 95, 236, 0.22) 0%,
            rgba(66, 16, 202, 0.25) 55%,
            rgba(37, 0, 129, 0.82) 100%
          )
        `,
        }}
      />

      {/* Light on balls */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 240,

          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          padding: "0 24px",
          maxWidth: "100%",
          margin: "0 auto",
        }}
      >
        {/* Payoff */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            fontSize: 14,
            fontWeight: 700,
            textTransform: "uppercase",
            color: "#d4aa6e",
            marginBottom: 8,
          }}
          className="font-mono"
        >
          Il servizio di inviti digitali per il vostro matrimonio
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display titlehero"
          style={{
            fontSize: "clamp(2rem, 10vw, 5rem)",
            fontWeight: 600,
            color: "#faf6f0",
            lineHeight: 1.0,
            marginBottom: 24,
          }}
        >
          Il giorno più bello
          <br />
          <GradienText colors={["#faf6f0", "#f79adb", "#cf8300"]}>
            <span style={{ fontStyle: "italic" }}>
              merita un invito perfetto.
            </span>
          </GradienText>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          style={{
            fontSize: 'clamp(14px, 4vw, 17px)',
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.85)",
            maxWidth: 520,
            margin: "0 auto 40px",
            fontWeight: 300,
          }}
        >
          Scegli il layout, inviaci i tuoi materiali e in 48 ore riceverai il vostro invito digitale personalizzato — con RSVP integrato e link unico da condividere ovunque.
        </motion.p>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            marginBottom: 44,
            flexWrap: "wrap",
          }}
        >
          {/* Avatars + +50 */}
          <div style={{ display: "flex", alignItems: "center" }}>
            {people.map((p, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10, scale: 1.15, zIndex: 10 }}
                transition={{ type: "spring", stiffness: 500, damping: 22 }}
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "2px solid #f5f0e8",
                  marginLeft: i > 0 ? -12 : 0,
                  position: "relative",
                  zIndex: people.length - i,
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                <img
                  src={p.avatar}
                  alt={p.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  loading="lazy"
                />
              </motion.div>
            ))}
            {/* +50 badge */}
            <div style={{
              width: 42, height: 42, borderRadius: "50%",
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(8px)",
              border: "2px solid rgba(255,255,255,0.4)",
              marginLeft: -12,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, fontWeight: 700, color: "#f5f0e8",
              flexShrink: 0, zIndex: 0,
              letterSpacing: "-0.02em",
            }}>
              +50
            </div>
          </div>

          {/* Stars + text */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {/* 5 stelle */}
            <div style={{ display: "flex", gap: 2 }}>
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#f5c842" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <p style={{ fontSize: 13, color: "#fff", textAlign: "left", margin: 0 }}>
              <span style={{ color: "#f5f0e8", fontWeight: 600 }}>
                50+ coppie
              </span>{" "}
              hanno già
              <br />
              scelto Lovivity
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            flexWrap: "wrap",
          }}
        >
          {/* Scopri di più — glass + glow on hover */}
          <button
            onClick={() => document.querySelector("#come-funziona")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.35)',
              color: 'rgba(255,255,255,0.8)',
              padding: '11px 26px',
              fontSize: 14,
              fontWeight: 400,
              borderRadius: 9999,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 0 18px rgba(255,255,255,0.25), 0 0 36px rgba(255,255,255,0.1)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'
            }}
          >
            Scopri di più
          </button>

          {/* Inizia subito — glow sempre attivo */}
          <motion.div
            onMouseEnter={() => setIniziaHover(true)}
            onMouseLeave={() => setIniziaHover(false)}
            whileTap={{ scale: 0.97 }}
            style={{
              borderRadius: 9999,
              boxShadow: iniziaHover
                ? '0 0 28px rgba(192,132,252,0.95), 0 0 55px rgba(139,92,246,0.65), 0 0 80px rgba(192,132,252,0.3)'
                : '0 0 16px rgba(192, 132, 252, 0), 0 0 34px rgba(138, 92, 246, 0), 0 0 52px rgba(192, 132, 252, 0)',
              transition: 'box-shadow 0.3s ease',
            }}
          >
           
              <GlareHover
                width="auto"
                height="auto"
                background={iniziaHover
                  ? 'linear-gradient(135deg, #9333ea 0%, #c026d3 45%, #f472b6 100%)'
                  : 'linear-gradient(135deg, #6d28d9 0%, #9333ea 45%, #c026d3 100%)'}
                borderRadius="9999px"
                borderColor="transparent"
                glareColor="#f79adb"
                glareOpacity={0.55}
                glareAngle={-45}
                glareSize={220}
                transitionDuration={600}
                onClick={() => document.querySelector("#contatti")?.scrollIntoView({ behavior: "smooth" })}
                style={{
                  padding: '11px 26px',
                  fontSize: 14,
                  fontWeight: 400,
                  color: '#fff',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.01em',
                  transition: 'background 0.4s ease',
                } as React.CSSProperties}
              >
                Richiedi il tuo invito
              </GlareHover>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

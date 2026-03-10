import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Ballpit from "@/components/ui/Ballpit";
import GradienText from "@/components/ui/GradienText";
import Grainient from "@/components/ui/Grainient";

const people = [
  {
    name: "Chiara",
    avatar:
      "assets/people/chiara.png",
  },
  {
    name: "Maria",
    avatar:
      "assets/people/maria.png",
  },
  {
    name: "Pietro",
    avatar:
      "assets/people/pietro.png",
  },
  {
    name: "Luca",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80",
  },
  {
    name: "Giulia",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80",
  },
];

export function MarketingHeroSection() {
  const [ready, setReady] = useState(false);

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
            marginBottom: 28,
          }}
          className="font-mono"
        >
          La piattaforma per inviti digitali da matrimonio
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
            fontSize: 18,
            lineHeight: 1.75,
            color: "#fff",
            maxWidth: "100%",
            margin: "0 auto 48px",
            fontWeight: 300,
          }}
        >
          Crea in pochi minuti un invito digitale elegante con RSVP integrato,
          gestione ospiti e un link unico da condividere ovunque.
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
                  border: "2px solid rgba(212,175,115,0.65)",
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
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>

          <p style={{ fontSize: 13, color: "#fff", textAlign: "left" }}>
            <span style={{ color: "#f5f0e8", fontWeight: 600 }}>
              50+ coppie
            </span>{" "}
            hanno già
            <br />
            scelto inviti.studio
          </p>
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
          <button
            onClick={() =>
              document
                .querySelector("#come-funziona")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            style={{
              borderRadius: 9999,
              background: "transparent",
              color: "#f5f0e8",
              padding: "13px 32px",
              fontSize: 15,
              fontWeight: 500,
              border: "1px solid #f5f0e8",
              cursor: "pointer",
              backdropFilter: "blur(10px)",
            }}
          >
            Scopri di più
          </button>

          <button
            onClick={() =>
              document
                .querySelector("#contatti")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              borderRadius: 9999,
              background: "#d1c4ad",
              color: "#0e0c0a",
              padding: "13px 32px",
              fontSize: 15,
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
            }}
          >
            Inizia subito il tuo invito <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>

    </section>
  );
}

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlareHover from "@/components/ui/GlareHover";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    if (!localStorage.getItem("cookie_consent")) {
      const t = setTimeout(() => setVisible(true), 3000);
      return () => { clearTimeout(t); window.removeEventListener("resize", check); };
    }
    return () => window.removeEventListener("resize", check);
  }, []);

  const accept = () => { localStorage.setItem("cookie_consent", "all"); setVisible(false); };
  const necessary = () => { localStorage.setItem("cookie_consent", "necessary"); setVisible(false); };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "fixed",
            ...(isMobile
              ? { bottom: 96, left: 16, right: 16 }
              : { bottom: 24, right: 24, width: 360 }
            ),
            zIndex: 200,
          }}
        >
          <div style={{
            borderRadius: 20,
            background: "rgba(18,14,12,0.92)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06)",
            padding: "20px 22px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}>
            {/* Top row: icon + text */}
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 16,
              }}>
                🍪
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#f5f0e8", margin: "0 0 3px" }}>
                  Questo sito usa i cookie
                </p>
                <p style={{ fontSize: 12, color: "rgba(245,240,232,0.45)", lineHeight: 1.6, margin: 0 }}>
                  Utilizziamo cookie tecnici per migliorare la tua esperienza.{" "}
                  <a
                    href="/privacy"
                    style={{ color: "rgba(245,240,232,0.65)", textDecoration: "underline", transition: "color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#f5f0e8"}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(245,240,232,0.65)"}
                  >
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <GlareHover
                width="100%" height="auto"
                background="linear-gradient(135deg, #6d28d9 0%, #9333ea 45%, #c026d3 100%)"
                borderRadius="9999px" borderColor="transparent"
                glareColor="#f79adb" glareOpacity={0.4} glareAngle={-45} glareSize={180} transitionDuration={500}
                onClick={accept}
                style={{ padding: "9px 0", fontSize: 13, fontWeight: 600, color: "#fff", textAlign: "center" } as React.CSSProperties}
              >
                Accetta tutti
              </GlareHover>

              <button
                onClick={necessary}
                style={{
                  flexShrink: 0,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(245,240,232,0.55)",
                  borderRadius: 9999,
                  padding: "9px 16px",
                  fontSize: 13,
                  fontWeight: 500,
                  fontFamily: "inherit",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.color = "#f5f0e8"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "rgba(245,240,232,0.55)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
              >
                Solo necessari
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

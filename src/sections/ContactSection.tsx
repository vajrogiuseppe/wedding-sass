import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import GradienText from "@/components/ui/GradienText";
import GlareHover from "@/components/ui/GlareHover";
import { FadeContent } from "@/components/ui/FadeContent";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;

type Tab = "feature" | "support";
type Status = "idle" | "sending" | "success" | "error";

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 10,
  padding: "11px 14px",
  fontSize: 14,
  color: "#f5f0e8",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "inherit",
  transition: "border-color 0.2s",
};

const labelStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  color: "rgba(245,240,232,0.4)",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  marginBottom: 6,
  display: "block",
};

export function ContactSection() {
  const [tab, setTab] = useState<Tab>("feature");
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [isCliente, setIsCliente] = useState<"si" | "no" | "">("");
  const [messaggio, setMessaggio] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!privacy) {
      setErrorMsg("Devi accettare la privacy policy.");
      return;
    }
    setErrorMsg("");
    setStatus("sending");
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/send-contact-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo: tab === "feature" ? "Richiesta funzionalità" : "Assistenza",
          nome, cognome, email, telefono, isCliente, messaggio,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Qualcosa è andato storto. Riprova o scrivici su WhatsApp.");
    }
  };

  return (
    <section id="contatti" style={{ padding: "120px 0 100px", position: "relative", overflow: "clip" }}>

      {/* Glow shapes */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        {[
          { top: "15%", left: "70%", w: 400, c: "rgba(201,169,110,0.22)", dur: 11 },
          { top: "55%", left: "5%",  w: 380, c: "rgba(124,111,255,0.18)", dur: 13 },
          { top: "30%", left: "40%", w: 320, c: "rgba(247,154,219,0.14)", dur: 9  },
        ].map((g, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -22, 0] }}
            transition={{ duration: g.dur, repeat: Infinity, ease: "easeInOut", delay: i * 2 }}
            style={{
              position: "absolute", top: g.top, left: g.left,
              width: g.w, height: g.w, borderRadius: "50%",
              background: `radial-gradient(circle, ${g.c} 0%, transparent 68%)`,
              filter: "blur(60px)",
            }}
          />
        ))}
      </div>

      <FadeContent blur duration={800} style={{ position: "relative", zIndex: 1 }} className="mx-auto max-w-2xl px-6 lg:px-8">

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              display: "inline-block", borderRadius: 9999,
              border: "1px solid rgba(201,169,110,0.3)",
              background: "rgba(201,169,110,0.08)",
              padding: "6px 16px", fontSize: 11, fontWeight: 600,
              color: "#c9a96e", letterSpacing: "0.15em",
              textTransform: "uppercase", marginBottom: 16,
            }}
          >
            Contatti
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", fontWeight: 600, color: "#f5f0e8", lineHeight: 1.1, marginBottom: 16 }}
          >
            Come possiamo
            <br />
            <GradienText colors={["#faf6f0", "#f79adb", "#cf8300"]}>
              <span style={{ fontStyle: "italic" }}>aiutarti?</span>
            </GradienText>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ fontSize: 15, color: "rgba(245,240,232,0.5)", maxWidth: 380, margin: "0 auto" }}
          >
            Scegli il tipo di richiesta — ti risponderemo entro 24 ore.
          </motion.p>
        </div>

        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="spotlight-card spotlight-card-dark"
            style={{
              borderRadius: 24, padding: "56px 40px", textAlign: "center",
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)", backdropFilter: "blur(4px)",
            }}
          >
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              background: "linear-gradient(135deg, #6d28d9, #c026d3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 24px",
              boxShadow: "0 0 40px rgba(192,38,211,0.3)",
            }}>
              <CheckCircle size={28} color="#fff" />
            </div>
            <h3 className="font-display" style={{ fontSize: "1.6rem", fontWeight: 600, color: "#f5f0e8", marginBottom: 10 }}>
              Messaggio inviato!
            </h3>
            <p style={{ fontSize: 15, color: "rgba(245,240,232,0.55)", lineHeight: 1.7 }}>
              Ti risponderemo a <strong style={{ color: "#f5f0e8" }}>{email}</strong> entro 24 ore.
            </p>
          </motion.div>
        ) : (
          <motion.div
            className="spotlight-card spotlight-card-dark"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
              e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              borderRadius: 24, padding: "36px 32px",
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)", backdropFilter: "blur(4px)",
            }}
          >
            {/* Tab switcher */}
            <div style={{
              display: "flex", gap: 0,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12, padding: 4, marginBottom: 28,
            }}>
              {(["feature", "support"] as Tab[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  style={{
                    flex: 1, padding: "9px 14px", borderRadius: 9,
                    border: tab === t ? "1px solid rgba(201,169,110,0.3)" : "1px solid transparent",
                    cursor: "pointer", fontSize: 13, fontWeight: 600,
                    transition: "all 0.2s", fontFamily: "inherit",
                    background: tab === t ? "rgba(201,169,110,0.12)" : "transparent",
                    color: tab === t ? "#c9a96e" : "rgba(245,240,232,0.35)",
                  }}
                >
                  {t === "feature" ? "✦  Richiesta funzionalità" : "◎  Assistenza"}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              {/* Nome + Cognome */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={labelStyle}>Nome *</label>
                  <input required value={nome} onChange={e => setNome(e.target.value)}
                    placeholder="Sofia" style={inputStyle}
                    onFocus={e => e.currentTarget.style.borderColor = "rgba(201,169,110,0.45)"}
                    onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Cognome *</label>
                  <input required value={cognome} onChange={e => setCognome(e.target.value)}
                    placeholder="Rossi" style={inputStyle}
                    onFocus={e => e.currentTarget.style.borderColor = "rgba(201,169,110,0.45)"}
                    onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
                  />
                </div>
              </div>

              {/* Email + Telefono */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={labelStyle}>Email *</label>
                  <input required type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="sofia@email.com" style={inputStyle}
                    onFocus={e => e.currentTarget.style.borderColor = "rgba(201,169,110,0.45)"}
                    onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Telefono</label>
                  <input type="tel" value={telefono} onChange={e => setTelefono(e.target.value)}
                    placeholder="+39 340 1234567" style={inputStyle}
                    onFocus={e => e.currentTarget.style.borderColor = "rgba(201,169,110,0.45)"}
                    onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
                  />
                </div>
              </div>

              {/* Sei già cliente? */}
              <div>
                <label style={labelStyle}>Sei già nostro cliente?</label>
                <div style={{ display: "flex", gap: 10 }}>
                  {[{ val: "si", label: "Sì, ho già acquistato" }, { val: "no", label: "No, sono nuovo" }].map(({ val, label }) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setIsCliente(val as "si" | "no")}
                      style={{
                        flex: 1, padding: "10px 14px", borderRadius: 9, fontFamily: "inherit",
                        border: isCliente === val ? "1px solid rgba(201,169,110,0.4)" : "1px solid rgba(255,255,255,0.1)",
                        background: isCliente === val ? "rgba(201,169,110,0.1)" : "rgba(255,255,255,0.04)",
                        color: isCliente === val ? "#c9a96e" : "rgba(245,240,232,0.4)",
                        fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "all 0.2s",
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Messaggio */}
              <div>
                <label style={labelStyle}>Messaggio *</label>
                <textarea
                  required value={messaggio} onChange={e => setMessaggio(e.target.value)}
                  placeholder={tab === "feature" ? "Descrivici la funzionalità che vorresti..." : "Raccontaci il problema o la tua domanda..."}
                  rows={4}
                  style={{ ...inputStyle, resize: "vertical" }}
                  onFocus={e => e.currentTarget.style.borderColor = "rgba(201,169,110,0.45)"}
                  onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
                />
              </div>

              {/* Privacy */}
              <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
                <input
                  type="checkbox" checked={privacy} onChange={e => setPrivacy(e.target.checked)}
                  style={{ marginTop: 3, accentColor: "#c9a96e", width: 14, height: 14, flexShrink: 0 }}
                />
                <span style={{ fontSize: 12, color: "rgba(245,240,232,0.35)", lineHeight: 1.6 }}>
                  Ho letto e accetto la{" "}
                  <a href="/privacy" style={{ color: "#c9a96e", textDecoration: "underline" }}>Privacy Policy</a>.
                  Consenso al trattamento dei dati personali.
                </span>
              </label>

              {errorMsg && (
                <p style={{ fontSize: 13, color: "#f87171", margin: 0 }}>{errorMsg}</p>
              )}

              {/* Submit */}
              <GlareHover
                width="100%" height="auto"
                background={status === "sending" ? "rgba(255,255,255,0.06)" : "linear-gradient(135deg, #6d28d9 0%, #9333ea 45%, #c026d3 100%)"}
                borderRadius="9999px" borderColor="transparent"
                glareColor="#f79adb" glareOpacity={0.45} glareAngle={-45} glareSize={220} transitionDuration={600}
                onClick={() => {}}
                style={{
                  padding: "13px 0", fontSize: 14, fontWeight: 600, color: "#fff",
                  textAlign: "center", cursor: status === "sending" ? "wait" : "pointer",
                  opacity: status === "sending" ? 0.6 : 1, display: "flex",
                  alignItems: "center", justifyContent: "center", gap: 8,
                } as React.CSSProperties}
              >
                <button
                  type="submit"
                  disabled={status === "sending"}
                  style={{
                    background: "none", border: "none", color: "inherit",
                    fontSize: "inherit", fontWeight: "inherit", fontFamily: "inherit",
                    cursor: "inherit", display: "flex", alignItems: "center", gap: 8, padding: 0,
                  }}
                >
                  {status === "sending" ? "Invio in corso..." : <><Send size={14} /> Invia messaggio</>}
                </button>
              </GlareHover>

            </form>
          </motion.div>
        )}
      </FadeContent>
    </section>
  );
}

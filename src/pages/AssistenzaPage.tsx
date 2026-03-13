import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowLeft } from "lucide-react";
import GradienText from "@/components/ui/GradienText";
import GlareHover from "@/components/ui/GlareHover";

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

const TABS: { value: Tab; label: string }[] = [
  { value: "feature", label: "✦  Richiesta funzionalità" },
  { value: "support", label: "◎  Assistenza" },
];

export default function AssistenzaPage() {
  const [tab, setTab] = useState<Tab>("support");
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
    if (!privacy) { setErrorMsg("Devi accettare la privacy policy."); return; }
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
      setErrorMsg("Qualcosa è andato storto. Riprova.");
    }
  };

  return (
    <div style={{ minHeight: "100svh", background: "#0e0c0a", position: "relative", overflow: "hidden" }}>

      {/* Glow shapes */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {[
          { top: "10%",  left: "65%", w: 500, c: "rgba(207,131,0,0.18)",    dur: 11 },
          { top: "50%",  left: "0%",  w: 420, c: "rgba(124,111,255,0.15)",  dur: 13 },
          { top: "70%",  left: "55%", w: 360, c: "rgba(247,154,219,0.12)",  dur: 9  },
        ].map((g, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: g.dur, repeat: Infinity, ease: "easeInOut", delay: i * 2 }}
            style={{
              position: "absolute", top: g.top, left: g.left,
              width: g.w, height: g.w, borderRadius: "50%",
              background: `radial-gradient(circle, ${g.c} 0%, transparent 68%)`,
              filter: "blur(70px)",
            }}
          />
        ))}
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 640, margin: "0 auto", padding: "60px 24px 80px" }}>

        {/* Back */}
        <motion.a
          href="/"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontSize: 13, color: "rgba(245,240,232,0.4)", textDecoration: "none",
            marginBottom: 48, transition: "color 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.color = "rgba(245,240,232,0.8)"}
          onMouseLeave={e => e.currentTarget.style.color = "rgba(245,240,232,0.4)"}
        >
          <ArrowLeft size={14} /> Torna alla home
        </motion.a>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 40 }}
        >
          <span style={{
            display: "inline-block", borderRadius: 9999,
            border: "1px solid rgba(255,255,255,0.15)",
            background: "rgba(255,255,255,0.06)",
            padding: "6px 16px", fontSize: 11, fontWeight: 600,
            color: "rgba(245,240,232,0.7)", letterSpacing: "0.15em",
            textTransform: "uppercase", marginBottom: 16,
          }}>
            Supporto
          </span>
          <h1 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 2.8rem)", fontWeight: 600, color: "#f5f0e8", lineHeight: 1.1, marginBottom: 12 }}>
            Come possiamo{" "}
            <GradienText colors={["#faf6f0", "#f79adb", "#cf8300"]}>
              <span style={{ fontStyle: "italic" }}>aiutarti?</span>
            </GradienText>
          </h1>
          <p style={{ fontSize: 15, color: "rgba(245,240,232,0.5)", lineHeight: 1.7 }}>
            Compila il form — ti risponderemo entro 24 ore.
          </p>
        </motion.div>

        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              borderRadius: 24, padding: "56px 40px", textAlign: "center",
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(4px)",
            }}
          >
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              background: "linear-gradient(135deg, #6d28d9, #c026d3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 24px", boxShadow: "0 0 40px rgba(192,38,211,0.3)",
            }}>
              <CheckCircle size={28} color="#fff" />
            </div>
            <h2 className="font-display" style={{ fontSize: "1.6rem", fontWeight: 600, color: "#f5f0e8", marginBottom: 10 }}>
              Messaggio inviato!
            </h2>
            <p style={{ fontSize: 15, color: "rgba(245,240,232,0.55)", lineHeight: 1.7 }}>
              Ti risponderemo a <strong style={{ color: "#f5f0e8" }}>{email}</strong> entro 24 ore.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            style={{
              borderRadius: 24, padding: "36px 32px",
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)", backdropFilter: "blur(4px)",
            }}
          >
            {/* Tab switcher — desktop: flex row di bottoni, mobile: select nativa */}

            {/* Desktop tabs — hidden on mobile */}
            <div className="hidden sm:flex" style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12, padding: 4, marginBottom: 28,
            }}>
              {TABS.map((t) => (
                <button
                  key={t.value} type="button" onClick={() => setTab(t.value)}
                  style={{
                    flex: 1, padding: "9px 14px", borderRadius: 9, fontFamily: "inherit",
                    border: tab === t.value ? "1px solid rgba(255,255,255,0.18)" : "1px solid transparent",
                    cursor: "pointer", fontSize: 13, fontWeight: 600, transition: "all 0.2s",
                    background: tab === t.value ? "rgba(255,255,255,0.08)" : "transparent",
                    color: tab === t.value ? "#f5f0e8" : "rgba(245,240,232,0.3)",
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Mobile select — visible only on mobile */}
            <div className="flex sm:hidden" style={{ marginBottom: 28 }}>
              <select
                value={tab}
                onChange={e => setTab(e.target.value as Tab)}
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 10,
                  padding: "11px 14px",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#f5f0e8",
                  outline: "none",
                  fontFamily: "inherit",
                  cursor: "pointer",
                  appearance: "none",
                  WebkitAppearance: "none",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='rgba(245,240,232,0.4)' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 14px center",
                  paddingRight: 36,
                }}
              >
                {TABS.map(t => (
                  <option key={t.value} value={t.value} style={{ background: "#1a1714", color: "#f5f0e8" }}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={labelStyle}>Nome *</label>
                  <input required value={nome} onChange={e => setNome(e.target.value)} placeholder="Sofia" style={inputStyle}
                    onFocus={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.28)"}
                    onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"} />
                </div>
                <div>
                  <label style={labelStyle}>Cognome *</label>
                  <input required value={cognome} onChange={e => setCognome(e.target.value)} placeholder="Rossi" style={inputStyle}
                    onFocus={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.28)"}
                    onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"} />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={labelStyle}>Email *</label>
                  <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="sofia@email.com" style={inputStyle}
                    onFocus={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.28)"}
                    onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"} />
                </div>
                <div>
                  <label style={labelStyle}>Telefono</label>
                  <input type="tel" value={telefono} onChange={e => setTelefono(e.target.value)} placeholder="+39 340 1234567" style={inputStyle}
                    onFocus={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.28)"}
                    onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"} />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Sei già nostro cliente?</label>
                <div style={{ display: "flex", gap: 10 }}>
                  {[{ val: "si", label: "Sì, ho già acquistato" }, { val: "no", label: "No, sono nuovo" }].map(({ val, label }) => (
                    <button key={val} type="button" onClick={() => setIsCliente(val as "si" | "no")}
                      style={{
                        flex: 1, padding: "10px 14px", borderRadius: 9, fontFamily: "inherit",
                        border: isCliente === val ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(255,255,255,0.1)",
                        background: isCliente === val ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)",
                        color: isCliente === val ? "#f5f0e8" : "rgba(245,240,232,0.4)",
                        fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "all 0.2s",
                      }}
                    >{label}</button>
                  ))}
                </div>
              </div>

              <div>
                <label style={labelStyle}>Messaggio *</label>
                <textarea required value={messaggio} onChange={e => setMessaggio(e.target.value)} rows={4}
                  placeholder={tab === "feature" ? "Descrivici la funzionalità che vorresti..." : "Raccontaci il problema o la tua domanda..."}
                  style={{ ...inputStyle, resize: "vertical" }}
                  onFocus={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.28)"}
                  onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"} />
              </div>

              <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
                <input type="checkbox" checked={privacy} onChange={e => setPrivacy(e.target.checked)}
                  style={{ marginTop: 3, accentColor: "#9333ea", width: 14, height: 14, flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: "rgba(245,240,232,0.35)", lineHeight: 1.6 }}>
                  Ho letto e accetto la{" "}
                  <a href="/privacy" style={{ color: "rgba(245,240,232,0.7)", textDecoration: "underline" }}>Privacy Policy</a>.
                  Consenso al trattamento dei dati personali.
                </span>
              </label>

              {errorMsg && <p style={{ fontSize: 13, color: "#f87171", margin: 0 }}>{errorMsg}</p>}

              <GlareHover
                width="100%" height="auto"
                background={status === "sending" ? "rgba(255,255,255,0.06)" : "linear-gradient(135deg, #6d28d9 0%, #9333ea 45%, #c026d3 100%)"}
                borderRadius="9999px" borderColor="transparent"
                glareColor="#f79adb" glareOpacity={0.45} glareAngle={-45} glareSize={220} transitionDuration={600}
                onClick={() => {}}
                style={{ padding: "13px 0", fontSize: 14, fontWeight: 600, color: "#fff", textAlign: "center", cursor: status === "sending" ? "wait" : "pointer", opacity: status === "sending" ? 0.6 : 1 } as React.CSSProperties}
              >
                <button type="submit" disabled={status === "sending"}
                  style={{ background: "none", border: "none", color: "inherit", fontSize: "inherit", fontWeight: "inherit", fontFamily: "inherit", cursor: "inherit", padding: 0 }}>
                  {status === "sending" ? "Invio in corso..." : "Invia messaggio"}
                </button>
              </GlareHover>

            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
}

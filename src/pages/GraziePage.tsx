import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

const PLAN_LABELS: Record<string, string> = {
  save_date: "Save the Date — €35",
  save_date_rsvp: "Save the Date + RSVP — €60",
  landing: "Landing Completa — €120",
  custom: "Premium su Misura — €220",
};

export default function GraziePage() {
  const [params] = useSearchParams();
  const plan = params.get("plan") ?? "";
  const [dots, setDots] = useState("");

  useEffect(() => {
    const i = setInterval(() => setDots((d) => (d.length >= 3 ? "" : d + ".")), 500);
    return () => clearInterval(i);
  }, []);

  return (
    <div
      style={{
        minHeight: "100svh",
        background: "#0e0c0a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
        fontFamily: "sans-serif",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ textAlign: "center", maxWidth: 480 }}
      >
        <h1
          style={{
            fontSize: "clamp(1.8rem, 6vw, 2.6rem)",
            fontWeight: 600,
            color: "#f5f0e8",
            lineHeight: 1.2,
            marginBottom: 12,
            fontFamily: "'Fraunces', serif",
          }}
        >
          Grazie per il tuo ordine!
        </h1>

        {plan && PLAN_LABELS[plan] && (
          <p
            style={{
              display: "inline-block",
              borderRadius: 9999,
              border: "1px solid rgba(201,169,110,0.3)",
              background: "rgba(201,169,110,0.08)",
              padding: "6px 16px",
              fontSize: 13,
              fontWeight: 600,
              color: "#c9a96e",
              letterSpacing: "0.1em",
              marginBottom: 20,
            }}
          >
            {PLAN_LABELS[plan]}
          </p>
        )}

        <p
          style={{
            fontSize: 16,
            color: "rgba(245,240,232,0.65)",
            lineHeight: 1.7,
            marginBottom: 40,
          }}
        >
          Il pagamento è andato a buon fine. Ti contatteremo entro{" "}
          <strong style={{ color: "#f5f0e8" }}>24 ore</strong> per iniziare a
          lavorare al tuo invito.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              borderRadius: 9999,
              padding: "12px 24px",
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#f5f0e8",
              fontSize: 14,
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Torna alla home
          </a>
        </div>

        <p style={{ fontSize: 12, color: "rgba(245,240,232,0.3)", marginTop: 40 }}>
          Riceverai anche un'email di conferma da Stripe{dots}
        </p>
      </motion.div>
    </div>
  );
}

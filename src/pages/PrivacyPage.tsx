import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import GradienText from "@/components/ui/GradienText";

const h2Style: React.CSSProperties = {
  fontSize: "1.15rem",
  fontWeight: 600,
  color: "#f5f0e8",
  marginTop: 36,
  marginBottom: 10,
  fontFamily: "'Fraunces', serif",
};

const pStyle: React.CSSProperties = {
  fontSize: 15,
  color: "rgba(245,240,232,0.7)",
  lineHeight: 1.8,
  margin: "0 0 12px",
};

const ulStyle: React.CSSProperties = {
  fontSize: 15,
  color: "rgba(245,240,232,0.7)",
  lineHeight: 1.8,
  margin: "0 0 12px",
  paddingLeft: 20,
};

export default function PrivacyPage() {
  return (
    <div style={{ minHeight: "100svh", background: "#0e0c0a", position: "relative", overflow: "hidden" }}>

      {/* Glow decorativo */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{
          position: "absolute", top: "5%", left: "60%",
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(147,51,234,0.12) 0%, transparent 68%)",
          filter: "blur(80px)",
        }} />
        <div style={{
          position: "absolute", top: "50%", left: "-10%",
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(247,154,219,0.09) 0%, transparent 68%)",
          filter: "blur(70px)",
        }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 720, margin: "0 auto", padding: "60px 24px 100px" }}>

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
            Legale
          </span>
          <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 5vw, 2.6rem)", fontWeight: 600, color: "#f5f0e8", lineHeight: 1.15, marginBottom: 12 }}>
            <GradienText colors={["#faf6f0", "#f79adb", "#cf8300"]}>
              <span style={{ fontStyle: "italic" }}>Privacy Policy</span>
            </GradienText>
          </h1>
          <p style={{ fontSize: 14, textAlign: "center", color: "rgba(245,240,232,0.35)", lineHeight: 1.6 }}>
            Ultimo aggiornamento: marzo 2025
          </p>
        </motion.div>

        {/* Content card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{
            borderRadius: 24,
            padding: "40px 40px 48px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
            backdropFilter: "blur(4px)",
          }}
        >

          {/* 1. Titolare */}
          <h2 style={h2Style}>1. Titolare del trattamento</h2>
          <p style={pStyle}>
            Il titolare del trattamento dei dati personali è <strong style={{ color: "#f5f0e8" }}>Lovivity</strong>, raggiungibile all'indirizzo e-mail{" "}
            <a href="mailto:info@lovivity.com" style={{ color: "rgba(245,240,232,0.7)", textDecoration: "underline" }}>info@lovivity.com</a>.
          </p>

          {/* 2. Dati raccolti */}
          <h2 style={h2Style}>2. Dati personali raccolti</h2>
          <p style={pStyle}>Nell'ambito dell'erogazione del servizio raccogliamo le seguenti categorie di dati:</p>
          <ul style={ulStyle}>
            <li><strong style={{ color: "#f5f0e8" }}>Dati anagrafici:</strong> nome e cognome degli sposi.</li>
            <li><strong style={{ color: "#f5f0e8" }}>Dati di contatto:</strong> indirizzo e-mail e numero di telefono.</li>
            <li><strong style={{ color: "#f5f0e8" }}>Dati di pagamento:</strong> elaborati in modo sicuro da Stripe; Lovivity non conserva i dati della carta di credito.</li>
            <li><strong style={{ color: "#f5f0e8" }}>Messaggi e comunicazioni:</strong> contenuti dei form di contatto e supporto.</li>
            <li><strong style={{ color: "#f5f0e8" }}>Dati tecnici:</strong> indirizzo IP, tipo di browser, pagine visitate (tramite cookie tecnici).</li>
          </ul>

          {/* 3. Finalità */}
          <h2 style={h2Style}>3. Finalità del trattamento</h2>
          <p style={pStyle}>I dati vengono trattati per le seguenti finalità:</p>
          <ul style={ulStyle}>
            <li>Erogazione del servizio di inviti digitali e gestione RSVP.</li>
            <li>Elaborazione del pagamento tramite Stripe.</li>
            <li>Assistenza e supporto tecnico agli utenti.</li>
            <li>Invio di comunicazioni transazionali (conferma ordine, aggiornamenti servizio).</li>
            <li>Adempimento di obblighi legali e fiscali.</li>
          </ul>

          {/* 4. Base giuridica */}
          <h2 style={h2Style}>4. Base giuridica</h2>
          <p style={pStyle}>
            Il trattamento si basa sull'esecuzione di un <strong style={{ color: "#f5f0e8" }}>contratto</strong> (art. 6 par. 1 lett. b GDPR) per quanto riguarda l'erogazione del servizio e il pagamento, e sul <strong style={{ color: "#f5f0e8" }}>consenso</strong> dell'interessato (art. 6 par. 1 lett. a GDPR) per le comunicazioni promozionali facoltative.
          </p>

          {/* 5. Destinatari */}
          <h2 style={h2Style}>5. Destinatari dei dati</h2>
          <p style={pStyle}>I dati possono essere condivisi con i seguenti fornitori di servizi, in qualità di responsabili del trattamento:</p>
          <ul style={ulStyle}>
            <li>
              <strong style={{ color: "#f5f0e8" }}>Stripe, Inc.</strong> — elaborazione dei pagamenti. Sede negli USA, con garanzie adeguate ai sensi delle Clausole Contrattuali Standard approvate dalla Commissione Europea.
            </li>
            <li>
              <strong style={{ color: "#f5f0e8" }}>Resend</strong> — invio di e-mail transazionali. Garanzie adeguate tramite Clausole Contrattuali Standard.
            </li>
            <li>
              <strong style={{ color: "#f5f0e8" }}>Supabase, Inc.</strong> — archiviazione del database. I dati sono ospitati nella regione EU (eu-central-1 / Frankfurt) con garanzie GDPR.
            </li>
          </ul>
          <p style={pStyle}>
            Non vendiamo né cediamo i dati personali a terzi per finalità di marketing.
          </p>

          {/* 6. Conservazione */}
          <h2 style={h2Style}>6. Periodo di conservazione</h2>
          <p style={pStyle}>
            I dati personali sono conservati per la durata del servizio attivo e, successivamente, per un periodo massimo di <strong style={{ color: "#f5f0e8" }}>10 anni</strong> al fine di adempiere agli obblighi fiscali e contabili previsti dalla normativa italiana. Al termine di tale periodo i dati vengono cancellati o anonimizzati.
          </p>

          {/* 7. Diritti */}
          <h2 style={h2Style}>7. Diritti dell'interessato</h2>
          <p style={pStyle}>
            Ai sensi degli artt. 15–22 del GDPR, hai il diritto di:
          </p>
          <ul style={ulStyle}>
            <li><strong style={{ color: "#f5f0e8" }}>Accesso</strong> — ottenere conferma del trattamento e copia dei dati (art. 15).</li>
            <li><strong style={{ color: "#f5f0e8" }}>Rettifica</strong> — correggere dati inesatti o incompleti (art. 16).</li>
            <li><strong style={{ color: "#f5f0e8" }}>Cancellazione</strong> — richiedere la cancellazione ("diritto all'oblio") (art. 17).</li>
            <li><strong style={{ color: "#f5f0e8" }}>Limitazione</strong> — limitare il trattamento in determinate circostanze (art. 18).</li>
            <li><strong style={{ color: "#f5f0e8" }}>Portabilità</strong> — ricevere i dati in formato strutturato e leggibile da macchina (art. 20).</li>
            <li><strong style={{ color: "#f5f0e8" }}>Opposizione</strong> — opporti al trattamento basato su legittimo interesse (art. 21).</li>
          </ul>
          <p style={pStyle}>
            Hai inoltre il diritto di proporre reclamo all'autorità di controllo competente (in Italia: <strong style={{ color: "#f5f0e8" }}>Garante per la protezione dei dati personali</strong>, <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(245,240,232,0.7)", textDecoration: "underline" }}>www.garanteprivacy.it</a>).
          </p>

          {/* 8. Cookie */}
          <h2 style={h2Style}>8. Cookie</h2>
          <p style={pStyle}>
            Il sito utilizza esclusivamente <strong style={{ color: "#f5f0e8" }}>cookie tecnici necessari</strong> al funzionamento della piattaforma (ad es. gestione della sessione). Non vengono utilizzati cookie di profilazione o di tracciamento di terze parti senza il tuo consenso.
          </p>

          {/* 9. Contatti */}
          <h2 style={h2Style}>9. Esercizio dei diritti e contatti</h2>
          <p style={pStyle}>
            Per esercitare i tuoi diritti o per qualsiasi domanda relativa al trattamento dei dati personali, puoi contattarci all'indirizzo:{" "}
            <a href="mailto:info@lovivity.com" style={{ color: "rgba(245,240,232,0.7)", textDecoration: "underline" }}>
              info@lovivity.com
            </a>
            . Risponderemo entro 30 giorni dalla ricezione della richiesta, come previsto dal GDPR.
          </p>

        </motion.div>
      </div>
    </div>
  );
}

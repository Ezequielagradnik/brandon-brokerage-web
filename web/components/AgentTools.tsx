"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import styles from "./AgentTools.module.css";

// AI Case Assistant , demo stage. Everything is client-side and hardcoded:
// pre-written answers for common foreign-national scenarios, no backend.

type Lang = "en" | "es";
export type ToolId = "assistant";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Each concept re-skins the module through CSS custom properties.
export type Tone = "gold" | "sapphire" | "editorial";

const TONES: Record<Tone, React.CSSProperties> = {
  gold: {},
  sapphire: {
    "--at-accent": "#a9812f",
    "--at-accent-2": "#c8a76a",
    "--at-panel": "#12294a",
    "--at-line": "rgba(18,41,74,0.14)",
    "--at-band-bg": "#fdfbf6",
    "--at-band-hover": "#f7f2e7",
    "--at-muted": "#4a5568",
    "--at-more": "#9a7526",
    "--at-scrim": "rgba(10,20,38,0.72)",
    "--at-serif": "var(--font-bodoni), serif",
  } as React.CSSProperties,
  editorial: {
    "--at-accent": "#b6ad9e",
    "--at-accent-2": "#e8e2d6",
    "--at-panel": "#1a1814",
    "--at-line": "rgba(26,24,20,0.16)",
    "--at-band-bg": "#fdfcf9",
    "--at-band-hover": "#f4f1ea",
    "--at-muted": "#6a6357",
    "--at-more": "#1a1814",
    "--at-scrim": "rgba(20,18,14,0.74)",
    "--at-serif": "var(--font-cormorant), serif",
  } as React.CSSProperties,
};

const T = {
  en: {
    kicker: "Agent tools",
    title: "AI Case Assistant",
    desc: "Ask how carriers treat a foreign national profile: appetite, documentation and next steps.",
    cta: "Try it",
    demoTag: "Demo",
    intro: "Pick a common scenario, or ask your own question.",
    chips: [
      "Venezuelan client, Panama resident, $5M UL, which carriers?",
      "Documentation required for a Brazilian national?",
      "Can a B1/B2 visa holder apply?",
    ],
    answers: [
      `Three carriers regularly write this profile at $5M:

·  Lincoln Financial: foreign national program accepts Panama residency; requires a documented US nexus (property, business or banking).
·  Pacific Life: competitive UL pricing above $3M; expects US travel history and the paramed completed in the States.
·  John Hancock: strong track record with Venezuelan nationals; source of funds reviewed case by case.

All three require the application signed and the exam completed inside the US, with premium wired from a US or approved international bank.

Next step: send us the case details and a director responds within one business day.`,
      `Standard file for a Brazilian national:

·  Valid passport and current US visa (B1/B2 accepted by most carriers).
·  Proof of US nexus: property deed, US bank statement, business interest or an existing US policy.
·  Financial justification: two years of income documentation or a CPA letter, translated.
·  Source of funds for the premium, with translated bank statements.
·  US-completed paramed; above $2M, an APS from the treating physician.

Requirements vary by carrier. Below $1M the file is materially lighter.

Next step: send us the case details and a director responds within one business day.`,
      `Yes. B1/B2 is the most common visa in the foreign national market.

·  The application, the exam and the policy delivery must all happen inside the United States.
·  Carriers ask for a documented reason to be here: property, business, family or banking.
·  Face amounts up to $10M are placed routinely; above that, expect a fuller financial review.
·  A US address and a US or approved international account are needed for premium payment.

What no carrier accepts is a policy solicited or delivered abroad.

Next step: send us the case details and a director responds within one business day.`,
    ],
    fallback: `For case-specific guidance, speak with our desk. This assistant covers common scenarios.

A brokerage director responds within one business day.`,
    placeholder: "Ask about a case…",
    send: "Send",
    disclaimer: "Indicative guidance only. Subject to carrier underwriting.",
    contactCta: "Partner with us",
  },
  es: {
    kicker: "Herramientas para agentes",
    title: "Asistente de Casos IA",
    desc: "Consulte cómo tratan las aseguradoras un perfil extranjero: apetito, documentación y próximos pasos.",
    cta: "Probar",
    demoTag: "Demo",
    intro: "Elija un escenario común o escriba su propia consulta.",
    chips: [
      "Cliente venezolano, residente en Panamá, UL de US$5M: ¿qué aseguradoras?",
      "¿Qué documentación se pide para un ciudadano brasileño?",
      "¿Puede aplicar alguien con visa B1/B2?",
    ],
    answers: [
      `Tres aseguradoras colocan este perfil habitualmente en US$5M:

·  Lincoln Financial: su programa de foreign national acepta residencia en Panamá; exige nexo documentado con EE.UU. (propiedad, empresa o banco).
·  Pacific Life: precios competitivos en UL por encima de US$3M; pide historial de viajes y el examen médico hecho en EE.UU.
·  John Hancock: sólida trayectoria con ciudadanos venezolanos; el origen de fondos se revisa caso por caso.

Las tres requieren solicitud firmada y examen realizado dentro de EE.UU., con la prima transferida desde un banco estadounidense o internacional aprobado.

Siguiente paso: envíenos los detalles del caso y un director responde dentro de un día hábil.`,
      `Expediente estándar para un ciudadano brasileño:

·  Pasaporte vigente y visa estadounidense actual (la B1/B2 es aceptada por la mayoría).
·  Prueba de nexo con EE.UU.: escritura, extracto bancario, participación societaria o una póliza vigente.
·  Justificación financiera: dos años de ingresos o carta de contador, traducidos.
·  Origen de los fondos de la prima, con extractos traducidos.
·  Examen médico hecho en EE.UU.; por encima de US$2M, informe del médico tratante (APS).

Los requisitos varían según la aseguradora: por debajo de US$1M el expediente es bastante más liviano.

Siguiente paso: envíenos los detalles del caso y un director responde dentro de un día hábil.`,
      `Sí. La B1/B2 es la visa más común en el mercado de clientes extranjeros.

·  La solicitud, el examen y la entrega de la póliza deben ocurrir dentro de Estados Unidos.
·  Las aseguradoras piden un motivo documentado de presencia en el país: propiedad, empresa, familia o banco.
·  Se colocan montos de hasta US$10M con regularidad; por encima, hay revisión financiera más profunda.
·  Se necesita domicilio en EE.UU. y cuenta estadounidense o internacional aprobada para pagar la prima.

Lo que ninguna aseguradora acepta es una póliza gestionada o entregada fuera del país.

Siguiente paso: envíenos los detalles del caso y un director responde dentro de un día hábil.`,
    ],
    fallback: `Para una consulta específica, hablá con nuestro equipo: este asistente cubre los escenarios más comunes.

Un director de brokerage responde dentro de un día hábil.`,
    placeholder: "Escriba su consulta…",
    send: "Enviar",
    disclaimer: "Orientación indicativa. Sujeta al underwriting de cada aseguradora.",
    contactCta: "Trabajemos juntos",
  },
} as const;

const AssistantIcon = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 6h22v14H12l-6 5v-5H4z" />
    <path d="M15 10v6M12 13h6" />
  </svg>
);

/* ----- modal shell ----- */
function Modal({
  open,
  onClose,
  origin,
  eyebrow,
  title,
  children,
  footer,
  reduce,
}: {
  open: boolean;
  onClose: () => void;
  origin: { x: number; y: number };
  eyebrow: string;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  reduce: boolean;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.overlay}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
        >
          <motion.div
            className={styles.panel}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            onClick={(e) => e.stopPropagation()}
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.42, ease: EASE }}
            style={{ transformOrigin: `${origin.x}% ${origin.y}%` }}
          >
            <div className={styles.panelHead}>
              <div>
                <div className={styles.eyebrow}>{eyebrow}</div>
                <h2 className={styles.panelTitle}>{title}</h2>
              </div>
              <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M1 1l13 13M14 1L1 14" /></svg>
              </button>
            </div>
            <div className={styles.body}>{children}</div>
            {footer && <div className={styles.foot}>{footer}</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ----- the conversation ----- */
type Msg = { role: "user" | "bot"; text: string };

function Assistant({ lang, reduce, onCta }: { lang: Lang; reduce: boolean; onCta: () => void }) {
  const t = T[lang];
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [typed, setTyped] = useState(0);
  const [input, setInput] = useState("");
  const [used, setUsed] = useState<number[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const last = msgs[msgs.length - 1];
  const typing = last?.role === "bot" && typed < last.text.length;

  // reveal the latest answer character by character (reduced motion gets it whole)
  useEffect(() => {
    if (reduce || !last || last.role !== "bot") return;
    const id = setInterval(() => {
      setTyped((n) => {
        if (n >= last.text.length) {
          clearInterval(id);
          return n;
        }
        return n + 3;
      });
    }, 14);
    return () => clearInterval(id);
  }, [last, reduce]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [msgs, typed, reduce]);

  const ask = (question: string, answer: string, chipIndex?: number) => {
    if (typing) return;
    if (chipIndex !== undefined) setUsed((u) => [...u, chipIndex]);
    setTyped(reduce ? answer.length : 0);
    setMsgs((m) => [...m, { role: "user", text: question }, { role: "bot", text: answer }]);
  };

  return (
    <div>
      {msgs.length === 0 && (
        <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "rgba(255,255,255,0.7)", margin: "0 0 22px" }}>{t.intro}</p>
      )}

      <div ref={scrollRef} style={{ maxHeight: "min(46vh, 420px)", overflowY: "auto", marginBottom: msgs.length ? 24 : 0, display: "grid", gap: 22 }}>
        {msgs.map((m, i) => (
          <div key={i}>
            {m.role === "user" ? (
              <div className={styles.msgUser}>{m.text}</div>
            ) : (
              <div className={styles.msgBot}>
                {i === msgs.length - 1 ? m.text.slice(0, typed) : m.text}
                {i === msgs.length - 1 && typing && <span className={styles.caret} />}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* pre-loaded scenarios */}
      <div style={{ display: "grid", gap: 10, marginBottom: 22 }}>
        {t.chips.map((c, i) => (
          <button
            key={c}
            type="button"
            className={styles.chip}
            disabled={used.includes(i) || typing}
            onClick={() => ask(c, t.answers[i], i)}
          >
            {c}
          </button>
        ))}
      </div>

      {/* free text , always lands on the desk */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const q = input.trim();
          if (!q || typing) return;
          setInput("");
          ask(q, t.fallback);
        }}
        style={{ display: "flex", gap: 10, flexWrap: "wrap" }}
      >
        <input
          className={styles.field}
          style={{ flex: "1 1 220px" }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.placeholder}
          aria-label={t.placeholder}
        />
        <button type="submit" className={styles.btn} disabled={typing || !input.trim()}>{t.send}</button>
      </form>

      {msgs.length > 0 && !typing && (
        <motion.div initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} style={{ marginTop: 22 }}>
          <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={onCta}>{t.contactCta}</button>
        </motion.div>
      )}
    </div>
  );
}

/* ----- entry row + modal ----- */
export default function AgentTools({
  lang,
  id,
  tone = "gold",
  open: openProp,
  origin: originProp,
  onOpenChange,
}: {
  lang: Lang;
  id?: string;
  tone?: Tone;
  // optional controlled mode, so the nav can open the assistant from outside
  open?: ToolId | null;
  origin?: { x: number; y: number };
  onOpenChange?: (v: ToolId | null) => void;
}) {
  const t = T[lang];
  const reduce = !!useReducedMotion();
  const [openState, setOpenState] = useState<ToolId | null>(null);
  const [originState, setOriginState] = useState({ x: 50, y: 50 });
  const open = openProp !== undefined ? openProp : openState;
  const origin = originProp ?? originState;
  const setOpen = useCallback(
    (v: ToolId | null) => {
      setOpenState(v);
      onOpenChange?.(v);
    },
    [onOpenChange]
  );

  const close = useCallback(() => setOpen(null), [setOpen]);
  const goContact = useCallback(() => {
    setOpen(null);
    document.getElementById("contact")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  }, [reduce, setOpen]);

  return (
    <div className={styles.root} style={TONES[tone]}>
      <div id={id} className={styles.band} data-reveal>
        <div className={styles.inner}>
          <div className={styles.eyebrow} style={{ color: "var(--at-more)" }}>{t.kicker}</div>
        </div>
        <button
          type="button"
          className={styles.row}
          onClick={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            setOriginState({
              x: ((r.left + r.width / 2) / window.innerWidth) * 100,
              y: ((r.top + r.height / 2) / window.innerHeight) * 100,
            });
            setOpen("assistant");
          }}
        >
          <span className={styles.rowIcon}><AssistantIcon /></span>
          <span className={styles.rowText}>
            <span style={{ display: "block", fontFamily: "var(--at-serif)", fontWeight: 500, fontSize: "clamp(22px,2.6vw,32px)", lineHeight: 1.15, color: "var(--at-panel)", marginBottom: 8 }}>
              {t.title}
            </span>
            <span style={{ display: "block", fontSize: 14, lineHeight: 1.6, color: "var(--at-muted)", maxWidth: 620 }}>{t.desc}</span>
          </span>
          <span className={styles.rowCta}>
            {t.cta} <span className={styles.rowArrow}>→</span>
          </span>
        </button>
      </div>

      <Modal
        open={open === "assistant"}
        onClose={close}
        origin={origin}
        eyebrow={`${t.kicker} · ${t.demoTag}`}
        title={t.title}
        reduce={reduce}
        footer={<div className={styles.disclaimer}>{t.disclaimer}</div>}
      >
        <Assistant lang={lang} reduce={reduce} onCta={goContact} />
      </Modal>
    </div>
  );
}

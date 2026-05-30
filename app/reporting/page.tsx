"use client";
import { useState } from "react";
import { TEMPLATES, SENT_REPORTS, type Template } from "@/lib/data/templates";
import { CLIENTS, type Client } from "@/lib/data/clients";
import { CLIENT_NEXT_MEETING } from "@/lib/data/contacts";
import { Ico } from "@/components/kit/icons";
import { Btn, Pill } from "@/components/kit/primitives";
import Sparkline from "@/components/kit/sparkline";
import Donut from "@/components/kit/donut";
import { ClientPickerBtn } from "@/components/shell/chat-popup";
import { ClientBanner } from "./client-banner";
import { DocViewer } from "./doc-viewer";

const OBLIGATION_STYLE: Record<string, { label: string; bg: string; color: string }> = {
  obligatoire: { label: "Obligatoire",  bg: "oklch(0.93 0.04 25)", color: "oklch(0.42 0.12 25)" },
  partiel:     { label: "MIF II minima", bg: "oklch(0.93 0.06 65)", color: "oklch(0.52 0.14 65)" },
  libre:       { label: "Libre",         bg: "var(--paper)",        color: "var(--muted)" },
};

function TemplateCard({ tmpl, disabled, onGenerate, onPreview }: {
  tmpl: Template;
  disabled?: boolean;
  onGenerate?: () => void;
  onPreview?: () => void;
}) {
  const ob = OBLIGATION_STYLE[tmpl.obligation] ?? OBLIGATION_STYLE.libre;
  return (
    <div className={`tmpl-card ${disabled ? "disabled" : ""}`}>
      <div className="preview">
        {tmpl.preview === "perf" && <>
          <div style={{ display: "flex", gap: 6, marginBottom: 4 }}>
            <div style={{ background: "var(--accent-soft)", color: "var(--accent-ink)", padding: "4px 6px", borderRadius: 4, fontSize: 9, fontFamily: "DM Mono, monospace" }}>+5,2 % YTD</div>
            <div style={{ background: "var(--accent-soft)", color: "var(--accent-ink)", padding: "4px 6px", borderRadius: 4, fontSize: 9, fontFamily: "DM Mono, monospace" }}>+1,8 % vs bench</div>
          </div>
          <Sparkline data={[100,101,103,102,104,106,105,108,110]} w={200} h={26} strokeWidth={1.3} />
        </>}
        {tmpl.preview === "bilan" && <>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Donut size={48} thickness={9} segments={[{value:48,color:"var(--accent)"},{value:30,color:"oklch(0.45 0.06 60)"},{value:22,color:"oklch(0.7 0.03 80)"}]} />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
              <div className="line" style={{ width: "80%" }} />
              <div className="line short" />
              <div className="line" style={{ width: "70%" }} />
            </div>
          </div>
        </>}
        {tmpl.preview === "regle" && <>
          {["Profil de risque", "Objectifs", "Adéquation", "Capacité à subir des pertes"].map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 6, height: 6, background: i === 2 ? "var(--warn)" : "var(--ok)", borderRadius: 999 }} />
              <span style={{ fontSize: 10, color: "var(--ink-2)" }}>{s}</span>
            </div>
          ))}
        </>}
        {tmpl.preview === "brief" && <>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4 }}>
            {["240 k€", "+5,4 %", "2"].map((v, i) => (
              <div key={i} style={{ background: "var(--paper)", padding: "4px 6px", borderRadius: 4 }}>
                <div style={{ fontSize: 8, color: "var(--muted)" }}>{["Encours","1 an","Alertes"][i]}</div>
                <div style={{ fontFamily: "Instrument Serif, serif", fontSize: 14, color: i === 2 ? "var(--warn-ink)" : "var(--accent-ink)" }}>{v}</div>
              </div>
            ))}
          </div>
        </>}
        {tmpl.preview === "fiscale" && <>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
            <div style={{ background: "var(--paper)", padding: "4px 6px", borderRadius: 4 }}>
              <div style={{ fontSize: 8, color: "var(--muted)" }}>PER</div>
              <div style={{ fontFamily: "Instrument Serif, serif", fontSize: 14, color: "var(--accent-ink)" }}>12,4 k€</div>
            </div>
            <div style={{ background: "var(--paper)", padding: "4px 6px", borderRadius: 4 }}>
              <div style={{ fontSize: 8, color: "var(--muted)" }}>FCPI</div>
              <div style={{ fontFamily: "Instrument Serif, serif", fontSize: 14, color: "var(--accent-ink)" }}>3,1 k€</div>
            </div>
          </div>
        </>}
        {tmpl.preview === "esg" && <>
          {[{l:"Climat",v:80},{l:"Social",v:60},{l:"Gouvernance",v:72}].map((b, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "60px 1fr 22px", alignItems: "center", gap: 4 }}>
              <span style={{ fontSize: 9.5, color: "var(--ink-2)" }}>{b.l}</span>
              <div style={{ height: 4, background: "var(--paper)", borderRadius: 999, overflow: "hidden" }}>
                <i style={{ display: "block", height: "100%", width: `${b.v}%`, background: "var(--accent)" }} />
              </div>
              <span style={{ fontSize: 9, fontFamily: "DM Mono, monospace", textAlign: "right", color: "var(--ink-2)" }}>{b.v}%</span>
            </div>
          ))}
        </>}
        {tmpl.preview === "adequation" && <>
          <div style={{ fontSize: 9, color: "var(--muted)", marginBottom: 4, letterSpacing: "0.05em", textTransform: "uppercase" }}>Couche réglementaire</div>
          {["Profil de risque · 4/7", "Objectifs déclarés", "SRI ≤ profil ✓", "Capacité à subir des pertes"].map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 5, height: 5, borderRadius: 999, flexShrink: 0, background: i === 1 ? "var(--warn)" : "var(--ok)" }} />
              <span style={{ fontSize: 9.5, color: "var(--ink-2)" }}>{s}</span>
            </div>
          ))}
          <div style={{ fontSize: 9, color: "var(--muted)", marginTop: 6, marginBottom: 3, letterSpacing: "0.05em", textTransform: "uppercase" }}>Couche investissement</div>
          <div style={{ display: "flex", gap: 4 }}>
            <div style={{ background: "var(--paper)", padding: "3px 6px", borderRadius: 4 }}>
              <div style={{ fontSize: 8, color: "var(--muted)" }}>Encours</div>
              <div style={{ fontFamily: "DM Mono, monospace", fontSize: 11, color: "var(--accent-ink)" }}>240 k€</div>
            </div>
            <div style={{ background: "var(--paper)", padding: "3px 6px", borderRadius: 4 }}>
              <div style={{ fontSize: 8, color: "var(--muted)" }}>SRI</div>
              <div style={{ fontFamily: "DM Mono, monospace", fontSize: 11, color: "var(--ok)" }}>3 / 7</div>
            </div>
          </div>
        </>}
        {tmpl.preview === "proposition" && <>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Donut size={48} thickness={9} segments={[{value:55,color:"var(--accent)"},{value:25,color:"oklch(0.55 0.12 150)"},{value:20,color:"oklch(0.65 0.04 220)"}]} />
            <div style={{ flex: 1 }}>
              {[["Actions","55 %","var(--accent)"],["Obligataire","25 %","oklch(0.55 0.12 150)"],["Monétaire","20 %","oklch(0.65 0.04 220)"]].map(([l,v,c]) => (
                <div key={l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 9.5, color: "var(--ink-2)" }}>
                    <i style={{ display: "block", width: 6, height: 6, borderRadius: 999, background: c, flexShrink: 0 }} />
                    {l}
                  </span>
                  <span style={{ fontFamily: "DM Mono, monospace", fontSize: 9.5, color: "var(--ink)" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 6, display: "flex", gap: 4 }}>
            <div style={{ background: "var(--accent-soft)", padding: "3px 7px", borderRadius: 4, fontSize: 9, color: "var(--accent-ink)", fontFamily: "DM Mono, monospace" }}>Profil 4/7</div>
            <div style={{ background: "var(--paper)", padding: "3px 7px", borderRadius: 4, fontSize: 9, color: "var(--muted)" }}>5 fonds sélectionnés</div>
          </div>
        </>}
        {tmpl.preview === "dici" && <>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
            <span style={{ fontSize: 9, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>40 lignes</span>
            <span style={{ fontSize: 9, color: "var(--warn-ink)", background: "var(--warn-soft, oklch(0.95 0.04 80))", padding: "1px 6px", borderRadius: 99 }}>3 alertes</span>
          </div>
          {[["Carmignac Patrimoine","2024","✓"],["Altaroc Odyssey 2023","2023","⚠"],["Primonial SCPI","2025","✓"]].map(([n,v,s]) => (
            <div key={n} style={{ display: "grid", gridTemplateColumns: "1fr 30px 16px", alignItems: "center", gap: 4, marginBottom: 2 }}>
              <span style={{ fontSize: 9, color: "var(--ink-2)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{n}</span>
              <span style={{ fontSize: 8.5, fontFamily: "DM Mono, monospace", color: "var(--muted)", textAlign: "center" }}>{v}</span>
              <span style={{ fontSize: 10, textAlign: "center" }}>{s}</span>
            </div>
          ))}
        </>}
        {tmpl.preview === "mif2" && <>
          <div style={{ fontSize: 9, color: "var(--muted)", marginBottom: 4, letterSpacing: "0.05em", textTransform: "uppercase" }}>Frais agrégés</div>
          {[["OGC fonds","1,45 %"],["Frais PE","0,80 %"],["Rétrocessions","0,35 %"]].map(([l,v]) => (
            <div key={l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
              <span style={{ fontSize: 9.5, color: "var(--ink-2)" }}>{l}</span>
              <span style={{ fontFamily: "DM Mono, monospace", fontSize: 9.5, color: "var(--ink)" }}>{v}</span>
            </div>
          ))}
          <div style={{ borderTop: "1px solid var(--border)", marginTop: 4, paddingTop: 4, display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 9.5, fontWeight: 600, color: "var(--ink)" }}>Total</span>
            <span style={{ fontFamily: "DM Mono, monospace", fontSize: 10, color: "var(--accent-ink)", fontWeight: 600 }}>2,60 %</span>
          </div>
        </>}
      </div>
      <div className="body">
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
          <span className="eb" style={{ fontSize: 10.5, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--muted)" }}>{tmpl.cat}</span>
          <span style={{ display: "inline-block", padding: "1px 6px", borderRadius: 4, fontSize: 9, fontWeight: 700, letterSpacing: "0.04em", background: ob.bg, color: ob.color, textTransform: "uppercase" }}>{ob.label}</span>
        </div>
        <div className="name">{tmpl.name}</div>
        {tmpl.ref && (
          <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 3, fontFamily: "DM Mono, monospace" }}>{tmpl.ref}</div>
        )}
        <div style={{ fontSize: 11, color: "var(--ink-2)", lineHeight: 1.55, marginTop: 6, marginBottom: 10 }}>{tmpl.desc}</div>
        <div className="ctas">
          <Btn variant="accent" size="sm" onClick={onGenerate} disabled={disabled}>Générer</Btn>
          <Btn variant="ghost" size="sm" onClick={onPreview} disabled={disabled}>Aperçu</Btn>
        </div>
      </div>
    </div>
  );
}

const THEME_OPTIONS = [
  { id: "neutral",   label: "Neutre",   bg: "oklch(0.55 0.012 60)",    headerBg: "oklch(0.22 0.012 60)" },
  { id: "accent",    label: "Charlie",  bg: "var(--accent)",            headerBg: "var(--accent)" },
  { id: "gold",      label: "Or",       bg: "oklch(0.72 0.14 85)",      headerBg: "oklch(0.58 0.14 85)" },
  { id: "green",     label: "ISR",      bg: "oklch(0.52 0.1 150)",      headerBg: "oklch(0.42 0.1 150)" },
  { id: "aubergine", label: "Premium",  bg: "oklch(0.42 0.1 300)",      headerBg: "oklch(0.32 0.1 300)" },
];

function ReportPreview({ template, client, onClose }: { template: Template; client: Client; onClose: () => void }) {
  const [tone, setTone]           = useState("Synthétique");
  const [themeId, setThemeId]     = useState("accent");
  const [cover, setCover]         = useState(true);
  const [signature, setSignature] = useState(true);
  const [showGraphs, setShowGraphs] = useState(true);
  const [showAnnex, setShowAnnex]   = useState(false);
  const [commentary, setCommentary] = useState("");
  const [recipient, setRecipient]   = useState("m.durand@email.fr");
  const [ccList, setCcList]         = useState<string[]>([]);
  const [dateFrom, setDateFrom]     = useState("2026-01-01");
  const [dateTo, setDateTo]         = useState("2026-03-31");
  const [showDoc, setShowDoc]       = useState(false);
  const [sections, setSections]     = useState<string[]>(
    Array.isArray(template.chips.default) ? template.chips.default : [template.chips.default]
  );
  const [briefPoints, setBriefPoints] = useState<string[]>(
    template.id === "brief" ? (CLIENT_NEXT_MEETING[client.id]?.points ?? []) : []
  );

  const period = template.chips.multi ? "1 an" : (sections[0] ?? "1 an");
  const theme = THEME_OPTIONS.find(t => t.id === themeId) ?? THEME_OPTIONS[1];
  const extras = { points: briefPoints, commentary: commentary || undefined };

  const toggleSection = (opt: string) => {
    if (!template.chips.multi) { setSections([opt]); return; }
    setSections(prev => prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt]);
  };

  const charlieRedige = () => {
    if (template.id === "brief") {
      setCommentary(`Rendez-vous de suivi semestriel avec ${client.name}. Priorité absolue : valider l'arbitrage Carmignac Patrimoine — engagement pris lors du dernier entretien du 14 février. Vérifier la mise à jour du profil KYC avant signature.`);
    } else if (template.id === "adequation") {
      setCommentary(`Dans le cadre de notre obligation de conseil, et conformément à l'article 25(6) de MIF II, je vous soumets ce rapport d'adéquation actualisé. Il intègre la mise à jour de votre profil KYC réalisée ce jour et les recommandations d'arbitrage qui en découlent.`);
    } else if (template.id === "proposition") {
      setCommentary(`Cher ${client.name}, à la suite de notre analyse approfondie de votre situation patrimoniale, je vous présente cette proposition d'investissement personnalisée. Elle vise à améliorer la qualité et l'efficience de votre portefeuille tout en respectant strictement votre profil de risque et vos objectifs.`);
    } else {
      setCommentary(`Cher ${client.name}, suite à notre dernier entretien, je vous transmets ce rapport sur la période sélectionnée. Votre portefeuille affiche une performance de +5,4 % sur la période, supérieure de 1,8 point au benchmark équilibré de référence. Les principaux moteurs de performance sont la poche actions internationale et les fonds thématiques ISR.`);
    }
  };

  if (showDoc) {
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(15,15,13,0.72)", display: "flex", flexDirection: "column", alignItems: "center", overflowY: "auto" }}>
        <div style={{ position: "sticky", top: 0, zIndex: 1, background: "#1a1a18", padding: "10px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", boxSizing: "border-box" }}>
          <span style={{ color: "white", fontWeight: 600, fontSize: 13 }}>{template.name} · {client.name}</span>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => window.print()}
              style={{ background: "var(--accent)", border: "none", color: "white", borderRadius: 8, padding: "6px 14px", fontWeight: 600, fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
            >
              <Ico.download s={12} /> PDF / Imprimer
            </button>
            <button
              onClick={() => setShowDoc(false)}
              style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)", borderRadius: 8, padding: "6px 12px", fontSize: 12, cursor: "pointer" }}
            >
              ✕ Fermer
            </button>
          </div>
        </div>
        <div style={{ width: "100%", maxWidth: 844, background: "#e8e5e0", paddingBottom: 40 }} className="doc-print-target">
          <DocViewer template={template} client={client} sections={sections} period={period} extras={extras} />
        </div>
      </div>
    );
  }

  return (
    <div className="report-side">
      <div className="row-between">
        <Pill variant="accent">{template.cat}</Pill>
        <button className="icon-btn" onClick={onClose}><Ico.x s={14} /></button>
      </div>
      <h2 style={{ marginTop: 12, marginBottom: 18 }}>{template.name} · {client.name}</h2>

      {/* Période, sections ou agenda (brief) */}
      {template.id === "brief" ? (
        <div className="conf-block">
          <div className="conf-label-row">
            <span className="eyebrow">Ordre du jour</span>
            <button className="charlie-draft-btn" onClick={() => setBriefPoints([
              "Bilan de performance depuis janvier",
              "Arbitrage Carmignac Patrimoine → Charlie Patrimoine 60/40",
              "Rééquilibrage de la poche monétaire",
              "Point sur l'optimisation fiscale",
            ])}>✦ Charlie suggère</button>
          </div>
          <div style={{ marginTop: 8 }}>
            {briefPoints.map((pt, i) => (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                <span style={{ width: 20, height: 20, borderRadius: "50%", background: "var(--accent)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
                <input
                  className="conf-input conf-input-inline"
                  value={pt}
                  onChange={e => { const next = [...briefPoints]; next[i] = e.target.value; setBriefPoints(next); }}
                  style={{ flex: 1 }}
                  placeholder={`Point ${i + 1}…`}
                />
                <button
                  style={{ width: 24, height: 24, borderRadius: 4, border: "none", background: "transparent", color: "var(--muted)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                  onClick={() => setBriefPoints(briefPoints.filter((_, j) => j !== i))}
                >
                  <Ico.x s={11} />
                </button>
              </div>
            ))}
            <button className="rdv-add-btn" style={{ marginTop: 4 }} onClick={() => setBriefPoints([...briefPoints, ""])}>
              <Ico.plus s={11} /> Ajouter un point
            </button>
          </div>
        </div>
      ) : (
        <div className="conf-block">
          <span className="eyebrow">{template.chips.label}</span>
          {template.chips.label === "Période" ? (
            <div className="conf-date-range">
              <div className="date-field">
                <label>Du</label>
                <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="conf-date-input" />
              </div>
              <span className="date-sep">→</span>
              <div className="date-field">
                <label>Au</label>
                <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="conf-date-input" />
              </div>
            </div>
          ) : (
            <div className="chips-row" style={{ marginTop: 8 }}>
              {template.chips.options.map(o => (
                <button key={o} className={`chip-filter ${sections.includes(o) ? "active" : ""}`} onClick={() => toggleSection(o)}>{o}</button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Ton */}
      <div className="conf-block">
        <span className="eyebrow">Ton du rapport</span>
        <div className="chips-row" style={{ marginTop: 8 }}>
          {["Synthétique", "Détaillé", "Pédagogique"].map(t => (
            <button key={t} className={`chip-filter ${tone === t ? "active" : ""}`} onClick={() => setTone(t)}>{t}</button>
          ))}
        </div>
      </div>

      {/* Couleurs */}
      <div className="conf-block">
        <span className="eyebrow">Couleurs &amp; branding</span>
        <div className="conf-swatches">
          {THEME_OPTIONS.map(th => (
            <button
              key={th.id}
              className={`conf-swatch ${themeId === th.id ? "active" : ""}`}
              onClick={() => setThemeId(th.id)}
              style={{ background: th.bg }}
              title={th.label}
              aria-label={th.label}
            >
              {themeId === th.id && <span className="swatch-check">✓</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Mise en page — toggle switches */}
      <div className="conf-block">
        <span className="eyebrow">Mise en page</span>
        <div className="conf-toggles-grid">
          {([
            { label: "Page de garde",          value: cover,      set: setCover },
            { label: "Signature CGP",          value: signature,  set: setSignature },
            { label: "Graphiques",             value: showGraphs, set: setShowGraphs },
            { label: "Annexes réglementaires", value: showAnnex,  set: setShowAnnex },
          ] as { label: string; value: boolean; set: (v: boolean) => void }[]).map(({ label, value, set }) => (
            <label key={label} className="conf-toggle-switch">
              <input type="checkbox" checked={value} onChange={e => set(e.target.checked)} />
              <span className="toggle-track">
                <span className="toggle-thumb" />
              </span>
              <span className="toggle-label">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Commentaire */}
      <div className="conf-block">
        <div className="conf-label-row">
          <span className="eyebrow">Commentaire d&apos;introduction</span>
          <button className="charlie-draft-btn" onClick={charlieRedige}>✦ Charlie rédige</button>
        </div>
        <textarea
          className="conf-textarea"
          placeholder="Ajoutez quelques lignes de contexte…"
          value={commentary}
          onChange={e => setCommentary(e.target.value)}
          rows={3}
        />
      </div>

      {/* Destinataires */}
      <div className="conf-block">
        <span className="eyebrow">Destinataires</span>
        <div className="conf-recipient-row">
          <div className="conf-recipient-main">
            <span className="recipient-to-label">À</span>
            <input className="conf-input conf-input-inline" value={recipient} onChange={e => setRecipient(e.target.value)} placeholder="email@client.fr" />
          </div>
        </div>
        {ccList.map((cc, i) => (
          <div key={i} className="conf-recipient-row" style={{ marginTop: 6 }}>
            <div className="conf-recipient-main">
              <span className="recipient-to-label" style={{ opacity: 0.5 }}>CC</span>
              <input
                className="conf-input conf-input-inline"
                value={cc}
                onChange={e => { const next = [...ccList]; next[i] = e.target.value; setCcList(next); }}
                placeholder="cc@exemple.fr"
              />
            </div>
            <button
              style={{ width: 28, height: 28, borderRadius: 6, border: "none", background: "transparent", color: "var(--muted)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
              onClick={() => setCcList(ccList.filter((_, j) => j !== i))}
            >
              <Ico.x s={11} />
            </button>
          </div>
        ))}
        {ccList.length < 3 && (
          <button className="rdv-add-btn" style={{ marginTop: 6 }} onClick={() => setCcList([...ccList, ""])}>
            <Ico.plus s={11} /> Ajouter un CC
          </button>
        )}
      </div>

      {/* Aperçu document — rendu réel à 52 % */}
      <button
        onClick={() => setShowDoc(true)}
        style={{ width: "100%", background: "var(--accent)", border: "none", borderRadius: 8, padding: "9px 16px", color: "white", fontWeight: 600, fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, flexShrink: 0 }}
      >
        Voir le document complet →
      </button>
      <div className="report-preview-doc doc-live-preview" style={{ padding: 0, overflow: "hidden", height: 390, minHeight: 390, flexShrink: 0, background: "#f0ede8", borderRadius: 8, position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, transformOrigin: "top left", transform: "scale(0.52)", width: "calc(100% / 0.52)", pointerEvents: "none" }}>
          <DocViewer template={template} client={client} sections={sections} period={period} extras={extras} />
        </div>
      </div>

      <div className="report-side-foot">
        <Btn variant="accent" size="sm" icon={<Ico.refresh s={13} />}>Régénérer</Btn>
        <Btn variant="ghost" size="sm" icon={<Ico.edit s={13} />}>Éditer</Btn>
        <Btn variant="ghost" size="sm" icon={<Ico.download s={13} />} onClick={() => setShowDoc(true)}>PDF</Btn>
        <div style={{ flex: 1 }} />
        <Btn variant="primary" size="sm" icon={<Ico.send s={13} />}>Envoyer</Btn>
      </div>
    </div>
  );
}

export default function ReportingPage() {
  const [clientId, setClientId] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");
  const [previewTmpl, setPreviewTmpl] = useState<Template | null>(null);
  const client = clientId ? CLIENTS.find(c => c.id === clientId) ?? null : null;

  const list = filter === "all" ? TEMPLATES
    : filter === "mine" ? TEMPLATES.filter(t => ["adequation", "perf", "brief"].includes(t.id))
    : TEMPLATES.filter(t => t.catKey === filter);

  if (!client) {
    return (
      <div className="page-b2b" data-screen-label="05 Reporting">
        <div className="row-between">
          <h1 className="h-hero">Préparez le bon <span className="it">rapport</span>.</h1>
          <Btn variant="accent" icon={<Ico.user s={13} />} onClick={() => setClientId("durand")}>Choisir un client</Btn>
        </div>
        <div className="report-empty">
          <div className="ico"><Ico.user s={26} /></div>
          <div className="ttl">Aucun client chargé.</div>
        </div>
        <h2 className="h-section" style={{ marginTop: 28 }}>Modèles de rapport</h2>
        <div className="tmpl-grid">
          {TEMPLATES.map(t => <TemplateCard key={t.id} tmpl={t} disabled onGenerate={() => {}} onPreview={() => {}} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="page-b2b" data-screen-label="05 Reporting">
      <div className="row-between">
        <h1 className="h-hero">Un rapport <span className="it">pour {client.name}</span>.</h1>
        <ClientPickerBtn client={client} onChange={c => setClientId(c.id)} />
      </div>

      <ClientBanner client={client} />

      <div className="row-between" style={{ margin: "24px 0 6px" }}>
        <h2 className="h-section">Modèles de rapport</h2>
        <div className="chips-row">
          <button className={`chip-filter ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>Tous</button>
          <button className={`chip-filter ${filter === "Investissement" ? "active" : ""}`} onClick={() => setFilter("Investissement")}>Investissement</button>
          <button className={`chip-filter ${filter === "Réglementaire" ? "active" : ""}`} onClick={() => setFilter("Réglementaire")}>Réglementaire</button>
          <button className={`chip-filter ${filter === "Préparation" ? "active" : ""}`} onClick={() => setFilter("Préparation")}>Préparation</button>
          <button className={`chip-filter ${filter === "mine" ? "active" : ""}`} onClick={() => setFilter("mine")}>Mes modèles</button>
        </div>
      </div>
      <div className={previewTmpl ? "report-layout" : ""}>
        <div className="tmpl-grid" style={previewTmpl ? { margin: 0 } : {}}>
          {list.map(t => (
            <TemplateCard
              key={t.id} tmpl={t}
              onGenerate={() => setPreviewTmpl(t)}
              onPreview={() => setPreviewTmpl(t)}
            />
          ))}
        </div>
        {previewTmpl && <ReportPreview template={previewTmpl} client={client} onClose={() => setPreviewTmpl(null)} />}
      </div>

      <h2 className="h-section" style={{ marginTop: 32 }}>Rapports envoyés</h2>
      <div className="doc-table-card" style={{ marginTop: 12 }}>
        {SENT_REPORTS.map((r, i) => (
          <div key={i} className="sent-row">
            <div>
              <div className="date">{r.date}</div>
              <div className="by">par {r.by}</div>
            </div>
            <div>
              <Pill variant="outline">{r.cat}</Pill>
              <div className="name" style={{ marginTop: 6 }}>{r.name}</div>
            </div>
            <Pill variant={r.statusV}>{r.status}</Pill>
            <div className="actions">
              <Btn variant="ghost" size="sm">Ouvrir</Btn>
              <Btn variant="ghost" size="sm">Renvoyer</Btn>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

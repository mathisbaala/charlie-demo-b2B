"use client";
import { useState } from "react";
import { TEMPLATES, SENT_REPORTS, type Template } from "@/lib/data/templates";
import { CLIENTS, type Client } from "@/lib/data/clients";
import { Ico } from "@/components/kit/icons";
import { Btn, Pill } from "@/components/kit/primitives";
import Sparkline from "@/components/kit/sparkline";
import Donut from "@/components/kit/donut";
import { ClientPickerBtn } from "@/components/shell/chat-popup";
import { ClientBanner } from "./client-banner";

function TemplateCard({ tmpl, disabled, onGenerate, onPreview }: {
  tmpl: Template;
  disabled?: boolean;
  onGenerate?: () => void;
  onPreview?: () => void;
}) {
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
      </div>
      <div className="body">
        <span className="eb" style={{ fontSize: 10.5, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--muted)" }}>{tmpl.cat}</span>
        <div className="name">{tmpl.name}</div>
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
  const [sections, setSections]     = useState<string[]>(
    Array.isArray(template.chips.default) ? template.chips.default : [template.chips.default]
  );

  const theme = THEME_OPTIONS.find(t => t.id === themeId) ?? THEME_OPTIONS[1];

  const toggleSection = (opt: string) => {
    if (!template.chips.multi) { setSections([opt]); return; }
    setSections(prev => prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt]);
  };

  const charlieRedige = () => {
    setCommentary(
      `Cher ${client.name}, suite à notre dernier entretien, je vous transmets ce rapport sur la période sélectionnée. Votre portefeuille affiche une performance de +5,4 % sur la période, supérieure de 1,8 point au benchmark équilibré de référence. Les principaux moteurs de performance sont la poche actions internationale et les fonds thématiques ISR.`
    );
  };

  return (
    <div className="report-side">
      <div className="row-between">
        <Pill variant="accent">{template.cat}</Pill>
        <button className="icon-btn" onClick={onClose}><Ico.x s={14} /></button>
      </div>
      <h2 style={{ marginTop: 12, marginBottom: 18 }}>{template.name} · {client.name}</h2>

      {/* Période ou sections */}
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

      {/* Aperçu document */}
      <div className="report-preview-doc" style={{ padding: 0, overflow: "hidden" }}>
        <div className="preview-doc-header" style={{ background: theme.headerBg }}>
          <div className="preview-doc-brand">charlie</div>
          <div className="preview-doc-title-block">
            <div className="preview-doc-title">{template.name}</div>
            <div className="preview-doc-sub">{client.name} · profil {client.profile}</div>
          </div>
        </div>
        <div style={{ padding: "16px 20px" }}>
          <div className="doc-stats">
            <div className="item"><div className="lbl">Encours</div><div className="v">240 k€</div></div>
            <div className="item">
              <div className="lbl">Période</div>
              <div className="v" style={{ fontSize: 12 }}>
                {dateFrom.split("-").reverse().join("/")} → {dateTo.split("-").reverse().join("/")}
              </div>
            </div>
            <div className="item"><div className="lbl">Score</div><div className="v">72/100</div></div>
          </div>
          {commentary.trim() && (
            <p style={{ fontStyle: "italic", color: "var(--ink-2)", fontSize: "12px", lineHeight: 1.6, margin: "12px 0 0" }}>{commentary}</p>
          )}
          {sections.map(s => (
            <div key={s} className="preview-section-block">
              <div className="preview-section-name" style={{ color: theme.headerBg }}>{s}</div>
              <div className="preview-section-lines">
                <div className="preview-line" />
                <div className="preview-line short" />
              </div>
            </div>
          ))}
          <div className="pagenum">1 / {2 + sections.length} · {tone.toLowerCase()}</div>
        </div>
      </div>

      <div className="report-side-foot">
        <Btn variant="accent" size="sm" icon={<Ico.refresh s={13} />}>Régénérer</Btn>
        <Btn variant="ghost" size="sm" icon={<Ico.edit s={13} />}>Éditer</Btn>
        <Btn variant="ghost" size="sm" icon={<Ico.download s={13} />}>PDF</Btn>
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
    : filter === "mine" ? TEMPLATES.slice(0, 2)
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
          {TEMPLATES.map(t => <TemplateCard key={t.id} tmpl={t} disabled />)}
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

"use client";
import { Suspense } from "react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CLIENTS, type Client } from "@/lib/data/clients";
import { Ico } from "@/components/kit/icons";
import { Btn, Pill, Av } from "@/components/kit/primitives";
import Sparkline from "@/components/kit/sparkline";
import Donut from "@/components/kit/donut";
import { ClientPickerBtn } from "@/components/shell/chat-popup";

const ALLOC_COLORS: Record<string, string> = {
  Actions: "var(--accent)",
  Obligations: "oklch(0.45 0.06 60)",
  Immobilier: "oklch(0.62 0.08 50)",
  "Cash & monétaire": "oklch(0.82 0.025 80)",
};

function ClientBanner({ client }: { client: Client }) {
  return (
    <div className="client-banner">
      <Av initials={client.initials} size="xxl" accent />
      <div className="info">
        <div className="name">{client.name}</div>
        <div className="stats-row">
          <div className="stat-item"><div className="lbl">Encours</div><div className="v">{client.encours}</div></div>
          <div className="stat-item"><div className="lbl">Horizon</div><div className="v">{client.horizon}</div></div>
          <div className="stat-item"><div className="lbl">Profil de risque</div><div className="v">{client.profile}</div></div>
        </div>
        <div className="meta-line">
          <span>Dernier rendez-vous, 14 février 2026.</span>
          <span>·</span>
          <span>Prochain rendez-vous, aujourd'hui 9 h 30.</span>
        </div>
      </div>
      <div className="scores">
        <div className="score-block">
          <div className="lbl">Score santé</div>
          <div className="v ok">82</div>
          <div className="bar"><i style={{ width: "82%", background: "var(--ok)" }} /></div>
        </div>
        <div className="score-block">
          <div className="lbl">Score patrimoine</div>
          <div className="v accent">72</div>
          <div className="bar"><i style={{ width: "72%", background: "var(--accent)" }} /></div>
        </div>
      </div>
    </div>
  );
}

function TabDiagnostic() {
  const allocation = [
    { name: "Actions",          value: 48, delta: "−8", deltaCls: "warn" },
    { name: "Obligations",      value: 30, delta: "+5", deltaCls: "ok" },
    { name: "Immobilier",       value: 15, delta: "0",  deltaCls: "" },
    { name: "Cash & monétaire", value: 7,  delta: "+3", deltaCls: "warn" },
  ];
  const points = [
    { swatch: "warn",   t: "Surexposition à la zone Euro",                s: "Carmignac Patrimoine, DNCA Eurose, Echiquier Major SRI cumulent 62 % du poids actions.",  pill: "Élevé",    pillV: "warn" },
    { swatch: "accent", t: "Frais moyens 1,28 % · au-dessus du benchmark", s: "Trois fonds dépassent 1,5 % de frais courants, à arbitrer en priorité.",                  pill: "Moyen",    pillV: "outline" },
    { swatch: "accent", t: "Liquidité disponible 12 % · cible 5-8 %",     s: "Excès de monétaire de 25 k€, à réinvestir selon le mandat équilibré.",                     pill: "Moyen",    pillV: "outline" },
    { swatch: "ok",     t: "Empreinte ISR conforme · 71 % Article 8/9",   s: "Objectif client 70 % atteint, marge de progression sur la poche actions.",                 pill: "Conforme", pillV: "ok" },
  ];

  return (
    <div>
      <div className="diag-hero">
        <div className="tile">
          <span className="eb">Score global</span>
          <div><span className="big">72<span className="max">/100</span></span></div>
          <div className="bar-with-mark">
            <div className="fill" style={{ width: "72%" }} />
            <div className="mark" style={{ left: "80%" }} />
          </div>
          <div className="sub">+ 8 points pour atteindre la cible 80.</div>
        </div>
        <div className="tile accent">
          <div className="row-between" style={{ flexWrap: "nowrap", gap: 8 }}>
            <span className="eb">Performance 1 an</span>
            <div className="chips-row" style={{ gap: 2 }}>
              {["3 m", "1 an", "3 ans"].map(p => (
                <button key={p} className={`mini-chip ${p === "1 an" ? "active" : ""}`}>{p}</button>
              ))}
            </div>
          </div>
          <div className="row-flex" style={{ alignItems: "baseline", marginTop: 4, gap: 10, flexWrap: "wrap" }}>
            <span className="perf-big">+5,4 %</span>
            <span className="perf-bench">+1,8 pt vs benchmark</span>
          </div>
          <div style={{ marginTop: 14 }}>
            <Sparkline data={[100,101,99,102,103,101,104,105,104,107,106,108,110]} h={50} color="var(--accent)" strokeWidth={1.8} responsive />
          </div>
        </div>
        <div className="tile">
          <span className="eb">Risque</span>
          <div><span className="big" style={{ fontSize: 56 }}>6,2<span className="max">/10</span></span></div>
          <div className="sub">Cohérent avec le profil équilibré.</div>
        </div>
      </div>

      <div className="diag-grid">
        <div className="card alloc-card">
          <span className="eyebrow">Allocation actuelle</span>
          <div className="alloc-flex" style={{ marginTop: 12 }}>
            <Donut size={170} thickness={26} segments={allocation.map(a => ({ value: a.value, color: ALLOC_COLORS[a.name] }))} />
            <div className="alloc-legend">
              {allocation.map(a => (
                <div key={a.name} className="leg-row">
                  <span className="sw" style={{ background: ALLOC_COLORS[a.name] }} />
                  <span className="name">{a.name}</span>
                  <span className="val">{a.value} %</span>
                  <span className={`delta ${a.deltaCls}`}>Δ {a.delta}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 18, borderTop: "1px dashed var(--line-soft)", paddingTop: 16 }}>
            <span className="eyebrow">Performances détaillées</span>
            <div className="kpi-row kpi-4" style={{ marginTop: 10 }}>
              <div className="kpi"><div className="lbl">YTD</div><div className="v"><span className="num">+3,2 %</span></div></div>
              <div className="kpi"><div className="lbl">1 an</div><div className="v"><span className="num">+5,4 %</span></div></div>
              <div className="kpi"><div className="lbl">3 ans</div><div className="v"><span className="num">+18 %</span></div></div>
              <div className="kpi"><div className="lbl">vs benchmark</div><div className="v"><span className="num">+1,8 pt</span></div></div>
            </div>
          </div>
        </div>

        <div className="card card-pad">
          <h2 className="h-section">Points d'attention</h2>
          <div style={{ marginTop: 8 }}>
            {points.map((p, i) => (
              <div key={i} className="flag-row">
                <div className={`swatch ${p.swatch}`} />
                <div>
                  <div className="ftitle">{p.t}</div>
                  <div className="fsub">{p.s}</div>
                </div>
                <Pill variant={p.pillV}>{p.pill}</Pill>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TabOptimisation() {
  const compare = [
    { name: "Actions",          color: ALLOC_COLORS.Actions,          cur: 48, cible: 42, delta: "−6" },
    { name: "Obligations",      color: ALLOC_COLORS.Obligations,      cur: 30, cible: 34, delta: "+4" },
    { name: "Immobilier",       color: ALLOC_COLORS.Immobilier,       cur: 15, cible: 17, delta: "+2" },
    { name: "Cash & monétaire", color: ALLOC_COLORS["Cash & monétaire"], cur: 7, cible: 7, delta: "0" },
  ];

  return (
    <div>
      <div className="opt-banner">
        <div>
          <span className="eb">Gain attendu en suivant le plan</span>
          <div className="head">+1,8 % d'efficience par an</div>
          <div className="sub">
            Rééquilibrage de la poche actions vers les zones émergentes et ISR thématique, allègement de Carmignac Patrimoine, allocation des 25 k€ de cash excédentaire vers l'obligataire court terme.
          </div>
        </div>
        <div className="actions">
          <Btn variant="accent">Simuler le plan</Btn>
          <Btn variant="primary" icon={<Ico.send s={13} />}>Lettre de mandat</Btn>
          <Btn variant="ghost" icon={<Ico.history s={13} />}>Plan de versement</Btn>
        </div>
      </div>

      <div className="alloc-compare">
        <div>
          <div className="donuts">
            <div>
              <Donut size={150} thickness={22} segments={compare.map(c => ({ value: c.cur, color: c.color }))} />
              <div className="donut-label">Actuel</div>
            </div>
            <span className="donut-arrow">→</span>
            <div>
              <Donut size={150} thickness={22} segments={compare.map(c => ({ value: c.cible, color: c.color }))} />
              <div className="donut-label" style={{ color: "var(--accent-ink)" }}>Cible</div>
            </div>
          </div>
        </div>
        <div className="compare-table">
          {compare.map(c => (
            <div key={c.name} className="ct-row">
              <span className="sw" style={{ background: c.color }} />
              <span>{c.name}</span>
              <span className="cur">{c.cur} %</span>
              <span className="arr">→</span>
              <span className="cible">{c.cible} %</span>
              <span className="delta">Δ {c.delta}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="plan-card">
        <h2 className="h-section">Plan d'arbitrage</h2>
        <div style={{ marginTop: 8 }}>
          {[
            { n: "01", action: "Vendre 24 000 € · DNCA Europe Growth",         why: "Réduit la surexposition zone Euro de 6 points sans déclencher de fiscalité (PEA bénéficie de l'antériorité de 8 ans).",      impact: "−0,4 % de risque · neutre fiscalement" },
            { n: "02", action: "Acheter 14 000 € · Pictet Global Environment", why: "Renforce la poche actions thématique environnement, cohérente avec l'objectif ISR du client.",                                   impact: "+0,8 % d'efficience · empreinte ISR +4 pts" },
            { n: "03", action: "Allouer 10 000 € · Charlie Obligataire Crédit Euro", why: "Replace l'excédent de cash de 25 k€ vers une poche obligataire courte, rendement net 3,8 %.",                              impact: "+0,6 % de rendement · risque inchangé" },
          ].map(p => (
            <div key={p.n} className="plan-row">
              <span className="n">{p.n}</span>
              <div>
                <div className="action">{p.action}</div>
                <div className="why">{p.why}</div>
              </div>
              <Pill variant="accent">{p.impact}</Pill>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TabDocuments() {
  const [filter, setFilter] = useState("all");

  const gens = [
    { glyph: "P", cat: "Investissement", name: "Rapport de performance" },
    { glyph: "B", cat: "Investissement", name: "Bilan patrimonial" },
    { glyph: "F", cat: "Investissement", name: "Synthèse fiscale" },
    { glyph: "R", cat: "Préparation",   name: "Brief de rendez-vous" },
    { glyph: "D", cat: "Réglementaire", name: "Fiche conseil DDA" },
  ];

  const docs = [
    { catKey: "Investissement", swatch: "invest", cat: "Investissement", sub: "Rapport · trimestre 1",    name: "M. Durand — Bilan trimestriel T1 2026",       meta: "14 mai 2026 · 6 pages · 1,8 Mo",           status: "Signé",    statusV: "ok" },
    { catKey: "Échanges",       swatch: "echange", cat: "Échanges",       sub: "Rendez-vous · présentiel", name: "Compte-rendu rendez-vous 14 février",          meta: "14 février 2026 · résumé",                  status: "Résumé",   statusV: "outline" },
    { catKey: "Réglementaire",  swatch: "regle",   cat: "Réglementaire",  sub: "DDA · article 25",         name: "Fiche conseil DDA 2025",                      meta: "31 mai 2025 · 4 pages · 480 Ko",            status: "Signée",   statusV: "ok" },
    { catKey: "Investissement", swatch: "invest",  cat: "Investissement", sub: "Bilan patrimonial · 2025", name: "Bilan patrimonial annuel 2025",               meta: "12 décembre 2025 · 18 pages · 4,2 Mo",      status: "Envoyé",   statusV: "accent" },
    { catKey: "Échanges",       swatch: "echange", cat: "Échanges",       sub: "Email · proposition",      name: "Proposition d'arbitrage AV Generali",         meta: "8 mai 2026 · email",                        status: "Envoyé",   statusV: "accent" },
    { catKey: "Échanges",       swatch: "echange", cat: "Échanges",       sub: "Téléphone · 12 min",       name: "Appel de suivi (allocation immobilier)",      meta: "2 mai 2026 · résumé",                       status: "Résumé",   statusV: "outline" },
    { catKey: "Réglementaire",  swatch: "regle",   cat: "Réglementaire",  sub: "PRIIPs · contrat AV",      name: "DIC Generali Privilège (UC)",                 meta: "10 février 2026 · 3 pages",                 status: "À jour",   statusV: "ok" },
    { catKey: "Investissement", swatch: "invest",  cat: "Investissement", sub: "Note interne",             name: "Mémo arbitrage Carmignac Patrimoine",         meta: "24 mai 2026 · 2 pages · brouillon",         status: "Interne",  statusV: "outline" },
  ];
  const filtered = filter === "all" ? docs : docs.filter(d => d.catKey === filter);

  return (
    <div>
      <div className="doc-strip">
        {gens.map(g => (
          <div key={g.name} className="gen-card">
            <span className="mono">{g.glyph}</span>
            <span className="eb">{g.cat}</span>
            <span className="name">{g.name}</span>
            <Btn variant="accent" size="sm">Générer</Btn>
          </div>
        ))}
      </div>

      <div className="row-between" style={{ marginBottom: 10 }}>
        <h2 className="h-section">Documents et échanges</h2>
        <div className="chips-row">
          <button className={`chip-filter ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>Tous</button>
          <button className={`chip-filter ${filter === "Investissement" ? "active" : ""}`} onClick={() => setFilter("Investissement")}>Investissement</button>
          <button className={`chip-filter ${filter === "Réglementaire" ? "active" : ""}`} onClick={() => setFilter("Réglementaire")}>Réglementaire</button>
          <button className={`chip-filter ${filter === "Échanges" ? "active" : ""}`} onClick={() => setFilter("Échanges")}>Échanges</button>
        </div>
      </div>

      <div className="doc-table-card">
        {filtered.map((d, i) => (
          <div key={i} className="doc-row">
            <div className={`swatch ${d.swatch}`} />
            <div className="cat-cell">
              <div className="lbl">{d.cat}</div>
              <div className="sub">{d.sub}</div>
            </div>
            <div>
              <div className="doc-name">{d.name}</div>
              <div className="doc-meta">{d.meta}</div>
            </div>
            <Pill variant={d.statusV}>{d.status}</Pill>
            <div className="actions">
              <Btn variant="ghost" size="sm">Ouvrir</Btn>
              <button className="icon-btn" aria-label="Télécharger"><Ico.download s={13} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DiagnosticPage() {
  const searchParams = useSearchParams();
  const initialClientId = searchParams.get("client") || "durand";
  const [tab, setTab] = useState("diagnostic");
  const [clientId, setClientId] = useState(initialClientId);
  const client = CLIENTS.find(c => c.id === clientId) || CLIENTS[0];

  return (
    <div className="page-b2b" data-screen-label="04 Diagnostic">
      <div className="row-between">
        <h1 className="h-hero">Le portefeuille de <span className="it">{client.name}</span>.</h1>
        <ClientPickerBtn client={client} onChange={c => setClientId(c.id)} />
      </div>

      <ClientBanner client={client} />

      <div className="tabs-bar">
        <div className="seg">
          <button className={`seg-btn ${tab === "diagnostic" ? "active" : ""}`} onClick={() => setTab("diagnostic")}>Diagnostic</button>
          <button className={`seg-btn ${tab === "optimisation" ? "active" : ""}`} onClick={() => setTab("optimisation")}>Optimisation</button>
          <button className={`seg-btn ${tab === "documents" ? "active" : ""}`} onClick={() => setTab("documents")}>Documents</button>
        </div>
      </div>

      {tab === "diagnostic" && <TabDiagnostic />}
      {tab === "optimisation" && <TabOptimisation />}
      {tab === "documents" && <TabDocuments />}
    </div>
  );
}

export default function DiagnosticPageWrapper() {
  return (
    <Suspense>
      <DiagnosticPage />
    </Suspense>
  );
}

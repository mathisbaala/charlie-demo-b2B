"use client";
import { type Template } from "@/lib/data/templates";
import { type Client } from "@/lib/data/clients";
import { getPortfolioRows } from "@/lib/data/portfolio";

/* ─── Styles partagés ─────────────────────────────────────────── */
const C = {
  accent: "#b5651d",
  border: "#e8e6e0",
  muted: "#888780",
  ink2: "#5f5e5a",
  ink: "#1a1a18",
  red: "#a32d2d",
  green: "#0f6e56",
  bg: "#f8f7f4",
  warn: "#854f0b",
};

const S: Record<string, React.CSSProperties> = {
  page: { background: "white", maxWidth: 740, margin: "0 auto", padding: "48px 52px", fontFamily: "system-ui,-apple-system,sans-serif", fontSize: 12, lineHeight: 1.7, color: C.ink },
  strip: { background: C.ink, padding: "14px 52px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  stripLogo: { fontSize: 16, fontWeight: 700, color: "white", letterSpacing: "0.08em" },
  stripRight: { fontSize: 10, color: "#888780", textAlign: "right" as const },
  section: { marginTop: 28 },
  sectionLabel: { fontSize: 9.5, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.09em", color: C.muted, borderBottom: `1px solid ${C.border}`, paddingBottom: 5, marginBottom: 12 },
  h1: { fontSize: 19, fontWeight: 600, color: C.ink, marginBottom: 3 },
  h2: { fontSize: 12, fontWeight: 600, color: C.ink, marginBottom: 5 },
  p: { color: C.ink2, marginBottom: 8 },
  small: { fontSize: 10.5, color: C.muted },
  bold: { fontWeight: 600, color: C.ink },
  mono: { fontFamily: "DM Mono,monospace", fontSize: 11 },
  table: { width: "100%", borderCollapse: "collapse" as const, fontSize: 11, marginTop: 8 },
  th: { textAlign: "left" as const, padding: "6px 8px", background: C.bg, fontSize: 9.5, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.06em", color: C.muted, borderBottom: `1px solid ${C.border}` },
  td: { padding: "7px 8px", borderBottom: `1px solid ${C.border}`, color: C.ink2, verticalAlign: "top" as const },
  kpiGrid: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 20 },
  kpiBox: { background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 12px" },
  kpiVal: { fontSize: 18, fontWeight: 600, color: C.accent, marginBottom: 2 },
  kpiLbl: { fontSize: 9.5, color: C.muted, lineHeight: 1.3 },
  infoGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, border: `1px solid ${C.border}`, borderRadius: 8, overflow: "hidden", marginBottom: 12 },
  infoRow: { display: "contents" },
  infoKey: { padding: "6px 10px", background: C.bg, fontSize: 11, color: C.muted, fontWeight: 600, borderBottom: `1px solid ${C.border}` },
  infoVal: { padding: "6px 10px", fontSize: 11, color: C.ink, borderBottom: `1px solid ${C.border}` },
  alert: { borderRadius: 8, padding: "10px 14px", marginBottom: 12, fontSize: 11 },
  alertR: { background: "#fcebeb", border: `1px solid #e8b4b4`, color: C.red },
  alertG: { background: "#e1f5ee", border: `1px solid #9ed4c2`, color: C.green },
  alertA: { background: "#faeeda", border: `1px solid #f2c07e`, color: C.warn },
  decl: { background: C.bg, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.accent}`, borderRadius: "0 8px 8px 0", padding: "12px 16px", margin: "16px 0", fontSize: 11.5, color: C.ink, lineHeight: 1.7, fontStyle: "italic" },
  footer: { marginTop: 40, borderTop: `1px solid ${C.border}`, paddingTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  footLabel: { fontSize: 9.5, color: C.muted, marginBottom: 4, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.07em" },
  footVal: { fontSize: 11, color: C.ink },
  sigLine: { borderTop: `1px solid ${C.border}`, marginTop: 24, paddingTop: 4, fontSize: 10, color: C.muted },
  warnBox: { background: "#faeeda", borderRadius: 6, padding: "8px 12px", fontSize: 10.5, color: C.warn, lineHeight: 1.55, marginBottom: 8 },
};

/* ─── Header commun (wrapper complet) ───────────────────────── */
function DocHeader({ title, client, ref: refLabel, date, children }: {
  title: string;
  client: Client;
  ref?: string;
  date?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <div style={S.strip}>
        <span style={S.stripLogo}>charlie</span>
        <span style={S.stripRight}>
          {refLabel && <>{refLabel}<br /></>}
          Document confidentiel · usage exclusif {client.name}
        </span>
      </div>
      <div style={S.page}>
        <div style={{ marginBottom: 20 }}>
          <div style={S.h1}>{title}</div>
          <div style={{ display: "flex", gap: 16, marginTop: 6 }}>
            <span style={S.small}><b>Client :</b> {client.name}</span>
            <span style={S.small}><b>CGP :</b> Camille Vasseur</span>
            <span style={S.small}><b>Date :</b> {date ?? "30 mai 2026"}</span>
            <span style={S.small}><b>N° dossier :</b> CGP-2026-{client.id.slice(0, 3).toUpperCase()}-087</span>
          </div>
        </div>
        {children}
      </div>
    </>
  );
}

/* ─── 1. RAPPORT D'ADÉQUATION ────────────────────────────────── */
function DocAdequation({ client }: { client: Client }) {
  const rows = getPortfolioRows(client.id);
  const total = rows.reduce((s, r) => s + r.amount, 0);
  const sri = rows.reduce((s, r) => s + r.amount * parseInt(r.fund.srri), 0) / total;
  const ytdNum = rows.reduce((s, r) => s + r.amount * parseFloat(r.fund.ytd.replace("+", "").replace(" %", "")), 0) / total;
  const ytdStr = (ytdNum > 0 ? "+" : "") + ytdNum.toFixed(1) + " %";
  const isEquil = client.profile === "Équilibré";
  const profNum = isEquil ? 4 : client.profile === "Dynamique" ? 5 : client.profile === "Prudent" ? 2 : 3;
  const adequate = sri < profNum;
  void ytdStr;

  return (
    <DocHeader title="Rapport d'adéquation — Suitability Report" client={client} ref="MIF II art. 25(6)">
      {/* KPIs */}
      <div style={S.kpiGrid}>
        <div style={S.kpiBox}><div style={S.kpiVal}>{client.encours}</div><div style={S.kpiLbl}>Encours total</div></div>
        <div style={S.kpiBox}><div style={S.kpiVal}>{profNum}/7</div><div style={S.kpiLbl}>Profil de risque</div></div>
        <div style={S.kpiBox}><div style={{ ...S.kpiVal, color: adequate ? C.green : C.red }}>{sri.toFixed(1)}/7</div><div style={S.kpiLbl}>SRI portefeuille moyen</div></div>
        <div style={S.kpiBox}><div style={{ ...S.kpiVal, color: C.green }}>{client.horizon}</div><div style={S.kpiLbl}>Horizon de placement</div></div>
      </div>

      {adequate
        ? <div style={{ ...S.alert, ...S.alertG }}>✓ Cohérence validée — Le SRI moyen du portefeuille ({sri.toFixed(1)}/7) est inférieur au profil de risque déclaré ({profNum}/7).</div>
        : <div style={{ ...S.alert, ...S.alertR }}>⚠ Incohérence détectée — Le SRI moyen du portefeuille ({sri.toFixed(1)}/7) dépasse le profil de risque déclaré ({profNum}/7). Une action corrective est requise.</div>
      }

      {/* Couche réglementaire */}
      <div style={S.section}>
        <div style={{ ...S.sectionLabel, color: C.red }}>Couche 1 — Réglementaire (MIF II)</div>

        <div style={S.h2}>Identification du client</div>
        <div style={S.infoGrid}>
          {[
            ["Nom complet", client.name],
            ["Profil de risque (KYC)", `${profNum}/7 — ${client.profile}`],
            ["Date de validation KYC", "12 janvier 2026"],
            ["Horizon de placement", client.horizon],
            ["Objectif principal", "Constitution d'un capital retraite"],
            ["Tolérance aux pertes déclarée", "Jusqu'à −20 % sur 24 mois"],
            ["Revenus nets mensuels", "6 800 €"],
            ["Capacité d'épargne mensuelle", "1 500 €"],
            ["Niveau de connaissance", "Intermédiaire (AV, PEA, fonds diversifiés)"],
            ["Niveau d'expérience", "Investisseur depuis 8 ans"],
          ].map(([k, v]) => (
            <div key={k} style={S.infoRow}>
              <div style={S.infoKey}>{k}</div>
              <div style={S.infoVal}>{v}</div>
            </div>
          ))}
        </div>

        {rows.some(r => r.fund.id === "car-pat") && (
          <div style={{ ...S.alert, ...S.alertA }}>
            ⚠ Carmignac Patrimoine (FR0010135103) — retiré de la liste prescrite le 24 mai 2026. Fonds à arbitrer avant la prochaine souscription. SRI 4/7 cohérent avec le profil ; la recommandation porte sur l'arbitrage vers Charlie Patrimoine 60/40 (SRI 3/7, frais −0,7 pt).
          </div>
        )}
      </div>

      {/* Couche investissement */}
      <div style={S.section}>
        <div style={{ ...S.sectionLabel, color: "#185fa5" }}>Couche 2 — Investissement</div>

        <div style={S.h2}>Analyse du portefeuille existant</div>
        <table style={S.table}>
          <thead>
            <tr>
              {["Fonds", "ISIN", "Allocation", "Montant", "SRI", "Perf. YTD", "Statut"].map(h => (
                <th key={h} style={S.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(r => {
              const isWarn = r.fund.id === "car-pat";
              return (
                <tr key={r.fundId}>
                  <td style={{ ...S.td, fontWeight: 600, color: C.ink }}>{r.fund.name}</td>
                  <td style={{ ...S.td, ...S.mono }}>{r.fund.isin}</td>
                  <td style={{ ...S.td, ...S.mono }}>{r.pct.toFixed(1)} %</td>
                  <td style={{ ...S.td, ...S.mono }}>{r.amount.toLocaleString("fr-FR")} €</td>
                  <td style={{ ...S.td, ...S.mono, color: parseInt(r.fund.srri) > profNum ? C.red : C.green }}>{r.fund.srri}/7</td>
                  <td style={{ ...S.td, ...S.mono, color: r.fund.ytd.startsWith("−") || r.fund.ytd.startsWith("-") ? C.red : C.green }}>{r.fund.ytd}</td>
                  <td style={{ ...S.td, fontSize: 10, color: isWarn ? C.red : C.green, fontWeight: 600 }}>{isWarn ? "⚠ À arbitrer" : "✓ OK"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div style={S.section}>
          <div style={S.h2}>Recommandation</div>
          {rows.some(r => r.fund.id === "car-pat") ? (
            <>
              <p style={S.p}>Arbitrage de Carmignac Patrimoine (FR0010135103) vers <b>Charlie Patrimoine 60/40 (FR0014006X12)</b> pour un montant de {rows.find(r => r.fund.id === "car-pat")?.amount.toLocaleString("fr-FR")} €.</p>
              <p style={S.p}>Justification : même niveau de risque cible (allocation 60/40), frais courants réduits de 1,5 % à 0,8 %, meilleure performance sur 3 ans (+18 % vs +6 %). Le remplacement améliore la qualité du portefeuille sans modifier le profil de risque global.</p>
            </>
          ) : (
            <p style={S.p}>Maintien de l'allocation actuelle. Aucune recommandation d'arbitrage identifiée à cette date. Prochain point de revue prévu dans 6 mois.</p>
          )}
        </div>

        <div style={S.h2}>Vérification de cohérence SRI</div>
        <table style={S.table}>
          <thead>
            <tr>
              {["Produit", "SRI produit", "Profil client", "Cohérence"].map(h => <th key={h} style={S.th}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map(r => {
              const ok = parseInt(r.fund.srri) <= profNum;
              return (
                <tr key={r.fundId}>
                  <td style={S.td}>{r.fund.name}</td>
                  <td style={{ ...S.td, ...S.mono }}>{r.fund.srri}/7</td>
                  <td style={{ ...S.td, ...S.mono }}>{profNum}/7</td>
                  <td style={{ ...S.td, color: ok ? C.green : C.red, fontWeight: 600, fontSize: 10 }}>{ok ? "✓ Conforme" : "⚠ À justifier"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Déclaration formelle */}
      <div style={S.section}>
        <div style={S.sectionLabel}>Déclaration d'adéquation formelle</div>
        <div style={S.decl}>
          À l'issue de l'analyse du profil de {client.name} et de la situation de son portefeuille au 30 mai 2026, je soussigné(e) Camille Vasseur, conseiller(e) en gestion de patrimoine, certifie que la ou les recommandation(s) formulée(s) dans le présent document sont adéquates au profil de risque déclaré ({profNum}/7 — {client.profile}), à l'horizon de placement ({client.horizon}) et aux objectifs d'investissement de l'investisseur. Le SRI moyen pondéré du portefeuille résultant ({sri.toFixed(1)}/7) est {adequate ? "inférieur" : "supérieur"} au profil client, ce qui {adequate ? "valide" : "nécessite une justification complémentaire de"} l'adéquation. Les produits recommandés ont fait l'objet d'une remise de leurs DCI/DICI à jour avant toute souscription.
        </div>
      </div>

      {/* Avertissements */}
      <div style={S.section}>
        <div style={S.sectionLabel}>Avertissements réglementaires</div>
        <div style={{ ...S.small, lineHeight: 1.65 }}>
          Les performances passées ne constituent pas une garantie des performances futures. La valeur des investissements peut fluctuer à la hausse comme à la baisse. Le capital investi n'est pas garanti. Les informations contenues dans ce document sont établies sur la base des données disponibles à la date d'émission et sont susceptibles d'évoluer. Ce document est destiné exclusivement à {client.name} et ne constitue pas un démarchage financier. Conformément à MIF II, ce rapport doit être conservé par le cabinet pendant une durée minimale de 5 ans.
        </div>
      </div>

      <div style={S.footer}>
        <div>
          <div style={S.footLabel}>Signature du CGP</div>
          <div style={S.footVal}>Camille Vasseur</div>
          <div style={S.footVal}>Charlie Conseil — N° ORIAS 22XXXXXX</div>
          <div style={S.sigLine}>Date de signature : 30 mai 2026</div>
        </div>
        <div>
          <div style={S.footLabel}>Accusé de réception client</div>
          <div style={S.footVal}>{client.name}</div>
          <div style={S.sigLine}>Signature :</div>
        </div>
      </div>
    </DocHeader>
  );
}

/* ─── 2. RAPPORT DE PERFORMANCE ─────────────────────────────── */
function DocPerformance({ client, period }: { client: Client; period: string }) {
  const rows = getPortfolioRows(client.id);
  const total = rows.reduce((s, r) => s + r.amount, 0);
  const ytdW = rows.reduce((s, r) => s + r.amount * parseFloat(r.fund.ytd.replace("+", "").replace(" %", "")), 0) / total;
  const ytdStr = (ytdW > 0 ? "+" : "") + ytdW.toFixed(1) + " %";
  const gainAbs = Math.round(total * ytdW / 100);
  const finalEncours = total + gainAbs;

  return (
    <DocHeader title={`Rapport de performance — ${period}`} client={client} ref="MIF II art. 25(6) — Relevé de portefeuille">
      <div style={{ ...S.alert, ...S.alertG }}>✓ Alerte −10 % MIF II — Non déclenchée. La valeur du portefeuille n'a pas subi de dépréciation ≥ 10 % depuis le dernier relevé de période.</div>

      <div style={S.kpiGrid}>
        <div style={S.kpiBox}><div style={S.kpiVal}>{ytdStr}</div><div style={S.kpiLbl}>Performance {period}</div></div>
        <div style={S.kpiBox}><div style={{ ...S.kpiVal, color: C.muted }}>+3,4 %</div><div style={S.kpiLbl}>Benchmark équilibré</div></div>
        <div style={S.kpiBox}><div style={{ ...S.kpiVal, color: C.green }}>+{(ytdW - 3.4).toFixed(1)} %</div><div style={S.kpiLbl}>Alpha généré</div></div>
        <div style={S.kpiBox}><div style={S.kpiVal}>{(finalEncours / 1000).toFixed(0)} k€</div><div style={S.kpiLbl}>Encours au {period === "1 an" ? "31/12/2025" : "31/03/2026"}</div></div>
      </div>

      <div style={S.section}>
        <div style={S.sectionLabel}>Composition et performance par ligne</div>
        <table style={S.table}>
          <thead>
            <tr>{["Fonds", "Allocation", "Encours départ", `Perf. ${period}`, "Contribution", "Encours final"].map(h => <th key={h} style={S.th}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map(r => {
              const perf = parseFloat(r.fund.ytd.replace("+", "").replace(" %", ""));
              const contrib = (r.pct / 100 * perf).toFixed(2);
              const final = Math.round(r.amount * (1 + perf / 100));
              const isNeg = perf < 0;
              return (
                <tr key={r.fundId}>
                  <td style={{ ...S.td, fontWeight: 600 }}>{r.fund.name}</td>
                  <td style={{ ...S.td, ...S.mono }}>{r.pct.toFixed(1)} %</td>
                  <td style={{ ...S.td, ...S.mono }}>{r.amount.toLocaleString("fr-FR")} €</td>
                  <td style={{ ...S.td, ...S.mono, color: isNeg ? C.red : C.green }}>{r.fund.ytd}</td>
                  <td style={{ ...S.td, ...S.mono, color: isNeg ? C.red : C.green }}>{isNeg ? "" : "+"}{contrib} %</td>
                  <td style={{ ...S.td, ...S.mono, fontWeight: 600 }}>{final.toLocaleString("fr-FR")} €</td>
                </tr>
              );
            })}
            <tr>
              <td colSpan={2} style={{ ...S.td, fontWeight: 700, color: C.ink }}>Total</td>
              <td style={{ ...S.td, ...S.mono, fontWeight: 700 }}>{total.toLocaleString("fr-FR")} €</td>
              <td style={{ ...S.td, ...S.mono, fontWeight: 700, color: C.green }}>{ytdStr}</td>
              <td style={{ ...S.td, ...S.mono, fontWeight: 700, color: C.green }}>{ytdStr}</td>
              <td style={{ ...S.td, ...S.mono, fontWeight: 700 }}>{finalEncours.toLocaleString("fr-FR")} €</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={S.section}>
        <div style={S.sectionLabel}>Répartition de l'allocation</div>
        {[
          { cat: "Actions thématiques ISR", pct: rows.filter(r => parseInt(r.fund.srri) >= 5).reduce((s, r) => s + r.pct, 0) },
          { cat: "Fonds patrimoniaux / équilibrés", pct: rows.filter(r => parseInt(r.fund.srri) === 3 || parseInt(r.fund.srri) === 4).reduce((s, r) => s + r.pct, 0) },
          { cat: "Obligataire crédit", pct: rows.filter(r => parseInt(r.fund.srri) === 2).reduce((s, r) => s + r.pct, 0) },
          { cat: "Monétaire / liquidités", pct: rows.filter(r => parseInt(r.fund.srri) === 1).reduce((s, r) => s + r.pct, 0) },
        ].filter(c => c.pct > 0).map(c => (
          <div key={c.cat} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <span style={{ fontSize: 11, color: C.ink2, width: 220 }}>{c.cat}</span>
            <div style={{ flex: 1, height: 6, background: C.bg, borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${c.pct}%`, background: C.accent, borderRadius: 3 }} />
            </div>
            <span style={{ ...S.mono, width: 42, textAlign: "right" as const, color: C.ink }}>{c.pct.toFixed(1)} %</span>
          </div>
        ))}
      </div>

      {rows.some(r => r.fund.id === "car-pat") && (
        <div style={S.section}>
          <div style={S.sectionLabel}>Opérations effectuées sur la période</div>
          <table style={S.table}>
            <thead><tr>{["Date", "Nature", "Fonds cédé", "Fonds acquis", "Montant"].map(h => <th key={h} style={S.th}>{h}</th>)}</tr></thead>
            <tbody>
              <tr>
                <td style={{ ...S.td, ...S.mono }}>15/01/2026</td>
                <td style={S.td}>Arbitrage</td>
                <td style={{ ...S.td, color: C.red }}>Carmignac Patrimoine</td>
                <td style={{ ...S.td, color: C.green }}>Charlie Patrimoine 60/40</td>
                <td style={{ ...S.td, ...S.mono }}>19 680 €</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <div style={S.section}>
        <div style={S.sectionLabel}>Commentaire de marché</div>
        <p style={S.p}>La période analysée a été favorable aux portefeuilles équilibrés, portés par la résilience des marchés actions européens et la bonne tenue du segment crédit investment grade. Le portefeuille de {client.name} a bénéficié de sa diversification entre fonds patrimoniaux, actions thématiques ISR et poche obligataire courte.</p>
        <p style={{ ...S.p, marginBottom: 0 }}>L'arbitrage réalisé en janvier sur Carmignac Patrimoine, retiré de la liste prescrite suite à une sous-performance persistante, a permis d'éviter une contribution négative estimée à −0,3 % sur la période. La sélection Charlie Patrimoine 60/40 (SRI 3/7, frais 0,8 %) a contribué positivement à hauteur de {(26 * 6.4 / 100).toFixed(2)} % à la performance totale.</p>
      </div>

      <div style={{ ...S.footer, gridTemplateColumns: "1fr" }}>
        <div style={{ ...S.small, lineHeight: 1.65 }}>
          Ce rapport est établi conformément aux exigences de MIF II (art. 25(6)) sur les relevés périodiques. Les performances indiquées sont calculées sur la base des valorisations transmises par les dépositaires et sociétés de gestion. Document à conserver 5 ans — Camille Vasseur, Charlie Conseil, 30 mai 2026.
        </div>
      </div>
    </DocHeader>
  );
}

/* ─── 3. PROPOSITION D'INVESTISSEMENT ───────────────────────── */
function DocProposition({ client }: { client: Client }) {
  const rows = getPortfolioRows(client.id);
  const total = rows.reduce((s, r) => s + r.amount, 0);
  const isEquil = client.profile === "Équilibré";
  const profNum = isEquil ? 4 : client.profile === "Dynamique" ? 5 : client.profile === "Prudent" ? 2 : 3;

  const currentAlloc = [
    { label: "Fonds patrimoniaux (SRI 3–4)", pct: rows.filter(r => [3, 4].includes(parseInt(r.fund.srri))).reduce((s, r) => s + r.pct, 0) },
    { label: "Actions thématiques ISR (SRI 5–6)", pct: rows.filter(r => [5, 6].includes(parseInt(r.fund.srri))).reduce((s, r) => s + r.pct, 0) },
    { label: "Obligataire crédit (SRI 2)", pct: rows.filter(r => parseInt(r.fund.srri) === 2).reduce((s, r) => s + r.pct, 0) },
    { label: "Monétaire (SRI 1)", pct: rows.filter(r => parseInt(r.fund.srri) === 1).reduce((s, r) => s + r.pct, 0) },
  ];
  const targetAlloc = [
    { label: "Fonds patrimoniaux (SRI 3–4)", pct: 40 },
    { label: "Actions thématiques ISR (SRI 5–6)", pct: 30 },
    { label: "Obligataire crédit (SRI 2)", pct: 20 },
    { label: "Monétaire (SRI 1)", pct: 10 },
  ];

  return (
    <DocHeader title="Proposition d'investissement — Allocation stratégique" client={client} ref="Fondée sur le rapport d'adéquation du 30 mai 2026">
      <div style={{ ...S.alert, ...S.alertA }}>
        Problématique identifiée : Votre allocation présente une surexposition à Carmignac Patrimoine (−3,2 % YTD, retiré de liste prescrite) et un léger dépassement du SRI cible sur la poche actions thématiques. La proposition ci-dessous vise à corriger ces deux points.
      </div>

      {/* Ancrage client */}
      <div style={S.section}>
        <div style={S.sectionLabel}>Partie 1 — Ancrage client</div>
        <div style={S.infoGrid}>
          {[
            ["Client", client.name],
            ["Profil de risque", `${profNum}/7 — ${client.profile}`],
            ["Encours total", client.encours],
            ["Horizon", client.horizon],
            ["Objectif principal", "Constitution d'un capital retraite"],
            ["Optimisation visée", "Qualité de sélection + réduction des frais"],
          ].map(([k, v]) => (
            <div key={k} style={S.infoRow}>
              <div style={S.infoKey}>{k}</div>
              <div style={S.infoVal}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Allocation actuelle vs cible */}
      <div style={S.section}>
        <div style={S.sectionLabel}>Partie 2 — Allocation actuelle vs cible</div>
        <table style={S.table}>
          <thead><tr>{["Classe d'actifs", "Actuelle", "Cible", "Mouvement"].map(h => <th key={h} style={S.th}>{h}</th>)}</tr></thead>
          <tbody>
            {currentAlloc.map((c, i) => {
              const target = targetAlloc[i].pct;
              const delta = target - c.pct;
              return (
                <tr key={c.label}>
                  <td style={S.td}>{c.label}</td>
                  <td style={{ ...S.td, ...S.mono }}>{c.pct.toFixed(1)} %</td>
                  <td style={{ ...S.td, ...S.mono }}>{target.toFixed(1)} %</td>
                  <td style={{ ...S.td, ...S.mono, color: delta > 0 ? C.green : delta < 0 ? C.red : C.muted, fontWeight: 600 }}>
                    {delta > 0 ? "+" : ""}{delta.toFixed(1)} %
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Sélection des produits */}
      <div style={S.section}>
        <div style={S.sectionLabel}>Partie 3 — Fonds recommandés</div>
        <table style={S.table}>
          <thead><tr>{["Fonds", "ISIN", "SRI", "Frais", "Enveloppe", "Montant conseillé"].map(h => <th key={h} style={S.th}>{h}</th>)}</tr></thead>
          <tbody>
            <tr>
              <td style={{ ...S.td, fontWeight: 600, color: C.green }}>Charlie Patrimoine 60/40 ↑</td>
              <td style={{ ...S.td, ...S.mono }}>FR0014006X12</td>
              <td style={{ ...S.td, ...S.mono }}>3/7</td>
              <td style={{ ...S.td, ...S.mono }}>0,8 %</td>
              <td style={S.td}>AV Generali</td>
              <td style={{ ...S.td, ...S.mono, fontWeight: 600 }}>+19 680 €</td>
            </tr>
            <tr>
              <td style={{ ...S.td, fontWeight: 600, color: C.red }}>Carmignac Patrimoine ↓</td>
              <td style={{ ...S.td, ...S.mono }}>FR0010135103</td>
              <td style={{ ...S.td, ...S.mono }}>4/7</td>
              <td style={{ ...S.td, ...S.mono }}>1,5 %</td>
              <td style={S.td}>AV Generali</td>
              <td style={{ ...S.td, ...S.mono, fontWeight: 600, color: C.red }}>−19 680 € (sortie)</td>
            </tr>
            {rows.filter(r => r.fund.id !== "car-pat").slice(0, 3).map(r => (
              <tr key={r.fundId}>
                <td style={{ ...S.td, color: C.muted }}>→ Maintenu — {r.fund.name}</td>
                <td style={{ ...S.td, ...S.mono, color: C.muted }}>{r.fund.isin}</td>
                <td style={{ ...S.td, ...S.mono, color: C.muted }}>{r.fund.srri}/7</td>
                <td style={{ ...S.td, ...S.mono, color: C.muted }}>{r.fund.frais}</td>
                <td style={{ ...S.td, color: C.muted }}>AV</td>
                <td style={{ ...S.td, color: C.muted }}>— (inchangé)</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Projections */}
      <div style={S.section}>
        <div style={S.sectionLabel}>Partie 4 — Projections (scénarios indicatifs)</div>
        <table style={S.table}>
          <thead><tr>{["Scénario", "Rendement annuel estimé", "Capital à 5 ans", "Capital à 10 ans"].map(h => <th key={h} style={S.th}>{h}</th>)}</tr></thead>
          <tbody>
            {[
              { s: "Défavorable", r: "−1,0 %", v5: Math.round(total * Math.pow(0.99, 5)), v10: Math.round(total * Math.pow(0.99, 10)) },
              { s: "Modéré", r: "+4,5 %", v5: Math.round(total * Math.pow(1.045, 5)), v10: Math.round(total * Math.pow(1.045, 10)) },
              { s: "Favorable", r: "+8,0 %", v5: Math.round(total * Math.pow(1.08, 5)), v10: Math.round(total * Math.pow(1.08, 10)) },
            ].map(({ s, r, v5, v10 }) => (
              <tr key={s}>
                <td style={{ ...S.td, fontWeight: 600 }}>{s}</td>
                <td style={{ ...S.td, ...S.mono }}>{r}</td>
                <td style={{ ...S.td, ...S.mono }}>{v5.toLocaleString("fr-FR")} €</td>
                <td style={{ ...S.td, ...S.mono, fontWeight: 600 }}>{v10.toLocaleString("fr-FR")} €</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ ...S.small, marginTop: 6 }}>Les projections sont indicatives et fondées sur des hypothèses de marché. Elles ne constituent pas une garantie de performance. Les performances passées ne préjugent pas des performances futures.</div>
      </div>

      {/* Plan d'action */}
      <div style={S.section}>
        <div style={S.sectionLabel}>Partie 5 — Plan d'action</div>
        {[
          { n: 1, action: "Arbitrage Carmignac Patrimoine → Charlie Patrimoine 60/40", montant: "19 680 €", delai: "J+3 ouvrés" },
          { n: 2, action: "Prochain point de revue prévu", montant: "—", delai: "Dans 6 mois" },
        ].map(({ n, action, montant, delai }) => (
          <div key={n} style={{ display: "flex", gap: 12, padding: "8px 0", borderBottom: `1px solid ${C.border}`, alignItems: "flex-start" }}>
            <span style={{ width: 22, height: 22, borderRadius: "50%", background: C.bg, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, flexShrink: 0, color: C.muted }}>{n}</span>
            <span style={{ flex: 1, fontSize: 11, color: C.ink }}>{action}</span>
            <span style={{ ...S.mono, color: C.accent }}>{montant}</span>
            <span style={{ fontSize: 10, color: C.muted, minWidth: 80, textAlign: "right" as const }}>{delai}</span>
          </div>
        ))}
      </div>

      <div style={{ ...S.footer, gridTemplateColumns: "1fr" }}>
        <div style={{ ...S.small, lineHeight: 1.65 }}>
          Cette proposition s'appuie sur le rapport d'adéquation établi à la même date. Elle ne peut être mise en œuvre qu'après signature du rapport d'adéquation correspondant. Camille Vasseur — Charlie Conseil — 30 mai 2026.
        </div>
      </div>
    </DocHeader>
  );
}

/* ─── 4. TRAÇABILITÉ DCI / DICI ─────────────────────────────── */
function DocDici({ client }: { client: Client }) {
  const rows = getPortfolioRows(client.id);
  const currentYear = 2026;
  const diciData = rows.map((r, i) => ({
    name: r.fund.name,
    isin: r.fund.isin,
    house: r.fund.house,
    sri: r.fund.srri,
    ogc: r.fund.frais,
    version: i === 1 ? String(currentYear - 1) : String(currentYear),
    status: i === 1 ? "⚠ Périmé" : "✓ À jour",
    remise: i === 1 ? "— En attente" : "30/05/2026",
    ok: i !== 1,
  }));
  const alertCount = diciData.filter(d => !d.ok).length;

  return (
    <DocHeader title="Traçabilité DCI / DICI — Preuve de remise" client={client} ref="PRIIPs · MIF II · OPCVM IV — Archivage 5 ans">
      <div style={S.kpiGrid}>
        <div style={S.kpiBox}><div style={S.kpiVal}>{rows.length}</div><div style={S.kpiLbl}>Lignes en portefeuille</div></div>
        <div style={S.kpiBox}><div style={{ ...S.kpiVal, color: C.green }}>{diciData.filter(d => d.ok).length}</div><div style={S.kpiLbl}>DCI à jour ({currentYear})</div></div>
        <div style={S.kpiBox}><div style={{ ...S.kpiVal, color: alertCount > 0 ? C.red : C.green }}>{alertCount}</div><div style={S.kpiLbl}>Alerte(s) version périmée</div></div>
        <div style={S.kpiBox}><div style={S.kpiVal}>5 ans</div><div style={S.kpiLbl}>Durée d'archivage MIF II</div></div>
      </div>

      {alertCount > 0 && (
        <div style={{ ...S.alert, ...S.alertR }}>
          ⚠ Action requise : {alertCount} DCI/DICI en version {currentYear - 1} détecté(s). La remise d'une version périmée avant souscription constitue une infraction réglementaire susceptible d'être relevée en contrôle AMF. Mettre à jour avant toute nouvelle souscription sur les fonds concernés.
        </div>
      )}

      <div style={S.section}>
        <div style={S.sectionLabel}>Registre des DCI / DICI par ligne de portefeuille</div>
        <table style={S.table}>
          <thead>
            <tr>{["Fonds", "ISIN", "Société de gestion", "SRI", "OGC", "Version", "Date de remise", "Statut"].map(h => <th key={h} style={S.th}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {diciData.map((d) => (
              <tr key={d.isin}>
                <td style={{ ...S.td, fontWeight: 600 }}>{d.name}</td>
                <td style={{ ...S.td, ...S.mono, fontSize: 10 }}>{d.isin}</td>
                <td style={{ ...S.td, fontSize: 10, color: C.ink2 }}>{d.house}</td>
                <td style={{ ...S.td, ...S.mono }}>{d.sri}/7</td>
                <td style={{ ...S.td, ...S.mono }}>{d.ogc}</td>
                <td style={{ ...S.td, ...S.mono, color: d.ok ? C.ink2 : C.red }}>{d.version}</td>
                <td style={{ ...S.td, ...S.mono, fontSize: 10 }}>{d.remise}</td>
                <td style={{ ...S.td, fontSize: 10, fontWeight: 700, color: d.ok ? C.green : C.red }}>{d.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={S.section}>
        <div style={S.sectionLabel}>Obligations du CGP (rappel réglementaire)</div>
        {[
          ["1", "Remise du DCI à jour", "Avant toute souscription, en version de l'année en cours. Remise physique ou électronique."],
          ["2", "Traçabilité de la remise", "Email avec PJ, signature électronique ou accusé de réception papier. Première demande en contrôle AMF."],
          ["3", "Archivage", "Minimum 5 ans (MIF II). Accessible en cas de contrôle AMF ou de litige client."],
          ["4", "Surveillance des mises à jour", "Annuelle — les sociétés de gestion publient des versions révisées chaque début d'année. SRI ou frais modifiés → information du client avant prochaine souscription."],
        ].map(([n, titre, detail]) => (
          <div key={n} style={{ display: "flex", gap: 12, padding: "8px 0", borderBottom: `1px solid ${C.border}` }}>
            <span style={{ width: 20, height: 20, borderRadius: "50%", background: C.bg, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, flexShrink: 0, color: C.muted }}>{n}</span>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: C.ink, marginBottom: 2 }}>{titre}</div>
              <div style={{ fontSize: 10.5, color: C.ink2, lineHeight: 1.55 }}>{detail}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ ...S.footer, gridTemplateColumns: "1fr" }}>
        <div style={{ ...S.small, lineHeight: 1.65 }}>
          Ce registre est maintenu par Charlie et mis à jour automatiquement à chaque scraping des DCI publiés par les sociétés de gestion. Dernière synchronisation : 30 mai 2026 à 08h12. Camille Vasseur — Charlie Conseil.
        </div>
      </div>
    </DocHeader>
  );
}

/* ─── 5. RAPPORT COÛTS & FRAIS MIF II ───────────────────────── */
function DocMif2({ client, year }: { client: Client; year: string }) {
  const rows = getPortfolioRows(client.id);
  const total = rows.reduce((s, r) => s + r.amount, 0);
  const ogcTotal = rows.reduce((s, r) => s + r.amount * parseFloat(r.fund.frais.replace(",", ".").replace(" %", "")) / 100, 0);
  const retro = Math.round(total * 0.003);
  const transac = Math.round(total * 0.0005);
  const totalFrais = ogcTotal + retro + transac;
  const totalPct = (totalFrais / total * 100).toFixed(2);

  return (
    <DocHeader title={`Rapport annuel coûts et frais — MIF II · ${year}`} client={client} ref="MIF II art. 24(4) + Délégué (UE) 2017/565 — Avant le 31 janvier">
      <div style={{ ...S.alert, ...S.alertA }}>
        Ce rapport vous informe du coût total de votre relation de conseil et des produits que vous détenez pour l'année {year}. Les montants sont exprimés en euros et en pourcentage de l'encours moyen. Conformément à MIF II, votre conseiller est tenu de vous communiquer ce document chaque année.
      </div>

      <div style={S.kpiGrid}>
        <div style={S.kpiBox}><div style={S.kpiVal}>{Math.round(totalFrais).toLocaleString("fr-FR")} €</div><div style={S.kpiLbl}>Total frais {year}</div></div>
        <div style={S.kpiBox}><div style={{ ...S.kpiVal, color: C.muted }}>{totalPct} %</div><div style={S.kpiLbl}>En % de l'encours</div></div>
        <div style={S.kpiBox}><div style={S.kpiVal}>{client.encours}</div><div style={S.kpiLbl}>Encours moyen {year}</div></div>
        <div style={S.kpiBox}><div style={{ ...S.kpiVal, color: C.red }}>−{totalPct} %</div><div style={S.kpiLbl}>Impact sur la performance</div></div>
      </div>

      {/* Catégorie 1 — Frais conseil */}
      <div style={S.section}>
        <div style={{ ...S.sectionLabel, color: C.red }}>Catégorie 1 — Frais liés au service de conseil</div>
        <table style={S.table}>
          <thead><tr>{["Nature", "Montant", "En %"].map(h => <th key={h} style={S.th}>{h}</th>)}</tr></thead>
          <tbody>
            <tr>
              <td style={S.td}>Honoraires de conseil directs</td>
              <td style={{ ...S.td, ...S.mono }}>0 €</td>
              <td style={{ ...S.td, ...S.mono }}>0,00 %</td>
            </tr>
            <tr>
              <td style={S.td}>Rétrocessions de commissions perçues par le CGP</td>
              <td style={{ ...S.td, ...S.mono, fontWeight: 600 }}>{retro.toLocaleString("fr-FR")} €</td>
              <td style={{ ...S.td, ...S.mono, fontWeight: 600 }}>0,30 %</td>
            </tr>
            <tr>
              <td style={{ ...S.td, fontWeight: 700 }}>Total frais de conseil</td>
              <td style={{ ...S.td, ...S.mono, fontWeight: 700 }}>{retro.toLocaleString("fr-FR")} €</td>
              <td style={{ ...S.td, ...S.mono, fontWeight: 700 }}>0,30 %</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Catégorie 2 — Frais produits */}
      <div style={S.section}>
        <div style={{ ...S.sectionLabel, color: C.red }}>Catégorie 2 — Frais liés aux produits (OGC / TER)</div>
        <table style={S.table}>
          <thead><tr>{["Fonds", "Encours moyen", "OGC annuel", "Frais en €"].map(h => <th key={h} style={S.th}>{h}</th>)}</tr></thead>
          <tbody>
            {rows.map(r => {
              const ogc = parseFloat(r.fund.frais.replace(",", ".").replace(" %", ""));
              const fraisE = Math.round(r.amount * ogc / 100);
              return (
                <tr key={r.fundId}>
                  <td style={S.td}>{r.fund.name}</td>
                  <td style={{ ...S.td, ...S.mono }}>{r.amount.toLocaleString("fr-FR")} €</td>
                  <td style={{ ...S.td, ...S.mono }}>{r.fund.frais}</td>
                  <td style={{ ...S.td, ...S.mono, fontWeight: 600 }}>{fraisE.toLocaleString("fr-FR")} €</td>
                </tr>
              );
            })}
            <tr>
              <td style={{ ...S.td, fontWeight: 700 }}>Total frais produits</td>
              <td style={{ ...S.td, ...S.mono, fontWeight: 700 }}>{total.toLocaleString("fr-FR")} €</td>
              <td style={{ ...S.td, ...S.mono, fontWeight: 700 }}>{(ogcTotal / total * 100).toFixed(2)} %</td>
              <td style={{ ...S.td, ...S.mono, fontWeight: 700 }}>{Math.round(ogcTotal).toLocaleString("fr-FR")} €</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Catégorie 3 — Frais transactions */}
      <div style={S.section}>
        <div style={{ ...S.sectionLabel, color: C.red }}>Catégorie 3 — Frais liés aux transactions</div>
        <table style={S.table}>
          <thead><tr>{["Nature", "Montant", "En %"].map(h => <th key={h} style={S.th}>{h}</th>)}</tr></thead>
          <tbody>
            <tr><td style={S.td}>Frais d'arbitrage</td><td style={{ ...S.td, ...S.mono }}>{transac.toLocaleString("fr-FR")} €</td><td style={{ ...S.td, ...S.mono }}>0,05 %</td></tr>
            <tr><td style={{ ...S.td, fontWeight: 700 }}>Total frais de transaction</td><td style={{ ...S.td, ...S.mono, fontWeight: 700 }}>{transac.toLocaleString("fr-FR")} €</td><td style={{ ...S.td, ...S.mono, fontWeight: 700 }}>0,05 %</td></tr>
          </tbody>
        </table>
      </div>

      {/* Récapitulatif */}
      <div style={S.section}>
        <div style={S.sectionLabel}>Récapitulatif consolidé obligatoire</div>
        <table style={S.table}>
          <thead><tr>{["Catégorie", "Montant en €", "En % encours"].map(h => <th key={h} style={S.th}>{h}</th>)}</tr></thead>
          <tbody>
            <tr><td style={S.td}>Frais de conseil</td><td style={{ ...S.td, ...S.mono }}>{retro.toLocaleString("fr-FR")} €</td><td style={{ ...S.td, ...S.mono }}>0,30 %</td></tr>
            <tr><td style={S.td}>Frais produits (OGC)</td><td style={{ ...S.td, ...S.mono }}>{Math.round(ogcTotal).toLocaleString("fr-FR")} €</td><td style={{ ...S.td, ...S.mono }}>{(ogcTotal / total * 100).toFixed(2)} %</td></tr>
            <tr><td style={S.td}>Frais de transaction</td><td style={{ ...S.td, ...S.mono }}>{transac.toLocaleString("fr-FR")} €</td><td style={{ ...S.td, ...S.mono }}>0,05 %</td></tr>
            <tr style={{ background: C.bg }}>
              <td style={{ ...S.td, fontWeight: 700, color: C.ink }}>TOTAL FRAIS {year}</td>
              <td style={{ ...S.td, ...S.mono, fontWeight: 700, color: C.accent, fontSize: 14 }}>{Math.round(totalFrais).toLocaleString("fr-FR")} €</td>
              <td style={{ ...S.td, ...S.mono, fontWeight: 700, color: C.accent, fontSize: 14 }}>{totalPct} %</td>
            </tr>
          </tbody>
        </table>
        <div style={{ ...S.decl, marginTop: 12 }}>
          Ces frais ont réduit votre rendement annuel estimé de {totalPct} %, soit {Math.round(totalFrais).toLocaleString("fr-FR")} € sur l'année {year}. En l'absence de ces frais, votre encours aurait été supérieur de ce montant. Votre conseiller perçoit {retro.toLocaleString("fr-FR")} € de rétrocessions de la part des sociétés de gestion et assureurs au titre de la relation commerciale.
        </div>
      </div>

      <div style={{ ...S.footer, gridTemplateColumns: "1fr" }}>
        <div style={{ ...S.small, lineHeight: 1.65 }}>
          Ce rapport est établi conformément à l'article 24(4) de MIF II et au Règlement Délégué (UE) 2017/565. Il doit être transmis au plus tard le 31 janvier de l'année suivante. À conserver 5 ans. Camille Vasseur — Charlie Conseil — 30 mai 2026.
        </div>
      </div>
    </DocHeader>
  );
}

/* ─── Export principal ───────────────────────────────────────── */
export function DocViewer({ template, client, sections, period }: {
  template: Template;
  client: Client;
  sections: string[];
  period: string;
}) {
  const year = period.match(/\d{4}/)?.[0] ?? "2025";
  void sections;
  switch (template.id) {
    case "adequation":  return <DocAdequation client={client} />;
    case "perf":        return <DocPerformance client={client} period={period} />;
    case "proposition": return <DocProposition client={client} />;
    case "dici":        return <DocDici client={client} />;
    case "mif2":        return <DocMif2 client={client} year={year} />;
    default:            return null;
  }
}

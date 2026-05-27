# Fiche client — enrichissement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ajouter les lignes de portefeuille dans le Diagnostic, refaire le panneau de personnalisation Reporting, et créer deux nouveaux onglets (Signaux · Contact) dans la fiche client.

**Architecture:** Trois nouveaux fichiers de données dans `lib/data/` fournissent les holdings, signaux et historique de contacts par `clientId`. La page `app/diagnostic/page.tsx` reçoit deux nouveaux onglets et une section tableau dans `TabDiagnostic`. La page `app/reporting/page.tsx` voit son composant `ReportPreview` refondu avec de vrais contrôles de formulaire. Tout le CSS va dans `app/globals.css`.

**Tech Stack:** Next.js App Router, React hooks (useState), TypeScript, CSS modules-free (classes globales dans globals.css), composants existants Btn/Pill/Av/Ico/Sparkline.

---

## Fichiers modifiés / créés

| Fichier | Action |
|---|---|
| `lib/data/portfolio.ts` | Créer — holdings par clientId |
| `lib/data/signals.ts` | Créer — signaux personnels par clientId |
| `lib/data/contacts.ts` | Créer — historique contacts + prochain RDV |
| `components/kit/icons.tsx` | Modifier — ajouter `mail`, `phone`, `zap`, `checkCircle`, `calendar` |
| `app/diagnostic/page.tsx` | Modifier — PortfolioTable, TabSignaux, TabContact, 5 onglets |
| `app/reporting/page.tsx` | Modifier — ReportPreview refactoré |
| `app/globals.css` | Modifier — CSS pour tous les nouveaux composants |

---

## Task 1 : Créer `lib/data/portfolio.ts`

**Files:**
- Create: `lib/data/portfolio.ts`

- [ ] **Step 1 : Écrire le fichier**

```typescript
// lib/data/portfolio.ts
import { ALL_FUNDS, type Fund } from "./funds";

export interface Holding {
  fundId: string;
  pct: number;    // % du portefeuille (0-100)
  amount: number; // montant en euros
}

export interface HoldingRow extends Holding {
  fund: Fund;
}

export const CLIENT_PORTFOLIO: Record<string, Holding[]> = {
  durand: [
    { fundId: "ch-pat",    pct: 26.0, amount: 62400 },
    { fundId: "ch-obli",   pct: 18.6, amount: 44640 },
    { fundId: "dnca-euro", pct: 14.2, amount: 34080 },
    { fundId: "pic-env",   pct:  9.8, amount: 23520 },
    { fundId: "syc-pme",   pct:  9.8, amount: 23520 },
    { fundId: "ch-cash",   pct:  7.0, amount: 16800 },
    { fundId: "car-pat",   pct:  8.2, amount: 19680 },
    { fundId: "ech-major", pct:  6.4, amount: 15360 },
  ],
  vasseur: [
    { fundId: "ch-pm",     pct: 25.0, amount: 300000 },
    { fundId: "ch-isr",    pct: 20.0, amount: 240000 },
    { fundId: "ech-major", pct: 18.0, amount: 216000 },
    { fundId: "rco-mod",   pct: 15.0, amount: 180000 },
    { fundId: "ch-obli",   pct: 12.0, amount: 144000 },
    { fundId: "ch-cash",   pct: 10.0, amount: 120000 },
  ],
  latour: [
    { fundId: "ch-multi",  pct: 30.0, amount: 204000 },
    { fundId: "ch-obli",   pct: 25.0, amount: 170000 },
    { fundId: "rco-mod",   pct: 20.0, amount: 136000 },
    { fundId: "tik-inc",   pct: 15.0, amount: 102000 },
    { fundId: "ch-cash",   pct: 10.0, amount: 68000  },
  ],
  bertin: [
    { fundId: "ch-obli",   pct: 35.0, amount: 147000 },
    { fundId: "ch-pat",    pct: 30.0, amount: 126000 },
    { fundId: "dnca-euro", pct: 20.0, amount: 84000  },
    { fundId: "ch-cash",   pct: 15.0, amount: 63000  },
  ],
  nguyen: [
    { fundId: "ch-pat",    pct: 28.0, amount: 218400 },
    { fundId: "ch-isr",    pct: 22.0, amount: 171600 },
    { fundId: "pic-env",   pct: 15.0, amount: 117000 },
    { fundId: "ch-multi",  pct: 15.0, amount: 117000 },
    { fundId: "ch-obli",   pct: 12.0, amount: 93600  },
    { fundId: "ch-cash",   pct:  8.0, amount: 62400  },
  ],
  roche: [
    { fundId: "ch-pm",     pct: 30.0, amount: 1680000 },
    { fundId: "ch-isr",    pct: 20.0, amount: 1120000 },
    { fundId: "ch-pat",    pct: 15.0, amount: 840000  },
    { fundId: "sex-bond",  pct: 12.0, amount: 672000  },
    { fundId: "ch-multi",  pct: 12.0, amount: 672000  },
    { fundId: "ch-obli",   pct:  6.0, amount: 336000  },
    { fundId: "ch-cash",   pct:  5.0, amount: 280000  },
  ],
};

export function getPortfolioRows(clientId: string): HoldingRow[] {
  const holdings = CLIENT_PORTFOLIO[clientId] ?? [];
  return holdings
    .map(h => ({ ...h, fund: ALL_FUNDS.find(f => f.id === h.fundId)! }))
    .filter(r => r.fund != null)
    .sort((a, b) => b.amount - a.amount);
}

export function parseFeesPct(frais: string): number {
  return parseFloat(frais.replace(",", ".").replace(/[^0-9.]/g, ""));
}

export function getFundStatus(fundId: string): { cls: "critical" | "warn" | "ok"; label: string } {
  if (fundId === "car-pat") return { cls: "critical", label: "À arbitrer" };
  return { cls: "ok", label: "OK" };
}
```

- [ ] **Step 2 : Vérifier la compilation TypeScript**

```bash
cd "/Users/mathisbaala/Projects/charlie financial advisor/charlie-demo-b2b"
npx tsc --noEmit 2>&1 | head -20
```

Attendu : aucune erreur.

- [ ] **Step 3 : Commit**

```bash
git add lib/data/portfolio.ts
git commit -m "feat: add portfolio holdings data per client"
```

---

## Task 2 : Créer `lib/data/signals.ts`

**Files:**
- Create: `lib/data/signals.ts`

- [ ] **Step 1 : Écrire le fichier**

```typescript
// lib/data/signals.ts

export type SignalSeverity = "critical" | "warn" | "info" | "opportunity";

export interface Signal {
  id: string;
  severity: SignalSeverity;
  category: "Investissement" | "Réglementaire" | "Profil" | "Fiscal" | "Opportunité";
  title: string;
  description: string;
  actions: { label: string; variant: string }[];
}

export const CLIENT_SIGNALS: Record<string, Signal[]> = {
  durand: [
    {
      id: "carmignac-expo",
      severity: "critical",
      category: "Investissement",
      title: "Carmignac Patrimoine · sortie liste prescrite",
      description: "Exposition de 8,2 % du portefeuille sur un fonds retiré de la liste prescrite le 24 mai. Arbitrage à prioriser avant fin juin.",
      actions: [
        { label: "Préparer l'arbitrage", variant: "accent" },
        { label: "Voir l'alerte", variant: "ghost" },
      ],
    },
    {
      id: "liquidite-excess",
      severity: "warn",
      category: "Investissement",
      title: "Liquidité excédentaire · 12 % du portefeuille",
      description: "28 800 € en monétaire, au-dessus de la cible 5-8 % fixée en mandat. 10 k€ à réinvestir sur l'obligataire court terme.",
      actions: [
        { label: "Voir l'optimisation", variant: "accent" },
      ],
    },
    {
      id: "dda-renewal",
      severity: "warn",
      category: "Réglementaire",
      title: "DDA · renouvellement requis avant le 31 mai",
      description: "La fiche conseil DDA de M. Durand arrive à échéance dans 4 jours. Charlie a pré-rempli le document.",
      actions: [
        { label: "Générer la fiche", variant: "accent" },
        { label: "Voir le document", variant: "ghost" },
      ],
    },
    {
      id: "risk-profile-age",
      severity: "info",
      category: "Profil",
      title: "Profil de risque non mis à jour depuis 18 mois",
      description: "Le dernier questionnaire MIF II date de novembre 2024. Un entretien de révision est recommandé avant la prochaine revue semestrielle.",
      actions: [
        { label: "Planifier un entretien", variant: "accent" },
      ],
    },
    {
      id: "isr-ok",
      severity: "info",
      category: "Investissement",
      title: "Objectif ISR atteint · 71 % Article 8/9",
      description: "L'objectif de 70 % de fonds Article 8 ou 9 est atteint. Marge de progression sur la poche actions (actuellement 62 % ISR).",
      actions: [],
    },
    {
      id: "per-opportunity",
      severity: "opportunity",
      category: "Fiscal",
      title: "Plafond PER non utilisé · 5 200 € disponibles",
      description: "Enveloppe fiscale PER sous-utilisée. Un versement de 5 200 € génèrerait une déduction estimée à 1 820 € (TMI 35 %).",
      actions: [
        { label: "Simuler le versement", variant: "accent" },
      ],
    },
    {
      id: "av-anniversary",
      severity: "opportunity",
      category: "Opportunité",
      title: "Anniversaire 3 ans · AV Generali Privilège",
      description: "Le contrat atteint 3 ans le 12 juin. Fenêtre de rachat partiel avec abattement fiscal annuel de 4 600 € (célibataire).",
      actions: [
        { label: "Préparer le dossier", variant: "accent" },
      ],
    },
  ],
  vasseur: [
    {
      id: "priips-duc",
      severity: "warn",
      category: "Réglementaire",
      title: "PRIIPs · DIC à mettre à jour",
      description: "Le document d'informations clés du contrat AV Generali entre dans la fenêtre de mise à jour annuelle. Échéance dans 9 jours.",
      actions: [{ label: "Générer le DIC", variant: "accent" }],
    },
    {
      id: "pm-liquidity",
      severity: "info",
      category: "Investissement",
      title: "Private Markets · fenêtre de liquidité trimestrielle",
      description: "La prochaine fenêtre de rachat partiel sur Charlie Private Markets ouvre le 30 juin.",
      actions: [{ label: "Préparer la demande", variant: "accent" }],
    },
  ],
  latour: [
    {
      id: "versement-sci",
      severity: "critical",
      category: "Investissement",
      title: "Versement 25 k€ non alloué",
      description: "Un versement programmé de 25 000 € est arrivé le 24 mai sur le compartiment euros. À allouer selon le mandat d'investissement.",
      actions: [
        { label: "Proposer une allocation", variant: "accent" },
        { label: "Contacter la SCI", variant: "ghost" },
      ],
    },
  ],
  bertin: [
    {
      id: "horizon-court",
      severity: "info",
      category: "Profil",
      title: "Horizon 5 ans · revue de l'allocation prudente",
      description: "À 5 ans de l'horizon de retrait, l'allocation actuelle 35 % obligations est cohérente. Point de revue recommandé en septembre.",
      actions: [{ label: "Planifier la revue", variant: "accent" }],
    },
  ],
  nguyen: [
    {
      id: "isr-upgrade",
      severity: "opportunity",
      category: "Opportunité",
      title: "Passage Article 9 · opportunité sur la poche actions",
      description: "Charlie ISR Article 9 est disponible à des frais préférentiels. Remplacement d'un fonds Article 8 augmenterait le score ISR de 6 points.",
      actions: [{ label: "Voir la proposition", variant: "accent" }],
    },
  ],
  roche: [
    {
      id: "mif-review",
      severity: "warn",
      category: "Réglementaire",
      title: "MIF II · revue annuelle de l'univers fonds",
      description: "La revue annuelle de l'univers d'investissement doit être réalisée avant le 30 juin. Charlie a préparé une synthèse.",
      actions: [
        { label: "Ouvrir la revue", variant: "accent" },
        { label: "Programmer un comité", variant: "ghost" },
      ],
    },
    {
      id: "pm-allocation",
      severity: "opportunity",
      category: "Fiscal",
      title: "Non coté · enveloppe disponible 300 k€",
      description: "L'allocation cible prévoit 35 % sur les marchés privés. Exposition actuelle à 30 %, soit 280 k€ sous-alloués.",
      actions: [{ label: "Simuler l'allocation", variant: "accent" }],
    },
  ],
};
```

- [ ] **Step 2 : Vérifier la compilation**

```bash
cd "/Users/mathisbaala/Projects/charlie financial advisor/charlie-demo-b2b"
npx tsc --noEmit 2>&1 | head -20
```

Attendu : aucune erreur.

- [ ] **Step 3 : Commit**

```bash
git add lib/data/signals.ts
git commit -m "feat: add client signals data"
```

---

## Task 3 : Créer `lib/data/contacts.ts`

**Files:**
- Create: `lib/data/contacts.ts`

- [ ] **Step 1 : Écrire le fichier**

```typescript
// lib/data/contacts.ts

export type ContactType = "RDV" | "Email" | "Appel";

export interface ContactEntry {
  date: string;
  type: ContactType;
  duration?: string;
  topics: string[];
  notes: string;
}

export interface NextMeeting {
  date: string;
  time: string;
  points: string[];
}

export const CLIENT_CONTACTS: Record<string, ContactEntry[]> = {
  durand: [
    {
      date: "14 mai 2026",
      type: "Email",
      topics: ["Arbitrage", "Carmignac"],
      notes: "Proposition d'arbitrage Carmignac Patrimoine envoyée. Attente de réponse du client.",
    },
    {
      date: "2 mai 2026",
      type: "Appel",
      duration: "12 min",
      topics: ["Immobilier", "Allocation"],
      notes: "Discussion sur l'opportunité d'augmenter la poche immobilière. Client favorable, à approfondir lors du prochain RDV.",
    },
    {
      date: "14 février 2026",
      type: "RDV",
      duration: "1 h 15",
      topics: ["Bilan annuel", "PER", "ISR", "DDA"],
      notes: "Bilan annuel 2025. Client satisfait de la performance (+18 % sur 3 ans). Fort intérêt pour le PER. Fiche DDA signée en séance.",
    },
    {
      date: "8 novembre 2025",
      type: "RDV",
      duration: "45 min",
      topics: ["Rééquilibrage", "Obligations"],
      notes: "Rééquilibrage semestriel validé. Renforcement de la poche obligataire de +4 pts vers Charlie Obligataire Crédit Euro.",
    },
    {
      date: "3 septembre 2025",
      type: "Email",
      topics: ["PRIIPs", "Réglementaire"],
      notes: "Envoi du DIC Generali mis à jour. Signature via HelloSign reçue le 5 septembre.",
    },
    {
      date: "12 juin 2025",
      type: "Appel",
      duration: "8 min",
      topics: ["Marché", "Volatilité"],
      notes: "Appel de réassurance suite à la volatilité de juin. Client serein, pas d'action à prendre.",
    },
  ],
  vasseur: [
    {
      date: "20 mai 2026",
      type: "RDV",
      duration: "1 h 30",
      topics: ["Private Markets", "Succession", "ISR"],
      notes: "Point sur la poche non cotée. Discussion succession avec transmission aux enfants. Intérêt pour un mandat ISR Article 9.",
    },
    {
      date: "15 mars 2026",
      type: "Email",
      topics: ["PRIIPs", "DIC"],
      notes: "Envoi des DIC mis à jour pour le contrat AV Generali.",
    },
  ],
  latour: [
    {
      date: "24 mai 2026",
      type: "Appel",
      duration: "20 min",
      topics: ["Versement", "Allocation"],
      notes: "Versement 25 k€ arrivé. Discussion sur l'allocation. SCI souhaite renforcer l'obligataire.",
    },
  ],
  bertin: [],
  nguyen: [
    {
      date: "10 mai 2026",
      type: "RDV",
      duration: "1 h",
      topics: ["ISR", "Allocation", "Performance"],
      notes: "Client souhaite augmenter l'exposition ISR. Performance YTD +2,8 %, légèrement sous benchmark.",
    },
  ],
  roche: [
    {
      date: "22 mai 2026",
      type: "RDV",
      duration: "2 h",
      topics: ["Private Equity", "Fiscal", "MIF II"],
      notes: "Point trimestriel. Validation de la revue MIF II. Discussion fiscalité sur les rachats Private Markets à venir.",
    },
  ],
};

export const CLIENT_NEXT_MEETING: Record<string, NextMeeting> = {
  durand: {
    date: "Aujourd'hui",
    time: "9 h 30",
    points: [
      "Arbitrage Carmignac Patrimoine — proposition de remplacement",
      "Versement PER · enveloppe 5 200 € disponible",
      "Renouvellement fiche DDA avant le 31 mai",
      "Bilan performance YTD (+3,2 %)",
    ],
  },
  vasseur: {
    date: "3 juin 2026",
    time: "14 h 00",
    points: [
      "DIC PRIIPs AV Generali à valider et signer",
      "Fenêtre de liquidité Private Markets — décision de rachat partiel",
      "Projet mandat ISR Article 9 — chiffrage",
    ],
  },
  latour: {
    date: "28 mai 2026",
    time: "11 h 00",
    points: [
      "Allocation du versement 25 k€ — validation",
      "Point sur la performance du compartiment euros",
    ],
  },
  bertin: {
    date: "15 juin 2026",
    time: "10 h 00",
    points: [
      "Revue semestrielle de l'allocation prudente",
      "Horizon 5 ans — ajustement progressif vers le monétaire",
    ],
  },
  nguyen: {
    date: "10 juin 2026",
    time: "15 h 30",
    points: [
      "Proposition de passage Article 9 sur la poche actions",
      "Revue de la performance vs benchmark",
    ],
  },
  roche: {
    date: "5 juin 2026",
    time: "9 h 00",
    points: [
      "Validation revue MIF II — univers fonds",
      "Stratégie fiscale rachats Private Markets Q3",
      "Point sur le mandat de gestion globale",
    ],
  },
};
```

- [ ] **Step 2 : Vérifier la compilation**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Attendu : aucune erreur.

- [ ] **Step 3 : Commit**

```bash
git add lib/data/contacts.ts
git commit -m "feat: add contact history and next meeting data per client"
```

---

## Task 4 : Ajouter des icônes manquantes dans `components/kit/icons.tsx`

**Files:**
- Modify: `components/kit/icons.tsx`

- [ ] **Step 1 : Ajouter `mail`, `phone`, `zap`, `checkCircle`, `calendar` dans l'objet `Ico`**

Dans `components/kit/icons.tsx`, ajouter ces entrées à la fin de l'objet `Ico` (avant le `}`):

```typescript
  mail:        (p: {s?: number}) => <svg width={p.s||14} height={p.s||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 7l10 7 10-7" strokeLinejoin="round"/></svg>,
  phone:       (p: {s?: number}) => <svg width={p.s||14} height={p.s||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A18 18 0 013 6a2 2 0 012-2z" strokeLinejoin="round"/></svg>,
  zap:         (p: {s?: number}) => <svg width={p.s||14} height={p.s||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9z" strokeLinejoin="round"/></svg>,
  checkCircle: (p: {s?: number}) => <svg width={p.s||14} height={p.s||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  calendar:    (p: {s?: number}) => <svg width={p.s||14} height={p.s||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>,
  alertTri:    (p: {s?: number}) => <svg width={p.s||14} height={p.s||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 3L2 20h20z" strokeLinejoin="round"/><path d="M12 9v5M12 17h.01" strokeLinecap="round"/></svg>,
  message:     (p: {s?: number}) => <svg width={p.s||14} height={p.s||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeLinejoin="round"/></svg>,
```

- [ ] **Step 2 : Vérifier la compilation**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Attendu : aucune erreur.

- [ ] **Step 3 : Commit**

```bash
git add components/kit/icons.tsx
git commit -m "feat: add mail, phone, zap, checkCircle, calendar, alertTri, message icons"
```

---

## Task 5 : Ajouter `PortfolioTable` dans `TabDiagnostic` + CSS

**Files:**
- Modify: `app/diagnostic/page.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1 : Ajouter les imports nécessaires en haut de `app/diagnostic/page.tsx`**

Après la ligne `import { ClientPickerBtn } from "@/components/shell/chat-popup";`, ajouter :

```typescript
import { getPortfolioRows, getFundStatus, parseFeesPct } from "@/lib/data/portfolio";
```

- [ ] **Step 2 : Modifier la signature de `TabDiagnostic` pour accepter `clientId`**

Remplacer :
```typescript
function TabDiagnostic() {
```
Par :
```typescript
function TabDiagnostic({ clientId }: { clientId: string }) {
```

- [ ] **Step 3 : Ajouter le composant `PortfolioTable` juste avant la fonction `TabDiagnostic` (même fichier)**

```typescript
function PortfolioTable({ clientId }: { clientId: string }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const rows = getPortfolioRows(clientId);
  const totalAmount = rows.reduce((s, r) => s + r.amount, 0);
  const weightedFees = rows
    .reduce((s, r) => s + parseFeesPct(r.fund.frais) * (r.pct / 100), 0)
    .toFixed(2);

  return (
    <div className="card flush ptf-section">
      <div className="ptf-section-head">
        <h2 className="h-section">Lignes du portefeuille</h2>
        <span className="ptf-count">{rows.length} positions</span>
      </div>
      <div className="ptf-table">
        <div className="ptf-head">
          <span className="col-fund">Fonds</span>
          <span className="col-encours num">Encours</span>
          <span className="col-pct num">% ptf</span>
          <span className="col-ytd num">YTD</span>
          <span className="col-ar num">1 an</span>
          <span className="col-srri num">SRRI</span>
          <span className="col-frais num">Frais</span>
          <span className="col-esg">ESG</span>
          <span className="col-status">Statut</span>
        </div>

        {rows.map(r => {
          const st = getFundStatus(r.fundId);
          const isOpen = expanded === r.fundId;
          const ytdNeg = r.fund.ytd.startsWith("−") || r.fund.ytd.startsWith("-");
          return (
            <div key={r.fundId} className={`ptf-row-wrap ${st.cls === "critical" ? "row-warn" : ""}`}>
              <button
                className="ptf-row"
                onClick={() => setExpanded(isOpen ? null : r.fundId)}
                aria-expanded={isOpen}
              >
                <span className="col-fund">
                  <span className="ptf-house">{r.fund.house}</span>
                  <span className="ptf-name">{r.fund.name}</span>
                </span>
                <span className="col-encours num">{r.amount.toLocaleString("fr-FR")} €</span>
                <span className="col-pct num">{r.pct} %</span>
                <span className={`col-ytd num ${ytdNeg ? "c-warn" : "c-ok"}`}>{r.fund.ytd}</span>
                <span className="col-ar num">{r.fund.ar3}</span>
                <span className="col-srri num">{r.fund.srri}/7</span>
                <span className="col-frais num">{r.fund.frais}</span>
                <span className="col-esg">
                  <span className={`esg-badge ${r.fund.classification === "Article 9" ? "art9" : "art8"}`}>
                    {r.fund.classification}
                  </span>
                </span>
                <span className="col-status">
                  <span className={`ptf-status ${st.cls}`}>{st.label}</span>
                </span>
              </button>
              {isOpen && (
                <div className="ptf-expand">
                  <div className="ptf-expand-spark">
                    <Sparkline data={r.fund.spark.slice(0, 13)} h={38} color="var(--accent)" strokeWidth={1.4} responsive />
                  </div>
                  <div className="ptf-expand-body">
                    <p className="ptf-expand-desc">{r.fund.desclong}</p>
                    <div className="ptf-expand-stats">
                      <div><span className="lbl">Vol.</span><span>{r.fund.vol} %</span></div>
                      <div><span className="lbl">Max DD</span><span>{r.fund.dd}</span></div>
                      <div><span className="lbl">3 ans</span><span>{r.fund.ar3}</span></div>
                      <div><span className="lbl">5 ans</span><span>{r.fund.ar5}</span></div>
                      <div><span className="lbl">AUM</span><span>{r.fund.aum}</span></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        <div className="ptf-foot">
          <span className="col-fund">Total · {rows.length} positions</span>
          <span className="col-encours num">{totalAmount.toLocaleString("fr-FR")} €</span>
          <span className="col-pct num">100 %</span>
          <span className="col-ytd num" />
          <span className="col-ar num" />
          <span className="col-srri num" />
          <span className="col-frais num">~{weightedFees} %</span>
          <span className="col-esg" />
          <span className="col-status" />
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4 : Ajouter `<PortfolioTable clientId={clientId} />` à la fin du return de `TabDiagnostic`**

À la fin du JSX de `TabDiagnostic`, après la `div.diag-grid` fermante, ajouter :

```tsx
      <PortfolioTable clientId={clientId} />
```

- [ ] **Step 5 : Mettre à jour le render dans `DiagnosticPage` pour passer `clientId` à `TabDiagnostic`**

Remplacer :
```tsx
{tab === "diagnostic" && <TabDiagnostic />}
```
Par :
```tsx
{tab === "diagnostic" && <TabDiagnostic clientId={clientId} />}
```

- [ ] **Step 6 : Ajouter le CSS du tableau portefeuille dans `app/globals.css`**

Ajouter à la fin du fichier `app/globals.css` :

```css
/* ---------- Portefeuille table ---------- */
.ptf-section { overflow: hidden; }
.ptf-section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 22px 12px;
  border-bottom: 1px solid var(--line-soft);
}
.ptf-count { font-size: 12px; color: var(--muted); font-family: "DM Mono", monospace; }
.ptf-table { width: 100%; }

.ptf-head,
.ptf-row,
.ptf-foot {
  display: grid;
  grid-template-columns: 1fr 90px 60px 62px 62px 48px 62px 80px 80px;
  align-items: center;
  gap: 0;
  padding: 0 22px;
}
.ptf-head {
  padding-top: 8px;
  padding-bottom: 8px;
  background: var(--paper-2);
  font-size: 10.5px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--muted);
  font-weight: 500;
}
.ptf-head .num,
.ptf-row .num,
.ptf-foot .num { text-align: right; }

.ptf-row-wrap { border-bottom: 1px solid var(--line-soft); }
.ptf-row-wrap:last-of-type { border-bottom: none; }
.ptf-row-wrap.row-warn { background: oklch(0.97 0.025 75); }

.ptf-row {
  min-height: 46px;
  cursor: pointer;
  background: transparent;
  border: none;
  width: 100%;
  text-align: left;
  transition: background 100ms;
  font-family: inherit;
  font-size: 13px;
  color: var(--ink);
}
.ptf-row:hover { background: var(--paper-2); }
.ptf-row-wrap.row-warn .ptf-row:hover { background: oklch(0.94 0.04 75); }

.ptf-house { display: block; font-size: 10.5px; color: var(--muted); }
.ptf-name  { display: block; font-size: 13px; font-weight: 600; color: var(--ink); }

.ptf-row .c-ok   { color: var(--ok-ink); }
.ptf-row .c-warn { color: var(--warn-ink); }

.esg-badge {
  display: inline-block;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 500;
  white-space: nowrap;
}
.esg-badge.art9 { background: var(--ok-soft); color: var(--ok-ink); }
.esg-badge.art8 { background: var(--accent-soft); color: var(--accent-ink); }

.ptf-status {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 10.5px;
  font-weight: 500;
}
.ptf-status.ok       { background: var(--ok-soft); color: var(--ok-ink); }
.ptf-status.warn     { background: var(--warn-soft); color: var(--warn-ink); }
.ptf-status.critical { background: oklch(0.94 0.06 25); color: oklch(0.42 0.15 25); }

.ptf-expand {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 16px;
  padding: 12px 22px 14px;
  background: var(--paper-2);
  border-top: 1px solid var(--line-soft);
}
.ptf-expand-desc { font-size: 12px; color: var(--ink-2); line-height: 1.55; margin: 0 0 8px; }
.ptf-expand-stats {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
.ptf-expand-stats > div { display: flex; flex-direction: column; gap: 1px; }
.ptf-expand-stats .lbl { font-size: 10px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--muted); }
.ptf-expand-stats span:last-child { font-family: "DM Mono", monospace; font-size: 12px; color: var(--ink); }

.ptf-foot {
  background: var(--paper-2);
  border-top: 2px solid var(--line);
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--ink);
}
.ptf-foot .col-fund { font-size: 11.5px; font-weight: 600; }
.ptf-foot .col-encours { font-family: "DM Mono", monospace; font-size: 13px; }
```

- [ ] **Step 7 : Vérifier visuellement**

```bash
cd "/Users/mathisbaala/Projects/charlie financial advisor/charlie-demo-b2b"
npm run dev
```

Ouvrir `http://localhost:3000/diagnostic` — vérifier que le tableau portefeuille apparaît sous les cartes existantes, avec les lignes expandables.

- [ ] **Step 8 : Commit**

```bash
git add app/diagnostic/page.tsx app/globals.css
git commit -m "feat: add portfolio holdings table to diagnostic tab"
```

---

## Task 6 : Ajouter `TabSignaux` + CSS

**Files:**
- Modify: `app/diagnostic/page.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1 : Ajouter les imports pour les signaux**

En haut de `app/diagnostic/page.tsx`, après les imports existants :

```typescript
import { CLIENT_SIGNALS, type Signal } from "@/lib/data/signals";
import { ALERTES } from "@/lib/data/alerts";
```

- [ ] **Step 2 : Ajouter le composant `TabSignaux` dans `app/diagnostic/page.tsx`** (avant `DiagnosticPage`)

```typescript
const SEVERITY_META: Record<Signal["severity"], { label: string; cls: string; icon: React.ReactNode }> = {
  critical:    { label: "Critique",    cls: "sig-critical",    icon: <Ico.alertTri s={13} /> },
  warn:        { label: "Attention",   cls: "sig-warn",        icon: <Ico.alertTri s={13} /> },
  info:        { label: "Info",        cls: "sig-info",        icon: <Ico.checkCircle s={13} /> },
  opportunity: { label: "Opportunité", cls: "sig-opportunity", icon: <Ico.zap s={13} /> },
};

function TabSignaux({ clientId }: { clientId: string }) {
  const personalSignals = CLIENT_SIGNALS[clientId] ?? [];
  const linkedAlerts = ALERTES.filter(a =>
    a.clients.some(c => {
      const clientIdMap: Record<string, string> = {
        "MD": "durand", "MV": "vasseur", "SL": "latour",
        "MB": "bertin", "MN": "nguyen", "MR": "roche",
      };
      return clientIdMap[c.initials] === clientId;
    })
  );

  const critCount = personalSignals.filter(s => s.severity === "critical" || s.severity === "warn").length;

  return (
    <div>
      {linkedAlerts.length > 0 && (
        <div className="signals-block">
          <div className="signals-block-head">
            <span className="eb">Alertes cabinet · ce client</span>
            <Pill variant="warn">{linkedAlerts.length}</Pill>
          </div>
          {linkedAlerts.map(a => (
            <div key={a.id} className="sig-item sig-linked">
              <div className={`sig-sev-bar swatch-${a.swatch}`} />
              <div className="sig-body">
                <div className="sig-meta-line">
                  <Pill variant={a.catVariant}>{a.cat}</Pill>
                  <span className="sig-when">{a.when}</span>
                </div>
                <div className="sig-title">{a.title}</div>
                <div className="sig-desc">{a.sub}</div>
                <div className="sig-actions">
                  {a.actions.slice(0, 2).map(ac => (
                    <Btn key={ac.label} variant={ac.variant} size="sm">{ac.label}</Btn>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="signals-block">
        <div className="signals-block-head">
          <span className="eb">Signaux personnels</span>
          {critCount > 0 && <Pill variant="warn">{critCount} à traiter</Pill>}
        </div>
        {personalSignals.length === 0 && (
          <div className="sig-empty">Aucun signal actif pour ce client.</div>
        )}
        {personalSignals.map(s => {
          const meta = SEVERITY_META[s.severity];
          return (
            <div key={s.id} className={`sig-item ${meta.cls}`}>
              <div className="sig-sev-icon">{meta.icon}</div>
              <div className="sig-body">
                <div className="sig-meta-line">
                  <span className={`sig-sev-badge ${meta.cls}`}>{meta.label}</span>
                  <span className="sig-cat">{s.category}</span>
                </div>
                <div className="sig-title">{s.title}</div>
                <div className="sig-desc">{s.description}</div>
                {s.actions.length > 0 && (
                  <div className="sig-actions">
                    {s.actions.map(a => (
                      <Btn key={a.label} variant={a.variant} size="sm">{a.label}</Btn>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 3 : Mettre à jour la barre d'onglets dans `DiagnosticPage`**

Remplacer la section `<div className="tabs-bar">` et les renders conditionnels par :

```tsx
      <div className="tabs-bar">
        <div className="seg">
          <button className={`seg-btn ${tab === "diagnostic" ? "active" : ""}`} onClick={() => setTab("diagnostic")}>Diagnostic</button>
          <button className={`seg-btn ${tab === "optimisation" ? "active" : ""}`} onClick={() => setTab("optimisation")}>Optimisation</button>
          <button className={`seg-btn ${tab === "signaux" ? "active" : ""}`} onClick={() => setTab("signaux")}>
            Signaux
            {(CLIENT_SIGNALS[clientId] ?? []).filter(s => s.severity === "critical" || s.severity === "warn").length > 0 && (
              <span className="badge">{(CLIENT_SIGNALS[clientId] ?? []).filter(s => s.severity === "critical" || s.severity === "warn").length}</span>
            )}
          </button>
          <button className={`seg-btn ${tab === "documents" ? "active" : ""}`} onClick={() => setTab("documents")}>Documents</button>
          <button className={`seg-btn ${tab === "contact" ? "active" : ""}`} onClick={() => setTab("contact")}>Contact</button>
        </div>
      </div>

      {tab === "diagnostic" && <TabDiagnostic clientId={clientId} />}
      {tab === "optimisation" && <TabOptimisation />}
      {tab === "signaux" && <TabSignaux clientId={clientId} />}
      {tab === "documents" && <TabDocuments />}
      {tab === "contact" && <TabContact clientId={clientId} />}
```

Note: `TabContact` sera créé à la Task 7 — TypeScript va afficher une erreur temporaire, résolu par la tâche suivante.

- [ ] **Step 4 : Ajouter le CSS des signaux dans `app/globals.css`**

```css
/* ---------- Signaux ---------- */
.signals-block {
  margin-bottom: 24px;
}
.signals-block-head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}
.signals-block-head .eb {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--muted);
  font-weight: 600;
}
.sig-item {
  display: flex;
  gap: 14px;
  background: var(--paper);
  border: 1px solid var(--line-soft);
  border-radius: 12px;
  padding: 14px 16px;
  margin-bottom: 8px;
  align-items: flex-start;
}
.sig-item.sig-linked { border-left: 3px solid var(--warn); }
.sig-item.sig-critical { border-left: 3px solid oklch(0.55 0.17 25); }
.sig-item.sig-warn     { border-left: 3px solid var(--warn); }
.sig-item.sig-info     { border-left: 3px solid var(--chan-email); }
.sig-item.sig-opportunity { border-left: 3px solid var(--ok); }

.sig-sev-bar {
  width: 3px;
  border-radius: 999px;
  align-self: stretch;
  min-height: 24px;
}
.sig-sev-bar.swatch-warn   { background: var(--warn); }
.sig-sev-bar.swatch-accent { background: var(--accent); }
.sig-sev-bar.swatch-ok     { background: var(--ok); }

.sig-sev-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  flex-shrink: 0;
}
.sig-item.sig-critical .sig-sev-icon { background: oklch(0.93 0.05 25); color: oklch(0.42 0.15 25); }
.sig-item.sig-warn     .sig-sev-icon { background: var(--warn-soft); color: var(--warn-ink); }
.sig-item.sig-info     .sig-sev-icon { background: oklch(0.92 0.04 240); color: oklch(0.45 0.13 240); }
.sig-item.sig-opportunity .sig-sev-icon { background: var(--ok-soft); color: var(--ok-ink); }

.sig-body { flex: 1; min-width: 0; }
.sig-meta-line { display: flex; align-items: center; gap: 8px; margin-bottom: 5px; flex-wrap: wrap; }
.sig-when { font-size: 11px; color: var(--muted); }
.sig-cat  { font-size: 11px; color: var(--muted); }

.sig-sev-badge {
  display: inline-block;
  padding: 2px 7px;
  border-radius: 999px;
  font-size: 10.5px;
  font-weight: 600;
}
.sig-sev-badge.sig-critical    { background: oklch(0.93 0.05 25); color: oklch(0.42 0.15 25); }
.sig-sev-badge.sig-warn        { background: var(--warn-soft); color: var(--warn-ink); }
.sig-sev-badge.sig-info        { background: oklch(0.92 0.04 240); color: oklch(0.45 0.13 240); }
.sig-sev-badge.sig-opportunity { background: var(--ok-soft); color: var(--ok-ink); }

.sig-title { font-size: 13.5px; font-weight: 600; color: var(--ink); margin-bottom: 3px; }
.sig-desc  { font-size: 12.5px; color: var(--ink-2); line-height: 1.5; margin-bottom: 10px; }
.sig-actions { display: flex; gap: 6px; flex-wrap: wrap; }

.sig-empty { font-size: 13px; color: var(--muted); padding: 24px 0; text-align: center; }
```

- [ ] **Step 5 : Vérifier visuellement l'onglet Signaux**

```bash
npm run dev
```

Ouvrir `http://localhost:3000/diagnostic` — vérifier que l'onglet "Signaux" apparaît entre "Optimisation" et "Documents", avec le badge de comptage. Ne pas s'inquiéter si "Contact" crée une erreur TS temporaire.

---

## Task 7 : Ajouter `TabContact` + CSS

**Files:**
- Modify: `app/diagnostic/page.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1 : Ajouter les imports pour les contacts**

```typescript
import { CLIENT_CONTACTS, CLIENT_NEXT_MEETING, type ContactEntry, type ContactType } from "@/lib/data/contacts";
```

- [ ] **Step 2 : Ajouter le composant `TabContact`** (avant `DiagnosticPage`)

```typescript
const TYPE_META: Record<ContactType, { cls: string }> = {
  RDV:   { cls: "type-rdv" },
  Email: { cls: "type-email" },
  Appel: { cls: "type-appel" },
};

function TabContact({ clientId }: { clientId: string }) {
  const [composer, setComposer] = useState<"email" | "message" | null>(null);
  const [emailTo, setEmailTo] = useState("m.durand@email.fr");
  const [emailSubject, setEmailSubject] = useState("Suivi de votre portefeuille");
  const [emailBody, setEmailBody] = useState("");
  const [msgBody, setMsgBody] = useState("");
  const [points, setPoints] = useState<string[]>(
    CLIENT_NEXT_MEETING[clientId]?.points ?? []
  );
  const [toastVisible, setToastVisible] = useState(false);

  const entries = CLIENT_CONTACTS[clientId] ?? [];
  const next = CLIENT_NEXT_MEETING[clientId];

  const showToast = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  return (
    <div className="contact-layout">
      {/* Actions rapides */}
      <div className="contact-quick-actions">
        <button
          className={`contact-action-btn ${composer === "email" ? "active" : ""}`}
          onClick={() => setComposer(composer === "email" ? null : "email")}
        >
          <span className="action-ico"><Ico.mail s={16} /></span>
          <span>Email</span>
        </button>
        <button
          className={`contact-action-btn ${composer === "message" ? "active" : ""}`}
          onClick={() => setComposer(composer === "message" ? null : "message")}
        >
          <span className="action-ico"><Ico.message s={16} /></span>
          <span>Message</span>
        </button>
        <button className="contact-action-btn" onClick={() => { navigator.clipboard?.writeText("+33 6 12 34 56 78"); showToast(); }}>
          <span className="action-ico"><Ico.phone s={16} /></span>
          <span>Appel</span>
        </button>
      </div>

      {toastVisible && (
        <div className="contact-toast">Numéro copié · +33 6 12 34 56 78</div>
      )}

      {/* Composeur Email */}
      {composer === "email" && (
        <div className="contact-composer">
          <div className="composer-head">
            <span className="eb">Nouveau message</span>
            <button className="icon-btn" onClick={() => setComposer(null)}><Ico.x s={13} /></button>
          </div>
          <div className="composer-field">
            <label>À</label>
            <input value={emailTo} onChange={e => setEmailTo(e.target.value)} placeholder="email@client.fr" />
          </div>
          <div className="composer-field">
            <label>Objet</label>
            <input value={emailSubject} onChange={e => setEmailSubject(e.target.value)} />
          </div>
          <div className="composer-field stretch">
            <label>Message</label>
            <textarea rows={5} value={emailBody} onChange={e => setEmailBody(e.target.value)} placeholder="Bonjour M. Durand, …" />
          </div>
          <div className="composer-foot">
            <Btn variant="ghost" size="sm" onClick={() => setComposer(null)}>Annuler</Btn>
            <Btn variant="accent" size="sm" icon={<Ico.send s={13} />} onClick={() => { setComposer(null); showToast(); }}>Envoyer</Btn>
          </div>
        </div>
      )}

      {/* Composeur Message */}
      {composer === "message" && (
        <div className="contact-composer">
          <div className="composer-head">
            <span className="eb">Message court</span>
            <button className="icon-btn" onClick={() => setComposer(null)}><Ico.x s={13} /></button>
          </div>
          <div className="composer-field stretch">
            <label>Message</label>
            <textarea rows={3} value={msgBody} onChange={e => setMsgBody(e.target.value)} placeholder="Bonjour, …" maxLength={320} />
          </div>
          <div className="composer-foot">
            <span className="char-count">{msgBody.length}/320</span>
            <Btn variant="ghost" size="sm" onClick={() => setComposer(null)}>Annuler</Btn>
            <Btn variant="accent" size="sm" icon={<Ico.send s={13} />} onClick={() => { setComposer(null); showToast(); }}>Envoyer</Btn>
          </div>
        </div>
      )}

      <div className="contact-two-col">
        {/* Prochain RDV */}
        {next && (
          <div className="card card-pad contact-next-rdv">
            <div className="next-rdv-head">
              <span className="action-ico c-accent"><Ico.calendar s={14} /></span>
              <div>
                <div className="eb">Prochain rendez-vous</div>
                <div className="next-rdv-when">{next.date} · {next.time}</div>
              </div>
            </div>
            <div className="next-rdv-points">
              <span className="lbl-sm">Points à préparer</span>
              {points.map((pt, i) => (
                <div key={i} className="rdv-point-row">
                  <span className="rdv-dot" />
                  <input
                    className="rdv-point-input"
                    value={pt}
                    onChange={e => {
                      const next = [...points];
                      next[i] = e.target.value;
                      setPoints(next);
                    }}
                  />
                  <button className="icon-btn-xs" onClick={() => setPoints(points.filter((_, j) => j !== i))} aria-label="Supprimer">
                    <Ico.x s={11} />
                  </button>
                </div>
              ))}
              <button className="rdv-add-btn" onClick={() => setPoints([...points, ""])}>
                <Ico.plus s={11} /> Ajouter un point
              </button>
            </div>
            <div style={{ marginTop: 14 }}>
              <Btn variant="accent" size="sm" icon={<Ico.doc s={13} />} onClick={showToast}>Générer brief de RDV</Btn>
            </div>
          </div>
        )}

        {/* Historique */}
        <div className="card flush">
          <div className="ptf-section-head">
            <h2 className="h-section">Historique des échanges</h2>
          </div>
          {entries.length === 0 && (
            <div className="sig-empty">Aucun échange enregistré.</div>
          )}
          {entries.map((e, i) => (
            <div key={i} className="contact-entry">
              <div className="entry-date-col">
                <span className="entry-date">{e.date}</span>
                {e.duration && <span className="entry-dur">{e.duration}</span>}
              </div>
              <div className="entry-body">
                <div className="entry-head-row">
                  <span className={`entry-type-badge ${TYPE_META[e.type].cls}`}>{e.type}</span>
                  <div className="entry-topics">
                    {e.topics.map(t => <span key={t} className="topic-chip">{t}</span>)}
                  </div>
                </div>
                <p className="entry-notes">{e.notes}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3 : Ajouter le CSS de l'onglet Contact dans `app/globals.css`**

```css
/* ---------- Contact tab ---------- */
.contact-layout { display: flex; flex-direction: column; gap: 20px; }
.contact-quick-actions {
  display: flex;
  gap: 12px;
}
.contact-action-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 16px 12px;
  background: var(--paper);
  border: 1px solid var(--line-soft);
  border-radius: 12px;
  cursor: pointer;
  font-family: inherit;
  font-size: 13px;
  font-weight: 500;
  color: var(--ink-2);
  transition: all 100ms;
}
.contact-action-btn:hover { border-color: var(--line); background: var(--paper-2); color: var(--ink); }
.contact-action-btn.active { border-color: var(--accent); background: var(--accent-tint); color: var(--accent-ink); }
.contact-action-btn .action-ico {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px; height: 36px;
  border-radius: 10px;
  background: var(--paper-2);
}
.contact-action-btn.active .action-ico { background: var(--accent-soft); color: var(--accent-ink); }

.contact-toast {
  background: var(--ink);
  color: var(--paper);
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 13px;
  text-align: center;
  animation: fadeIn 150ms ease;
}
@keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; } }

.contact-composer {
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.composer-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.composer-field {
  display: grid;
  grid-template-columns: 52px 1fr;
  align-items: center;
  gap: 10px;
}
.composer-field.stretch { align-items: flex-start; }
.composer-field label { font-size: 12px; color: var(--muted); font-weight: 500; }
.composer-field input,
.composer-field textarea {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid var(--line-soft);
  border-radius: 8px;
  background: var(--paper-2);
  font-family: inherit;
  font-size: 13px;
  color: var(--ink);
  outline: none;
  resize: none;
}
.composer-field input:focus,
.composer-field textarea:focus { border-color: var(--accent); }
.composer-foot {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: flex-end;
}
.char-count { font-size: 11px; color: var(--muted); font-family: "DM Mono", monospace; margin-right: auto; }

.contact-two-col {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 20px;
  align-items: flex-start;
}

.contact-next-rdv { }
.next-rdv-head {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 16px;
}
.next-rdv-head .action-ico { background: var(--accent-soft); color: var(--accent-ink); width: 30px; height: 30px; border-radius: 8px; flex-shrink: 0; }
.next-rdv-head .c-accent { color: var(--accent-ink); }
.next-rdv-head .eb { font-size: 11px; text-transform: uppercase; letter-spacing: 0.07em; color: var(--muted); font-weight: 600; }
.next-rdv-when { font-size: 14px; font-weight: 600; color: var(--ink); margin-top: 1px; }

.next-rdv-points { display: flex; flex-direction: column; gap: 6px; margin-top: 4px; }
.lbl-sm { font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--muted); font-weight: 500; margin-bottom: 4px; }
.rdv-point-row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.rdv-dot { width: 5px; height: 5px; border-radius: 999px; background: var(--accent); flex-shrink: 0; }
.rdv-point-input {
  flex: 1;
  border: 1px solid transparent;
  background: transparent;
  font-family: inherit;
  font-size: 13px;
  color: var(--ink);
  padding: 3px 6px;
  border-radius: 6px;
  outline: none;
}
.rdv-point-input:focus { border-color: var(--line); background: var(--paper-2); }
.icon-btn-xs {
  width: 22px; height: 22px;
  border-radius: 6px;
  border: none;
  background: transparent;
  color: var(--muted);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  opacity: 0;
  transition: opacity 100ms;
}
.rdv-point-row:hover .icon-btn-xs { opacity: 1; }
.icon-btn-xs:hover { background: var(--paper-2); color: var(--warn-ink); }

.rdv-add-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: inherit;
  font-size: 12px;
  color: var(--accent-ink);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 6px;
  margin-top: 2px;
}
.rdv-add-btn:hover { background: var(--accent-soft); }

.contact-entry {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 16px;
  padding: 14px 22px;
  border-bottom: 1px solid var(--line-soft);
  align-items: flex-start;
}
.contact-entry:last-child { border-bottom: none; }
.entry-date-col { display: flex; flex-direction: column; gap: 2px; }
.entry-date { font-size: 11.5px; color: var(--ink-2); font-weight: 500; }
.entry-dur  { font-size: 11px; color: var(--muted); }
.entry-head-row { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; flex-wrap: wrap; }
.entry-type-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 10.5px;
  font-weight: 600;
}
.type-rdv   { background: var(--accent-soft); color: var(--accent-ink); }
.type-email { background: oklch(0.92 0.04 240); color: oklch(0.45 0.13 240); }
.type-appel { background: var(--ok-soft); color: var(--ok-ink); }
.entry-topics { display: flex; gap: 4px; flex-wrap: wrap; }
.topic-chip {
  display: inline-block;
  padding: 1px 7px;
  border-radius: 4px;
  font-size: 10.5px;
  background: var(--paper-3);
  color: var(--ink-2);
}
.entry-notes { font-size: 12.5px; color: var(--ink-2); line-height: 1.55; margin: 0; }

@media (max-width: 860px) {
  .contact-two-col { grid-template-columns: 1fr; }
}
```

- [ ] **Step 4 : Vérifier la compilation**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Attendu : aucune erreur TypeScript.

- [ ] **Step 5 : Vérifier visuellement**

```bash
npm run dev
```

Ouvrir `http://localhost:3000/diagnostic` — vérifier les 5 onglets, l'onglet Contact avec actions rapides, le composeur, le prochain RDV éditable et l'historique.

- [ ] **Step 6 : Commit**

```bash
git add app/diagnostic/page.tsx app/globals.css
git commit -m "feat: add Signaux and Contact tabs to client profile"
```

---

## Task 8 : Refaire `ReportPreview` dans `app/reporting/page.tsx` + CSS

**Files:**
- Modify: `app/reporting/page.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1 : Remplacer entièrement le composant `ReportPreview`**

Localiser la fonction `ReportPreview` dans `app/reporting/page.tsx` et la remplacer par :

```typescript
const THEME_OPTIONS = [
  { id: "neutral",   label: "Neutre",   bg: "oklch(0.55 0.012 60)",       headerBg: "oklch(0.22 0.012 60)",  headerTxt: "white" },
  { id: "accent",    label: "Charlie",  bg: "var(--accent)",               headerBg: "var(--accent)",         headerTxt: "white" },
  { id: "gold",      label: "Or",       bg: "oklch(0.72 0.14 85)",         headerBg: "oklch(0.62 0.14 85)",   headerTxt: "white" },
  { id: "green",     label: "ISR",      bg: "oklch(0.52 0.1 150)",         headerBg: "oklch(0.42 0.1 150)",   headerTxt: "white" },
  { id: "aubergine", label: "Premium",  bg: "oklch(0.42 0.1 300)",         headerBg: "oklch(0.32 0.1 300)",   headerTxt: "white" },
];

function ReportPreview({ template, client, onClose }: { template: Template; client: Client; onClose: () => void }) {
  const [tone, setTone] = useState("Synthétique");
  const [themeId, setThemeId] = useState("accent");
  const [cover, setCover] = useState(true);
  const [signature, setSignature] = useState(true);
  const [showGraphs, setShowGraphs] = useState(true);
  const [showAnnex, setShowAnnex] = useState(false);
  const [commentary, setCommentary] = useState("");
  const [recipient, setRecipient] = useState("m.durand@email.fr");
  const [ccList, setCcList] = useState<string[]>([]);
  const [dateFrom, setDateFrom] = useState("2026-01-01");
  const [dateTo, setDateTo] = useState("2026-03-31");
  const [sections, setSections] = useState<string[]>(
    Array.isArray(template.chips.default) ? template.chips.default : [template.chips.default]
  );

  const theme = THEME_OPTIONS.find(t => t.id === themeId) ?? THEME_OPTIONS[1];

  const toggleSection = (opt: string) => {
    if (!template.chips.multi) { setSections([opt]); return; }
    setSections(prev => prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt]);
  };

  const charlieRédige = () => {
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
        <span className="eyebrow">Couleurs & branding</span>
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
          {[
            { label: "Page de garde",        value: cover,      set: setCover },
            { label: "Signature CGP",        value: signature,  set: setSignature },
            { label: "Graphiques",           value: showGraphs, set: setShowGraphs },
            { label: "Annexes réglementaires", value: showAnnex,  set: setShowAnnex },
          ].map(({ label, value, set }) => (
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
          <span className="eyebrow">Commentaire d'introduction</span>
          <button className="charlie-draft-btn" onClick={charlieRédige}>✦ Charlie rédige</button>
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
            <input className="conf-input" value={recipient} onChange={e => setRecipient(e.target.value)} placeholder="email@client.fr" />
          </div>
        </div>
        {ccList.map((cc, i) => (
          <div key={i} className="conf-recipient-row" style={{ marginTop: 6 }}>
            <div className="conf-recipient-main">
              <span className="recipient-to-label" style={{ opacity: 0.5 }}>CC</span>
              <input
                className="conf-input"
                value={cc}
                onChange={e => { const next = [...ccList]; next[i] = e.target.value; setCcList(next); }}
                placeholder="cc@exemple.fr"
              />
            </div>
            <button className="icon-btn-xs" style={{ opacity: 1, color: "var(--muted)" }} onClick={() => setCcList(ccList.filter((_, j) => j !== i))}>
              <Ico.x s={11} />
            </button>
          </div>
        ))}
        {ccList.length < 3 && (
          <button className="rdv-add-btn" onClick={() => setCcList([...ccList, ""])}>
            <Ico.plus s={11} /> Ajouter un CC
          </button>
        )}
      </div>

      {/* Aperçu document */}
      <div className="report-preview-doc">
        <div className="preview-doc-header" style={{ background: theme.headerBg, color: theme.headerTxt }}>
          <div className="preview-doc-brand">charlie</div>
          <div className="preview-doc-title-block">
            <div className="preview-doc-title">{template.name}</div>
            <div className="preview-doc-sub">{client.name} · profil {client.profile}</div>
          </div>
        </div>
        <div style={{ padding: "16px 20px" }}>
          <div className="doc-stats">
            <div className="item"><div className="lbl">Encours</div><div className="v">240 k€</div></div>
            <div className="item"><div className="lbl">Période</div><div className="v" style={{ fontSize: 13 }}>{dateFrom.split("-").reverse().join("/")} → {dateTo.split("-").reverse().join("/")}</div></div>
            <div className="item"><div className="lbl">Score</div><div className="v">72/100</div></div>
          </div>
          {commentary.trim() && <p style={{ fontStyle: "italic", color: "var(--ink)", fontSize: "12px", lineHeight: 1.6, margin: "12px 0 0" }}>{commentary}</p>}
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
```

- [ ] **Step 2 : Ajouter le CSS du reporting refactoré dans `app/globals.css`**

```css
/* ---------- Reporting — panneau refactoré ---------- */
.conf-label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}
.charlie-draft-btn {
  font-size: 11.5px;
  font-family: inherit;
  color: var(--accent-ink);
  background: var(--accent-soft);
  border: none;
  border-radius: 6px;
  padding: 3px 9px;
  cursor: pointer;
  font-weight: 500;
  transition: background 100ms;
}
.charlie-draft-btn:hover { background: oklch(0.88 0.07 50); }

.conf-date-range {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}
.date-field { display: flex; flex-direction: column; gap: 3px; flex: 1; }
.date-field label { font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--muted); font-weight: 500; }
.conf-date-input {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid var(--line-soft);
  border-radius: 8px;
  background: var(--paper-2);
  font-family: inherit;
  font-size: 13px;
  color: var(--ink);
  outline: none;
}
.conf-date-input:focus { border-color: var(--accent); }
.date-sep { color: var(--muted); font-size: 16px; flex-shrink: 0; margin-top: 18px; }

.conf-swatches {
  display: flex;
  gap: 8px;
  margin-top: 10px;
}
.conf-swatch {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 2px solid transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  color: white;
  transition: transform 100ms, border-color 100ms;
}
.conf-swatch:hover { transform: scale(1.1); }
.conf-swatch.active { border-color: var(--ink); transform: scale(1.12); }
.swatch-check { font-size: 12px; font-weight: 700; }

.conf-toggles-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 10px;
}
.conf-toggle-switch {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
.conf-toggle-switch input { display: none; }
.toggle-track {
  width: 34px;
  height: 20px;
  background: var(--line);
  border-radius: 999px;
  position: relative;
  flex-shrink: 0;
  transition: background 150ms;
}
.conf-toggle-switch input:checked + .toggle-track { background: var(--accent); }
.toggle-thumb {
  position: absolute;
  top: 3px; left: 3px;
  width: 14px; height: 14px;
  background: white;
  border-radius: 999px;
  transition: transform 150ms;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}
.conf-toggle-switch input:checked + .toggle-track .toggle-thumb { transform: translateX(14px); }
.toggle-label { font-size: 12.5px; color: var(--ink-2); }

.conf-recipient-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}
.conf-recipient-main {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--paper-2);
  border: 1px solid var(--line-soft);
  border-radius: 8px;
  padding: 0 10px;
}
.conf-recipient-main:focus-within { border-color: var(--accent); }
.recipient-to-label { font-size: 11.5px; color: var(--muted); font-weight: 600; flex-shrink: 0; }
.conf-recipient-main .conf-input {
  border: none;
  background: transparent;
  padding: 8px 0;
  margin: 0;
}
.conf-recipient-main .conf-input:focus { border-color: transparent; }

/* Preview doc header */
.preview-doc-header {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 18px;
  border-radius: 8px 8px 0 0;
}
.preview-doc-brand {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 18px;
  opacity: 0.9;
}
.preview-doc-title-block { }
.preview-doc-title { font-size: 13px; font-weight: 600; }
.preview-doc-sub   { font-size: 11px; opacity: 0.8; margin-top: 1px; }

.preview-section-block { margin-top: 14px; }
.preview-section-name {
  font-size: 10.5px;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  font-weight: 600;
  margin-bottom: 5px;
}
.preview-section-lines { display: flex; flex-direction: column; gap: 4px; }
.preview-section-lines .preview-line { height: 8px; background: var(--paper-3); border-radius: 4px; width: 100%; }
.preview-section-lines .preview-line.short { width: 65%; }
```

- [ ] **Step 3 : Vérifier la compilation**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Attendu : aucune erreur.

- [ ] **Step 4 : Vérifier visuellement**

```bash
npm run dev
```

Ouvrir `http://localhost:3000/reporting`, choisir un client, cliquer sur "Générer" sur un modèle. Vérifier :
- Le sélecteur de dates (Du / Au) remplace les chips de période sur le rapport de performance
- Les toggles switches fonctionnent
- Les swatches de couleur changent le header de l'aperçu
- Le bouton "✦ Charlie rédige" remplit le commentaire
- L'ajout de CC fonctionne

- [ ] **Step 5 : Commit final**

```bash
git add app/reporting/page.tsx app/globals.css
git commit -m "feat: redesign reporting preview panel with real form controls"
```

---

## Récapitulatif des commits

1. `feat: add portfolio holdings data per client`
2. `feat: add client signals data`
3. `feat: add contact history and next meeting data per client`
4. `feat: add mail, phone, zap, checkCircle, calendar, alertTri, message icons`
5. `feat: add portfolio holdings table to diagnostic tab`
6. `feat: add Signaux and Contact tabs to client profile`
7. `feat: redesign reporting preview panel with real form controls`

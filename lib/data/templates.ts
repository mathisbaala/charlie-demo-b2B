export interface Template {
  id: string;
  cat: string;
  catKey: string;
  name: string;
  preview: string;
  obligation: "obligatoire" | "partiel" | "libre";
  ref?: string;
  desc: string;
  chips: {
    label: string;
    options: string[];
    multi: boolean;
    default: string | string[];
  };
}

export interface SentReport {
  name: string;
  cat: string;
  date: string;
  by: string;
  status: string;
  statusV: string;
}

export const TEMPLATES: Template[] = [
  {
    id: "adequation",
    cat: "Réglementaire", catKey: "Réglementaire",
    name: "Rapport d'adéquation",
    preview: "adequation",
    obligation: "obligatoire",
    ref: "MIF II — art. 25(6)",
    desc: "Prouve que la recommandation est adéquate au profil client. Deux couches inséparables : réglementaire (imposée) + investissement (libre dans la forme). Archivage 5 ans.",
    chips: {
      label: "Sections incluses",
      options: [
        "Profil de risque & KYC",
        "Horizon & tolérance aux pertes",
        "Déclaration d'adéquation formelle",
        "Analyse portefeuille existant",
        "Produits recommandés & SRI",
        "Optimisation fiscale",
        "Avertissements réglementaires",
      ],
      multi: true,
      default: ["Profil de risque & KYC", "Déclaration d'adéquation formelle", "Produits recommandés & SRI"],
    },
  },
  {
    id: "perf",
    cat: "Investissement", catKey: "Investissement",
    name: "Rapport de performance",
    preview: "perf",
    obligation: "partiel",
    ref: "MIF II — relevé annuel + alerte -10 %",
    desc: "MIF II impose un relevé annuel et une alerte J+1 si perte ≥ 10 %. Les CGP haut de gamme vont au-delà : consolidation multi-supports, benchmark, analyse de liquidité.",
    chips: {
      label: "Période",
      options: ["1 mois", "3 mois", "6 mois", "1 an", "3 ans", "Depuis l'origine"],
      multi: false,
      default: "1 an",
    },
  },
  {
    id: "proposition",
    cat: "Investissement", catKey: "Investissement",
    name: "Proposition d'investissement",
    preview: "proposition",
    obligation: "libre",
    ref: "Fondée sur le rapport d'adéquation",
    desc: "Document commercial visible par le client. Forme libre mais fond obligatoire issu de l'adéquation. Différencie un CGP haut de gamme d'un distributeur de produits.",
    chips: {
      label: "Sections incluses",
      options: [
        "Ancrage client & patrimoine actuel",
        "Allocation stratégique cible",
        "Sélection des produits",
        "Projections & scénarios",
        "Optimisation fiscale",
        "Plan d'action",
      ],
      multi: true,
      default: ["Ancrage client & patrimoine actuel", "Allocation stratégique cible", "Sélection des produits"],
    },
  },
  {
    id: "dici",
    cat: "Réglementaire", catKey: "Réglementaire",
    name: "Traçabilité DCI / DICI",
    preview: "dici",
    obligation: "obligatoire",
    ref: "PRIIPs / MIF II / OPCVM IV",
    desc: "Le CGP ne produit pas le DICI — il le transmet et doit prouver la remise avant souscription. Avec 40 lignes en portefeuille, la surveillance manuelle est un risque compliance permanent.",
    chips: {
      label: "Filtre",
      options: ["Tous les fonds", "Alertes version périmée", "SCPI / PE", "Mis à jour ce mois"],
      multi: false,
      default: "Tous les fonds",
    },
  },
  {
    id: "mif2",
    cat: "Réglementaire", catKey: "Réglementaire",
    name: "Rapport coûts & frais MIF II",
    preview: "mif2",
    obligation: "obligatoire",
    ref: "MIF II — art. 24(4) · Avant le 31 janvier",
    desc: "Total agrégé des coûts en € ET en % de l'encours, par client. Inclut frais conseil, OGC fonds, frais PE/SCPI et rétrocessions. Souvent bâclé ou absent — risque AMF élevé.",
    chips: {
      label: "Catégories de frais",
      options: [
        "Frais de conseil & rétrocessions",
        "Frais produits (OGC / TER)",
        "Frais de transaction",
        "Récapitulatif consolidé",
      ],
      multi: true,
      default: ["Frais de conseil & rétrocessions", "Frais produits (OGC / TER)", "Récapitulatif consolidé"],
    },
  },
];

export const SENT_REPORTS: SentReport[] = [
  { name: "Rapport d'adéquation 2026",             cat: "Réglementaire",  date: "20 mai 2026",      by: "Camille Vasseur", status: "Signé",     statusV: "ok" },
  { name: "Rapport de performance T1 2026",         cat: "Investissement", date: "14 mai 2026",      by: "Camille Vasseur", status: "Signé",     statusV: "ok" },
  { name: "Brief rendez-vous · point d'arbitrage",  cat: "Préparation",    date: "8 mai 2026",       by: "Camille Vasseur", status: "Envoyé",    statusV: "accent" },
  { name: "Rapport coûts & frais MIF II 2025",      cat: "Réglementaire",  date: "31 janvier 2026",  by: "Camille Vasseur", status: "Signé",     statusV: "ok" },
  { name: "Proposition d'investissement",            cat: "Investissement", date: "3 avril 2026",     by: "Camille Vasseur", status: "Envoyé",    statusV: "accent" },
  { name: "Bilan patrimonial 2025",                 cat: "Investissement", date: "12 décembre 2025", by: "Camille Vasseur", status: "Brouillon", statusV: "outline" },
];

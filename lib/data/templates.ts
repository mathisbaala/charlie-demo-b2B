export interface Template {
  id: string;
  cat: string;
  catKey: string;
  name: string;
  preview: string;
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
  { id: "perf",   cat: "Investissement", catKey: "Investissement", name: "Rapport de performance",  preview: "perf",   chips: { label: "Période",           options: ["1 mois","3 mois","6 mois","1 an","3 ans","Depuis l'origine"],                          multi: false, default: "1 an" } },
  { id: "bilan",  cat: "Investissement", catKey: "Investissement", name: "Bilan patrimonial",        preview: "bilan",  chips: { label: "Sections incluses", options: ["Synthèse","Allocation","Performance","Fiscalité","Recommandations","Annexes"],      multi: true,  default: ["Synthèse","Allocation","Performance"] } },
  { id: "regle",  cat: "Réglementaire", catKey: "Réglementaire",  name: "Reporting réglementaire",  preview: "regle",  chips: { label: "Document",          options: ["Fiche conseil DDA","DIC PRIIPs","MIF II","Lettre de mandat"],                        multi: false, default: "Fiche conseil DDA" } },
  { id: "brief",  cat: "Préparation",   catKey: "Investissement", name: "Brief de rendez-vous",     preview: "brief",  chips: { label: "Rendez-vous",       options: ["Aujourd'hui · 9 h 30","Bilan annuel","Point d'arbitrage","Souscription"],          multi: false, default: "Aujourd'hui · 9 h 30" } },
  { id: "fiscale",cat: "Investissement", catKey: "Investissement", name: "Synthèse fiscale",         preview: "fiscale",chips: { label: "Année",             options: ["2024","2025","2026"],                                                                 multi: false, default: "2025" } },
  { id: "esg",    cat: "Investissement", catKey: "Investissement", name: "Reporting ESG",            preview: "esg",    chips: { label: "Cadre",             options: ["Article 8/9","Climat","Social","Gouvernance"],                                       multi: true,  default: ["Article 8/9"] } },
];

export const SENT_REPORTS: SentReport[] = [
  { name: "Bilan trimestriel T1 2026",            cat: "Investissement", date: "14 mai 2026",      by: "Camille Vasseur", status: "Signé",     statusV: "ok" },
  { name: "Brief rendez-vous · point d'arbitrage",cat: "Préparation",   date: "8 mai 2026",       by: "Camille Vasseur", status: "Envoyé",    statusV: "accent" },
  { name: "Fiche conseil DDA 2025",               cat: "Réglementaire", date: "31 mai 2025",      by: "Camille Vasseur", status: "Signé",     statusV: "ok" },
  { name: "Bilan patrimonial 2025",               cat: "Investissement", date: "12 décembre 2025", by: "Camille Vasseur", status: "Brouillon", statusV: "outline" },
];

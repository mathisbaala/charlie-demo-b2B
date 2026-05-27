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
      notes: "Discussion sur l'opportunité d'augmenter la poche immobilière. Client favorable, à creuser lors du prochain RDV.",
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
      notes: "Point sur la poche non cotée. Discussion succession. Intérêt pour un mandat ISR Article 9.",
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
      notes: "Versement 25 k€ arrivé. SCI souhaite renforcer l'obligataire. Décision lors du prochain RDV.",
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
      notes: "Point trimestriel. Validation revue MIF II. Discussion fiscalité sur les rachats Private Markets à venir.",
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

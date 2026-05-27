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
      actions: [{ label: "Voir l'optimisation", variant: "accent" }],
    },
    {
      id: "dda-renewal",
      severity: "warn",
      category: "Réglementaire",
      title: "DDA · renouvellement requis avant le 31 mai",
      description: "La fiche conseil DDA arrive à échéance dans 4 jours. Charlie a pré-rempli le document.",
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
      actions: [{ label: "Planifier un entretien", variant: "accent" }],
    },
    {
      id: "isr-ok",
      severity: "info",
      category: "Investissement",
      title: "Objectif ISR atteint · 71 % Article 8/9",
      description: "L'objectif de 70 % de fonds Article 8 ou 9 est atteint. Marge de progression sur la poche actions.",
      actions: [],
    },
    {
      id: "per-opportunity",
      severity: "opportunity",
      category: "Fiscal",
      title: "Plafond PER non utilisé · 5 200 € disponibles",
      description: "Enveloppe fiscale PER sous-utilisée. Un versement de 5 200 € génèrerait une déduction estimée à 1 820 € (TMI 35 %).",
      actions: [{ label: "Simuler le versement", variant: "accent" }],
    },
    {
      id: "av-anniversary",
      severity: "opportunity",
      category: "Opportunité",
      title: "Anniversaire 3 ans · AV Generali Privilège",
      description: "Le contrat atteint 3 ans le 12 juin. Fenêtre de rachat partiel avec abattement fiscal de 4 600 € (célibataire).",
      actions: [{ label: "Préparer le dossier", variant: "accent" }],
    },
  ],
  vasseur: [
    {
      id: "priips-duc",
      severity: "warn",
      category: "Réglementaire",
      title: "PRIIPs · DIC à mettre à jour",
      description: "Le DIC du contrat AV Generali entre dans la fenêtre de mise à jour annuelle. Échéance dans 9 jours.",
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
      description: "Un versement programmé de 25 000 € est arrivé le 24 mai sur le compartiment euros. À allouer selon le mandat.",
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
      description: "À 5 ans de l'horizon de retrait, l'allocation actuelle est cohérente. Revue recommandée en septembre.",
      actions: [{ label: "Planifier la revue", variant: "accent" }],
    },
  ],
  nguyen: [
    {
      id: "isr-upgrade",
      severity: "opportunity",
      category: "Opportunité",
      title: "Passage Article 9 · opportunité sur la poche actions",
      description: "Charlie ISR Article 9 est disponible à des frais préférentiels. Le score ISR gagnerait 6 points.",
      actions: [{ label: "Voir la proposition", variant: "accent" }],
    },
  ],
  roche: [
    {
      id: "mif-review",
      severity: "warn",
      category: "Réglementaire",
      title: "MIF II · revue annuelle de l'univers fonds",
      description: "La revue annuelle doit être réalisée avant le 30 juin. Charlie a préparé une synthèse.",
      actions: [
        { label: "Ouvrir la revue", variant: "accent" },
        { label: "Programmer un comité", variant: "ghost" },
      ],
    },
    {
      id: "pm-allocation",
      severity: "opportunity",
      category: "Fiscal",
      title: "Non coté · enveloppe disponible 280 k€",
      description: "Allocation cible 35 % marchés privés. Exposition actuelle 30 %, soit 280 k€ sous-alloués.",
      actions: [{ label: "Simuler l'allocation", variant: "accent" }],
    },
  ],
};

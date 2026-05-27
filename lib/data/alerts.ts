export interface AlertClient {
  initials: string;
  name: string;
  encours: string;
  expo: string;
}

export interface AlertAction {
  variant: string;
  label: string;
}

export interface Alert {
  id: string;
  cat: string;
  catVariant: string;
  swatch: string;
  source: string;
  sourceLabel: string;
  when: string;
  title: string;
  sub: string;
  longDesc: string;
  clients: AlertClient[];
  actions: AlertAction[];
  count: number;
}

export const ALERTES: Alert[] = [
  {
    id: "carmignac",
    cat: "Investissement", catVariant: "accent",
    swatch: "accent",
    source: "Société de gestion",
    sourceLabel: "Carmignac · note du 24 mai",
    when: "il y a 4 h",
    title: "Carmignac Patrimoine sort de la liste prescrite",
    sub: "Recul de 3,2 % sur le mois, écart de risque de +1,8 pt face au benchmark. Huit clients exposés à plus de 5 % du portefeuille.",
    longDesc: "Le fonds Carmignac Patrimoine présente sur le mois écoulé un recul de 3,2 % et un écart de risque de +1,8 point face à son indice de référence. Notre comité d'investissement le retire de la liste prescrite. Huit clients de votre cabinet y sont exposés à plus de 5 % de leur portefeuille et méritent un arbitrage avant fin juin.",
    clients: [
      { initials: "MD", name: "M. Durand",   encours: "240 k€", expo: "8,2 % du portefeuille" },
      { initials: "MV", name: "Mme Vasseur", encours: "1,2 M€", expo: "6,7 %" },
      { initials: "MB", name: "M. Bertin",   encours: "420 k€", expo: "5,4 %" },
      { initials: "SL", name: "SCI Latour",  encours: "680 k€", expo: "5,1 %" },
    ],
    actions: [
      { variant: "accent", label: "Proposer un arbitrage" },
      { variant: "ghost",  label: "Préparer un mailing" },
      { variant: "ghost",  label: "Archiver l'alerte" },
    ],
    count: 8,
  },
  {
    id: "priips",
    cat: "Réglementaire", catVariant: "warn",
    swatch: "warn",
    source: "Réglementation",
    sourceLabel: "Règlement européen PRIIPs",
    when: "il y a 2 h",
    title: "PRIIPs · DIC à fournir pour 4 contrats",
    sub: "Quatre dossiers entrent dans la fenêtre de mise à jour réglementaire des DIC. Échéance contractuelle dans 9 jours.",
    longDesc: "Quatre contrats arrivent à échéance pour la mise à jour annuelle de leur document d'informations clés. L'échéance contractuelle tombe dans 9 jours. Charlie a préparé les fiches en l'état, il vous reste à les valider puis les envoyer.",
    clients: [
      { initials: "MV", name: "Mme Vasseur", encours: "1,2 M€", expo: "AV Generali · UC" },
      { initials: "MB", name: "M. Bertin",   encours: "420 k€", expo: "PEA Linxea" },
      { initials: "MN", name: "Mme Nguyen",  encours: "780 k€", expo: "AV Spirica" },
      { initials: "MR", name: "M. Roche",    encours: "5,6 M€", expo: "Compte-titres" },
    ],
    actions: [
      { variant: "accent", label: "Générer les 4 DIC" },
      { variant: "ghost",  label: "Voir les dossiers" },
      { variant: "ghost",  label: "Reporter à demain" },
    ],
    count: 4,
  },
  {
    id: "dda",
    cat: "Réglementaire", catVariant: "warn",
    swatch: "warn",
    source: "Réglementation",
    sourceLabel: "Directive DDA · article 25",
    when: "hier",
    title: "DDA · 12 fiches conseil à renouveler",
    sub: "L'échéance annuelle de renouvellement DDA tombe le 31 mai. Douze dossiers à traiter, six déjà préremplis par Charlie.",
    longDesc: "L'échéance annuelle de renouvellement des fiches conseil DDA arrive au 31 mai. Charlie a préparé six fiches sur les douze concernées, à partir des derniers entretiens enregistrés. Les six autres demandent un échange court avec le client avant signature.",
    clients: [
      { initials: "MD", name: "M. Durand",   encours: "240 k€", expo: "Préremplie" },
      { initials: "MV", name: "Mme Vasseur", encours: "1,2 M€", expo: "Préremplie" },
      { initials: "MN", name: "Mme Nguyen",  encours: "780 k€", expo: "À compléter" },
      { initials: "MR", name: "M. Roche",    encours: "5,6 M€", expo: "À compléter" },
    ],
    actions: [
      { variant: "accent", label: "Ouvrir les 6 fiches prêtes" },
      { variant: "ghost",  label: "Programmer un envoi groupé" },
      { variant: "ghost",  label: "Archiver" },
    ],
    count: 12,
  },
  {
    id: "versement",
    cat: "Investissement", catVariant: "accent",
    swatch: "accent",
    source: "Assureur",
    sourceLabel: "Generali · plateforme Sextant",
    when: "hier",
    title: "Versement programmé arrivé à terme",
    sub: "Un versement automatique de 25 k€ est arrivé sur le contrat SCI Latour le 24 mai. Non alloué à ce jour.",
    longDesc: "Un versement programmé de 25 000 € est arrivé sur le contrat assurance-vie de la SCI Latour le 24 mai. Les fonds restent sur le compartiment euros par défaut, alors que l'allocation cible prévoit 40 % en unités de compte.",
    clients: [
      { initials: "SL", name: "SCI Latour", encours: "680 k€", expo: "25 k€ non alloués" },
    ],
    actions: [
      { variant: "accent", label: "Proposer une allocation" },
      { variant: "ghost",  label: "Contacter la SCI" },
      { variant: "ghost",  label: "Reporter à demain" },
    ],
    count: 1,
  },
  {
    id: "avgen",
    cat: "Investissement", catVariant: "accent",
    swatch: "accent",
    source: "Détection portefeuille",
    sourceLabel: "Charlie · agrégateur",
    when: "il y a 2 j",
    title: "AV Generali · dérive +4,2 % hors mandat",
    sub: "Le contrat de M. Durand a dérivé au-dessus du seuil de rééquilibrage fixé en mandat. À traiter avant le rendez-vous.",
    longDesc: "Le contrat d'assurance-vie de M. Durand chez Generali présente un écart de +4,2 % sur la poche actions, au-dessus du seuil de rééquilibrage fixé dans la lettre de mandat (3 %). Le rééquilibrage peut être proposé en séance dès aujourd'hui.",
    clients: [
      { initials: "MD", name: "M. Durand", encours: "240 k€", expo: "+4,2 % actions" },
    ],
    actions: [
      { variant: "accent", label: "Préparer le rééquilibrage" },
      { variant: "ghost",  label: "Voir le portefeuille" },
      { variant: "ghost",  label: "Reporter d'une semaine" },
    ],
    count: 1,
  },
  {
    id: "mif",
    cat: "Investissement", catVariant: "accent",
    swatch: "accent",
    source: "Revue annuelle",
    sourceLabel: "Charlie · comité",
    when: "il y a 3 j",
    title: "Revue annuelle de votre univers d'investissement",
    sub: "MIF II impose une revue annuelle de l'univers de fonds référencés. À programmer avant le 30 juin.",
    longDesc: "La directive MIF II impose une revue annuelle de l'univers d'investissement référencé par le cabinet. La dernière revue date du 28 juin 2025. Charlie a préparé une synthèse des fonds entrants et sortants, à valider en comité.",
    clients: [],
    actions: [
      { variant: "accent", label: "Ouvrir la revue" },
      { variant: "ghost",  label: "Programmer un comité" },
      { variant: "ghost",  label: "Reporter au mois prochain" },
    ],
    count: 0,
  },
];

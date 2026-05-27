function sparkData(seed: number, points = 24, vol = 0.06, trend = 0.4): number[] {
  let v = 100;
  const out: number[] = [v];
  let s = seed;
  for (let i = 0; i < points; i++) {
    s = (s * 9301 + 49297) % 233280;
    const r = (s / 233280 - 0.5) * 2;
    v = v * (1 + r * vol + trend / points / 5);
    out.push(v);
  }
  return out;
}

export interface Fund {
  id: string;
  glyph: string;
  house: string;
  name: string;
  cat: string;
  desc: string;
  ytd: string;
  frais: string;
  encours: string;
  srri: string;
  score: number;
  isin: string;
  spark: number[];
  srr: string;
  ar3: string;
  ar5: string;
  vol: string;
  dd: string;
  classification: string;
  aum: string;
  creation: string;
  desclong: string;
  stars: number;
}

export const FUNDS_CHARLIE: Fund[] = [
  { id:"ch-pat",   glyph:"E", house:"Edmond de Rothschild", name:"Charlie Patrimoine 60/40",          cat:"Patrimonial équilibré · 60/40", desc:"Allocation maison pour profils équilibrés, 60 % actions / 40 % obligations, sélection multi-gérants serrée.", ytd:"+6,4 %",  frais:"0,8 %", encours:"480 M€", srri:"3", score:96, isin:"FR0014006X12", spark:sparkData(11),                    srr:"3 / 7", ar3:"+18 %", ar5:"+34 %", vol:"6,2",  dd:"−9,4 %",   classification:"Article 8", aum:"480 M€",   creation:"2022", desclong:"Exclusivité Charlie négociée avec Edmond de Rothschild. Allocation 60 % actions internationales diversifiées, 40 % obligations souveraines et crédit investment grade.", stars:4 },
  { id:"ch-isr",   glyph:"M", house:"Mirova",               name:"Charlie ISR Article 9",             cat:"Actions ISR · Article 9",        desc:"Sélection durable Article 9 thématique transitions, négociée pour vos clients ISR engagés.", ytd:"+11,2 %", frais:"1,1 %", encours:"320 M€", srri:"5", score:94, isin:"FR0014007K94", spark:sparkData(22,24,0.09,0.8),         srr:"5 / 7", ar3:"+26 %", ar5:"+52 %", vol:"9,8",  dd:"−14,1 %",  classification:"Article 9", aum:"320 M€",   creation:"2021", desclong:"Fonds Article 9, axé sur la transition énergétique et l'inclusion sociale. Frais courants négociés à 1,1 % au lieu de 1,6 % pour la part standard.", stars:5 },
  { id:"ch-cash",  glyph:"T", house:"Tikehau",              name:"Charlie Cash+ monétaire",           cat:"Monétaire · trésorerie",          desc:"Poche de trésorerie liquide, rendement supérieur au monétaire classique, frais réduits.", ytd:"+3,1 %",  frais:"0,2 %", encours:"640 M€", srri:"1", score:92, isin:"FR0014002L67", spark:sparkData(7,24,0.005,0.15),        srr:"1 / 7", ar3:"+7,2 %", ar5:"+9,8 %", vol:"0,4",  dd:"−0,1 %",   classification:"Article 6", aum:"640 M€",   creation:"2023", desclong:"Liquidités gérées en obligataire court terme investment grade. Disponible à 48 h.", stars:4 },
  { id:"ch-multi", glyph:"L", house:"Lazard FG",            name:"Charlie Multi-actifs Patrimoine",   cat:"Multi-actifs · flexible",         desc:"Approche flexible toutes classes d'actifs, pilotée à la volatilité cible 7 %.", ytd:"+5,8 %",  frais:"1,0 %", encours:"210 M€", srri:"4", score:90, isin:"FR0014008P11", spark:sparkData(15),                    srr:"4 / 7", ar3:"+17 %", ar5:"+29 %", vol:"7,1",  dd:"−11,2 %",  classification:"Article 8", aum:"210 M€",   creation:"2020", desclong:"Pilotage actif d'une allocation flexible 0-100 % actions, sélection top-down équipée Charlie.", stars:4 },
  { id:"ch-pm",    glyph:"A", house:"Ardian",               name:"Charlie Private Markets",           cat:"Non coté · evergreen",            desc:"Solution non coté evergreen, ticket minimum 50 k€, accessible en UC sur AV partenaires.", ytd:"+8,9 %",  frais:"1,8 %", encours:"180 M€", srri:"6", score:89, isin:"FR0014009H56", spark:sparkData(31,24,0.04,0.6),         srr:"6 / 7", ar3:"+24 %", ar5:"+42 %", vol:"12,4", dd:"−17,3 %",  classification:"Article 8", aum:"180 M€",   creation:"2023", desclong:"Solution evergreen non coté multi-stratégie : private equity, infrastructure, dette privée. Liquidité trimestrielle.", stars:4 },
  { id:"ch-obli",  glyph:"L", house:"LBPAM",               name:"Charlie Obligataire Crédit Euro",   cat:"Obligations · crédit IG",         desc:"Crédit investment grade euro, duration 4,2 ans, alternative à l'AV fonds euros.", ytd:"+4,2 %",  frais:"0,6 %", encours:"290 M€", srri:"2", score:88, isin:"FR0014006M30", spark:sparkData(4,24,0.015,0.3),        srr:"2 / 7", ar3:"+9,4 %", ar5:"+14 %",  vol:"3,1",  dd:"−4,2 %",   classification:"Article 8", aum:"290 M€",   creation:"2022", desclong:"Sélection de signatures investment grade européennes, gestion top-down par les équipes LBPAM.", stars:4 },
];

export const FUNDS_RECO: Fund[] = [
  { id:"dnca-euro",  glyph:"D", house:"DNCA Finance",                    name:"DNCA Invest Eurose",             cat:"Patrimonial équilibré",           desc:"Référence du patrimonial équilibré, allocation 30/70 prudente, frais maîtrisés.", ytd:"+5,2 %",  frais:"1,1 %", encours:"3,2 Md€", srri:"3", score:94, isin:"LU0284394234", spark:sparkData(8),                    srr:"3 / 7", ar3:"+12 %", ar5:"+22 %", vol:"5,8",  dd:"−8,1 %",   classification:"Article 8", aum:"3,2 Md€",  creation:"2003", desclong:"Fonds historique du patrimonial équilibré, 30 % actions / 70 % obligations, gestion stable depuis vingt ans.", stars:4 },
  { id:"syc-pme",    glyph:"S", house:"Sycomore AM",                     name:"Sycomore Sél. PME ISR",          cat:"Actions ISR · Article 9",         desc:"Petites et moyennes valeurs européennes, Article 9, focus sur la transition juste.", ytd:"+8,2 %",  frais:"1,4 %", encours:"410 M€",  srri:"5", score:91, isin:"FR0010111675", spark:sparkData(19,24,0.08,0.7),        srr:"5 / 7", ar3:"+22 %", ar5:"+38 %", vol:"10,4", dd:"−18,2 %",  classification:"Article 9", aum:"410 M€",   creation:"2007", desclong:"Sélection de PME européennes engagées sur la transition juste. Article 9 strict, exclusion sectorielle complète.", stars:5 },
  { id:"rco-mod",    glyph:"R", house:"Rothschild & Co",                 name:"R-co Conviction Modéré",         cat:"Allocation modérée",               desc:"Allocation modérée pilotée, profil 35/65, distribution semestrielle disponible.", ytd:"+4,1 %",  frais:"1,0 %", encours:"720 M€",  srri:"3", score:88, isin:"FR0010187386", spark:sparkData(13),                   srr:"3 / 7", ar3:"+11 %", ar5:"+20 %", vol:"6,1",  dd:"−7,4 %",   classification:"Article 8", aum:"720 M€",   creation:"2010", desclong:"Allocation diversifiée modérée pilotée par les équipes Rothschild & Co. Part de distribution semestrielle.", stars:4 },
  { id:"ech-major",  glyph:"E", house:"La Financière de l'Échiquier",   name:"Echiquier Major SRI",            cat:"Actions Europe ISR",               desc:"Large cap européennes leaders ESG, conviction de long terme, faible rotation.", ytd:"+9,8 %",  frais:"1,3 %", encours:"1,1 Md€", srri:"5", score:86, isin:"FR0010321810", spark:sparkData(27,24,0.07,0.7),        srr:"5 / 7", ar3:"+24 %", ar5:"+44 %", vol:"10,8", dd:"−16,4 %",  classification:"Article 8", aum:"1,1 Md€",  creation:"2005", desclong:"Sélection concentrée de leaders européens à forte capitalisation, signature ESG reconnue.", stars:4 },
  { id:"pic-env",    glyph:"P", house:"Pictet AM",                       name:"Pictet Global Environment",      cat:"Actions thématique · environnement",desc:"Thématique environnement mondial, large univers, signature reconnue Article 9.", ytd:"+7,4 %",  frais:"1,6 %", encours:"4,8 Md€", srri:"6", score:84, isin:"LU0503631714", spark:sparkData(33,24,0.09,0.5),        srr:"6 / 7", ar3:"+19 %", ar5:"+41 %", vol:"12,7", dd:"−21,4 %",  classification:"Article 9", aum:"4,8 Md€",  creation:"2014", desclong:"Stratégie d'actions monde sur la thématique environnement, sélection par planet boundaries.", stars:4 },
  { id:"sex-bond",   glyph:"S", house:"Amiral Gestion",                 name:"Sextant Bond Picking",           cat:"Obligations · flexible",           desc:"Sélection obligataire flexible, approche value crédit, duration courte.", ytd:"+4,9 %",  frais:"0,9 %", encours:"560 M€",  srri:"3", score:82, isin:"FR0013202196", spark:sparkData(6,24,0.02,0.4),         srr:"3 / 7", ar3:"+13 %", ar5:"+19 %", vol:"4,4",  dd:"−5,8 %",   classification:"Article 8", aum:"560 M€",   creation:"2017", desclong:"Sélection obligataire value, signatures hors univers indiciel. Duration courte 2-3 ans.", stars:4 },
  { id:"tik-inc",    glyph:"T", house:"Tikehau Capital",                name:"Tikehau Income Cross Assets",    cat:"Multi-actifs · revenus",           desc:"Multi-actifs orienté revenus, distribution trimestrielle, sensibilité limitée.", ytd:"+5,8 %",  frais:"1,0 %", encours:"380 M€",  srri:"3", score:80, isin:"FR0011786183", spark:sparkData(9),                    srr:"3 / 7", ar3:"+13 %", ar5:"+22 %", vol:"5,4",  dd:"−7,1 %",   classification:"Article 8", aum:"380 M€",   creation:"2014", desclong:"Allocation multi-actifs orientée revenus distribuables. Part de distribution trimestrielle.", stars:3 },
  { id:"car-pat",    glyph:"C", house:"Carmignac",                      name:"Carmignac Patrimoine",           cat:"Patrimonial flexible",              desc:"Patrimonial flexible historique. Sort de notre liste prescrite ce mois.", ytd:"−3,2 %",  frais:"1,5 %", encours:"8,2 Md€", srri:"4", score:62, isin:"FR0010135103", spark:sparkData(2,24,0.06,-0.4),       srr:"4 / 7", ar3:"+6 %",  ar5:"+11 %", vol:"7,4",  dd:"−12,8 %",  classification:"Article 8", aum:"8,2 Md€",  creation:"1989", desclong:"Fonds patrimonial flexible historique. Retiré de la liste prescrite le 24 mai après recul de 3,2 % sur le mois.", stars:3 },
];

export const ALL_FUNDS = [...FUNDS_CHARLIE, ...FUNDS_RECO];

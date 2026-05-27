export interface Client {
  id: string;
  initials: string;
  name: string;
  encours: string;
  profile: string;
  horizon: string;
}

export const CLIENTS: Client[] = [
  { id: "durand",  initials: "MD", name: "M. Durand",    encours: "240 k€",   profile: "Équilibré",   horizon: "10 ans" },
  { id: "vasseur", initials: "MV", name: "Mme Vasseur",  encours: "1,2 M€",   profile: "Dynamique",   horizon: "8 ans"  },
  { id: "latour",  initials: "SL", name: "SCI Latour",   encours: "680 k€",   profile: "Patrimonial", horizon: "12 ans" },
  { id: "bertin",  initials: "MB", name: "M. Bertin",    encours: "420 k€",   profile: "Prudent",     horizon: "5 ans"  },
  { id: "nguyen",  initials: "MN", name: "Mme Nguyen",   encours: "780 k€",   profile: "Équilibré",   horizon: "9 ans"  },
  { id: "roche",   initials: "MR", name: "M. Roche",     encours: "5,6 M€",   profile: "Dynamique",   horizon: "15 ans" },
];

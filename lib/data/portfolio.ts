import { ALL_FUNDS, type Fund } from "./funds";

export interface Holding {
  fundId: string;
  pct: number;
  amount: number;
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

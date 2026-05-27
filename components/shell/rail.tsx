"use client";
import { Ico } from "@/components/kit/icons";

interface RailProps {
  current: string;
  onNav: (id: string) => void;
  alertsCount: number;
}

const items = [
  { id: "accueil",    icon: (s: number) => <Ico.home s={s} />,   label: "Accueil" },
  { id: "alertes",    icon: (s: number) => <Ico.bell s={s} />,   label: "Alertes",  badge: true },
  { id: "recherche",  icon: (s: number) => <Ico.search s={s} />, label: "Recherche" },
  { id: "diagnostic", icon: (s: number) => <Ico.chart s={s} />,  label: "Diagnostic" },
  { id: "reporting",  icon: (s: number) => <Ico.doc s={s} />,    label: "Reporting" },
];

export default function Rail({ current, onNav, alertsCount }: RailProps) {
  return (
    <div className="rail" style={{ width: 60 }}>
      {items.map(it => (
        <button
          key={it.id}
          className={`rail-btn ${current === it.id ? "active" : ""}`}
          title={it.label}
          onClick={() => onNav(it.id)}
        >
          {it.icon(22)}
          {it.badge && alertsCount > 0 && <span className="badge-num">{alertsCount}</span>}
        </button>
      ))}
    </div>
  );
}

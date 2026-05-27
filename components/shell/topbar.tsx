"use client";
import Image from "next/image";
import { Ico } from "@/components/kit/icons";

interface TopBarProps {
  section: string;
  onLogo: () => void;
  onOpenChat: () => void;
  alertsCount: number;
}

export default function TopBar({ section, onLogo, onOpenChat, alertsCount }: TopBarProps) {
  return (
    <div className="topbar">
      <a className="brand" onClick={onLogo} style={{ cursor: "pointer" }}>
        <Image src="/charlie-logo.png" alt="" width={24} height={24} />
        <span className="wordmark">Charlie</span>
      </a>
      <span className="section-label">{section}</span>
      <div className="spacer" />
      <div className="cmdk-input">
        <span className="ico"><Ico.search s={14} /></span>
        <input placeholder="Rechercher" />
      </div>
      <div className="spacer" />
      <div className="actions">
        <button className="icon-btn" aria-label="Notifications" style={{ position: "relative" }}>
          <Ico.bell s={15} />
          {alertsCount > 0 && (
            <span style={{ position: "absolute", top: 7, right: 7, width: 6, height: 6, background: "var(--accent)", borderRadius: 999 }} />
          )}
        </button>
        <button className="logo-btn" aria-label="Ouvrir Charlie" onClick={onOpenChat}>
          <Image src="/charlie-logo.png" alt="" width={22} height={22} />
        </button>
      </div>
    </div>
  );
}

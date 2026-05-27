"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import TopBar from "./topbar";
import Rail from "./rail";
import ChatPopup from "./chat-popup";

const SECTION_LABELS: Record<string, string> = {
  "/accueil": "Accueil",
  "/alertes": "Alertes",
  "/recherche": "Recherche de fonds",
  "/diagnostic": "Diagnostic portefeuille",
  "/reporting": "Reporting",
};

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [chatOpen, setChatOpen] = useState(false);

  const section = SECTION_LABELS[pathname] ?? "Accueil";
  const current = pathname.replace("/", "") || "accueil";

  return (
    <div className="app">
      <TopBar
        section={section}
        onLogo={() => router.push("/accueil")}
        onOpenChat={() => setChatOpen((o) => !o)}
        alertsCount={6}
      />
      <div className="shell">
        <Rail current={current} onNav={(id) => router.push(`/${id}`)} alertsCount={6} />
        <div className="main">{children}</div>
      </div>
      <ChatPopup open={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}

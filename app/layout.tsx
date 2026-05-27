import type { Metadata } from "next";
import "./globals.css";
import { TweaksProvider } from "@/lib/context";
import AppShell from "@/components/shell/app-shell";

export const metadata: Metadata = {
  title: "Charlie — Espace conseiller",
  description: "Plateforme CGP Charlie : briefing, alertes, fonds, diagnostic, reporting.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <TweaksProvider>
          <AppShell>{children}</AppShell>
        </TweaksProvider>
      </body>
    </html>
  );
}

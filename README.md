# Charlie — Espace Conseiller B2B

Plateforme démo pour conseillers en gestion de patrimoine (CGP), construite avec Next.js 16 App Router.

## Sections

| Route | Description |
|-------|-------------|
| `/accueil` | Briefing du jour — agenda, alertes récentes, clients à traiter |
| `/alertes` | Centre d'alertes — filtres réglementaires/investissement, panel détail |
| `/recherche` | Recherche de fonds — fonds exclusifs Charlie + recommandés, sparklines |
| `/diagnostic` | Diagnostic portefeuille — score ESG, allocation, historique par client |
| `/reporting` | Reporting — 6 templates, génération avec période et ton au choix |

## Stack

- **Next.js 16.2.6** — App Router, TypeScript
- **React 19** — Server + Client Components
- **Design system** — CSS custom properties oklch, DM Sans + Instrument Serif
- **Mock data** — TypeScript pur, zéro base de données
- **Chat Charlie** — réponses contextuelles, prêt pour intégration `@anthropic-ai/sdk`

## Lancer en local

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) — redirige vers `/accueil`.

## Production

Déployé sur Vercel : **https://charlie-demo-b2b.vercel.app**

Les pushes sur `main` déclenchent automatiquement un redéploiement.

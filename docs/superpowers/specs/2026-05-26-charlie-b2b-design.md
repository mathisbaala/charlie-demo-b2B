# Charlie B2B — Spec de design technique
Date : 2026-05-26

## Contexte

Application web B2B pour conseillers en gestion de patrimoine (CGP) français.
Port d'une maquette HTML/CSS/JSX standalone vers une app Next.js complète déployée sur Vercel.

## Décisions clés

- **Backend** : frontend-first avec mock data TypeScript. DB (Prisma + Supabase) branchée ultérieurement.
- **Auth** : mock user (Camille). Pas d'auth réelle dans cette phase.
- **Déploiement** : Vercel production.
- **IA** : Claude haiku-4-5 si `ANTHROPIC_API_KEY` présente, fallback crédible sinon.

## Architecture

### Stack

- Next.js 15 (App Router) + TypeScript
- CSS custom properties (tokens oklch du design system, pas de Tailwind)
- Google Fonts via `next/font/google` : Instrument Serif, DM Sans, DM Mono
- Aucune librairie UI externe (tout custom, conforme au design system)

### Structure de fichiers

```
charlie-demo-b2b/
├── app/
│   ├── layout.tsx              # Shell global : TopBar + Rail + main
│   ├── page.tsx                # Redirect → /accueil
│   ├── accueil/page.tsx
│   ├── alertes/page.tsx
│   ├── recherche/page.tsx
│   ├── diagnostic/page.tsx
│   ├── reporting/page.tsx
│   └── api/
│       ├── me/route.ts
│       ├── clients/route.ts
│       ├── clients/[id]/route.ts
│       ├── agenda/route.ts
│       ├── brief/route.ts
│       ├── alerts/route.ts
│       ├── alerts/[id]/route.ts
│       ├── funds/route.ts
│       ├── funds/search/route.ts
│       ├── funds/[id]/route.ts
│       ├── chat/route.ts
│       └── reports/[id]/pdf/route.ts
├── components/
│   ├── kit/                    # Pill, Btn, Av, Sparkline, Donut, ScoreBadge
│   ├── shell/                  # TopBar, Rail, ChatPopup, TweaksPanel
│   └── sections/               # ViewAccueil, ViewAlertes, ViewRecherche, ViewDiagnostic, ViewReporting
├── lib/
│   ├── data/
│   │   ├── clients.ts          # 6 clients seed
│   │   ├── funds.ts            # 14 fonds (6 Charlie + 8 recommandés)
│   │   ├── alerts.ts           # 6 alertes
│   │   ├── agenda.ts           # RDV du jour
│   │   └── documents.ts        # Documents par client
│   ├── context.tsx             # ClientContext (diagClient, repClient)
│   └── utils.ts
├── styles/
│   ├── globals.css             # Tokens + base (port de styles.css + extra.css)
│   └── components.css
└── public/
    └── charlie-logo.png
```

### Routing & navigation

- App Router avec navigation client-side (`useRouter` + `router.push`)
- Le contexte client actif (diagnostic, reporting) vit dans un `ClientContext` React côté client
- Scroll remis à 0 à chaque changement de section (via `useEffect` + `window.scrollTo`)

## Design system

Porté fidèlement depuis la maquette :
- Tokens oklch préservés à l'identique (`--cream`, `--paper`, `--accent`, etc.)
- Composants atomiques : `Pill` (accent/ok/warn/outline), `Btn` (accent/primary/ghost, sm/md/lg), `Av` (sm/md/lg/xl/xxl), `Sparkline` (SVG responsive), `Donut` (SVG segmenté), `ScoreBadge`
- Rayons : 6/8/10/12/14px selon composant
- Mode tweaks : 3 palettes accent (terra/brique/bronze), 2 densités (comfy/compact)

### Règles critiques (non négociables)

- Zéro em-dash dans les copies user-facing
- Zéro sparkle/étoile décorative sur les boutons
- Zéro jargon anglais financier
- Capitalisation française systématique
- Catégories dans l'ordre fixe : Tous → Investissement → Réglementaire → Échanges (ou Mes modèles)
- Boutons : « Choisir un client » (jamais « Charger » ni « Changer »)
- Animations : `sheet-in` et `chat-pop` sur `transform` uniquement (pas opacity)

## Données mock

### Clients (6)
- M. Durand — 240 k€, équilibré, horizon 10 ans, score santé 82, score patrimoine 72
- Mme Vasseur — 1,2 M€, dynamique
- SCI Latour — 680 k€, patrimonial
- M. Bertin — 420 k€, prudent
- Mme Nguyen — 780 k€, équilibré
- M. Roche — 5,6 M€, dynamique

### Fonds (14)
**Exclusivité Charlie (6)** : Charlie Patrimoine 60/40, Charlie ISR Article 9, Charlie Cash+, Charlie Multi-actifs Patrimoine, Charlie Private Markets, Charlie Obligataire Crédit Euro.

**Recommandés (8)** : DNCA Invest Eurose, Sycomore PME ISR, R-co Conviction Modéré, Echiquier Major SRI, Pictet Global Environment, Sextant Bond Picking, Tikehau Income, Carmignac Patrimoine.

### Alertes (6)
1. Carmignac Patrimoine sort de la liste prescrite (investissement)
2. Quatre DIC PRIIPs à fournir avant le 4 juin (réglementaire)
3. Douze fiches conseil DDA à renouveler (réglementaire)
4. Versement programmé 25 000 € à allouer — SCI Latour (investissement)
5. AV Generali · écart 4,2 % avec le mandat — M. Durand (investissement)
6. Revue annuelle de votre univers d'investissement (investissement)

## API routes (mock → Prisma-ready)

Toutes les routes retournent les types TypeScript du modèle de données final.
L'ajout de Prisma sera un remplacement d'import, pas un refacto structurel.

```
GET  /api/me                    → CGP Camille (mock statique)
GET  /api/clients               → liste 6 clients
GET  /api/clients/:id           → détail + contrats + scores
GET  /api/clients/:id/documents → liste documents
GET  /api/agenda?date=          → RDV du jour
GET  /api/brief?date=           → briefing matinal (Claude ou fallback)
GET  /api/alerts?status=        → alertes filtrées
PATCH /api/alerts/:id           → archiver
GET  /api/funds                 → catalogue 14 fonds
GET  /api/funds/search?q=       → ranking (Claude ou déterministe)
GET  /api/funds/:id             → détail fonds
POST /api/chat                  → message Claude (ou fallback)
GET  /api/reports/:id/pdf       → placeholder PDF
```

## Intégration Claude

- **Brief** : prompt qui prend agenda du jour + alertes ouvertes + liste clients → 2 paragraphes en français CGP
- **Chat** : prompt système qui connaît les 6 clients, le profil CGP Camille, ton français sobre
- **Recherche** : ranking des fonds par score de matching SRRI/frais/ISR/Morningstar
- **Fallback** : si `ANTHROPIC_API_KEY` absente → texte de fallback crédible, pas d'erreur visible

## Sections UI (5 + chat + tweaks)

### Accueil
Brief matinal avec date/heure dynamique, carte brief narratif, grille 2 col (RDV du jour / alertes récentes), section « À traiter » (4 items numérotés).

### Alertes
Split 44%/56% : liste d'alertes avec stripe colorée + drawer détail sticky avec clients concernés, source, actions suggérées.

### Recherche de fonds
3 vues internes (home/catalog/results) : prompt card textarea, sections horizontales scrollables, grille de fund cards avec sparkline, panel détail sticky.

### Diagnostic portefeuille
ClientBanner xxl, 3 onglets (Diagnostic/Optimisation/Documents), tiles hero, donut allocation, points d'attention, plan d'arbitrage 3 étapes, générateurs de documents.

### Reporting
État vide (sans client) vs état chargé. Grille de 6 templates. Panel aperçu sticky à droite (grid 1.15fr 1fr) avec options de configuration et preview document.

### Chat popup
380px wide, anchored top-right (64px/14px), Claude Haiku, premier message auto « Bonjour Camille, que cherchez-vous ? ».

### Tweaks panel
Palette accent (terra/brique/bronze) + densité (comfy/compact).

## Comportements transverses

- « Préparer le brief » sur ligne agenda → Diagnostic du client
- « Préparer mes rendez-vous » sur brief → Reporting sans client
- Clic client dans drawer Alertes → Diagnostic du client
- Contexte client jamais visible dans la barre de recherche

## Hors scope (cette phase)

- Auth réelle (Clerk/NextAuth)
- Base de données réelle (Prisma + Supabase)
- Multi-tenant cabinet
- Signature électronique
- Connexions assureurs réelles
- Génération PDF native
- Responsive sous 1280px

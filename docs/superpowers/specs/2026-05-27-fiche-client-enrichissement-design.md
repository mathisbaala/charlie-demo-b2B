# Fiche client — enrichissement · Design Spec
_2026-05-27_

## Périmètre

Quatre évolutions de la fiche client (`/diagnostic`) et de la page reporting (`/reporting`) :

1. Lignes de portefeuille dans le Diagnostic
2. Panneau de personnalisation Reporting refait
3. Onglet Signaux (entre Optimisation et Documents)
4. Onglet Contact (après Documents)

---

## 1. Lignes de portefeuille — `TabDiagnostic`

### Objectif
Ajouter une vue data consolidée des positions individuelles du client sous les blocs existants (allocation + points d'attention).

### Données affichées
Chaque ligne représente un fonds en portefeuille :

| Colonne | Source |
|---|---|
| Fond (nom + maison) | `funds.ts` |
| Classe d'actif | `fund.cat` |
| Encours € | calculé : `%ptf × encours client` |
| % du portefeuille | données client statiques |
| YTD | `fund.ytd` |
| 1 an | `fund.ar3` (proxy) |
| SRRI | `fund.srri` |
| Frais | `fund.frais` |
| Classification ESG | `fund.classification` |
| Statut | dérivé des signaux (vert / orange / rouge) |

### Comportement
- Tableau dans une carte `.card` avec header sticky sur scroll interne
- Ligne cliquable → expand inline : mini-sparkline 80px + `desclong`
- Ligne Carmignac colorée en warn (fond en orange pâle) car retirée de la liste
- Ligne de total en bas : somme encours + frais moyens pondérés
- Tri par défaut : décroissant par encours

### Données mockées pour M. Durand
Portefeuille fictif représentatif du profil Équilibré 240 k€ :

```
Carmignac Patrimoine      Patrimonial flex    8,2 %  → 19 680 €  ⚠
Echiquier Major SRI       Actions EU ISR      6,4 %  → 15 360 €
DNCA Invest Eurose        Patrimonial équil  14,2 %  → 34 080 €
Charlie Patrimoine 60/40  Patrimonial        26,0 %  → 62 400 €
Pictet Global Environment Actions thématiqu   9,8 %  → 23 520 €
Charlie Obligataire Crédit Euro  Oblig IG   18,6 %  → 44 640 €
Charlie Cash+ monétaire   Monétaire           7,0 %  → 16 800 €
Sycomore Sél. PME ISR     Actions PME ISR     9,8 %  → 23 520 €
```

---

## 2. Reporting — panneau de personnalisation

### Objectif
Remplacer les contrôles trop basiques du panneau `ReportPreview` par de vrais champs de formulaire interactifs et un aperçu document plus fidèle.

### Nouveaux contrôles

**Période**
- Deux `<input type="date">` stylés côte-à-côte (Du / Au) avec label flottant
- Remplacent les chips "3 m / 1 an / 3 ans"

**Mise en page**
- Toggle switches custom (pas des checkbox HTML bruts) pour : Page de garde · Signature CGP · Graphiques · Annexes réglementaires

**Couleurs & branding**
- 5 swatches cliquables : Neutre (gris) · Bleu accent · Or · Vert ISR · Aubergine
- Sélection change la couleur du header dans l'aperçu document en temps réel

**Destinataires**
- Champ email principal stylé avec icône
- Bouton `+` pour ajouter un CC (max 3)

**Commentaire d'introduction**
- Textarea existante conservée
- Bouton "Charlie rédige ✦" à droite du label → simule une suggestion (set text prédéfini)

**Aperçu document**
- Header coloré selon le thème sélectionné
- Sections nommées (Performance · Allocation · Recommandations · Annexes)
- Vraie numérotation de pages simulée

### Boutons de pied de panneau
Réorganisés : Régénérer · Éditer · PDF (groupe gauche) — Envoyer (droite, accent)

---

## 3. Onglet Signaux

### Position
4e onglet : Diagnostic · Optimisation · **Signaux** · Documents · Contact

### Structure
Deux blocs distincts dans la même vue scrollable :

#### Bloc A — Alertes liées à ce client
- Filtrées depuis `ALERTES` : uniquement celles dont `clients[]` contient l'id du client courant
- Affichage compact : badge catégorie · sévérité · titre · description · 1-2 actions inline

#### Bloc B — Signaux personnels
Signaux calculés/mockés spécifiques au profil du client. Chaque signal a :
- `severity` : critique | warn | info | opportunité
- `category` : Investissement | Réglementaire | Profil | Opportunité
- `title`, `description` (1-2 lignes)
- `actions[]` : 1-2 boutons

Signaux pour M. Durand (hardcodés, extensibles) :

| Sévérité | Catégorie | Signal |
|---|---|---|
| 🔴 Critique | Investissement | Carmignac 8,2 % → sortie liste prescrite |
| 🟠 Warn | Investissement | Liquidité excédentaire 12 % (cible 5-8 %) |
| 🟠 Warn | Réglementaire | DDA à renouveler avant le 31 mai |
| 🟡 Info | Profil | Profil risque non mis à jour depuis 18 mois |
| 🟢 OK | Investissement | Objectif ISR 71 % atteint |
| 💡 Opportunité | Fiscal | Plafond PER non utilisé : 5 200 € |
| 💡 Opportunité | Investissement | Anniversaire 3 ans AV Generali — fenêtre de rachat |

### Données
Nouveau fichier `lib/data/signals.ts` exportant `CLIENT_SIGNALS` par `clientId`.

---

## 4. Onglet Contact

### Position
5e onglet : Diagnostic · Optimisation · Signaux · Documents · **Contact**

### Structure

**Zone 1 — Actions rapides** (row de 3 boutons larges)
- ✉ Email → ouvre mini-composeur inline dans la page (to: prérempli, objet suggéré selon derniers sujets, corps vide)
- 💬 Message → idem (format SMS/court)
- 📞 Appel → affiche le numéro du client avec bouton "Copier"

Le mini-composeur se déploie sous les boutons (pas de modale), avec champs To / Objet / Corps + "Envoyer" / "Annuler".

**Zone 2 — Prochain rendez-vous** (carte épinglée)
- Date + heure (statique : "Aujourd'hui, 9 h 30")
- Liste éditable des points à préparer (bullet list avec `contentEditable` ou inputs)
- Bouton "Générer brief de RDV" → simule génération (toast de confirmation)

**Zone 3 — Historique des échanges**
Liste chronologique inverse, chaque entrée :
- Date · Type badge (RDV / Email / Appel) · Durée
- Tags des sujets abordés (chips non interactifs)
- Notes : 1-2 lignes de texte

Données mockées pour M. Durand (5-6 entrées couvrant 6 mois).

### Données
Extension de `lib/data/clients.ts` ou nouveau fichier `lib/data/contacts.ts` avec `CLIENT_CONTACTS[clientId]`.

---

## Architecture des changements

| Fichier | Action |
|---|---|
| `lib/data/clients.ts` | Ajouter champ `phone` optionnel |
| `lib/data/signals.ts` | Nouveau fichier |
| `lib/data/contacts.ts` | Nouveau fichier |
| `app/diagnostic/page.tsx` | Ajouter `TabSignaux`, `TabContact`, lignes portefeuille dans `TabDiagnostic` |
| `app/reporting/page.tsx` | Refaire `ReportPreview` |
| `app/globals.css` | Styles pour les nouveaux composants |

---

## Contraintes
- Tout le code reste dans Next.js App Router, pas de nouvelles dépendances
- Les données sont hardcodées (pas d'API) — extensibles ultérieurement
- Le design suit le système existant : tokens CSS vars, composants `Btn`, `Pill`, `Av`, `Ico`
- Mobile : les nouveaux onglets doivent scroller horizontalement sur petit écran (déjà géré par `.seg`)

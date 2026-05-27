"use client";
import { useRouter } from "next/navigation";
import { Ico } from "@/components/kit/icons";
import { Btn, Pill } from "@/components/kit/primitives";

const meetings = [
  {
    time: "09:30", dur: "60 min",
    who: "M. & Mme Durand",
    recap: "Bilan annuel : refaire le point sur le PER (fenêtre dans 12 jours) et l'AV Generali qui a dévié de l'allocation prévue.",
    pills: [{ v: "warn", t: "Fenêtre PER · −12 j" }, { v: "accent", t: "Brief prêt" }],
    clientId: "durand",
  },
  {
    time: "11:00", dur: "45 min",
    who: "SCI Latour",
    recap: "Proposition d'arbitrage : 25 k€ de versement programmé à allouer, validation du plan immobilier court terme.",
    pills: [{ v: "accent", t: "Versement à allouer" }],
    clientId: "latour",
  },
  {
    time: "15:30", dur: "30 min",
    who: "Mme Vasseur",
    recap: "Souscription en suspens depuis 6 jours : relance par téléphone, lever les deux points bloquants côté assureur.",
    pills: [{ v: "warn", t: "Relance · 6 j" }],
    clientId: "vasseur",
  },
];

const recentAlerts = [
  { id: "priips",    swatch: "warn",   title: "PRIIPs · DIC à fournir pour 4 contrats",              sub: "Mme Vasseur, M. Bertin +2",             when: "2 h" },
  { id: "carmignac", swatch: "accent", title: "Carmignac Patrimoine sort de la liste prescrite",     sub: "8 clients exposés ≥ 5 %",              when: "4 h" },
  { id: "dda",       swatch: "warn",   title: "DDA · fiches conseil à renouveler",                   sub: "12 dossiers · échéance 31/05",          when: "hier" },
  { id: "versement", swatch: "accent", title: "Versement programmé arrivé à terme",                 sub: "SCI Latour · 25 k€ non alloués",        when: "hier" },
  { id: "avgen",     swatch: "accent", title: "AV Generali · écart 4,2 % hors mandat",             sub: "M. Durand",                              when: "2 j" },
];

const nextUp = [
  "Trois fonds dépassent 1,5 % de frais courants chez vos clients équilibrés.",
  "Univers d'investissement : revue annuelle à programmer avant le 30 juin.",
  "Quatre rendez-vous prévus la semaine prochaine sans brief préparé.",
  "Six clients n'ont pas reçu de point patrimonial depuis plus de 9 mois.",
];

export default function AccueilPage() {
  const router = useRouter();

  return (
    <div className="page-b2b" data-screen-label="01 Accueil">
      <div className="eyebrow">Mardi 26 mai · 09:14</div>
      <h1 className="h-hero" style={{ marginTop: 6 }}>Bonjour Camille,</h1>

      <div className="card brief-card" style={{ marginTop: 22 }}>
        <span className="eyebrow eyebrow-live"><span className="dot" />Briefing du jour</span>
        <div className="brief-body">
          <p>
            Trois rendez-vous aujourd'hui, dont <strong>M. Durand à 9 h 30</strong> pour son bilan annuel.
            Sa <strong>fenêtre PER</strong> se referme dans <strong>12 jours</strong> et son contrat AV Generali
            a dévié de <strong>4,2 %</strong> par rapport à l'allocation prévue, il faudra trancher en séance.
          </p>
          <p>
            Côté marchés, Carmignac Patrimoine sort de votre liste prescrite après un recul de 3,2 % sur le mois :
            <strong> 8 clients</strong> y sont exposés à plus de 5 % et méritent un arbitrage cette semaine.
          </p>
        </div>
        <div className="brief-actions">
          <Btn variant="accent" size="lg" icon={<Ico.arrR s={14} />} onClick={() => router.push("/reporting")}>
            Préparer mes rendez-vous
          </Btn>
          <Btn variant="ghost" icon={<Ico.speaker s={14} />}>Écouter (2 min)</Btn>
        </div>
      </div>

      <div className="acc-grid">
        <div className="card card-pad">
          <h2 className="h-section">Aujourd'hui</h2>
          <div style={{ marginTop: 6 }}>
            {meetings.map((m, i) => (
              <div key={i} className="agenda-card" onClick={() => router.push(`/diagnostic?client=${m.clientId}`)}>
                <div className="time-line">
                  <span className="time">{m.time}</span>
                  <span className="dur">{m.dur}</span>
                  <span className="who">{m.who}</span>
                </div>
                <div className="recap">{m.recap}</div>
                <div className="foot-row">
                  <div className="pills">
                    {m.pills.map((p, j) => <Pill key={j} variant={p.v}>{p.t}</Pill>)}
                  </div>
                  <button className="foot-chip">
                    Préparer le brief <Ico.arrR s={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card card-pad">
          <div className="row-between">
            <h2 className="h-section">Alertes récentes</h2>
            <a className="muted-link" onClick={() => router.push("/alertes")} style={{ fontSize: 12, color: "var(--accent-ink)", cursor: "pointer" }}>
              Voir tout →
            </a>
          </div>
          <div style={{ marginTop: 6 }}>
            {recentAlerts.map((a) => (
              <div key={a.id} className="alert-row" onClick={() => router.push("/alertes")} style={{ cursor: "pointer" }}>
                <div className="swatch" style={{ background: a.swatch === "warn" ? "var(--warn)" : "var(--accent)" }} />
                <div style={{ minWidth: 0 }}>
                  <div className="title">{a.title}</div>
                  <div className="sub">{a.sub}</div>
                </div>
                <div className="when">{a.when}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card card-pad next-up">
        <h2 className="h-section">À traiter</h2>
        <div style={{ marginTop: 6 }}>
          {nextUp.map((t, i) => (
            <div key={i} className="next-row" onClick={() => router.push("/alertes")} style={{ cursor: "pointer" }}>
              <div className="n">{String(i + 1).padStart(2, "0")}</div>
              <div className="label">{t}</div>
              <div className="arrow"><Ico.arrR s={14} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

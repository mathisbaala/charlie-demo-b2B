import { Av } from "@/components/kit/primitives";
import type { Client } from "@/lib/data/clients";

export function ClientBanner({ client }: { client: Client }) {
  return (
    <div className="client-banner">
      <Av initials={client.initials} size="xxl" accent />
      <div className="info">
        <div className="name">{client.name}</div>
        <div className="stats-row">
          <div className="stat-item"><div className="lbl">Encours</div><div className="v">{client.encours}</div></div>
          <div className="stat-item"><div className="lbl">Horizon</div><div className="v">{client.horizon}</div></div>
          <div className="stat-item"><div className="lbl">Profil de risque</div><div className="v">{client.profile}</div></div>
        </div>
        <div className="meta-line">
          <span>Dernier rendez-vous, 14 février 2026.</span>
          <span>·</span>
          <span>Prochain rendez-vous, aujourd'hui 9 h 30.</span>
        </div>
      </div>
      <div className="scores">
        <div className="score-block">
          <div className="lbl">Score santé</div>
          <div className="v ok">82</div>
          <div className="bar"><i style={{ width: "82%", background: "var(--ok)" }} /></div>
        </div>
        <div className="score-block">
          <div className="lbl">Score patrimoine</div>
          <div className="v accent">72</div>
          <div className="bar"><i style={{ width: "72%", background: "var(--accent)" }} /></div>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ALERTES, type Alert } from "@/lib/data/alerts";
import { Ico } from "@/components/kit/icons";
import { Btn, Pill, Av } from "@/components/kit/primitives";

function clientIdFromName(name: string): string {
  const n = name.toLowerCase();
  if (n.includes("durand"))  return "durand";
  if (n.includes("vasseur")) return "vasseur";
  if (n.includes("latour"))  return "latour";
  if (n.includes("bertin"))  return "bertin";
  if (n.includes("nguyen"))  return "nguyen";
  return "roche";
}

export default function AlertesPage() {
  const router = useRouter();
  const [filter, setFilter] = useState("all");
  const [activeId, setActiveId] = useState("carmignac");

  const counts = {
    all: ALERTES.length,
    Réglementaire: ALERTES.filter(a => a.cat === "Réglementaire").length,
    Investissement: ALERTES.filter(a => a.cat === "Investissement").length,
  };
  const list = filter === "all" ? ALERTES : ALERTES.filter(a => a.cat === filter);
  const active = ALERTES.find(a => a.id === activeId) || ALERTES[0];

  return (
    <div className="page-b2b" data-screen-label="02 Alertes">
      <h1 className="h-hero">
        Ce que <span className="it">Charlie</span> a repéré pour vous.
      </h1>

      <div className="chips-row" style={{ marginTop: 18 }}>
        <button className={`chip-filter ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>
          Toutes <span className="count">{counts.all}</span>
        </button>
        <button className={`chip-filter ${filter === "Réglementaire" ? "active" : ""}`} onClick={() => setFilter("Réglementaire")}>
          Réglementaire <span className="count">{counts.Réglementaire}</span>
        </button>
        <button className={`chip-filter ${filter === "Investissement" ? "active" : ""}`} onClick={() => setFilter("Investissement")}>
          Investissement <span className="count">{counts.Investissement}</span>
        </button>
        <button className="chip-filter">Archivées</button>
      </div>

      <div className="alerte-split">
        <div className="alerte-list">
          {list.map(a => (
            <div key={a.id} className={`alerte-card ${a.swatch} ${activeId === a.id ? "active" : ""}`} onClick={() => setActiveId(a.id)}>
              <div className="head">
                <div className="meta-line">
                  <Pill variant={a.catVariant}>{a.cat}</Pill>
                  <span className="label">{a.source}</span>
                </div>
                <span className="when">{a.when}</span>
              </div>
              <div className="title">{a.title}</div>
              <div className="desc">{a.sub}</div>
              <div className="foot">
                {a.clients.length > 0 && <>
                  <span>{a.clients.length} client{a.clients.length > 1 ? "s" : ""} concerné{a.clients.length > 1 ? "s" : ""}</span>
                  <span className="dot">·</span>
                </>}
                <span>{a.sourceLabel}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="alerte-detail">
          <div className="row-between">
            <div className="meta-line" style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <Pill variant={active.catVariant}>{active.cat}</Pill>
              <span className="caption">{active.when}</span>
            </div>
          </div>
          <h2>{active.title}</h2>
          <div className="lead">{active.longDesc}</div>

          {active.clients.length > 0 && (
            <div className="block">
              <span className="eyebrow">Clients concernés · {active.clients.length}</span>
              {active.clients.map((c, i) => (
                <div key={i} className="client-row" onClick={() => router.push(`/diagnostic?client=${clientIdFromName(c.name)}`)}>
                  <Av initials={c.initials} size="sm" />
                  <div className="name">{c.name}</div>
                  <div className="enc">{c.encours}</div>
                  <div className="expo">{c.expo}</div>
                  <span className="lnk">Voir le portefeuille →</span>
                </div>
              ))}
            </div>
          )}

          <div className="block">
            <span className="eyebrow">Source</span>
            <div className="src-line">
              <span className="src-label">{active.source}</span>
              <span style={{ color: "var(--ink-2)" }}>{active.sourceLabel}</span>
            </div>
          </div>

          <div className="block">
            <span className="eyebrow">Actions suggérées</span>
            <div className="actions">
              {active.actions.map((act, i) => (
                <Btn key={i} variant={act.variant} size="sm">{act.label}</Btn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

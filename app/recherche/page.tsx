"use client";
import { useState, useMemo } from "react";
import { FUNDS_CHARLIE, FUNDS_RECO, ALL_FUNDS, type Fund } from "@/lib/data/funds";
import { Ico } from "@/components/kit/icons";
import { Btn, ScoreBadge, Av } from "@/components/kit/primitives";
import Sparkline from "@/components/kit/sparkline";
import { ClientPickerBtn } from "@/components/shell/chat-popup";
import { type Client } from "@/lib/data/clients";

function FundCard({ fund, onClick, active }: { fund: Fund; onClick: () => void; active?: boolean }) {
  const isNeg = fund.ytd.startsWith("−") || fund.ytd.startsWith("-");
  return (
    <div className={`fund-card ${active ? "active" : ""}`} onClick={onClick}>
      <div className="row-between" style={{ alignItems: "flex-start" }}>
        <div className="fc-house">
          <span className="fc-glyph">{fund.glyph}</span>
          <span className="fc-house-name">{fund.house}</span>
        </div>
        <ScoreBadge value={fund.score} size="sm" />
      </div>
      <div>
        <div className="fc-name">{fund.name}</div>
        <div className="fc-cat">{fund.cat}</div>
      </div>
      <div className="fc-desc">{fund.desc}</div>
      <div className="fc-spark">
        <Sparkline data={fund.spark} h={36} responsive />
      </div>
      <div className="fc-stats">
        <div className="item">
          <div className="lbl">YTD</div>
          <div className="v" style={{ color: isNeg ? "var(--warn-ink)" : "var(--ok-ink)" }}>{fund.ytd}</div>
        </div>
        <div className="item"><div className="lbl">Frais</div><div className="v">{fund.frais}</div></div>
        <div className="item"><div className="lbl">Encours</div><div className="v">{fund.encours}</div></div>
        <div className="item"><div className="lbl">SRRI</div><div className="v">{fund.srri}</div></div>
      </div>
    </div>
  );
}

function FundDetail({ fund, showWhy, onClose }: { fund: Fund; showWhy: boolean; onClose: () => void }) {
  return (
    <div className="fund-detail">
      <div className="row-between">
        <div className="fc-house" style={{ gap: 10 }}>
          <span className="fc-glyph" style={{ fontSize: 20 }}>{fund.glyph}</span>
          <div>
            <div className="fc-house-name">{fund.house}</div>
            <div className="caption" style={{ marginTop: 2 }}>
              {fund.classification} · <span style={{ fontFamily: "DM Mono, monospace", fontSize: 11 }}>{fund.isin}</span>
            </div>
          </div>
        </div>
        <button className="icon-btn" onClick={onClose}><Ico.x s={14} /></button>
      </div>

      <h2>{fund.name}</h2>
      <div style={{ fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.55 }}>{fund.desclong}</div>

      <div className="row-flex">
        <span className="stars">
          {[1,2,3,4,5].map(i => i <= fund.stars
            ? <Ico.star s={14} key={i} />
            : <span key={i} className="empty"><Ico.starO s={14} /></span>
          )}
        </span>
        <span className="caption">Notation Morningstar · classification {fund.cat}</span>
      </div>

      {showWhy && (
        <div className="why-card">
          <div className="eb">Pourquoi ce fonds correspond</div>
          <div className="body">
            SRRI {fund.srri} cohérent avec un profil équilibré, frais courants à {fund.frais} (cible &lt; 1,5 %), classification {fund.classification} qui colle à votre exigence ISR, et notation Morningstar {fund.stars} étoiles.
          </div>
        </div>
      )}

      <div className="kpi-grid">
        <div className="kpi-cell"><div className="lbl">YTD</div><div className="v">{fund.ytd}</div></div>
        <div className="kpi-cell"><div className="lbl">3 ans</div><div className="v">{fund.ar3}</div></div>
        <div className="kpi-cell"><div className="lbl">5 ans</div><div className="v">{fund.ar5}</div></div>
        <div className="kpi-cell"><div className="lbl">Volatilité</div><div className="v">{fund.vol}</div></div>
        <div className="kpi-cell"><div className="lbl">Max DD</div><div className="v warn">{fund.dd}</div></div>
        <div className="kpi-cell"><div className="lbl">SRRI</div><div className="v">{fund.srr}</div></div>
      </div>

      <div>
        <span className="eyebrow">Performance sur 12 mois</span>
        <div style={{ marginTop: 10 }}><Sparkline data={fund.spark} h={60} strokeWidth={1.6} responsive /></div>
      </div>

      <div>
        <span className="eyebrow">Allocation</span>
        <div style={{ marginTop: 10 }}>
          {[
            { lbl: "Actions Europe",   pct: 38, color: "var(--accent)" },
            { lbl: "Actions monde",    pct: 22, color: "oklch(0.55 0.10 45)" },
            { lbl: "Obligations IG",   pct: 24, color: "oklch(0.45 0.06 60)" },
            { lbl: "Souverain Euro",   pct: 11, color: "oklch(0.70 0.03 80)" },
            { lbl: "Cash",             pct: 5,  color: "oklch(0.85 0.02 75)" },
          ].map((a, i) => (
            <div key={i} className="alloc-row">
              <div className="lbl">{a.lbl}</div>
              <div className="bar"><i style={{ width: `${a.pct}%`, background: a.color }} /></div>
              <div className="pct">{a.pct} %</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <span className="eyebrow">Principales positions</span>
        <div style={{ marginTop: 8 }}>
          {[
            { n: "Novo Nordisk",       w: "4,2 %" },
            { n: "ASML Holding",       w: "3,8 %" },
            { n: "LVMH",               w: "3,4 %" },
            { n: "Schneider Electric", w: "3,1 %" },
            { n: "Air Liquide",        w: "2,9 %" },
          ].map((h, i) => (
            <div key={i} className="holding-row">
              <span className="num">{String(i + 1).padStart(2, "0")}</span>
              <span>{h.n}</span>
              <span className="w">{h.w}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <span className="eyebrow">Carte d'identité</span>
        <div className="id-grid" style={{ marginTop: 8 }}>
          <div className="item"><span className="lbl">Société de gestion</span><span className="v">{fund.house}</span></div>
          <div className="item"><span className="lbl">Encours</span><span className="v">{fund.aum}</span></div>
          <div className="item"><span className="lbl">Classification</span><span className="v">{fund.classification}</span></div>
          <div className="item"><span className="lbl">Création</span><span className="v">{fund.creation}</span></div>
          <div className="item"><span className="lbl">Frais courants</span><span className="v">{fund.frais}</span></div>
          <div className="item"><span className="lbl">ISIN</span><span className="v mono">{fund.isin}</span></div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", paddingTop: 4 }}>
        <Btn variant="accent">Simuler dans un portefeuille</Btn>
        <Btn variant="primary" icon={<Ico.send s={13} />}>Préparer un rapport d'arbitrage</Btn>
        <Btn variant="ghost">Ajouter aux favoris</Btn>
        <Btn variant="ghost" icon={<Ico.download s={13} />}>DICI / Prospectus</Btn>
      </div>
    </div>
  );
}

export default function RecherchePage() {
  const [view, setView] = useState<"home" | "catalog" | "results">("home");
  const [prompt, setPrompt] = useState("");
  const [activeFund, setActiveFund] = useState<string | null>(null);
  const [client, setClient] = useState<Client | null>(null);

  const heading =
    view === "home"    ? "Trouver le bon support." :
    view === "catalog" ? "Tout le catalogue." :
                         "Voici les fonds qui collent.";

  const sortedResults = useMemo(() => [...ALL_FUNDS].sort((a, b) => b.score - a.score), []);

  const search = () => {
    if (!prompt.trim() && !client) setView("catalog");
    else setView("results");
  };

  const headWords = heading.split(" ");
  const headLast = headWords.slice(-1)[0];
  const headRest = headWords.slice(0, -1).join(" ") + " ";

  return (
    <div className="page-narrow-1100" data-screen-label="03 Recherche">
      <h1 className="h-hero">{headRest}<span className="it">{headLast}</span></h1>

      <div className="prompt-card">
        <textarea
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder={'Décrivez le profil. Par exemple : "couple 52 ans, 800 k€ d\'encours, horizon 10 ans, profil équilibré, ISR avec frais inférieurs à 1,5 %".'}
        />
        <div className="prompt-foot">
          {view !== "home" && (
            <Btn variant="ghost" size="sm" icon={<Ico.arrL s={12} />} onClick={() => { setView("home"); setActiveFund(null); }}>
              Retour
            </Btn>
          )}
          {client ? (
            <span className="client-pill">
              <Av initials={client.initials} size="sm" accent />
              {client.name}
              <span className="x" onClick={() => setClient(null)} style={{ cursor: "pointer" }}><Ico.x s={11} /></span>
            </span>
          ) : (
            <>
              <ClientPickerBtn client={client} onChange={setClient} variant="ghost" />
              <Btn variant="ghost" size="sm" icon={<Ico.paperclip s={12} />}>Importer un profil</Btn>
            </>
          )}
          <div className="spacer" />
          <Btn variant="accent" onClick={search}>
            {view === "results" ? "Affiner" : "Chercher"}
          </Btn>
        </div>
      </div>

      {view === "home" && (
        <div style={{ marginTop: 16 }}>
          <div className="fund-section-head">
            <h3>Exclusivement sur <span className="it">Charlie</span></h3>
            <a className="more" onClick={() => setView("catalog")} style={{ cursor: "pointer" }}>Voir tout →</a>
          </div>
          <div className="fund-scroller">
            {FUNDS_CHARLIE.map(f => <FundCard key={f.id} fund={f} onClick={() => { setActiveFund(f.id); setView("catalog"); }} />)}
          </div>

          <div className="fund-section-head">
            <h3>Recommandés pour vos <span className="it">clients</span></h3>
            <a className="more" onClick={() => setView("catalog")} style={{ cursor: "pointer" }}>Voir tout →</a>
          </div>
          <div className="fund-scroller">
            {FUNDS_RECO.map(f => <FundCard key={f.id} fund={f} onClick={() => { setActiveFund(f.id); setView("catalog"); }} />)}
          </div>
        </div>
      )}

      {(view === "catalog" || view === "results") && (
        <div>
          {activeFund ? (
            <div className="fund-split">
              <div className="fund-grid" style={{ margin: 0, maxWidth: "none" }}>
                {(view === "results" ? sortedResults : ALL_FUNDS).map(f => (
                  <FundCard key={f.id} fund={f} onClick={() => setActiveFund(f.id)} active={activeFund === f.id} />
                ))}
              </div>
              <FundDetail
                fund={ALL_FUNDS.find(f => f.id === activeFund)!}
                showWhy={view === "results"}
                onClose={() => setActiveFund(null)}
              />
            </div>
          ) : (
            <div className="fund-grid">
              {(view === "results" ? sortedResults : ALL_FUNDS).map(f => (
                <FundCard key={f.id} fund={f} onClick={() => setActiveFund(f.id)} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

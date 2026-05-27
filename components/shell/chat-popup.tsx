"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Ico } from "@/components/kit/icons";
import { Btn } from "@/components/kit/primitives";
import { Av } from "@/components/kit/primitives";
import { CLIENTS, type Client } from "@/lib/data/clients";

interface ChatMsg {
  role: "bot" | "user";
  text: string;
}

function replyFor(t: string): string {
  const s = t.toLowerCase();
  if (s.includes("durand")) return "M. Durand. 240 k€, profil équilibré, dernier RDV il y a 3 mois. Voulez-vous ouvrir son diagnostic ?";
  if (s.includes("dda")) return "Douze fiches conseil DDA arrivent à échéance le 31 mai. Je peux préparer le mailing de relance.";
  if (s.includes("priips") || s.includes("dic")) return "Quatre DIC PRIIPs à fournir avant le 4 juin. Liste prête côté Alertes.";
  return "Je regarde et reviens vers vous. Pouvez-vous préciser le client ou le sujet ?";
}

interface ChatPopupProps {
  open: boolean;
  onClose: () => void;
}

export function ChatPopup({ open, onClose }: ChatPopupProps) {
  const [messages, setMessages] = useState<ChatMsg[]>([
    { role: "bot", text: "Bonjour Camille, que cherchez-vous ?" },
  ]);
  const [draft, setDraft] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, open]);

  if (!open) return null;

  const send = () => {
    const t = draft.trim();
    if (!t) return;
    setMessages(m => [...m, { role: "user", text: t }]);
    setDraft("");
    setTimeout(() => {
      setMessages(m => [...m, { role: "bot", text: replyFor(t) }]);
    }, 600);
  };

  return (
    <div className="chat-pop" role="dialog">
      <div className="chat-head">
        <div className="badge">
          <Image src="/charlie-logo.png" alt="" width={20} height={20} />
        </div>
        <div className="nm">Charlie</div>
        <button className="close" onClick={onClose} aria-label="Fermer"><Ico.x s={16} /></button>
      </div>
      <div className="chat-body" ref={bodyRef}>
        {messages.map((m, i) => (
          <div key={i} className={`chat-msg ${m.role}`}>{m.text}</div>
        ))}
      </div>
      <div className="chat-foot">
        <input
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") send(); }}
          placeholder="Écrivez à Charlie…"
        />
        <button className="send" onClick={send} aria-label="Envoyer"><Ico.arrUp s={14} /></button>
      </div>
    </div>
  );
}

interface ClientPickerBtnProps {
  client: Client | null;
  onChange: (c: Client) => void;
  variant?: string;
}

export function ClientPickerBtn({ client, onChange, variant = "ghost" }: ClientPickerBtnProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    setTimeout(() => document.addEventListener("mousedown", handler), 0);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div style={{ position: "relative" }} ref={wrapRef}>
      <Btn variant={variant} size="sm" icon={<Ico.user s={12} />} onClick={() => setOpen(o => !o)}>
        {client ? client.name : "Choisir un client"}
      </Btn>
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 6px)", right: 0, width: 280,
          background: "var(--paper)", border: "1px solid var(--line-soft)",
          borderRadius: 12, boxShadow: "0 12px 36px rgba(0,0,0,0.10)", zIndex: 60, padding: 6,
        }}>
          {CLIENTS.map(c => (
            <button key={c.id} className="drop-row" onClick={() => { onChange(c); setOpen(false); }}>
              <Av initials={c.initials} size="sm" accent={c.id === "durand"} />
              <div style={{ flex: 1, textAlign: "left" }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{c.name}</div>
                <div className="caption">{c.encours} · {c.profile}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ChatPopup;

import type { ReactNode } from "react";

export function ScoreBadge({ value, max = 100, size = "md" }: { value: number; max?: number; size?: string }) {
  const cls = value >= 80 ? "score-high" : value >= 60 ? "score-mid" : "score-low";
  return (
    <span className={`score score-${size} ${cls}`}>
      {value}<span className="score-max">/{max}</span>
    </span>
  );
}

export function Pill({ variant = "default", children, className = "" }: { variant?: string; children: ReactNode; className?: string }) {
  return <span className={`pill ${variant !== "default" ? variant : ""} ${className}`.trim()}>{children}</span>;
}

export function Btn({
  variant = "default",
  size = "md",
  icon,
  children,
  onClick,
  disabled,
  type = "button",
}: {
  variant?: string;
  size?: string;
  icon?: ReactNode;
  children?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`btn ${variant !== "default" ? variant : ""} ${size === "sm" ? "sm" : size === "lg" ? "lg" : ""}`.trim()}
      onClick={onClick}
    >
      {icon && <span style={{ display: "inline-flex" }}>{icon}</span>}
      {children}
    </button>
  );
}

export function Av({ initials, size = "md", accent = false }: { initials: string; size?: string; accent?: boolean }) {
  return <span className={`avatar ${size} ${accent ? "accent" : ""}`.trim()}>{initials}</span>;
}

interface SparklineProps {
  data: number[];
  w?: number;
  h?: number;
  color?: string;
  strokeWidth?: number;
  responsive?: boolean;
}

export default function Sparkline({ data, w = 260, h = 36, color = "var(--accent)", strokeWidth = 1.4, responsive = false }: SparklineProps) {
  if (!data || data.length === 0) return null;
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const path = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h * 0.85 - h * 0.075;
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");
  if (responsive) {
    return (
      <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ display: "block" }}>
        <path d={path} fill="none" stroke={color} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: "block" }}>
      <path d={path} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

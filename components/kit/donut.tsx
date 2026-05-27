interface DonutSegment {
  value: number;
  color: string;
}

interface DonutProps {
  segments: DonutSegment[];
  size?: number;
  thickness?: number;
}

export default function Donut({ segments, size = 160, thickness = 22 }: DonutProps) {
  const total = segments.reduce((a, s) => a + s.value, 0) || 1;
  const r = (size - thickness) / 2;
  const c = size / 2;
  const circ = 2 * Math.PI * r;
  let acc = 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={c} cy={c} r={r} fill="none" stroke="var(--paper-2)" strokeWidth={thickness}/>
      {segments.map((seg, i) => {
        const len = (seg.value / total) * circ;
        const off = acc;
        acc += len;
        return (
          <circle
            key={i} cx={c} cy={c} r={r}
            fill="none"
            stroke={seg.color}
            strokeWidth={thickness}
            strokeDasharray={`${len} ${circ - len}`}
            strokeDashoffset={-off}
          />
        );
      })}
    </svg>
  );
}

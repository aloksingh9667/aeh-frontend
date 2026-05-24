type Props = { kind: string; primary?: string; accent?: string };

export function TemplateThumb({ kind, primary = "#0a2540", accent = "#c9a227" }: Props) {
  const W = 120, H = 70;
  const bg = "#f8fafc";
  const muted = "#cbd5e1";
  const dark = "#0f172a";

  switch (kind) {
    case "split": return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <rect width={W} height={H} fill={bg} />
        <rect x="6" y="14" width="50" height="6" fill={primary} />
        <rect x="6" y="24" width="40" height="3" fill={muted} />
        <rect x="6" y="32" width="40" height="3" fill={muted} />
        <rect x="6" y="44" width="22" height="8" rx="2" fill={accent} />
        <rect x="64" y="10" width="50" height="50" rx="3" fill={primary} opacity="0.85" />
      </svg>
    );
    case "center": return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <rect width={W} height={H} fill={dark} />
        <rect x="20" y="22" width="80" height="7" fill="#fff" rx="1" />
        <rect x="30" y="34" width="60" height="3" fill="#fff" opacity="0.7" />
        <rect x="42" y="46" width="36" height="8" rx="2" fill={accent} />
      </svg>
    );
    case "bg": return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <rect width={W} height={H} fill={primary} />
        <rect width={W} height={H} fill="#000" opacity="0.35" />
        <rect x="10" y="20" width="70" height="6" fill="#fff" />
        <rect x="10" y="30" width="50" height="3" fill="#fff" opacity="0.6" />
        <rect x="10" y="44" width="24" height="8" rx="2" fill={accent} />
      </svg>
    );
    case "minimal": return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <rect width={W} height={H} fill="#fff" />
        <rect x="10" y="20" width="60" height="5" fill={dark} />
        <rect x="10" y="30" width="80" height="2" fill={muted} />
        <rect x="10" y="36" width="80" height="2" fill={muted} />
        <rect x="10" y="48" width="20" height="6" rx="1" fill={primary} />
        <rect x="34" y="48" width="20" height="6" rx="1" stroke={primary} strokeWidth="0.7" fill="none" />
      </svg>
    );
    case "card": return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <rect width={W} height={H} fill="#e2e8f0" />
        <rect x="20" y="14" width="80" height="42" rx="3" fill="#fff" stroke={muted} />
        <rect x="26" y="20" width="50" height="4" fill={dark} />
        <rect x="26" y="28" width="68" height="2" fill={muted} />
        <rect x="26" y="34" width="68" height="2" fill={muted} />
        <rect x="26" y="42" width="40" height="8" rx="2" fill={accent} />
      </svg>
    );
    case "yellow": return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <rect width={W} height={H} fill={bg} />
        <rect x="6" y="20" width={W - 12} height="30" rx="3" fill={accent} />
        {[0, 1, 2, 3].map(i => (
          <g key={i} transform={`translate(${12 + i * 27},26)`}>
            <circle cx="6" cy="6" r="4" fill={primary} />
            <rect x="0" y="14" width="20" height="2" fill={primary} opacity="0.7" />
          </g>
        ))}
      </svg>
    );
    case "stripe": return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <rect width={W} height={H} fill="#fff" />
        <line x1="6" y1="20" x2={W - 6} y2="20" stroke={muted} />
        <line x1="6" y1="50" x2={W - 6} y2="50" stroke={muted} />
        {[0, 1, 2, 3].map(i => (
          <g key={i} transform={`translate(${10 + i * 27},28)`}>
            <rect x="0" y="0" width="20" height="6" fill={primary} />
            <rect x="0" y="10" width="14" height="3" fill={muted} />
          </g>
        ))}
      </svg>
    );
    case "dark": return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <rect width={W} height={H} fill={bg} />
        <rect x="6" y="22" width={W - 12} height="26" rx="2" fill={dark} />
        {[0, 1, 2, 3].map(i => (
          <g key={i} transform={`translate(${14 + i * 25},28)`}>
            <rect x="0" y="0" width="14" height="6" fill={accent} />
            <rect x="0" y="10" width="18" height="2" fill="#fff" opacity="0.5" />
          </g>
        ))}
      </svg>
    );
    case "grid2": return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <rect width={W} height={H} fill={bg} />
        {[0, 1, 2, 3].map(i => (
          <rect key={i} x={6 + (i % 2) * 56} y={10 + Math.floor(i / 2) * 26} width="52" height="22" rx="2" fill="#fff" stroke={muted} />
        ))}
        {[0, 1, 2, 3].map(i => (
          <text key={i} x={32 + (i % 2) * 56} y={26 + Math.floor(i / 2) * 26} textAnchor="middle" fontSize="8" fill={primary} fontWeight="bold">99+</text>
        ))}
      </svg>
    );
    case "circles": return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <rect width={W} height={H} fill="#f1f5f9" />
        {[0, 1, 2, 3].map(i => (
          <g key={i} transform={`translate(${18 + i * 24},34)`}>
            <circle cx="0" cy="0" r="9" fill={primary} />
            <text x="0" y="2" textAnchor="middle" fontSize="6" fill={accent} fontWeight="bold">10+</text>
          </g>
        ))}
      </svg>
    );
    case "cards3": return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <rect width={W} height={H} fill={bg} />
        {[0, 1, 2].map(i => (
          <g key={i}>
            <rect x={6 + i * 38} y="14" width="34" height="42" rx="2" fill="#fff" stroke={muted} />
            <rect x={6 + i * 38} y="14" width="34" height="20" fill={primary} opacity={0.8 - i * 0.15} />
            <rect x={10 + i * 38} y="38" width="22" height="3" fill={dark} />
            <rect x={10 + i * 38} y="44" width="18" height="2" fill={muted} />
          </g>
        ))}
      </svg>
    );
    case "list2": return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <rect width={W} height={H} fill={bg} />
        {[0, 1, 2, 3, 4, 5].map(i => (
          <g key={i} transform={`translate(${6 + (i % 2) * 56},${12 + Math.floor(i / 2) * 16})`}>
            <circle cx="4" cy="6" r="3" fill={accent} />
            <rect x="10" y="3" width="40" height="3" fill={dark} />
            <rect x="10" y="8" width="30" height="2" fill={muted} />
          </g>
        ))}
      </svg>
    );
    case "tiles": return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <rect width={W} height={H} fill={bg} />
        {[0, 1, 2, 3, 4, 5, 6, 7].map(i => {
          const colors = [primary, accent, dark, "#0369a1"];
          return <rect key={i} x={6 + (i % 4) * 28} y={10 + Math.floor(i / 4) * 26} width="24" height="22" rx="2" fill={colors[i % 4]} opacity="0.85" />;
        })}
      </svg>
    );
    case "feature": return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <rect width={W} height={H} fill={bg} />
        <rect x="6" y="10" width="62" height="50" rx="2" fill={primary} opacity="0.85" />
        <rect x="14" y="42" width="30" height="3" fill="#fff" />
        <rect x="14" y="48" width="40" height="2" fill="#fff" opacity="0.7" />
        {[0, 1, 2].map(i => (
          <g key={i}>
            <rect x="74" y={10 + i * 17} width="40" height="14" rx="1" fill="#fff" stroke={muted} />
            <rect x="78" y={14 + i * 17} width="28" height="2" fill={dark} />
            <rect x="78" y={19 + i * 17} width="20" height="2" fill={muted} />
          </g>
        ))}
      </svg>
    );
    case "strip": return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <rect width={W} height={H} fill={bg} />
        {[0, 1, 2, 3].map(i => (
          <rect key={i} x={6 + i * 30} y="20" width="26" height="32" rx="2" fill={i === 0 ? primary : "#fff"} stroke={muted} />
        ))}
        <line x1={W - 14} y1="34" x2={W - 6} y2="34" stroke={accent} strokeWidth="2" />
      </svg>
    );
    case "darkBar": return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <rect width={W} height={H} fill={bg} />
        <rect x="0" y="14" width={W} height="42" fill={dark} />
        {[0, 1, 2, 3].map(i => (
          <g key={i} transform={`translate(${15 + i * 25},35)`}>
            <circle cx="0" cy="0" r="6" fill={accent} />
            <rect x="-8" y="10" width="16" height="2" fill="#fff" opacity="0.7" />
          </g>
        ))}
      </svg>
    );
    case "lightC": return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <rect width={W} height={H} fill="#f1f5f9" />
        {[0, 1, 2, 3].map(i => (
          <g key={i} transform={`translate(${8 + i * 27},18)`}>
            <rect x="0" y="0" width="22" height="36" rx="2" fill="#fff" stroke={muted} />
            <circle cx="11" cy="10" r="4" fill={primary} />
            <rect x="2" y="20" width="18" height="2" fill={dark} />
            <rect x="2" y="25" width="14" height="2" fill={muted} />
          </g>
        ))}
      </svg>
    );
    case "timeline": return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <rect width={W} height={H} fill={bg} />
        <line x1="10" y1="35" x2={W - 10} y2="35" stroke={primary} strokeWidth="2" />
        {[0, 1, 2, 3, 4].map(i => (
          <g key={i} transform={`translate(${15 + i * 22},35)`}>
            <circle cx="0" cy="0" r="3" fill={accent} />
            <rect x="-8" y="-20" width="16" height="3" fill={dark} />
            <rect x="-6" y="8" width="12" height="2" fill={muted} />
          </g>
        ))}
      </svg>
    );
    case "trophy": return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <rect width={W} height={H} fill={bg} />
        <circle cx="60" cy="28" r="12" fill={accent} />
        <rect x="56" y="38" width="8" height="8" fill={accent} />
        {[0, 1, 2].map(i => (
          <rect key={i} x="20" y={50 + i * 4} width="80" height="2" fill={muted} />
        ))}
      </svg>
    );
    case "bignum": return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <rect width={W} height={H} fill={bg} />
        {[0, 1, 2, 3].map(i => (
          <g key={i} transform={`translate(${10 + i * 27},35)`}>
            <text x="10" y="3" textAnchor="middle" fontSize="11" fontWeight="900" fill={primary}>9+</text>
            <rect x="0" y="10" width="20" height="2" fill={muted} />
          </g>
        ))}
      </svg>
    );
    case "twoCol": return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <rect width={W} height={H} fill={bg} />
        {[0, 1, 2].map(i => (
          <g key={i} transform={`translate(6,${12 + i * 14})`}>
            <circle cx="4" cy="4" r="3" fill={accent} />
            <rect x="10" y="2" width="40" height="3" fill={dark} />
            <rect x="10" y="7" width="44" height="2" fill={muted} />
          </g>
        ))}
        <rect x="64" y="10" width="50" height="36" rx="2" fill={primary} opacity="0.85" />
        <rect x="64" y="48" width="50" height="14" rx="2" fill={accent} />
      </svg>
    );
    case "grid3": return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <rect width={W} height={H} fill={bg} />
        {[0, 1, 2, 3, 4, 5].map(i => (
          <g key={i} transform={`translate(${6 + (i % 3) * 38},${12 + Math.floor(i / 3) * 26})`}>
            <rect x="0" y="0" width="34" height="22" rx="2" fill="#fff" stroke={muted} />
            <circle cx="6" cy="6" r="2.5" fill={accent} />
            <rect x="2" y="12" width="22" height="2" fill={dark} />
            <rect x="2" y="17" width="18" height="2" fill={muted} />
          </g>
        ))}
      </svg>
    );
    case "iconRow": return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <rect width={W} height={H} fill={bg} />
        {[0, 1, 2, 3].map(i => (
          <circle key={i} cx={20 + i * 27} cy="20" r="6" fill={primary} />
        ))}
        {[0, 1, 2, 3].map(i => (
          <g key={i} transform={`translate(6,${36 + i * 8})`}>
            <rect x="0" y="0" width="3" height="3" fill={accent} />
            <rect x="6" y="0" width="60" height="3" fill={dark} />
          </g>
        ))}
      </svg>
    );
    case "alt": return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <rect width={W} height={H} fill={bg} />
        <rect x="6" y="10" width="40" height="22" rx="2" fill={primary} opacity="0.8" />
        <rect x="50" y="14" width="60" height="3" fill={dark} />
        <rect x="50" y="22" width="50" height="2" fill={muted} />
        <rect x="74" y="38" width="40" height="22" rx="2" fill={accent} opacity="0.8" />
        <rect x="6" y="42" width="60" height="3" fill={dark} />
        <rect x="6" y="50" width="50" height="2" fill={muted} />
      </svg>
    );
    case "check": return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <rect width={W} height={H} fill={bg} />
        <rect x="14" y="10" width="92" height="50" rx="3" fill="#fff" stroke={muted} />
        {[0, 1, 2, 3].map(i => (
          <g key={i} transform={`translate(20,${17 + i * 10})`}>
            <text x="0" y="6" fontSize="8" fill={accent} fontWeight="bold">✓</text>
            <rect x="10" y="3" width="60" height="3" fill={dark} />
          </g>
        ))}
      </svg>
    );
    case "featQ": return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <rect width={W} height={H} fill={bg} />
        <rect x="20" y="14" width="80" height="34" rx="3" fill="#fff" stroke={muted} />
        <text x="26" y="24" fontSize="10" fill={accent} fontWeight="bold">"</text>
        <rect x="34" y="20" width="60" height="2" fill={dark} />
        <rect x="34" y="26" width="60" height="2" fill={dark} />
        <rect x="34" y="32" width="40" height="2" fill={dark} />
        {[0, 1, 2, 3].map(i => (
          <circle key={i} cx={30 + i * 18} cy="56" r="3" fill={i === 0 ? primary : muted} />
        ))}
      </svg>
    );
    case "slider": return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <rect width={W} height={H} fill={bg} />
        <rect x="30" y="14" width="60" height="40" rx="3" fill="#fff" stroke={muted} />
        <rect x="36" y="20" width="48" height="2" fill={dark} />
        <rect x="36" y="26" width="48" height="2" fill={muted} />
        <text x="14" y="38" fontSize="10" fill={primary} fontWeight="bold">‹</text>
        <text x="100" y="38" fontSize="10" fill={primary} fontWeight="bold">›</text>
        <circle cx="56" cy="60" r="2" fill={accent} />
        <circle cx="64" cy="60" r="2" fill={muted} />
      </svg>
    );
    case "wall": return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <rect width={W} height={H} fill={bg} />
        {[
          [6, 10, 30, 24], [40, 10, 32, 18], [76, 10, 38, 30],
          [6, 38, 32, 22], [42, 32, 30, 28], [76, 44, 38, 16],
        ].map((r, i) => (
          <rect key={i} x={r[0]} y={r[1]} width={r[2]} height={r[3]} rx="2" fill="#fff" stroke={muted} />
        ))}
      </svg>
    );
    case "stripT": return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <rect width={W} height={H} fill={bg} />
        {[0, 1, 2, 3].map(i => (
          <g key={i} transform={`translate(${6 + i * 28},22)`}>
            <circle cx="6" cy="8" r="4" fill={primary} />
            <rect x="0" y="16" width="24" height="2" fill={dark} />
            <rect x="0" y="20" width="20" height="2" fill={muted} />
          </g>
        ))}
      </svg>
    );
    case "list": return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <rect width={W} height={H} fill={bg} />
        {[0, 1, 2, 3].map(i => (
          <g key={i} transform={`translate(10,${12 + i * 14})`}>
            <rect x="0" y="0" width="80" height="3" fill={dark} />
            <rect x="0" y="6" width="40" height="2" fill={muted} />
          </g>
        ))}
      </svg>
    );
    case "mag": return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <rect width={W} height={H} fill={bg} />
        <rect x="6" y="10" width="56" height="50" rx="2" fill={primary} opacity="0.85" />
        <rect x="14" y="44" width="30" height="3" fill="#fff" />
        <rect x="14" y="50" width="40" height="2" fill="#fff" opacity="0.7" />
        <rect x="68" y="10" width="46" height="22" rx="2" fill="#fff" stroke={muted} />
        <rect x="72" y="14" width="30" height="3" fill={dark} />
        <rect x="72" y="20" width="38" height="2" fill={muted} />
        <rect x="68" y="36" width="46" height="22" rx="2" fill="#fff" stroke={muted} />
        <rect x="72" y="40" width="30" height="3" fill={dark} />
        <rect x="72" y="46" width="38" height="2" fill={muted} />
      </svg>
    );
    case "banner": return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <rect width={W} height={H} fill={bg} />
        <rect x="0" y="20" width={W} height="30" fill={dark} />
        <rect x="20" y="28" width="40" height="3" fill="#fff" />
        <rect x="20" y="35" width="50" height="2" fill="#fff" opacity="0.7" />
        <rect x="76" y="32" width="34" height="8" rx="2" fill={accent} />
      </svg>
    );
    case "grad": return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0%" stopColor={primary} />
            <stop offset="100%" stopColor={accent} />
          </linearGradient>
        </defs>
        <rect width={W} height={H} fill="url(#g1)" />
        <rect x="20" y="22" width="80" height="6" fill="#fff" />
        <rect x="40" y="42" width="40" height="10" rx="2" fill="#fff" />
      </svg>
    );
    case "minStrip": return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <rect width={W} height={H} fill="#fff" />
        <line x1="0" y1="20" x2={W} y2="20" stroke={muted} />
        <line x1="0" y1="50" x2={W} y2="50" stroke={muted} />
        <rect x="20" y="32" width="44" height="3" fill={dark} />
        <rect x="78" y="28" width="32" height="10" rx="2" fill={primary} />
      </svg>
    );
    case "iconGrid": return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <rect width={W} height={H} fill={bg} />
        {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
          <g key={i} transform={`translate(${10 + (i % 4) * 26},${14 + Math.floor(i / 4) * 26})`}>
            <rect x="0" y="0" width="22" height="22" rx="3" fill="#fff" stroke={muted} />
            <circle cx="11" cy="9" r="3" fill={primary} />
            <rect x="3" y="15" width="16" height="2" fill={muted} />
          </g>
        ))}
      </svg>
    );
    case "tags": return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <rect width={W} height={H} fill={bg} />
        {[
          [10, 16, 26], [40, 16, 32], [76, 16, 36],
          [10, 30, 36], [50, 30, 30], [86, 30, 26],
          [10, 44, 28], [42, 44, 40], [86, 44, 26],
        ].map((r, i) => (
          <rect key={i} x={r[0]} y={r[1]} width={r[2]} height="9" rx="4.5" fill={i % 2 ? accent : primary} opacity="0.8" />
        ))}
      </svg>
    );
    case "ftrDef": return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <rect width={W} height={H} fill={dark} />
        {[0, 1, 2, 3].map(i => (
          <g key={i} transform={`translate(${6 + i * 28},10)`}>
            <rect x="0" y="0" width="24" height="3" fill={accent} />
            <rect x="0" y="8" width="20" height="2" fill="#fff" opacity="0.6" />
            <rect x="0" y="14" width="20" height="2" fill="#fff" opacity="0.6" />
            <rect x="0" y="20" width="20" height="2" fill="#fff" opacity="0.6" />
          </g>
        ))}
        <line x1="0" y1="50" x2={W} y2="50" stroke="#fff" strokeOpacity="0.2" />
      </svg>
    );
    case "ftrMin": return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <rect width={W} height={H} fill={dark} />
        <rect x="6" y="14" width="50" height="3" fill={accent} />
        <rect x="6" y="22" width="60" height="2" fill="#fff" opacity="0.6" />
        <rect x="6" y="28" width="50" height="2" fill="#fff" opacity="0.6" />
        <rect x="70" y="14" width="44" height="3" fill={accent} />
        <rect x="70" y="22" width="40" height="2" fill="#fff" opacity="0.6" />
        <rect x="70" y="28" width="40" height="2" fill="#fff" opacity="0.6" />
      </svg>
    );
    case "ftrCtr": return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <rect width={W} height={H} fill={dark} />
        <circle cx="60" cy="20" r="6" fill={accent} />
        {[0, 1, 2, 3, 4].map(i => (
          <rect key={i} x={20 + i * 18} y="36" width="14" height="2" fill="#fff" opacity="0.6" />
        ))}
      </svg>
    );
    case "ftrLite": return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <rect width={W} height={H} fill="#f1f5f9" />
        {[0, 1, 2, 3].map(i => (
          <g key={i} transform={`translate(${6 + i * 28},10)`}>
            <rect x="0" y="0" width="24" height="3" fill={primary} />
            <rect x="0" y="8" width="20" height="2" fill={muted} />
            <rect x="0" y="14" width="20" height="2" fill={muted} />
          </g>
        ))}
      </svg>
    );
    case "ftrStrip": return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <rect width={W} height={H} fill={dark} />
        <rect x="6" y="28" width="20" height="3" fill={accent} />
        {[0, 1, 2, 3, 4].map(i => (
          <rect key={i} x={36 + i * 14} y="29" width="10" height="2" fill="#fff" opacity="0.6" />
        ))}
        <rect x="100" y="26" width="14" height="6" rx="1" fill={accent} />
      </svg>
    );
    default: return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <rect width={W} height={H} fill={bg} />
        <rect x="10" y="20" width="100" height="3" fill={muted} />
        <rect x="10" y="30" width="80" height="3" fill={muted} />
      </svg>
    );
  }
}

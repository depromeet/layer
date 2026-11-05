type ArtProps = { className?: string };

const defs = (id: string) => (
  <defs>
    <linearGradient id={`${id}-blue`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#a9c4fc" />
      <stop offset="1" stopColor="#6c9cfa" />
    </linearGradient>
    <linearGradient id={`${id}-purple`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#b3abf0" />
      <stop offset="1" stopColor="#8d83e0" />
    </linearGradient>
    <linearGradient id={`${id}-mint`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#f1fff8" />
      <stop offset="1" stopColor="#bdeed6" />
    </linearGradient>
    <linearGradient id={`${id}-white`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#ffffff" />
      <stop offset="1" stopColor="#e9eefb" />
    </linearGradient>
    <filter id={`${id}-blur`} x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="7" />
    </filter>
  </defs>
);

export function ThinkArt({ className }: ArtProps) {
  const id = "think";
  return (
    <svg className={className} viewBox="0 0 240 240" aria-hidden="true">
      {defs(id)}
      <ellipse cx="116" cy="206" rx="70" ry="9" fill="#2b3e64" opacity="0.22" filter={`url(#${id}-blur)`} />
      <path d="M62 150 L52 190 Q51 196 58 193 L96 168 Z" fill={`url(#${id}-blue)`} />
      <rect x="26" y="44" width="170" height="124" rx="50" fill={`url(#${id}-blue)`} />
      <rect x="48" y="66" width="126" height="80" rx="32" fill={`url(#${id}-white)`} />
      <ellipse cx="68" cy="58" rx="26" ry="8" fill="#fff" opacity="0.4" transform="rotate(-12 68 58)" />
      <g transform="rotate(38 176 120)">
        <rect x="164" y="52" width="26" height="92" rx="9" fill={`url(#${id}-blue)`} />
        <rect x="164" y="42" width="26" height="22" rx="9" fill="#fff" />
        <rect x="164" y="60" width="26" height="9" fill="#8fb2fb" />
        <path d="M164 142 L190 142 L177 172 Z" fill="#f4f6fb" />
        <path d="M171 160 L183 160 L177 172 Z" fill="#6c9cfa" />
      </g>
    </svg>
  );
}

export function InsightArt({ className }: ArtProps) {
  const id = "insight";
  return (
    <svg className={className} viewBox="0 0 240 240" aria-hidden="true">
      {defs(id)}
      <ellipse cx="124" cy="214" rx="66" ry="8" fill="#544d94" opacity="0.2" filter={`url(#${id}-blur)`} />
      <line x1="150" y1="150" x2="196" y2="196" stroke={`url(#${id}-blue)`} strokeWidth="30" strokeLinecap="round" />
      <circle cx="100" cy="100" r="66" fill={`url(#${id}-purple)`} />
      <circle cx="100" cy="100" r="46" fill="#d6e5ff" />
      <path d="M68 92 Q78 66 104 62" fill="none" stroke="#fff" strokeWidth="8" strokeLinecap="round" opacity="0.85" />
      <path d="M176 36 Q178 54 196 56 Q178 58 176 76 Q174 58 156 56 Q174 54 176 36 Z" fill={`url(#${id}-mint)`} />
      <circle cx="206" cy="92" r="6" fill="#8d83e0" />
      <circle cx="148" cy="30" r="5" fill="#6c9cfa" />
    </svg>
  );
}

export function ActionArt({ className }: ArtProps) {
  const id = "action";
  return (
    <svg className={className} viewBox="0 0 240 240" aria-hidden="true">
      {defs(id)}
      <ellipse cx="86" cy="214" rx="56" ry="8" fill="#000" opacity="0.28" filter={`url(#${id}-blur)`} />
      <path d="M88 52 Q118 36 146 50 T204 48 Q194 78 204 106 Q176 120 146 108 T88 116 Z" fill={`url(#${id}-mint)`} />
      <circle cx="144" cy="80" r="26" fill={`url(#${id}-blue)`} />
      <path d="M132 80 L141 89 L157 71" fill="none" stroke="#f1fff8" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="72" y="36" width="18" height="150" rx="9" fill={`url(#${id}-blue)`} />
      <circle cx="81" cy="34" r="14" fill={`url(#${id}-blue)`} />
      <path d="M44 198 Q44 176 81 176 Q118 176 118 198 Q118 208 81 208 Q44 208 44 198 Z" fill={`url(#${id}-mint)`} />
    </svg>
  );
}

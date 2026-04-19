type Props = { size?: number }
export function KianMascot({ size = 140 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg">
      <rect x="82" y="175" width="14" height="30" rx="5" fill="#3E4E66" />
      <rect x="104" y="175" width="14" height="30" rx="5" fill="#3E4E66" />
      <ellipse cx="89" cy="208" rx="12" ry="5" fill="#E45A3F" />
      <ellipse cx="111" cy="208" rx="12" ry="5" fill="#E45A3F" />
      {/* blue sweater */}
      <path d="M60 105 Q100 90 140 105 L144 185 Q100 198 56 185 Z" fill="#3B6AA0" />
      {/* pattern dots */}
      <g fill="#A7CBE8" opacity="0.8">
        <circle cx="72" cy="130" r="3" /><circle cx="88" cy="138" r="3" /><circle cx="104" cy="130" r="3" />
        <circle cx="120" cy="140" r="3" /><circle cx="136" cy="132" r="3" />
        <circle cx="78" cy="155" r="3" /><circle cx="96" cy="160" r="3" /><circle cx="114" cy="155" r="3" /><circle cx="130" cy="160" r="3" />
      </g>
      {/* green collar */}
      <path d="M80 100 L120 100 L115 112 L85 112 Z" fill="#3B8B4A" />
      {/* arms */}
      <path d="M60 110 Q48 140 60 165" stroke="#D8A680" strokeWidth="13" strokeLinecap="round" fill="none" />
      <path d="M140 110 Q152 140 140 165" stroke="#D8A680" strokeWidth="13" strokeLinecap="round" fill="none" />
      <circle cx="60" cy="165" r="8" fill="#D8A680" />
      <circle cx="140" cy="165" r="8" fill="#D8A680" />
      {/* neck + head */}
      <rect x="92" y="85" width="16" height="14" fill="#D8A680" />
      <circle cx="100" cy="67" r="33" fill="#D8A680" />
      {/* hair short dark */}
      <path d="M70 58 Q75 35 100 32 Q125 35 130 58 Q128 44 100 42 Q78 42 72 58 Z" fill="#2a1a0c" />
      <path d="M72 58 L70 72 L80 60 Q90 50 100 52 Q112 50 120 60 L130 72 L128 58 Z" fill="#2a1a0c" />
      {/* eyes */}
      <circle cx="90" cy="68" r="3.5" fill="#2a1a0c" />
      <circle cx="110" cy="68" r="3.5" fill="#2a1a0c" />
      <circle cx="91" cy="67" r="1" fill="#fff" />
      <circle cx="111" cy="67" r="1" fill="#fff" />
      {/* smile */}
      <path d="M90 80 Q100 88 110 80" stroke="#2a1a0c" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="82" cy="76" rx="4" ry="2" fill="#F8A5B8" opacity="0.6" />
      <ellipse cx="118" cy="76" rx="4" ry="2" fill="#F8A5B8" opacity="0.6" />
    </svg>
  )
}

type Props = { size?: number }
export function PapaAvatar({ size = 140 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      {/* black t-shirt */}
      <path d="M48 180 Q52 140 72 132 L128 132 Q148 140 152 180 Z" fill="#2b2b2b" />
      {/* neck + head */}
      <rect x="92" y="112" width="16" height="22" fill="#D99C74" />
      <circle cx="100" cy="85" r="40" fill="#D99C74" />
      {/* bald head shine */}
      <ellipse cx="92" cy="55" rx="10" ry="4" fill="#E8B28E" opacity="0.7" />
      {/* beard (short, stubbly) */}
      <path d="M72 100 Q100 125 128 100 Q128 118 100 125 Q72 118 72 100 Z" fill="#3a2820" opacity="0.85" />
      {/* glasses */}
      <circle cx="85" cy="86" r="11" fill="none" stroke="#2a1a0c" strokeWidth="2.2" />
      <circle cx="115" cy="86" r="11" fill="none" stroke="#2a1a0c" strokeWidth="2.2" />
      <line x1="96" y1="86" x2="104" y2="86" stroke="#2a1a0c" strokeWidth="2" />
      {/* eyes behind glasses */}
      <circle cx="85" cy="86" r="3" fill="#2a1a0c" />
      <circle cx="115" cy="86" r="3" fill="#2a1a0c" />
      <circle cx="86" cy="85" r="0.8" fill="#fff" />
      <circle cx="116" cy="85" r="0.8" fill="#fff" />
      {/* eyebrows */}
      <path d="M76 74 Q85 70 94 74" stroke="#2a1a0c" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M106 74 Q115 70 124 74" stroke="#2a1a0c" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* smile */}
      <path d="M88 108 Q100 114 112 108" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}

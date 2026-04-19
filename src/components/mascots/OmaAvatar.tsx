type Props = { size?: number }
export function OmaAvatar({ size = 140 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      {/* cozy teal cardigan */}
      <path d="M48 180 Q52 140 75 130 L125 130 Q148 140 152 180 Z" fill="#5E8B7E" />
      <path d="M75 130 L100 175 L125 130 Z" fill="#EDD9B7" />
      <circle cx="100" cy="150" r="2.5" fill="#3a3a3a" />
      <circle cx="100" cy="162" r="2.5" fill="#3a3a3a" />
      {/* neck + head */}
      <rect x="92" y="112" width="16" height="22" fill="#F1D6BC" />
      <circle cx="100" cy="85" r="40" fill="#F1D6BC" />
      {/* grey-blonde hair */}
      <path d="M60 78 Q66 42 100 40 Q134 42 140 78 Q132 64 100 60 Q70 62 60 78 Z" fill="#C7BDAE" />
      <path d="M60 78 Q58 100 72 114 L74 100 Q68 92 66 82 Z" fill="#C7BDAE" />
      <path d="M140 78 Q142 100 128 114 L126 100 Q132 92 134 82 Z" fill="#C7BDAE" />
      {/* round glasses */}
      <circle cx="86" cy="86" r="10" fill="none" stroke="#2a1a0c" strokeWidth="2" />
      <circle cx="114" cy="86" r="10" fill="none" stroke="#2a1a0c" strokeWidth="2" />
      <line x1="96" y1="86" x2="104" y2="86" stroke="#2a1a0c" strokeWidth="2" />
      {/* eyes */}
      <circle cx="86" cy="86" r="2.5" fill="#2a4a8c" />
      <circle cx="114" cy="86" r="2.5" fill="#2a4a8c" />
      {/* warm smile */}
      <path d="M86 110 Q100 118 114 110" stroke="#7a2f2f" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="78" cy="102" rx="5" ry="2.5" fill="#F8A5B8" opacity="0.7" />
      <ellipse cx="122" cy="102" rx="5" ry="2.5" fill="#F8A5B8" opacity="0.7" />
    </svg>
  )
}

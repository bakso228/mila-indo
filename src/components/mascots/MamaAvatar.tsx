type Props = { size?: number }
export function MamaAvatar({ size = 140 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      {/* grey collared top */}
      <path d="M50 180 Q55 140 75 130 L125 130 Q145 140 150 180 Z" fill="#9CA3AF" />
      <path d="M75 130 L90 148 L100 140 L110 148 L125 130 Z" fill="#BDBDBD" />
      {/* necklace */}
      <path d="M85 138 Q100 148 115 138" stroke="#FFD54F" strokeWidth="1.5" fill="none" />
      {/* neck */}
      <rect x="92" y="110" width="16" height="22" fill="#E4B48C" />
      {/* head */}
      <circle cx="100" cy="85" r="40" fill="#E4B48C" />
      {/* short dark hair framing face */}
      <path d="M60 78 Q68 42 100 40 Q132 42 140 78 Q135 60 100 58 Q72 60 66 78 Q66 90 60 95 Z" fill="#1E1510" />
      <path d="M60 95 Q58 108 68 120 L72 108 Q66 100 66 90 Z" fill="#1E1510" />
      <path d="M140 95 Q142 108 132 120 L128 108 Q134 100 134 90 Z" fill="#1E1510" />
      {/* eyes - slight almond */}
      <path d="M84 88 Q90 85 96 88 Q90 92 84 88 Z" fill="#2a1a0c" />
      <path d="M104 88 Q110 85 116 88 Q110 92 104 88 Z" fill="#2a1a0c" />
      {/* smile gentle */}
      <path d="M88 104 Q100 112 112 104" stroke="#7a2f2f" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="80" cy="100" rx="5" ry="2.5" fill="#F8A5B8" opacity="0.6" />
      <ellipse cx="120" cy="100" rx="5" ry="2.5" fill="#F8A5B8" opacity="0.6" />
    </svg>
  )
}

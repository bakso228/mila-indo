type Props = { size?: number }
export function YangkungAvatar({ size = 140 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      {/* beige shirt */}
      <path d="M48 180 Q52 140 75 130 L125 130 Q148 140 152 180 Z" fill="#E8D5A3" />
      <rect x="96" y="132" width="8" height="44" fill="#D7BE85" />
      {/* neck + head */}
      <rect x="92" y="112" width="16" height="22" fill="#D6A67C" />
      <circle cx="100" cy="85" r="40" fill="#D6A67C" />
      {/* grey hair, receding */}
      <path d="M66 72 Q74 48 100 50 Q126 48 134 72 Q128 64 100 64 Q72 64 66 72 Z" fill="#7a7a7a" />
      <path d="M66 72 L62 92 Q66 86 70 84 Z" fill="#7a7a7a" />
      <path d="M134 72 L138 92 Q134 86 130 84 Z" fill="#7a7a7a" />
      {/* eyes, smiling */}
      <path d="M82 88 Q90 94 98 88" stroke="#2a1a0c" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M102 88 Q110 94 118 88" stroke="#2a1a0c" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* mustache */}
      <path d="M84 106 Q100 112 116 106 Q110 112 100 112 Q90 112 84 106 Z" fill="#4a4a4a" />
      {/* smile */}
      <path d="M90 116 Q100 120 110 116" stroke="#7a2f2f" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* cheeks */}
      <ellipse cx="78" cy="102" rx="5" ry="2.5" fill="#E99C8C" opacity="0.6" />
      <ellipse cx="122" cy="102" rx="5" ry="2.5" fill="#E99C8C" opacity="0.6" />
    </svg>
  )
}

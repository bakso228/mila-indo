type Props = { size?: number }
export function YangtiAvatar({ size = 140 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      {/* batik top */}
      <path d="M48 180 Q52 140 75 130 L125 130 Q148 140 152 180 Z" fill="#B85C4C" />
      <g fill="#F2D7A3" opacity="0.6">
        <circle cx="70" cy="150" r="4" /><circle cx="90" cy="160" r="4" /><circle cx="110" cy="150" r="4" />
        <circle cx="130" cy="160" r="4" /><circle cx="80" cy="170" r="4" /><circle cx="120" cy="170" r="4" />
      </g>
      {/* neck + head */}
      <rect x="92" y="110" width="16" height="22" fill="#E3B68A" />
      <circle cx="100" cy="85" r="40" fill="#E3B68A" />
      {/* grey bun hair */}
      <path d="M62 78 Q66 44 100 42 Q134 44 138 78 Q130 62 100 60 Q70 62 62 78 Z" fill="#6b6b6b" />
      <circle cx="100" cy="40" r="14" fill="#6b6b6b" />
      <circle cx="100" cy="40" r="8" fill="#8a8a8a" />
      {/* eyes — warm smiling */}
      <path d="M82 88 Q90 94 98 88" stroke="#2a1a0c" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M102 88 Q110 94 118 88" stroke="#2a1a0c" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* nose */}
      <path d="M98 96 Q100 104 102 96" stroke="#b08765" strokeWidth="1.2" fill="none" />
      {/* smile + cheeks */}
      <path d="M86 110 Q100 118 114 110" stroke="#7a2f2f" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="78" cy="102" rx="5" ry="2.5" fill="#E99C8C" opacity="0.7" />
      <ellipse cx="122" cy="102" rx="5" ry="2.5" fill="#E99C8C" opacity="0.7" />
    </svg>
  )
}

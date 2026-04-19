type Props = { size?: number }

// Yangti — maternal grandma from Jakarta.
// Visual signature: pink flower in a sanggul bun, batik kebaya top, warm tan skin.
export function YangtiAvatar({ size = 140 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      {/* batik-inspired top (brown base with cream dots) */}
      <path d="M40 190 Q45 140 72 130 L128 130 Q155 140 160 190 Z" fill="#8D5524" />
      <g fill="#F2E6C8" opacity="0.85">
        <circle cx="70" cy="150" r="3.5" /><circle cx="90" cy="158" r="3.5" />
        <circle cx="110" cy="150" r="3.5" /><circle cx="130" cy="160" r="3.5" />
        <circle cx="80" cy="170" r="3.5" /><circle cx="120" cy="170" r="3.5" />
        <circle cx="100" cy="180" r="3.5" />
      </g>
      <path d="M82 130 L100 148 L118 130" stroke="#F2E6C8" strokeWidth="2" fill="none" />

      {/* neck */}
      <rect x="92" y="112" width="16" height="22" fill="#D8A46C" />

      {/* head */}
      <circle cx="100" cy="85" r="40" fill="#D8A46C" />

      {/* sanggul bun hair */}
      <path d="M60 78 Q66 42 100 42 Q134 42 140 78 Q132 62 100 60 Q70 62 60 78 Z" fill="#2a1a0c" />
      {/* bun on top */}
      <ellipse cx="100" cy="40" rx="20" ry="15" fill="#2a1a0c" />
      {/* pink flower on bun */}
      <g transform="translate(100 35)">
        <circle cx="-5" cy="-2" r="5" fill="#FF6B9D" />
        <circle cx="5" cy="-2" r="5" fill="#FF6B9D" />
        <circle cx="0" cy="-8" r="5" fill="#FF6B9D" />
        <circle cx="-3" cy="4" r="5" fill="#FF6B9D" />
        <circle cx="3" cy="4" r="5" fill="#FF6B9D" />
        <circle cx="0" cy="-1" r="3" fill="#FFE66D" />
      </g>
      {/* side hair framing cheeks */}
      <path d="M60 80 Q58 108 72 120 L74 100 Q66 92 64 82 Z" fill="#2a1a0c" />
      <path d="M140 80 Q142 108 128 120 L126 100 Q134 92 136 82 Z" fill="#2a1a0c" />

      {/* eyes — warm smiling curves */}
      <path d="M82 88 Q90 94 98 88" stroke="#2a1a0c" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M102 88 Q110 94 118 88" stroke="#2a1a0c" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* nose */}
      <path d="M98 96 Q100 104 102 96" stroke="#a07548" strokeWidth="1.2" fill="none" />

      {/* smile */}
      <path d="M86 110 Q100 118 114 110" stroke="#7a2f2f" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* earrings */}
      <circle cx="61" cy="95" r="2.5" fill="#FFD54F" />
      <circle cx="139" cy="95" r="2.5" fill="#FFD54F" />

      {/* cheeks */}
      <ellipse cx="76" cy="102" rx="5" ry="2.5" fill="#E99C8C" opacity="0.7" />
      <ellipse cx="124" cy="102" rx="5" ry="2.5" fill="#E99C8C" opacity="0.7" />
    </svg>
  )
}

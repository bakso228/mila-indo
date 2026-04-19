type Props = { size?: number }

// Yangkung — maternal grandpa from Jakarta.
// Visual signature: black peci (Indonesian traditional cap), grey mustache, warm tan skin.
export function YangkungAvatar({ size = 140 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      {/* olive/tan shirt with batik trim */}
      <path d="M40 190 Q45 140 72 130 L128 130 Q155 140 160 190 Z" fill="#C9A26B" />
      <rect x="96" y="132" width="8" height="44" fill="#8D5524" />
      <g fill="#8D5524" opacity="0.7">
        <circle cx="70" cy="160" r="3" /><circle cx="90" cy="170" r="3" />
        <circle cx="110" cy="160" r="3" /><circle cx="130" cy="170" r="3" />
      </g>

      {/* neck */}
      <rect x="92" y="112" width="16" height="22" fill="#D08B5B" />

      {/* head */}
      <circle cx="100" cy="85" r="40" fill="#D08B5B" />

      {/* peci (black Indonesian cap) — the signature */}
      <path d="M60 70 Q60 50 100 48 Q140 50 140 70 L140 80 Q140 68 100 66 Q60 68 60 80 Z" fill="#1a1a1a" />
      <ellipse cx="100" cy="70" rx="42" ry="8" fill="#2a2a2a" />
      {/* small vertical threads (texture) */}
      <g stroke="#3a3a3a" strokeWidth="1">
        <line x1="80" y1="56" x2="80" y2="76" />
        <line x1="100" y1="52" x2="100" y2="74" />
        <line x1="120" y1="56" x2="120" y2="76" />
      </g>

      {/* eyebrows */}
      <path d="M76 80 Q86 76 96 82" stroke="#5a5a5a" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M104 82 Q114 76 124 80" stroke="#5a5a5a" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* eyes — smiling curves */}
      <path d="M82 92 Q90 98 98 92" stroke="#2a1a0c" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M102 92 Q110 98 118 92" stroke="#2a1a0c" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* nose */}
      <path d="M98 100 Q100 108 102 100" stroke="#a07548" strokeWidth="1.2" fill="none" />

      {/* grey mustache — the second signature */}
      <path d="M82 114 Q92 108 100 112 Q108 108 118 114 Q110 120 100 118 Q90 120 82 114 Z" fill="#9a9a9a" stroke="#7a7a7a" strokeWidth="1" />

      {/* smile */}
      <path d="M90 124 Q100 128 110 124" stroke="#7a2f2f" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* cheeks */}
      <ellipse cx="76" cy="108" rx="5" ry="2.5" fill="#E99C8C" opacity="0.6" />
      <ellipse cx="124" cy="108" rx="5" ry="2.5" fill="#E99C8C" opacity="0.6" />
    </svg>
  )
}

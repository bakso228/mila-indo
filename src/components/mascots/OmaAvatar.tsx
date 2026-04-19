type Props = { size?: number }

// Oma — paternal grandma from Nürnberg.
// Visual signature: heart-print red cardigan over a white blouse, round glasses,
// grey-blonde hair, lighter skin.
export function OmaAvatar({ size = 140 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      {/* red cardigan */}
      <path d="M40 190 Q45 140 72 130 L128 130 Q155 140 160 190 Z" fill="#C1272D" />
      {/* hearts pattern */}
      <g fill="#FFE2E2">
        <path d="M70 152 C67 148 62 150 64 155 L70 161 L76 155 C78 150 73 148 70 152 Z" />
        <path d="M100 168 C97 164 92 166 94 171 L100 177 L106 171 C108 166 103 164 100 168 Z" />
        <path d="M130 152 C127 148 122 150 124 155 L130 161 L136 155 C138 150 133 148 130 152 Z" />
      </g>
      {/* white blouse triangle */}
      <path d="M78 130 L100 170 L122 130 Z" fill="#FAFAFA" />
      {/* two cardigan buttons */}
      <circle cx="92" cy="148" r="2.5" fill="#8a0000" />
      <circle cx="108" cy="148" r="2.5" fill="#8a0000" />

      {/* neck */}
      <rect x="92" y="112" width="16" height="22" fill="#F1D6BC" />

      {/* head */}
      <circle cx="100" cy="85" r="40" fill="#F1D6BC" />

      {/* grey-blonde hair */}
      <path d="M60 78 Q66 42 100 40 Q134 42 140 78 Q132 64 100 60 Q70 62 60 78 Z" fill="#CFC1A7" />
      <path d="M60 78 Q58 102 72 118 L74 100 Q66 92 64 82 Z" fill="#CFC1A7" />
      <path d="M140 78 Q142 102 128 118 L126 100 Q134 92 136 82 Z" fill="#CFC1A7" />
      {/* grey streaks */}
      <path d="M82 48 Q92 44 104 46" stroke="#9a9a9a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M108 46 Q118 46 130 52" stroke="#9a9a9a" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* round glasses — signature */}
      <circle cx="86" cy="86" r="11" fill="rgba(255,255,255,0.5)" stroke="#2a1a0c" strokeWidth="2.2" />
      <circle cx="114" cy="86" r="11" fill="rgba(255,255,255,0.5)" stroke="#2a1a0c" strokeWidth="2.2" />
      <line x1="97" y1="86" x2="103" y2="86" stroke="#2a1a0c" strokeWidth="2" />

      {/* eyes — blue */}
      <circle cx="86" cy="86" r="3" fill="#2a4a8c" />
      <circle cx="114" cy="86" r="3" fill="#2a4a8c" />
      <circle cx="87" cy="85" r="0.9" fill="#fff" />
      <circle cx="115" cy="85" r="0.9" fill="#fff" />

      {/* eyebrows */}
      <path d="M77 73 Q86 70 95 73" stroke="#8a8a8a" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M105 73 Q114 70 123 73" stroke="#8a8a8a" strokeWidth="1.6" fill="none" strokeLinecap="round" />

      {/* warm smile */}
      <path d="M86 110 Q100 118 114 110" stroke="#7a2f2f" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <ellipse cx="76" cy="102" rx="5" ry="2.5" fill="#F8A5B8" opacity="0.8" />
      <ellipse cx="124" cy="102" rx="5" ry="2.5" fill="#F8A5B8" opacity="0.8" />

      {/* pearl earrings */}
      <circle cx="61" cy="92" r="2.5" fill="#FAFAFA" stroke="#aaa" strokeWidth="0.5" />
      <circle cx="139" cy="92" r="2.5" fill="#FAFAFA" stroke="#aaa" strokeWidth="0.5" />
    </svg>
  )
}

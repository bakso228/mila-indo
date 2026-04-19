// Illustrated scenes for the Salam (greetings) unit. Clearer than a lone emoji.

type IconProps = { size?: number }

export function HaloIcon({ size = 120 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="58" fill="#FFE66D" />
      {/* waving hand */}
      <g transform="translate(60 62) rotate(-15)">
        <path d="M-18 18 L-14 -28 Q-10 -34 -4 -34 Q2 -32 2 -22 L2 -12 L8 -22 Q14 -28 18 -22 Q20 -12 14 -6 L14 2 Q20 -6 24 -2 Q26 6 20 10 L20 14 Q24 8 28 12 Q28 20 22 22 L16 28 Q8 32 0 30 L-14 26 Q-20 22 -18 18 Z" fill="#F5C39F" stroke="#2a1a0c" strokeWidth="2" strokeLinejoin="round" />
      </g>
      {/* motion lines */}
      <path d="M92 32 Q100 32 104 36" stroke="#FF6B6B" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M94 42 Q102 42 106 46" stroke="#FF6B6B" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M96 52 Q104 52 108 56" stroke="#FF6B6B" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export function PagiIcon({ size = 120 }: IconProps) {
  // Sun rising over mountains — "selamat pagi"
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="skyMorn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFD89B" />
          <stop offset="100%" stopColor="#FF9E7D" />
        </linearGradient>
      </defs>
      <rect width="120" height="120" fill="url(#skyMorn)" />
      {/* sun */}
      <circle cx="60" cy="72" r="22" fill="#FFE66D" />
      <g stroke="#FFE66D" strokeWidth="3" strokeLinecap="round">
        <line x1="60" y1="38" x2="60" y2="44" />
        <line x1="40" y1="50" x2="44" y2="54" />
        <line x1="80" y1="50" x2="76" y2="54" />
        <line x1="26" y1="72" x2="34" y2="72" />
        <line x1="86" y1="72" x2="94" y2="72" />
      </g>
      {/* mountains */}
      <path d="M0 100 L30 70 L60 95 L90 62 L120 100 Z" fill="#6B8E7F" />
      <path d="M0 108 L120 108 L120 120 L0 120 Z" fill="#3E5D53" />
      {/* birds */}
      <path d="M22 40 q4 -3 8 0 q4 -3 8 0" stroke="#2a1a0c" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M88 32 q4 -3 8 0 q4 -3 8 0" stroke="#2a1a0c" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export function MalamIcon({ size = 120 }: IconProps) {
  // Moon + stars — "selamat malam"
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="skyNight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1A237E" />
          <stop offset="100%" stopColor="#512DA8" />
        </linearGradient>
      </defs>
      <rect width="120" height="120" fill="url(#skyNight)" />
      {/* crescent moon */}
      <g>
        <circle cx="70" cy="50" r="26" fill="#FFE066" />
        <circle cx="62" cy="46" r="26" fill="url(#skyNight)" />
      </g>
      {/* stars */}
      <g fill="#FFE066">
        <polygon points="20,30 22,36 28,36 23,40 25,46 20,42 15,46 17,40 12,36 18,36" />
        <polygon points="92,88 94,94 100,94 95,98 97,104 92,100 87,104 89,98 84,94 90,94" />
        <polygon points="30,82 31,86 35,86 32,88 33,92 30,90 27,92 28,88 25,86 29,86" />
        <polygon points="104,22 105,25 108,25 106,27 107,30 104,28 101,30 102,27 100,25 103,25" />
      </g>
    </svg>
  )
}

export function TerimaKasihIcon({ size = 120 }: IconProps) {
  // Two hands pressed together in thanks
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="58" fill="#FFC3A0" />
      {/* Heart above hands */}
      <path d="M60 32 C56 24, 44 24, 44 36 C44 46, 60 54, 60 54 C60 54, 76 46, 76 36 C76 24, 64 24, 60 32 Z" fill="#FF6B6B" />
      {/* Left hand */}
      <path d="M40 58 L40 92 Q40 100 48 100 L56 100 Q60 100 60 95 L60 58 Q56 54 50 54 Q42 54 40 58 Z" fill="#F5C39F" stroke="#2a1a0c" strokeWidth="2" />
      {/* Right hand */}
      <path d="M80 58 L80 92 Q80 100 72 100 L64 100 Q60 100 60 95 L60 58 Q64 54 70 54 Q78 54 80 58 Z" fill="#F5C39F" stroke="#2a1a0c" strokeWidth="2" />
      {/* fingers details */}
      <line x1="60" y1="60" x2="60" y2="95" stroke="#2a1a0c" strokeWidth="1.5" />
    </svg>
  )
}

export function JumpaIcon({ size = 120 }: IconProps) {
  // Waving goodbye — hand + motion streaks going to the right
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="58" fill="#B5EAD7" />
      {/* hand */}
      <g transform="translate(50 64) rotate(25)">
        <path d="M-16 20 L-12 -28 Q-8 -34 -2 -34 Q4 -32 4 -22 L4 -12 L10 -22 Q16 -28 20 -22 Q22 -12 16 -6 L16 2 Q22 -6 26 -2 Q28 6 22 10 L22 14 Q26 8 30 12 Q30 20 24 22 L18 28 Q10 32 2 30 L-12 26 Q-18 22 -16 20 Z" fill="#F5C39F" stroke="#2a1a0c" strokeWidth="2" strokeLinejoin="round" />
      </g>
      {/* motion streaks going right */}
      <g stroke="#4ECDC4" strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M90 36 L104 36" />
        <path d="M88 48 L108 48" />
        <path d="M92 60 L106 60" />
        <path d="M88 72 L104 72" />
      </g>
    </svg>
  )
}

export const GREETING_ICONS: Record<string, (p: IconProps) => JSX.Element> = {
  halo: HaloIcon,
  pagi: PagiIcon,
  malam: MalamIcon,
  tksh: TerimaKasihIcon,
  jumpa: JumpaIcon
}

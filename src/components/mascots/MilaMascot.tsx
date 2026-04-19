import { motion } from 'framer-motion'

type Props = { size?: number; waving?: boolean; dancing?: boolean }

export function MilaMascot({ size = 180, waving = false, dancing = false }: Props) {
  return (
    <motion.svg
      width={size} height={size} viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg"
      animate={dancing ? { rotate: [-6, 6, -6], y: [0, -6, 0] } : waving ? { rotate: [-2, 2, -2] } : undefined}
      transition={{ duration: dancing ? 0.5 : 1.4, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* legs */}
      <rect x="78" y="175" width="16" height="30" rx="6" fill="#F5C39F" />
      <rect x="106" y="175" width="16" height="30" rx="6" fill="#F5C39F" />
      {/* pink sandals */}
      <ellipse cx="86" cy="208" rx="14" ry="6" fill="#FFC0CB" />
      <ellipse cx="114" cy="208" rx="14" ry="6" fill="#FFC0CB" />
      {/* maroon dress */}
      <path d="M55 100 Q100 85 145 100 L150 185 Q100 200 50 185 Z" fill="#8E1E3A" />
      {/* white collar trim */}
      <path d="M80 100 Q100 95 120 100 L118 110 Q100 105 82 110 Z" fill="#fff" />
      <rect x="55" y="128" width="90" height="4" fill="#fff" />
      {/* arms */}
      {waving ? (
        <>
          <path d="M55 105 Q35 95 40 70" stroke="#F5C39F" strokeWidth="14" strokeLinecap="round" fill="none" />
          <circle cx="40" cy="68" r="9" fill="#F5C39F" />
        </>
      ) : (
        <>
          <path d="M55 105 Q40 135 55 160" stroke="#F5C39F" strokeWidth="14" strokeLinecap="round" fill="none" />
          <circle cx="55" cy="160" r="9" fill="#F5C39F" />
        </>
      )}
      <path d="M145 105 Q160 135 145 160" stroke="#F5C39F" strokeWidth="14" strokeLinecap="round" fill="none" />
      <circle cx="145" cy="160" r="9" fill="#F5C39F" />
      {/* neck */}
      <rect x="92" y="82" width="16" height="14" fill="#F5C39F" />
      {/* head */}
      <circle cx="100" cy="65" r="34" fill="#F5C39F" />
      {/* curly hair */}
      <g fill="#3B2212">
        <circle cx="72" cy="48" r="14" />
        <circle cx="60" cy="62" r="12" />
        <circle cx="68" cy="75" r="11" />
        <circle cx="128" cy="48" r="14" />
        <circle cx="140" cy="62" r="12" />
        <circle cx="132" cy="75" r="11" />
        <circle cx="85" cy="38" r="14" />
        <circle cx="100" cy="34" r="14" />
        <circle cx="115" cy="38" r="14" />
        <circle cx="78" cy="52" r="10" />
        <circle cx="122" cy="52" r="10" />
      </g>
      {/* eyes */}
      <circle cx="90" cy="65" r="3.5" fill="#2a1a0c" />
      <circle cx="110" cy="65" r="3.5" fill="#2a1a0c" />
      <circle cx="91" cy="64" r="1" fill="#fff" />
      <circle cx="111" cy="64" r="1" fill="#fff" />
      {/* blush */}
      <ellipse cx="82" cy="74" rx="5" ry="2.5" fill="#F8A5B8" opacity="0.7" />
      <ellipse cx="118" cy="74" rx="5" ry="2.5" fill="#F8A5B8" opacity="0.7" />
      {/* smile */}
      <path d="M92 76 Q100 84 108 76" stroke="#2a1a0c" strokeWidth="2" fill="none" strokeLinecap="round" />
    </motion.svg>
  )
}

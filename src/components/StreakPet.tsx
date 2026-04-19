import { motion } from 'framer-motion'

// Butterfly grows more colorful as streak increases
export function StreakPet({ streak }: { streak: number }) {
  const level = Math.min(5, Math.floor(streak / 2))
  const hues = ['#C7BDAE', '#FFE66D', '#FF6B6B', '#4ECDC4', '#C77DFF', '#FF9EC5']
  const color = hues[level]
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 shadow">
      <motion.span
        animate={{ rotate: [-8, 8, -8], y: [0, -3, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ display: 'inline-block', color }}
      >
        <svg width="28" height="22" viewBox="0 0 32 26">
          <ellipse cx="10" cy="10" rx="9" ry="8" fill={color} />
          <ellipse cx="22" cy="10" rx="9" ry="8" fill={color} />
          <ellipse cx="10" cy="18" rx="7" ry="6" fill={color} opacity="0.8" />
          <ellipse cx="22" cy="18" rx="7" ry="6" fill={color} opacity="0.8" />
          <rect x="15" y="4" width="2" height="20" rx="1" fill="#2a1a0c" />
          <circle cx="16" cy="4" r="1.5" fill="#2a1a0c" />
        </svg>
      </motion.span>
      <span className="font-bold text-sm">{streak}🔥</span>
    </div>
  )
}

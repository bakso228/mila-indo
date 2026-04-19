import { useMemo } from 'react'
import { motion } from 'framer-motion'

export function Confetti({ count = 60 }: { count?: number }) {
  const pieces = useMemo(() => Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.8,
    dur: 2 + Math.random() * 2,
    color: ['#FFE66D','#FF6B6B','#4ECDC4','#C77DFF','#B5EAD7'][i % 5],
    size: 8 + Math.random() * 10,
    rot: Math.random() * 360
  })), [count])
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-40">
      {pieces.map(p => (
        <motion.div key={p.id}
          initial={{ y: -40, x: `${p.x}vw`, rotate: 0, opacity: 1 }}
          animate={{ y: '110vh', rotate: p.rot + 720 }}
          transition={{ duration: p.dur, delay: p.delay, ease: 'linear' }}
          style={{ position: 'absolute', width: p.size, height: p.size, background: p.color, borderRadius: 3 }}
        />
      ))}
    </div>
  )
}

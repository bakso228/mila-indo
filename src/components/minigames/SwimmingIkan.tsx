import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useSpeech, type NarratorLang } from '../../hooks/useSpeech'
import { useSfx } from '../../hooks/useSfx'

type Props = { narrator: NarratorLang; onFinish?: () => void }

const SEA = [
  { id: 'ikan', word: 'ikan', emoji: '🐠' },
  { id: 'gajah', word: 'gurita', emoji: '🐙' }, // octopus (gurita)
  { id: 'kura', word: 'kura-kura', emoji: '🐢' },
  { id: 'hiu', word: 'hiu', emoji: '🦈' },
  { id: 'bintang', word: 'bintang laut', emoji: '⭐' },
  { id: 'udang', word: 'udang', emoji: '🦐' }
]

export function SwimmingIkan({ narrator, onFinish }: Props) {
  const { say } = useSpeech()
  const { pop, cheer } = useSfx()
  const [tapped, setTapped] = useState<Set<string>>(new Set())

  useEffect(() => {
    say(narrator === 'en' ? 'Tap the sea animals!' : 'Tippe die Meerestiere!', narrator)
  }, [])

  useEffect(() => {
    if (tapped.size === SEA.length) { cheer(); setTimeout(() => onFinish?.(), 900) }
  }, [tapped])

  const fish = useMemo(() => SEA.map((s, i) => ({ ...s, top: 20 + (i * 13) % 60, dur: 6 + (i % 3) * 2, delay: i * 0.5 })), [])

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-sky to-teal/60">
      <h2 className="text-center font-bold text-xl pt-3 text-white">{narrator === 'en' ? 'Tap the sea creatures!' : 'Tippe die Meerestiere!'}</h2>
      {fish.map(f => {
        if (tapped.has(f.id)) return null
        return (
          <motion.button key={f.id}
            initial={{ x: '110vw' }} animate={{ x: '-20vw' }}
            transition={{ duration: f.dur, repeat: Infinity, delay: f.delay, ease: 'linear' }}
            style={{ position: 'absolute', top: `${f.top}%` }}
            onClick={() => { pop(); say(f.word, 'id'); setTapped(t => { const n = new Set(t); n.add(f.id); return n }) }}
            className="text-6xl drop-shadow-lg"
          >{f.emoji}</motion.button>
        )
      })}
      <div className="absolute bottom-4 left-0 right-0 text-center text-white font-bold">
        {tapped.size} / {SEA.length}
      </div>
    </div>
  )
}

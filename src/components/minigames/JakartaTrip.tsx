import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useSpeech, type NarratorLang } from '../../hooks/useSpeech'
import { useSfx } from '../../hooks/useSfx'
import { YangtiAvatar, YangkungAvatar } from '../mascots'

type Props = { narrator: NarratorLang; onFinish?: () => void }

const ITEMS = [
  { id: 'boneka', word: 'boneka', emoji: '🪆', en: 'doll' },
  { id: 'bola',   word: 'bola',   emoji: '⚽', en: 'ball' },
  { id: 'topi',   word: 'topi',   emoji: '🧢', en: 'hat' },
  { id: 'sikat',  word: 'sikat gigi', emoji: '🪥', en: 'toothbrush' },
  { id: 'pisang', word: 'pisang', emoji: '🍌', en: 'banana' }
]

export function JakartaTrip({ narrator, onFinish }: Props) {
  const { say } = useSpeech()
  const { ding, cheer } = useSfx()
  const [packed, setPacked] = useState<string[]>([])
  const [phase, setPhase] = useState<'pack' | 'fly'>('pack')

  useEffect(() => {
    say(narrator === 'en' ? 'Pack your suitcase for Jakarta!' : 'Pack deinen Koffer nach Jakarta!', narrator)
  }, [])

  const pack = (item: typeof ITEMS[number]) => {
    if (packed.includes(item.id)) return
    ding()
    say(item.word, 'id')
    const next = [...packed, item.id]
    setPacked(next)
    if (next.length === ITEMS.length) {
      setTimeout(() => { setPhase('fly'); cheer(); say('Jakarta!', 'id') }, 900)
      setTimeout(() => onFinish?.(), 4200)
    }
  }

  if (phase === 'fly') {
    return (
      <div className="min-h-screen grid place-items-center bg-gradient-to-b from-sky to-white">
        <div className="text-center">
          <motion.div initial={{ x: '-80vw' }} animate={{ x: '80vw' }} transition={{ duration: 3, ease: 'linear' }} className="text-8xl">✈️</motion.div>
          <div className="flex justify-center gap-4 mt-6">
            <YangtiAvatar size={100} /><YangkungAvatar size={100} />
          </div>
          <p className="text-2xl font-bold mt-2">Selamat datang, Mila! 🌴</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4">
      <h2 className="text-center font-bold text-xl">{narrator === 'en' ? 'Tap 5 things to pack!' : 'Tippe 5 Sachen ein!'}</h2>
      {/* suitcase */}
      <div className="mt-4 mx-auto max-w-md h-40 rounded-2xl bg-amber-300 border-4 border-amber-700 shadow-kid flex flex-wrap items-center justify-center gap-2 p-3">
        {packed.length === 0 && <span className="text-3xl opacity-50">🧳</span>}
        {packed.map(id => {
          const item = ITEMS.find(x => x.id === id)!
          return <span key={id} className="text-4xl">{item.emoji}</span>
        })}
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3 max-w-md mx-auto">
        {ITEMS.map(item => (
          <motion.button key={item.id} whileTap={{ scale: 0.92 }} disabled={packed.includes(item.id)}
            onClick={() => pack(item)}
            className={`aspect-square rounded-2xl shadow-kid border-4 border-white grid place-items-center text-5xl ${
              packed.includes(item.id) ? 'bg-mint/70 opacity-60' : 'bg-white'
            }`}>
            {item.emoji}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

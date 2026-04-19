import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useSpeech } from '../../hooks/useSpeech'
import { useSfx } from '../../hooks/useSfx'
import { FamilyAvatar } from '../mascots'
import { firstExerciseOfSession, introFor, type ExerciseProps } from './shared'

export function WhoIsThis({ target, options, narrator, onDone }: ExerciseProps) {
  const { say } = useSpeech()
  const { ding, boing } = useSfx()
  const [picked, setPicked] = useState<string | null>(null)
  const [state, setState] = useState<'idle' | 'right' | 'wrong'>('idle')

  useEffect(() => {
    if (firstExerciseOfSession()) say(introFor(narrator, 'whoIsThis'), narrator)
    // No Indonesian word spoken upfront — she has to pick, which is the game
  }, [target.id])

  const handlePick = (id: string) => {
    if (state !== 'idle') return
    setPicked(id)
    const opt = options.find(o => o.id === id)
    if (opt) say(opt.word, 'id')
    if (id === target.id) {
      setState('right'); ding()
      setTimeout(() => { say('Benar!', 'id'); say(target.word, 'id') }, 300)
      setTimeout(() => onDone('correct'), 1500)
    } else {
      setState('wrong'); boing()
      setTimeout(() => { setState('idle'); setPicked(null) }, 1400)
    }
  }

  if (!target.family) return null

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="rounded-[2rem] bg-white p-4 shadow-kid border-4 border-sunny">
        <FamilyAvatar who={target.family} size={180} />
      </div>
      <p className="text-gray-600 text-sm">{narrator === 'en' ? 'Tap the word that matches' : 'Tippe das passende Wort'}</p>
      <div className="grid grid-cols-2 gap-3 w-full max-w-md">
        {options.map(opt => {
          const isTarget = opt.id === target.id
          const isPicked = picked === opt.id
          const bg = state === 'idle' ? 'bg-white'
            : isPicked && isTarget ? 'bg-mint'
            : isPicked ? 'bg-coral/40'
            : 'bg-white'
          return (
            <motion.button
              key={opt.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePick(opt.id)}
              className={`rounded-3xl ${bg} p-3 shadow-kid border-4 border-white flex flex-col items-center gap-1 min-h-[100px] justify-center`}
            >
              <span className="text-3xl">🔊</span>
              <span className="font-bold text-lg">{opt.word}</span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

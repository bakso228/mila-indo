import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useSpeech } from '../../hooks/useSpeech'
import { useSfx } from '../../hooks/useSfx'
import { NumberPicture } from '../NumberPicture'
import { WordHeader } from './WordHeader'
import { firstExerciseOfSession, introFor, type ExerciseProps } from './shared'

// Shows a spoken Indonesian number. She picks the picture with the right count of items.
// No digits — options are groups of emoji, so the answer is pure quantity recognition.
export function CountIt({ target, options, narrator, onDone }: ExerciseProps) {
  const { say } = useSpeech()
  const { ding, boing } = useSfx()
  const [picked, setPicked] = useState<string | null>(null)
  const [state, setState] = useState<'idle' | 'right' | 'wrong'>('idle')

  useEffect(() => {
    if (firstExerciseOfSession()) say(introFor(narrator, 'countIt'), narrator)
    say(target.word, 'id', { repeat: 2, gapMs: 500 })
  }, [target.id])

  const handlePick = (id: string) => {
    if (state !== 'idle') return
    setPicked(id)
    if (id === target.id) {
      setState('right'); ding()
      say('Benar!', 'id'); say(target.word, 'id')
      setTimeout(() => onDone('correct'), 1100)
    } else {
      setState('wrong'); boing()
      say(target.word, 'id', { rate: 0.4 })
      setTimeout(() => { setState('idle'); setPicked(null) }, 1400)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <WordHeader word={target.word} />
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
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
              className={`rounded-3xl ${bg} p-3 shadow-kid border-4 border-white flex flex-col items-center gap-1 min-h-[160px] justify-center`}
              aria-label={opt.en}
            >
              <NumberPicture n={opt.count ?? 1} size={100} emoji={opt.emoji ?? '🍎'} />
              <span className="font-bold text-base sm:text-lg">{opt.word}</span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

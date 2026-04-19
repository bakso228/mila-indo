import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useSpeech } from '../../hooks/useSpeech'
import { useSfx } from '../../hooks/useSfx'
import { WordPicture } from '../WordPicture'
import { instructionFor, type ExerciseProps } from './shared'

export function HearAndPick({ target, options, narrator, onDone }: ExerciseProps) {
  const { say } = useSpeech()
  const { ding, boing } = useSfx()
  const [picked, setPicked] = useState<string | null>(null)
  const [state, setState] = useState<'idle' | 'right' | 'wrong'>('idle')

  useEffect(() => {
    say(instructionFor(narrator, 'hearAndPick', target), narrator)
    say(target.word, 'id')
  }, [target.id])

  const handlePick = (id: string) => {
    if (state !== 'idle') return
    setPicked(id)
    if (id === target.id) {
      setState('right'); ding()
      say(narrator === 'en' ? 'Yes!' : 'Ja!', narrator)
      setTimeout(() => onDone('correct'), 900)
    } else {
      setState('wrong'); boing()
      say(narrator === 'en' ? 'Almost! Try again.' : 'Fast! Nochmal.', narrator)
      setTimeout(() => { setState('idle'); setPicked(null) }, 1200)
    }
  }

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <button
        onClick={() => say(target.word, 'id')}
        className="rounded-full bg-teal text-white w-24 h-24 grid place-items-center text-5xl shadow-kid active:translate-y-1 active:shadow-none animate-pulse-ring"
        aria-label="Play word"
      >🔊</button>
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
              className={`rounded-3xl ${bg} p-4 shadow-kid aspect-square grid place-items-center border-4 border-white`}
              aria-label={opt.en}
            >
              <WordPicture word={opt} size={100} />
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

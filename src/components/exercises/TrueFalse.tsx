import { useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useSpeech } from '../../hooks/useSpeech'
import { useSfx } from '../../hooks/useSfx'
import { WordPicture } from '../WordPicture'
import type { ExerciseProps } from './shared'

export function TrueFalse({ target, options, narrator, onDone }: ExerciseProps) {
  const { say } = useSpeech()
  const { ding, boing } = useSfx()
  // Randomly decide if we show the correct picture or a distractor
  const shownWord = useMemo(() => {
    const wrong = options.find(o => o.id !== target.id) ?? target
    return Math.random() < 0.5 ? target : wrong
  }, [target.id])
  const correctAnswer = shownWord.id === target.id
  const [state, setState] = useState<'idle' | 'right' | 'wrong'>('idle')

  useEffect(() => {
    say(narrator === 'en' ? `Is this ${target.word}?` : `Ist das ${target.word}?`, narrator)
    say(target.word, 'id')
  }, [target.id])

  const handle = (answer: boolean) => {
    if (state !== 'idle') return
    const right = answer === correctAnswer
    if (right) {
      setState('right'); ding()
      say(narrator === 'en' ? 'Yes!' : 'Ja!', narrator)
      setTimeout(() => onDone('correct'), 900)
    } else {
      setState('wrong'); boing()
      say(narrator === 'en' ? 'Almost!' : 'Fast!', narrator)
      setTimeout(() => onDone('wrong'), 1100)
    }
  }

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <button onClick={() => say(target.word, 'id')}
        className="rounded-full bg-teal text-white w-20 h-20 grid place-items-center text-4xl shadow-kid">🔊</button>
      <div className="rounded-[2rem] bg-white p-6 shadow-kid border-4 border-sunny">
        <WordPicture word={shownWord} size={200} />
      </div>
      <div className="flex gap-8">
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => handle(true)}
          className="w-28 h-28 rounded-full bg-mint text-6xl shadow-kid grid place-items-center border-4 border-white">✓</motion.button>
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => handle(false)}
          className="w-28 h-28 rounded-full bg-coral text-6xl shadow-kid grid place-items-center border-4 border-white">✗</motion.button>
      </div>
    </div>
  )
}

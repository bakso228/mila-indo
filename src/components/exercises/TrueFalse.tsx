import { useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useSpeech } from '../../hooks/useSpeech'
import { useSfx } from '../../hooks/useSfx'
import { WordPicture } from '../WordPicture'
import { WordHeader } from './WordHeader'
import { firstExerciseOfSession, introFor, type ExerciseProps } from './shared'

export function TrueFalse({ target, options, narrator, onDone }: ExerciseProps) {
  const { say } = useSpeech()
  const { ding, boing } = useSfx()
  const shownWord = useMemo(() => {
    const wrong = options.find(o => o.id !== target.id) ?? target
    return Math.random() < 0.5 ? target : wrong
  }, [target.id])
  const correctAnswer = shownWord.id === target.id
  const [state, setState] = useState<'idle' | 'right' | 'wrong'>('idle')

  useEffect(() => {
    if (firstExerciseOfSession()) say(introFor(narrator, 'trueFalse'), narrator)
    say(target.word, 'id', { repeat: 2, gapMs: 500 })
  }, [target.id])

  const handle = (answer: boolean) => {
    if (state !== 'idle') return
    const right = answer === correctAnswer
    if (right) {
      setState('right'); ding()
      say('Benar!', 'id')
      setTimeout(() => onDone('correct'), 1000)
    } else {
      setState('wrong'); boing()
      say(target.word, 'id', { rate: 0.4 })
      setTimeout(() => onDone('wrong'), 1200)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <WordHeader word={target.word} />
      <div className="rounded-[2rem] bg-white p-5 shadow-kid border-4 border-sunny">
        <WordPicture word={shownWord} size={180} />
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

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useSpeech } from '../../hooks/useSpeech'
import { useSfx } from '../../hooks/useSfx'
import { NumberPicture } from '../NumberPicture'
import { WordHeader } from './WordHeader'
import { SubmitButton } from './HearAndPick'
import { firstExerciseOfSession, introFor, type ExerciseProps } from './shared'

// Shows a spoken Indonesian number. She picks the picture with the right count of items.
// No digits — options are groups of emoji, so the answer is pure quantity recognition.
export function CountIt({ target, options, narrator, onDone }: ExerciseProps) {
  const { say, stop } = useSpeech()
  const { ding, boing } = useSfx()
  const [selected, setSelected] = useState<string | null>(null)
  const [state, setState] = useState<'idle' | 'right' | 'wrong'>('idle')

  useEffect(() => {
    if (firstExerciseOfSession()) say(introFor(narrator, 'countIt'), narrator)
    say(target.word, 'id', { repeat: 2, gapMs: 500 })
    return () => { stop() }
  }, [target.id])

  const choose = (id: string) => {
    if (state !== 'idle') return
    setSelected(id)
  }

  const submit = () => {
    if (!selected || state !== 'idle') return
    if (selected === target.id) {
      setState('right'); ding()
      say(`Benar! ${target.word}`, 'id')
      setTimeout(() => onDone('correct'), 1200)
    } else {
      setState('wrong'); boing()
      say(target.word, 'id', { rate: 0.4 })
      setTimeout(() => { setState('idle'); setSelected(null) }, 1500)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <WordHeader word={target.word} />
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {options.map(opt => {
          const isSelected = selected === opt.id
          const bg = state === 'right' && isSelected ? 'bg-mint border-teal'
                  : state === 'wrong' && isSelected ? 'bg-coral/40 border-coral'
                  : isSelected ? 'bg-sunny border-coral'
                  : 'bg-white border-white'
          return (
            <motion.button
              key={opt.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => choose(opt.id)}
              className={`rounded-3xl ${bg} border-4 p-3 shadow-kid flex flex-col items-center gap-1 min-h-[160px] justify-center`}
              aria-label={opt.en}
              aria-pressed={isSelected}
            >
              <NumberPicture n={opt.count ?? 1} size={100} emoji={opt.emoji ?? '🍎'} />
              <span className="font-bold text-base sm:text-lg">{opt.word}</span>
            </motion.button>
          )
        })}
      </div>
      <SubmitButton onClick={submit} enabled={!!selected && state === 'idle'} narrator={narrator} />
    </div>
  )
}

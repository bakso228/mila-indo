import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useSpeech } from '../../hooks/useSpeech'
import { useSfx } from '../../hooks/useSfx'
import { WordPicture } from '../WordPicture'
import { WordHeader } from './WordHeader'
import { firstExerciseOfSession, introFor, type ExerciseProps } from './shared'

export function HearAndPick({ target, options, narrator, onDone }: ExerciseProps) {
  const { say, stop } = useSpeech()
  const { ding, boing } = useSfx()
  const [selected, setSelected] = useState<string | null>(null)
  const [state, setState] = useState<'idle' | 'right' | 'wrong'>('idle')

  useEffect(() => {
    if (firstExerciseOfSession()) say(introFor(narrator, 'hearAndPick'), narrator)
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
      const extra = Math.random() < 0.3 ? ' Coba lagi' : ''
      say(`${target.word}.${extra}`, 'id', { rate: 0.4 })
      setTimeout(() => { setState('idle'); setSelected(null) }, 1500)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <WordHeader word={target.word} />
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {options.map(opt => {
          const isTarget = opt.id === target.id
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
              className={`rounded-3xl ${bg} border-4 p-3 shadow-kid flex flex-col items-center justify-center gap-1 min-h-[160px]`}
              aria-label={opt.en}
              aria-pressed={isSelected}
            >
              <WordPicture word={opt} size={90} />
              <span className="font-bold text-base sm:text-lg text-center leading-tight">{opt.word}</span>
            </motion.button>
          )
        })}
      </div>
      <SubmitButton onClick={submit} enabled={!!selected && state === 'idle'} narrator={narrator} />
    </div>
  )
}

export function SubmitButton({ onClick, enabled, narrator }:
  { onClick: () => void; enabled: boolean; narrator: 'en' | 'de' }) {
  return (
    <motion.button
      whileTap={enabled ? { scale: 0.95 } : undefined}
      onClick={enabled ? onClick : undefined}
      disabled={!enabled}
      className={`mt-2 rounded-3xl px-8 py-4 font-bold text-2xl shadow-kid flex items-center gap-3 ${
        enabled ? 'bg-mint text-black active:translate-y-1 active:shadow-none' : 'bg-white/60 text-gray-400'
      }`}
      aria-label="Submit answer"
    >
      <span className="text-3xl leading-none">✓</span>
      <span className="text-base sm:text-lg">{narrator === 'en' ? 'Check' : 'Prüfen'}</span>
    </motion.button>
  )
}

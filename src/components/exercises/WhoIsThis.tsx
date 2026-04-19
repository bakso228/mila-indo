import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useSpeech } from '../../hooks/useSpeech'
import { useSfx } from '../../hooks/useSfx'
import { FamilyAvatar } from '../mascots'
import { instructionFor, type ExerciseProps } from './shared'

export function WhoIsThis({ target, options, narrator, onDone }: ExerciseProps) {
  const { say } = useSpeech()
  const { ding, boing } = useSfx()
  const [picked, setPicked] = useState<string | null>(null)
  const [state, setState] = useState<'idle' | 'right' | 'wrong'>('idle')

  useEffect(() => {
    say(instructionFor(narrator, 'whoIsThis', target), narrator)
  }, [target.id])

  const handlePick = (id: string) => {
    if (state !== 'idle') return
    setPicked(id)
    if (id === target.id) {
      setState('right'); ding()
      say(target.word, 'id')
      setTimeout(() => onDone('correct'), 1100)
    } else {
      setState('wrong'); boing()
      say(narrator === 'en' ? 'Almost! Try again.' : 'Fast! Nochmal.', narrator)
      setTimeout(() => { setState('idle'); setPicked(null) }, 1200)
    }
  }

  if (!target.family) return null

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <div className="rounded-[2rem] bg-white p-4 shadow-kid border-4 border-sunny">
        <FamilyAvatar who={target.family} size={180} />
      </div>
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
              onClick={() => { handlePick(opt.id); if (state === 'idle') say(opt.word, 'id') }}
              className={`rounded-3xl ${bg} p-4 shadow-kid border-4 border-white h-24 grid place-items-center`}
            >
              <span className="text-5xl">🔊</span>
            </motion.button>
          )
        })}
      </div>
      <p className="text-sm text-gray-500">{narrator === 'en' ? 'Tap each speaker to listen' : 'Tippe auf die Lautsprecher zum Hören'}</p>
    </div>
  )
}

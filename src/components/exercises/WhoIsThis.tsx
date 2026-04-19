import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useSpeech } from '../../hooks/useSpeech'
import { useSfx } from '../../hooks/useSfx'
import { FamilyAvatar } from '../mascots'
import { SubmitButton } from './HearAndPick'
import { firstExerciseOfSession, introFor, type ExerciseProps } from './shared'

export function WhoIsThis({ target, options, narrator, onDone }: ExerciseProps) {
  const { say, stop } = useSpeech()
  const { ding, boing } = useSfx()
  const [selected, setSelected] = useState<string | null>(null)
  const [state, setState] = useState<'idle' | 'right' | 'wrong'>('idle')
  const [speakingId, setSpeakingId] = useState<string | null>(null)

  // Auto-preview: after the brief intro, read each option in order so she
  // knows what each 🔊 bubble says without having to tap all of them first.
  // Highlight the one currently being read.
  useEffect(() => {
    let cancelled = false
    const run = async () => {
      if (firstExerciseOfSession()) await say(introFor(narrator, 'whoIsThis'), narrator)
      await new Promise(r => setTimeout(r, 400))
      for (const opt of options) {
        if (cancelled) return
        setSpeakingId(opt.id)
        await say(opt.word, 'id')
        if (cancelled) return
        await new Promise(r => setTimeout(r, 200))
      }
      setSpeakingId(null)
    }
    run()
    return () => { cancelled = true; setSpeakingId(null); stop() }
  }, [target.id])

  const tapOption = (id: string) => {
    if (state !== 'idle') return
    setSelected(id)
    const opt = options.find(o => o.id === id)
    if (opt) {
      setSpeakingId(id)
      say(opt.word, 'id', { preempt: true }).then(() => setSpeakingId(prev => (prev === id ? null : prev)))
    }
  }

  const submit = () => {
    if (!selected || state !== 'idle') return
    if (selected === target.id) {
      setState('right'); ding()
      setTimeout(() => say(`Benar! ${target.word}`, 'id'), 200)
      setTimeout(() => onDone('correct'), 1500)
    } else {
      setState('wrong'); boing()
      say(target.word, 'id')
      setTimeout(() => onDone('wrong'), 1500)
    }
  }

  if (!target.family) return null

  return (
    <div className="flex flex-col items-center gap-3 p-4">
      <div className="rounded-[2rem] bg-white p-4 shadow-kid border-4 border-sunny">
        <FamilyAvatar who={target.family} size={160} />
      </div>
      <p className="text-gray-600 text-sm">{narrator === 'en' ? 'Tap the name you hear' : 'Tippe den Namen'}</p>
      <div className="grid grid-cols-2 gap-3 w-full max-w-md">
        {options.map(opt => {
          const isSelected = selected === opt.id
          const isSpeaking = speakingId === opt.id
          const bg = state === 'right' && isSelected ? 'bg-mint border-teal'
                  : state === 'wrong' && isSelected ? 'bg-coral/40 border-coral'
                  : isSelected ? 'bg-sunny border-coral'
                  : isSpeaking ? 'bg-teal/30 border-teal'
                  : 'bg-white border-white'
          return (
            <motion.button
              key={opt.id}
              whileTap={{ scale: 0.95 }}
              animate={isSpeaking ? { scale: [1, 1.04, 1] } : { scale: 1 }}
              transition={isSpeaking ? { duration: 0.7, repeat: Infinity } : undefined}
              onClick={() => tapOption(opt.id)}
              aria-pressed={isSelected}
              className={`rounded-3xl ${bg} border-4 p-3 shadow-kid flex flex-col items-center gap-1 min-h-[100px] justify-center relative`}
            >
              <span className={`text-3xl ${isSpeaking ? 'animate-pulse' : ''}`}>🔊</span>
              <span className="font-bold text-lg">{opt.word}</span>
            </motion.button>
          )
        })}
      </div>
      <SubmitButton onClick={submit} enabled={!!selected && state === 'idle'} narrator={narrator} />
    </div>
  )
}

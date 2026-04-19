import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useSpeech, type NarratorLang } from '../../hooks/useSpeech'
import { useSfx } from '../../hooks/useSfx'
import { MamaAvatar } from '../mascots'

type Props = { narrator: NarratorLang; onFinish?: () => void }

const RECIPE = [
  { id: 'air',      word: 'air',             emoji: '💧' },
  { id: 'kentang',  word: 'kentang goreng',  emoji: '🥔' },
  { id: 'garam',    word: 'garam',           emoji: '🧂' },
  { id: 'piring',   word: 'piring',          emoji: '🍽️' }
]

export function KitchenMama({ narrator, onFinish }: Props) {
  const { say } = useSpeech()
  const { ding, cheer } = useSfx()
  const [step, setStep] = useState(0)
  const [wrong, setWrong] = useState<string | null>(null)

  useEffect(() => {
    say(narrator === 'en' ? 'Let\'s cook with Mama!' : 'Lass uns mit Mama kochen!', narrator)
    say(RECIPE[0].word, 'id')
  }, [])

  const pick = (id: string) => {
    if (id === RECIPE[step].id) {
      ding(); say(RECIPE[step].word, 'id')
      const next = step + 1
      if (next >= RECIPE.length) {
        setTimeout(() => { cheer(); say('Spageti!', 'id'); onFinish?.() }, 1000)
        setStep(next)
      } else {
        setStep(next)
        setTimeout(() => say(RECIPE[next].word, 'id'), 700)
      }
    } else {
      setWrong(id); setTimeout(() => setWrong(null), 500)
    }
  }

  const options = shuffle(RECIPE.slice(0, step + 3).concat([{ id:'extra', word:'susu', emoji:'🥛' }]).slice(0, 4))

  return (
    <div className="min-h-screen p-4 grid place-items-center">
      <div className="max-w-md text-center">
        <MamaAvatar size={130} />
        <h2 className="font-bold text-xl mt-1">{narrator === 'en' ? 'Cook with Mama!' : 'Koche mit Mama!'}</h2>
        {step < RECIPE.length ? (
          <>
            <p className="mt-1">{narrator === 'en' ? 'Tap the' : 'Tippe auf'} <span className="font-bold text-coral">{RECIPE[step].word}</span>!</p>
            <div className="text-8xl my-3">🍝</div>
            <div className="grid grid-cols-2 gap-3">
              {options.map(o => (
                <motion.button key={o.id} whileTap={{ scale: 0.92 }} onClick={() => pick(o.id)}
                  className={`aspect-square rounded-2xl shadow-kid border-4 border-white grid place-items-center text-5xl ${
                    wrong === o.id ? 'bg-coral/40' : 'bg-white'}`}>{o.emoji}</motion.button>
              ))}
            </div>
          </>
        ) : (
          <div className="text-5xl">🍝✨ Spageti!</div>
        )}
      </div>
    </div>
  )
}

function shuffle<T>(a: T[]): T[] {
  const b = a.slice()
  for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]] }
  return b
}

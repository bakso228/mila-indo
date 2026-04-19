import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useSpeech, type NarratorLang } from '../../hooks/useSpeech'
import { useSfx } from '../../hooks/useSfx'
import { WORDS, type Word } from '../../data/vocab'

type Props = { narrator: NarratorLang; vocab?: Word[]; onFinish?: () => void }

const FOOD_IDS = ['pisang','apel','susu','ayam','nasi','ikan','eskrim','pommes','spageti']

export function FeedTheKucing({ narrator, onFinish }: Props) {
  const { say } = useSpeech()
  const { ding, boing, cheer } = useSfx()
  const [round, setRound] = useState(0)
  const [target, setTarget] = useState<Word>(() => randomFood())
  const tray = useMemo(() => shuffledTray(target), [target.id])

  useEffect(() => {
    say(narrator === 'en' ? `The cat wants` : `Die Katze möchte`, narrator)
    say(target.word, 'id')
  }, [target.id])

  const pick = (w: Word) => {
    if (w.id === target.id) {
      ding(); say('Mwoah!', narrator); say(target.word, 'id')
      setTimeout(() => {
        if (round >= 2) { cheer(); onFinish?.(); return }
        setRound(r => r + 1); setTarget(randomFood(target))
      }, 900)
    } else {
      boing(); say(narrator === 'en' ? 'Not that one!' : 'Nicht das!', narrator)
    }
  }

  return (
    <div className="min-h-screen grid place-items-center p-4">
      <div className="text-center max-w-md w-full">
        <p className="font-bold text-xl">{narrator === 'en' ? 'The cat wants' : 'Die Katze möchte'} <span className="text-coral">{target.word}</span>!</p>
        <motion.div animate={{ y: [0,-4,0] }} transition={{ duration: 1.2, repeat: Infinity }} className="text-[120px] leading-none my-3">🐱</motion.div>
        <div className="grid grid-cols-3 gap-4 mt-2">
          {tray.map(w => (
            <motion.button key={w.id} whileTap={{ scale: 0.92 }} onClick={() => pick(w)}
              className="aspect-square rounded-2xl bg-white shadow-kid border-4 border-white grid place-items-center text-6xl">
              {w.emoji}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}

function randomFood(avoid?: Word): Word {
  const pool = FOOD_IDS.filter(id => id !== avoid?.id).map(id => WORDS[id])
  return pool[Math.floor(Math.random() * pool.length)]
}
function shuffledTray(target: Word): Word[] {
  const distractors = FOOD_IDS.filter(id => id !== target.id)
  const picks = [target]
  while (picks.length < 3 && distractors.length) {
    picks.push(WORDS[distractors.splice(Math.floor(Math.random() * distractors.length), 1)[0]])
  }
  for (let i = picks.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [picks[i], picks[j]] = [picks[j], picks[i]] }
  return picks
}

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useSpeech, type NarratorLang } from '../../hooks/useSpeech'
import { useSfx } from '../../hooks/useSfx'
import { WordPicture } from '../WordPicture'
import type { Word } from '../../data/vocab'

type Props = { narrator: NarratorLang; vocab: Word[]; onFinish?: () => void }

export function BalloonPop({ narrator, vocab, onFinish }: Props) {
  const { say } = useSpeech()
  const { pop, cheer } = useSfx()
  const [round, setRound] = useState(0)
  const [target, setTarget] = useState<Word>(() => pickTarget(vocab))
  const [balloons, setBalloons] = useState<Word[]>(() => spawn(vocab, target))
  const [popped, setPopped] = useState<number[]>([])
  const colors = useMemo(() => ['#FF6B6B','#4ECDC4','#FFE66D','#C77DFF','#B5EAD7','#FF9EC5'], [])

  useEffect(() => {
    say(narrator === 'en' ? 'Pop the' : 'Platze die', narrator)
    say(target.word, 'id')
  }, [target.id])

  const handlePop = (i: number, w: Word) => {
    if (popped.includes(i)) return
    pop()
    setPopped(p => [...p, i])
    if (w.id === target.id) {
      cheer()
      say(target.word, 'id')
      setTimeout(() => {
        if (round >= 3) { onFinish?.(); return }
        const nt = pickTarget(vocab, target)
        setTarget(nt); setBalloons(spawn(vocab, nt)); setPopped([]); setRound(r => r + 1)
      }, 800)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="text-center pt-4">
        <p className="font-bold text-xl">{narrator === 'en' ? 'Find the' : 'Finde die'} <span className="text-coral">{target.word}</span>!</p>
        <button onClick={() => say(target.word, 'id')} className="mt-1 bg-teal text-white rounded-full w-12 h-12 text-2xl shadow-kid">🔊</button>
      </div>
      {balloons.map((w, i) => {
        if (popped.includes(i)) return null
        const color = colors[i % colors.length]
        const left = 5 + (i * 18) % 85
        const delay = (i * 0.6) % 2.4
        return (
          <motion.button key={`${round}-${i}`}
            initial={{ y: '110vh' }}
            animate={{ y: '-20vh' }}
            transition={{ duration: 8, ease: 'linear', delay }}
            style={{ position: 'absolute', left: `${left}%` }}
            onClick={() => handlePop(i, w)}
            className="focus:outline-none"
          >
            <svg width="88" height="110" viewBox="0 0 88 110">
              <ellipse cx="44" cy="42" rx="36" ry="42" fill={color} />
              <path d="M44 84 L40 92 L48 92 Z" fill={color} />
              <line x1="44" y1="92" x2="44" y2="108" stroke="#333" strokeWidth="1" />
              <ellipse cx="32" cy="28" rx="8" ry="5" fill="#fff" opacity="0.5" />
            </svg>
            <div className="-mt-[85px] text-4xl relative z-10">{w.emoji ?? '❓'}</div>
            <div style={{height: 50}} />
          </motion.button>
        )
      })}
    </div>
  )
}

function pickTarget(vocab: Word[], avoid?: Word): Word {
  const pool = vocab.filter(w => w.id !== avoid?.id)
  return pool[Math.floor(Math.random() * pool.length)] ?? vocab[0]
}

function spawn(vocab: Word[], target: Word): Word[] {
  const distractors = vocab.filter(w => w.id !== target.id)
  const picks = [target]
  while (picks.length < 6 && distractors.length) {
    const w = distractors.splice(Math.floor(Math.random() * distractors.length), 1)[0]
    picks.push(w)
  }
  // shuffle
  for (let i = picks.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[picks[i], picks[j]] = [picks[j], picks[i]]
  }
  return picks
}

// also inject WordPicture so we could use family SVGs if needed later
export { WordPicture }

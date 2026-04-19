import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useSpeech, type NarratorLang } from '../../hooks/useSpeech'
import { useSfx } from '../../hooks/useSfx'
import { WordPicture } from '../WordPicture'
import type { Word } from '../../data/vocab'

type Props = { narrator: NarratorLang; vocab: Word[]; onFinish?: () => void }

type Card = { key: string; word: Word; flipped: boolean; matched: boolean }

export function MemoryMatch({ narrator, vocab, onFinish }: Props) {
  const { say } = useSpeech()
  const { ding, boing, cheer } = useSfx()

  const initial = useMemo<Card[]>(() => {
    const selected = shuffle(vocab.slice(0, 20)).slice(0, 3)
    const deck: Card[] = []
    selected.forEach((w, i) => {
      deck.push({ key: `${w.id}-a-${i}`, word: w, flipped: false, matched: false })
      deck.push({ key: `${w.id}-b-${i}`, word: w, flipped: false, matched: false })
    })
    return shuffle(deck)
  }, [])

  const [cards, setCards] = useState<Card[]>(initial)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    say(narrator === 'en' ? 'Find the pairs!' : 'Finde die Paare!', narrator)
  }, [])

  useEffect(() => {
    if (cards.every(c => c.matched)) {
      const t = setTimeout(() => { cheer(); onFinish?.() }, 600)
      return () => clearTimeout(t)
    }
  }, [cards])

  const onFlip = (idx: number) => {
    if (busy) return
    const c = cards[idx]
    if (c.flipped || c.matched) return
    const flipped = cards.map((x, i) => i === idx ? { ...x, flipped: true } : x)
    const open = flipped.filter(x => x.flipped && !x.matched)
    say(c.word.word, 'id')
    setCards(flipped)
    if (open.length === 2) {
      setBusy(true)
      const [a, b] = open
      setTimeout(() => {
        if (a.word.id === b.word.id) {
          ding()
          setCards(cs => cs.map(x => x.flipped && !x.matched ? { ...x, matched: true } : x))
        } else {
          boing()
          setCards(cs => cs.map(x => x.flipped && !x.matched ? { ...x, flipped: false } : x))
        }
        setBusy(false)
      }, 900)
    }
  }

  return (
    <div className="min-h-screen p-4 grid place-items-center">
      <div className="grid grid-cols-3 gap-3 max-w-md">
        {cards.map((c, i) => (
          <motion.button key={c.key} whileTap={{ scale: 0.92 }} onClick={() => onFlip(i)}
            className={`aspect-square rounded-2xl shadow-kid border-4 grid place-items-center ${
              c.matched ? 'bg-mint border-mint opacity-70' : c.flipped ? 'bg-white border-white' : 'bg-teal border-white'
            }`}>
            {c.flipped || c.matched ? <WordPicture word={c.word} size={70} /> : <span className="text-5xl">?</span>}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

function shuffle<T>(a: T[]): T[] {
  const b = a.slice()
  for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]] }
  return b
}

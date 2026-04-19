import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useSpeech, type NarratorLang } from '../../hooks/useSpeech'
import { useSfx } from '../../hooks/useSfx'
import { MilaMascot } from '../mascots'

type Props = { narrator: NarratorLang; onFinish?: () => void }

const COLOR_OPTIONS: { id: string; word: string; en: string; color: string; emoji: string }[] = [
  { id: 'merah', word: 'merah', en: 'red',    color: '#FF6B6B', emoji: '🟥' },
  { id: 'biru',  word: 'biru',  en: 'blue',   color: '#4ECDC4', emoji: '🟦' },
  { id: 'kuning',word: 'kuning',en: 'yellow', color: '#FFE66D', emoji: '🟨' },
  { id: 'hijau', word: 'hijau', en: 'green',  color: '#8ED081', emoji: '🟩' },
  { id: 'pink',  word: 'merah muda', en: 'pink', color: '#FF9EC5', emoji: '🌸' },
  { id: 'ungu',  word: 'ungu',  en: 'purple', color: '#C77DFF', emoji: '🟪' },
]

export function FashionStudio({ narrator, onFinish }: Props) {
  const { say } = useSpeech()
  const { ding, cheer } = useSfx()
  const [dress, setDress] = useState('#FF6B6B')
  const [shoes, setShoes] = useState('#FF9EC5')
  const [picked, setPicked] = useState(0)

  useEffect(() => {
    say(narrator === 'en' ? 'Dress up Mila! Pick colors!' : 'Zieh Mila an! Wähle Farben!', narrator)
  }, [])

  const apply = (color: string, word: string) => {
    ding()
    say(word, 'id')
    if (picked % 2 === 0) setDress(color); else setShoes(color)
    setPicked(p => {
      const n = p + 1
      if (n >= 6) { setTimeout(() => { cheer(); onFinish?.() }, 1000) }
      return n
    })
  }

  return (
    <div className="min-h-screen p-4 grid place-items-center">
      <div className="max-w-md text-center">
        <h2 className="font-bold text-xl mb-2">{narrator === 'en' ? 'Fashion Studio 👗' : 'Modeatelier 👗'}</h2>
        <svg width="200" height="280" viewBox="0 0 200 280" className="mx-auto">
          {/* reuse Mila parts but colorable */}
          <rect x="78" y="200" width="16" height="30" rx="6" fill="#F5C39F" />
          <rect x="106" y="200" width="16" height="30" rx="6" fill="#F5C39F" />
          <ellipse cx="86" cy="234" rx="14" ry="6" fill={shoes} />
          <ellipse cx="114" cy="234" rx="14" ry="6" fill={shoes} />
          <path d="M55 120 Q100 105 145 120 L150 205 Q100 220 50 205 Z" fill={dress} />
          <path d="M55 148 L145 148" stroke="#fff" strokeWidth="3" />
          <path d="M55 125 Q100 140 145 125" stroke="#fff" strokeWidth="3" fill="none"/>
          <rect x="92" y="102" width="16" height="14" fill="#F5C39F" />
          <circle cx="100" cy="85" r="34" fill="#F5C39F" />
          <g fill="#3B2212">
            <circle cx="72" cy="68" r="14" /><circle cx="60" cy="82" r="12" /><circle cx="128" cy="68" r="14" />
            <circle cx="140" cy="82" r="12" /><circle cx="85" cy="58" r="14" /><circle cx="100" cy="54" r="14" /><circle cx="115" cy="58" r="14" />
          </g>
          <circle cx="90" cy="85" r="3" fill="#2a1a0c" /><circle cx="110" cy="85" r="3" fill="#2a1a0c" />
          <path d="M92 96 Q100 104 108 96" stroke="#2a1a0c" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
        <p className="text-sm text-gray-600 mb-2">{picked % 2 === 0 ? (narrator === 'en' ? 'Pick a dress color:' : 'Wähle eine Kleiderfarbe:') : (narrator === 'en' ? 'Pick shoe color:' : 'Wähle Schuhfarbe:')}</p>
        <div className="grid grid-cols-3 gap-3">
          {COLOR_OPTIONS.map(c => (
            <motion.button key={c.id} whileTap={{ scale: 0.92 }} onClick={() => apply(c.color, c.word)}
              className="rounded-2xl h-16 shadow-kid border-4 border-white"
              style={{ backgroundColor: c.color }} aria-label={c.en}>
              <span className="text-3xl">{c.emoji}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}

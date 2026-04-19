import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { MilaMascot } from '../mascots'
import { useSpeech, type NarratorLang } from '../../hooks/useSpeech'
import { useSfx } from '../../hooks/useSfx'
import type { Word } from '../../data/vocab'

type Props = { narrator: NarratorLang; vocab?: Word[]; onFinish?: () => void }

export function DanceParty({ narrator, onFinish }: Props) {
  const { say } = useSpeech()
  const { pop, cheer } = useSfx()
  const [taps, setTaps] = useState(0)
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    say(narrator === 'en' ? 'Dance Party! Menari!' : 'Tanzparty! Menari!', narrator)
    say('menari', 'id')
    const beats = [700, 700, 800, 700] // ms, simple kid beat
    let i = 0
    const tick = () => {
      pop()
      intervalRef.current = window.setTimeout(tick, beats[i % beats.length])
      i++
    }
    intervalRef.current = window.setTimeout(tick, 500)
    const done = window.setTimeout(() => { cheer(); onFinish?.() }, 7000)
    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current)
      clearTimeout(done)
    }
  }, [])

  return (
    <div className="min-h-screen grid place-items-center p-4 bg-gradient-to-b from-sunny to-pink-200">
      <div className="text-center">
        <MilaMascot size={260} dancing />
        <div className="flex justify-center gap-2 mt-2 text-4xl">💃 🎶 🕺</div>
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => { setTaps(t => t + 1); pop() }}
          className="mt-4 bg-coral text-white rounded-full w-32 h-32 text-6xl shadow-kid animate-pulse-ring">🎵</motion.button>
        <p className="font-bold text-lg mt-2">{taps} taps!</p>
      </div>
    </div>
  )
}

import { useEffect, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useSpeech, type NarratorLang } from '../../hooks/useSpeech'
import { Confetti } from '../Confetti'

export function MinigameShell({
  narrator, onDone, big = false, children
}: { narrator: NarratorLang; onDone: () => void; big?: boolean; children: ReactNode }) {
  const { say } = useSpeech()
  const [phase, setPhase] = useState<'intro' | 'play' | 'outro'>('intro')

  useEffect(() => {
    if (phase === 'intro') {
      say(narrator === 'en' ? (big ? 'Unit complete! Bonus game time!' : 'Minigame time!') : (big ? 'Fertig! Jetzt ein Bonusspiel!' : 'Zeit für ein Minispiel!'), narrator)
      const t = setTimeout(() => setPhase('play'), 1400)
      return () => clearTimeout(t)
    }
    if (phase === 'outro') {
      const t = setTimeout(onDone, 1500)
      return () => clearTimeout(t)
    }
  }, [phase])

  return (
    <div className="min-h-screen p-3 relative">
      {phase === 'intro' && (
        <div className="min-h-screen grid place-items-center">
          <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-[2rem] p-6 shadow-kid border-4 border-sunny text-center">
            <div className="text-7xl">{big ? '🎉' : '🎈'}</div>
            <p className="font-bold text-2xl mt-1">{big ? 'Bonus!' : 'Minigame!'}</p>
          </motion.div>
        </div>
      )}
      {phase === 'play' && (
        <div className="min-h-screen">
          {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
          <MinigamePlayArea onFinish={() => setPhase('outro')}>{children}</MinigamePlayArea>
        </div>
      )}
      {phase === 'outro' && (
        <>
          <Confetti count={40} />
          <div className="min-h-screen grid place-items-center">
            <div className="bg-white rounded-[2rem] p-6 shadow-kid border-4 border-mint text-center">
              <div className="text-7xl">⭐</div>
              <p className="font-bold text-2xl">Hebat!</p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// Pass a `finish` prop down via React.Children; simpler: accept via context or just time out
// For simplicity, children expose their own finish by calling a callback passed via cloneElement
import React from 'react'
function MinigamePlayArea({ onFinish, children }: { onFinish: () => void; children: ReactNode }) {
  return <>{React.Children.map(children, c =>
    React.isValidElement(c) ? React.cloneElement(c as React.ReactElement<any>, { onFinish }) : c
  )}</>
}

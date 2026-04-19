import { useEffect } from 'react'
import { MilaMascot } from './mascots'
import { Confetti } from './Confetti'
import { useSpeech, type NarratorLang } from '../hooks/useSpeech'
import { useSfx } from '../hooks/useSfx'

export function Celebration({
  stars, narrator, onContinue
}: { stars: number; narrator: NarratorLang; onContinue: () => void }) {
  const { say } = useSpeech()
  const { cheer } = useSfx()
  useEffect(() => {
    cheer()
    say('Bagus sekali, Mila!', 'id')
    say(narrator === 'en' ? 'Great job!' : 'Super gemacht!', narrator)
  }, [])
  return (
    <div className="relative min-h-screen grid place-items-center text-center p-6">
      <Confetti />
      <div className="bg-white rounded-[2rem] p-8 shadow-kid max-w-md w-full border-4 border-sunny">
        <MilaMascot size={180} dancing />
        <div className="text-5xl mt-4">
          {'⭐'.repeat(stars)}{'☆'.repeat(Math.max(0, 3 - stars))}
        </div>
        <h2 className="text-3xl font-bold mt-2">Bagus sekali!</h2>
        <p className="text-lg text-gray-600 mt-1">{narrator === 'en' ? 'Great job, Mila!' : 'Super gemacht, Mila!'}</p>
        <button onClick={onContinue} className="btn-kid bg-mint text-black mt-6 text-2xl">▶</button>
      </div>
    </div>
  )
}

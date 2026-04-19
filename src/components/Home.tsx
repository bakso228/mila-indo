import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { MilaMascot } from './mascots'
import { useSpeech, type NarratorLang } from '../hooks/useSpeech'
import { UNITS } from '../data/units'
import type { Progress } from '../utils/storage'
import { StreakPet } from './StreakPet'

type Props = {
  progress: Progress
  narrator: NarratorLang
  onToggleNarrator: () => void
  onStartLesson: (unitId: string, lessonId: string) => void
  onOpenStickers: () => void
}

export function Home({ progress, narrator, onToggleNarrator, onStartLesson, onOpenStickers }: Props) {
  const { say, hasIndonesianVoice } = useSpeech()

  useEffect(() => {
    const t = setTimeout(() => {
      say('Selamat pagi, Mila!', 'id')
      say(narrator === 'en' ? 'Ready to play?' : 'Bereit zu spielen?', narrator)
    }, 200)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="min-h-screen w-full p-4 pb-12">
      {/* Top bar */}
      <header className="flex items-center justify-between max-w-xl mx-auto">
        <StreakPet streak={progress.streak} />
        <button onClick={onOpenStickers} className="btn-kid bg-white text-xl px-4 py-2">📖</button>
        <button onClick={onToggleNarrator} className="btn-kid bg-white text-xl px-4 py-2" aria-label="Toggle narrator language">
          {narrator === 'en' ? '🇬🇧' : '🇩🇪'}
        </button>
      </header>

      {/* Greeting */}
      <section className="flex flex-col items-center mt-2 text-center">
        <MilaMascot size={160} waving />
        <h1 className="font-bold text-3xl mt-1">Selamat pagi, Mila!</h1>
        <p className="text-gray-700">🦋 {narrator === 'en' ? 'Let\'s learn Indonesian!' : 'Lass uns Indonesisch lernen!'}</p>
      </section>

      {!hasIndonesianVoice && (
        <div className="mt-3 mx-auto max-w-md bg-sunny/80 rounded-xl p-2 text-xs text-center">
          {narrator === 'en'
            ? '🎧 Tip for parents: install the Indonesian voice in system settings for the best experience.'
            : '🎧 Tipp für Eltern: Indonesische Stimme in den Einstellungen installieren für beste Aussprache.'}
        </div>
      )}

      {/* Path */}
      <div className="mt-6 max-w-xl mx-auto flex flex-col items-center gap-6">
        {UNITS.map((u, i) => {
          const unitUnlocked = i < 3  // first 3 units are active; rest are "Segera! (Soon!)"
          const completedLessons = u.lessons.filter(l => (progress.lessons[`${u.id}:${l.id}`] ?? 0) > 0).length
          const totalStars = u.lessons.reduce((acc, l) => acc + (progress.lessons[`${u.id}:${l.id}`] ?? 0), 0)
          const offset = i % 2 === 0 ? '-translate-x-10' : 'translate-x-10'
          return (
            <div key={u.id} className={`flex flex-col items-center gap-2 ${offset} ${unitUnlocked ? '' : 'opacity-60'}`}>
              <div className="flex items-center gap-3">
                <div className={`${u.color} rounded-full w-20 h-20 grid place-items-center text-4xl shadow-kid border-4 border-white ${unitUnlocked ? '' : 'grayscale'}`}>
                  {u.emoji}
                </div>
                <div className="text-left">
                  <div className="font-bold text-lg">{u.title}</div>
                  {unitUnlocked ? (
                    <div className="text-xs text-gray-600">{completedLessons}/{u.lessons.length} · ⭐{totalStars}</div>
                  ) : (
                    <div className="text-xs text-gray-500 italic">Segera! 🔒</div>
                  )}
                </div>
              </div>
              {unitUnlocked && (
                <div className="flex gap-2 flex-wrap justify-center">
                  {u.lessons.map((l, li) => {
                    const stars = progress.lessons[`${u.id}:${l.id}`] ?? 0
                    const prevDone = li === 0 ? true : (progress.lessons[`${u.id}:${u.lessons[li - 1].id}`] ?? 0) > 0
                    const unlocked = prevDone
                    return (
                      <motion.button key={l.id}
                        whileTap={{ scale: 0.9 }}
                        disabled={!unlocked}
                        onClick={() => onStartLesson(u.id, l.id)}
                        className={`rounded-2xl shadow-kid w-20 h-20 grid place-items-center text-2xl border-4 ${
                          stars > 0 ? 'bg-mint border-white' : unlocked ? 'bg-white border-white' : 'bg-white/40 border-white opacity-50'
                        }`}>
                        <div className="flex flex-col items-center">
                          <span>{stars > 0 ? '✓' : unlocked ? '▶' : '🔒'}</span>
                          {stars > 0 && <span className="text-xs">{'⭐'.repeat(stars)}</span>}
                        </div>
                      </motion.button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { Home } from './components/Home'
import { Lesson } from './components/Lesson'
import { StickerBook } from './components/StickerBook'
import { loadProgress, saveProgress, addSticker, Progress } from './utils/storage'
import { findUnit } from './data/units'
import type { NarratorLang } from './hooks/useSpeech'

type Screen = { name: 'home' } | { name: 'lesson'; unitId: string; lessonId: string } | { name: 'stickers' }

export default function App() {
  const [screen, setScreen] = useState<Screen>({ name: 'home' })
  const [progress, setProgress] = useState<Progress>(() => loadProgress())
  const [narrator, setNarrator] = useState<NarratorLang>(() => (localStorage.getItem('mila.narrator') as NarratorLang) || 'en')

  useEffect(() => { saveProgress(progress) }, [progress])
  useEffect(() => { localStorage.setItem('mila.narrator', narrator) }, [narrator])

  return (
    <div className="min-h-full w-full">
      {screen.name === 'home' && (
        <Home
          progress={progress}
          narrator={narrator}
          onToggleNarrator={() => setNarrator(n => (n === 'en' ? 'de' : 'en'))}
          onStartLesson={(unitId, lessonId) => setScreen({ name: 'lesson', unitId, lessonId })}
          onOpenStickers={() => setScreen({ name: 'stickers' })}
        />
      )}
      {screen.name === 'lesson' && (
        <Lesson
          unitId={screen.unitId}
          lessonId={screen.lessonId}
          narrator={narrator}
          onExit={(result) => {
            if (result) setProgress(p => applyLessonResult(p, screen.unitId, screen.lessonId, result))
            setScreen({ name: 'home' })
          }}
        />
      )}
      {screen.name === 'stickers' && (
        <StickerBook progress={progress} narrator={narrator} onBack={() => setScreen({ name: 'home' })} />
      )}
    </div>
  )
}

function applyLessonResult(p: Progress, unitId: string, lessonId: string, stars: number): Progress {
  const key = `${unitId}:${lessonId}`
  const prev = p.lessons[key] ?? 0
  const nextLessons = { ...p.lessons, [key]: Math.max(prev, stars) }
  const today = new Date().toISOString().slice(0, 10)
  const streak = p.lastPlayed === today
    ? p.streak
    : p.lastPlayed === yesterday() ? p.streak + 1 : 1
  let next: Progress = { ...p, lessons: nextLessons, streak, lastPlayed: today }
  // Unit complete → award sticker
  const unit = findUnit(unitId)
  const allDone = unit.lessons.every(l => (nextLessons[`${unitId}:${l.id}`] ?? 0) > 0)
  if (allDone) next = addSticker(next, unitId)
  return next
}

function yesterday() {
  const d = new Date(); d.setDate(d.getDate() - 1); return d.toISOString().slice(0, 10)
}

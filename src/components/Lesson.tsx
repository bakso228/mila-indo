import { useMemo, useState } from 'react'
import { findLesson, findUnit, type Exercise } from '../data/units'
import { WORDS, type Word } from '../data/vocab'
import { HearAndPick } from './exercises/HearAndPick'
import { PictureMatch } from './exercises/PictureMatch'
import { TrueFalse } from './exercises/TrueFalse'
import { WhoIsThis } from './exercises/WhoIsThis'
import { SayIt } from './exercises/SayIt'
import { CountIt } from './exercises/CountIt'
import { shuffle } from './exercises/shared'
import { Hearts } from './Hearts'
import { ProgressBar } from './ProgressBar'
import { Celebration } from './Celebration'
import { MinigameShell } from './minigames/MinigameShell'
import { BalloonPop } from './minigames/BalloonPop'
import { MemoryMatch } from './minigames/MemoryMatch'
import { FeedTheKucing } from './minigames/FeedTheKucing'
import { DanceParty } from './minigames/DanceParty'
import { FashionStudio } from './minigames/FashionStudio'
import { SwimmingIkan } from './minigames/SwimmingIkan'
import { JakartaTrip } from './minigames/JakartaTrip'
import { KitchenMama } from './minigames/KitchenMama'
import type { NarratorLang } from '../hooks/useSpeech'

type Props = {
  unitId: string
  lessonId: string
  narrator: NarratorLang
  onExit: (resultStars: number | null) => void
}

type Phase = 'exercises' | 'minigame' | 'bigMinigame' | 'celebration' | 'restart'

export function Lesson({ unitId, lessonId, narrator, onExit }: Props) {
  const unit = findUnit(unitId)
  const lesson = findLesson(unitId, lessonId)
  const [idx, setIdx] = useState(0)
  const [hearts, setHearts] = useState(3)
  const [mistakes, setMistakes] = useState(0)
  const [phase, setPhase] = useState<Phase>('exercises')

  const exercises = lesson.exercises
  const current = exercises[idx]

  const options = useMemo(() => buildOptions(current), [current, idx])

  const onExerciseDone = (result: 'correct' | 'wrong') => {
    if (result === 'wrong') {
      setMistakes(m => m + 1)
      if (current.kind !== 'sayIt') {
        setHearts(h => {
          const nh = h - 1
          if (nh <= 0) { setPhase('restart') }
          return Math.max(0, nh)
        })
      }
      return
    }
    if (idx + 1 >= exercises.length) {
      setPhase('minigame')
    } else {
      setIdx(i => i + 1)
    }
  }

  const afterMinigame = () => {
    // Decide whether to show big minigame: only on last lesson of unit and unit defines bigMinigame
    const isLastLesson = unit.lessons[unit.lessons.length - 1].id === lessonId
    if (isLastLesson && unit.bigMinigame) {
      setPhase('bigMinigame')
    } else {
      setPhase('celebration')
    }
  }

  const afterBig = () => setPhase('celebration')

  if (phase === 'restart') {
    return (
      <div className="min-h-screen grid place-items-center p-6 text-center">
        <div className="bg-white rounded-[2rem] p-8 shadow-kid max-w-sm border-4 border-sunny">
          <div className="text-6xl">🦋</div>
          <h2 className="text-2xl font-bold mt-2">{narrator === 'en' ? 'Let\'s try again!' : 'Nochmal versuchen!'}</h2>
          <div className="flex gap-3 justify-center mt-4">
            <button onClick={() => { setHearts(3); setMistakes(0); setIdx(0); setPhase('exercises') }}
              className="btn-kid bg-mint">🔄</button>
            <button onClick={() => onExit(null)} className="btn-kid bg-white">🏠</button>
          </div>
        </div>
      </div>
    )
  }

  if (phase === 'minigame') {
    const games = [BalloonPop, MemoryMatch, FeedTheKucing, DanceParty]
    const G = games[Math.floor(Math.random() * games.length)]
    return (
      <MinigameShell narrator={narrator} onDone={afterMinigame}>
        <G narrator={narrator} vocab={exerciseWords(exercises)} />
      </MinigameShell>
    )
  }

  if (phase === 'bigMinigame' && unit.bigMinigame) {
    const BIG = { fashion: FashionStudio, swimming: SwimmingIkan, jakarta: JakartaTrip, kitchen: KitchenMama }[unit.bigMinigame]
    return (
      <MinigameShell narrator={narrator} onDone={afterBig} big>
        <BIG narrator={narrator} />
      </MinigameShell>
    )
  }

  if (phase === 'celebration') {
    const stars = mistakes === 0 ? 3 : mistakes === 1 ? 2 : 1
    return <Celebration stars={stars} narrator={narrator} onContinue={() => onExit(stars)} />
  }

  return (
    <div className="min-h-screen flex flex-col p-4">
      <div className="flex items-center gap-3 max-w-xl mx-auto w-full">
        <button onClick={() => onExit(null)} className="btn-kid bg-white px-3 py-2">✕</button>
        <ProgressBar value={idx} total={exercises.length} />
        <Hearts count={hearts} />
      </div>
      <div className="flex-1 grid place-items-center">
        <div key={idx} className="w-full max-w-xl">
          <ExerciseView ex={current} options={options} narrator={narrator} onDone={onExerciseDone} />
        </div>
      </div>
    </div>
  )
}

function ExerciseView({ ex, options, narrator, onDone }:
  { ex: Exercise; options: Word[]; narrator: NarratorLang; onDone: (r: 'correct' | 'wrong') => void }) {
  const target = WORDS[ex.wordId]
  const shared = { target, options, narrator, onDone }
  switch (ex.kind) {
    case 'hearAndPick': return <HearAndPick {...shared} />
    case 'pictureMatch': return <PictureMatch {...shared} />
    case 'trueFalse':    return <TrueFalse {...shared} />
    case 'whoIsThis':    return <WhoIsThis {...shared} />
    case 'sayIt':        return <SayIt {...shared} />
    case 'countIt':      return <CountIt {...shared} />
  }
}

function buildOptions(ex: Exercise): Word[] {
  const target = WORDS[ex.wordId]
  const distractors = (ex.distractorIds ?? []).map(id => WORDS[id]).filter(Boolean)
  const base = [target, ...distractors]
  // Ensure at least 4 options for the picker/matching exercises
  const numeric = ex.kind === 'countIt'
  while (base.length < 4) {
    const candidates = Object.values(WORDS).filter(w =>
      !base.find(b => b.id === w.id) && (numeric ? typeof w.count === 'number' : true)
    )
    if (!candidates.length) break
    base.push(candidates[Math.floor(Math.random() * candidates.length)])
  }
  return shuffle(base.slice(0, 4))
}

function exerciseWords(exs: Exercise[]): Word[] {
  const ids = new Set<string>()
  exs.forEach(e => { ids.add(e.wordId); (e.distractorIds ?? []).forEach(d => ids.add(d)) })
  return Array.from(ids).map(id => WORDS[id]).filter(Boolean)
}

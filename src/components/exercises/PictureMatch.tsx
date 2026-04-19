import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useSpeech } from '../../hooks/useSpeech'
import { useSfx } from '../../hooks/useSfx'
import { WordPicture } from '../WordPicture'
import { shuffle, firstExerciseOfSession, introFor, type ExerciseProps } from './shared'

export function PictureMatch({ options, narrator, onDone }: ExerciseProps) {
  const { say } = useSpeech()
  const { ding, boing, cheer } = useSfx()
  const pics = useMemo(() => options.slice(0, 4), [])
  const audios = useMemo(() => shuffle(pics), [])

  const [selectedPic, setSelectedPic] = useState<string | null>(null)
  const [selectedAudio, setSelectedAudio] = useState<string | null>(null)
  const [matched, setMatched] = useState<Set<string>>(new Set())
  const [wrongPulse, setWrongPulse] = useState<string | null>(null)

  useEffect(() => {
    if (firstExerciseOfSession()) say(introFor(narrator, 'pictureMatch'), narrator)
  }, [])

  useEffect(() => {
    if (!selectedPic || !selectedAudio) return
    if (selectedPic === selectedAudio) {
      ding()
      const word = pics.find(p => p.id === selectedPic)
      if (word) say(word.word, 'id')
      const nextMatched = new Set(matched); nextMatched.add(selectedPic)
      setMatched(nextMatched)
      setSelectedPic(null); setSelectedAudio(null)
      if (nextMatched.size === pics.length) {
        cheer()
        setTimeout(() => onDone('correct'), 900)
      }
    } else {
      boing()
      setWrongPulse(selectedPic)
      setTimeout(() => { setSelectedPic(null); setSelectedAudio(null); setWrongPulse(null) }, 700)
    }
  }, [selectedPic, selectedAudio])

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="grid grid-cols-2 gap-4 w-full max-w-xl">
        <div className="flex flex-col gap-3">
          {pics.map(p => {
            const isDone = matched.has(p.id)
            const isSel = selectedPic === p.id
            const wrong = wrongPulse === p.id
            return (
              <motion.button key={p.id} whileTap={{ scale: 0.95 }} disabled={isDone}
                onClick={() => setSelectedPic(p.id)}
                className={`rounded-2xl p-2 shadow-kid border-4 min-h-[92px] flex flex-col items-center justify-center gap-1 ${
                  isDone ? 'bg-mint border-mint opacity-60' : isSel ? 'bg-sunny border-coral' : wrong ? 'bg-coral/40 border-coral' : 'bg-white border-white'}`}>
                <WordPicture word={p} size={56} />
                <span className="font-bold text-xs sm:text-sm text-center leading-tight">{p.word}</span>
              </motion.button>
            )
          })}
        </div>
        <div className="flex flex-col gap-3">
          {audios.map(a => {
            const isDone = matched.has(a.id)
            const isSel = selectedAudio === a.id
            return (
              <motion.button key={a.id} whileTap={{ scale: 0.95 }} disabled={isDone}
                onClick={() => { setSelectedAudio(a.id); say(a.word, 'id') }}
                className={`rounded-2xl p-2 shadow-kid border-4 min-h-[92px] flex flex-col items-center justify-center gap-1 ${
                  isDone ? 'bg-mint border-mint opacity-60' : isSel ? 'bg-sunny border-teal' : 'bg-white border-white'}`}>
                <span className="text-4xl">🔊</span>
                <span className="font-bold text-xs sm:text-sm">{a.word}</span>
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

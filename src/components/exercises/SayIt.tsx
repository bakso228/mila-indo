import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useSpeech } from '../../hooks/useSpeech'
import { useSfx } from '../../hooks/useSfx'
import { useSpeechRecognition, matches } from '../../hooks/useSpeechRecognition'
import { useMicRecording } from '../../hooks/useMicRecording'
import { WordPicture } from '../WordPicture'
import { WordHeader } from './WordHeader'
import { firstExerciseOfSession, introFor, type ExerciseProps } from './shared'

export function SayIt({ target, narrator, onDone }: ExerciseProps) {
  const { say } = useSpeech()
  const { ding, cheer } = useSfx()
  const rec = useSpeechRecognition('id-ID')
  const mic = useMicRecording()
  const [result, setResult] = useState<'none' | 'heard-right' | 'heard-wrong'>('none')
  const [tries, setTries] = useState(0)

  useEffect(() => {
    if (firstExerciseOfSession()) say(introFor(narrator, 'sayIt'), narrator)
    say(target.word, 'id', { repeat: 2, gapMs: 500 })
  }, [target.id])

  useEffect(() => {
    if (!rec.listening && rec.heard) {
      if (matches(rec.heard, target.word)) {
        setResult('heard-right'); cheer()
        say('Hebat!', 'id'); say(target.word, 'id')
      } else {
        setResult('heard-wrong')
        say(target.word, 'id', { rate: 0.4 })
      }
    }
  }, [rec.listening, rec.heard])

  const onRecordPress = async () => {
    if (rec.listening || mic.recording) {
      rec.stop(); mic.stop(); return
    }
    setResult('none'); rec.reset()
    await mic.start()
    if (rec.supported) rec.start()
  }

  const approve = () => { ding(); onDone('correct') }

  return (
    <div className="flex flex-col items-center gap-3 p-4">
      <WordHeader word={target.word} />
      <div className="rounded-[2rem] bg-white p-5 shadow-kid border-4 border-sunny">
        <WordPicture word={target} size={140} />
      </div>

      <motion.button
        whileTap={{ scale: 0.92 }}
        onClick={onRecordPress}
        className={`w-28 h-28 rounded-full grid place-items-center text-6xl shadow-kid border-4 border-white ${
          rec.listening || mic.recording ? 'bg-coral animate-pulse-ring' : 'bg-coral/80'}`}
        aria-label="Record your voice"
      >
        🎤
      </motion.button>

      <div className="flex gap-3 flex-wrap justify-center">
        {mic.blobUrl && (
          <button onClick={() => new Audio(mic.blobUrl!).play()} className="btn-kid bg-sunny text-black" aria-label="Play recording">🔁</button>
        )}
        <button onClick={approve} className="btn-kid bg-mint text-black" aria-label="I said it">⭐</button>
        <button onClick={() => { setTries(t => t+1); setResult('none'); rec.reset(); mic.reset(); say(target.word, 'id', { repeat: 2, gapMs: 500 }) }}
          className="btn-kid bg-white text-black" aria-label="Try again">🔄</button>
      </div>

      {result === 'heard-right' && (
        <div className="text-center mt-1">
          <p className="text-2xl font-bold">🎉 Hebat!</p>
          <button onClick={approve} className="btn-kid bg-mint text-black mt-2">▶</button>
        </div>
      )}
      {!rec.supported && tries === 0 && (
        <p className="text-xs text-gray-500 max-w-xs text-center">{narrator === 'en' ? 'Tap ⭐ when you said it!' : 'Tippe ⭐ wenn du es gesagt hast!'}</p>
      )}
    </div>
  )
}

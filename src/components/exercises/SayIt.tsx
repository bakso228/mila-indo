import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useSpeech } from '../../hooks/useSpeech'
import { useSfx } from '../../hooks/useSfx'
import { useSpeechRecognition, matches } from '../../hooks/useSpeechRecognition'
import { useMicRecording } from '../../hooks/useMicRecording'
import { WordPicture } from '../WordPicture'
import type { ExerciseProps } from './shared'

export function SayIt({ target, narrator, onDone }: ExerciseProps) {
  const { say } = useSpeech()
  const { ding, cheer } = useSfx()
  const rec = useSpeechRecognition('id-ID')
  const mic = useMicRecording()
  const [result, setResult] = useState<'none' | 'heard-right' | 'heard-wrong'>('none')
  const [tries, setTries] = useState(0)

  useEffect(() => {
    say(narrator === 'en' ? `Can you say ${target.word}?` : `Kannst du ${target.word} sagen?`, narrator)
    say(target.word, 'id')
  }, [target.id])

  useEffect(() => {
    if (!rec.listening && rec.heard) {
      if (matches(rec.heard, target.word)) {
        setResult('heard-right'); cheer()
        say(narrator === 'en' ? `Wow! I heard ${target.word}!` : `Wow! Ich habe ${target.word} gehört!`, narrator)
      } else {
        setResult('heard-wrong')
        say(narrator === 'en' ? 'I heard something cool! Try again?' : 'Ich habe etwas gehört! Nochmal?', narrator)
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

  const approve = () => {
    ding()
    onDone('correct')
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="rounded-[2rem] bg-white p-5 shadow-kid border-4 border-sunny">
        <WordPicture word={target} size={150} />
      </div>
      <button onClick={() => say(target.word, 'id')}
        className="rounded-full bg-teal text-white w-16 h-16 grid place-items-center text-3xl shadow-kid">🔊</button>

      <motion.button
        whileTap={{ scale: 0.92 }}
        onClick={onRecordPress}
        className={`w-32 h-32 rounded-full grid place-items-center text-7xl shadow-kid border-4 border-white ${
          rec.listening || mic.recording ? 'bg-coral animate-pulse-ring' : 'bg-coral/80'}`}
        aria-label="Record your voice"
      >
        🎤
      </motion.button>

      <div className="flex gap-3 flex-wrap justify-center">
        {mic.blobUrl && (
          <button onClick={() => new Audio(mic.blobUrl!).play()} className="btn-kid bg-sunny text-black">🔁</button>
        )}
        <button onClick={approve} className="btn-kid bg-mint text-black">⭐</button>
        <button onClick={() => { setTries(t => t+1); setResult('none'); rec.reset(); mic.reset(); say(target.word, 'id') }}
          className="btn-kid bg-white text-black">🔄</button>
      </div>

      {result === 'heard-right' && (
        <div className="text-center mt-2">
          <p className="text-2xl">🎉 Hebat!</p>
          <button onClick={approve} className="btn-kid bg-mint text-black mt-2">▶</button>
        </div>
      )}
      {result === 'heard-wrong' && (
        <p className="text-lg text-gray-600">{narrator === 'en' ? 'I heard something! Tap ⭐ if you said it, or 🔄 to try again.' : 'Ich habe etwas gehört! Tippe ⭐ oder 🔄.'}</p>
      )}
      {!rec.supported && tries === 0 && (
        <p className="text-xs text-gray-500 max-w-xs text-center">{narrator === 'en' ? 'Your browser doesn\'t check speech — just tap ⭐ when you said it!' : 'Dieser Browser prüft nicht — tippe ⭐ wenn du es gesagt hast!'}</p>
      )}
    </div>
  )
}

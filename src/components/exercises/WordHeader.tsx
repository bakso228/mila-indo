import { useSpeech } from '../../hooks/useSpeech'

type Props = {
  word: string            // the Indonesian word to show and speak
  hideWord?: boolean      // for "listen only, don't spoil it" exercises (rare)
}

// The big, tap-to-replay Indonesian word header shown on top of every exercise.
// Left side: normal-speed 🔊 replay. Right side: slow-speed 🐢 replay.
// Middle: the word text, big and bold — still solvable without reading.
export function WordHeader({ word, hideWord = false }: Props) {
  const { say } = useSpeech()
  const normal = () => say(word, 'id', { preempt: true })
  const slow = () => say(word, 'id', { rate: 0.4, preempt: true })

  return (
    <div className="w-full max-w-md mx-auto flex items-center justify-center gap-3 my-2 px-2">
      <button
        onClick={normal}
        aria-label="Replay"
        className="rounded-full bg-teal text-white w-14 h-14 grid place-items-center text-2xl shadow-kid active:translate-y-1 active:shadow-none"
      >🔊</button>
      <button
        onClick={normal}
        aria-label="Target word"
        className="flex-1 rounded-3xl bg-white shadow-kid border-4 border-sunny px-4 py-3 text-center active:translate-y-1"
      >
        <div className="text-2xl sm:text-3xl font-bold tracking-wide">
          {hideWord ? '🎧 …' : word}
        </div>
      </button>
      <button
        onClick={slow}
        aria-label="Slow replay"
        className="rounded-full bg-sunny w-14 h-14 grid place-items-center text-2xl shadow-kid active:translate-y-1 active:shadow-none"
      >🐢</button>
    </div>
  )
}

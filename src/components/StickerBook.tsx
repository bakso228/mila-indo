import { useSpeech, type NarratorLang } from '../hooks/useSpeech'
import { UNITS } from '../data/units'
import { WORDS } from '../data/vocab'
import type { Progress } from '../utils/storage'

export function StickerBook({ progress, narrator, onBack }: { progress: Progress; narrator: NarratorLang; onBack: () => void }) {
  const { say } = useSpeech()
  return (
    <div className="min-h-screen p-4">
      <div className="flex items-center justify-between max-w-xl mx-auto">
        <button onClick={onBack} className="btn-kid bg-white">🏠</button>
        <h2 className="text-2xl font-bold">📖</h2>
        <span className="w-12" />
      </div>
      <div className="mt-4 max-w-xl mx-auto grid grid-cols-3 sm:grid-cols-4 gap-4">
        {UNITS.map(u => {
          const have = progress.stickers.includes(u.id)
          const word = WORDS[u.stickerWordId]
          return (
            <button key={u.id}
              onClick={() => { if (have) { say(word.word, 'id'); say(narrator === 'en' ? word.en : word.de, narrator) } }}
              className={`aspect-square rounded-2xl shadow-kid flex flex-col items-center justify-center gap-1 border-4 p-2 ${
                have ? 'bg-white border-sunny' : 'bg-white/40 border-white grayscale opacity-50'
              }`}>
              <span className="text-4xl">{have ? u.stickerEmoji : '❓'}</span>
              <span className="font-bold text-xs sm:text-sm text-center leading-tight">
                {have ? word.word : '???'}
              </span>
            </button>
          )
        })}
      </div>
      <p className="text-center mt-6 text-gray-700">{narrator === 'en' ? 'Tap a sticker to hear the word!' : 'Tippe auf einen Sticker!'}</p>
    </div>
  )
}

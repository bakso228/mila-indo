import type { NarratorLang } from '../../hooks/useSpeech'
import type { Word } from '../../data/vocab'

export type ExerciseResult = 'correct' | 'wrong'

export type ExerciseProps = {
  target: Word
  options: Word[]            // pre-shuffled, includes target
  narrator: NarratorLang
  onDone: (r: ExerciseResult) => void
}

export function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export const instructionFor = (narrator: NarratorLang, kind: string, word: Word): string => {
  const w = narrator === 'en' ? word.en : word.de
  switch (kind) {
    case 'hearAndPick': return narrator === 'en' ? `Which one is ${word.word}?` : `Welches ist ${word.word}?`
    case 'pictureMatch':return narrator === 'en' ? `Match the sounds to the pictures!` : `Finde die Paare!`
    case 'trueFalse':   return narrator === 'en' ? `Is this ${word.word}?` : `Ist das ${word.word}?`
    case 'whoIsThis':   return narrator === 'en' ? `Who is this in Indonesian?` : `Wer ist das auf Indonesisch?`
    case 'sayIt':       return narrator === 'en' ? `Can you say ${word.word}? That means ${w}!` : `Kannst du ${word.word} sagen? Das heißt ${w}!`
    default: return ''
  }
}

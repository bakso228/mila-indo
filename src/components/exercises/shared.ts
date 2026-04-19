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

// Session-scoped "have we given the narrator intro yet?" flag
const INTRO_KEY = 'mila.introSeen.v1'
export function firstExerciseOfSession(): boolean {
  try {
    if (sessionStorage.getItem(INTRO_KEY) === '1') return false
    sessionStorage.setItem(INTRO_KEY, '1')
    return true
  } catch { return false }
}

// A short one-time narrator intro in the parent's language.
// Only plays on the very first exercise of the session, to teach Mila what to do.
export function introFor(narrator: NarratorLang, kind: string): string {
  if (narrator === 'de') {
    switch (kind) {
      case 'hearAndPick': return 'Tippe auf das passende Bild!'
      case 'pictureMatch': return 'Finde die Paare!'
      case 'trueFalse': return 'Ja oder Nein?'
      case 'whoIsThis': return 'Wer ist das? Hör zu und tippe!'
      case 'sayIt': return 'Sag es mir nach!'
      case 'countIt': return 'Wie viele sind das?'
      default: return ''
    }
  }
  switch (kind) {
    case 'hearAndPick': return 'Tap the matching picture!'
    case 'pictureMatch': return 'Find the pairs!'
    case 'trueFalse': return 'Yes or no?'
    case 'whoIsThis': return 'Who is this? Listen and tap!'
    case 'sayIt': return 'Say it after me!'
    case 'countIt': return 'How many?'
    default: return ''
  }
}

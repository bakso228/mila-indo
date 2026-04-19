import { FamilyAvatar } from './mascots'
import { NumberPicture } from './NumberPicture'
import { GREETING_ICONS } from './icons/greetings'
import type { Word } from '../data/vocab'

type Props = {
  word: Word
  size?: number
  showLabel?: boolean   // show the Indonesian word as text under the picture (default false)
  labelClass?: string   // override label styling
}

export function WordPicture({ word, size = 110, showLabel = false, labelClass }: Props) {
  const pic = renderPicture(word, size)
  if (!showLabel) return pic
  return (
    <div className="flex flex-col items-center gap-1">
      {pic}
      <span className={labelClass ?? 'font-bold text-base sm:text-lg text-center leading-tight'}>
        {word.word}
      </span>
    </div>
  )
}

function renderPicture(word: Word, size: number) {
  // Family member with a real photo or avatar
  if (word.family) {
    return <div style={{ width: size, height: size }} className="grid place-items-center">
      <FamilyAvatar who={word.family} size={size} />
    </div>
  }
  // Number (counting)
  if (typeof word.count === 'number') {
    return <NumberPicture n={word.count} size={size} emoji={word.emoji ?? '🍎'} />
  }
  // Custom greeting icon
  if (GREETING_ICONS[word.id]) {
    const Icon = GREETING_ICONS[word.id]
    return <div style={{ width: size, height: size }} className="overflow-hidden rounded-2xl">
      <Icon size={size} />
    </div>
  }
  // Default: emoji
  return (
    <div
      className="grid place-items-center"
      style={{ width: size, height: size, fontSize: Math.floor(size * 0.7), lineHeight: 1 }}
    >
      <span>{word.emoji ?? '❓'}</span>
    </div>
  )
}

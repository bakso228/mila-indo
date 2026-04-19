import { FamilyAvatar } from './mascots'
import type { Word } from '../data/vocab'

export function WordPicture({ word, size = 110 }: { word: Word; size?: number }) {
  if (word.family) {
    return (
      <div style={{ width: size, height: size }} className="grid place-items-center">
        <FamilyAvatar who={word.family} size={size} />
      </div>
    )
  }
  return (
    <div
      className="grid place-items-center"
      style={{ width: size, height: size, fontSize: Math.floor(size * 0.7), lineHeight: 1 }}
    >
      <span>{word.emoji ?? '❓'}</span>
    </div>
  )
}

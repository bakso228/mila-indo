import type { FamilyKey } from '../../data/vocab'
import { MilaMascot } from './MilaMascot'
import { KianMascot } from './KianMascot'
import { MamaAvatar } from './MamaAvatar'
import { PapaAvatar } from './PapaAvatar'
import { YangtiAvatar } from './YangtiAvatar'
import { YangkungAvatar } from './YangkungAvatar'
import { OmaAvatar } from './OmaAvatar'

export { MilaMascot, KianMascot, MamaAvatar, PapaAvatar, YangtiAvatar, YangkungAvatar, OmaAvatar }

// Photo-backed family members (real cropped photos in public/family)
const PHOTOS: Partial<Record<FamilyKey, string>> = {
  mila: '/family/mila.jpg',
  kian: '/family/kian.jpg',
  mama: '/family/mama.jpg',
  papa: '/family/papa.jpg'
}

function Photo({ src, size, alt }: { src: string; size: number; alt: string }) {
  return (
    <div
      className="rounded-full overflow-hidden shadow-inner ring-4 ring-white"
      style={{ width: size, height: size }}
    >
      <img src={src} alt={alt} width={size} height={size} className="w-full h-full object-cover" />
    </div>
  )
}

export function FamilyAvatar({ who, size = 140 }: { who: FamilyKey; size?: number }) {
  const photo = PHOTOS[who]
  if (photo) return <Photo src={photo} size={size} alt={who} />
  switch (who) {
    case 'yangti': return <YangtiAvatar size={size} />
    case 'yangkung': return <YangkungAvatar size={size} />
    case 'oma': return <OmaAvatar size={size} />
    // fallbacks (shouldn't hit; photos cover the rest)
    case 'mila': return <MilaMascot size={size} />
    case 'kian': return <KianMascot size={size} />
    case 'mama': return <MamaAvatar size={size} />
    case 'papa': return <PapaAvatar size={size} />
  }
}

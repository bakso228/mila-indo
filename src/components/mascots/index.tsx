import type { FamilyKey } from '../../data/vocab'
import { MilaMascot } from './MilaMascot'
import { KianMascot } from './KianMascot'
import { MamaAvatar } from './MamaAvatar'
import { PapaAvatar } from './PapaAvatar'
import { YangtiAvatar } from './YangtiAvatar'
import { YangkungAvatar } from './YangkungAvatar'
import { OmaAvatar } from './OmaAvatar'

export { MilaMascot, KianMascot, MamaAvatar, PapaAvatar, YangtiAvatar, YangkungAvatar, OmaAvatar }

export function FamilyAvatar({ who, size = 140 }: { who: FamilyKey; size?: number }) {
  switch (who) {
    case 'mila': return <MilaMascot size={size} />
    case 'kian': return <KianMascot size={size} />
    case 'mama': return <MamaAvatar size={size} />
    case 'papa': return <PapaAvatar size={size} />
    case 'yangti': return <YangtiAvatar size={size} />
    case 'yangkung': return <YangkungAvatar size={size} />
    case 'oma': return <OmaAvatar size={size} />
  }
}

export type Progress = {
  lessons: Record<string, number>  // "unitId:lessonId" -> stars (0..3)
  streak: number
  lastPlayed: string | null        // YYYY-MM-DD
  stickers: string[]               // unit ids with stickers earned
}

const KEY = 'mila.progress.v1'

export function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return empty()
    const p = JSON.parse(raw) as Partial<Progress>
    return {
      lessons: p.lessons ?? {},
      streak: p.streak ?? 0,
      lastPlayed: p.lastPlayed ?? null,
      stickers: p.stickers ?? []
    }
  } catch {
    return empty()
  }
}

export function saveProgress(p: Progress) {
  try { localStorage.setItem(KEY, JSON.stringify(p)) } catch { /* ignore quota */ }
}

function empty(): Progress {
  return { lessons: {}, streak: 0, lastPlayed: null, stickers: [] }
}

export function unitComplete(p: Progress, unitId: string, lessonIds: string[]): boolean {
  return lessonIds.every(lid => (p.lessons[`${unitId}:${lid}`] ?? 0) > 0)
}

export function addSticker(p: Progress, unitId: string): Progress {
  if (p.stickers.includes(unitId)) return p
  return { ...p, stickers: [...p.stickers, unitId] }
}

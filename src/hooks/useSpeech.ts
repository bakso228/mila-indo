import { useCallback, useEffect, useRef, useState } from 'react'

export type Lang = 'id' | 'en' | 'de'
export type NarratorLang = 'en' | 'de'

const LANG_MAP: Record<Lang, string> = { id: 'id-ID', en: 'en-US', de: 'de-DE' }

function pickVoice(voices: SpeechSynthesisVoice[], lang: Lang): SpeechSynthesisVoice | undefined {
  const prefix = lang // 'id' | 'en' | 'de'
  // Prefer voices whose lang starts with the code, prefer non-default ones for Indonesian to get a real id-ID voice
  const matches = voices.filter(v => v.lang.toLowerCase().startsWith(prefix))
  if (matches.length === 0) return undefined
  // Prefer Google / local voices if available
  return matches.find(v => /google|microsoft|apple|indonesia|native/i.test(v.name)) ?? matches[0]
}

export function useSpeech() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [hasId, setHasId] = useState(true) // assume true until proven otherwise
  const queue = useRef<Promise<void>>(Promise.resolve())

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    const load = () => {
      const vs = window.speechSynthesis.getVoices()
      setVoices(vs)
      setHasId(vs.some(v => v.lang.toLowerCase().startsWith('id')))
    }
    load()
    window.speechSynthesis.onvoiceschanged = load
    return () => { window.speechSynthesis.onvoiceschanged = null }
  }, [])

  const say = useCallback((text: string, lang: Lang = 'id'): Promise<void> => {
    const task = () => new Promise<void>((resolve) => {
      if (!('speechSynthesis' in window)) { resolve(); return }
      try { window.speechSynthesis.cancel() } catch { /* no-op */ }
      const u = new SpeechSynthesisUtterance(text)
      u.lang = LANG_MAP[lang]
      const v = pickVoice(voices, lang)
      if (v) u.voice = v
      u.rate = lang === 'id' ? 0.85 : 0.95
      u.pitch = 1.05
      u.onend = () => resolve()
      u.onerror = () => resolve()
      try { window.speechSynthesis.speak(u) } catch { resolve() }
    })
    // chain so multiple say() calls play in order
    const next = queue.current.then(task)
    queue.current = next
    return next
  }, [voices])

  const stop = useCallback(() => {
    try { window.speechSynthesis.cancel() } catch { /* no-op */ }
    queue.current = Promise.resolve()
  }, [])

  return { say, stop, hasIndonesianVoice: hasId }
}

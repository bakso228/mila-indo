import { useCallback, useEffect, useRef, useState } from 'react'

export type Lang = 'id' | 'en' | 'de'
export type NarratorLang = 'en' | 'de'

export type SayOpts = {
  rate?: number
  pitch?: number
  repeat?: number   // number of times to say the text (default 1)
  gapMs?: number    // pause between repeats (default 350)
}

const LANG_MAP: Record<Lang, string> = { id: 'id-ID', en: 'en-US', de: 'de-DE' }

// Defaults tuned for a 5yo learning the language.
const DEFAULT_RATE: Record<Lang, number> = {
  id: 0.55,  // slow — target language, she needs to hear every phoneme
  en: 0.9,
  de: 0.9
}

function pickVoice(voices: SpeechSynthesisVoice[], lang: Lang): SpeechSynthesisVoice | undefined {
  const matches = voices.filter(v => v.lang.toLowerCase().startsWith(lang))
  if (matches.length === 0) return undefined
  return matches.find(v => /google|microsoft|apple|indonesia|native/i.test(v.name)) ?? matches[0]
}

function delay(ms: number) { return new Promise<void>(r => setTimeout(r, ms)) }

export function useSpeech() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [hasId, setHasId] = useState(true)
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

  const say = useCallback((text: string, lang: Lang = 'id', opts: SayOpts = {}): Promise<void> => {
    const rate  = opts.rate  ?? DEFAULT_RATE[lang]
    const pitch = opts.pitch ?? 1.05
    const repeat = Math.max(1, opts.repeat ?? 1)
    const gapMs = opts.gapMs ?? 350

    const speakOnce = () => new Promise<void>((resolve) => {
      if (!('speechSynthesis' in window)) { resolve(); return }
      try { window.speechSynthesis.cancel() } catch { /* no-op */ }
      const u = new SpeechSynthesisUtterance(text)
      u.lang = LANG_MAP[lang]
      const v = pickVoice(voices, lang)
      if (v) u.voice = v
      u.rate = rate
      u.pitch = pitch
      u.onend = () => resolve()
      u.onerror = () => resolve()
      try { window.speechSynthesis.speak(u) } catch { resolve() }
    })

    const task = async () => {
      for (let i = 0; i < repeat; i++) {
        await speakOnce()
        if (i < repeat - 1) await delay(gapMs)
      }
    }

    const next = queue.current.then(task)
    queue.current = next.catch(() => { /* swallow */ })
    return next
  }, [voices])

  const stop = useCallback(() => {
    try { window.speechSynthesis.cancel() } catch { /* no-op */ }
    queue.current = Promise.resolve()
  }, [])

  return { say, stop, hasIndonesianVoice: hasId }
}

import { useCallback, useEffect, useState } from 'react'

export type Lang = 'id' | 'en' | 'de'
export type NarratorLang = 'en' | 'de'

export type SayOpts = {
  rate?: number
  pitch?: number
  repeat?: number     // number of times to say the text (default 1)
  gapMs?: number      // pause between repeats (default 350)
  preempt?: boolean   // true = cancel whatever is playing/queued and start now
}

const LANG_MAP: Record<Lang, string> = { id: 'id-ID', en: 'en-US', de: 'de-DE' }

// Tuned for a 5yo learning — slow for target language so every phoneme lands.
const DEFAULT_RATE: Record<Lang, number> = { id: 0.55, en: 0.9, de: 0.9 }

function pickVoice(voices: SpeechSynthesisVoice[], lang: Lang): SpeechSynthesisVoice | undefined {
  const matches = voices.filter(v => v.lang.toLowerCase().startsWith(lang))
  if (matches.length === 0) return undefined
  return matches.find(v => /google|microsoft|apple|indonesia|native/i.test(v.name)) ?? matches[0]
}

// Module-scope state: one generation counter, one queue.
// - Non-preempt say() appends to the queue with the CURRENT generation. It
//   plays after whatever is in the queue.
// - Preempt say() bumps the generation (so older queued tasks bail on their
//   next check), cancels the current utterance, and resets the queue.
let GEN = 0
let QUEUE: Promise<void> = Promise.resolve()

const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms))

export function useSpeech() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [hasId, setHasId] = useState(true)

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
    const rate   = opts.rate   ?? DEFAULT_RATE[lang]
    const pitch  = opts.pitch  ?? 1.05
    const repeat = Math.max(1, opts.repeat ?? 1)
    const gapMs  = opts.gapMs  ?? 350
    const preempt = opts.preempt ?? false

    if (preempt) {
      GEN++
      try { window.speechSynthesis.cancel() } catch { /* no-op */ }
      QUEUE = Promise.resolve()
    }

    const myGen = GEN

    const speakOnce = () => new Promise<void>((resolve) => {
      if (!('speechSynthesis' in window)) { resolve(); return }
      if (myGen !== GEN) { resolve(); return }
      const u = new SpeechSynthesisUtterance(text)
      u.lang = LANG_MAP[lang]
      const v = pickVoice(voices, lang)
      if (v) u.voice = v
      u.rate = rate
      u.pitch = pitch
      u.onend = () => resolve()
      u.onerror = () => resolve()
      // Chrome quirk: cancel() then immediate speak() sometimes drops the
      // speak. Small delay sidesteps that.
      setTimeout(() => {
        if (myGen !== GEN) { resolve(); return }
        try { window.speechSynthesis.speak(u) } catch { resolve() }
      }, preempt ? 80 : 20)
    })

    const task = async () => {
      for (let i = 0; i < repeat; i++) {
        if (myGen !== GEN) return
        await speakOnce()
        if (myGen !== GEN) return
        if (i < repeat - 1) await sleep(gapMs)
      }
    }

    QUEUE = QUEUE.then(task, task)
    return QUEUE
  }, [voices])

  // Preempts everything. Use on unmount to silence current lesson's audio.
  const stop = useCallback(() => {
    GEN++
    try { window.speechSynthesis.cancel() } catch { /* no-op */ }
    QUEUE = Promise.resolve()
  }, [])

  return { say, stop, hasIndonesianVoice: hasId }
}

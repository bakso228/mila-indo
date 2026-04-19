import { useCallback, useEffect, useRef, useState } from 'react'

function SR(): { new (): SpeechRecognition } | undefined {
  return window.SpeechRecognition ?? window.webkitSpeechRecognition
}

export function isSpeechRecognitionSupported(): boolean {
  return typeof window !== 'undefined' && !!SR()
}

function normalize(s: string): string {
  return s.toLowerCase().replace(/[^a-z\u00C0-\u017F]/g, '')
}

// Very lenient match — a 5yo's pronunciation won't be textbook
export function matches(heard: string, expected: string): boolean {
  const h = normalize(heard)
  const e = normalize(expected.split(' ')[0]) // compare against first word (e.g., "kentang goreng" → "kentang")
  if (!h || !e) return false
  if (h === e) return true
  if (h.startsWith(e.slice(0, Math.max(2, Math.floor(e.length * 0.6))))) return true
  if (e.startsWith(h.slice(0, Math.max(2, Math.floor(h.length * 0.6))))) return true
  return levenshtein(h, e) <= Math.max(1, Math.ceil(e.length / 3))
}

function levenshtein(a: string, b: string): number {
  if (a === b) return 0
  if (!a.length) return b.length
  if (!b.length) return a.length
  const dp: number[] = Array.from({ length: b.length + 1 }, (_, i) => i)
  for (let i = 1; i <= a.length; i++) {
    let prev = dp[0]; dp[0] = i
    for (let j = 1; j <= b.length; j++) {
      const tmp = dp[j]
      dp[j] = a[i-1] === b[j-1]
        ? prev
        : Math.min(prev, dp[j], dp[j-1]) + 1
      prev = tmp
    }
  }
  return dp[b.length]
}

export function useSpeechRecognition(lang: 'id-ID' | 'en-US' = 'id-ID') {
  const [listening, setListening] = useState(false)
  const [heard, setHeard] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const recogRef = useRef<SpeechRecognition | null>(null)
  const supported = isSpeechRecognitionSupported()

  const start = useCallback(() => {
    if (!supported) { setError('not-supported'); return }
    const Ctor = SR()!
    const r = new Ctor()
    r.lang = lang
    r.continuous = false
    r.interimResults = false
    r.maxAlternatives = 3
    r.onresult = (ev) => {
      let best = ''
      for (let i = 0; i < ev.results.length; i++) {
        const res = ev.results[i]
        if (res.isFinal && res[0]) best = res[0].transcript
      }
      setHeard(best || '')
    }
    r.onerror = () => { setError('error') }
    r.onend = () => { setListening(false) }
    recogRef.current = r
    setHeard(''); setError(null); setListening(true)
    try { r.start() } catch { setListening(false) }
  }, [supported, lang])

  const stop = useCallback(() => {
    try { recogRef.current?.stop() } catch { /* no-op */ }
    setListening(false)
  }, [])

  useEffect(() => () => { try { recogRef.current?.abort() } catch { /* no-op */ } }, [])

  return { listening, heard, error, supported, start, stop, reset: () => { setHeard(''); setError(null) } }
}

import { useCallback, useRef } from 'react'

export function useSfx() {
  const ctxRef = useRef<AudioContext | null>(null)

  const getCtx = () => {
    if (!ctxRef.current) {
      const AC = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext
      ctxRef.current = new AC()
    }
    if (ctxRef.current.state === 'suspended') ctxRef.current.resume()
    return ctxRef.current
  }

  const tone = useCallback((freq: number, durMs: number, type: OscillatorType = 'sine', vol = 0.2, startAt = 0) => {
    const ctx = getCtx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = type
    osc.frequency.value = freq
    const now = ctx.currentTime + startAt
    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.exponentialRampToValueAtTime(vol, now + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + durMs / 1000)
    osc.connect(gain).connect(ctx.destination)
    osc.start(now)
    osc.stop(now + durMs / 1000 + 0.02)
  }, [])

  const ding = useCallback(() => {
    tone(880, 120, 'sine', 0.2, 0)
    tone(1320, 220, 'sine', 0.18, 0.08)
  }, [tone])

  const boing = useCallback(() => {
    tone(220, 120, 'triangle', 0.15, 0)
    tone(160, 180, 'triangle', 0.12, 0.08)
  }, [tone])

  const cheer = useCallback(() => {
    const base = [523, 659, 784, 1047] // C-E-G-C
    base.forEach((f, i) => tone(f, 180, 'triangle', 0.18, i * 0.08))
  }, [tone])

  const pop = useCallback(() => {
    tone(1200, 60, 'square', 0.15, 0)
  }, [tone])

  return { ding, boing, cheer, pop }
}

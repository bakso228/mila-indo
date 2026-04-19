/// <reference types="vite/client" />

declare global {
  interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList
  }

  interface SpeechRecognitionResultList {
    length: number
    [index: number]: SpeechRecognitionResult
  }

  interface SpeechRecognitionResult {
    length: number
    [index: number]: SpeechRecognitionAlternative
    isFinal: boolean
  }

  interface SpeechRecognitionAlternative {
    transcript: string
    confidence: number
  }

  interface SpeechRecognition extends EventTarget {
    lang: string
    continuous: boolean
    interimResults: boolean
    maxAlternatives: number
    start: () => void
    stop: () => void
    abort: () => void
    onresult: ((ev: SpeechRecognitionEvent) => void) | null
    onerror: ((ev: Event) => void) | null
    onend: ((ev: Event) => void) | null
  }

  interface Window {
    SpeechRecognition?: { new (): SpeechRecognition }
    webkitSpeechRecognition?: { new (): SpeechRecognition }
  }
}

export {}

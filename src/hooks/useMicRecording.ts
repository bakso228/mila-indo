import { useCallback, useEffect, useRef, useState } from 'react'

export function useMicRecording() {
  const [recording, setRecording] = useState(false)
  const [blobUrl, setBlobUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const recorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const chunksRef = useRef<Blob[]>([])

  const cleanupStream = () => {
    streamRef.current?.getTracks().forEach(t => t.stop())
    streamRef.current = null
  }

  const start = useCallback(async () => {
    setError(null)
    if (blobUrl) { URL.revokeObjectURL(blobUrl); setBlobUrl(null) }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      const mime = MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : ''
      const r = mime ? new MediaRecorder(stream, { mimeType: mime }) : new MediaRecorder(stream)
      chunksRef.current = []
      r.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data) }
      r.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mime || 'audio/webm' })
        setBlobUrl(URL.createObjectURL(blob))
        cleanupStream()
        setRecording(false)
      }
      recorderRef.current = r
      r.start()
      setRecording(true)
    } catch {
      setError('permission')
      setRecording(false)
      cleanupStream()
    }
  }, [blobUrl])

  const stop = useCallback(() => {
    try { recorderRef.current?.stop() } catch { /* no-op */ }
  }, [])

  const reset = useCallback(() => {
    if (blobUrl) URL.revokeObjectURL(blobUrl)
    setBlobUrl(null)
  }, [blobUrl])

  useEffect(() => () => { cleanupStream(); if (blobUrl) URL.revokeObjectURL(blobUrl) }, [blobUrl])

  return { recording, blobUrl, error, start, stop, reset }
}

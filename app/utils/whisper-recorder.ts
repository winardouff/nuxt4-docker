const MAX_RECORDING_DURATION_MS = 60000

export class WhisperRecorder {
  private mediaRecorder: MediaRecorder | null = null
  private audioChunks: Blob[] = []
  private stream: MediaStream | null = null
  private maxDurationTimer: ReturnType<typeof setTimeout> | null = null
  private _onAutoStop: ((blob: Blob) => void) | null = null

  static isSupported(): boolean {
    return (
      typeof navigator !== 'undefined' &&
      !!navigator.mediaDevices &&
      typeof navigator.mediaDevices.getUserMedia === 'function' &&
      typeof MediaRecorder !== 'undefined'
    )
  }

  async start({ onAutoStop }: { onAutoStop?: (blob: Blob) => void } = {}) {
    this.audioChunks = []
    this._onAutoStop = onAutoStop || null

    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true })

    const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
      ? 'audio/webm;codecs=opus'
      : 'audio/webm'

    this.mediaRecorder = new MediaRecorder(this.stream, { mimeType })

    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        this.audioChunks.push(event.data)
      }
    }

    this.mediaRecorder.start()

    this.maxDurationTimer = setTimeout(() => {
      if (this.isRecording()) {
        this.stop().then((blob) => {
          if (this._onAutoStop && blob) {
            this._onAutoStop(blob)
          }
        })
      }
    }, MAX_RECORDING_DURATION_MS)
  }

  stop(): Promise<Blob | null> {
    this._clearTimer()

    return new Promise((resolve) => {
      if (!this.mediaRecorder || this.mediaRecorder.state === 'inactive') {
        this.cleanup()
        resolve(null)
        return
      }

      this.mediaRecorder.onstop = () => {
        const blob = new Blob(this.audioChunks, { type: 'audio/webm' })
        this.cleanup()
        resolve(blob)
      }

      this.mediaRecorder.stop()
    })
  }

  cleanup() {
    this._clearTimer()
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop())
      this.stream = null
    }
    this.mediaRecorder = null
    this.audioChunks = []
  }

  isRecording(): boolean {
    return !!this.mediaRecorder && this.mediaRecorder.state === 'recording'
  }

  private _clearTimer() {
    if (this.maxDurationTimer) {
      clearTimeout(this.maxDurationTimer)
      this.maxDurationTimer = null
    }
  }
}

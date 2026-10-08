import { useState } from 'react'
import type { Locale } from '../content'

const bars = [12, 18, 10, 26, 14, 32, 22, 36, 28, 38, 24, 32, 16, 26, 10, 20, 12]

const voiceCopy = {
  en: {
    listening: 'Listening…',
    ready: 'Ready to listen',
    prompt: '“What can I do near here?”',
    type: 'Type',
    stop: 'Stop',
    camera: 'Camera',
    close: 'Close voice session',
    settings: 'Audio controls and settings',
    typePlaceholder: 'Ask LimaBot…',
    send: 'Send',
    cameraNotice: 'Camera mode will be connected in a later screen.',
  },
  es: {
    listening: 'Escuchando…',
    ready: 'Listo para escuchar',
    prompt: '“¿Qué puedo hacer cerca de aquí?”',
    type: 'Escribir',
    stop: 'Detener',
    camera: 'Cámara',
    close: 'Cerrar sesión de voz',
    settings: 'Controles y configuración de audio',
    typePlaceholder: 'Pregunta a LimaBot…',
    send: 'Enviar',
    cameraNotice: 'El modo cámara se conectará en una pantalla posterior.',
  },
} as const

type Props = {
  locale: Locale
  isListening: boolean
  transcript: string | null
  onClose: () => void
  onStop: () => void
}

export function VoiceSession({ locale, isListening, transcript, onClose, onStop }: Props) {
  const [showTyping, setShowTyping] = useState(false)
  const [notice, setNotice] = useState<string | null>(null)
  const [typedPrompt, setTypedPrompt] = useState('')
  const t = voiceCopy[locale]
  const displayedTranscript = transcript ? `“${transcript}”` : t.prompt

  const submitTypedPrompt = (event: React.FormEvent) => {
    event.preventDefault()
    if (!typedPrompt.trim()) return
    setNotice(`“${typedPrompt.trim()}”`)
    setTypedPrompt('')
    setShowTyping(false)
  }

  return (
    <section className="voice-screen" aria-label="LimaBot voice session">
      <div className="voice-background" aria-hidden="true" />
      <div className="voice-atmosphere" aria-hidden="true" />

      <header className="voice-status-bar" aria-hidden="true">
        <strong>9:41</strong>
        <span>
          <img src="/assets/voice-signal.svg" alt="" width="16" height="14" />
          <img src="/assets/voice-wifi.svg" alt="" width="14" height="14" />
          <i className="voice-battery"><i /></i>
        </span>
      </header>

      <div className="voice-navigation">
        <button type="button" className="voice-nav-button" onClick={onClose} aria-label={t.close}>
          <img src="/assets/voice-close.svg" alt="" width="20" height="20" />
        </button>
        <img className="voice-brand" src="/assets/voice-brand.svg" alt="LimaBot" width="124" height="24" />
        <button type="button" className="voice-nav-button" aria-label={t.settings} onClick={() => setNotice(t.settings)}>
          <img src="/assets/voice-settings.svg" alt="" width="16" height="16" />
        </button>
      </div>

      <div className="voice-listening-status" aria-live="polite">
        {isListening ? t.listening : t.ready}
      </div>

      <div className={`voice-orb-wrap ${isListening ? 'active' : ''}`} aria-hidden="true">
        <div className="voice-orb-aura" />
        <div className="voice-orb">
          <div className="voice-orb-fluid" />
          <div className="voice-orb-swirl" />
          <div className="voice-orb-glint" />
        </div>
      </div>

      <div className={`waveform ${isListening ? 'active' : ''}`} aria-hidden="true">
        {bars.map((height, index) => (
          <i key={index} style={{ height, animationDelay: `${index * 55}ms` }} />
        ))}
      </div>

      <p className="voice-transcript" aria-live="polite">{notice ?? displayedTranscript}</p>

      {showTyping && (
        <form className="voice-type-panel" onSubmit={submitTypedPrompt}>
          <label htmlFor="voice-prompt" className="sr-only">{t.typePlaceholder}</label>
          <input
            id="voice-prompt"
            autoFocus
            value={typedPrompt}
            onChange={(event) => setTypedPrompt(event.target.value)}
            placeholder={t.typePlaceholder}
          />
          <button type="submit">{t.send}</button>
        </form>
      )}

      <footer className="voice-controls">
        <button type="button" className="voice-control secondary" onClick={() => setShowTyping((value) => !value)}>
          <span><img src="/assets/voice-keyboard.svg" alt="" width="24" height="24" /></span>
          <small>{t.type}</small>
        </button>
        <button type="button" className="voice-control stop" onClick={onStop}>
          <span><i /></span>
          <small>{t.stop}</small>
        </button>
        <button type="button" className="voice-control secondary" onClick={() => setNotice(t.cameraNotice)}>
          <span><img src="/assets/voice-camera.svg" alt="" width="24" height="24" /></span>
          <small>{t.camera}</small>
        </button>
      </footer>
    </section>
  )
}

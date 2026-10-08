const asset = (path: string) => `${import.meta.env.BASE_URL}assets/${path}`

type Props = {
  isListening: boolean
  label: string
  onClick: () => void
}

export function VoiceButton({ isListening, label, onClick }: Props) {
  return (
    <div className="voice-area">
      <div className={`voice-rings ${isListening ? 'is-listening' : ''}`}>
        <span className="voice-ring voice-ring-outer" aria-hidden="true" />
        <span className="voice-ring voice-ring-middle" aria-hidden="true" />
        <span className="voice-ring voice-ring-dashed" aria-hidden="true" />
        <button
          type="button"
          className="voice-button"
          aria-pressed={isListening}
          aria-label={label}
          onClick={onClick}
        >
          <img src={asset('microphone-large.svg')} alt="" width="40" height="40" />
        </button>
      </div>
      <button type="button" className="voice-label" onClick={onClick}>
        {label}
      </button>
    </div>
  )
}



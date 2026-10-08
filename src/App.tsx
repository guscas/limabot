import { useEffect, useRef, useState } from 'react'
import { ActiveMapScreen } from './components/ActiveMapScreen'
import { BottomNavigation } from './components/BottomNavigation'
import { DeviceFrame } from './components/DeviceFrame'
import { LanguageSwitcher } from './components/LanguageSwitcher'
import { MapScreen } from './components/MapScreen'
import { QuickSuggestions } from './components/QuickSuggestions'
import { ResultScreen } from './components/ResultScreen'
import { VoiceButton } from './components/VoiceButton'
import { VoiceSession } from './components/VoiceSession'
import { copy, type Locale, type SuggestionKey } from './content'

function App() {
  const [locale, setLocale] = useState<Locale>('en')
  const [isListening, setIsListening] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [screen, setScreen] = useState<'home' | 'voice' | 'results' | 'map' | 'mapActive'>('home')
  const [transcript, setTranscript] = useState<string | null>(null)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const t = copy[locale]

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  useEffect(() => () => recognitionRef.current?.stop(), [])

  const stopListening = () => {
    recognitionRef.current?.stop()
    recognitionRef.current = null
    setIsListening(false)
  }

  const toggleVoice = () => {
    if (isListening) {
      stopListening()
      return
    }

    const Recognition = window.SpeechRecognition ?? window.webkitSpeechRecognition
    setScreen('voice')
    setTranscript(null)
    setIsListening(true)
    if (!Recognition) {
      setMessage(t.voiceUnavailable)
      return
    }

    const recognition = new Recognition()
    recognition.lang = locale === 'en' ? 'en-US' : 'es-PE'
    recognition.continuous = false
    recognition.interimResults = false
    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript
      if (transcript) {
        setTranscript(transcript)
        setMessage(`${t.heard}: “${transcript}”`)
      }
    }
    recognition.onerror = () => {
      recognitionRef.current = null
    }
    recognition.onend = () => {
      recognitionRef.current = null
    }
    recognitionRef.current = recognition
    setMessage(null)
    recognition.start()
  }

  const selectSuggestion = (key: SuggestionKey) => {
    setMessage(`${t.suggestions[key]} — ${t.suggestionIntro}`)
  }

  const closeVoice = () => {
    stopListening()
    setScreen('home')
  }

  const showResults = () => {
    stopListening()
    setScreen('results')
  }

  if (screen === 'mapActive') {
    return (
      <main className="app-shell">
        <DeviceFrame label="LimaBot active walking directions">
          <ActiveMapScreen locale={locale} onClose={() => setScreen('map')} onHome={() => setScreen('home')} onVoice={toggleVoice} />
        </DeviceFrame>
      </main>
    )
  }

  if (screen === 'map') {
    return (
      <main className="app-shell">
        <DeviceFrame label="LimaBot directions map">
          <MapScreen locale={locale} onBack={() => setScreen('results')} onHome={() => setScreen('home')} onVoice={toggleVoice} onStart={() => setScreen('mapActive')} />
        </DeviceFrame>
      </main>
    )
  }

  if (screen === 'results') {
    return (
      <main className="app-shell">
        <DeviceFrame label="LimaBot results">
          <ResultScreen locale={locale} onClose={() => setScreen('home')} onVoice={toggleVoice} onMap={() => setScreen('map')} />
        </DeviceFrame>
      </main>
    )
  }

  if (screen === 'voice') {
    return (
      <main className="app-shell">
        <DeviceFrame label="LimaBot voice session">
          <VoiceSession
            locale={locale}
            isListening={isListening}
            transcript={transcript}
            onClose={closeVoice}
            onStop={showResults}
          />
        </DeviceFrame>
      </main>
    )
  }

  return (
    <main className="app-shell">
      <DeviceFrame label="LimaBot home screen">
        <div className="hero-photo" aria-hidden="true" />
        <div className="bottom-fade" aria-hidden="true" />

        <header className="status-bar" aria-hidden="true">
          <strong>9:41</strong>
          <span className="status-icons">
            <img src="/assets/signal.svg" alt="" width="16" height="14" />
            <img src="/assets/wifi.svg" alt="" width="16" height="14" />
            <span className="battery"><span /></span>
          </span>
        </header>

        <div className="top-actions">
          <img className="promperu-logo" src="/assets/promperu.svg" alt="PromPerú" width="114" height="48" />
          <div className="top-actions-right">
            <LanguageSwitcher locale={locale} onChange={setLocale} />
            <button type="button" className="profile-button" aria-label="Open profile">
              <img src="/assets/profile.svg" alt="" width="16" height="16" />
            </button>
          </div>
        </div>

        <div className="brand-block">
          <h1>Lima<span>Bot</span></h1>
          <p>{t.tagline}</p>
        </div>

        <VoiceButton
          isListening={isListening}
          label={isListening ? t.listening : t.tapToSpeak}
          onClick={toggleVoice}
        />

        <QuickSuggestions labels={t.suggestions} onSelect={selectSuggestion} />

        {message && (
          <aside className="conversation-preview" role="status" aria-live="polite">
            <p>{message}</p>
            <button type="button" onClick={() => setMessage(null)} aria-label={t.close}>×</button>
          </aside>
        )}

        <BottomNavigation labels={t.nav} onVoice={toggleVoice} />
      </DeviceFrame>
    </main>
  )
}

export default App

const asset = (path: string) => `${import.meta.env.BASE_URL}assets/${path}`

type Props = {
  labels: { home: string; explore: string; trip: string; saved: string }
  onVoice: () => void
}

const sideItems = [
  { key: 'home', icon: 'home.svg' },
  { key: 'explore', icon: 'explore.svg' },
  { key: 'trip', icon: 'trip.svg' },
  { key: 'saved', icon: 'saved.svg' },
] as const

export function BottomNavigation({ labels, onVoice }: Props) {
  return (
    <nav className="bottom-nav" aria-label="Primary navigation">
      <div className="bottom-nav-grid">
        {sideItems.map(({ key, icon }, index) => (
          <button
            key={key}
            type="button"
            className={`nav-item ${key === 'home' ? 'active' : ''} ${index > 1 ? 'nav-right' : ''}`}
            aria-current={key === 'home' ? 'page' : undefined}
          >
            <img src={asset(icon)} alt="" width="24" height="24" />
            <span>{labels[key]}</span>
          </button>
        ))}
        <button type="button" className="nav-voice" aria-label="Open voice assistant" onClick={onVoice}>
          <img src={asset('microphone-small.svg')} alt="" width="24" height="24" />
        </button>
      </div>
    </nav>
  )
}



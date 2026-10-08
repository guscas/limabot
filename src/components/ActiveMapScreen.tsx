const asset = (path: string) => `${import.meta.env.BASE_URL}assets/${path}`

import type { Locale } from '../content'

type Props = {
  locale: Locale
  onClose: () => void
  onHome: () => void
  onVoice: () => void
}

const activeMapCopy = {
  en: { location: 'Your location', home: 'Home', explore: 'Explore', trip: 'My trip', saved: 'Saved' },
  es: { location: 'Tu ubicación', home: 'Inicio', explore: 'Explorar', trip: 'Mi viaje', saved: 'Guardados' },
} as const

export function ActiveMapScreen({ locale, onClose, onHome, onVoice }: Props) {
  const t = activeMapCopy[locale]

  return (
    <section className="active-map-screen" aria-label="Active walking directions to Parque Kennedy">
      <img className="active-map-image" src={asset('map5-map.png')} alt="Expanded walking map to Parque Kennedy" />

      <button type="button" className="active-map-close" onClick={onClose} aria-label="Close active route">
        <img src={asset('map5-close.svg')} alt="" width="20" height="20" />
      </button>

      <img className="active-map-route" src={asset('map5-route.svg')} alt="" />

      <div className="active-map-destination">
        <span><img src={asset('map5-pin.svg')} alt="" /><i /></span>
        <strong>Parque Kennedy</strong>
      </div>
      <div className="active-map-badge"><strong>5 min</strong><small>400 m</small></div>

      <div className="active-map-user">
        <img src={asset('map5-user.svg')} alt="" width="30" height="30" />
        <strong>{t.location}</strong>
      </div>

      <nav className="active-map-nav" aria-label="Primary navigation">
        <button type="button" onClick={onHome}><img src={asset('map5-home.svg')} alt="" /><span>{t.home}</span></button>
        <button type="button"><img src={asset('map5-explore.svg')} alt="" /><span>{t.explore}</span></button>
        <button type="button"><img src={asset('map5-trip.svg')} alt="" /><span>{t.trip}</span></button>
        <button type="button"><img src={asset('map5-saved.svg')} alt="" /><span>{t.saved}</span></button>
        <button type="button" className="active-map-mic" onClick={onVoice} aria-label="Open voice assistant"><img src={asset('map5-mic.svg')} alt="" /></button>
      </nav>
    </section>
  )
}



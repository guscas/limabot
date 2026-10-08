import { useState } from 'react'
import type { Locale } from '../content'

type Props = {
  locale: Locale
  onBack: () => void
  onHome: () => void
  onVoice: () => void
  onStart: () => void
}

const mapCopy = {
  en: {
    title: 'Directions', destination: 'To Parque Kennedy', location: 'Your location',
    place: 'Parque Kennedy', category: 'Main square · Miraflores', open: 'Open now', until: 'Until 10:00 p.m.',
    reviews: '(3,120 reviews)', start: 'Start walking route', stop: 'Stop route', details: 'See details',
    flat: 'Mostly flat', accessible: 'Accessible route', accessibleNote: 'Sidewalks and ramps available',
    home: 'Home', explore: 'Explore', trip: 'My trip', saved: 'Saved',
  },
  es: {
    title: 'Indicaciones', destination: 'A Parque Kennedy', location: 'Tu ubicación',
    place: 'Parque Kennedy', category: 'Plaza principal · Miraflores', open: 'Abierto ahora', until: 'Hasta las 10:00 p. m.',
    reviews: '(3,120 reseñas)', start: 'Iniciar ruta a pie', stop: 'Detener ruta', details: 'Ver detalles',
    flat: 'Mayormente plano', accessible: 'Ruta accesible', accessibleNote: 'Hay veredas y rampas disponibles',
    home: 'Inicio', explore: 'Explorar', trip: 'Mi viaje', saved: 'Guardados',
  },
} as const

export function MapScreen({ locale, onBack, onHome, onVoice, onStart }: Props) {
  const [saved, setSaved] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const t = mapCopy[locale]

  return (
    <section className="map-screen" aria-label={t.title}>
      <div className="map-area">
        <img className="map-image" src="/assets/map4-map.png" alt="Map of Miraflores showing the walking route to Parque Kennedy" />
        <div className="map-header-fade" aria-hidden="true" />

        <header className="map-status" aria-hidden="true">
          <strong>9:41</strong>
          <span>
            <img src="/assets/map4-cellular.svg" alt="" width="14" height="14" />
            <img src="/assets/map4-wifi.svg" alt="" width="14" height="14" />
            <img src="/assets/map4-battery.svg" alt="" width="16" height="16" />
          </span>
        </header>

        <div className="map-toolbar">
          <button type="button" onClick={onBack} aria-label="Back"><img src="/assets/map4-back.svg" alt="" width="20" height="20" /></button>
          <div><h1>{t.title}</h1><p>{t.destination}</p></div>
          <span>
            <button type="button" aria-label="Share route"><img src="/assets/map4-share.svg" alt="" width="16" height="16" /></button>
            <button type="button" aria-label="Save place" aria-pressed={saved} onClick={() => setSaved((value) => !value)}>
              <img src="/assets/map4-save.svg" alt="" width="16" height="16" />
            </button>
          </span>
        </div>

        <button type="button" className="map-recenter" aria-label="Re-center map"><img src="/assets/map4-recenter.svg" alt="" width="20" height="20" /></button>
        <img className="map-route-line" src="/assets/map4-route-line.svg" alt="" />

        <div className="map-destination">
          <span className="map-pin"><img src="/assets/map4-pin.svg" alt="" width="40" height="40" /><i /></span>
          <strong>{t.place}</strong>
        </div>
        <div className="map-route-badge"><strong>5 min</strong><small>400 m</small></div>

        <div className="map-user">
          <span><img src="/assets/map4-user-ring.svg" alt="" /><img src="/assets/map4-user-mid.svg" alt="" /><img src="/assets/map4-user-dot.svg" alt="" /></span>
          <strong>{t.location}</strong>
        </div>
      </div>

      <section className="map-sheet" aria-label={t.place}>
        <i className="map-sheet-handle" aria-hidden="true" />
        <div className="map-place-head">
          <img src="/assets/map4-extra.jpeg" alt="Gardens at Parque Kennedy" />
          <div>
            <h2>{t.place}</h2>
            <p className="map-rating"><img src="/assets/map4-star.svg" alt="" /> <strong>4.5</strong> <span>{t.reviews}</span></p>
            <p>{t.category}</p>
            <p className="map-open"><i /> <strong>{t.open}</strong> <span>•</span> {t.until}</p>
          </div>
        </div>

        <div className="map-actions">
          <button type="button" className="primary" onClick={onStart}>
            <img src="/assets/map4-route.svg" alt="" />{t.start}
          </button>
          <button type="button" onClick={() => setDetailsOpen((value) => !value)} aria-expanded={detailsOpen}>{t.details}</button>
        </div>

        <div className="map-stats">
          <span><img src="/assets/map4-walk.svg" alt="" /><strong>5 min (400 m)</strong></span><i />
          <span><img src="/assets/map4-ruler.svg" alt="" />0.4 km</span><i />
          <span><img src="/assets/map4-terrain.svg" alt="" />{t.flat}</span>
        </div>

        <button type="button" className="map-accessible">
          <span className="map-accessible-icon"><img src="/assets/map4-wheelchair.svg" alt="" /></span>
          <span><strong>{t.accessible}</strong><small>{t.accessibleNote}</small></span>
          <img src="/assets/map4-chevron.svg" alt="" />
        </button>
      </section>

      <nav className="map-nav" aria-label="Primary navigation">
        <button type="button" onClick={onHome}><img src="/assets/result-home.svg" alt="" /><span>{t.home}</span></button>
        <button type="button"><img src="/assets/result-explore.svg" alt="" /><span>{t.explore}</span></button>
        <button type="button"><img src="/assets/result-trip.svg" alt="" /><span>{t.trip}</span></button>
        <button type="button"><img src="/assets/result-saved.svg" alt="" /><span>{t.saved}</span></button>
        <button type="button" className="map-nav-mic" onClick={onVoice} aria-label="Open voice assistant"><img src="/assets/result-mic.svg" alt="" /></button>
      </nav>
    </section>
  )
}

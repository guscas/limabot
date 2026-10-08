const asset = (path: string) => `${import.meta.env.BASE_URL}assets/${path}`

import { useRef, useState, type FormEvent, type KeyboardEvent, type WheelEvent } from 'react'
import type { Locale } from '../content'

type Props = {
  locale: Locale
  onClose: () => void
  onVoice: () => void
  onMap: () => void
}

const places = [
  {
    id: 'huaca',
    image: 'result-huaca.png',
    name: 'Huaca Pucllana',
    category: 'Archaeological site',
    distance: '12 min (900 m)',
    price: 'From S/ 15',
    rating: '4.7',
    reviews: '(2,300)',
    favorite: true,
  },
  {
    id: 'malecon',
    image: 'result-malecon.png',
    name: 'Miraflores Malecón',
    category: 'Coastal promenade',
    distance: '8 min (600 m)',
    price: 'Free',
    rating: '4.6',
    reviews: '(2,854)',
  },
  {
    id: 'kennedy',
    image: 'result-kennedy.png',
    name: 'Parque Kennedy',
    category: 'Main square',
    distance: '5 min (200 m)',
    price: 'Free',
    rating: '4.7',
    reviews: '(2,300)',
    favorite: true,
  },
]

const resultCopy = {
  en: {
    answer: "You're in Miraflores. Here are some great options near you. Huaca Pucllana is about 12 minutes away, the Malecón is less than 10 minutes, and Parque Kennedy is just a 5-minute walk.",
    open: 'Open now',
    chips: ['Which one is closest?', 'Which one is free?', 'Show me a map', 'More options'],
    placeholder: 'Ask LimaBot something…',
    close: 'Close results',
    volume: 'Toggle spoken response',
    more: 'More options',
    send: 'Send question',
  },
  es: {
    answer: 'Estás en Miraflores. Estas son algunas opciones cercanas. Huaca Pucllana está a unos 12 minutos, el Malecón a menos de 10 minutos y el Parque Kennedy a 5 minutos caminando.',
    open: 'Abierto ahora',
    chips: ['¿Cuál está más cerca?', '¿Cuál es gratuito?', 'Muéstrame el mapa', 'Más opciones'],
    placeholder: 'Pregunta algo a LimaBot…',
    close: 'Cerrar resultados',
    volume: 'Activar o silenciar respuesta',
    more: 'Más opciones',
    send: 'Enviar pregunta',
  },
} as const

export function ResultScreen({ locale, onClose, onVoice, onMap }: Props) {
  const [favorites, setFavorites] = useState(() => new Set(['huaca', 'kennedy']))
  const [query, setQuery] = useState('')
  const [lastQuestion, setLastQuestion] = useState<string | null>(null)
  const [muted, setMuted] = useState(false)
  const [carouselIndex, setCarouselIndex] = useState(0)
  const carouselRef = useRef<HTMLElement>(null)
  const t = resultCopy[locale]

  const moveCarousel = (nextIndex: number) => {
    const index = Math.max(0, Math.min(places.length - 1, nextIndex))
    setCarouselIndex(index)
    carouselRef.current?.scrollTo({ left: index * 205, behavior: 'smooth' })
  }

  const handleCarouselScroll = () => {
    const carousel = carouselRef.current
    if (!carousel) return
    const maxScroll = carousel.scrollWidth - carousel.clientWidth
    if (maxScroll - carousel.scrollLeft < 4) {
      setCarouselIndex(places.length - 1)
      return
    }
    setCarouselIndex(Math.min(places.length - 1, Math.round(carousel.scrollLeft / 205)))
  }

  const handleCarouselWheel = (event: WheelEvent<HTMLElement>) => {
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return
    event.preventDefault()
    moveCarousel(carouselIndex + (event.deltaY > 0 ? 1 : -1))
  }

  const handleCarouselKeys = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      moveCarousel(carouselIndex + 1)
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      moveCarousel(carouselIndex - 1)
    }
  }

  const toggleFavorite = (id: string) => {
    setFavorites((current) => {
      const next = new Set(current)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (!query.trim()) return
    setLastQuestion(query.trim())
    setQuery('')
  }

  return (
    <section className="result-screen" aria-label="LimaBot results">
      <header className="result-status-bar" aria-hidden="true">
        <strong>9:41</strong>
        <span>
          <img src={asset('result-signal.svg')} alt="" width="16" height="12" />
          <img src={asset('result-wifi.svg')} alt="" width="14" height="12" />
          <i className="result-battery"><i /></i>
        </span>
      </header>

      <div className="result-topbar">
        <button type="button" onClick={onClose} aria-label={t.close}>
          <img src={asset('result-close.svg')} alt="" width="20" height="20" />
        </button>
        <img src={asset('result-brand.svg')} alt="LimaBot" width="124" height="24" />
        <div>
          <button type="button" aria-label={t.volume} aria-pressed={muted} onClick={() => setMuted((value) => !value)}>
            <img src={asset('result-speaker.svg')} alt="" width="20" height="20" />
          </button>
          <button type="button" aria-label={t.more}>
            <img src={asset('result-more.svg')} alt="" width="20" height="20" />
          </button>
        </div>
      </div>

      <main className="result-content">
        <div className="bot-message">
          <span className="bot-avatar"><img src={asset('result-bot.svg')} alt="" width="18" height="18" /></span>
          <p>{t.answer}</p>
        </div>

        <div className="place-carousel-shell">
          <section
            ref={carouselRef}
            className="place-carousel"
            aria-label="Suggested places. Use arrow keys or the carousel controls to see all three recommendations."
            tabIndex={0}
            onScroll={handleCarouselScroll}
            onWheel={handleCarouselWheel}
            onKeyDown={handleCarouselKeys}
          >
            {places.map((place) => (
              <article className="place-card" key={place.id}>
              <div className="place-image">
                {place.id === 'kennedy' ? (
                  <button type="button" className="place-map-trigger" onClick={onMap} aria-label={`Open map for ${place.name}`}>
                    <img src={asset(place.image)} alt={place.name} />
                  </button>
                ) : (
                  <img src={asset(place.image)} alt={place.name} />
                )}
                {place.favorite && (
                  <button
                    type="button"
                    className="place-favorite"
                    aria-label={`${favorites.has(place.id) ? 'Remove' : 'Add'} ${place.name} favorite`}
                    aria-pressed={favorites.has(place.id)}
                    onClick={() => toggleFavorite(place.id)}
                  >
                    <img src={asset('result-favorite.svg')} alt="" width="14" height="14" />
                  </button>
                )}
              </div>
              <div className="place-details">
                <div><h2>{place.name}</h2><p>{place.category}</p></div>
                <ul>
                  <li><span aria-hidden="true">🚶</span>{place.distance}</li>
                  <li className="open"><i />{t.open}</li>
                  <li><img src={asset('result-ticket.png')} alt="" width="12" height="9" />{place.price}</li>
                  <li><img src={asset('result-star.svg')} alt="" width="11" height="11" /><strong>{place.rating}</strong><small>{place.reviews}</small></li>
                </ul>
              </div>
              </article>
            ))}
          </section>
          {carouselIndex > 0 && (
            <button type="button" className="carousel-control previous" aria-label="Previous recommendation" onClick={() => moveCarousel(carouselIndex - 1)}>‹</button>
          )}
          {carouselIndex < places.length - 1 && (
            <button type="button" className="carousel-control next" aria-label="Next recommendation" onClick={() => moveCarousel(carouselIndex + 1)}>›</button>
          )}
          <div className="carousel-position" aria-hidden="true">
            {places.map((place, index) => <i key={place.id} className={index === carouselIndex ? 'active' : ''} />)}
          </div>
        </div>

        <section className="follow-up-grid" aria-label="Follow-up suggestions">
          {t.chips.map((chip, index) => (
            <button type="button" key={chip} onClick={() => index === 2 ? onMap() : setQuery(chip)}>
              <img src={asset(index < 2 ? 'result-chip-chat.svg' : index === 2 ? 'result-chip-map.svg' : 'result-chip-search.svg')} alt="" width="14" height="14" />
              <span>{chip}</span>
            </button>
          ))}
        </section>

        {lastQuestion && <p className="result-question" role="status">{lastQuestion}</p>}
      </main>

      <form className="result-input" onSubmit={submit}>
        <div>
          <button type="button" onClick={onVoice} aria-label="Open voice assistant">
            <img src={asset('result-input-mic.svg')} alt="" width="16" height="16" />
          </button>
          <label className="sr-only" htmlFor="result-query">{t.placeholder}</label>
          <input id="result-query" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.placeholder} />
          <button type="submit" aria-label={t.send} disabled={!query.trim()}>
            <img src={asset('result-send.svg')} alt="" width="14" height="14" />
          </button>
        </div>
      </form>

      <nav className="result-nav" aria-label="Primary navigation">
        <button type="button"><img src={asset('result-home.svg')} alt="" width="20" height="20" /><span>Home</span></button>
        <button type="button"><img src={asset('result-explore.svg')} alt="" width="24" height="24" /><span>Explore</span></button>
        <button type="button"><img src={asset('result-trip.svg')} alt="" width="24" height="24" /><span>My trip</span></button>
        <button type="button"><img src={asset('result-saved.svg')} alt="" width="24" height="24" /><span>Saved</span></button>
        <button type="button" className="result-nav-mic" onClick={onVoice} aria-label="Open voice assistant">
          <img src={asset('result-mic.svg')} alt="" width="24" height="24" />
        </button>
      </nav>
    </section>
  )
}



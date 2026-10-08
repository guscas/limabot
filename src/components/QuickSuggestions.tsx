const asset = (path: string) => `${import.meta.env.BASE_URL}assets/${path}`

import type { SuggestionKey } from '../content'

const suggestions: Array<{ key: SuggestionKey; icon: string; overlay?: string }> = [
  { key: 'today', icon: 'idea.svg' },
  { key: 'nearby', icon: 'location.svg', overlay: 'location-dot.svg' },
  { key: 'events', icon: 'calendar.svg' },
  { key: 'food', icon: 'food.svg' },
  { key: 'transport', icon: 'transit.svg' },
  { key: 'itinerary', icon: 'itinerary.svg' },
]

type Props = {
  labels: Record<SuggestionKey, string>
  onSelect: (key: SuggestionKey) => void
}

export function QuickSuggestions({ labels, onSelect }: Props) {
  return (
    <section className="suggestion-grid" aria-label="Quick suggestions">
      {suggestions.map(({ key, icon, overlay }) => (
        <button
          key={key}
          type="button"
          className="suggestion-card"
          onClick={() => onSelect(key)}
        >
          <span className="suggestion-icon" aria-hidden="true">
            <img src={asset(icon)} alt="" width="20" height="20" />
            {overlay && <img className="suggestion-icon-overlay" src={asset(overlay)} alt="" width="20" height="20" />}
          </span>
          <span>{labels[key]}</span>
        </button>
      ))}
    </section>
  )
}



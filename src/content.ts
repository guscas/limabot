export type Locale = 'en' | 'es'

export type SuggestionKey =
  | 'today'
  | 'nearby'
  | 'events'
  | 'food'
  | 'transport'
  | 'itinerary'

export const copy = {
  en: {
    localeName: 'English',
    tagline: 'Your smart guide to discover Lima',
    tapToSpeak: 'Tap to speak with LimaBot',
    listening: 'Listening… tap to stop',
    voiceUnavailable: 'Voice recognition is not available in this browser.',
    heard: 'I heard',
    suggestionIntro: 'Great choice. This is where your LimaBot conversation will begin.',
    close: 'Close conversation preview',
    suggestions: {
      today: 'What to do today?',
      nearby: 'Places near me',
      events: 'Events tonight',
      food: 'Where to eat?',
      transport: 'How to get around?',
      itinerary: 'Create an itinerary',
    },
    nav: { home: 'Home', explore: 'Explore', trip: 'My trip', saved: 'Saved' },
  },
  es: {
    localeName: 'Español',
    tagline: 'Tu guía inteligente para descubrir Lima',
    tapToSpeak: 'Toca para hablar con LimaBot',
    listening: 'Escuchando… toca para detener',
    voiceUnavailable: 'El reconocimiento de voz no está disponible en este navegador.',
    heard: 'Escuché',
    suggestionIntro: 'Buena elección. Aquí comenzará tu conversación con LimaBot.',
    close: 'Cerrar vista previa de conversación',
    suggestions: {
      today: '¿Qué hacer hoy?',
      nearby: 'Lugares cercanos',
      events: 'Eventos esta noche',
      food: '¿Dónde comer?',
      transport: '¿Cómo movilizarme?',
      itinerary: 'Crear un itinerario',
    },
    nav: { home: 'Inicio', explore: 'Explorar', trip: 'Mi viaje', saved: 'Guardados' },
  },
} as const

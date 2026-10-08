const asset = (path: string) => `${import.meta.env.BASE_URL}assets/${path}`

import type { Locale } from '../content'

type Props = {
  locale: Locale
  onChange: (locale: Locale) => void
}

export function LanguageSwitcher({ locale, onChange }: Props) {
  const nextLocale = locale === 'en' ? 'es' : 'en'

  return (
    <button
      type="button"
      className="language-pill"
      aria-label={locale === 'en' ? 'Cambiar idioma a español' : 'Switch language to English'}
      onClick={() => onChange(nextLocale)}
    >
      <span aria-hidden="true" className="text-sm">🌐</span>
      <span>{locale.toUpperCase()}</span>
      <img src={asset('chevron.svg')} alt="" width="12" height="12" />
    </button>
  )
}



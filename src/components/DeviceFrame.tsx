import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  label: string
}

export function DeviceFrame({ children, label }: Props) {
  const frameRef = useRef<HTMLElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return

    const updateScale = () => setScale(frame.getBoundingClientRect().width / 390)
    const observer = new ResizeObserver(updateScale)
    observer.observe(frame)
    updateScale()

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={frameRef} className="phone" aria-label={label}>
      <div className="phone-canvas" style={{ '--device-scale': scale } as CSSProperties}>
        {children}
      </div>
    </section>
  )
}


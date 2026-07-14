export function enableZoomForIonContent(el: HTMLElement | null, tries: number = 10, delay: number = 150) {
  let attempt = 0

  const run = () => {
    attempt += 1
    const ionContent =
      el?.closest('ion-content') || document.querySelector('ion-content')
    const root = ionContent?.shadowRoot
    if (!root) {
      if (attempt < tries) return setTimeout(run, delay)
      return
    }

    const scrollEl =
      root.querySelector('.inner-scroll') ||
      root.querySelector('[part="scroll"]') ||
      root.querySelector('main')

    if (scrollEl) {
      const s = (scrollEl as HTMLElement).style
      s.touchAction = 'pan-x pan-y pinch-zoom'
      s.pointerEvents = 'auto'
      s.overflow = 'auto'
      s.userSelect = 'auto'
      ;(s as any)['-ms-touch-action'] = 'pinch-zoom'
      ;(s as any)['-webkit-overflow-scrolling'] = 'auto'
    } else if (attempt < tries) {
      setTimeout(run, delay)
    }
  }

  run()
}

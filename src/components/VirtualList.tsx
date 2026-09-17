import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'

interface Props<T> {
  items: T[]
  getKey: (item: T, index: number) => string
  renderItem: (item: T, index: number) => ReactNode
  className?: string
  /** Lists shorter than this render in full — virtualising them buys nothing. */
  threshold?: number
  /** Rows kept above and below the viewport, so scrolling doesn't flash gaps. */
  overscan?: number
  /** Used until a real row has been measured. */
  estimatedRowHeight?: number
  /** Changing this scrolls back to the top — e.g. when a search term changes. */
  resetKey?: string
}

/**
 * A minimal fixed-height virtual list. An imported ProPresenter library can run
 * to hundreds or thousands of songs, and rendering every row makes both the
 * song picker and "my songs" crawl on a phone.
 *
 * Rows are assumed to be a uniform height, which they are here — one line of
 * title and one of detail. The height is measured from the first real row
 * rather than hard-coded, so it survives font and zoom differences.
 */
export default function VirtualList<T>({
  items,
  getKey,
  renderItem,
  className,
  threshold = 40,
  overscan = 6,
  estimatedRowHeight = 44,
  resetKey,
}: Props<T>) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const rowRef = useRef<HTMLDivElement>(null)
  const [scrollTop, setScrollTop] = useState(0)
  const [viewportHeight, setViewportHeight] = useState(0)
  const [rowHeight, setRowHeight] = useState(estimatedRowHeight)

  const virtualise = items.length > threshold

  // Measure a real row, and the viewport, once they exist
  useLayoutEffect(() => {
    const row = rowRef.current
    if (row) {
      const measured = row.getBoundingClientRect().height
      if (measured > 0 && Math.abs(measured - rowHeight) > 0.5) setRowHeight(measured)
    }
    const scroller = scrollRef.current
    if (scroller) {
      const height = scroller.clientHeight
      if (height > 0 && height !== viewportHeight) setViewportHeight(height)
    }
  }, [items.length, rowHeight, viewportHeight])

  useEffect(() => {
    const scroller = scrollRef.current
    if (!scroller) return
    scroller.scrollTop = 0
    setScrollTop(0)
  }, [resetKey])

  useEffect(() => {
    const scroller = scrollRef.current
    if (!scroller || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(() => setViewportHeight(scroller.clientHeight))
    observer.observe(scroller)
    return () => observer.disconnect()
  }, [])

  function handleScroll() {
    const scroller = scrollRef.current
    if (scroller) setScrollTop(scroller.scrollTop)
  }

  if (!virtualise) {
    return (
      <div className={className} role="list" ref={scrollRef}>
        {items.map((item, i) => (
          <div role="listitem" key={getKey(item, i)} ref={i === 0 ? rowRef : undefined}>
            {renderItem(item, i)}
          </div>
        ))}
      </div>
    )
  }

  const visibleCount = Math.ceil((viewportHeight || rowHeight * 10) / rowHeight)
  const start = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan)
  const end = Math.min(items.length, start + visibleCount + overscan * 2)
  const visible = items.slice(start, end)

  return (
    <div className={className} role="list" ref={scrollRef} onScroll={handleScroll}>
      <div style={{ height: items.length * rowHeight, position: 'relative' }}>
        <div style={{ position: 'absolute', top: start * rowHeight, left: 0, right: 0 }}>
          {visible.map((item, i) => {
            const index = start + i
            return (
              <div role="listitem" key={getKey(item, index)} ref={i === 0 ? rowRef : undefined}>
                {renderItem(item, index)}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

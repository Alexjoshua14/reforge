'use client'

import { FC, useCallback, useEffect, useRef, useState } from 'react'
import FullScreenSection from '../FullScreenSection'

interface Carousel2Props {

}

const throttle = (fn: Function, delay: number) => {
  let last = 0
  return (...args: any[]) => {
    const now = new Date().getTime()
    if (now - last < delay) return
    last = now
    return fn(...args)
  }
}

const Carousel2: FC<Carousel2Props> = ({ }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const [currentSection, setCurrentSection] = useState(0)
  const sectionCount = 5


  /** Scroll to current section */
  useEffect(() => {
    if (!containerRef.current)
      return
    const container = containerRef.current

    // Scroll to current section
    setTimeout(() => {

      container.scrollTo({
        top: (currentSection * container.clientHeight),
        behavior: "smooth",
      })
    }, 400)
  }, [currentSection])

  /** Intercept scroll events */
  useEffect(() => {
    if (!containerRef.current)
      return

    const container = containerRef.current

    const throttledScroll = throttle((e: WheelEvent) => {
      let dir = 0
      if (e.deltaY > 0) {
        dir = 1
      } else if (e.deltaY < 0) {
        dir = -1
      }
      setCurrentSection(prev => Math.max(Math.min(prev + dir, sectionCount - 1), 0))
    }, 2000)

    const handleScroll = (e: WheelEvent) => {
      e.preventDefault()
      e.stopPropagation()
      throttledScroll(e)
    }

    container.addEventListener('wheel', handleScroll, { passive: false })

    return () => {
      container.removeEventListener('wheel', handleScroll)
    }

  }, [])


  return (
    <div ref={containerRef} className="h-screen w-screen overflow-scroll">
      <div className="z-50 fixed top-1/2 -translate-y-1/2 right-10 flex flex-col gap-4 ">
        {Array.from({ length: sectionCount }).map((_, i) => (
          <button className="w-5 h-5" key={`nav-${i}`} onClick={() => setCurrentSection(i)}>
            {i}
          </button>
        ))}
      </div>
      <div className="min-h-screen h-fit w-screen">
        {
          Array.from({ length: sectionCount }).map((_, i) => (
            <FullScreenSection key={`section-${i}`} curr={currentSection === i}>
              <div className="w-full h-full flex items-center justify-center bg-teal-700/40">
                <span>
                  {i}
                </span>
              </div>
            </FullScreenSection>
          ))
        }
      </div>
    </div>

  )
}

export default Carousel2
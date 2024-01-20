import { RefObject, useState, useEffect } from "react"
import { scrollDelay } from "../constants/CarouselConstants"
import { throttle } from "../utils"

export const useCustomScroll = (containerRef: RefObject<HTMLElement>) => {
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
    }, scrollDelay)
  }, [currentSection, containerRef])

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

  }, [containerRef])

  return {
    currentSection,
    setCurrentSection,
  }
}
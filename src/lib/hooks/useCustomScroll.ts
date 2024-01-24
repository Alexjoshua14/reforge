import { RefObject, useState, useEffect } from "react"
import { scrollDelay, scrollThrottleDuration } from "../constants/CarouselConstants"
import { throttle } from "../utils"

export const useCustomScroll = (containerRef: RefObject<HTMLElement>, itemCount: number) => {
  const [currentSection, setCurrentSection] = useState(0)


  /** Scroll to current section */
  useEffect(() => {
    if (!containerRef.current)
      return
    const container = containerRef.current
    const scrollIncrement = container.offsetHeight

    // Scroll to current section
    setTimeout(() => {
      container.scrollTo({
        top: (currentSection * scrollIncrement),
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

      // Update current section and ensure we don't go out of bounds
      // TEST: Ensure bounds are correct and respected
      setCurrentSection(prev => Math.max(Math.min(prev + dir, itemCount - 1), 0))
    }, scrollThrottleDuration)

    const handleScroll = (e: WheelEvent) => {
      e.preventDefault()
      e.stopPropagation()
      throttledScroll(e)
    }

    container.addEventListener('wheel', handleScroll, { passive: false })

    return () => {
      container.removeEventListener('wheel', handleScroll)
    }

  }, [containerRef, itemCount])

  return {
    currentSection,
    setCurrentSection,
  }
}
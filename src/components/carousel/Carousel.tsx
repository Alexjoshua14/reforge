'use client'

import { FC, HTMLAttributes, useCallback, useEffect, useRef, useState } from 'react'
import FullScreenSection from '../FullScreenSection'
import { motion } from 'framer-motion'

/**
 * Places each child in a full screen section
 */
interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
  // children: Iterable<React.ReactNode>
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

const Carousel: FC<CarouselProps> = ({ children }) => {
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


  /** Grab children componets as an array */
  if (children === undefined || children === null || typeof children === 'boolean')
    return null

  const childArray = Array.isArray(children) ? children : [children]

  return (
    <div
      ref={containerRef}
      className="h-screen w-screen overflow-scroll">
      <div className="z-50 fixed top-1/2 -translate-y-1/2 right-10 flex flex-col gap-4 ">
        {Array.from({ length: childArray.length }).map((_, i) => (
          <button className="w-5 h-5" key={`nav-${i}`} onClick={() => setCurrentSection(i)}>
            {i}
          </button>
        ))}
      </div>
      <div className="min-h-screen h-fit w-screen bg-primary text-primary">
        {
          childArray.map((child, i) => (
            <FullScreenSection key={`section-${i}`} curr={currentSection === i}>
              {child}
            </FullScreenSection>
          ))
        }
      </div>
    </div>
  )
}

export default Carousel
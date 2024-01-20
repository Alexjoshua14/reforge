'use client'

import { FC, HTMLAttributes, useCallback, useEffect, useRef, useState } from 'react'
import FullScreenSection from '../FullScreenSection'
import { motion } from 'framer-motion'
import { scrollDelay, zoomDuration } from '@/lib/constants/CarouselConstants'
import { CarouselNavDotVariants, CarouselNavVariants } from '@/lib/variants/CarouselVariants'
import CarouselControls from './CarouselControls'

/**
 * Places each child in a full screen section
 * 
 * TODO: Change scroll to transform
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
    }, scrollDelay)
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
      <CarouselControls length={childArray.length} currentSection={currentSection} setCurrentSection={setCurrentSection} />
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
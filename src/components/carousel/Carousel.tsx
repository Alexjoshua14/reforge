'use client'

import { FC, HTMLAttributes, useCallback, useEffect, useRef, useState } from 'react'
import FullScreenSection from '../FullScreenSection'
import { motion } from 'framer-motion'
import { scrollDelay, zoomDuration } from '@/lib/constants/CarouselConstants'
import { CarouselNavDotVariants, CarouselNavVariants } from '@/lib/variants/CarouselVariants'
import CarouselControls from './CarouselControls'
import { throttle } from '@/lib/utils'
import { useCustomScroll } from '@/lib/hooks/useCustomScroll'

/**
 * Places each child in a full screen section
 * 
 * TODO: Change scroll to transform
 */
interface CarouselProps extends HTMLAttributes<HTMLDivElement> {

}

const Carousel: FC<CarouselProps> = ({ children }) => {

  /** Grab children componets as an array */
  let childArray: React.ReactNode[]
  if (children === undefined || children === null || typeof children === 'boolean')
    childArray = []
  else
    childArray = Array.isArray(children) ? children : [children]

  const containerRef = useRef<HTMLDivElement>(null)

  const { currentSection, setCurrentSection } = useCustomScroll(containerRef, childArray.length)

  return (
    <div
      ref={containerRef}
      className="h-screen w-screen overflow-y-scroll overflow-x-hidden">
      <CarouselControls length={childArray.length} currentSection={currentSection} setCurrentSection={setCurrentSection} />
      {/* <div className="h-screen w-screen" /> */}
      <div className="min-h-screen h-fit w-screen text-primary bg-primary transition-colors duration-700 ease-in-out">
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
import { cn } from '@/lib/utils'
import React, { FC, HTMLAttributes, useRef } from 'react'
import { MotionProps, motion, useInView } from 'framer-motion'
import { zoomDuration } from '@/lib/constants/CarouselConstants'
import { SectionVariants } from '@/lib/variants/SectionVariants'

interface FullScreenSectionProps extends HTMLAttributes<HTMLDivElement> {
  curr: boolean
}

const FullScreenSection = React.forwardRef<HTMLDivElement, FullScreenSectionProps>(
  ({ curr, children, className, ...props }, ref) => {
    const sectionRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(sectionRef, { amount: 'all' })

    return (

      <motion.div
        className={
          cn(`relative w-screen h-screen flex items-center justify-center overflow-hidden`,
            className)}
        ref={sectionRef}
        variants={SectionVariants}
        // animate={{ padding: curr && isInView ? [0, 0] : [80, 40] }}
        animate={curr && isInView ? 'active' : 'inactive'}
        transition={{ duration: zoomDuration / 1000, ease: 'easeIn' }}
      >

        {children}

      </motion.div>

    )
  }
)

FullScreenSection.displayName = "FullScreenSection"

export default FullScreenSection
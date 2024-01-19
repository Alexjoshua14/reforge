import { cn } from '@/lib/utils'
import React, { FC, HTMLAttributes, useRef } from 'react'
import { MotionProps, motion, useInView } from 'framer-motion'

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
          cn(`relative w-screen h-screen flex items-center justify-center`,
            className)}

        ref={sectionRef}
        initial={{ padding: 96 }}
        animate={{ padding: curr && isInView ? 0 : 96 }}
        transition={{ duration: .4 }}

      >
        {children}
      </motion.div>
    )
  }
)

FullScreenSection.displayName = "FullScreenSection"

export default FullScreenSection
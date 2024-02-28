'use client'

import { useInView } from 'framer-motion'
import { useTheme } from 'next-themes'
import { FC, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import useSlideTheme from '@/lib/hooks/useSlideTheme'
import { Theme } from '@/lib/types/ThemeType'
import { SectionProps } from '@/lib/types/SectionProps'

interface TextSectionProps extends SectionProps {
  title: string
  text: string
}

const TextSection: FC<TextSectionProps> = ({ title, text, theme = Theme.Light }) => {
  const ref = useRef<HTMLDivElement>(null)

  useSlideTheme(theme, ref)

  useEffect(() => {
    console.log(`Theme: ${theme}`)
  }, [theme])

  // TODO: Add enter and exit animations
  // Likely via variations so that we can change animation
  // depending on scroll direction
  // Title and text should move up on scroll down and down on scroll up
  // They should enter from the opposite direction scroll comes from
  // i.e., scrolling down into the section should result in elements coming from bottom
  // scrolling up into the section should result in elements coming from top
  // Title should move a greater distance over the same amount of time as text
  // Likely some easing effect

  return (
    <section
      ref={ref}
      className={`relative w-full h-full page-x-gutter flex items-center justify-center bg-section text-primary overflow-hidden ${theme}`}
    >
      <div className="z-10 relative sm:max-w-sm xl:max-w-4xl p-2">
        <motion.div
          className="absolute -top-4 left-0 -translate-y-full -translate-x-full"
          initial={{ y: -200 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 1.4, ease: 'circOut' }}
        >
          <h1 className="text-tagline">{title.toLowerCase()}_</h1>
        </motion.div>
        <motion.div
          initial={{ y: '-200px' }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.6, ease: 'circOut' }}
        >
          <p className="text-holder font-bold">
            {text}
          </p>
        </motion.div>
      </div>
      <motion.div className="z-0 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
        initial={{ textShadow: '0px 0px 0px var(--text-shadow)' }}
        whileInView={{
          textShadow:
            [
              '0px 0px 0px var(--text-shadow)',
              '0px 0px 80px var(--text-shadow)',
              '0px 0px 0px var(--text-shadow)',
              '0px 0px 80px var(--text-shadow)'
            ]
        }}
        transition={{ duration: 2.8 }}
        viewport={{ amount: .5, once: false }}
      >
        <p
          className="text-bg-blend text-bg"
        >
          {title.toLowerCase()}
        </p>
      </motion.div>
    </section>
  )
}

export default TextSection
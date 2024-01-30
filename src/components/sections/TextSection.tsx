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

  return (
    <section
      ref={ref}
      className={`relative w-full h-full page-x-gutter flex items-center justify-center bg-section text-primary overflow-hidden ${theme}`}
    >
      <div className="z-10 relative sm:max-w-sm xl:max-w-4xl p-2">
        <div className="absolute top-0 left-0 -translate-y-full -translate-x-full text-tagline">
          <h1>{title.toLowerCase()}_</h1>
        </div>
        <p className="text-holder font-bold">
          {text}
        </p>
      </div>
      <div className="z-0 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
        <motion.p
          className="text-bg-blend text-bg"
          initial={{ textShadow: '0px 0px 0px var(--text-shadow)' }}
          whileInView={{ textShadow: '0px 0px 80px var(--text-shadow)' }}
          transition={{ duration: 2.8, delay: 1 }}
          viewport={{ amount: 0.5, once: false }}
        >
          {title.toLowerCase()}
        </motion.p>
      </div>
    </section>
  )
}

export default TextSection
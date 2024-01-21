'use client'

import { useInView } from 'framer-motion'
import { useTheme } from 'next-themes'
import { FC, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface TextSectionProps {
  title: string
  text: string
}

const TextSection: FC<TextSectionProps> = ({ title, text, }) => {
  const ref = useRef<HTMLDivElement>(null)

  const isInView = useInView(ref)
  const { setTheme } = useTheme()

  useEffect(() => {
    if (isInView) {
      console.log("Setting theme to light")
      setTheme('light')
    }
  }, [isInView, setTheme])

  return (
    <section
      ref={ref}
      className="relative light w-full h-full flex items-center justify-center bg-section text-primary overflow-hidden"
    >
      <div className="z-10 relative max-w-4xl p-10">
        <div className="absolute top-0 left-0 -translate-y-full -translate-x-full text-xl font-bold">
          <h1>{title.toLowerCase()}_</h1>
        </div>
        <p className="text-4xl/[1.5] font-bold">
          {text}
        </p>
      </div>
      <div className="z-0 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
        <motion.p
          className="text-[400px] tracking-[-0.07em] whitespace-nowrap font-bold text-white"
          initial={{ textShadow: '0px 0px 0px rgba(0,0,0,0.075)' }}
          whileInView={{ textShadow: '0px 0px 80px rgba(0,0,0,0.075)' }}
          transition={{ duration: 2.8, delay: 1 }}
          viewport={{ amount: 0.5 }}
        >
          {title.toLowerCase()}
        </motion.p>
      </div>
    </section>
  )
}

export default TextSection
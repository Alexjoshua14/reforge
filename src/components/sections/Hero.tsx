'use client'

import { FC, useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'
import { useTheme } from 'next-themes'

interface HeroProps {

}

const Hero: FC<HeroProps> = ({ }) => {
  const ref = useRef<HTMLDivElement>(null)

  const isInView = useInView(ref)
  const { setTheme } = useTheme()

  useEffect(() => {
    if (isInView) {
      console.log("Setting theme to dark")
      setTheme('dark')
    }
  }, [isInView, setTheme])

  return (
    <section ref={ref} className="w-full h-full flex items-center justify-center bg-black text-white">
      <div className="relative w-fit">
        <div className="absolute top-0 left-0 -translate-y-full -translate-x-full text-xl">
          <h1>we create_</h1>
        </div>
        <p className="text-8xl">
          Clever UI
        </p>
      </div>
    </section>
  )
}

export default Hero
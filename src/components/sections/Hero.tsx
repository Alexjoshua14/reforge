'use client'

import { FC, useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { useTheme } from 'next-themes'
import { heroAdjectives, heroNouns } from '@/lib/data/heroPhrases'
import useClient from '@/lib/hooks/useClient'
import EyeThree from '../eye/EyeThree'
import { Model } from '../eye/eyeThree/Eye'
import { Canvas } from '@react-three/fiber'
import useSlideTheme from '@/lib/hooks/useSlideTheme'
import { Theme } from '@/lib/types/ThemeType'
import { SectionProps } from '@/lib/types/SectionProps'

interface HeroProps extends SectionProps {

}

const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function* generateHeroPhrases() {

  while (true) {
    // const adjectiveIndex = randomInt(0, heroAdjectives.length - 1)
    const adjectiveIndex = randomInt(0, heroAdjectives.length - 1)
    const adjective = heroAdjectives[adjectiveIndex]

    // const nounIndex = randomInt(0, heroNouns.length - 1)
    const nounIndex = randomInt(0, heroNouns.length - 1)
    const noun = heroNouns[nounIndex]

    yield `${adjective} ${noun}`
  }
}

const Hero: FC<HeroProps> = ({ }) => {
  const heroPhraseGenerator = generateHeroPhrases()
  const ref = useRef<HTMLDivElement>(null)
  const [heroPhrase, setHeroPhrase] = useState<string>(heroPhraseGenerator.next().value ?? "")
  const isClient = useClient()
  const heroIntervalID = useRef<NodeJS.Timeout | null>(null)

  const isInView = useInView(ref)

  useSlideTheme(Theme.Light, ref)

  useEffect(() => {
    if (isInView) {
      heroIntervalID.current = setInterval(() => {
        setHeroPhrase(heroPhraseGenerator.next().value ?? "Clever UI")
      }, 300)

      return () => {
        if (heroIntervalID.current)
          clearInterval(heroIntervalID.current)
      }
    }
    else {
      if (heroIntervalID.current)
        clearInterval(heroIntervalID.current)
    }
  }, [heroPhraseGenerator, isInView])

  return (
    <section
      ref={ref}
      className="relative w-full h-full flex items-center justify-center text-white"
      style={{ background: 'radial-gradient(black 40%, hsl(var(--accent)))' }}
    >
      <div className="z-0 absolute w-full h-full flex items-center justify-center bg-black/60 backdrop-blur-3xl" />
      <div className="z-10 absolute left-1/2 xl:left-1/4 top-1/2 -translate-y-1/2 -translate-x-1/2 xl:-translate-x-0 w-fit">
        <div className="absolute top-0 left-1/2 xl:left-0 -translate-y-full -translate-x-1/2 xl:-translate-x-full text-xl">
          <h1>we create_</h1>
        </div>
        {isClient &&
          (<p className="font-hero whitespace-nowrap">
            {heroPhrase}
          </p>)
        }
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex">
        <EyeThree />
      </div>

    </section>
  )
}

export default Hero
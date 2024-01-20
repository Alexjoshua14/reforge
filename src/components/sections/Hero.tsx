'use client'

import { FC, useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { useTheme } from 'next-themes'
import { heroAdjectives, heroNouns } from '@/lib/data/heroPhrases'
import useClient from '@/lib/hooks/useClient'

interface HeroProps {

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
  const { setTheme } = useTheme()

  useEffect(() => {
    if (isInView) {
      console.log("Setting theme to dark")
      setTheme('dark')
    }
  }, [isInView, setTheme])

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
    <section ref={ref} className="w-full h-full flex items-center justify-center bg-black text-white">
      <div className="absolute left-1/2 xl:left-1/4 top-1/2 -translate-y-1/2 -translate-x-1/2 xl:-translate-x-0 w-fit">
        <div className="absolute top-0 left-1/2 xl:left-0 -translate-y-full -translate-x-1/2 xl:-translate-x-full text-xl">
          <h1>we create_</h1>
        </div>
        {isClient &&
          (<p className="text-8xl whitespace-nowrap">
            {heroPhrase}
          </p>)
        }
      </div>
    </section>
  )
}

export default Hero
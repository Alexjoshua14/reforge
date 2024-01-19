'use client'

import { FC, MouseEvent, useEffect, useState } from 'react'
import FullScreenSection from '../FullScreenSection'
import { CarouselApi, Carousel as CarouselComponent, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'

interface CarouselProps {

}

const Carousel: FC<CarouselProps> = ({ }) => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })

  }, [api])


  return (
    <CarouselComponent
      setApi={setApi}
      orientation="vertical"
      opts={{ align: "start", axis: "y" }}
    >

      <CarouselContent className="h-screen">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <FullScreenSection>
              <span>
                {index + 1}
              </span>
            </FullScreenSection>
          </CarouselItem>
        ))}

      </CarouselContent>
      <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-8">
        <CarouselPrevious />
        <CarouselNext />
      </div>

    </CarouselComponent>
  )
}

export default Carousel
import { scrollDelay } from '@/lib/constants/CarouselConstants'
import { CarouselNavVariants, CarouselNavDotVariants } from '@/lib/variants/CarouselVariants'
import { motion } from 'framer-motion'
import { FC } from 'react'

interface CarouselControlsProps {
  length: number
  currentSection: number
  setCurrentSection: (index: number) => void
}

const CarouselControls: FC<CarouselControlsProps> = ({ length, currentSection, setCurrentSection }) => {
  return (
    <div className="z-50 fixed top-1/2 -translate-y-1/2 right-10 flex flex-col gap-4 text-primary">
      {Array.from({ length }).map((_, i) => (
        <button
          className="w-5 h-5"
          key={`nav-${i}`}
          onClick={() => setCurrentSection(i)}
        >
          <motion.div
            className="w-4 h-auto aspect-square rounded-full grid place-content-center"
            variants={CarouselNavVariants}
            animate={currentSection === i ? 'active' : 'inactive'}
            transition={{ duration: 1.4, ease: 'easeIn', delay: scrollDelay / 1000 }}
          >
            <motion.div
              className="w-1 h-auto aspect-square rounded-full"
              variants={CarouselNavDotVariants}
              animate={currentSection === i ? 'active' : 'inactive'}
              transition={{ duration: 1.4, ease: 'easeIn', delay: scrollDelay / 1000 }}
            />
          </motion.div>
        </button>
      ))}
    </div>
  )
}

export default CarouselControls
import { FC, Suspense, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion-3d'
import { Canvas, useLoader } from '@react-three/fiber'

import { Vector3 } from 'three'
import { MotionValue, useInView } from 'framer-motion'
import { Model } from './eyeThree/Eye'

interface EyeThreeProps {

}

const EyeThree: FC<EyeThreeProps> = ({ }) => {
  const containerRef = useRef(null)
  const [cursorPosition, setCursorPosition] = useState<Vector3>(new Vector3(window.innerWidth / 2, window.innerWidth / 2, 0))
  const lookAt = new MotionValue<Vector3>()
  const isInview = useInView(containerRef)

  useEffect(() => {
    const trackCursor = (e: MouseEvent) => {
      setCursorPosition(new Vector3(e.clientX, e.clientY, 0))
    }

    if (isInview) {
      window.addEventListener('mousemove', trackCursor)
    } else {
      window.removeEventListener('mousemove', trackCursor)
    }

    return () => {
      window.removeEventListener('mousemove', trackCursor)
    }
  }, [isInview])

  useEffect(() => {
    // Obtain vector for center of page
    const center = new Vector3(window.innerWidth / 2, window.innerHeight / 2, 0)

    lookAt.set(cursorPosition.clone().sub(center).normalize())

  })

  return (
    <Canvas style={{ width: 400, height: 400 }} ref={containerRef}>
      <motion.mesh
        scale={2}
        animate={{
          rotateX: ((cursorPosition.y - (window.innerHeight / 2)) / (window.innerHeight)) * (Math.PI / 2),
          rotateY: ((cursorPosition.x - (window.innerWidth / 2)) / window.innerWidth) * (Math.PI / 2),
        }}
        transition={{ duration: 1 }}
      >
        <Model />
      </motion.mesh>
      <motion.ambientLight intensity={1} />
    </Canvas >
  )
}

export default EyeThree
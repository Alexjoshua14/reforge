import { FC, Suspense, useEffect, useState } from 'react'
import { motion } from 'framer-motion-3d'
import { Canvas, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { Vector3 } from 'three'
import { MotionValue } from 'framer-motion'

interface EyeThreeProps {

}

const EyeThree: FC<EyeThreeProps> = ({ }) => {
  const [colorMap, displacementMap, normalMap, roughnessMap] = useLoader(TextureLoader, [
    '/eye/Concrete036_1K-JPG_Color.jpg',
    '/eye/Concrete036_1K-JPG_Displacement.jpg',
    '/eye/Concrete036_1K-JPG_NormalGL.jpg',
    '/eye/Concrete036_1K-JPG_Roughness.jpg',
  ])

  const [cursorPosition, setCursorPosition] = useState<Vector3>(new Vector3(window.innerWidth / 2, window.innerWidth / 2, 0))
  const lookAt = new MotionValue<Vector3>()
  const testVector = new Vector3(0, 0, 0)

  useEffect(() => {
    const trackCursor = (e: MouseEvent) => {
      setCursorPosition(new Vector3(e.clientX, e.clientY, 0))
    }

    window.addEventListener('mousemove', trackCursor)

    return () => {
      window.removeEventListener('mousemove', trackCursor)
    }
  }, [])

  useEffect(() => {
    // Obtain vector for center of page
    const center = new Vector3(window.innerWidth / 2, window.innerHeight / 2, 0)

    lookAt.set(cursorPosition.clone().sub(center).normalize())

  })

  return (
    <Canvas style={{ width: 400, height: 400 }}>
      <motion.group>
        <motion.mesh

          animate={{
            rotateX: (cursorPosition.y - (window.innerHeight / 2)) / 360,
            rotateY: (cursorPosition.x - (window.innerWidth / 2)) / 360,
          }}
          transition={{ duration: 1 }}
        >
          <sphereGeometry args={[3, 100, 100, 0, 2.4]} />
          <meshStandardMaterial map={colorMap} normalMap={normalMap} roughnessMap={roughnessMap} alphaMap={roughnessMap} />
        </motion.mesh>
        {/* <motion.mesh scale={.4} position={[0, 0, 3]}
          animate={{
            rotateX: (cursorPosition.y - (window.innerHeight / 2)) / 360,
            rotateY: (cursorPosition.x - (window.innerWidth / 2)) / 360,
            // rotateY: [0, Math.PI / 2, 0],
            // rotateZ: [0, Math.PI / 2, 0],
          }}
        >
          <sphereGeometry args={[2, 64, 64, 0, 2.4]} />
          <meshBasicMaterial color={'white'} />
        </motion.mesh> */}
      </motion.group>

      <motion.ambientLight />
    </Canvas>
  )
}

export default EyeThree
import { useInView } from "framer-motion"
import { useTheme } from "next-themes"
import { RefObject, useEffect } from "react"
import { Theme } from "../types/ThemeType"

const useSlideTheme = (theme: Theme, ref: RefObject<HTMLElement>) => {
  const { setTheme } = useTheme()
  const isInView = useInView(ref, { amount: 0.7 })

  useEffect(() => {
    if (isInView) {
      setTheme(theme)
    }
  }, [isInView, theme, setTheme])
}

export default useSlideTheme
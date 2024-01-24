'use client'

import useSlideTheme from '@/lib/hooks/useSlideTheme'
import { SectionProps } from '@/lib/types/SectionProps'
import { Theme } from '@/lib/types/ThemeType'
import { cn } from '@/lib/utils'
import { useInView } from 'framer-motion'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { FC, HTMLAttributes, useEffect, useRef } from 'react'

interface CaseStudySectionProps extends SectionProps {
  title: string
  text: string
  link: string
}

const CaseStudy: FC<CaseStudySectionProps> = ({ title, text, link, className, theme = Theme.CaseStudy }) => {
  const ref = useRef<HTMLDivElement>(null)

  useSlideTheme(theme, ref)

  return (
    <section ref={ref} className={cn(`h-full w-full pt-40 pb-20 px-10 flex items-center case-study bg-section text-white ${theme}`, className)}>
      <div className="w-96 h-full flex flex-col justify-between">
        <h1 className="text-3xl font-medium">
          Case Study
        </h1>
        <h2 className="text-[150px]/[.9] font-bold">
          {title}_
        </h2>
        <p className="leading-relaxed font-extralight">
          {text}
        </p>

        <Link href={link} className="font-medium">
          {`see case study --->`}
        </Link>

      </div>
    </section>
  )
}

export default CaseStudy
'use client'

import useSlideTheme from '@/lib/hooks/useSlideTheme'
import { SectionProps } from '@/lib/types/SectionProps'
import { Theme } from '@/lib/types/ThemeType'
import { cn } from '@/lib/utils'
import { useInView } from 'framer-motion'
import { ArrowBigLeft, ArrowRightFromLine } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { FC, HTMLAttributes, useEffect, useRef } from 'react'
import { HiOutlineArrowNarrowRight } from 'react-icons/hi'

interface CaseStudySectionProps extends SectionProps {
  title: string
  summary: string
  link: string
}

const CaseStudy: FC<CaseStudySectionProps> = ({ title, summary, link, className, theme = Theme.CaseStudy }) => {
  const ref = useRef<HTMLDivElement>(null)

  useSlideTheme(theme, ref)

  return (
    <section ref={ref} className={cn(`h-full w-full pt-40 pb-20 page-x-gutter flex items-center case-study bg-section text-white ${theme}`, className)}>
      <div className="w-96 h-full flex flex-col justify-end gap-10">
        <h1 className="text-xl font-medium">
          Case Study
        </h1>
        <Link href={link}>
          <h2 className="text-[100px]/[.9] xl:text-[150px]/[.9] font-bold">
            {title}_
          </h2>
        </Link>
        <p className="leading-relaxed font-extralight">
          {summary}
        </p>

        <Link href={link} className="text-lg font-medium flex items-center gap-2 group">
          {`see case study`}
          <span className="group-hover:translate-x-1/2 transition-transform duration-300">
            <HiOutlineArrowNarrowRight size={30} />
          </span>
        </Link>

      </div>
    </section>
  )
}

export default CaseStudy
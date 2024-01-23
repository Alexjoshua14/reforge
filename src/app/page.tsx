
import Carousel from '@/components/carousel/Carousel'
import TextSection from '@/components/sections/TextSection'
import CaseStudySection from '@/components/sections/CaseStudySection'

import Hero from '@/components/sections/Hero'
import NavBar from '@/components/NavBar'

export default function Home() {

  return (
    <main className="flex h-screen w-screen overflow-hidden flex-col items-center justify-between">
      <NavBar />

      <Carousel>
        {/* <Hero /> */}
        <TextSection title="we are" text="A team of designers, developers, inventors, strategists, artists and storytellers. In 2001 we united as a New York-based strategic design studio, employing our breadth of expertise to create exceptional digital experiences." />
        <CaseStudySection title="happy moves" text="A fitness tracking app that creates happiness through movement." link="/" />
        <TextSection title="we believe" text="That behind every successful design is solid strategic thinking. We put a creative director and senior strategist on every project, to ensure results that are both alluring and easy to use. We’re problem-solvers, first and foremost, and always up for a challenge." />
        <CaseStudySection title="happy moves" text="A fitness tracking app that creates happiness through movement." link="/" />
        <TextSection title="our impact" text="We’ve helped launch beverages, apps and start-ups, and raised millions of dollars for charities. We’re proud to say that we’ve been working with a number of our clients for over a decade, supporting and serving them through each new phase of their business." />
        <CaseStudySection title="happy moves" text="A fitness tracking app that creates happiness through movement." link="/" />
        <TextSection title="our clients" text="Over the past 16 years we’ve partnered with some of the world’s leading companies in food & beverage, fashion, entertainment, lifestyle, publishing, banking and more. " />
      </Carousel>
    </main>
  )
}

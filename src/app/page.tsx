import FullScreenSection from '@/components/FullScreenSection'
import Carousel from '@/components/carousel/Carousel2'
import Image from 'next/image'

export default function Home() {

  return (
    <main className="flex h-screen w-screen overflow-hidden flex-col items-center justify-between">
      <div className="fixed top-0 left-0 w-full flex justify-betwen">
        <h1>reforge</h1>
        <ul className="flex gap-4">
          <li>
            work.
          </li>
          <li>
            services.
          </li>
          <li>
            news.
          </li>
          <li className="text-red-700/80">
            contact.
          </li>
        </ul>
      </div>

      <Carousel />
    </main>
  )
}

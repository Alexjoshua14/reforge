'use client'

import { AnchorHTMLAttributes, FC, useState } from 'react'
import NavLink from './NavLink'
import { navOptions } from './NavBar'
import { IoIosPin } from 'react-icons/io'

interface MobileMenuProps {

}

interface CustomLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  text: string
}

const Link: FC<CustomLinkProps> = ({ text, ...props }) => (
  <a {...props} className="hover:underline" target={props.href === '/' ? '_self' : '_blank'}>
    {text}
  </a>
)

const MobileMenu: FC<MobileMenuProps> = ({ }) => {
  const [menuCollapsed, setMenuCollapsed] = useState(true)

  return (
    <>
      <button className={`z-20 sm:hidden text-sm font-light underline transition-colors duration-1000 ${menuCollapsed ? 'text-inherit' : 'text-white'}`} onClick={() => setMenuCollapsed(prev => !prev)}>
        {menuCollapsed ? 'menu.' : 'close.'}
      </button>
      <section className={`z-10 absolute top-0 left-full w-screen h-screen pt-32 pb-6 page-x-gutter flex flex-col justify-between bg-accent text-white ${menuCollapsed ? '' : '-translate-x-full'} transition-transform duration-1000`}>
        <h1 className="hidden">menu</h1>
        <div className="absolute top-0 left-0 h-20 page-x-gutter flex items-center">
          <h1 className="text-xl tracking-wide">
            reforge
          </h1>
        </div>
        <ul className="flex flex-col gap-3">
          {navOptions.map((nav) => (
            <NavLink
              text={nav.title}
              link={nav.link}
              key={`nav-${nav.title}`}
              className="text-3xl"
              variation='mobile'
            />
          ))}
        </ul>
        <div className="flex flex-col gap-6 text-xs font-normal">

          <div className="flex flex-col gap-4">
            <a href="/" className="text-base font-bold group">
              <p className="group-hover:underline">124 Mock Ave, 0th Floor</p>
              <div className="flex gap-1 items-center">
                <p className="group-hover:underline">Atlantis</p>
                <IoIosPin size={18} />
              </div>

            </a>

            <Link text="(978) 902-1042" href="/" />
            <Link text="heythere@reforge.io" href="/" />
          </div>
          <ul className="flex gap-4 text-[10px] font-light">
            <li>
              <Link href="https://instagram.com/aartistry14" text="Instagram" />
            </li>
            <li>
              <Link href="https://www.twitter.com/crossedcircuits" text="Twitter" />
            </li>
            <li>
              <Link href="https://www.linkedin.com/in/alexander-joshua" text="LinkedIn" />
            </li>
            <li>
              <Link href="https://www.github.com/alexjoshua14" text="GitHub" />
            </li>
          </ul>

        </div>


      </section>
    </>
  )
}

export default MobileMenu
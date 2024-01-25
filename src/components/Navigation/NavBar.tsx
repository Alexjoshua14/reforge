import { FC, useState } from 'react'
import NavLink from './NavLink'
import MobileMenu from './MobileMenu'

interface NavBarProps {

}

export const navOptions = [
  {
    title: 'work',
    link: '/'
  },
  {
    title: 'services',
    link: '/'
  },
  {
    title: 'news',
    link: '/'
  },
  {
    title: 'contact',
    link: '/'
  }
]

const NavBar: FC<NavBarProps> = ({ }) => {

  return (
    <div className="z-50 fixed top-0 left-0 w-full h-20 sm:h-40 flex justify-between items-center page-x-gutter text-primary transition-colors font-bold">
      <h1 className="text-xl tracking-wide">
        reforge
      </h1>
      <ul className="hidden sm:flex gap-4">
        {navOptions.filter((nav) => nav.title != 'contact').map((nav) => (
          <NavLink
            text={nav.title}
            link={nav.link}
            key={`nav-${nav.title}`}
          />
        ))}
        <NavLink text="contact" link="/" variation='accent' />
      </ul>
      <MobileMenu />
    </div>
  )
}

export default NavBar
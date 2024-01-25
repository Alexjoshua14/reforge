import { FC } from 'react'
import NavLink from './NavLink'

interface NavBarProps {

}

const navOptions = [
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
]

const NavBar: FC<NavBarProps> = ({ }) => {
  return (
    <div className="z-50 fixed top-0 left-0 w-full h-40 flex justify-between items-center px-24 text-primary transition-colors font-bold">
      <h1 className="text-xl tracking-wide">
        reforge
      </h1>
      <ul className="flex gap-4">
        {navOptions.map((nav) => (
          <NavLink
            text={nav.title}
            link={nav.link}
            key={`nav-${nav.title}`}
          />
        ))}
        <NavLink text="contact" link="/" variation='accent' />
      </ul>
    </div>
  )
}

export default NavBar
import { FC } from 'react'

interface NavBarProps {

}

const NavBar: FC<NavBarProps> = ({ }) => {
  return (
    <div className="z-50 fixed top-0 left-0 w-full h-40 flex justify-between items-center px-24 text-primary transition-colors font-medium">
      <h1 className="text-2xl tracking-wide">
        reforge
      </h1>
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
        <li className="text-accent">
          contact.
        </li>
      </ul>
    </div>
  )
}

export default NavBar
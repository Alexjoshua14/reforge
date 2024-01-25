import Link from 'next/link'
import { FC, LiHTMLAttributes } from 'react'

interface NavLinkProps extends LiHTMLAttributes<HTMLLIElement> {
  text: string
  link: string
  variation?: 'accent'
}

const NavLink: FC<NavLinkProps> = ({ text, link, variation, ...props }) => {
  return (
    <li {...props}>
      <Link href={link} className={`flex flex-col group ${variation === 'accent' ? 'text-accent' : 'text-primary'}`}>
        {text + '.'}
        <span className={`h-[1px] w-0 group-hover:w-full opacity-0 group-hover:opacity-100 origin-left transition-all duration-500 ${variation === 'accent' ? 'bg-accent' : 'bg-primary'}`} />
      </Link>
    </li>
  )
}

export default NavLink
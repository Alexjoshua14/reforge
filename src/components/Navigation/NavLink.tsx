import Link from 'next/link'
import { FC, LiHTMLAttributes } from 'react'

interface NavLinkProps extends LiHTMLAttributes<HTMLLIElement> {
  text: string
  link: string
  variation?: 'accent' | 'mobile'
}

/**
 * 
 * TODO: Clean up variations
 */
const NavLink: FC<NavLinkProps> = ({ text, link, variation, ...props }) => {
  return (
    <li {...props}>
      <Link
        href={link}
        className={`
          w-fit flex flex-col group 
          ${variation === 'accent' ? 'text-accent'
            : variation === 'mobile' ? 'text-white'
              : 'text-primary'}
          `}
      >
        {text + '.'}
        <span
          className={`
            h-[1px] w-0 opacity-0
            group-hover:w-full group-hover:opacity-100 origin-left transition-all duration-300 
            ${variation === 'accent' ? 'bg-accent'
              : 'bg-primary'}
            `}
        />
      </Link>
    </li>
  )
}

export default NavLink
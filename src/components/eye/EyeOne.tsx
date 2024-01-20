import { FC } from 'react'

interface EyeOneProps {

}

const EyeOne: FC<EyeOneProps> = ({ }) => {
  return (
    <div
      className="w-96 h-96 rounded-full bg-zinc-500 flex items-center justify-center"
    >
      <div className="w-11/12 aspect-square rounded-full bg-black/80 flex items-center justify-center">
        <div className="w-3/4 aspect-square rounded-full bg-white/80 flex items-center justify-center">
          <div className="w-1/2 aspect-square rounded-full bg-black/90">

          </div>
        </div>
      </div>
    </div>
  )
}

export default EyeOne
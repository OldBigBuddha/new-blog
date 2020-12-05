import { ReactNode } from 'react'

type Props = {
  children?: ReactNode
}

const PostTitle = ({ children }: Props) => {
  return (
    <h1 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tighter text-center mt-4">
      {children}
    </h1>
  )
}

export default PostTitle

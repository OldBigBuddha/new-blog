import { format } from 'date-fns'

type Props = {
  createdAt: number
}

const CreatedAt = ({ createdAt }: Props) => {
  const date = new Date(createdAt)
  return <time className="block text-base text-center mb-12" dateTime={format(date, "yyyy-MM-dd")}>{format(date, "yyyy-MM-dd")}</time>
}

export default CreatedAt

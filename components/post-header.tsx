import PostTitle from './post-title'
import CreatedAt from './created-at'
import OldAlert from './old-alert'

type Props = {
  title: string
  date: number
}

const PostHeader = ({ title, date }: Props) => {
  const passedYear = (new Date()).getFullYear() - (new Date(date)).getFullYear()
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <CreatedAt createdAt={date}/>
      {passedYear > 0 && (<OldAlert pastYear={passedYear} />)}
    </>
  )
}


export default PostHeader

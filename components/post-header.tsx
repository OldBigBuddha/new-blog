import { Heading } from "@chakra-ui/react";

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
      <Heading as="h1"
        fontSize={{base: "xl", md: "2xl", xl: "3xl"}}
        fontWeight="bold"
        textAlign="center"
        letterSpacing="-.04em"
        marginTop={4}>
        {title}
      </Heading>
      <CreatedAt createdAt={date}/>
      {passedYear > 0 && (<OldAlert pastYear={passedYear} />)}
    </>
  )
}


export default PostHeader

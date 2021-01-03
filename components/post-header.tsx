import { Heading } from "@chakra-ui/react";

import CreatedAt from './created-at'
import OldAlert from './old-alert'

type Props = {
  title: string
  date: number
}

const PostHeader = ({ title, date }: Props) => {
  const passedTime = (new Date()).getTime() - (new Date(date)).getTime()
  const passedDays = Math.floor(passedTime / (1000*60*60*24))
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
      {passedDays >= 365 && (<OldAlert pastYear={Math.floor(passedDays/365)} />)}
    </>
  )
}


export default PostHeader

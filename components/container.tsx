import { Box } from '@chakra-ui/react'
import { ReactNode, FunctionComponent } from 'react'

type Props = {
  children?: ReactNode
}

const Container: FunctionComponent = ({ children }: Props) => {
  return <Box width={{base: "100%", xl: "50%", lg: "65%", md: "80%"}} marginX="auto" paddingX={5}>{children}</Box>
}

export default Container

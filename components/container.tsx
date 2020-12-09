import { Box } from '@chakra-ui/react'
import { ReactNode, FunctionComponent } from 'react'

type Props = {
  children?: ReactNode
}

const Container: FunctionComponent = ({ children }: Props) => {
  return <Box width="100%" marginX="auto" paddingX={5}>{children}</Box>
}

export default Container

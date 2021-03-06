import { Box } from "@chakra-ui/react"

import Footer from './footer'
import Header from './header'
import Meta from './meta'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Meta />
      <Box minHeight="100vh" position="relative" paddingBottom="2rem">
        <Header />
        <Box as="main" marginBottom={4}>{children}</Box>
        <Footer />
      </Box>
    </>
  )
}

export default Layout

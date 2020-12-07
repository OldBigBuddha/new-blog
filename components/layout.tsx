import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme/index'

import Footer from './footer'
import Header from './header'
import Meta from './meta'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <ChakraProvider resetCSS={true} theme={theme}>
      <Meta />
        <Header />
        <main>{children}</main>
        <Footer />
    </ChakraProvider>
  )
}

export default Layout

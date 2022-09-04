import { useColorMode } from "@chakra-ui/react"

import { Flex } from "@chakra-ui/react";
import {Link} from "@chakra-ui/react";

const Footer = () => {
  const {colorMode} = useColorMode()
  return (
    <Flex as="footer" width="100%" fontSize={{base: "xs", md: "base"}} backgroundColor={colorMode == "dark" ? "white" : "gray.600"} justify="space-between" position="absolute" bottom="0">
      <Flex as="span" direction={{base: "column", lg: "row"}} marginX={3}>License: <Link href="https://creativecommons.org/licenses/by-sa/4.0/" fontWeight="bold">CC-BY-SA 4.0</Link></Flex>
      <small>&copy; 2020 OldBigBuddha.</small>
      <Flex direction={{base: "column", lg: "row"}}>
        <Link href="/privacy-policy" fontWeight="bold" marginX={3}>Privacy Policy</Link>
        <Link href="https://github.com/OldBigBuddha/Blog" fontWeight="bold" marginX={3}>View on GitHub</Link>
      </Flex>
    </Flex>
  )
}

export default Footer

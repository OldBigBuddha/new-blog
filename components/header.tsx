import { Box, Flex, HStack, Link, Image, useColorMode } from "@chakra-ui/react";

import DarkModeSwitcher from "./dark-mode-switcher";

const Header = () => {
  const {colorMode} = useColorMode();
  return (
    <Flex as="header" justify="space-between" marginX={3} marginBottom={10} marginTop={4}>
      <Link
        href="/"
        fontSize={{base: "2xl", md: "4xl"}} fontWeight="bold"
        rounded="full"
        padding={4}
        _hover={{
          textDecoration: "none",
          boxShadow: "md"
        }}
        transitionProperty="box-shadow" transitionDuration="150mx">
        <HStack spacing={0} align="baseline">
          <Image h="55px" backgroundColor="transparent" shadow="none" padding={0} src="/img/logo.png"/>
          <Box as="span" textColor={colorMode == "dark" ? "gray.800" : "gray.200"} marginLeft="0px" marginTop="auto">imple is Best</Box>
        </HStack>
      </Link>

      <DarkModeSwitcher />
    </Flex>
  )
}

export default Header

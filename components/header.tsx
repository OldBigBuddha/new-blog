import { Box, Flex, HStack, Link, Image, useColorMode } from "@chakra-ui/react";

import DarkModeSwitcher from "./dark-mode-switcher";

const Header = () => {
  const {colorMode} = useColorMode();
  return (
    <Flex as="header" justify="space-between" alignItems="center" paddingX={{base: 4, md: 8}} marginBottom={{base: 8, md: 10}} marginTop={4}>
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
        <HStack spacing={0} alignItems="baseline">
          <Image h="55px" backgroundColor="transparent" shadow="none" padding={0} src="/img/logo.png"/>
          <Box as="span" textAlign="center" textColor={colorMode == "dark" ? "gray.800" : "gray.200"}>imple is Best</Box>
        </HStack>
      </Link>

      <DarkModeSwitcher />
    </Flex>
  )
}

export default Header

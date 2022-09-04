import { useColorMode, IconButton } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const DarkModeSwitcher = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return <IconButton
    aria-label="Toggle Dark Mode"
    icon={colorMode == "dark" ? <SunIcon /> : <MoonIcon />}
    onClick={toggleColorMode}
    backgroundColor={colorMode == "dark" ? "gray.100" : "gray.700"}
  />
}

export default DarkModeSwitcher;
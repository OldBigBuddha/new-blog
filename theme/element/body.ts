import { useColorMode } from "@chakra-ui/react";

const body = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return {
    backgroundColor: colorMode == "dark" ? "gray.100" : "gray.700",
    color: colorMode == "dark" ? "gray.700" : "gray.100",
    height: "100vh",
    width: "100vw",
  };
};

export default body;

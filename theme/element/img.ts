import { useColorMode } from "@chakra-ui/react";

const img = () => {
  const { colorMode } = useColorMode();
  return {
    display: "block",
    backgroundColor: colorMode == "dark" ? "white" : "gray.600",
    rounded: "xl",
    boxShadow: "base",
    padding: "0.5rem",
  };
};

export default img;

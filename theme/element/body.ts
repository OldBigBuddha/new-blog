import { useColorMode } from "@chakra-ui/react";

const body = () => {
  const { colorMode } = useColorMode();
  return {
    fontFamily:
      "fot-tsukubrdgothic-std, -apple-system, BlinkMacSystemFont,Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,Helvetica Neue, sans-serif",
    fontSize: "1.125rem",
    lineHeight: "1.625",
    backgroundColor: colorMode == "dark" ? "gray.100" : "gray.700",
    color: colorMode == "dark" ? "gray.700" : "gray.100",
    height: "100vh",
    width: "100vw",
  };
};

export default body;

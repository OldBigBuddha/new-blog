import { useColorMode } from "@chakra-ui/react";

const h4 = () => {
  const { colorMode } = useColorMode();
  return {
    color: colorMode == "dark" ? "gray.600" : "gray.100",
    fontSize: "1.125rem",
    lineHeight: "1.75rem",
    fontFamily:
      "fot-tsukubrdgothic-std, -apple-system, BlinkMacSystemFont,Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,Helvetica Neue, sans-serif",
    marginY: "1rem",
  };
};

export default h4;

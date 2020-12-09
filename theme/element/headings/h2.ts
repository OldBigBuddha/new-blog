import { useColorMode } from "@chakra-ui/react";

const h2 = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return {
    color: colorMode == "dark" ? "gray.600" : "gray.100",
    fontSize: "1.5rem",
    fontFamily:
      "fot-tsukubrdgothic-std, -apple-system, BlinkMacSystemFont,Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,Helvetica Neue, sans-serif",
    borderBottom: "2px solid #718096",
    marginY: "1rem",
    _before: {
      content: '"#"',
      marginRight: "0.5rem",
    },
  };
};

export default h2;

import { useColorMode } from "@chakra-ui/react";

const h2 = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return {
    color: colorMode == "dark" ? "gray.600" : "gray.100",
    fontSize: "1.5rem",
    borderBottom: "2px solid #718096",
    marginY: "1rem",
    _before: {
      content: '"#"',
      marginRight: "0.5rem",
    },
  };
};

export default h2;

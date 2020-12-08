import { mode } from "@chakra-ui/theme-tools";

const h2 = {
  color: mode("gray.600", "gray.100"),
  fontSize: "1.5rem",
  borderBottom: "2px solid #718096",
  marginY: "1rem",
  _before: {
    content: '"#"',
    marginRight: "0.5rem",
  },
};

export default h2;

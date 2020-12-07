import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        fontFamily:
          "fot-tsukubrdgothic-std, -apple-system, BlinkMacSystemFont,Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,Helvetica Neue, sans-serif",
        backgroundColor: mode("gray.100", "gray.700")(props),
        color: mode("gray.700", "gray.100")(props),
        height: "100vh",
        width: "100vw",
      },
      h2: {
        color: mode("gray.600", "gray.100")(props),
        fontSize: "1.5rem",
        borderBottom: "2px solid #718096",
        marginY: "1rem",
        _before: {
          content: '"#"',
          marginRight: "0.5rem",
        },
      },
      a: {
        color: "green.500",
        textDecoration: "no-underline",
      },
      ul: {
        marginLeft: "3rem",
        marginBottom: "1rem",
      },
      ol: {
        marginLeft: "3rem",
        marginBottom: "1rem",
      },
      li: {
        listStyleType: "list-disc",
        lineHeight: 1.5,
        paddingY: "0.25em",
      },
    }),
  },
});

export default theme;

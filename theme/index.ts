import { extendTheme, theme as defaultTheme } from "@chakra-ui/react";

import breakpoints from "./breakpoint";

import body from "./element/body";
import h2 from "./element/headings/h2";
import h3 from "./element/headings/h3";
import a from "./element/a";
import { ol, ul, li } from "./element/list";

import Link from "./component/link";

const theme = extendTheme({
  breakpoints,
  colors: {
    brand: {
      50: defaultTheme.colors.green[50],
      100: defaultTheme.colors.green[100],
      200: defaultTheme.colors.green[200],
      300: defaultTheme.colors.green[300],
      400: defaultTheme.colors.green[400],
      500: defaultTheme.colors.green[500],
      600: defaultTheme.colors.green[600],
      700: defaultTheme.colors.green[700],
      800: defaultTheme.colors.green[800],
      900: defaultTheme.colors.green[900],
    },
  },
  fonts: {
    body:
      "fot-tsukubrdgothic-std, -apple-system, BlinkMacSystemFont,Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,Helvetica Neue, sans-serif",
    heading:
      "fot-tsukubrdgothic-std, -apple-system, BlinkMacSystemFont,Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,Helvetica Neue, sans-serif",
  },
  components: {
    Link: Link,
  },
  styles: {
    global: {
      body,
      h2,
      h3,
      a,
      ul,
      ol,
      li,
    },
  },
});

export default theme;

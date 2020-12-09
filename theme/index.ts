import { extendTheme } from "@chakra-ui/react";

import body from "./element/body";
import h2 from "./element/headings/h2";
import a from "./element/a";
import { ol, ul, li } from "./element/list";

const theme = extendTheme({
  fonts: {
    body:
      "fot-tsukubrdgothic-std, -apple-system, BlinkMacSystemFont,Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,Helvetica Neue, sans-serif",
    heading:
      "fot-tsukubrdgothic-std, -apple-system, BlinkMacSystemFont,Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,Helvetica Neue, sans-serif",
  },
  styles: {
    global: {
      body,
      h2,
      a,
      ul,
      ol,
      li,
    },
  },
});

export default theme;

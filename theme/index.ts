import { extendTheme } from "@chakra-ui/react";

import body from "./element/body";
import h2 from "./element/headings/h2";
import a from "./element/a";
import { ol, ul, li } from "./element/list";

const theme = extendTheme({
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

import { Box, useColorMode } from '@chakra-ui/react';

type Props = {
  tag: string
}

const Tag: React.FC<Props> = ({tag}: Props) => {

  const { colorMode } = useColorMode();

  return <Box
          fontSize={{base: "0.5rem", md: "0.75rem"}}
          lineHeight="1rem"
          textColor={colorMode == "dark" ? "gray.600" : "gray.200"}
          border="1px"
          borderColor={colorMode == "dark" ? "gray.600" : "gray.200"}
          rounded="full"
          textDecoration="no-underline"
          marginRight={{base: 1, md: 2}}
          padding={{base: 1, md: 2}}
          _before={{content: "'#'"}}>
            {tag}
          </Box>
}

export default Tag;
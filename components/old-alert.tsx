import { Box, Text, useColorMode} from "@chakra-ui/react"

type Props = {
  pastYear: number
}

const OldAlert: React.VFC<Props> = ({ pastYear }: Props) => {
  const { colorMode } = useColorMode();
  return (
    <Box
      backgroundColor={colorMode == "light" ? "red.800" : "red.200"}
      border={4}
      borderStyle="solid"
      borderColor="red.500"
      rounded="xl"
      paddingX={4} >
      <Text>この記事は投稿から {pastYear} 年以上経過しています。<br />最新の情報は各種公式ドキュメント等をご覧下さい。</Text>
    </Box>
  )
}

export default OldAlert;
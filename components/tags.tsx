import { Flex } from  "@chakra-ui/react";

import Tag from "./tag";

type Props = {
  tags: string[]
}

const Tags: React.FC<Props> = ({tags}: Props) => (
  <Flex direction="row">
    {tags.map((tag) => <Tag tag={tag} key={tag}/>)}
  </Flex>
)

export default Tags;
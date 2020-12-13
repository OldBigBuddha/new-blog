import {Box, Link as ChakraLink} from "@chakra-ui/react";
import Post from "../interfaces/post"
import Tags from "./tags";

type Props = {
  post: Post
}

const PostItem: React.FC<Props> = ({post}: Props) => {
  return (
    <Box marginY={2}>
      <ChakraLink textColor="green.500" fontWeight="bold" href={`/post/${post.slug}`}>{post.title}</ChakraLink>
      {post.tags && (<Tags tags={post.tags} />)}
    </Box>
  )
}

export default PostItem;
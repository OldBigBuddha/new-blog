import {Box, Link} from "@chakra-ui/react";
import Post from "../interfaces/post"
import Tags from "./tags";

type Props = {
  post: Post
}

const PostItem: React.FC<Props> = ({post}: Props) => {
  return (
    <Box marginY={2}>
      <Link textColor="green.500" fontWeight="bold" href={`/posts/${post.slug}`}>{post.title}</Link>
      {post.tags && (<Tags tags={post.tags} />)}
    </Box>
  )
}

export default PostItem;
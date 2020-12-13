import { List, ListItem } from "@chakra-ui/react";

import Post from "../interfaces/post"
import PostItem from "./post-item"

type Props = {
  posts: Post[]
}

const PostList: React.FC<Props> = ({posts}: Props) => (
  <List>
    {posts.map((post) => (
      <ListItem listStyleType="none" key={post.slug}>
        <PostItem post={post} />
      </ListItem>
    ))}
  </List>
);

export default PostList;
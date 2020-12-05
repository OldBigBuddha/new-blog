import Post from "../interfaces/post"
import PostItem from "./post-item"

type Props = {
  posts: Post[]
}

const PostList: React.FC<Props> = ({posts}: Props) => (
  <ul>
    {posts.map((post) => (
      <li key={post.slug}>
        <PostItem post={post} />
      </li>
    ))}
  </ul>
);

export default PostList;
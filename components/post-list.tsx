import Post from "../interfaces/post"
import PostItem from "./post-item"

type Props = {
  posts: Post[]
}

const PostList: React.FC<Props> = ({posts}: Props) => (
  <ul>
    {posts.map((post) => (
      <li className="list-none mb-0 ml-0 py-0" key={post.slug}>
        <PostItem post={post} />
      </li>
    ))}
  </ul>
);

export default PostList;
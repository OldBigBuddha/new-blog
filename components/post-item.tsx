import Link from "next/link";
import Post from "../interfaces/post"
import Tags from "./tags";

type Props = {
  post: Post
}

const PostItem: React.FC<Props> = ({post}: Props) => {
  return (
    <div className="inline-block my-2 p-2">
      <Link href={`/posts/${post.slug}`}><a className="text-lg font-bold mb-2">{post.title}</a></Link>
      {post.tags && (
        <Tags tags={post.tags} />
      )}
    </div>
  )
}

export default PostItem;
import Link from "next/link";
import Post from "../interfaces/post"
import Tags from "./tags";

type Props = {
  post: Post
}

const PostItem: React.FC<Props> = ({post}: Props) => {
  return (
    <div className="inline-block p-2 md:my-2">
      <Link href={`/post/${post.slug}`}><a className="text-base font-bold mb-2 md:text-lg">{post.title}</a></Link>
      {post.tags && (
        <Tags tags={post.tags} />
      )}
    </div>
  )
}

export default PostItem;
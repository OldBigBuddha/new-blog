import Link from "next/link";
import Post from "../interfaces/post"
import Tags from "./tags";

type Props = {
  post: Post
}

const PostItem: React.FC<Props> = ({post}: Props) => {
  const realSlug = post.slug.replace(/\.md$/, "");
  const isTagsEmpty = post.tags
  return (
    <div>
      <Link href={`/posts/${realSlug}`}><a>{post.title}</a></Link>
      {/* {post.tags != [] && (
        <Tags tags={post.tags} />
      )} */}
    </div>
  )
}

export default PostItem;
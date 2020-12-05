import TagType from "./tag";

type PostType = {
  slug: string;
  title: string;
  date: string;
  tags: TagType[];
  content: string;
};

export default PostType;

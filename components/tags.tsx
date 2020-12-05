import TagType from "../interfaces/tag"
import Tag from "./tag";

type Props = {
  tags: TagType[]
}

const Tags: React.FC<Props> = ({tags}: Props) => (
  <div className="flex flex-row">
    {tags.map((tag) => <Tag tag={tag}/>)}
  </div>
)

export default Tags;
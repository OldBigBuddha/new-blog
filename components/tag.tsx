import TagType from "../interfaces/tag"

type Props = {
  tag: TagType
}

const Tag: React.FC<Props> = ({tag}: Props) => (
  <div className="text-sm text-gray-600 border border-gray-700 rounded-full mr-2">
    {tag.name}
  </div>
)

export default Tag;
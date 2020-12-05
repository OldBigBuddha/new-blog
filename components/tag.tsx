type Props = {
  tag: string
}

const Tag: React.FC<Props> = ({tag}: Props) => (
  <span className="text-xs text-gray-600 border border-gray-700 no-underline rounded-full mr-2 p-2">
    {tag}
  </span>
)

export default Tag;
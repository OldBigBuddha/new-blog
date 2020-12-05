import style from '../styles/tag.module.css'

type Props = {
  tag: string
}

const Tag: React.FC<Props> = ({tag}: Props) => (
  <span className={style.tag}>
    {tag}
  </span>
)

export default Tag;
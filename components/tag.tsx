import { Box } from '@chakra-ui/react';
import style from '../styles/tag.module.css'

type Props = {
  tag: string
}

const Tag: React.FC<Props> = ({tag}: Props) => (
  <Box className={style.tag}>
    {tag}
  </Box>
)

export default Tag;
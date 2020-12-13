import { format } from 'date-fns'
import { Box } from "@chakra-ui/react"

type Props = {
  createdAt: number
}

const CreatedAt = ({ createdAt }: Props) => {
  const date = new Date(createdAt)
  return <Box
            as="time"
            display="block"
            textAlign="center"
            marginBottom={12}
            dateTime={format(date, "yyyy-MM-dd")}>
            {format(date, "yyyy-MM-dd")}
        </Box>
}

export default CreatedAt

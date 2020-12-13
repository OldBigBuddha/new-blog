import { Avatar, Flex, Text } from "@chakra-ui/react"

const Profile: React.FC = () => {
  return (
    <Flex direction="column" justify="center" alignItems="center" marginTop={4}>
      <Avatar name="OldBigBuddha" src="/img/profile.png" size="2xl"/>
      <Text fontSize="3xl" className="text-2xl font-bold">OldBigBuddha</Text>
    </Flex>
  )
}

export default Profile

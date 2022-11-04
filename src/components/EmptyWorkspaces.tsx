import { Link } from 'react-router-dom';
import { Button, Flex } from '@chakra-ui/react';

const EmptyWorkspaces = (group: string) => {
  return (
    <>
      <Flex flexDirection="column" gap='2'>
      <p>{`It appears that you don't have any ${group}.`}</p>
      <p>Click below to get started now!</p>
      <Link to="/workspaces/new"><Button mt={"20px"}>Create Workspaces</Button></Link>
      </Flex>

    </>
  )
}

export default EmptyWorkspaces
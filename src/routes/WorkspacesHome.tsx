import { Button, Heading, Flex, Spacer } from '@chakra-ui/react';
import {Link} from 'react-router-dom'

const WorkspacesHome = () => {
  // TODO: Add Images to reduce whitespace.
  return (
    <>
      <Heading>Workspaces</Heading>
      <Flex flexDirection={"column"} gap='5' >
      <Link to="/workspaces/all"><Button mt={"20px"}>All Workspaces</Button></Link>
      <Spacer />
      <Link to="/workspaces/new"><Button>Create New Workspaces</Button></Link>
      </Flex>

    </>
  )
}

export default WorkspacesHome
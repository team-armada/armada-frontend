import {
  Button,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

import { useLoaderData, useNavigate } from 'react-router-dom';
import StudentPrivateRoute from '../components/PrivateRoutes/StudentPrivateRoute';
import { startService } from '../services/studentService';

const StudentPortal = () => {
  let data = useLoaderData();
  const navigate = useNavigate();

  const workspaces = data.workspaces;

  // TODO: Implement on-click for workspace connect button.

  const start = async (name: string) => {
    await startService(name);
    navigate('');
  };

  return (
    <StudentPrivateRoute>
      <Heading mb={'20px'}>Your Workspaces</Heading>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Cohort</Th>
              <Th>Course</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {workspaces.map(workspace => {
              return (
                <Tr key={workspace.uuid}>
                  <Td>{workspace.Course.cohort.name}</Td>
                  <Td>{workspace.Course.name}</Td>
                  <Td>
                    <Button
                      colorScheme="facebook"
                      mr={'10px'}
                      disabled={workspace.desiredCount === 1}
                      onClick={() => start(workspace.uuid)}
                    >
                      Resume
                    </Button>
                    <Button
                      as="a"
                      href={workspace.website}
                      colorScheme="telegram"
                      mr={'10px'}
                      disabled={workspace.desiredCount === 0}
                    >
                      Connect
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </StudentPrivateRoute>
  );
};

export default StudentPortal;

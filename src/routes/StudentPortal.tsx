import {
  Button,
  Flex,
  Heading,
  Input,
  Select,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import {
  deleteService,
  describeService,
  startService,
  stopService,
} from '../services/studentService';
import { useEffect, useState } from 'react';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';

import { ICohort } from './Cohorts';
import StudentPrivateRoute from '../components/PrivateRoutes/StudentPrivateRoute';
import { useAuth } from '../hooks/useAuth';

const StudentPortal = () => {
  const { username } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  let data = useLoaderData();
  data = data.filter(data => data.student === 'Jdguillaume');
  const [filteredData] = useState<ICohort[]>(data);

  const start = async (name: string) => {
    await startService(name);
    navigate(location);
  };

  return (
    <StudentPrivateRoute>
      <Heading mb={'20px'}>Your Workspaces</Heading>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Student Name</Th>
              <Th>Cohort</Th>
              <Th>Course</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredData.map(workspace => {
              const name = `${workspace.cohort}-${workspace.course}-${workspace.student}`;

              return (
                <Tr key={name}>
                  <Td>{workspace.student}</Td>
                  <Td>{workspace.cohort}</Td>
                  <Td>{workspace.course}</Td>
                  <Td>
                    <Button
                      colorScheme="facebook"
                      mr={'10px'}
                      disabled={workspace.desiredCount === 1}
                      onClick={() => start(name)}
                    >
                      Start
                    </Button>
                    <Button colorScheme="green">Connect</Button>
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

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
import {
  IUser,
  IUser_Cohort,
  ICourse,
  ICohort,
  IWorkspace,
  IUser_Course,
} from '../utils/types';

const StudentPortal = () => {
  let data = useLoaderData() as IUser & {
    user_cohort: (IUser_Cohort & {
      cohort: ICohort;
    })[];
    user_course: (IUser_Course & {
      course: ICourse & {
        cohort: ICohort;
      };
    })[];
    workspaces: (IWorkspace & {
      Course: ICourse & {
        cohort: ICohort;
      };
    })[];
  };
  const navigate = useNavigate();

  const workspaces = data.workspaces;

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
                      target="_blank"
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

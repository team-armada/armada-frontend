import { useLoaderData, useNavigate } from 'react-router-dom';

import {
  Heading,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import EmptyWorkspaces from '../components/EmptyWorkspaces';
import AdminPrivateRoute from '../components/PrivateRoutes/AdminPrivateRoute';

const Students = () => {
  const students = useLoaderData();
  const navigate = useNavigate();

  const studentTable = () => {
    return (
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Student Name</Th>
              <Th>More info?</Th>
            </Tr>
          </Thead>
          <Tbody>
            {students.map(student => {
              return (
                <Tr key={student.uuid}>
                  <Td onClick={e => navigate(`/student/${student.username}`)}>
                    {`${student.firstName} ${student.lastName}`}
                  </Td>
                  <Td>Active</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <AdminPrivateRoute>
      <Heading mb={'20px'}>All Students</Heading>
      {students.length ? studentTable() : EmptyWorkspaces('students')}
    </AdminPrivateRoute>
  );
};

export default Students;

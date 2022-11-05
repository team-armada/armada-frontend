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
import { extractRelevantData, filterDuplicates } from './Cohorts';
import EmptyWorkspaces from '../components/EmptyWorkspaces';
import AdminPrivateRoute from '../components/PrivateRoutes/AdminPrivateRoute';

const Students = () => {
  const data = useLoaderData();
  const navigate = useNavigate();

  // Retrieve All Students
  // TODO: Create new object that maps to student and all their courses.
  const relevantData = extractRelevantData(data);
  const students = filterDuplicates(relevantData, 'student');

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
                <Tr key={student}>
                  <Td onClick={e => navigate(`/students/${student}`)}>
                    {student}
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

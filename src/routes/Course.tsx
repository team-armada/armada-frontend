import { useLocation, useLoaderData, useNavigate } from 'react-router-dom';
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
import AdminPrivateRoute from '../components/PrivateRoutes/AdminPrivateRoute';

import { extractRelevantData, filterDuplicates } from './Cohorts';

const Course = () => {
  const location = useLocation();
  const data = useLoaderData();
  const navigate = useNavigate();

  const relevantData = extractRelevantData(data);

  const filteredData = relevantData.filter(item => {
    return (
      location.pathname.includes(item.cohort) &&
      location.pathname.includes(item.course)
    );
  });
  const students = filterDuplicates(filteredData, 'student');

  return (
    <AdminPrivateRoute>
      <Heading>Course Name: {filteredData[0].course}</Heading>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Student Name</Th>
              <Th>Workspace Status</Th>
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
    </AdminPrivateRoute>
  );
};

export default Course;

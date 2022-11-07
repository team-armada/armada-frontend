import {
  Heading,
  TableContainer,
  Table,
  Thead,
  Th,
  Tbody,
  Tr,
  Td,
} from '@chakra-ui/react';
import { useLoaderData, useNavigate, useLocation } from 'react-router-dom';
import AdminPrivateRoute from '../components/PrivateRoutes/AdminPrivateRoute';

//get list of courses from the cohort
const Cohort = () => {
  const data = useLoaderData();
  const navigate = useNavigate();

  const cohort = data.cohort;
  const courses = data.courses;

  return (
    <AdminPrivateRoute>
      <Heading>Cohort: {`${cohort.name}`}</Heading>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Course Name</Th>
              <Th>Course Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {courses.map(course => {
              return (
                <Tr key={course.id}>
                  <Td onClick={e => navigate(`/course/${course.id}`)}>
                    {course.name}
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

export default Cohort;

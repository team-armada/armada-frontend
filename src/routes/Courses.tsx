import { useLoaderData, useNavigate } from 'react-router-dom';
import AdminPrivateRoute from '../components/PrivateRoutes/AdminPrivateRoute';

import {
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';

import EmptyWorkspaces from '../components/EmptyWorkspaces';

const Courses = () => {
  const courses = useLoaderData();
  const navigate = useNavigate();

  const CourseTable = () => {
    return (
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Course Name</Th>
              <Th>Cohort</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {courses.map(course => {
              return (
                <Tr key={course.id}>
                  <Td onClick={e => navigate(`/course/${course.id}`)}>
                    {course.name}
                  </Td>
                  <Td onClick={e => navigate(`/cohort/${course.cohort.id}`)}>
                    {course.cohort.name}
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
      <Heading mb={'20px'}>All Courses</Heading>
      {courses.length ? CourseTable() : EmptyWorkspaces('courses')}
    </AdminPrivateRoute>
  );
};

export default Courses;

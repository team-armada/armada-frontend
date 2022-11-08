import { useLoaderData, useNavigate } from 'react-router-dom';
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
import AdminPrivateRoute from '../components/PrivateRoutes/AdminPrivateRoute';
import EmptyWorkspaces from '../components/EmptyWorkspaces';
import EmptyStudents from '../components/EmptyStudents';

const Course = () => {
  const data = useLoaderData();
  const navigate = useNavigate();

  const course = data.course;
  const students = data.students;

  const StudentsTable = () => {
    return (
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Student Name</Th>
            </Tr>
          </Thead>
          <Tbody>
            {students.map(student => {
              return (
                <Tr key={student.userId}>
                  <Td
                    onClick={e => navigate(`/student/${student.user.username}`)}
                  >
                    {`${student.user.firstName} ${student.user.lastName}`}
                  </Td>
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
      <Heading>Course Name: {course.name}</Heading>
      {students.length ? StudentsTable() : EmptyStudents('students')}
    </AdminPrivateRoute>
  );
};

export default Course;

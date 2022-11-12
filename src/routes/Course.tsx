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
import EmptyStudents from '../components/EmptyStudents';
import { ICourse, IUser, IUser_Course } from '../utils/types';

const Course = () => {
  const data = useLoaderData() as {
    course: ICourse;
    students: (IUser_Course & {
      user: IUser;
    })[];
  };
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
      {students.length ? StudentsTable() : EmptyStudents()}
    </AdminPrivateRoute>
  );
};

export default Course;

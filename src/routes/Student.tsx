import { useLoaderData, useNavigate } from 'react-router-dom';

import {
  Center,
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
import {
  ICohort,
  ICourse,
  IUser,
  IUser_Cohort,
  IUser_Course,
  IWorkspace,
} from '../utils/types';

const Student = () => {
  const data = useLoaderData() as IUser & {
    user_cohort: (IUser_Cohort & {
      cohort: ICohort;
    })[];
    user_course: (IUser_Course & {
      course: ICourse & {
        cohort: ICohort;
      };
    })[];
    workspaces: (IWorkspace & {
      course: ICourse & {
        cohort: ICohort;
      };
    })[];
  };

  const navigate = useNavigate();

  const student = data;
  const courses = data.user_course;
  const fullName = `${student.firstName} ${student.lastName}`;

  const StudentCourseTable = () => {
    return (
      <TableContainer mt={'20px'}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Course Name</Th>
              <Th>Cohort</Th>
            </Tr>
          </Thead>
          <Tbody>
            {courses.map(course => {
              return (
                <Tr key={`${course.course.id}`}>
                  <Td onClick={e => navigate(`/course/${course.course.id}`)}>
                    {course.course.name}
                  </Td>
                  <Td
                    onClick={e => navigate(`/cohort/${course.course.cohortId}`)}
                  >
                    {course.course.cohort.name}
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    );
  };

  const ZeroActive = (type: 'cohorts' | 'courses') => {
    return (
      <Center>
        <p>{`${fullName} is not currently active in any ${type}.`}</p>
      </Center>
    );
  };

  return (
    <AdminPrivateRoute>
      <Heading>{fullName}</Heading>
      {courses.length ? StudentCourseTable() : ZeroActive('courses')}
    </AdminPrivateRoute>
  );
};

export default Student;

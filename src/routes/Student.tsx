import { useLoaderData, useNavigate } from 'react-router-dom';

import {
  Center,
  Divider,
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

const Student = () => {
  const data = useLoaderData();
  const navigate = useNavigate();

  const student = data.user;
  const cohorts = data.cohorts;
  const courses = data.courses;
  const fullName = `${student.firstName} ${student.lastName}`;

  const cohortLookup = (cohortId: number): string => {
    const cohort = cohorts.find(cohort => cohortId === cohort.id);
    return cohort.name;
  };

  const StudentCohortTable = () => {
    return (
      <TableContainer mt={'20px'}>
        <Table>
          <Thead>
            <Tr>
              <Th>Cohort Name</Th>
              <Th>Cohort Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {cohorts.map(cohort => {
              return (
                <Tr key={cohort.id}>
                  <Td onClick={e => navigate(`/cohort/${cohort.id}`)}>
                    {cohort.name}
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

  const StudentCourseTable = () => {
    return (
      <TableContainer mt={'20px'}>
        <Table>
          <Thead>
            <Tr>
              <Th>Course Name</Th>
              <Th>Cohort</Th>
            </Tr>
          </Thead>
          <Tbody>
            {courses.map(course => {
              return (
                <Tr key={`${course.id}`}>
                  <Td onClick={e => navigate(`/course/${course.id}`)}>
                    {course.name}
                  </Td>
                  <Td onClick={e => navigate(`/cohort/${course.cohortId}`)}>
                    {cohortLookup(course.cohortId)}
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
      <Center>
        <Heading size="lg">Cohorts</Heading>
      </Center>
      {cohorts.length ? StudentCohortTable() : ZeroActive('cohorts')}
      <Divider mt="60px" mb="60px" />
      <Center>
        <Heading size="lg">Courses</Heading>
      </Center>
      {courses.length ? StudentCourseTable() : ZeroActive('courses')}
    </AdminPrivateRoute>
  );
};

export default Student;

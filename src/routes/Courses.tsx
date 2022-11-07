import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import AdminPrivateRoute from '../components/PrivateRoutes/AdminPrivateRoute';

import {
  Heading,
  Table,
  Thead,
  Button,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Select,
} from '@chakra-ui/react';

import EmptyWorkspaces from '../components/EmptyWorkspaces';
import { addCohortToCourse, createCourse } from '../services/courseService';
import { getAllStudentsInCohort } from '../services/cohortService';

const Courses = () => {
  const data = useLoaderData();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [courseName, setCourseName] = useState('');
  const [selectedCohort, setSelectedCohort] = useState(0);

  const courses = data.courses;
  const cohorts = data.cohorts;

  const handleCreateCourse = async () => {
    // Create a course
    const course = await createCourse(courseName, Number(selectedCohort));
    console.log(course);

    // Populate Course with students from selected cohort
    const students = await getAllStudentsInCohort(Number(selectedCohort));

    const relationshipArray = students.map(student => {
      return {
        userId: student.uuid,
        courseId: course.id,
      };
    });

    // Associate students with course.
    await addCohortToCourse(relationshipArray);

    onClose();
  };

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
      <Button onClick={onOpen}>Create a Course</Button>
      {courses.length ? CourseTable() : EmptyWorkspaces('courses')}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a Course</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Course Name</FormLabel>
              <Input
                onChange={e => setCourseName(e.target.value)}
                type="text"
              />
              <FormLabel>Cohort</FormLabel>
              <Select
                onChange={e => setSelectedCohort(e.target.value)}
                placeholder="Select cohort"
              >
                {cohorts.map(cohort => (
                  <option key={cohort.id} value={cohort.id}>
                    {cohort.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => handleCreateCourse()}
              colorScheme="blue"
              mr={3}
            >
              Create Course
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </AdminPrivateRoute>
  );
};

export default Courses;

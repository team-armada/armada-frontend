import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import AdminPrivateRoute from '../components/PrivateRoutes/AdminPrivateRoute';

import {
  Heading,
  Table,
  Thead,
  Button,
  Tbody,
  Text,
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
  useCheckbox,
  chakra,
  Box,
  Flex,
  Stack,
  useCheckboxGroup,
} from '@chakra-ui/react';

import {
  addCohortToCourse,
  addUsersToCourse,
  createCourse,
  deleteCourse,
  updateCourse,
} from '../services/courseService';
import {
  addUsersToCohort,
  getAllStudentsInCohort,
} from '../services/cohortService';
import { getStudentsInCohortNotInCourse } from '../services/userService';

const AddStudentsModal = ({ cohortId, courseId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [students, setStudents] = useState([]);
  // const { getLabelProps } = useCheckbox(props);

  const populateStudents = async () => {
    const populatedStudents = await getStudentsInCohortNotInCourse(
      cohortId,
      courseId
    );

    setStudents(populatedStudents);
    onOpen();
  };

  function CustomCheckbox(props) {
    const { state, getCheckboxProps, getInputProps, getLabelProps, htmlProps } =
      useCheckbox(props);

    return (
      <chakra.label
        display="flex"
        flexDirection="row"
        alignItems="center"
        gridColumnGap={2}
        maxW="40"
        bg="green.50"
        border="1px solid"
        borderColor="green.500"
        rounded="lg"
        px={3}
        py={1}
        cursor="pointer"
        {...htmlProps}
      >
        <input {...getInputProps()} hidden />
        <Flex
          alignItems="center"
          justifyContent="center"
          border="2px solid"
          borderColor="green.500"
          w={4}
          h={4}
          {...getCheckboxProps()}
        >
          {state.isChecked && <Box w={2} h={2} bg="green.500" />}
        </Flex>
        <Text color="gray.700" {...getLabelProps()}>
          {props.id}
        </Text>
      </chakra.label>
    );
  }

  let { value, getCheckboxProps } = useCheckboxGroup({
    defaultValue: [],
  });

  const handleAddStudents = async (
    courseId: number,
    studentIdArray: string[]
  ) => {
    const relationships = studentIdArray.map(item => {
      return {
        userId: item,
        courseId,
      };
    });

    await addUsersToCourse(relationships);
    setStudents([]);

    onClose();
  };

  const StudentCheckboxes = () => {
    return (
      <>
        {students.map(student => {
          return (
            <CustomCheckbox
              key={student.uuid}
              {...getCheckboxProps({
                value: student.uuid,
                id: `${student.firstName} ${student.lastName}`,
              })}
            />
          );
        })}
      </>
    );
  };

  const NoRemainingStudents = () => {
    return <p>There are no remaining students to add to this course.</p>;
  };

  return (
    <>
      <Button
        onClick={() => populateStudents()}
        colorScheme="facebook"
        mr={'10px'}
      >
        Add Students
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Students</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Student Names</FormLabel>
              <Stack>
                {students.length ? StudentCheckboxes() : NoRemainingStudents()}
              </Stack>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => handleAddStudents(cohortId, value)}
              colorScheme="blue"
              mr={3}
              disabled={value.length === 0}
            >
              Add Students
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const UpdateCourseModal = ({ courseId, courseName }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [newName, setNewName] = useState('');

  const handleUpdateName = async (courseId: number) => {
    const response = await updateCourse(courseId, newName);

    onClose();
    setNewName('');
    // Refresh Page
    navigate('');
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="telegram" mr={'10px'}>
        Update
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{`Update Course: ${courseName}`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Course Name</FormLabel>
              <Input onChange={e => setNewName(e.target.value)} type="text" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => handleUpdateName(courseId)}
              colorScheme="blue"
              mr={3}
              disabled={newName.length === 0}
            >
              Update Name
            </Button>
            <Button onClick={() => onClose()} colorScheme="blue" mr={3}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const DeleteCourseModal = ({ courseId, courseName }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleDeleteCourse = async (courseId: number) => {
    const response = await deleteCourse(courseId);

    onClose();

    // Refresh Page
    navigate('');
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="red" mr={'10px'}>
        Delete
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{`Delete Course: ${courseName}`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this course? All workspaces for this
            course will be deleted.
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => handleDeleteCourse(courseId)}
              colorScheme="red"
              mr={3}
            >
              Delete
            </Button>
            <Button onClick={() => onClose()} colorScheme="blue" mr={3}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

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

    setSelectedCohort(0);

    // Refresh Page
    navigate('');

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
              <Th>Actions</Th>
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
                  <Td>
                    <AddStudentsModal
                      cohortId={course.cohort.id}
                      courseId={course.id}
                    />
                    <UpdateCourseModal
                      courseName={course.name}
                      courseId={course.id}
                    />
                    <DeleteCourseModal
                      courseName={course.name}
                      courseId={course.id}
                    />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    );
  };

  const EmptyCourses = () => {
    return <p style={{ marginTop: '20px' }}>There are no active courses.</p>;
  };

  return (
    <AdminPrivateRoute>
      <Heading mb={'20px'}>All Courses</Heading>
      <Button onClick={onOpen}>Create a Course</Button>
      {courses.length ? CourseTable() : EmptyCourses()}
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

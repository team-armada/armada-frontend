import {
  Button,
  Flex,
  Heading,
  Input,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
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
  Checkbox,
  CheckboxGroup,
  Stack,
  useCheckbox,
  chakra,
  Text,
  useCheckboxGroup,
  Box,
  Link,
} from '@chakra-ui/react';
import {
  createStudentService,
  deleteService,
  describeService,
  startService,
  stopService,
} from '../services/studentService';
import { useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

import AdminPrivateRoute from '../components/PrivateRoutes/AdminPrivateRoute';
import {
  getAllCohorts,
  getAllCoursesForCohort,
} from '../services/cohortService';
import { getCourseStudentsWithoutWorkspaces } from '../services/userService';
import { makeLowerCase } from '../utils/stringManipulation';
import { ICohort, ICourse, IUser, IWorkspace } from '../utils/types';

const Workspaces = () => {
  const workspaces = useLoaderData() as (IWorkspace & {
    user: IUser;
    Course: ICourse & {
      cohort: ICohort;
    };
  })[];
  const navigate = useNavigate();
  const [cohorts, setCohorts] = useState<ICohort[]>([]);
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [students, setStudents] = useState<IUser[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<number>(0);
  const [selectedCohort, setSelectedCohort] = useState<number>(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const populateCohorts = async () => {
      const cohorts = await getAllCohorts();
      setCohorts(cohorts);
    };

    populateCohorts();
  }, []);

  function CustomCheckbox(props: any) {
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

  const handleCreateWorkspaces = async (students: string[]) => {
    const cohortName = cohorts.filter(
      cohort => cohort.id === Number(selectedCohort)
    )[0].name;

    const courseName = courses.filter(
      course => course.id === Number(selectedCourse)
    )[0].name;

    const lowerCohort = makeLowerCase(cohortName);
    const lowerCourse = makeLowerCase(courseName);
    const lowercaseStudents = students.map(student => {
      const result: {
        username: string;
        uuid: string;
      } = { username: '', uuid: '' };
      const studentValues = student.split('_');
      const username = studentValues[0];
      result.username = makeLowerCase(username);
      result.uuid = studentValues[1];
      return result;
    });

    await createStudentService(
      lowercaseStudents,
      lowerCohort,
      lowerCourse,
      'codeServerOnly',
      selectedCourse
    );

    onClose();

    setSelectedCohort(0);
    setSelectedCourse(0);
    setStudents([]);
    navigate('');
  };

  const handlePopulateCourses = async (cohortId: number) => {
    const result = await getAllCoursesForCohort(cohortId);
    setCourses(result.courses);
  };

  const handleSelectCohort = async (cohortId: number) => {
    setSelectedCohort(cohortId);
    handlePopulateCourses(cohortId);
  };

  const handlePopulateStudents = async (courseId: number) => {
    const students = await getCourseStudentsWithoutWorkspaces(courseId);
    setStudents(students);
  };

  const handleSelectCourse = async (courseId: number) => {
    setSelectedCourse(courseId);
    handlePopulateStudents(courseId);
  };

  const start = async (name: string) => {
    await startService(name);
    navigate('');
  };

  const stop = async (name: string) => {
    await stopService(name);
    navigate('');
  };

  const remove = async (name: string) => {
    await deleteService(name);
    navigate('');
  };

  const EmptyWorkspaces = () => {
    return <p style={{ marginTop: '20px' }}>There are no active workspaces.</p>;
  };

  const WorkspaceTable = () => {
    return (
      <>
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>Student Name</Th>
                <Th>Cohort</Th>
                <Th>Course</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {workspaces.map(workspace => {
                const student = workspace.user;
                const course = workspace.Course;
                const cohort = course.cohort;

                return (
                  <Tr key={workspace.uuid}>
                    <Td
                      onClick={() => navigate(`/student/${student.username}`)}
                    >{`${student.firstName} ${student.lastName}`}</Td>
                    <Td onClick={() => navigate(`/cohort/${cohort.id}`)}>
                      {cohort.name}
                    </Td>
                    <Td onClick={() => navigate(`/course/${course.id}`)}>
                      {course.name}
                    </Td>
                    <Td>
                      <Button
                        colorScheme="facebook"
                        mr={'10px'}
                        disabled={workspace.desiredCount === 1}
                        onClick={() => start(workspace.uuid)}
                      >
                        Start
                      </Button>
                      <Button
                        colorScheme="telegram"
                        mr={'10px'}
                        disabled={workspace.desiredCount === 0}
                        onClick={() => stop(workspace.uuid)}
                      >
                        Stop
                      </Button>
                      <Button
                        colorScheme="red"
                        mr={'10px'}
                        disabled={workspace.desiredCount === 1}
                        onClick={() => remove(workspace.uuid)}
                      >
                        Delete
                      </Button>
                      <Button
                        as="a"
                        colorScheme="green"
                        disabled={workspace.desiredCount === 0}
                        href={workspace.website}
                        target="_blank"
                      >
                        Preview
                      </Button>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </>
    );
  };

  const StudentCheckboxes = () => {
    return (
      <>
        {students.map(student => {
          return (
            <CustomCheckbox
              key={student.uuid}
              {...getCheckboxProps({
                value: `${student.username}_${student.uuid}`,
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
    <AdminPrivateRoute>
      <Heading mb={'20px'}>All Workspaces</Heading>
      <Button onClick={onOpen}>Create Workspaces</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Workspaces</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Cohort</FormLabel>
              <Select
                onChange={e => handleSelectCohort(Number(e.target.value))}
                placeholder="Select cohort"
              >
                {cohorts.map(cohort => (
                  <option key={cohort.id} value={cohort.id}>
                    {cohort.name}
                  </option>
                ))}
              </Select>
              <FormLabel>Course</FormLabel>
              <Select
                onChange={e => handleSelectCourse(Number(e.target.value))}
                placeholder="Select course"
              >
                {courses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </Select>
              <FormLabel>Student Names</FormLabel>
              <Stack>
                {students.length ? StudentCheckboxes() : NoRemainingStudents()}
              </Stack>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => handleCreateWorkspaces(value as string[])}
              colorScheme="blue"
              mr={3}
              disabled={students.length === 0}
            >
              Create Workspaces
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {workspaces.length ? WorkspaceTable() : EmptyWorkspaces()}
    </AdminPrivateRoute>
  );
};

export default Workspaces;

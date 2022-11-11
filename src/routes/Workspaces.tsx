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
import { ICohort } from './Cohorts';
import {
  getAllCohorts,
  getAllCoursesForCohort,
} from '../services/cohortService';
import { getCourseStudentsWithoutWorkspaces } from '../services/userService';
import { makeLowerCase } from '../utils/stringManipulation';

const AllWorkspaces = () => {
  const workspaces = useLoaderData();
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState<ICohort[]>(workspaces);
  const [filter, setFilter] = useState<string>('student-asc');
  const [search, setSearch] = useState('');
  const [cohorts, setCohorts] = useState([]);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(0);
  const [selectedCohort, setSelectedCohort] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const populateCohorts = async () => {
      const cohorts = await getAllCohorts();
      setCohorts(cohorts);
    };

    populateCohorts();
  }, []);

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

  const handleCreateWorkspaces = async (students: string[]) => {
    const cohortName = cohorts.find(
      cohort => cohort.id === Number(selectedCohort)
    ).name;
    const courseName = courses.find(
      course => course.id === Number(selectedCourse)
    ).name;

    const lowerCohort = makeLowerCase(cohortName);
    const lowerCourse = makeLowerCase(courseName);
    const lowercaseStudents = students.map(student => {
      const result = {};
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

  const handlePopulateStudents = async courseId => {
    const students = await getCourseStudentsWithoutWorkspaces(courseId);
    setStudents(students);
  };

  const handleSelectCourse = async (courseId: number) => {
    setSelectedCourse(courseId);
    handlePopulateStudents(courseId);
  };

  function updateData(filter: string) {
    if (
      filter !== 'student-asc' &&
      filter !== 'cohort-asc' &&
      filter !== 'course-asc' &&
      filter !== 'student-desc' &&
      filter !== 'cohort-desc' &&
      filter !== 'course-desc'
    ) {
      throw new Error('An invalid selection has been made');
    }

    const workspaces = filteredData;
    setFilter(filter);
    sortBy(workspaces, filter);
    setFilteredData(workspaces);
  }

  function filterBy(searchText: string) {
    searchText = searchText.toLowerCase();

    const searchResults = workspaces.filter(workspace => {
      return (
        workspace.cohort.toLowerCase().startsWith(searchText) ||
        workspace.student.toLowerCase().startsWith(searchText) ||
        workspace.course.toLowerCase().startsWith(searchText)
      );
    });

    if (searchText === '') {
      sortBy(workspaces, filter);
      setFilteredData(workspaces);
    } else {
      sortBy(searchResults, filter);
      setFilteredData(searchResults);
    }
  }

  useEffect(() => {
    updateData(filter);
  }, []);

  function sortBy(
    data: ICohort[],
    filter:
      | 'student-asc'
      | 'cohort-asc'
      | 'course-asc'
      | 'student-desc'
      | 'cohort-desc'
      | 'course-desc'
  ) {
    let options = filter.split('-');

    if (options.length !== 2) {
      throw new Error('Something went wrong.');
    }

    const property = options[0];
    const direction = options[1];

    if (
      property !== 'student' &&
      property !== 'cohort' &&
      property !== 'course'
    ) {
      throw new Error('Invalid selection made.');
    }

    if (direction !== 'asc' && direction !== 'desc') {
      throw new Error('Invalid direction provided.');
    }

    data.sort((a, b) => {
      if (options[1] === 'asc') {
        if (a[property] > b[property]) {
          return 1;
        } else if (b[property] > a[property]) {
          return -1;
        } else {
          return 0;
        }
      } else {
        if (a[property] > b[property]) {
          return -1;
        } else if (b[property] > a[property]) {
          return 1;
        } else {
          return 0;
        }
      }
    });
  }

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
        <Flex justifyContent={'right'} mb={'20px'}>
          <Select
            mr={'10px'}
            onChange={e => updateData(e.target.value)}
            w={'20%'}
            placeholder={'Click here to sort...'}
          >
            <option value="student-asc" defaultValue={'student-asc'}>
              Sort: Student Name (ASC)
            </option>
            <option value="student-desc">Sort: Student Name (DESC)</option>
            <option value="course-asc">Sort: Course (ASC)</option>
            <option value="course-desc">Sort: Course (DESC)</option>
            <option value="cohort-asc">Sort: Cohort (ASC)</option>
            <option value="cohort-desc">Sort: Cohort (DESC)</option>
          </Select>
          <Input
            onChange={e => filterBy(e.target.value)}
            mr={'20px'}
            w={'20%'}
            placeholder="Search here..."
          />
        </Flex>

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
                onChange={e => handleSelectCohort(e.target.value)}
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
                onChange={e => handleSelectCourse(e.target.value)}
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
              onClick={() => handleCreateWorkspaces(value)}
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

export default AllWorkspaces;

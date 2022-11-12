import { useLoaderData, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { createStudent, deleteStudent } from '../services/userService';

import {
  Heading,
  Table,
  Thead,
  Button,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Input,
  TableCaption,
  TableContainer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  useDisclosure,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';

import AdminPrivateRoute from '../components/PrivateRoutes/AdminPrivateRoute';
import {
  ICohort,
  ICourse,
  IUser,
  IUser_Cohort,
  IUser_Course,
} from '../utils/types';

const DeleteStudentModal = ({
  studentId,
  studentUsername,
  studentFullName,
}: {
  studentId: string;
  studentUsername: string;
  studentFullName: string;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleDeleteStudent = async (studentId: string) => {
    const response = await deleteStudent(studentId);

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
          <ModalHeader>{`Delete Student: ${studentFullName}`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this student? This will delete the
            student's workspaces and delete them from all associated cohorts and
            courses.
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => handleDeleteStudent(studentId)}
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

const Students = () => {
  const students = useLoaderData() as (IUser & {
    user_cohort: (IUser_Cohort & {
      cohort: ICohort;
    })[];
    user_course: (IUser_Course & {
      course: ICourse;
    })[];
  })[];
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  // NOTE: added async, await for testing
  const handleCreateStudent = async () => {
    //call on createStudent service
    await createStudent(username, firstName, lastName, email);

    onClose();

    // Reset Modal
    setUsername('');
    setFirstName('');
    setLastName('');
    setEmail('');

    // Refresh Page
    navigate('');
  };

  const EmptyStudents = () => {
    return (
      <p style={{ marginTop: '20px' }}>There are currently no students.</p>
    );
  };

  const studentTable = () => {
    return (
      <TableContainer>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Student Name</Th>
              <Th>Cohorts</Th>
              <Th>Courses</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {students.map(student => {
              return (
                <Tr key={student.uuid}>
                  <Td onClick={e => navigate(`/student/${student.username}`)}>
                    {`${student.firstName} ${student.lastName}`}
                  </Td>
                  <Td>
                    <List spacing={3}>
                      {student.user_cohort.map(cohort => (
                        <ListItem
                          onClick={e => navigate(`/cohort/${cohort.cohortId}`)}
                        >
                          {`${cohort.cohort.name}`}
                        </ListItem>
                      ))}
                    </List>
                  </Td>
                  <Td>
                    <List spacing={3}>
                      {student.user_course.map(course => (
                        <ListItem
                          onClick={e => navigate(`/course/${course.courseId}`)}
                        >
                          {`${course.course.name}`}
                        </ListItem>
                      ))}
                    </List>
                  </Td>
                  <Td>
                    <DeleteStudentModal
                      studentFullName={`${student.firstName} ${student.lastName}`}
                      studentUsername={student.username}
                      studentId={student.uuid}
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

  return (
    <AdminPrivateRoute>
      <Heading mb={'20px'}>All Students</Heading>
      <Button onClick={onOpen}>Create a Student</Button>

      {students.length ? studentTable() : EmptyStudents()}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a Student</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input onChange={e => setFirstName(e.target.value)} type="text" />
              <FormLabel>Last Name</FormLabel>
              <Input onChange={e => setLastName(e.target.value)} type="text" />
              <FormLabel>Username</FormLabel>
              <Input onChange={e => setUsername(e.target.value)} type="text" />
              <FormLabel>Email address</FormLabel>
              <Input onChange={e => setEmail(e.target.value)} type="email" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => handleCreateStudent()}
              colorScheme="blue"
              mr={3}
            >
              Create Student
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </AdminPrivateRoute>
  );
};

export default Students;

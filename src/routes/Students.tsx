import { useLoaderData, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { createStudent } from '../services/userService';

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
} from '@chakra-ui/react';
import EmptyWorkspaces from '../components/EmptyWorkspaces';
import AdminPrivateRoute from '../components/PrivateRoutes/AdminPrivateRoute';

const Students = () => {
  const students = useLoaderData();
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
  };

  const studentTable = () => {
    return (
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Student Name</Th>
              <Th>More info?</Th>
            </Tr>
          </Thead>
          <Tbody>
            {students.map(student => {
              return (
                <Tr key={student.uuid}>
                  <Td onClick={e => navigate(`/student/${student.username}`)}>
                    {`${student.firstName} ${student.lastName}`}
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
      <Heading mb={'20px'}>All Students</Heading>
      <Button onClick={onOpen}>Create a Student</Button>

      {students.length ? studentTable() : EmptyWorkspaces('students')}
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

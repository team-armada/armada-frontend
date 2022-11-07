import { useLoaderData, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import EmptyWorkspaces from '../components/EmptyWorkspaces';

import {
  Heading,
  Table,
  Button,
  Thead,
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
  Checkbox,
  CheckboxGroup,
  Stack,
  useCheckbox,
  Flex,
  chakra,
  Text,
  Box,
  useCheckboxGroup,
} from '@chakra-ui/react';

import AdminPrivateRoute from '../components/PrivateRoutes/AdminPrivateRoute';
import { addUsersToCohort, createCohort } from '../services/cohortService';
import { getStudentsNotInCohort } from '../services/userService';

export interface ICohort {
  cohort: string;
  course: string;
  student: string;
  desiredCount?: number;
  name?: string;
}

const CreateCohortModal = ({ setCohortName, cohortName }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCreateCohort = async () => {
    console.log('creating cohort');

    //create cohort service
    await createCohort(cohortName);

    // Close Modal
    onClose();

    // Reset Modal
    setCohortName('');
  };

  return (
    <>
      <Button onClick={onOpen}>Create a Cohort</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a Cohort</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Cohort Name</FormLabel>
              <Input
                onChange={e => setCohortName(e.target.value)}
                type="text"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => handleCreateCohort()}
              colorScheme="blue"
              mr={3}
            >
              Create Cohort
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const AddStudentsModal = ({ cohortId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [students, setStudents] = useState([]);
  // const { getLabelProps } = useCheckbox(props);

  const populateStudents = async () => {
    const populatedStudents = await getStudentsNotInCohort(cohortId);

    console.log(populatedStudents);
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

  const { value, getCheckboxProps } = useCheckboxGroup({
    defaultValue: [],
  });

  const handleAddStudents = async (
    cohortId: number,
    studentIdArray: string[]
  ) => {
    const relationships = studentIdArray.map(item => {
      return {
        userId: item,
        cohortId,
      };
    });

    console.log(relationships);

    await addUsersToCohort(relationships);
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
                {/* HOW TO GET CHECKBOX DATA?  --> useCheckbox */}
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
              </Stack>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => handleAddStudents(cohortId, value)}
              colorScheme="blue"
              mr={3}
            >
              Create Cohort
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

// TODO: Add Update Cohort Functionality.
// const UpdateCohortModal = () => {
//   return (

//   )
// };

// TODO: Add Delete Cohort Functionality.
// const DeleteCohortModal = () => {
//   return (

//   )
// }

const Cohorts = () => {
  const [cohortName, setCohortName] = useState('');
  const navigate = useNavigate();
  let cohorts = useLoaderData();
  // const { isOpen, onOpen, onClose } = useDisclosure();

  // TODO: Migrate modals to their own components.
  // You may have to create a new state to control the currently selected cohort to use the endpoint at getStudentsNotInCohort

  const CohortTable = () => {
    return (
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Cohort Name</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {cohorts.map(cohort => {
              return (
                <Tr key={cohort.id}>
                  <Td onClick={e => navigate(`/cohort/${cohort.id}`)}>
                    {cohort.name}
                  </Td>
                  <Td>
                    <AddStudentsModal cohortId={cohort.id} />
                    <Button colorScheme="telegram" mr={'10px'}>
                      Update
                    </Button>
                    <Button colorScheme="red" mr={'10px'}>
                      Delete
                    </Button>
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
      <Heading mb={'20px'}>All Cohorts</Heading>
      {cohorts.length ? CohortTable() : EmptyWorkspaces('cohorts')}

      <CreateCohortModal
        setCohortName={setCohortName}
        cohortName={cohortName}
      />

      {/* <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Students</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Student Name</FormLabel>
              <Input type="checkbox" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => handleAddStudents()}
              colorScheme="blue"
              mr={3}
            >
              Create Cohort
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}
    </AdminPrivateRoute>
  );
};

export default Cohorts;

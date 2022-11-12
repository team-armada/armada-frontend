import { useLoaderData, useNavigate } from 'react-router-dom';
import { useState } from 'react';

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
  Input,
  Stack,
  useCheckbox,
  Flex,
  chakra,
  Text,
  Box,
  useCheckboxGroup,
} from '@chakra-ui/react';

import AdminPrivateRoute from '../components/PrivateRoutes/AdminPrivateRoute';
import {
  addUsersToCohort,
  createCohort,
  deleteCohort,
  updateCohort,
} from '../services/cohortService';
import { getStudentsNotInCohort } from '../services/userService';
import { ICohort, IUser } from '../utils/types';

const CreateCohortModal = ({
  setCohortName,
  cohortName,
}: {
  cohortName: string;
  setCohortName: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCreateCohort = async () => {
    //create cohort service
    await createCohort(cohortName);

    // Close Modal
    onClose();

    // Reset Modal
    setCohortName('');

    // Refresh Page
    navigate('');
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

const AddStudentsModal = ({ cohortId }: { cohortId: number }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [students, setStudents] = useState<IUser[]>([]);

  const populateStudents = async () => {
    const populatedStudents = await getStudentsNotInCohort(cohortId);
    setStudents(populatedStudents);
    onOpen();
  };

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

    await addUsersToCohort(relationships);

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
    return <p>There are no remaining students to add.</p>;
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
              onClick={() => handleAddStudents(cohortId, value as string[])}
              colorScheme="blue"
              mr={3}
              disabled={students.length === 0}
            >
              Add Students
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const UpdateCohortModal = ({
  cohortId,
  cohortName,
}: {
  cohortId: number;
  cohortName: string;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [newName, setNewName] = useState('');

  const handleUpdateName = async (cohortId: number) => {
    const response = await updateCohort(cohortId, newName);

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
          <ModalHeader>{`Update Cohort: ${cohortName}`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Cohort Name</FormLabel>
              <Input onChange={e => setNewName(e.target.value)} type="text" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => handleUpdateName(cohortId)}
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

const DeleteCohortModal = ({
  cohortId,
  cohortName,
}: {
  cohortId: number;
  cohortName: string;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleDeleteCohort = async (cohortId: number) => {
    const response = await deleteCohort(cohortId);

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
          <ModalHeader>{`Delete Cohort: ${cohortName}`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this cohort? This will delete all
            associated courses.
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => handleDeleteCohort(cohortId)}
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

const Cohorts = () => {
  const [cohortName, setCohortName] = useState<string>('');
  const navigate = useNavigate();
  let cohorts = useLoaderData() as ICohort[];

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
                    <UpdateCohortModal
                      cohortId={cohort.id}
                      cohortName={cohort.name}
                    />
                    <DeleteCohortModal
                      cohortId={cohort.id}
                      cohortName={cohort.name}
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

  const EmptyCohorts = () => {
    return <p style={{ marginTop: '20px' }}>There are no active cohorts.</p>;
  };

  return (
    <AdminPrivateRoute>
      <Heading mb={'20px'}>All Cohorts</Heading>
      <CreateCohortModal
        setCohortName={setCohortName}
        cohortName={cohortName}
      />
      {cohorts.length ? CohortTable() : EmptyCohorts()}
    </AdminPrivateRoute>
  );
};

export default Cohorts;

import { 
  Heading,   
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer, } from '@chakra-ui/react'

const Course = () => {
  return <>
  <Heading>Course Name</Heading>
  <TableContainer>
  <Table>
    <Thead>
      <Th>Student Name</Th>
      <Th>Workspace Status</Th>
    </Thead>
    <Tbody>
      <Tr>
        <Td>Joe</Td>
        <Td>Active</Td>
      </Tr>
    </Tbody>
  </Table>
  </TableContainer>
  </>
};

export default Course;
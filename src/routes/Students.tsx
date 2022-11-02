import { useLoaderData, useNavigate } from "react-router-dom";

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
import { extractRelevantData, filterDuplicates } from "./Cohorts";

const Students = () => {
  const data = useLoaderData();
  const navigate = useNavigate();

  // Retrieve All Students
  // TODO: Create new object that maps to student and all their courses.
  const relevantData = extractRelevantData(data);
  const students = filterDuplicates(relevantData, 'student')

  return (
    <>
    <Heading>All Students</Heading>
    <TableContainer>
    <Table>
      <Thead>
        <Th>Student Name</Th>
        <Th>More info?</Th> 
      </Thead>
      <Tbody>
          {students.map(student => {
            return (
              <Tr>
              <Td onClick={(e) => navigate(`/students/${student}`)}>{student}</Td>
              <Td>Active</Td>
              </Tr>
            )
          })}
      </Tbody>
    </Table>
    </TableContainer>
  </>
  )
};

export default Students;

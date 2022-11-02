import { useLocation, useLoaderData, useNavigate } from 'react-router-dom';
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

  import { extractRelevantData, filterDuplicates } from './Cohorts';



const Course = () => {
  const location = useLocation()
  const data = useLoaderData()
  const navigate = useNavigate()

  const relevantData = extractRelevantData(data);

  const filteredData = relevantData.filter(item => {
      return location.pathname.includes(item.cohort) && location.pathname.includes(item.course)
    }
      )
  const students = filterDuplicates(filteredData, 'student')

  return <>
  <Heading>Course Name: {filteredData[0].course}</Heading>
  <TableContainer>
  <Table>
    <Thead>
      <Th>Student Name</Th>
      <Th>Workspace Status</Th>
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
};

export default Course;
import { Heading, TableContainer, Table, Thead, Th, Tbody, Tr, Td} from '@chakra-ui/react';
import { useLoaderData, useNavigate, useLocation} from 'react-router-dom';
import { extractRelevantData, filterDuplicates } from './Cohorts';


//get list of courses from the cohort
const Cohort = () => {
  const location = useLocation()
  const data = useLoaderData()
  const navigate = useNavigate()
  

  const relevantData = extractRelevantData(data);
  
  const filteredData = relevantData.filter(item => {
      return location.pathname.includes(item.cohort)
    }
      )
  const courses = filterDuplicates(filteredData, 'course')

  return (
    <>
    <Heading>Cohort: {filteredData[0].cohort}</Heading>
    <TableContainer>
    <Table>
      <Thead>
        <Tr>
          <Th>Course Name</Th>
          <Th>Course Status</Th>
        </Tr>
      </Thead>
      <Tbody>
          {courses.map(course => {
            return (
              <Tr key={course}>
                <Td onClick={(e) => navigate(`courses/${course}`)}>{course}</Td>
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

export default Cohort;

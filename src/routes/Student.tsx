import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

import { 
  Center,
  Divider,
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

const Student = () => {
  const data = useLoaderData()
  const navigate = useNavigate()
  const location = useLocation()

  const relevantData = extractRelevantData(data);

  // Cohorts
  const filteredCohorts = relevantData.filter(item => location.pathname.includes(item.student))
  const cohorts = filteredCohorts.map(item => item.cohort)

  // Courses
  const courses = relevantData.filter(item => location.pathname.includes(item.student)).map(item => item.course)

  return (
    <>
    <Heading>{filteredCohorts[0].student}</Heading>
    <TableContainer mt={"20px"}>
      <Center>
        <Heading size='lg'>Courses</Heading>
      </Center>
    <Table>
      <Thead>
        <Th>Course Name</Th>
        <Th>Course Status</Th>
      </Thead>
      <Tbody>
          {courses.map(course => {
            return (
              <Tr>
              <Td onClick={(e) => navigate(`courses/${course}`)}>{course}</Td>
              <Td>Active</Td>
              </Tr>
            )
          })}
      </Tbody>
    </Table>
    </TableContainer>
    <Divider mt='20px' mb="20px" />
    <TableContainer mt={"20px"}>
      <Center>
        <Heading size='lg'>Cohorts</Heading>
      </Center>
    <Table>
      <Thead>
        <Th>Cohort Name</Th>
        <Th>Cohort Status</Th>
      </Thead>
      <Tbody>
          {cohorts.map(cohort => {
            return (
              <Tr>
              <Td onClick={(e) => navigate(`cohorts/${cohort}`)}>{cohort}</Td>
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

export default Student;

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
  const cohorts = filteredCohorts.map(item =>  item.cohort)

  // Courses
  const filteredCourses = relevantData.filter(item => location.pathname.includes(item.student))
  const courses = filteredCourses.map(item => {
    return  {'course': item.course, 'cohort': item.cohort}
  })

  return (
    <>
    <Heading>{filteredCohorts[0].student}</Heading>
    <TableContainer mt={"20px"}>
      <Center>
        <Heading size='lg'>Courses</Heading>
      </Center>
    <Table>
      <Thead>
        <Tr>
          <Th>Course Name</Th>
          <Th>Cohort</Th>
        </Tr>
      </Thead>
      <Tbody>
          {courses.map(course => {
            return (
              <Tr key={`${course.cohort}-${course.course}`}>
                <Td onClick={(e) => navigate(`/cohorts/${course.cohort}/courses/${course.course}`)}>{course.course}</Td>
                <Td onClick={(e) => navigate(`/cohorts/${course.cohort}`)}>{course.cohort}</Td>
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
        <Tr>
          <Th>Cohort Name</Th>
          <Th>Cohort Status</Th>
        </Tr>
      </Thead>
      <Tbody>
          {cohorts.map(cohort => {
            return (
              <Tr key={cohort}>
                <Td onClick={(e) => navigate(`/cohorts/${cohort}`)}>{cohort}</Td>
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

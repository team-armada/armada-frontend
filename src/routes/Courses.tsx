import { useLoaderData, useNavigate } from "react-router-dom";
import compare from 'just-compare';

import { extractRelevantData, filterDuplicates, ICohort } from "./Cohorts";

import {
  Flex,
  Heading,
  Button,
  Select,
  Input,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer, } from '@chakra-ui/react'

  function removeDuplicateCourses(data: ICohort[]){
    const result: ICohort[] = [];
    const added: {course: string, cohort: string}[] = []

    for (let count = 0; count < data.length; count++){
      const current = data[count]

      if (!added.some(course => compare({course: course.course, cohort: course.cohort, student: current.student}, current))){
        result.push(current)
        added.push({course: current.course, cohort: current.cohort})
      }
    }

    return result
  }

const Courses = () => {
  const data = useLoaderData();
  const navigate = useNavigate();

  let relevantData = extractRelevantData(data);
  relevantData = removeDuplicateCourses(relevantData)

  return (
    <>
      <Heading mb={"20px"}>All Courses</Heading>
      <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>Course Name</Th>
            <Th>Cohort</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
            {relevantData.map(workspace => {
              return (
                <Tr >
                <Td onClick={(e) => navigate(`/cohorts/${workspace.cohort}/courses/${workspace.course}`)}>{workspace.course}</Td>
                <Td onClick={(e) => navigate(`/cohorts/${workspace.cohort}`)}>{workspace.cohort}</Td>
                <Td>Status</Td>
                </Tr>
              )
            })}
        </Tbody>
      </Table>
      </TableContainer>
    </>
  )
};

export default Courses;
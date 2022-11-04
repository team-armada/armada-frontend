import { useLoaderData, useNavigate } from "react-router-dom";
import EmptyWorkspaces from '../components/EmptyWorkspaces';

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


  export interface ICohort {
    cohort: string;
    course: string;
    student: string;
    desiredCount?: number;
    name?: string;
  }

  // Extracting the relevant data from the ARN.
export function extractRelevantData(array: string[]): ICohort[]{
  // Extract the cohort-course-student from the Service ARN.
  const regex = /(?<=\/)([a-zA-z0-9]+\-[a-zA-z0-9]+\-[a-zA-z0-9]+)/gi

  // Updating data to be only relevant data.
  const serviceNamesArray: (RegExpMatchArray | string)[]= array.map(serviceARN => serviceARN?.match(regex) ?? 'Not found')

  // Grab the first match.
  const stringServiceNamesArray: string[] = serviceNamesArray.map(service => service[0])

  // Splitting data into relevant parts.
  const separateNames = stringServiceNamesArray.map(service => service.split('-'))

  // Make into object.
  const serviceObjects = separateNames.map(service => {
    return {
      cohort: service[0],
      course: service[1],
      student: service[2]
    }
  })

  return serviceObjects;
}

export function filterDuplicates(data: ICohort[], property: 'cohort' | 'course' | 'student') : string[] {
  const result: string[] = [];

  const filteredData = data.map(data => data[property])

  filteredData.forEach(item => {
    if (!result.includes(item)){
      result.push(item)
    }
  })

  return result;
}

const Cohorts = () => {
  const navigate = useNavigate()
  let data = useLoaderData()

  const relevantData = extractRelevantData(data)
  const cohorts = filterDuplicates(relevantData, 'cohort')

  const CohortTable = () => {
    return (
      <TableContainer>
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
    )
  }

  return (
    <>
      <Heading mb={"20px"}>All Cohorts</Heading>
      {cohorts.length ? CohortTable() : EmptyWorkspaces('cohorts')}
    </>
  )

};

export default Cohorts;

import { useLoaderData } from "react-router-dom";

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

const Cohorts = () => {
  let data = useLoaderData()

  const allData = {}

  // Extracting the relevant data from the ARN.
  const regex = /(?<=\/)([a-zA-z0-9]+\-[a-zA-z0-9]+\-[a-zA-z0-9]+)/gi

  // Updating data to be only relevant data
  data = data.map(arn => arn.match(regex)[0])
  
  // Splitting data into relevant parts
  data = data.map(placeholder => placeholder.split('-'))

  data = data.map(data => {
    return data[0]
    }
  )

  console.log(data)

  return <>
  <Heading>Cohorts</Heading>
  <TableContainer>
  <Table>
    <Thead>
      <Th>Cohort Name</Th>
      <Th>Cohort Status</Th>
    </Thead>
    <Tbody>
      <Tr>
        <Td onClick={(e) => navigateToCohort(e.target.value)}>{data[0].cohort}</Td>
        <Td>Active</Td>
      </Tr>
    </Tbody>
  </Table>
  </TableContainer>
  </>     

};

export default Cohorts;

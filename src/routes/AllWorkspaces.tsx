import { useLoaderData, useNavigate } from "react-router-dom";
import {useEffect, useState} from 'react'
import { extractRelevantData, ICohort } from "./Cohorts";
import { deleteService, startService, stopService } from "../services/studentService";

import {
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

const AllWorkspaces = () => {
  const data = useLoaderData();
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState<ICohort[]>(extractRelevantData(data))
  const [filter, setFilter] = useState<string>('student')


  function updateData(filter: string){
    if (filter !== 'student' && filter !== 'cohort' && filter !== 'course'){
      throw new Error('An invalid selection has been made')
    }

    const workspaces = filteredData
    setFilter(filter)
    sortBy(workspaces, filter)
    setFilteredData(workspaces)
  }

  useEffect(() => {
    const workspaces = extractRelevantData(data)
    updateData(filter)
  }, [])


  function sortBy(data: ICohort[], property: 'student' | 'cohort' | 'course'){

    data.sort((a, b) => {
      if (a[property] > b[property] ){
      return 1
      } else if (b[property]  > a[property] ){
        return -1
      } else {
        return 0
      }
    })
  }

  const start = async (name: string) => {
    await startService(name)
    navigate('')
  }

  const stop = async (name: string) => {
    await stopService(name)
    navigate('')
  }

  const remove = async (name: string) => {
    await deleteService(name)
    navigate('')
  }
  
  return (
    <>
      <Heading>All Workspaces</Heading>
      <Select onChange={(e) => updateData(e.target.value)} w={"20%"} placeholder='Sort by '>
        <option value='student' selected>Student Name</option>
        <option value='course'>Course</option>
        <option value='cohort'>Cohort</option>
      </Select>
      {/* <Input>This is our search</Input> */}
      <TableContainer>
      <Table>
        <Thead>
          <Th>Student Name</Th>
          <Th>Cohort</Th>
          <Th>Course</Th>
          <Th>Actions</Th>
        </Thead>
        <Tbody>
            {filteredData.map(workspace => {
              const name = `${workspace.cohort}-${workspace.course}-${workspace.student}`

              return (
                <Tr>
                <Td>{workspace.student }</Td>
                <Td>{workspace.cohort}</Td>
                <Td>{workspace.course}</Td>
                <Td>
                  <Button colorScheme='facebook' mr={"10px"} onClick={() => start(name)}>Start</Button>
                  <Button colorScheme='telegram' mr={"10px"} onClick={() => stop(name)}>Stop</Button>
                  <Button colorScheme='red' mr={"10px"} onClick={() => remove(name)}>Delete</Button>
                  </Td>
                </Tr>
              )
            })}
        </Tbody>
      </Table>
      </TableContainer>
    </>
  )

}

export default AllWorkspaces;
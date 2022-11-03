import { useLoaderData, useNavigate } from "react-router-dom";
import {useEffect, useState} from 'react'
import { ICohort } from "./Cohorts";
import { deleteService, describeService, startService, stopService } from "../services/studentService";

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

const AllWorkspaces = () => {
  const data = useLoaderData();
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState<ICohort[]>(data)
  const [filter, setFilter] = useState<string>('student-asc')
  const [search, setSearch] = useState('')

  function updateData(filter: string){
    if (filter !== 'student-asc' && filter !== 'cohort-asc' && filter !== 'course-asc' && filter !== 'student-desc' && filter !== 'cohort-desc' && filter !== 'course-desc'){
      throw new Error('An invalid selection has been made')
    }

    const workspaces = filteredData
    setFilter(filter)
    sortBy(workspaces, filter)
    setFilteredData(workspaces)
  };

  function filterBy(searchText: string) {

    const baseData = data;
  
    searchText = searchText.toLowerCase();

    const searchResults = baseData.filter(workspace => {
      return workspace.cohort.toLowerCase().startsWith(searchText) || workspace.student.toLowerCase().startsWith(searchText) || workspace.course.toLowerCase().startsWith(searchText)
    });

    if (searchText === ''){
      sortBy(baseData, filter)
      setFilteredData(baseData)
    } else {
      sortBy(searchResults, filter)
      setFilteredData(searchResults);
    }
  }

  useEffect(() => {
    const workspaces = data
    updateData(filter)
  }, [])


  function sortBy(data: ICohort[], filter: 'student-asc' | 'cohort-asc' | 'course-asc' | 'student-desc' | 'cohort-desc' | 'course-desc'){
    let options = filter.split('-')
    
    if (options.length !== 2){
      throw new Error('Something went wrong.')
    }

    const property = options[0]
    const direction = options[1];
    
    if (property !== 'student' &&  property !== 'cohort' && property !== 'course'){
      throw new Error('Invalid selection made.')
    }
    
    if (direction !== 'asc' && direction !== 'desc'){
      throw new Error('Invalid direction provided.')
    }

    data.sort((a, b) => {
      
      if (options[1] === 'asc'){
          if (a[property] > b[property] ){
          return 1
          } else if (b[property]  > a[property] ){
            return -1
          } else {
            return 0
          }
      } else {
        if (a[property] > b[property] ){
          return -1
          } else if (b[property]  > a[property] ){
            return 1
          } else {
            return 0
          }
      }
      
    })
  }


  const start = async (name: string) => {
    await startService(name)
    navigate('/workspaces/all')
  }

  const stop = async (name: string) => {
    await stopService(name)
    navigate('/workspaces/all')
  }

  const remove = async (name: string) => {
    await deleteService(name)
    navigate('/workspaces/all')
  }
  
  return (
    <>
      <Heading mb={"20px"}>All Workspaces</Heading>
      <Flex  justifyContent={"right"} mb={"20px"} >
        <Select mr={"10px"} onChange={(e) => updateData(e.target.value)} w={"20%"} placeholder={'Click here to sort...'}>
          <option value='student-asc' defaultValue={'student-asc'} >Sort: Student Name (ASC)</option>
          <option value='student-desc'>Sort: Student Name (DESC)</option>
          <option value='course-asc'>Sort: Course (ASC)</option>
          <option value='course-desc'>Sort: Course (DESC)</option>
          <option value='cohort-asc'>Sort: Cohort (ASC)</option>
          <option value='cohort-desc'>Sort: Cohort (DESC)</option>
        </Select>
        <Input onChange={(e) => filterBy(e.target.value)}mr={"20px"} w={"20%"} placeholder="Search here..."/>
      </Flex>

      <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>Student Name</Th>
            <Th>Cohort</Th>
            <Th>Course</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
            {filteredData.map(workspace => {
              const name = `${workspace.cohort}-${workspace.course}-${workspace.student}`

              return (
                <Tr key={name}>
                <Td>{workspace.student }</Td>
                <Td>{workspace.cohort}</Td>
                <Td>{workspace.course}</Td>
                <Td>
                  <Button colorScheme='facebook' mr={"10px"} disabled={workspace.desiredCount === 1} onClick={() => start(name)}>Start</Button>
                  <Button colorScheme='telegram' mr={"10px"} disabled={workspace.desiredCount === 0} onClick={() => stop(name)}>Stop</Button>
                  <Button colorScheme='red' mr={"10px"} disabled={workspace.desiredCount === 1} onClick={() => remove(name)}>Delete</Button>
                  <Button colorScheme='green' >Preview</Button>
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
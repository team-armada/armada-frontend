import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { FormControl, FormLabel, Input, Button, Textarea, RadioGroup, Radio, Heading, Stack } from '@chakra-ui/react';
import { BASE_URL } from '../utils/constants';
import { createStudentService } from '../services/studentService';

const Workspaces = () => {
  const navigate = useNavigate()
  const baseTemplates = useLoaderData();
  const [courseName, setCourseName] = useState('')
  const [cohortName, setCohortName] = useState('')
  const [radioValue, setRadioValue] = useState('codeServerOnly')
  const [studentNames, setStudentNames] = useState('')

  const createWorkspace = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Course Name:', courseName)
    console.log('Cohort Name:', cohortName)
    console.log('Radio Value:', radioValue)
    console.log('Student Names:', studentNames)

    createStudentService(studentNames, cohortName, courseName, radioValue);

    //redirect to course page with workspaces that were just created
    navigate(`/${cohortName}/${courseName}`)
  }

  return (
    <>
     <Heading>New Workspace</Heading>
     <form action={`${BASE_URL}/workspaces}`} method="POST" onSubmit={(e) => createWorkspace(e)}>
    <FormControl>
      <FormLabel>Course Name</FormLabel>
      <Input type="text" onChange={(e) => setCourseName(e.target.value)} placeholder="Javascript 101" />
    </FormControl>
    <FormControl mt={6}>
      <FormLabel>Cohort Name</FormLabel>
      <Input onChange={(e) => setCohortName(e.target.value)} type="text" placeholder="Fall 2022" />
    </FormControl>
    <FormControl mt={6}>
      <FormLabel>Base Template</FormLabel>
      <RadioGroup onChange={setRadioValue} value={radioValue} >
      <Stack>
        <Radio size='md' value='codeServerOnly' defaultChecked>
          Code Server Only
        </Radio>
        <Radio size='md' value='codeServerPG' >
          Coder Server with Postgres
        </Radio>
        <Radio size='md' value='Other'>
          Other
        </Radio>
      </Stack>
      </RadioGroup>

    </FormControl>
    <FormControl mt={6}>
      <FormLabel>Student Names</FormLabel>
      <Textarea onChange={(e) => setStudentNames(e.target.value)} placeholder="John, Jane, ..." />
    </FormControl>
    <Button width="full" mt={4} type="submit">
      Create Workspaces
    </Button>
    </form>
    </>
  );
};

export default Workspaces;

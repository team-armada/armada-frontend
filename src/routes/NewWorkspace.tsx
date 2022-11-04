import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { FormControl, FormLabel, Input, Button, Textarea, RadioGroup, Radio, Heading, Stack } from '@chakra-ui/react';
import { BASE_URL } from '../utils/constants';
import { createStudentService } from '../services/studentService';
import { makeSentenceCase, makeUpperCase } from '../utils/stringManipulation';

const NewWorkspace = () => {
  const navigate = useNavigate()
  const baseTemplates = useLoaderData();
  const [courseName, setCourseName] = useState('')
  const [cohortName, setCohortName] = useState('')
  const [radioValue, setRadioValue] = useState('codeServerOnly')
  const [studentNames, setStudentNames] = useState('')

  const createWorkspace = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const lowerCohortName = makeSentenceCase(cohortName)
    const upperCourseName = makeUpperCase(courseName)

    const studentsWithoutSpacesArray = studentNames.split(',').map(name => makeSentenceCase(name))
    await createStudentService(studentsWithoutSpacesArray, lowerCohortName, upperCourseName, radioValue);

    //redirect to course page with workspaces that were just created
    navigate(`/cohorts/${lowerCohortName}/courses/${upperCourseName}`)
  }

  return (
    <>
     <Heading>New Workspace</Heading>
     <form action={`${BASE_URL}/workspaces}`} method="POST" onSubmit={(e) => createWorkspace(e)}>
    <FormControl>
      <FormLabel>Course Name</FormLabel>
      <Input type="text" onChange={(e) => setCourseName(e.target.value)} placeholder="JS101" />
    </FormControl>
    <FormControl mt={6}>
      <FormLabel>Cohort Name</FormLabel>
      <Input onChange={(e) => setCohortName(e.target.value)} type="text" placeholder="Fall2022" />
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

export default NewWorkspace;

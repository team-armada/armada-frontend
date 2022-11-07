import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import './index.css';
import './reset.css';

import { ProvideAuth } from './hooks/useAuth';

import { describeService, getAllServices } from './services/studentService';

import Root from './routes/Root';
import Home from './routes/Home';
import Error from './routes/Error';
import Cohort from './routes/Cohort';
import Cohorts from './routes/Cohorts';
import Courses from './routes/Courses';
import Course from './routes/Course';
import Student from './routes/Student';
import Students from './routes/Students';
import AllWorkspaces from './routes/Workspaces';
import Login from './routes/Login';
import NewWorkspace from './routes/NewWorkspace';
import StudentPortal from './routes/StudentPortal';
import { getAllStudents, getSpecificStudent } from './services/userService';
import {
  getAllCohorts,
  getAllCoursesForCohort,
} from './services/cohortService';
import {
  getAllCourses,
  getAllStudentsForCourse,
} from './services/courseService';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: <Error />,
      },
      {
        path: '/workspaces',
        element: <AllWorkspaces />,
        errorElement: <Error />,
        loader: async () => {
          const data = await getAllServices();
          return data;
        },
      },
      {
        path: '/cohorts',
        element: <Cohorts />,
        errorElement: <Error />,
        loader: async (): Promise<string[]> => {
          const data = await getAllCohorts();
          return data;
        },
      },
      {
        path: '/cohort/:cohortId',
        element: <Cohort />,
        errorElement: <Error />,
        loader: async ({ params }): Promise<string[]> => {
          const data = await getAllCoursesForCohort(params.cohortId);
          return data;
        },
      },
      {
        path: '/courses',
        element: <Courses />,
        errorElement: <Error />,
        loader: async () => {
          const data = await getAllCourses();
          return data;
        },
      },
      {
        path: '/course/:courseId',
        element: <Course />,
        errorElement: <Error />,
        loader: async ({ params }): Promise<string[]> => {
          const data = await getAllStudentsForCourse(params.courseId);
          return data;
        },
      },
      {
        path: '/students',
        element: <Students />,
        errorElement: <Error />,
        loader: async () => {
          const data = await getAllStudents();
          return data;
        },
      },
      {
        path: '/student/:username',
        element: <Student />,
        errorElement: <Error />,
        loader: async ({ params }) => {
          const data = await getSpecificStudent(params.username);
          return data;
        },
      },
      {
        path: '/studentPortal/:username',
        element: <StudentPortal />,
        errorElement: <Error />,
        loader: async ({ params }) => {
          const data = await getSpecificStudent(params.username);
          return data;
        },
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <ProvideAuth>
        <RouterProvider router={router} />
      </ProvideAuth>
    </ChakraProvider>
  </React.StrictMode>
);

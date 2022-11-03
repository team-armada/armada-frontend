import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'

import './reset.css';

import { getBaseTemplates } from './services/templateService';
import { getAllServices } from './services/studentService';
import { getAllWorkspaces } from './services/workspaceService';

import Root from './routes/Root';
import Home from './routes/Home';
import Error from './routes/Error';
import Cohort from './routes/Cohort';
import Cohorts from './routes/Cohorts';
import Courses from './routes/Courses'
import Templates from './routes/Templates';
import NewWorkspace from './routes/NewWorkspace';
import Course from './routes/Course';
import Student from './routes/Student'
import Students from './routes/Students'
import WorkspacesHome from './routes/WorkspacesHome';
import AllWorkspaces from './routes/AllWorkspaces';

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
        element: <WorkspacesHome />,
        errorElement: <Error />,
      },
      {
        path: '/workspaces/all',
        element: <AllWorkspaces />,
        errorElement: <Error />,
        loader: async (): Promise<string[]> => {
          const data = await getAllServices();
          return data.result.serviceArns;
        },
      },
      {
        path: '/workspaces/new',
        element: <NewWorkspace />,
        errorElement: <Error />,
        loader: async () => {
          const data = await getBaseTemplates();
          return data;
        },
      },
      {
        path: '/cohorts',
        element: <Cohorts />,
        errorElement: <Error />,
        loader: async (): Promise<string[]> => {
          const data = await getAllServices();
          return data.result.serviceArns;
        },
      },
      {
        path: '/cohorts/:cohortId',
        element: <Cohort />,
        errorElement: <Error />,
        loader: async (): Promise<string[]> => {
          const data = await getAllServices();
          return data.result.serviceArns;
        },
      },
      {
        path: '/cohorts/:cohortId/courses/:courseId',
        element: <Course />,
        errorElement: <Error />,
        loader: async () => {
          const data = await getAllServices();
          return data.result.serviceArns;
        },
      },
      {
        path: '/courses',
        element: <Courses />,
        errorElement: <Error />,
        loader: async () => {
          const data = await getAllServices();
          return data.result.serviceArns;
        },
      },
      {
        path: '/students',
        element: <Students />,
        errorElement: <Error />,
        loader: async () => {
          const data = await getAllServices();
          return data.result.serviceArns;
        },
      },
      {
        path: '/students/:student',
        element: <Student />,
        errorElement: <Error />,
        loader: async () => {
          const data = await getAllServices();
          return data.result.serviceArns;
        },
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);

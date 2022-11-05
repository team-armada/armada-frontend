import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import './index.css';
import './reset.css';

import { ProvideAuth } from './hooks/useAuth';

import { getBaseTemplates } from './services/templateService';
import { describeService, getAllServices } from './services/studentService';

import Root from './routes/Root';
import Home from './routes/Home';
import Error from './routes/Error';
import Cohort from './routes/Cohort';
import Cohorts, { extractRelevantData } from './routes/Cohorts';
import Courses from './routes/Courses';
import Templates from './routes/Templates';
import Course from './routes/Course';
import Student from './routes/Student';
import Students from './routes/Students';
import WorkspacesHome from './routes/WorkspacesHome';
import AllWorkspaces from './routes/AllWorkspaces';
import Login from './routes/Login';
import NewWorkspace from './routes/NewWorkspace';
import StudentPortal from './routes/StudentPortal';

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
          let data = await getAllServices();
          data = data.result.serviceArns;
          data = extractRelevantData(data);

          const promises = [];

          for (let count = 0; count < data.length; count++) {
            const current = data[count];
            const name = `${current.cohort}-${current.course}-${current.student}`;
            data[count].name = name;

            promises.push(describeService(name));
          }

          const counts = await Promise.all(promises);

          for (let countsCount = 0; countsCount < data.length; countsCount++) {
            data[countsCount].desiredCount = counts[countsCount];
          }

          return data;
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
      {
        path: '/studentPortal/:student',
        element: <StudentPortal />,
        errorElement: <Error />,
        loader: async (): Promise<string[]> => {
          let data = await getAllServices();
          data = data.result.serviceArns;
          data = extractRelevantData(data);
          const promises = [];

          for (let count = 0; count < data.length; count++) {
            const current = data[count];
            const name = `${current.cohort}-${current.course}-${current.student}`;
            data[count].name = name;

            promises.push(describeService(name));
          }

          const counts = await Promise.all(promises);

          for (let countsCount = 0; countsCount < data.length; countsCount++) {
            data[countsCount].desiredCount = counts[countsCount];
          }

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

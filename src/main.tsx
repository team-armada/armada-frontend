import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'

import './reset.css';
// import './index.css';

import { getBaseTemplates } from './services/templateService';
import { getAllServices } from './services/studentService';
import { getAllWorkspaces } from './services/workspaceService';

import Root from './routes/Root';
import Home from './routes/Home';
import Error from './routes/Error';
import Users from './routes/Users';
import Images from './routes/Images';
import Settings from './routes/Settings';
import Cohorts from './routes/Cohorts';
import Templates from './routes/Templates';
import NewTemplate from './routes/NewTemplate';
import Workspaces from './routes/Workspaces';
import Course from './routes/Course';

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
        path: '/templates',
        element: <Templates />,
        errorElement: <Error />,
        loader: async () => {
          const data = await getBaseTemplates();
          return data;
        },
      },
      {
        path: '/workspaces',
        element: <Workspaces />,
        errorElement: <Error />,
        loader: async () => {
          const data = await getBaseTemplates();
          return data;
        },
      },
      {
        path: '/course',
        element: <Course />,
        errorElement: <Error />,
        // loader: async () => {
        //   const data = await getBaseTemplates();
        //   return data;
        // },
      },
      {
        path: '/cohorts',
        element: <Cohorts />,
        errorElement: <Error />,
        loader: async () => {
          const data = await getAllServices();
          return data.result.serviceArns;
        },
      },
      {
        path: '/users',
        element: <Users />,
        errorElement: <Error />,
      },
      {
        path: '/settings',
        element: <Settings />,
        errorElement: <Error />,
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

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './reset.css';
import './index.css';

import { getWorkspaceTemplates } from './services/templateService';
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
          const data = await getWorkspaceTemplates();
          return data.result.taskDefinitionArns;
        },
      },
      {
        path: '/workspaces',
        element: <Workspaces />,
        errorElement: <Error />,
        loader: async (): Promise<string[]> => {
          const data = await getAllWorkspaces();
          return data;
        },
      },
      {
        path: '/templates/create-template',
        element: <NewTemplate />,
        errorElement: <Error />,
      },
      {
        path: '/images',
        element: <Images />,
        errorElement: <Error />,
      },
      {
        path: '/cohorts',
        element: <Cohorts />,
        errorElement: <Error />,
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
    <RouterProvider router={router} />
  </React.StrictMode>
);

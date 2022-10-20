import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root';
import Home from './routes/Home';
import Error from './routes/Error';
import Users from './routes/Users';
import Images from './routes/Images';
import Settings from './routes/Settings';
import './reset.css';
import './index.css';
import Cohorts from './routes/Cohorts';
import Templates from './routes/Templates';

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

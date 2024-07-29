
import Login from '@/pages/login'
import Designer from '@/pages/designer'
import Preview from '@/pages/preview'
import Layouts from '@/layouts'
import Project from '@/pages/project'
import Material from '@/pages/material'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login/>,
  },
  {
    path: '/designer',
    element: <Designer/>,
  },
  {
    path: '/preview',
    element:<Preview/>,
  },
  {
    path: '/',
    element: <Layouts/>,
    children: [
      {
        path: '/project',
        element: <Project/>,
      },
      {
        path: '/material',
        element: <Material/>,
      },
    ],
  },
])
export default router;

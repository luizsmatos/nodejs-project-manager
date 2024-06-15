import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'
import { AuthLayout } from './pages/_layouts/auth'
import { NotFound } from './pages/404'
import { Home } from './pages/app/home'
import { Tasks } from './pages/app/tasks'
import { Login } from './pages/auth/login'
import { Register } from './pages/auth/register'
import { Error } from './pages/error'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: '/', element: <Login /> },
      { path: '/register', element: <Register /> },
    ],
  },
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: '/boards', element: <Home /> },
      { path: '/boards/:projectId', element: <Tasks /> },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

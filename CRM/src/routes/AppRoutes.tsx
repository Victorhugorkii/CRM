import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Auth } from '@/features/auth'
import { MainLayout } from '@/layouts'
import { HomePage, NotFoundPage } from '@/pages'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Auth />,
  },
  {
    path: '/app',
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])

function AppRoutes() {
  return <RouterProvider router={router} />
}

export default AppRoutes

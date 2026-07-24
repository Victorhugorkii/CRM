import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Auth } from '@/features/auth'
import { RootLayout } from '@/layouts'
import { DashboardPage, ClientsPage, NotFoundPage } from '@/pages'

/**
 * AppRoutes
 * Configuração de rotas principais da aplicação
 * - / : Login (sem sidebar)
 * - /dashboard, /clientes, etc : Com RootLayout (sidebar fixa)
 */

const router = createBrowserRouter([
  {
    path: '/',
    element: <Auth />,
  },
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'clientes',
        element: <ClientsPage />,
      },
      {
        path: 'relatorios',
        element: <div className="min-h-screen bg-slate-950 px-6 py-8"><p className="text-white">Página de Relatórios - em desenvolvimento</p></div>,
      },
      {
        path: 'settings',
        element: <div className="min-h-screen bg-slate-950 px-6 py-8"><p className="text-white">Configurações - em desenvolvimento</p></div>,
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

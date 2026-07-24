import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Auth } from '@/features/auth'
import { DashboardPage, ClientsPage } from '@/pages'
import { RootLayout } from '@/layouts'
import { NotFound } from '@/components/common'
import PlaceholderPage from '@/components/common/PlaceholderPage'

/**
 * AppRoutes — mapa de rotas da aplicação.
 * / → autenticação (sem layout)
 * /* → shell autenticado (RootLayout) → páginas
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <Auth />,
  },
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { path: 'dashboard',  element: <DashboardPage /> },
      { path: 'clientes',   element: <ClientsPage /> },
      { path: 'relatorios', element: <PlaceholderPage title="Relatórios"    description="Análises e relatórios detalhados." /> },
      { path: 'settings',   element: <PlaceholderPage title="Configurações" description="Preferências e configurações da conta." /> },
      { path: '*',          element: <NotFound /> },
    ],
  },
])

export default function AppRoutes() {
  return <RouterProvider router={router} />
}

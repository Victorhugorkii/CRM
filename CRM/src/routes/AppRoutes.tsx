import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Auth } from '@/features/auth'
import { Dashboard } from '@/features/dashboard'
import { ClientManagement } from '@/features/clients'
import { RootLayout } from '@/layouts'
import NotFound from '@/components/common/NotFound'

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
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'clientes',
        element: <ClientManagement />,
      },
      {
        path: 'relatorios',
        element: <PlaceholderPage title="Relatórios" description="Análises e relatórios detalhados em breve." />,
      },
      {
        path: 'settings',
        element: <PlaceholderPage title="Configurações" description="Preferências e configurações da conta." />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
])

function PlaceholderPage({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex h-full min-h-[60vh] flex-col items-center justify-center gap-3 p-8 text-center">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <p className="text-sm text-zinc-500">{description}</p>
      <span className="mt-2 rounded-md border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-xs font-medium text-zinc-500">
        Em desenvolvimento
      </span>
    </div>
  )
}

export default function AppRoutes() {
  return <RouterProvider router={router} />
}

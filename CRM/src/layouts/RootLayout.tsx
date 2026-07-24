import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'

/**
 * RootLayout — estrutura do shell autenticado.
 * Responsabilidade: montar o grid (sidebar | coluna-direita).
 * Cores e estilos pertencem aos componentes filhos.
 */
export default function RootLayout() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto scrollbar-fine">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

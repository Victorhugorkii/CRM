import { Outlet } from 'react-router-dom'
import { Sidebar, Header } from '@/components/layout'

/**
 * RootLayout — layout autenticado principal
 * Sidebar ocupa espaço real (não overlay). Header fixo no topo do conteúdo.
 */
export default function RootLayout() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#09090b]">
      {/* Sidebar fixa à esquerda */}
      <Sidebar />

      {/* Coluna direita: header + conteúdo scrollável */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto scrollbar-fine">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

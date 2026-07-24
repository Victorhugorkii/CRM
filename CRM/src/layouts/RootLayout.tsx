import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/components/layout'

/**
 * RootLayout
 * Layout raiz que envolve toda a aplicação autenticada
 * Sidebar fica fixa na lateral esquerda, conteúdo à direita
 */
function RootLayout() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-950 text-slate-100">
      {/* Sidebar fixa na lateral */}
      <div className="w-72 shrink-0 border-r border-white/10">
        <Sidebar />
      </div>

      {/* Conteúdo principal */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayout

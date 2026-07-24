import { PanelLeftClose, PanelLeftOpen, Bell } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { useUIStore } from '@/store/uiStore'

const PAGE_TITLES: Record<string, string> = {
  '/dashboard':  'Dashboard',
  '/clientes':   'Clientes',
  '/relatorios': 'Relatórios',
  '/settings':   'Configurações',
}

/**
 * Header — barra superior do shell autenticado.
 * Responsabilidade: toggle da sidebar, título da página, ações globais.
 */
export function Header() {
  const { isSidebarOpen, toggleSidebar } = useUIStore()
  const { pathname } = useLocation()
  const title = PAGE_TITLES[pathname] ?? 'NeverX'

  return (
    <header className="flex h-[52px] shrink-0 items-center justify-between border-b border-zinc-800/80 bg-[#09090b] px-4">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          aria-label={isSidebarOpen ? 'Recolher menu' : 'Expandir menu'}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-zinc-200"
        >
          {isSidebarOpen
            ? <PanelLeftClose className="h-4 w-4" />
            : <PanelLeftOpen  className="h-4 w-4" />}
        </button>

        <div className="h-4 w-px bg-zinc-800" />

        <span className="text-sm font-semibold text-white">{title}</span>
      </div>

      <div className="flex items-center gap-1.5">
        <button className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-zinc-200">
          <Bell className="h-4 w-4" />
        </button>
        <div className="ml-1 flex h-7 w-7 items-center justify-center rounded-full bg-white text-[11px] font-semibold text-black">
          L
        </div>
      </div>
    </header>
  )
}

import { LayoutGrid, Users, BarChart3, Settings, LogOut, Command } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useUIStore } from '@/store/uiStore'

const NAV_ITEMS = [
  { label: 'Dashboard',     icon: LayoutGrid, to: '/dashboard' },
  { label: 'Clientes',      icon: Users,      to: '/clientes'  },
  { label: 'Relatórios',    icon: BarChart3,   to: '/relatorios' },
  { label: 'Configurações', icon: Settings,    to: '/settings'  },
]

/**
 * Sidebar — navegação lateral recolhível.
 * Responsabilidade: navegação + identidade visual do shell.
 * Estado (aberto/fechado) gerenciado pelo uiStore.
 */
export function Sidebar() {
  const navigate = useNavigate()
  const { isSidebarOpen } = useUIStore()

  return (
    <aside
      className={`flex h-full shrink-0 flex-col justify-between border-r border-zinc-800/80 bg-[#09090b] transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'w-56' : 'w-[60px]'
      }`}
    >
      {/* Topo: logo + navegação */}
      <div className="flex flex-col gap-5 py-5">
        <div className={`flex items-center px-4 ${isSidebarOpen ? 'gap-2.5' : 'justify-center'}`}>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-black shadow-sm">
            <Command className="h-[15px] w-[15px]" />
          </div>
          {isSidebarOpen && (
            <div className="overflow-hidden">
              <p className="text-sm font-semibold leading-none text-white">NeverX</p>
              <p className="mt-0.5 text-[11px] text-zinc-500">CRM</p>
            </div>
          )}
        </div>

        <div className="mx-3 h-px bg-zinc-800/60" />

        <nav className="flex flex-col gap-0.5 px-2">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              title={!isSidebarOpen ? item.label : undefined}
              className={({ isActive }) =>
                `flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isSidebarOpen ? 'gap-3' : 'justify-center'
                } ${
                  isActive
                    ? 'bg-white/[0.08] text-white'
                    : 'text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-white' : ''}`} />
                  {isSidebarOpen && <span className="truncate">{item.label}</span>}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Rodapé: logout */}
      <div className="px-2 pb-5">
        <div className="mx-1 mb-3 h-px bg-zinc-800/60" />
        <button
          onClick={() => navigate('/')}
          title={!isSidebarOpen ? 'Sair' : undefined}
          className={`flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-400 transition-all hover:bg-red-500/10 hover:text-red-400 ${
            isSidebarOpen ? 'gap-3' : 'justify-center'
          }`}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {isSidebarOpen && <span>Sair</span>}
        </button>
      </div>
    </aside>
  )
}

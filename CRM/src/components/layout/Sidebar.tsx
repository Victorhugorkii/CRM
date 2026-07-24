import { LayoutGrid, Users, BarChart3, Settings, LogOut } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'

/**
 * Sidebar
 * Navegação fixa na lateral esquerda
 * Profissional e responsiva
 */

const navigationItems = [
  { label: 'Dashboard', icon: LayoutGrid, to: '/dashboard' },
  { label: 'Clientes', icon: Users, to: '/clientes' },
  { label: 'Relatórios', icon: BarChart3, to: '/relatorios' },
  { label: 'Configurações', icon: Settings, to: '/settings' },
]

export default function Sidebar() {
  const navigate = useNavigate()

  return (
    <aside className="flex h-screen flex-col justify-between border-r border-white/10 bg-[#09090b] px-4 py-6">
      {/* Logo */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400">
            <BarChart3 className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white">NeverX CRM</h1>
            <p className="text-xs text-zinc-500">Sistema Comercial</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1">
          {navigationItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-white/10 text-white shadow-sm'
                    : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'
                }`
              }
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Logout Button */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-400 transition-all hover:bg-red-500/10 hover:text-red-400"
      >
        <LogOut className="h-4 w-4 shrink-0" />
        <span>Sair</span>
      </button>
    </aside>
  )
}

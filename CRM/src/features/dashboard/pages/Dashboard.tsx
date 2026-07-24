import { NavLink, Outlet } from 'react-router-dom'
import { BarChart3, BriefcaseBusiness, LayoutGrid, MessageSquareMore, Settings, Users } from 'lucide-react'

const navItems = [
  { label: 'Visão geral', icon: LayoutGrid, to: '/app' },
  { label: 'Leads', icon: BriefcaseBusiness, to: '/app/leads' },
  { label: 'Clientes', icon: Users, to: '/app/clientes' },
  { label: 'Mensagens', icon: MessageSquareMore, to: '/app/mensagens' },
  { label: 'Relatórios', icon: BarChart3, to: '/app/relatorios' },
  { label: 'Configurações', icon: Settings, to: '/app/configuracoes' },
]

function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-4 lg:flex-row lg:gap-4 lg:px-6 lg:py-6">
        <aside className="w-full shrink-0 rounded-[24px] border border-white/10 bg-slate-900/80 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.25)] lg:w-72 lg:p-5">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-slate-950">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">NeverX CRM</p>
              <p className="text-xs text-slate-400">Operação comercial</p>
            </div>
          </div>

          <nav className="mt-5 space-y-1.5">
            {navItems.map(({ label, icon: Icon, to }) => (
              <NavLink
                key={label}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm transition ${
                    isActive
                      ? 'bg-white text-slate-950 shadow-sm'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Resumo</p>
            <p className="mt-2 text-2xl font-semibold">+24%</p>
            <p className="mt-1 text-sm text-slate-400">Aumento de conversão este mês</p>
          </div>
        </aside>

        <div className="flex-1 rounded-[24px] border border-white/10 bg-slate-900/60 p-3 shadow-[0_20px_60px_rgba(0,0,0,0.25)] sm:p-5">
          <header className="mb-5 flex flex-col gap-3 rounded-[20px] border border-white/10 bg-slate-950/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-400">Dashboard comercial</p>
              <h2 className="text-xl font-semibold text-white">Bem-vindo de volta, Lucas</h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-sm text-slate-300">
                Q3 • 2026
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-semibold text-slate-950">
                L
              </div>
            </div>
          </header>

          <main className="min-h-[70vh]">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

export default MainLayout

import { DollarSign, Users, Activity, ArrowUpRight, ArrowDownRight, Plus, TrendingUp } from 'lucide-react'

/**
 * DashboardPage
 * Página principal do dashboard com KPIs e análises
 */

const STATS = [
  {
    title: 'Receita Total',
    value: 'R$ 124.500',
    change: '+14.5%',
    isPositive: true,
    icon: DollarSign,
  },
  {
    title: 'Novos Clientes',
    value: '342',
    change: '+5.2%',
    isPositive: true,
    icon: Users,
  },
  {
    title: 'Taxa de Conversão',
    value: '3.8%',
    change: '-1.1%',
    isPositive: false,
    icon: Activity,
  },
  {
    title: 'MRR (Recorrente)',
    value: 'R$ 42.100',
    change: '+22.4%',
    isPositive: true,
    icon: TrendingUp,
  },
]

const RECENT_ACTIVITY = [
  { id: 1, client: 'Acme Corp', amount: 'R$ 12.500', status: 'Fechado', time: 'Há 2 horas' },
  { id: 2, client: 'Stark Ind.', amount: 'R$ 8.900', status: 'Em negociação', time: 'Há 5 horas' },
  { id: 3, client: 'Wayne Ent.', amount: 'R$ 45.000', status: 'Revisão', time: 'Ontem' },
  { id: 4, client: 'Cyberdyne', amount: 'R$ 1.200', status: 'Perdido', time: 'Ontem' },
]

function StatusBadge({ status }: { status: string }) {
  let colorClass = 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'

  if (status === 'Fechado') colorClass = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
  if (status === 'Em negociação') colorClass = 'bg-amber-500/10 text-amber-400 border-amber-500/20'
  if (status === 'Perdido') colorClass = 'bg-red-500/10 text-red-400 border-red-500/20'
  if (status === 'Revisão') colorClass = 'bg-blue-500/10 text-blue-400 border-blue-500/20'

  return (
    <span className={`px-2 py-1 text-[10px] font-medium uppercase tracking-wider rounded-md border ${colorClass}`}>
      {status}
    </span>
  )
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-950 px-6 py-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">Visão Geral</h1>
            <p className="mt-1 text-sm text-zinc-400">Acompanhe suas métricas e pipelines em tempo real.</p>
          </div>

          <button className="flex h-9 w-fit items-center justify-center gap-2 rounded-lg bg-white px-4 text-sm font-medium text-black transition-colors hover:bg-zinc-200">
            <Plus className="h-4 w-4" />
            Novo Projeto
          </button>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.title}
                className="relative overflow-hidden rounded-xl border border-zinc-800/80 bg-[#09090b] p-5 shadow-sm"
              >
                <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-zinc-800/20 blur-2xl pointer-events-none" />

                <div className="relative z-10 flex items-start justify-between">
                  <span className="text-sm font-medium text-zinc-400">{stat.title}</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/80">
                    <Icon className="h-4 w-4 text-zinc-300" />
                  </div>
                </div>

                <div className="relative z-10 mt-4 flex items-baseline gap-2">
                  <h2 className="text-2xl font-semibold tracking-tight text-white">{stat.value}</h2>
                  <div className={`flex items-center text-xs font-medium ${stat.isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                    {stat.isPositive ? <ArrowUpRight className="mr-0.5 h-3 w-3" /> : <ArrowDownRight className="mr-0.5 h-3 w-3" />}
                    {stat.change}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Receita */}
          <div className="overflow-hidden rounded-xl border border-zinc-800/80 bg-[#09090b] p-6 shadow-sm lg:col-span-2">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-white">Receita Anual</h3>
                <p className="mt-1 text-xs text-zinc-500">Comparativo de faturamento mês a mês</p>
              </div>
            </div>

            <div className="flex h-40 items-end justify-between gap-2">
              {[40, 70, 45, 90, 65, 85, 120, 100, 80, 110, 95, 130].map((value, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm bg-gradient-to-t from-blue-500 to-blue-400 transition-all hover:opacity-80"
                  style={{ height: `${(value / 130) * 100}%` }}
                />
              ))}
            </div>
          </div>

          {/* Atividade Recente */}
          <div className="overflow-hidden rounded-xl border border-zinc-800/80 bg-[#09090b] p-6 shadow-sm">
            <h3 className="mb-4 text-base font-semibold text-white">Atividade Recente</h3>

            <div className="space-y-3">
              {RECENT_ACTIVITY.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between rounded-lg border border-zinc-800/50 bg-zinc-900/50 p-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{activity.client}</p>
                    <p className="text-xs text-zinc-400">{activity.amount}</p>
                  </div>
                  <div className="text-right">
                    <StatusBadge status={activity.status} />
                    <p className="mt-1 text-[10px] text-zinc-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pipeline */}
        <div className="overflow-hidden rounded-xl border border-zinc-800/80 bg-[#09090b] p-6 shadow-sm">
          <h3 className="mb-6 text-base font-semibold text-white">Pipeline de Vendas</h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            {[
              { label: 'Prospecção', count: 48 },
              { label: 'Qualificação', count: 32 },
              { label: 'Proposta', count: 18 },
              { label: 'Fechamento', count: 8 },
            ].map((stage) => (
              <div key={stage.label} className="rounded-lg bg-zinc-900/50 border border-zinc-800/50 p-4">
                <p className="text-xs text-zinc-400">{stage.label}</p>
                <p className="mt-2 text-2xl font-semibold text-white">{stage.count}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
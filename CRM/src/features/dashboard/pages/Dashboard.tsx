import { DollarSign, Users, Activity, ArrowUpRight, ArrowDownRight, Plus, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

// ==========================================
// DADOS
// ==========================================
const STATS = [
  { title: 'Receita Total',     value: 'R$ 124.500', change: '+14.5%', positive: true,  icon: DollarSign },
  { title: 'Novos Clientes',    value: '342',         change: '+5.2%',  positive: true,  icon: Users },
  { title: 'Taxa de Conversão', value: '3.8%',        change: '-1.1%',  positive: false, icon: Activity },
  { title: 'MRR Recorrente',    value: 'R$ 42.100',   change: '+22.4%', positive: true,  icon: TrendingUp },
]

const ACTIVITY = [
  { id: 1, client: 'Acme Corp',  amount: 'R$ 12.500', status: 'Fechado',        time: 'Há 2h' },
  { id: 2, client: 'Stark Ind.', amount: 'R$ 8.900',  status: 'Em negociação',  time: 'Há 5h' },
  { id: 3, client: 'Wayne Ent.', amount: 'R$ 45.000', status: 'Revisão',        time: 'Ontem' },
  { id: 4, client: 'Cyberdyne',  amount: 'R$ 1.200',  status: 'Perdido',        time: 'Ontem' },
]

const PIPELINE = [
  { label: 'Prospecção',   count: 48 },
  { label: 'Qualificação', count: 32 },
  { label: 'Proposta',     count: 18 },
  { label: 'Fechamento',   count: 8  },
]

const CHART = [40, 70, 45, 90, 65, 85, 120, 100, 80, 110, 95, 130]
const MONTHS = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']

// ==========================================
// SUB-COMPONENTES
// ==========================================
function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    'Fechado':       'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'Em negociação': 'bg-amber-500/10  text-amber-400  border-amber-500/20',
    'Revisão':       'bg-blue-500/10   text-blue-400   border-blue-500/20',
    'Perdido':       'bg-red-500/10    text-red-400    border-red-500/20',
  }
  const cls = map[status] ?? 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
  return (
    <span className={`rounded-md border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${cls}`}>
      {status}
    </span>
  )
}

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, delay, ease: [0.16, 1, 0.3, 1] },
})

// ==========================================
// DASHBOARD
// ==========================================
export default function Dashboard() {
  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-6 p-6 pb-10">

      {/* PAGE HEADER */}
      <motion.div {...fade(0)} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">Visão Geral</h1>
          <p className="mt-1 text-sm text-zinc-400">Acompanhe métricas e pipelines em tempo real.</p>
        </div>
        <button className="flex h-9 w-fit items-center gap-2 rounded-lg bg-white px-4 text-sm font-medium text-black transition-colors hover:bg-zinc-100">
          <Plus className="h-4 w-4" />
          Novo Projeto
        </button>
      </motion.div>

      {/* KPI GRID */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.title}
              {...fade(0.05 + i * 0.07)}
              className="relative overflow-hidden rounded-xl border border-zinc-800/80 bg-[#09090b] p-5 shadow-sm"
            >
              <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-zinc-800/20 blur-2xl" />
              <div className="relative z-10 flex items-start justify-between">
                <span className="text-sm font-medium text-zinc-400">{stat.title}</span>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/80">
                  <Icon className="h-4 w-4 text-zinc-300" />
                </div>
              </div>
              <div className="relative z-10 mt-4 flex items-baseline gap-2">
                <span className="text-2xl font-semibold tracking-tight text-white">{stat.value}</span>
                <span className={`flex items-center text-xs font-medium ${stat.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                  {stat.positive
                    ? <ArrowUpRight className="mr-0.5 h-3 w-3" />
                    : <ArrowDownRight className="mr-0.5 h-3 w-3" />}
                  {stat.change}
                </span>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* CHART + ACTIVITY */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* Bar Chart */}
        <motion.div {...fade(0.3)} className="lg:col-span-2 rounded-xl border border-zinc-800/80 bg-[#09090b] p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-white">Receita Anual</h3>
              <p className="mt-0.5 text-xs text-zinc-500">Faturamento mês a mês</p>
            </div>
          </div>
          <div className="flex h-[180px] items-end justify-between gap-1.5">
            {CHART.map((val, i) => (
              <div key={i} className="group flex w-full flex-col items-center gap-1.5">
                <div className="relative flex w-full items-end justify-center" style={{ height: 148 }}>
                  {/* Tooltip */}
                  <div className="pointer-events-none absolute -top-7 whitespace-nowrap rounded bg-zinc-800 px-2 py-1 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                    R$ {val}k
                  </div>
                  {/* Bar */}
                  <div
                    style={{ height: `${(val / 130) * 100}%` }}
                    className={`w-full max-w-[28px] rounded-t-sm transition-colors duration-200 ${
                      i === CHART.length - 1
                        ? 'bg-white'
                        : 'bg-zinc-800 group-hover:bg-zinc-600'
                    }`}
                  />
                </div>
                <span className="text-[10px] font-medium uppercase text-zinc-600">{MONTHS[i]}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div {...fade(0.38)} className="flex flex-col rounded-xl border border-zinc-800/80 bg-[#09090b] p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-base font-semibold text-white">Atividade Recente</h3>
            <button className="text-xs font-medium text-zinc-500 transition-colors hover:text-zinc-200">
              Ver tudo
            </button>
          </div>
          <div className="flex-1 space-y-3">
            {ACTIVITY.map((a) => (
              <div
                key={a.id}
                className="flex items-center justify-between rounded-lg border border-zinc-800/50 bg-zinc-900/40 px-3 py-2.5"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-zinc-200">{a.client}</p>
                  <p className="text-xs text-zinc-500">{a.time}</p>
                </div>
                <div className="ml-3 flex flex-col items-end gap-1">
                  <p className="text-sm font-semibold text-white">{a.amount}</p>
                  <StatusBadge status={a.status} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* PIPELINE */}
      <motion.div {...fade(0.45)} className="rounded-xl border border-zinc-800/80 bg-[#09090b] p-6 shadow-sm">
        <h3 className="mb-5 text-base font-semibold text-white">Pipeline de Vendas</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {PIPELINE.map((stage, i) => (
            <div
              key={stage.label}
              className="rounded-lg border border-zinc-800/60 bg-zinc-900/40 p-4"
            >
              <p className="text-xs font-medium text-zinc-500">{stage.label}</p>
              <p className="mt-2 text-2xl font-semibold text-white">{stage.count}</p>
              <div className="mt-3 h-1 w-full rounded-full bg-zinc-800">
                <div
                  className="h-1 rounded-full bg-zinc-400 transition-all"
                  style={{ width: `${(stage.count / 48) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

    </div>
  )
}

import { DollarSign, Users, Activity, ArrowUpRight, ArrowDownRight, Plus, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

// ==========================================
// 1. MOCK DE DADOS
// ==========================================
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

// Dados para um mini-gráfico em CSS
const CHART_DATA = [40, 70, 45, 90, 65, 85, 120, 100, 80, 110, 95, 130]

// ==========================================
// 2. COMPONENTES MENORES (BADGE & CARD)
// ==========================================
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

// ==========================================
// 3. COMPONENTE PRINCIPAL (DASHBOARD)
// ==========================================
export default function DashboardContent() {
  return (
    <div className="w-full max-w-[1200px] mx-auto space-y-6 pb-12">
      
      {/* HEADER */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">Visão Geral</h1>
          <p className="text-sm text-zinc-400 mt-1">Acompanhe suas métricas e pipelines em tempo real.</p>
        </div>
        
        <button className="flex items-center justify-center gap-2 rounded-lg bg-white h-9 px-4 text-sm font-medium text-black transition-colors hover:bg-zinc-200">
          <Plus className="h-4 w-4" />
          Novo Projeto
        </button>
      </motion.div>

      {/* KPI GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-[#09090b] border border-zinc-800/80 rounded-xl p-5 flex flex-col justify-between h-[120px] shadow-sm relative overflow-hidden"
            >
              {/* Efeito de brilho sutil no fundo */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-zinc-800/20 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-start justify-between relative z-10">
                <span className="text-sm font-medium text-zinc-400">{stat.title}</span>
                <div className="h-8 w-8 rounded-lg bg-zinc-900/80 border border-zinc-800 flex items-center justify-center">
                  <Icon className="h-4 w-4 text-zinc-300" />
                </div>
              </div>
              
              <div className="flex items-baseline gap-2 relative z-10">
                <h2 className="text-2xl font-semibold text-white tracking-tight">{stat.value}</h2>
                <div className={`flex items-center text-xs font-medium ${stat.isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                  {stat.isPositive ? <ArrowUpRight className="h-3 w-3 mr-0.5" /> : <ArrowDownRight className="h-3 w-3 mr-0.5" />}
                  {stat.change}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* GRÁFICO (Ocupa 2 colunas na lg) */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="lg:col-span-2 bg-[#09090b] border border-zinc-800/80 rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-base font-semibold text-white">Receita Anual</h3>
              <p className="text-xs text-zinc-500 mt-1">Comparativo de faturamento mês a mês</p>
            </div>
          </div>

          {/* Gráfico de Barras feito com Tailwind */}
          <div className="h-[200px] flex items-end justify-between gap-2 pt-4">
            {CHART_DATA.map((height, idx) => (
              <div key={idx} className="w-full flex flex-col items-center gap-2 group">
                <div className="w-full relative flex justify-center h-[160px] items-end">
                  {/* Tooltip sutil no hover */}
                  <div className="absolute -top-8 bg-zinc-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    R$ {height},000
                  </div>
                  {/* Barra */}
                  <div 
                    style={{ height: `${(height / 130) * 100}%` }} 
                    className="w-full max-w-[32px] bg-zinc-800 group-hover:bg-zinc-600 rounded-t-sm transition-colors duration-300 relative overflow-hidden"
                  >
                    {/* Detalhe visual na barra principal */}
                    {idx === CHART_DATA.length - 1 && (
                      <div className="absolute inset-0 bg-white" />
                    )}
                  </div>
                </div>
                <span className="text-[10px] font-medium text-zinc-500 uppercase">
                  {['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'][idx]}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ATIVIDADE RECENTE (Ocupa 1 coluna na lg) */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="bg-[#09090b] border border-zinc-800/80 rounded-xl p-6 shadow-sm flex flex-col"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-semibold text-white">Atividade Recente</h3>
            <button className="text-xs font-medium text-zinc-400 hover:text-white transition-colors">
              Ver tudo
            </button>
          </div>

          <div className="flex-1 space-y-4">
            {RECENT_ACTIVITY.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                    <Users className="h-4 w-4 text-zinc-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-200">{activity.client}</p>
                    <p className="text-[11px] text-zinc-500 mt-0.5">{activity.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-white">{activity.amount}</p>
                  <div className="mt-1">
                    <StatusBadge status={activity.status} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

    </div>
  )
}
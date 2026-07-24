import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { Badge } from '@/components/ui'

interface StatCardProps {
  label: string
  value: string
  change: string
  positive?: boolean
  icon?: React.ReactNode
}

function StatCard({ label, value, change, positive = true, icon }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{value}</p>
        </div>
        {icon ? <div className="rounded-xl bg-slate-100 p-2 text-slate-600">{icon}</div> : null}
      </div>
      <div className="mt-4 flex items-center gap-2">
        <Badge variant={positive ? 'success' : 'secondary'}>
          {positive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
          {change}
        </Badge>
        <span className="text-sm text-slate-500">vs. mês anterior</span>
      </div>
    </div>
  )
}

export default StatCard

import { ArrowRight, BarChart3, CircleDollarSign, Users } from 'lucide-react'
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { StatCard } from '@/components/common'

function HomePage() {
  return (
    <section className="space-y-6">
      <div className="rounded-[28px] border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8 text-white shadow-[0_24px_80px_rgba(15,23,42,0.2)]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Badge variant="secondary" className="border-white/10 bg-white/10 text-slate-200">
              CRM SaaS • visão geral
            </Badge>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Operação comercial mais clara, rápida e escalável.
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
              Centralize pipeline, oportunidades, atividades e saúde do negócio em um painel premium pensado para crescimento.
            </p>
          </div>
          <Button variant="secondary" className="bg-white text-slate-950 hover:bg-slate-100">
            Ver relatório <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Receita mensal" value="R$ 184k" change="+18.2%" icon={<CircleDollarSign className="h-5 w-5" />} />
        <StatCard label="Oportunidades ativas" value="248" change="+12.4%" icon={<BarChart3 className="h-5 w-5" />} />
        <StatCard label="Clientes felizes" value="1.2k" change="+8.1%" icon={<Users className="h-5 w-5" />} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <Card>
          <CardHeader>
            <CardTitle>Fluxo de vendas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ['Lead qualificado', '64'],
                ['Propostas', '28'],
                ['Fechadas', '12'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">{label}</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-950">{value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Próximas ações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {['Revisar propostas de Q3', 'Atualizar follow-up de 14 leads', 'Consolidar relatório executivo'].map((item) => (
              <div key={item} className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700">
                <span>{item}</span>
                <span className="text-slate-400">Hoje</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default HomePage

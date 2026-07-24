import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { Users, Mail, Phone, Search, Plus } from 'lucide-react'

const clients = [
  { id: 1, name: 'Ana Pereira', company: 'Northwind', email: 'ana@northwind.com', phone: '(11) 99999-1111', status: 'Ativo' },
  { id: 2, name: 'Bruno Costa', company: 'BluePeak', email: 'bruno@bluepeak.com', phone: '(11) 98888-2222', status: 'Ativo' },
  { id: 3, name: 'Carla Mendes', company: 'Orbit Labs', email: 'carla@orbitlabs.com', phone: '(11) 97777-3333', status: 'Ativo' },
  { id: 4, name: 'Diego Silva', company: 'TechFlow', email: 'diego@techflow.com', phone: '(11) 96666-4444', status: 'Inativo' },
]

/**
 * ClientsPage
 * Página de gestão de clientes
 */
function ClientsPage() {
  return (
    <div className="min-h-screen bg-slate-950 px-6 py-8">
      <section className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-400">Gerenciamento</p>
            <h1 className="mt-1 text-3xl font-semibold text-white">Gestão de clientes</h1>
          </div>
          <button className="flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-100">
            <Plus className="h-4 w-4" />
            Novo cliente
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-2.5 text-slate-400 transition hover:border-white/20">
          <Search className="h-4 w-4" />
          <input
            type="text"
            placeholder="Buscar cliente por nome ou empresa..."
            className="w-full bg-transparent text-sm outline-none placeholder-slate-500 text-white"
          />
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Users className="h-4 w-4" />
                Clientes totais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold text-slate-950">128</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Mail className="h-4 w-4" />
                Contatos hoje
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold text-slate-950">24</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Phone className="h-4 w-4" />
                Taxa de retenção
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold text-slate-950">91%</p>
            </CardContent>
          </Card>
        </div>

        {/* Clients Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {clients.map((client) => (
                <div
                  key={client.id}
                  className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition hover:bg-slate-100 md:flex-row md:items-center md:justify-between"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-slate-950">{client.name}</p>
                    <p className="text-sm text-slate-500">{client.company}</p>
                  </div>
                  <div className="flex flex-col gap-1 text-sm text-slate-600 md:text-right">
                    <p>{client.email}</p>
                    <p>{client.phone}</p>
                  </div>
                  <div className={`rounded-full px-3 py-1 text-xs font-medium ${client.status === 'Ativo' ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-700'}`}>
                    {client.status}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

export default ClientsPage

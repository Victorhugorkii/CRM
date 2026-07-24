import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { Users, Mail, Phone, Search } from 'lucide-react'

const clients = [
  { name: 'Ana Pereira', company: 'Northwind', email: 'ana@northwind.com', phone: '(11) 99999-1111' },
  { name: 'Bruno Costa', company: 'BluePeak', email: 'bruno@bluepeak.com', phone: '(11) 98888-2222' },
  { name: 'Carla Mendes', company: 'Orbit Labs', email: 'carla@orbitlabs.com', phone: '(11) 97777-3333' },
]

function ClientManagement() {
  return (
    <section className="space-y-6">
      <div className="rounded-[24px] border border-slate-200 bg-white p-6 text-slate-900 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Gestão de cliente</p>
            <h1 className="mt-1 text-2xl font-semibold">Centralize contatos, status e próximos passos</h1>
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
            <Search className="h-4 w-4" />
            Buscar cliente
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Users className="h-4 w-4" />
              Clientes ativos
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
              Retenção
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-slate-950">91%</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de clientes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {clients.map((client) => (
            <div key={client.name} className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-semibold text-slate-950">{client.name}</p>
                <p className="text-sm text-slate-500">{client.company}</p>
              </div>
              <div className="text-sm text-slate-600">
                <p>{client.email}</p>
                <p>{client.phone}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  )
}

export default ClientManagement

import { useState } from 'react'
import { Users, Mail, Phone, Search, Plus } from 'lucide-react'
import { motion } from 'framer-motion'

// ==========================================
// DADOS
// ==========================================
const CLIENTS = [
  { id: 1, name: 'Ana Pereira',   company: 'Northwind',  email: 'ana@northwind.com',    phone: '(11) 99999-1111', status: 'Ativo'   },
  { id: 2, name: 'Bruno Costa',   company: 'BluePeak',   email: 'bruno@bluepeak.com',   phone: '(11) 98888-2222', status: 'Ativo'   },
  { id: 3, name: 'Carla Mendes',  company: 'Orbit Labs', email: 'carla@orbitlabs.com',  phone: '(11) 97777-3333', status: 'Ativo'   },
  { id: 4, name: 'Diego Silva',   company: 'TechFlow',   email: 'diego@techflow.com',   phone: '(11) 96666-4444', status: 'Inativo' },
]

const STATS = [
  { label: 'Clientes totais',   value: '128', icon: Users },
  { label: 'Contatos hoje',     value: '24',  icon: Mail  },
  { label: 'Taxa de retenção',  value: '91%', icon: Phone },
]

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, delay, ease: [0.16, 1, 0.3, 1] },
})

// ==========================================
// CLIENTES
// ==========================================
export default function ClientManagement() {
  const [query, setQuery] = useState('')

  const filtered = CLIENTS.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.company.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-6 p-6 pb-10">

      {/* PAGE HEADER */}
      <motion.div {...fade(0)} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">Gestão de Clientes</h1>
          <p className="mt-1 text-sm text-zinc-400">Centralize contatos, status e próximos passos.</p>
        </div>
        <button className="flex h-9 w-fit items-center gap-2 rounded-lg bg-white px-4 text-sm font-medium text-black transition-colors hover:bg-zinc-100">
          <Plus className="h-4 w-4" />
          Novo Cliente
        </button>
      </motion.div>

      {/* STATS */}
      <motion.div {...fade(0.07)} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {STATS.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="flex items-center gap-4 rounded-xl border border-zinc-800/80 bg-[#09090b] p-5 shadow-sm"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/80">
                <Icon className="h-4 w-4 text-zinc-300" />
              </div>
              <div>
                <p className="text-xs font-medium text-zinc-500">{stat.label}</p>
                <p className="mt-0.5 text-2xl font-semibold text-white">{stat.value}</p>
              </div>
            </div>
          )
        })}
      </motion.div>

      {/* SEARCH */}
      <motion.div
        {...fade(0.14)}
        className="flex items-center gap-2.5 rounded-lg border border-zinc-800/80 bg-[#09090b] px-4 py-2.5 transition-colors focus-within:border-zinc-700"
      >
        <Search className="h-4 w-4 shrink-0 text-zinc-500" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nome ou empresa..."
          className="flex-1 bg-transparent text-sm text-zinc-100 placeholder-zinc-600 outline-none"
        />
      </motion.div>

      {/* CLIENT LIST */}
      <motion.div {...fade(0.2)} className="rounded-xl border border-zinc-800/80 bg-[#09090b] shadow-sm">
        <div className="flex items-center justify-between border-b border-zinc-800/60 px-6 py-4">
          <h3 className="text-base font-semibold text-white">Lista de Clientes</h3>
          <span className="text-xs text-zinc-500">{filtered.length} resultado{filtered.length !== 1 ? 's' : ''}</span>
        </div>

        <div className="divide-y divide-zinc-800/50">
          {filtered.length === 0 && (
            <p className="px-6 py-8 text-center text-sm text-zinc-500">Nenhum cliente encontrado.</p>
          )}
          {filtered.map((client) => (
            <div
              key={client.id}
              className="flex flex-col gap-3 px-6 py-4 transition-colors hover:bg-white/[0.02] md:flex-row md:items-center md:justify-between"
            >
              {/* Avatar + Info */}
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-sm font-semibold text-zinc-300">
                  {client.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-100">{client.name}</p>
                  <p className="text-xs text-zinc-500">{client.company}</p>
                </div>
              </div>

              {/* Contact */}
              <div className="flex flex-col gap-0.5 text-xs text-zinc-400 md:text-right">
                <p>{client.email}</p>
                <p>{client.phone}</p>
              </div>

              {/* Status Badge */}
              <span
                className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${
                  client.status === 'Ativo'
                    ? 'bg-emerald-500/10 text-emerald-400'
                    : 'bg-zinc-500/10 text-zinc-500'
                }`}
              >
                {client.status}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

    </div>
  )
}

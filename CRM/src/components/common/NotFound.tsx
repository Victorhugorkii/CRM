import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <div className="flex h-full min-h-[70vh] flex-col items-center justify-center gap-4 p-8 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-600">Erro 404</p>
      <h1 className="text-3xl font-semibold text-white">Página não encontrada</h1>
      <p className="max-w-sm text-sm text-zinc-500">
        A rota solicitada não existe. Verifique o endereço ou retorne ao início.
      </p>
      <button
        onClick={() => navigate('/dashboard')}
        className="mt-2 flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-zinc-100"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar ao Dashboard
      </button>
    </div>
  )
}

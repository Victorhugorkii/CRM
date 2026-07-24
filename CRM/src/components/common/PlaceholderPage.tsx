interface Props {
  title: string
  description: string
}

/**
 * PlaceholderPage — página temporária para rotas em desenvolvimento.
 * Estilização: tema dark consistente com o restante da aplicação.
 */
export default function PlaceholderPage({ title, description }: Props) {
  return (
    <div className="flex h-full min-h-[60vh] flex-col items-center justify-center gap-3 p-8 text-center">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <p className="text-sm text-zinc-500">{description}</p>
      <span className="mt-1 rounded-md border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-xs font-medium text-zinc-500">
        Em desenvolvimento
      </span>
    </div>
  )
}

function NotFoundPage() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-500">
        Erro 404
      </p>
      <h1 className="mt-4 text-3xl font-semibold text-slate-900">
        Página não encontrada
      </h1>
      <p className="mt-3 text-slate-600">
        A rota solicitada ainda não existe nesta base inicial do CRM.
      </p>
    </section>
  )
}

export default NotFoundPage

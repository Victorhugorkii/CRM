function Header() {
  return (
    <header className="mb-5 flex flex-col gap-3 rounded-[20px] border border-white/10 bg-slate-950/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm text-slate-400">Dashboard comercial</p>
        <h2 className="text-xl font-semibold text-white">Bem-vindo de volta, Lucas</h2>
      </div>
      <div className="flex items-center gap-3">
        <div className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-sm text-slate-300">
          Q3 • 2026
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-semibold text-slate-950">
          L
        </div>
      </div>
    </header>
  )
}

export default Header

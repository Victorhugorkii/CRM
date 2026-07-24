import { Outlet } from 'react-router-dom'
import { Header, Sidebar } from '@/components/layout'

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen flex-col px-4 py-4 lg:flex-row lg:gap-4 lg:px-6 lg:py-6">
        <div className="lg:sticky lg:top-0 lg:h-screen lg:w-72">
          <Sidebar />
        </div>

        <div className="flex-1 rounded-[24px] border border-white/10 bg-slate-900/60 p-3 shadow-[0_20px_60px_rgba(0,0,0,0.25)] sm:p-5">
          <Header />
          <main className="min-h-[70vh]">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout

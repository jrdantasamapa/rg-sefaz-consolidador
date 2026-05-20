import { NavLink, Outlet } from "react-router-dom";
import {
  ClipboardCheck,
  ClipboardPen,
  FolderOpen,
  Gauge,
  Layers3,
  ListChecks,
  LogOut,
  PanelLeft,
  ScrollText,
  ShieldCheck,
  Upload,
  UsersRound,
} from "lucide-react";
import { cn } from "../../lib/utils";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: Gauge },
  { to: "/dashboard-formularios", label: "Dashboard Formularios", icon: ClipboardPen },
  { to: "/unidades-setores", label: "Setores", icon: UsersRound },
  { to: "/matriz-itens", label: "Itens do Relatorio", icon: Layers3 },
  { to: "/formularios", label: "Formularios", icon: ClipboardCheck },
  { to: "/consolidacao", label: "Consolidacao", icon: ClipboardCheck },
  { to: "/evidencias", label: "Central de Evidencias", icon: Upload },
  { to: "/pendencias", label: "Pendencias", icon: ListChecks },
  { to: "/revisao", label: "Revisao", icon: ShieldCheck },
  { to: "/previa-relatorio", label: "Previa", icon: ScrollText },
];

export function AppLayout() {
  return (
    <div className="min-h-screen bg-[#f5f7f4] text-ink">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-slate-200 bg-white lg:block">
        <div className="flex h-20 items-center gap-3 border-b border-slate-100 px-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-600 text-white">
            <FolderOpen size={22} />
          </div>
          <div>
            <p className="text-sm font-semibold text-ink">RG SEFAZ</p>
            <p className="text-xs text-slate-500">Central de Consolidacao</p>
          </div>
        </div>
        <nav className="space-y-1 p-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex min-h-11 items-center gap-3 rounded-md px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100",
                  isActive && "bg-brand-50 text-brand-700",
                )
              }
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur md:px-8">
          <div className="flex items-center gap-3">
            <PanelLeft className="lg:hidden" size={20} />
            <div>
              <p className="text-sm font-semibold">Central de Consolidacao - SEFAZ/AP</p>
              <p className="text-xs text-slate-500">Informacoes recebidas, evidencias e previa do relatorio</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 sm:inline-flex">
              coordenador
            </span>
            <button className="inline-flex h-10 w-10 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100" title="Sair">
              <LogOut size={18} />
            </button>
          </div>
        </header>
        <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 md:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

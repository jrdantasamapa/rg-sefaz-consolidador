import { FileCheck2, Lock, Mail } from "lucide-react";
import { Button } from "../components/ui/Button";
import { isSupabaseConfigured } from "../lib/supabase";

export function Login() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f7f4] px-4 py-10">
      <section className="grid w-full max-w-5xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-subtle md:grid-cols-[1fr_420px]">
        <div className="flex flex-col justify-between bg-brand-700 p-8 text-white">
          <div>
            <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-md bg-white/12">
              <FileCheck2 size={26} />
            </div>
            <h1 className="max-w-xl text-3xl font-semibold tracking-normal">Consolidacao do Relatorio de Gestao SEFAZ/AP 2025</h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-brand-50">
              Ambiente inicial para coleta setorial, acompanhamento de pendencias, revisao e consolidacao das informacoes da Parte Geral e Parte Especifica.
            </p>
          </div>
          <p className="mt-10 text-xs text-brand-100">DN TCE/AP no 029/2025 - MVP institucional</p>
        </div>

        <form className="space-y-5 p-8">
          <div>
            <h2 className="text-xl font-semibold text-ink">Acessar sistema</h2>
            <p className="mt-1 text-sm text-slate-600">
              {isSupabaseConfigured ? "Supabase configurado para autenticar usuarios." : "Configure o Supabase no .env para habilitar autenticacao real."}
            </p>
          </div>

          <label className="block space-y-2">
            <span className="label">E-mail institucional</span>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 text-slate-400" size={18} />
              <input className="field pl-10" placeholder="usuario@sefaz.ap.gov.br" type="email" />
            </div>
          </label>

          <label className="block space-y-2">
            <span className="label">Senha</span>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 text-slate-400" size={18} />
              <input className="field pl-10" placeholder="Digite sua senha" type="password" />
            </div>
          </label>

          <Button className="w-full" type="button">
            Entrar
          </Button>

          <p className="rounded-md bg-slate-50 p-3 text-xs leading-5 text-slate-600">
            Neste MVP, a navegacao esta liberada para demonstracao. A autenticacao real deve usar Supabase Auth e a tabela profiles.
          </p>
        </form>
      </section>
    </main>
  );
}

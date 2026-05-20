/* eslint-disable react-refresh/only-export-components */
import type { ParteTce, StatusAtribuicaoTce, TipoRespostaTce } from "../../types/database";
import { cn } from "../../lib/utils";

export const parteTceLabels: Record<ParteTce, string> = {
  estrutura_formal: "Parte formal",
  geral: "Parte geral",
  especifica: "Parte especifica",
  apendice: "Apendice",
  anexo: "Anexo",
  rol_responsaveis: "Rol de responsaveis",
};

export const statusTceLabels: Record<StatusAtribuicaoTce, string> = {
  nao_atribuido: "Nao atribuido",
  atribuido: "Atribuido",
  em_preenchimento: "Em preenchimento",
  enviado: "Enviado",
  em_revisao: "Em revisao",
  devolvido: "Devolvido",
  consolidado: "Consolidado",
  aprovado: "Aprovado",
};

const statusClasses: Record<StatusAtribuicaoTce, string> = {
  nao_atribuido: "border-slate-200 bg-slate-100 text-slate-700",
  atribuido: "border-cyan-200 bg-cyan-50 text-cyan-700",
  em_preenchimento: "border-blue-200 bg-blue-50 text-blue-700",
  enviado: "border-amber-200 bg-amber-50 text-amber-800",
  em_revisao: "border-indigo-200 bg-indigo-50 text-indigo-700",
  devolvido: "border-rose-200 bg-rose-50 text-rose-700",
  consolidado: "border-teal-200 bg-teal-50 text-teal-700",
  aprovado: "border-emerald-200 bg-emerald-50 text-emerald-700",
};

export function StatusTceBadge({ status }: { status: StatusAtribuicaoTce }) {
  return <span className={cn("inline-flex rounded-full border px-2.5 py-1 text-xs font-medium", statusClasses[status])}>{statusTceLabels[status]}</span>;
}

export function TipoRespostaBadge({ tipo }: { tipo: TipoRespostaTce }) {
  return <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">{tipo}</span>;
}

export function ParteTceBadge({ parte }: { parte: ParteTce }) {
  return <span className="inline-flex rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700">{parteTceLabels[parte]}</span>;
}

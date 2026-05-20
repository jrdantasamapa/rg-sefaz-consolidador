import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Criticidade, ParteRelatorio, StatusInformacao } from "../types/database";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parteLabels: Record<ParteRelatorio, string> = {
  geral: "Parte Geral",
  especifica: "Parte Especifica",
  apendice: "Apendice",
  anexo: "Anexo",
};

export const statusLabels: Record<StatusInformacao, string> = {
  pendente: "Pendente",
  recebido: "Recebido",
  em_revisao: "Em revisao",
  consolidado: "Consolidado",
  aprovado: "Aprovado",
  devolvido: "Devolvido",
};

export const statusClasses: Record<StatusInformacao, string> = {
  pendente: "bg-slate-100 text-slate-700 border-slate-200",
  recebido: "bg-cyan-50 text-cyan-700 border-cyan-200",
  em_revisao: "bg-blue-50 text-blue-700 border-blue-200",
  consolidado: "bg-teal-50 text-teal-700 border-teal-200",
  aprovado: "bg-emerald-50 text-emerald-700 border-emerald-200",
  devolvido: "bg-rose-50 text-rose-700 border-rose-200",
};

export const criticidadeClasses: Record<Criticidade, string> = {
  baixa: "bg-slate-50 text-slate-700 border-slate-200",
  media: "bg-amber-50 text-amber-800 border-amber-200",
  alta: "bg-rose-50 text-rose-700 border-rose-200",
};

export function isConsolidavel(params: {
  texto_tecnico_consolidado: string;
  fonte_informacao: string;
  responsavel_informacao_nome: string;
  evidencias: number;
  justificativa_nao_alcance: string;
}) {
  return Boolean(
    params.texto_tecnico_consolidado.trim()
      && params.fonte_informacao.trim()
      && params.responsavel_informacao_nome.trim()
      && (params.evidencias > 0 || params.justificativa_nao_alcance.trim()),
  );
}

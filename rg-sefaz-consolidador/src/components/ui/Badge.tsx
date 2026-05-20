import { cn, criticidadeClasses, statusClasses, statusLabels } from "../../lib/utils";
import type { Criticidade, StatusInformacao } from "../../types/database";

interface BadgeProps {
  status: StatusInformacao;
}

export function StatusBadge({ status }: BadgeProps) {
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium", statusClasses[status])}>
      {statusLabels[status]}
    </span>
  );
}

export function TextBadge({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-brand-100 bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">
      {children}
    </span>
  );
}

export function CriticidadeBadge({ criticidade }: { criticidade: Criticidade }) {
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium capitalize", criticidadeClasses[criticidade])}>
      {criticidade}
    </span>
  );
}

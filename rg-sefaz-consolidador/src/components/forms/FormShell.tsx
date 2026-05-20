import type { ReactNode } from "react";
import { AlertTriangle, CheckCircle2, Save } from "lucide-react";
import { Button } from "../ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { StatusBadge } from "../ui/Badge";
import type { StatusInformacao } from "../../types/database";

interface FormShellProps {
  title: string;
  description: string;
  status: StatusInformacao;
  alerts: string[];
  children: ReactNode;
}

export function FormShell({ title, description, status, alerts, children }: FormShellProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
          </div>
          <StatusBadge status={status} />
        </CardHeader>
        <CardContent>
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700">
              <CheckCircle2 size={15} /> Autosave ativo
            </span>
            {alerts.map((alert) => (
              <span key={alert} className="inline-flex items-center gap-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-medium text-amber-800">
                <AlertTriangle size={15} /> {alert}
              </span>
            ))}
          </div>
          {children}
          <div className="mt-6 flex flex-wrap gap-2">
            <Button type="button"><Save size={16} /> Salvar</Button>
            <Button variant="secondary" type="button">Enviar para Revisao</Button>
            <Button variant="secondary" type="button">Marcar como Consolidado</Button>
            <Button variant="danger" type="button">Devolver</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function FormSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-slate-100 py-5 first:border-t-0 first:pt-0">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-normal text-slate-500">{title}</h3>
      {children}
    </section>
  );
}

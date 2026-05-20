import { AlertTriangle, CheckCircle2 } from "lucide-react";

export function ValidationPanel({ items }: { items: Array<{ label: string; ok: boolean }> }) {
  return (
    <div className="grid gap-2 md:grid-cols-3">
      {items.map((item) => (
        <div key={item.label} className={item.ok ? "rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700" : "rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800"}>
          <div className="flex items-center gap-2">
            {item.ok ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
            <span>{item.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

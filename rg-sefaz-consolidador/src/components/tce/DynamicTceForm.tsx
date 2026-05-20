import type { CampoSchemaTce } from "../../types/database";

interface DynamicTceFormProps {
  schema: CampoSchemaTce[];
  values?: Record<string, unknown>;
}

export function DynamicTceForm({ schema, values = {} }: DynamicTceFormProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {schema.map((field) => (
        <FieldRenderer key={field.name} field={field} value={values[field.name]} />
      ))}
    </div>
  );
}

function FieldRenderer({ field, value }: { field: CampoSchemaTce; value: unknown }) {
  const label = (
    <span className="label">
      {field.label}
      {field.required ? <span className="ml-1 text-rose-600">*</span> : null}
    </span>
  );

  if (field.type === "textarea" || field.type === "richtext") {
    return (
      <label className="block space-y-2 md:col-span-2">
        {label}
        <textarea className="field min-h-32" defaultValue={String(value ?? "")} />
      </label>
    );
  }

  if (field.type === "select") {
    return (
      <label className="block space-y-2">
        {label}
        <select className="field" defaultValue={String(value ?? "")}>
          <option value="">Selecione</option>
          {field.options?.map((option) => <option key={option}>{option}</option>)}
        </select>
      </label>
    );
  }

  if (field.type === "boolean") {
    return (
      <label className="flex items-center gap-2 rounded-md border border-slate-200 bg-white p-3">
        <input type="checkbox" defaultChecked={Boolean(value)} />
        {label}
      </label>
    );
  }

  if (field.type === "table") {
    return (
      <div className="md:col-span-2">
        {label}
        <div className="mt-2 overflow-x-auto rounded-md border border-slate-200">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr><th className="px-3 py-3">Descricao</th><th className="px-3 py-3">Valor</th><th className="px-3 py-3">Fonte</th></tr>
            </thead>
            <tbody>
              <tr><td className="px-3 py-2"><input className="field" /></td><td className="px-3 py-2"><input className="field" /></td><td className="px-3 py-2"><input className="field" /></td></tr>
              <tr><td className="px-3 py-2"><input className="field" /></td><td className="px-3 py-2"><input className="field" /></td><td className="px-3 py-2"><input className="field" /></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (field.type === "file") {
    return (
      <label className="block space-y-2 md:col-span-2">
        {label}
        <input className="field" type="file" multiple />
      </label>
    );
  }

  const type = field.type === "date" ? "date" : field.type === "number" || field.type === "currency" || field.type === "percent" ? "number" : "text";
  return (
    <label className="block space-y-2">
      {label}
      <input className="field" type={type} defaultValue={String(value ?? "")} />
    </label>
  );
}

/* eslint-disable react-refresh/only-export-components */
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { Button } from "../ui/Button";

interface EditableDataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  emptyLabel: string;
}

export function EditableDataTable<T>({ data, columns, emptyLabel }: EditableDataTableProps<T>) {
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <Button variant="secondary" type="button"><Plus size={16} /> Adicionar linha</Button>
      </div>
      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="w-full min-w-[980px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-3 py-3">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {table.getRowModel().rows.length ? table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-3 py-2 align-top">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            )) : (
              <tr><td className="px-3 py-6 text-center text-sm text-slate-500" colSpan={columns.length}>{emptyLabel}</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function editableCell(value: string | number) {
  return <input className="field min-w-32" defaultValue={value} />;
}

export function editableTextArea(value: string) {
  return <textarea className="field min-h-20 min-w-64" defaultValue={value} />;
}

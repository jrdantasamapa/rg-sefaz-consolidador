import { Plus, Trash2 } from "lucide-react";
import { Button } from "./ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import type { Indicador } from "../types/database";

interface IndicadoresEditorProps {
  indicadores: Indicador[];
}

export function IndicadoresEditor({ indicadores }: IndicadoresEditorProps) {
  const linhas = indicadores.length > 0 ? indicadores : [{
    id: "novo",
    informacao_id: "",
    nome: "",
    unidade_medida: "",
    periodicidade: "",
    indice_inicial: "",
    meta: "",
    resultado: "",
    data_apuracao: "",
    observacao: "",
  }];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Indicadores</CardTitle>
        <Button variant="secondary" type="button"><Plus size={16} /> Adicionar</Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {linhas.map((indicador, index) => (
          <div key={indicador.id} className="rounded-md border border-slate-200 p-4">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold">Indicador {index + 1}</p>
              <button className="inline-flex h-9 w-9 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100" title="Remover indicador" type="button">
                <Trash2 size={16} />
              </button>
            </div>
            <div className="grid gap-4 md:grid-cols-4">
              <label className="block space-y-2 md:col-span-2"><span className="label">Nome do indicador</span><input className="field" defaultValue={indicador.nome} /></label>
              <label className="block space-y-2"><span className="label">Unidade de medida</span><input className="field" defaultValue={indicador.unidade_medida} /></label>
              <label className="block space-y-2"><span className="label">Periodicidade</span><input className="field" defaultValue={indicador.periodicidade} /></label>
              <label className="block space-y-2"><span className="label">Indice inicial</span><input className="field" defaultValue={indicador.indice_inicial} /></label>
              <label className="block space-y-2"><span className="label">Meta</span><input className="field" defaultValue={indicador.meta} /></label>
              <label className="block space-y-2"><span className="label">Resultado</span><input className="field" defaultValue={indicador.resultado} /></label>
              <label className="block space-y-2"><span className="label">Data de apuracao</span><input className="field" defaultValue={indicador.data_apuracao} type="date" /></label>
              <label className="block space-y-2 md:col-span-4"><span className="label">Observacao</span><textarea className="field min-h-20" defaultValue={indicador.observacao} /></label>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

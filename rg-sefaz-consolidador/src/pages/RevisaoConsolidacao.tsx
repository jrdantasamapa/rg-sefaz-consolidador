import { CheckCircle2, MessageSquareText, RotateCcw } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { PageHeader } from "../components/ui/PageHeader";
import { StatusBadge } from "../components/ui/Badge";
import { informacoesConsolidadas, itensRelatorio, setores } from "../data/mockData";

export function RevisaoConsolidacao() {
  const itensRevisao = informacoesConsolidadas.filter((info) => ["em_revisao", "consolidado", "devolvido"].includes(info.status));

  return (
    <>
      <PageHeader title="Revisao e Consolidacao" description="Revise textos normalizados, registre observacoes internas e ajuste status sem criar fluxo complexo." />
      <div className="space-y-4">
        {itensRevisao.map((info) => {
          const item = itensRelatorio.find((entry) => entry.id === info.item_id)!;
          const setor = setores.find((entry) => entry.id === info.setor_id)!;
          return (
            <Card key={info.id}>
              <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div><CardTitle>{item.codigo} - {item.titulo}</CardTitle><p className="mt-1 text-sm text-slate-500">{setor.sigla} - {info.titulo_interno}</p></div>
                <StatusBadge status={info.status} />
              </CardHeader>
              <CardContent className="grid gap-4 lg:grid-cols-[1fr_320px]">
                <div className="space-y-3">
                  <div className="rounded-md bg-slate-50 p-4 text-sm leading-6 text-slate-700">{info.texto_tecnico_consolidado || "Texto tecnico ainda nao consolidado."}</div>
                  <p className="text-sm text-slate-600"><strong>Fonte:</strong> {info.fonte_informacao || "Nao informada"}</p>
                  <p className="text-sm text-slate-600"><strong>Responsavel:</strong> {info.responsavel_informacao_nome || "Nao informado"}</p>
                </div>
                <div className="space-y-3">
                  <textarea className="field min-h-24" defaultValue={info.observacoes_consolidacao} placeholder="Observacoes de revisao" />
                  <div className="flex flex-wrap gap-2">
                    <Button><CheckCircle2 size={16} /> Aprovar</Button>
                    <Button variant="secondary"><MessageSquareText size={16} /> Consolidar</Button>
                    <Button variant="danger"><RotateCcw size={16} /> Devolver</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}

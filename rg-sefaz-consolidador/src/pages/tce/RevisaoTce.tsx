import { CheckCircle2, RotateCcw, ShieldCheck } from "lucide-react";
import { PageHeader } from "../../components/ui/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { StatusTceBadge } from "../../components/tce/TceBadges";
import { atribuicoesTce, itensTce, respostasTce } from "../../data/tceData";
import { setores } from "../../data/mockData";

export function RevisaoTce() {
  const filas = atribuicoesTce.filter((entry) => ["enviado", "em_revisao", "devolvido", "consolidado"].includes(entry.status));
  return (
    <>
      <PageHeader title="Revisao e consolidacao TCE" description="Revise a resposta estruturada, ajuste o texto consolidado e marque como consolidado ou aprovado." />
      <div className="space-y-4">
        {filas.map((atribuicao) => {
          const item = itensTce.find((entry) => entry.id === atribuicao.item_tce_id)!;
          const resposta = respostasTce.find((entry) => entry.atribuicao_id === atribuicao.id);
          const setor = setores.find((entry) => entry.id === atribuicao.setor_id)!;
          return (
            <Card key={atribuicao.id}>
              <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div><CardTitle>{item.codigo} - {item.titulo}</CardTitle><p className="mt-1 text-sm text-slate-500">{setor.sigla} | {atribuicao.responsavel_nome}</p></div>
                <StatusTceBadge status={atribuicao.status} />
              </CardHeader>
              <CardContent className="grid gap-4 lg:grid-cols-[1fr_320px]">
                <div className="space-y-3">
                  <div className="rounded-md bg-slate-50 p-4 text-sm leading-6 text-slate-700"><strong>Texto original:</strong><br />{resposta?.texto_original || "Nao informado"}</div>
                  <label className="block space-y-2"><span className="label">Texto consolidado final</span><textarea className="field min-h-36" defaultValue={resposta?.texto_consolidado ?? ""} /></label>
                </div>
                <div className="space-y-3">
                  <textarea className="field min-h-28" defaultValue={resposta?.observacoes_revisao ?? ""} placeholder="Observacoes de revisao" />
                  <Button className="w-full"><CheckCircle2 size={16} /> Marcar como consolidado</Button>
                  <Button className="w-full" variant="secondary"><ShieldCheck size={16} /> Aprovar</Button>
                  <Button className="w-full" variant="danger"><RotateCcw size={16} /> Devolver ao setor</Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}

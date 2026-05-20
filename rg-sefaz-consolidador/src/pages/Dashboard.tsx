import { AlertTriangle, CheckCircle2, ClipboardList, FileWarning, Inbox, Layers3, RefreshCw, ShieldCheck, Undo2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { PageHeader } from "../components/ui/PageHeader";
import { StatusBadge } from "../components/ui/Badge";
import { anexosVinculos, informacoesConsolidadas, itensRelatorio, setores, ultimasAlteracoes } from "../data/mockData";
import { statusLabels } from "../lib/utils";
import type { StatusInformacao } from "../types/database";

function countStatus(status: StatusInformacao) {
  return informacoesConsolidadas.filter((info) => info.status === status).length;
}

function infoByItem(itemId: string) {
  return informacoesConsolidadas.find((info) => info.item_id === itemId);
}

export function Dashboard() {
  const totalItens = itensRelatorio.length;
  const aprovados = countStatus("aprovado");
  const concluidos = countStatus("consolidado") + aprovados;
  const percentual = Math.round((concluidos / totalItens) * 100);
  const semEvidencia = informacoesConsolidadas.filter((info) => !anexosVinculos.some((vinculo) => vinculo.informacao_id === info.id)).length;

  const cards = [
    { label: "Total de itens", value: totalItens, icon: Layers3 },
    { label: "Pendentes", value: countStatus("pendente"), icon: ClipboardList },
    { label: "Recebidos", value: countStatus("recebido"), icon: Inbox },
    { label: "Em revisao", value: countStatus("em_revisao"), icon: RefreshCw },
    { label: "Consolidados", value: countStatus("consolidado"), icon: CheckCircle2 },
    { label: "Aprovados", value: aprovados, icon: ShieldCheck },
    { label: "Devolvidos", value: countStatus("devolvido"), icon: Undo2 },
    { label: "Sem evidencia", value: semEvidencia, icon: FileWarning },
    { label: "Conclusao geral", value: `${percentual}%`, icon: CheckCircle2 },
  ];

  const pendenciasPorSetor = setores
    .map((setor) => ({
      setor,
      total: informacoesConsolidadas.filter((info) => info.setor_id === setor.id && !["consolidado", "aprovado"].includes(info.status)).length,
    }))
    .filter((entry) => entry.total > 0)
    .sort((a, b) => b.total - a.total);

  const criticosPendentes = itensRelatorio.filter((item) => {
    const info = infoByItem(item.id);
    return item.criticidade === "alta" && (!info || !["consolidado", "aprovado"].includes(info.status));
  });

  const semFonte = informacoesConsolidadas.filter((info) => !info.fonte_informacao.trim());
  const infosSemEvidencia = informacoesConsolidadas.filter((info) => !anexosVinculos.some((vinculo) => vinculo.informacao_id === info.id));

  return (
    <>
      <PageHeader
        title="Dashboard de Consolidacao"
        description="Acompanhamento da normalizacao das informacoes ja recebidas dos setores para o Relatorio de Gestao da SEFAZ/AP."
      />

      <section className="grid gap-4 md:grid-cols-3 xl:grid-cols-5">
        {cards.map((card) => (
          <Card key={card.label}>
            <CardContent className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">{card.label}</p>
                <p className="mt-2 text-2xl font-semibold text-ink">{card.value}</p>
              </div>
              <card.icon className="text-brand-600" size={25} />
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Pendencias por setor</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {pendenciasPorSetor.map(({ setor, total }) => (
              <div key={setor.id} className="flex items-center justify-between rounded-md border border-slate-200 p-3">
                <div>
                  <p className="font-medium">{setor.sigla} - {setor.nome}</p>
                  <p className="text-xs text-slate-500">{setor.responsavel_nome}</p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold">{total}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Itens criticos pendentes</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {criticosPendentes.slice(0, 6).map((item) => {
              const setor = setores.find((entry) => entry.id === item.setor_responsavel_padrao_id)!;
              const info = infoByItem(item.id);
              return (
                <div key={item.id} className="flex items-start gap-3 rounded-md border border-rose-100 bg-rose-50 p-3">
                  <AlertTriangle className="mt-0.5 text-rose-600" size={18} />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-rose-950">{item.codigo} - {item.titulo}</p>
                    <p className="text-xs text-rose-700">{setor.sigla} | {info ? statusLabels[info.status] : "Sem informacao cadastrada"}</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Sem fonte informada</CardTitle></CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="text-xs uppercase text-slate-500"><tr><th className="pb-3">Item</th><th className="pb-3">Setor</th><th className="pb-3">Status</th></tr></thead>
              <tbody className="divide-y divide-slate-100">
                {semFonte.map((info) => {
                  const item = itensRelatorio.find((entry) => entry.id === info.item_id)!;
                  const setor = setores.find((entry) => entry.id === info.setor_id)!;
                  return <tr key={info.id}><td className="py-3">{item.codigo} - {item.titulo}</td><td className="py-3">{setor.sigla}</td><td className="py-3"><StatusBadge status={info.status} /></td></tr>;
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Sem evidencia vinculada</CardTitle></CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="text-xs uppercase text-slate-500"><tr><th className="pb-3">Item</th><th className="pb-3">Setor</th><th className="pb-3">Status</th></tr></thead>
              <tbody className="divide-y divide-slate-100">
                {infosSemEvidencia.map((info) => {
                  const item = itensRelatorio.find((entry) => entry.id === info.item_id)!;
                  const setor = setores.find((entry) => entry.id === info.setor_id)!;
                  return <tr key={info.id}><td className="py-3">{item.codigo} - {item.titulo}</td><td className="py-3">{setor.sigla}</td><td className="py-3"><StatusBadge status={info.status} /></td></tr>;
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader><CardTitle>Ultimas alteracoes</CardTitle></CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="text-xs uppercase text-slate-500"><tr><th className="pb-3">Item</th><th className="pb-3">Setor</th><th className="pb-3">Acao</th><th className="pb-3">Data</th></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {ultimasAlteracoes.map((entry) => (
                <tr key={entry.id}>
                  <td className="py-3 font-medium">{entry.item}</td>
                  <td className="py-3">{entry.setor}</td>
                  <td className="py-3">{entry.acao}</td>
                  <td className="py-3">{new Date(entry.data).toLocaleString("pt-BR")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </>
  );
}

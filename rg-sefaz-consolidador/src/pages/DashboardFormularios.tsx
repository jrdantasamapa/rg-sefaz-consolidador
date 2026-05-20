import { AlertTriangle, CheckCircle2, ClipboardList, FileWarning, Layers3, Percent, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { PageHeader } from "../components/ui/PageHeader";
import { StatusBadge } from "../components/ui/Badge";
import { anexosVinculos, informacoesConsolidadas, itensRelatorio, setores, tiposFormulario } from "../data/mockData";

export function DashboardFormularios() {
  const total = itensRelatorio.length;
  const completos = informacoesConsolidadas.filter((info) => ["consolidado", "aprovado"].includes(info.status)).length;
  const percentual = Math.round((completos / total) * 100);
  const incompletos = informacoesConsolidadas.filter((info) => !info.texto_tecnico_consolidado || !info.fonte_informacao || !info.responsavel_informacao_nome);
  const semEvidencia = informacoesConsolidadas.filter((info) => !anexosVinculos.some((vinculo) => vinculo.informacao_id === info.id));
  const semRevisao = informacoesConsolidadas.filter((info) => ["recebido", "pendente"].includes(info.status));

  const cards = [
    { label: "Tipos ativos", value: tiposFormulario.length, icon: Layers3 },
    { label: "Itens incompletos", value: incompletos.length, icon: AlertTriangle },
    { label: "Sem evidencia", value: semEvidencia.length, icon: FileWarning },
    { label: "Sem revisao", value: semRevisao.length, icon: ShieldAlert },
    { label: "Percentual preenchido", value: `${percentual}%`, icon: Percent },
  ];

  const pendenciasPorSetor = setores.map((setor) => ({
    setor,
    total: informacoesConsolidadas.filter((info) => info.setor_id === setor.id && !["consolidado", "aprovado"].includes(info.status)).length,
  })).filter((entry) => entry.total > 0);

  return (
    <>
      <PageHeader title="Dashboard dos Formularios" description="Visao operacional dos formularios especializados, pendencias de preenchimento, evidencias e revisao." />
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {cards.map((card) => (
          <Card key={card.label}>
            <CardContent className="flex items-center justify-between">
              <div><p className="text-sm text-slate-500">{card.label}</p><p className="mt-2 text-2xl font-semibold">{card.value}</p></div>
              <card.icon className="text-brand-600" size={25} />
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Formularios por status</CardTitle></CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="text-xs uppercase text-slate-500"><tr><th className="pb-3">Item</th><th className="pb-3">Tipo</th><th className="pb-3">Status</th></tr></thead>
              <tbody className="divide-y divide-slate-100">
                {itensRelatorio.slice(0, 12).map((item) => {
                  const info = informacoesConsolidadas.find((entry) => entry.item_id === item.id);
                  const tipo = tiposFormulario.find((entry) => entry.codigo === item.tipo_formulario_id)!;
                  return (
                    <tr key={item.id}>
                      <td className="py-3"><Link className="font-medium text-brand-700 hover:underline" to={`/formularios/${item.id}`}>{item.codigo} - {item.titulo}</Link></td>
                      <td className="py-3">{tipo.nome}</td>
                      <td className="py-3"><StatusBadge status={info?.status ?? "pendente"} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Pendencias por setor</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {pendenciasPorSetor.map(({ setor, total }) => (
              <div key={setor.id} className="flex items-center justify-between rounded-md border border-slate-200 p-3">
                <div><p className="font-medium">{setor.sigla} - {setor.nome}</p><p className="text-xs text-slate-500">{setor.responsavel_nome}</p></div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold">{total}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader><CardTitle>Itens incompletos</CardTitle></CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="text-xs uppercase text-slate-500"><tr><th className="pb-3">Item</th><th className="pb-3">Alertas</th><th className="pb-3">Acao</th></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {incompletos.map((info) => {
                const item = itensRelatorio.find((entry) => entry.id === info.item_id)!;
                const alertas = [!info.texto_tecnico_consolidado && "sem texto", !info.fonte_informacao && "sem fonte", !info.responsavel_informacao_nome && "sem responsavel"].filter(Boolean).join(", ");
                return (
                  <tr key={info.id}>
                    <td className="py-3 font-medium">{item.codigo} - {item.titulo}</td>
                    <td className="py-3">{alertas}</td>
                    <td className="py-3"><Link className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm font-medium hover:bg-slate-50" to={`/formularios/${item.id}`}><ClipboardList size={15} /> Abrir</Link></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="mt-4 flex items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
            <CheckCircle2 size={17} /> O percentual considera itens consolidados ou aprovados.
          </div>
        </CardContent>
      </Card>
    </>
  );
}

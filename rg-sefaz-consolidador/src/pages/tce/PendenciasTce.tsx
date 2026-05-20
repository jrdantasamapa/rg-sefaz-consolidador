import { AlertTriangle, Clock3, FileWarning, Search } from "lucide-react";
import { PageHeader } from "../../components/ui/PageHeader";
import { Card, CardContent } from "../../components/ui/Card";
import { StatusTceBadge } from "../../components/tce/TceBadges";
import { atribuicoesTce, evidenciasTce, itensTce, respostasTce } from "../../data/tceData";
import { setores } from "../../data/mockData";

export function PendenciasTce() {
  const pendencias = itensTce.map((item) => {
    const atribuicao = atribuicoesTce.find((entry) => entry.item_tce_id === item.id);
    const resposta = respostasTce.find((entry) => entry.atribuicao_id === atribuicao?.id);
    const evidencias = evidenciasTce.filter((entry) => entry.item_tce_id === item.id);
    const motivos = [
      !atribuicao && "nao atribuido",
      atribuicao && ["atribuido", "em_preenchimento"].includes(atribuicao.status) && "atribuido nao respondido",
      resposta && item.evidencia_obrigatoria && evidencias.length === 0 && !resposta.justificativa_ausencia_evidencia && "sem evidencia",
      atribuicao?.status === "devolvido" && "devolvido",
      atribuicao?.status === "em_revisao" && "em revisao",
      atribuicao && new Date(atribuicao.prazo_interno) < new Date("2026-05-20") && !["consolidado", "aprovado"].includes(atribuicao.status) && "prazo vencido",
    ].filter(Boolean);
    return { item, atribuicao, resposta, motivos };
  }).filter((entry) => entry.motivos.length > 0);

  return (
    <>
      <PageHeader title="Painel de Pendencias TCE" description="Controle operacional dos itens obrigatorios: atribuicao, resposta, evidencia, revisao e prazos." />
      <section className="grid gap-4 md:grid-cols-4">
        <Resumo label="Nao atribuidos" value={pendencias.filter((p) => p.motivos.includes("nao atribuido")).length} icon={AlertTriangle} />
        <Resumo label="Sem evidencia" value={pendencias.filter((p) => p.motivos.includes("sem evidencia")).length} icon={FileWarning} />
        <Resumo label="Em revisao" value={pendencias.filter((p) => p.motivos.includes("em revisao")).length} icon={Search} />
        <Resumo label="Prazo vencido" value={pendencias.filter((p) => p.motivos.includes("prazo vencido")).length} icon={Clock3} />
      </section>
      <Card>
        <CardContent>
          <div className="mb-5 grid gap-3 md:grid-cols-[1fr_220px_220px]">
            <div className="relative"><Search className="absolute left-3 top-2.5 text-slate-400" size={18} /><input className="field pl-10" placeholder="Buscar item, setor ou motivo" /></div>
            <select className="field" defaultValue=""><option value="">Todos os setores</option>{setores.map((setor) => <option key={setor.id}>{setor.sigla}</option>)}</select>
            <select className="field" defaultValue=""><option value="">Todos os motivos</option><option>Nao atribuido</option><option>Sem evidencia</option><option>Prazo vencido</option><option>Devolvido</option></select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] text-left text-sm">
              <thead className="text-xs uppercase text-slate-500"><tr><th className="pb-3">Item</th><th className="pb-3">Setor</th><th className="pb-3">Responsavel</th><th className="pb-3">Motivos</th><th className="pb-3">Status</th><th className="pb-3">Prazo</th></tr></thead>
              <tbody className="divide-y divide-slate-100">
                {pendencias.map(({ item, atribuicao, motivos }) => {
                  const setor = setores.find((entry) => entry.id === atribuicao?.setor_id);
                  return (
                    <tr key={item.id}>
                      <td className="py-3"><p className="font-semibold">{item.codigo} - {item.titulo}</p><p className="text-xs text-slate-500">{item.parte}</p></td>
                      <td className="py-3">{setor?.sigla ?? "-"}</td>
                      <td className="py-3">{atribuicao?.responsavel_nome ?? "-"}</td>
                      <td className="py-3">{motivos.join(", ")}</td>
                      <td className="py-3"><StatusTceBadge status={atribuicao?.status ?? "nao_atribuido"} /></td>
                      <td className="py-3">{atribuicao?.prazo_interno ? new Date(atribuicao.prazo_interno).toLocaleDateString("pt-BR") : "-"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

function Resumo({ label, value, icon: Icon }: { label: string; value: number; icon: typeof AlertTriangle }) {
  return (
    <Card><CardContent className="flex items-center justify-between"><div><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-2xl font-semibold">{value}</p></div><Icon className="text-brand-600" size={24} /></CardContent></Card>
  );
}

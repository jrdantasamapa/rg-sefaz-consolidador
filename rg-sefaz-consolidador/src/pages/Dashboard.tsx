import { AlertTriangle, CheckCircle2, ClipboardList, FileWarning, Layers3, Percent, RefreshCw, ShieldCheck, Undo2, UserCheck, UserX } from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { StatusTceBadge } from "../components/tce/TceBadges";
import { atribuicoesTce, evidenciasTce, itensTce, respostasTce } from "../data/tceData";
import { setores } from "../data/mockData";
import type { StatusAtribuicaoTce } from "../types/database";

function countStatus(status: StatusAtribuicaoTce) {
  return atribuicoesTce.filter((entry) => entry.status === status).length;
}

export function Dashboard() {
  const aplicaveis = itensTce.filter((item) => item.aplicavel_sefaz);
  const atribuidos = atribuicoesTce.length;
  const naoAtribuidos = aplicaveis.length - atribuidos;
  const aprovados = countStatus("aprovado");
  const consolidados = countStatus("consolidado");
  const conclusao = Math.round(((aprovados + consolidados) / aplicaveis.length) * 100);
  const semEvidencia = aplicaveis.filter((item) => item.evidencia_obrigatoria && !evidenciasTce.some((ev) => ev.item_tce_id === item.id));
  const semFonte = respostasTce.filter((resposta) => !resposta.fonte_informacao);

  const cards = [
    { label: "Itens TCE aplicaveis", value: aplicaveis.length, icon: Layers3 },
    { label: "Atribuidos", value: atribuidos, icon: UserCheck },
    { label: "Nao atribuidos", value: naoAtribuidos, icon: UserX },
    { label: "Pendentes", value: countStatus("atribuido") + countStatus("em_preenchimento"), icon: ClipboardList },
    { label: "Em revisao", value: countStatus("em_revisao"), icon: RefreshCw },
    { label: "Devolvidos", value: countStatus("devolvido"), icon: Undo2 },
    { label: "Consolidados", value: consolidados, icon: CheckCircle2 },
    { label: "Aprovados", value: aprovados, icon: ShieldCheck },
    { label: "Conclusao geral", value: `${conclusao}%`, icon: Percent },
    { label: "Sem evidencia", value: semEvidencia.length, icon: FileWarning },
  ];

  const conclusaoPorSetor = setores.map((setor) => {
    const total = atribuicoesTce.filter((atr) => atr.setor_id === setor.id).length;
    const finalizados = atribuicoesTce.filter((atr) => atr.setor_id === setor.id && ["consolidado", "aprovado"].includes(atr.status)).length;
    return { setor, total, percentual: total ? Math.round((finalizados / total) * 100) : 0 };
  }).filter((entry) => entry.total > 0);

  const conclusaoPorParte = ["estrutura_formal", "geral", "especifica", "apendice", "anexo", "rol_responsaveis"].map((parte) => {
    const itens = aplicaveis.filter((item) => item.parte === parte);
    const finalizados = itens.filter((item) => {
      const atr = atribuicoesTce.find((entry) => entry.item_tce_id === item.id);
      return atr && ["consolidado", "aprovado"].includes(atr.status);
    }).length;
    return { parte, total: itens.length, percentual: itens.length ? Math.round((finalizados / itens.length) * 100) : 0 };
  });

  const criticosPendentes = aplicaveis.filter((item) => {
    const atr = atribuicoesTce.find((entry) => entry.item_tce_id === item.id);
    return item.obrigatorio && (!atr || !["consolidado", "aprovado"].includes(atr.status));
  }).slice(0, 8);

  return (
    <>
      <PageHeader title="Dashboard TCE/AP 2025" description="Acompanhamento do fluxo: item obrigatorio do TCE, atribuicao, resposta, evidencias, revisao, consolidacao e previa." />
      <section className="grid gap-4 md:grid-cols-3 xl:grid-cols-5">
        {cards.map((card) => (
          <Card key={card.label}><CardContent className="flex items-center justify-between"><div><p className="text-sm text-slate-500">{card.label}</p><p className="mt-2 text-2xl font-semibold">{card.value}</p></div><card.icon className="text-brand-600" size={24} /></CardContent></Card>
        ))}
      </section>
      <section className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Conclusao por setor</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {conclusaoPorSetor.map(({ setor, total, percentual }) => <div key={setor.id} className="rounded-md border border-slate-200 p-3"><div className="flex justify-between text-sm"><span>{setor.sigla} - {setor.nome}</span><strong>{percentual}%</strong></div><div className="mt-2 h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-brand-600" style={{ width: `${percentual}%` }} /></div><p className="mt-1 text-xs text-slate-500">{total} item(ns) atribuido(s)</p></div>)}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Conclusao por parte do relatorio</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {conclusaoPorParte.map(({ parte, total, percentual }) => <div key={parte} className="rounded-md border border-slate-200 p-3"><div className="flex justify-between text-sm"><span className="capitalize">{parte.replace("_", " ")}</span><strong>{percentual}%</strong></div><div className="mt-2 h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-brand-600" style={{ width: `${percentual}%` }} /></div><p className="mt-1 text-xs text-slate-500">{total} item(ns)</p></div>)}
          </CardContent>
        </Card>
      </section>
      <section className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Itens criticos pendentes</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {criticosPendentes.map((item) => {
              const atr = atribuicoesTce.find((entry) => entry.item_tce_id === item.id);
              return <div key={item.id} className="flex items-start gap-3 rounded-md border border-amber-200 bg-amber-50 p-3"><AlertTriangle className="mt-0.5 text-amber-700" size={17} /><div><p className="font-medium">{item.codigo} - {item.titulo}</p><div className="mt-1"><StatusTceBadge status={atr?.status ?? "nao_atribuido"} /></div></div></div>;
            })}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Alertas de qualidade</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="rounded-md border border-rose-200 bg-rose-50 p-3 text-rose-700">{semEvidencia.length} item(ns) sem evidencia obrigatoria vinculada.</div>
            <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-amber-800">{semFonte.length} resposta(s) sem fonte informada.</div>
            <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-slate-700">Requisitos formais de PDF, fonte, margens e tamanho estao controlados na previa.</div>
          </CardContent>
        </Card>
      </section>
    </>
  );
}

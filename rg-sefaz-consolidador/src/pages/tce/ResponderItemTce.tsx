import { Link, useParams } from "react-router-dom";
import { AlertTriangle, Paperclip, Save, Send } from "lucide-react";
import { PageHeader } from "../../components/ui/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { DynamicTceForm } from "../../components/tce/DynamicTceForm";
import { ParteTceBadge, StatusTceBadge, TipoRespostaBadge } from "../../components/tce/TceBadges";
import { atribuicoesTce, evidenciasTce, itensTce, respostasTce } from "../../data/tceData";
import { setores } from "../../data/mockData";

export function ResponderItemTce() {
  const { itemId } = useParams();
  const item = itensTce.find((entry) => entry.id === itemId) ?? itensTce[0];
  const atribuicao = atribuicoesTce.find((entry) => entry.item_tce_id === item.id);
  const resposta = respostasTce.find((entry) => entry.atribuicao_id === atribuicao?.id);
  const setor = setores.find((entry) => entry.id === atribuicao?.setor_id);
  const evidencias = evidenciasTce.filter((entry) => entry.item_tce_id === item.id);
  const alertas = [
    !atribuicao && "Item obrigatorio sem atribuicao.",
    atribuicao && new Date(atribuicao.prazo_interno) < new Date("2026-05-20") && !["consolidado", "aprovado"].includes(atribuicao.status) && "Prazo interno vencido.",
    !resposta?.fonte_informacao && "Fonte ausente.",
    item.evidencia_obrigatoria && evidencias.length === 0 && !resposta?.justificativa_ausencia_evidencia && "Evidencia ausente.",
  ].filter(Boolean);

  return (
    <>
      <PageHeader title="Responder item" description="Preencha o formulario especifico do item, cole informacoes ja recebidas e vincule evidencias." />
      <section className="grid gap-6 xl:grid-cols-[1fr_340px]">
        <Card>
          <CardHeader>
            <CardTitle>{item.codigo} - {item.titulo}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-md border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
              <p><strong>Descricao da exigencia:</strong> {item.descricao_exigencia}</p>
              <p><strong>Orientacao:</strong> {item.observacao_orientativa}</p>
            </div>
            {alertas.length > 0 ? (
              <div className="grid gap-2 md:grid-cols-2">
                {alertas.map((alerta) => <div key={String(alerta)} className="flex items-center gap-2 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800"><AlertTriangle size={16} /> {alerta}</div>)}
              </div>
            ) : null}
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block space-y-2 md:col-span-2"><span className="label">Texto original recebido</span><textarea className="field min-h-32" defaultValue={resposta?.texto_original ?? ""} placeholder="Cole aqui textos, notas tecnicas ou resumos enviados pelo setor." /></label>
              <label className="block space-y-2 md:col-span-2"><span className="label">Texto consolidado final</span><textarea className="field min-h-40" defaultValue={resposta?.texto_consolidado ?? ""} /></label>
            </div>
            <DynamicTceForm schema={item.campos_schema} values={resposta?.resposta_json} />
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block space-y-2"><span className="label">Fonte da informacao</span><input className="field" defaultValue={resposta?.fonte_informacao ?? ""} /></label>
              <label className="block space-y-2"><span className="label">Justificativa de ausencia de evidencia</span><input className="field" defaultValue={resposta?.justificativa_ausencia_evidencia ?? ""} /></label>
              <label className="block space-y-2 md:col-span-2"><span className="label">Observacoes do setor</span><textarea className="field min-h-24" defaultValue={resposta?.observacoes_setor ?? ""} /></label>
            </div>
            <div className="rounded-lg border border-dashed border-slate-300 bg-white p-5">
              <label className="flex cursor-pointer flex-col items-center justify-center text-center text-sm text-slate-600">
                <Paperclip className="mb-2 text-slate-400" size={24} />
                Upload de evidencias
                <input className="hidden" type="file" multiple />
              </label>
              <div className="mt-4 grid gap-2 md:grid-cols-2">
                {evidencias.map((evidencia) => <div key={evidencia.id} className="rounded-md border border-slate-200 p-3 text-sm"><p className="font-medium">{evidencia.nome_arquivo}</p><p className="text-xs text-slate-500">{evidencia.descricao}</p></div>)}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button><Save size={16} /> Salvar rascunho</Button>
              <Button variant="secondary"><Send size={16} /> Enviar para revisao</Button>
              <Link className="inline-flex items-center rounded-md border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50" to="/tce/itens">Voltar</Link>
            </div>
          </CardContent>
        </Card>
        <aside className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Contexto</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div><p className="text-slate-500">Parte</p><ParteTceBadge parte={item.parte} /></div>
              <div><p className="text-slate-500">Tipo de resposta</p><TipoRespostaBadge tipo={item.tipo_resposta} /></div>
              <div><p className="text-slate-500">Unidade consolidada</p><p className="font-medium">{item.unidade_consolidada}</p></div>
              <div><p className="text-slate-500">Setor</p><p className="font-medium">{setor ? `${setor.sigla} - ${setor.nome}` : "Nao atribuido"}</p></div>
              <div><p className="text-slate-500">Responsavel</p><p className="font-medium">{atribuicao?.responsavel_nome ?? "Nao informado"}</p></div>
              <div><p className="text-slate-500">Status</p><StatusTceBadge status={atribuicao?.status ?? "nao_atribuido"} /></div>
            </CardContent>
          </Card>
        </aside>
      </section>
    </>
  );
}

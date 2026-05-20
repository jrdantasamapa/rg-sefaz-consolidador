import { Link, useParams } from "react-router-dom";
import { Paperclip, RotateCcw, Save, Send, ShieldCheck } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { PageHeader } from "../components/ui/PageHeader";
import { CriticidadeBadge, StatusBadge } from "../components/ui/Badge";
import { IndicadoresEditor } from "../components/IndicadoresEditor";
import { anexos, anexosVinculos, indicadores, informacoesConsolidadas, itensRelatorio, setores } from "../data/mockData";
import { parteLabels } from "../lib/utils";

export function RespostaItem() {
  const { itemId } = useParams();
  const item = itensRelatorio.find((entry) => entry.id === itemId) ?? itensRelatorio[0];
  const info = informacoesConsolidadas.find((entry) => entry.item_id === item.id);
  const setor = setores.find((entry) => entry.id === (info?.setor_id ?? item.setor_responsavel_padrao_id))!;
  const vinculos = anexosVinculos.filter((vinculo) => vinculo.item_id === item.id && (!info || vinculo.informacao_id === info.id));
  const anexosVinculados = vinculos.map((vinculo) => anexos.find((anexo) => anexo.id === vinculo.anexo_id)).filter(Boolean);
  const indicadoresDaInfo = info ? indicadores.filter((indicador) => indicador.informacao_id === info.id) : [];

  return (
    <>
      <PageHeader
        title="Consolidacao do Item"
        description="Cole informacoes recebidas, normalize o texto tecnico, registre fonte, responsavel, indicadores e evidencias."
        actions={<><Button variant="secondary"><Save size={16} /> Salvar</Button><Button variant="secondary"><Send size={16} /> Enviar para Revisao</Button><Button><ShieldCheck size={16} /> Marcar como Consolidado</Button><Button variant="danger"><RotateCcw size={16} /> Devolver</Button></>}
      />

      <section className="grid gap-6 xl:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{item.codigo} - {item.titulo}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-4 md:grid-cols-3">
                <label className="block space-y-2 md:col-span-2">
                  <span className="label">Selecionar item do relatorio</span>
                  <select className="field" defaultValue={item.id}>
                    {itensRelatorio.map((entry) => <option key={entry.id} value={entry.id}>{entry.codigo} - {entry.titulo}</option>)}
                  </select>
                </label>
                <label className="block space-y-2">
                  <span className="label">Setor responsavel</span>
                  <select className="field" defaultValue={setor.id}>
                    {setores.map((entry) => <option key={entry.id} value={entry.id}>{entry.sigla} - {entry.nome}</option>)}
                  </select>
                </label>
              </div>

              <label className="block space-y-2"><span className="label">Titulo interno</span><input className="field" defaultValue={info?.titulo_interno ?? ""} placeholder="Referencia interna para a informacao recebida" /></label>
              <label className="block space-y-2"><span className="label">Texto original recebido</span><textarea className="field min-h-36" defaultValue={info?.texto_original_recebido ?? ""} placeholder="Cole aqui o texto, resumo ou transcricao recebida do setor." /></label>
              <label className="block space-y-2"><span className="label">Texto tecnico consolidado</span><textarea className="field min-h-44" defaultValue={info?.texto_tecnico_consolidado ?? ""} placeholder="Texto normalizado que entrara na previa do relatorio." /></label>
              <label className="block space-y-2"><span className="label">Principais resultados</span><textarea className="field min-h-24" defaultValue={info?.principais_resultados ?? ""} /></label>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="block space-y-2"><span className="label">Dados quantitativos</span><textarea className="field min-h-24" defaultValue={info?.dados_quantitativos ?? ""} /></label>
                <label className="block space-y-2"><span className="label">Metas previstas</span><textarea className="field min-h-24" defaultValue={info?.metas_previstas ?? ""} /></label>
                <label className="block space-y-2"><span className="label">Resultados alcancados</span><textarea className="field min-h-24" defaultValue={info?.resultados_alcancados ?? ""} /></label>
                <label className="block space-y-2"><span className="label">Justificativa para metas nao alcancadas ou ausencia de evidencia</span><textarea className="field min-h-24" defaultValue={info?.justificativa_nao_alcance ?? ""} /></label>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <label className="block space-y-2"><span className="label">Fonte da informacao</span><input className="field" defaultValue={info?.fonte_informacao ?? ""} /></label>
                <label className="block space-y-2"><span className="label">Responsavel pela informacao</span><input className="field" defaultValue={info?.responsavel_informacao_nome ?? ""} /></label>
                <label className="block space-y-2"><span className="label">Cargo do responsavel</span><input className="field" defaultValue={info?.responsavel_informacao_cargo ?? ""} /></label>
              </div>

              <label className="block space-y-2"><span className="label">Observacoes internas da consolidacao</span><textarea className="field min-h-24" defaultValue={info?.observacoes_consolidacao ?? ""} /></label>
              <label className="block max-w-xs space-y-2"><span className="label">Status</span><select className="field" defaultValue={info?.status ?? "pendente"}><option value="pendente">Pendente</option><option value="recebido">Recebido</option><option value="em_revisao">Em revisao</option><option value="consolidado">Consolidado</option><option value="aprovado">Aprovado</option><option value="devolvido">Devolvido</option></select></label>
            </CardContent>
          </Card>

          <IndicadoresEditor indicadores={indicadoresDaInfo} />
        </div>

        <aside className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Resumo do item</CardTitle></CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div><p className="text-slate-500">Parte</p><p className="font-medium">{parteLabels[item.parte]}</p></div>
              <div><p className="text-slate-500">Setor padrao</p><p className="font-medium">{setor.sigla} - {setor.nome}</p></div>
              <div><p className="text-slate-500">Criticidade</p><div className="mt-1"><CriticidadeBadge criticidade={item.criticidade} /></div></div>
              <div><p className="text-slate-500">Status atual</p><div className="mt-1"><StatusBadge status={info?.status ?? "pendente"} /></div></div>
              <Link className="inline-flex rounded-md border border-slate-200 px-3 py-2 text-sm font-medium hover:bg-slate-50" to="/matriz-itens">Voltar para itens</Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Anexos vinculados</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {anexosVinculados.map((anexo) => (
                <div key={anexo!.id} className="rounded-md border border-slate-200 p-3">
                  <div className="flex items-center gap-2"><Paperclip size={16} className="text-brand-600" /><p className="font-medium">{anexo!.nome_arquivo}</p></div>
                  <p className="mt-1 text-xs text-slate-500">{anexo!.descricao}</p>
                </div>
              ))}
              <label className="flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-slate-300 bg-slate-50 p-4 text-center text-sm text-slate-600">
                <Paperclip className="mb-2 text-slate-400" size={22} />
                Upload de novo anexo
                <input className="hidden" type="file" multiple />
              </label>
              <select className="field" defaultValue=""><option value="">Vincular anexo ja enviado</option>{anexos.map((anexo) => <option key={anexo.id}>{anexo.nome_arquivo}</option>)}</select>
            </CardContent>
          </Card>
        </aside>
      </section>
    </>
  );
}

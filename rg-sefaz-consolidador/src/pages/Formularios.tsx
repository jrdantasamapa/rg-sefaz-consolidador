import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { ColumnDef } from "@tanstack/react-table";
import { ClipboardList, FileText } from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { TextBadge } from "../components/ui/Badge";
import { FormSection, FormShell } from "../components/forms/FormShell";
import { EditableDataTable, editableCell, editableTextArea } from "../components/forms/EditableDataTable";
import { ValidationPanel } from "../components/forms/ValidationPanel";
import {
  anexos,
  arrecadacaoRelatorio,
  contratosRelatorio,
  controleInternoRelatorio,
  execucoesOrcamentarias,
  fiscalizacaoRelatorio,
  gestaoPessoasRelatorio,
  indicadoresRelatorio,
  informacoesConsolidadas,
  itensRelatorio,
  patrimonioRelatorio,
  programasProjetosRelatorio,
  setores,
  tiposFormulario,
} from "../data/mockData";
import { parteLabels } from "../lib/utils";
import type {
  ContratoRelatorio,
  ControleInternoRelatorio,
  ExecucaoOrcamentaria,
  GestaoPessoasRelatorio,
  IndicadorRelatorio,
  PatrimonioRelatorio,
  ProgramaProjetoRelatorio,
} from "../types/database";

const textoTecnicoSchema = z.object({
  responsavel_informacao_nome: z.string().min(1, "Informe o responsavel."),
  fonte_informacao: z.string().min(1, "Informe a fonte."),
  texto_tecnico_consolidado: z.string().optional(),
  texto_original_recebido: z.string().optional(),
  principais_resultados: z.string().optional(),
  status: z.string().optional(),
  responsavel_informacao_cargo: z.string().optional(),
  observacoes_consolidacao: z.string().optional(),
});

function formatMoney(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function Formularios() {
  const { itemId } = useParams();
  const item = itensRelatorio.find((entry) => entry.id === itemId) ?? itensRelatorio[0];
  const tipo = tiposFormulario.find((entry) => entry.codigo === item.tipo_formulario_id)!;
  const info = informacoesConsolidadas.find((entry) => entry.item_id === item.id);
  const setor = setores.find((entry) => entry.id === (info?.setor_id ?? item.setor_responsavel_padrao_id))!;

  const alerts = [
    !info?.fonte_informacao ? "Sem fonte" : "",
    !info?.responsavel_informacao_nome ? "Sem responsavel" : "",
    !info?.texto_tecnico_consolidado ? "Sem texto tecnico" : "",
    indicadoresRelatorio.filter((indicador) => indicador.informacao_id === info?.id).length === 0 ? "Sem indicador" : "",
  ].filter(Boolean);

  if (!itemId) {
    return <CatalogoFormularios />;
  }

  return (
    <>
      <PageHeader
        title="Formularios Dinamicos"
        description="Formulario operacional selecionado conforme o tipo de informacao exigido para o item do relatorio."
      />

      <section className="grid gap-6 xl:grid-cols-[1fr_340px]">
        <div>
          <FormShell title={tipo.nome} description={tipo.descricao} status={info?.status ?? "pendente"} alerts={alerts}>
            <div className="mb-5 flex flex-wrap gap-2">
              <TextBadge>{item.codigo}</TextBadge>
              <TextBadge>{parteLabels[item.parte]}</TextBadge>
              <TextBadge>{setor.sigla}</TextBadge>
            </div>
            <DynamicFormBody itemId={item.id} informacaoId={info?.id} tipo={item.tipo_formulario_id} />
          </FormShell>
        </div>

        <aside className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Item selecionado</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div><p className="text-slate-500">Item</p><p className="font-semibold">{item.codigo} - {item.titulo}</p></div>
              <div><p className="text-slate-500">Setor</p><p className="font-medium">{setor.nome}</p></div>
              <div><p className="text-slate-500">Tipo de formulario</p><p className="font-medium">{tipo.nome}</p></div>
              <Link className="inline-flex rounded-md border border-slate-200 px-3 py-2 text-sm font-medium hover:bg-slate-50" to="/formularios">Trocar item</Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Validacoes</CardTitle></CardHeader>
            <CardContent>
              <ValidationPanel
                items={[
                  { label: "Texto tecnico ou tabela", ok: Boolean(info?.texto_tecnico_consolidado || hasTabela(item.tipo_formulario_id, info?.id)) },
                  { label: "Responsavel informado", ok: Boolean(info?.responsavel_informacao_nome) },
                  { label: "Fonte informada", ok: Boolean(info?.fonte_informacao) },
                ]}
              />
            </CardContent>
          </Card>
        </aside>
      </section>
    </>
  );
}

function CatalogoFormularios() {
  return (
    <>
      <PageHeader title="Formularios Dinamicos" description="Escolha um item do relatorio. Cada item abre o formulario especializado correspondente." />
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {itensRelatorio.map((item) => {
          const tipo = tiposFormulario.find((entry) => entry.codigo === item.tipo_formulario_id)!;
          const setor = setores.find((entry) => entry.id === item.setor_responsavel_padrao_id)!;
          return (
            <Link key={item.id} to={`/formularios/${item.id}`} className="rounded-lg border border-slate-200 bg-white p-5 shadow-subtle transition hover:border-brand-200 hover:bg-brand-50/40">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-50 text-brand-700"><ClipboardList size={20} /></div>
                <div>
                  <p className="font-semibold text-ink">{item.codigo} - {item.titulo}</p>
                  <p className="mt-1 text-sm text-slate-600">{tipo.nome}</p>
                  <p className="mt-2 text-xs text-slate-500">{setor.sigla} | {parteLabels[item.parte]}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </section>
    </>
  );
}

function DynamicFormBody({ tipo, itemId, informacaoId }: { tipo: string; itemId: string; informacaoId?: string }) {
  if (tipo === "INDICADORES") return <IndicadoresForm informacaoId={informacaoId} />;
  if (tipo === "EXECUCAO_ORCAMENTARIA") return <ExecucaoOrcamentariaForm informacaoId={informacaoId} />;
  if (tipo === "CONTRATOS_LICITACOES") return <ContratosForm informacaoId={informacaoId} />;
  if (tipo === "PATRIMONIO") return <PatrimonioForm informacaoId={informacaoId} />;
  if (tipo === "GESTAO_PESSOAS") return <GestaoPessoasForm informacaoId={informacaoId} />;
  if (tipo === "CONTROLE_INTERNO") return <ControleInternoForm informacaoId={informacaoId} />;
  if (tipo === "ARRECADACAO_FISCALIZACAO") return <ArrecadacaoFiscalizacaoForm informacaoId={informacaoId} />;
  if (tipo === "PROGRAMAS_PROJETOS") return <ProgramasProjetosForm informacaoId={informacaoId} />;
  if (tipo === "EVIDENCIAS_ANEXOS") return <EvidenciasAnexosForm itemId={itemId} />;
  return <TextoTecnicoForm informacaoId={informacaoId} />;
}

function TextoTecnicoForm({ informacaoId }: { informacaoId?: string }) {
  const info = informacoesConsolidadas.find((entry) => entry.id === informacaoId) ?? informacoesConsolidadas[0];
  const { register, formState } = useForm({ resolver: zodResolver(textoTecnicoSchema), defaultValues: info });

  return (
    <form className="space-y-2">
      <FormSection title="Secao 1 - Identificacao">
        <div className="grid gap-4 md:grid-cols-3">
          <label className="block space-y-2"><span className="label">Item do relatorio</span><input className="field" readOnly value={itensRelatorio.find((item) => item.id === info.item_id)?.titulo ?? ""} /></label>
          <label className="block space-y-2"><span className="label">Setor responsavel</span><input className="field" readOnly value={setores.find((setor) => setor.id === info.setor_id)?.nome ?? ""} /></label>
          <label className="block space-y-2"><span className="label">Responsavel pela informacao</span><input className="field" {...register("responsavel_informacao_nome")} /></label>
        </div>
      </FormSection>
      <FormSection title="Secao 2 - Conteudo">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block space-y-2"><span className="label">Texto original recebido</span><textarea className="field min-h-44" {...register("texto_original_recebido")} /></label>
          <label className="block space-y-2"><span className="label">Texto tecnico consolidado</span><textarea className="field min-h-44" {...register("texto_tecnico_consolidado")} /></label>
        </div>
      </FormSection>
      <FormSection title="Secao 3 - Resultados">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block space-y-2"><span className="label">Principais resultados</span><textarea className="field min-h-24" {...register("principais_resultados")} /></label>
          <label className="block space-y-2"><span className="label">Dificuldades encontradas</span><textarea className="field min-h-24" defaultValue={info.justificativa_nao_alcance} /></label>
          <label className="block space-y-2"><span className="label">Providencias adotadas</span><textarea className="field min-h-24" /></label>
          <label className="block space-y-2"><span className="label">Perspectivas futuras</span><textarea className="field min-h-24" /></label>
        </div>
      </FormSection>
      <FormSection title="Secao 4 - Controle">
        <div className="grid gap-4 md:grid-cols-3">
          <label className="block space-y-2"><span className="label">Fonte da informacao</span><input className="field" {...register("fonte_informacao")} /></label>
          <label className="block space-y-2"><span className="label">Status</span><select className="field" {...register("status")}><option value="pendente">Pendente</option><option value="recebido">Recebido</option><option value="em_revisao">Em revisao</option><option value="consolidado">Consolidado</option><option value="aprovado">Aprovado</option><option value="devolvido">Devolvido</option></select></label>
          <label className="block space-y-2"><span className="label">Cargo do responsavel</span><input className="field" {...register("responsavel_informacao_cargo")} /></label>
          <label className="block space-y-2 md:col-span-3"><span className="label">Observacoes da consolidacao</span><textarea className="field min-h-24" {...register("observacoes_consolidacao")} /></label>
        </div>
        {Object.values(formState.errors).length ? <p className="mt-3 text-sm text-amber-700">Ha campos obrigatorios pendentes para consolidacao.</p> : null}
      </FormSection>
    </form>
  );
}

function IndicadoresForm({ informacaoId }: { informacaoId?: string }) {
  const data = indicadoresRelatorio.filter((entry) => entry.informacao_id === informacaoId);
  const columns = useMemo<ColumnDef<IndicadorRelatorio>[]>(() => [
    { accessorKey: "nome", header: "Indicador", cell: ({ row }) => editableCell(row.original.nome) },
    { accessorKey: "formula_calculo", header: "Formula", cell: ({ row }) => editableTextArea(row.original.formula_calculo) },
    { accessorKey: "unidade_medida", header: "Unidade", cell: ({ row }) => editableCell(row.original.unidade_medida) },
    { accessorKey: "periodicidade", header: "Periodicidade", cell: ({ row }) => editableCell(row.original.periodicidade) },
    { accessorKey: "meta_prevista", header: "Meta", cell: ({ row }) => editableCell(row.original.meta_prevista) },
    { accessorKey: "resultado_alcancado", header: "Resultado", cell: ({ row }) => editableCell(row.original.resultado_alcancado) },
    { accessorKey: "percentual_atingido", header: "%", cell: ({ row }) => editableCell(row.original.percentual_atingido) },
    { accessorKey: "tendencia", header: "Tendencia", cell: ({ row }) => editableCell(row.original.tendencia) },
    { accessorKey: "fonte", header: "Fonte", cell: ({ row }) => editableCell(row.original.fonte) },
  ], []);
  return <><TextoTecnicoForm informacaoId={informacaoId} /><FormSection title="Indicadores"><EditableDataTable data={data} columns={columns} emptyLabel="Nenhum indicador cadastrado." /></FormSection></>;
}

function ExecucaoOrcamentariaForm({ informacaoId }: { informacaoId?: string }) {
  const data = execucoesOrcamentarias.filter((entry) => entry.informacao_id === informacaoId);
  const columns = useMemo<ColumnDef<ExecucaoOrcamentaria>[]>(() => [
    { accessorKey: "programa", header: "Programa", cell: ({ row }) => editableCell(row.original.programa) },
    { accessorKey: "acao", header: "Acao", cell: ({ row }) => editableCell(row.original.acao) },
    { accessorKey: "fonte", header: "Fonte", cell: ({ row }) => editableCell(row.original.fonte) },
    { accessorKey: "dotacao_inicial", header: "Dotacao inicial", cell: ({ row }) => editableCell(row.original.dotacao_inicial) },
    { accessorKey: "dotacao_atualizada", header: "Dotacao atualizada", cell: ({ row }) => editableCell(row.original.dotacao_atualizada) },
    { accessorKey: "empenhado", header: "Empenhado", cell: ({ row }) => editableCell(row.original.empenhado) },
    { accessorKey: "liquidado", header: "Liquidado", cell: ({ row }) => editableCell(row.original.liquidado) },
    { accessorKey: "pago", header: "Pago", cell: ({ row }) => editableCell(row.original.pago) },
    { accessorKey: "percentual_executado", header: "% executado", cell: ({ row }) => editableCell(row.original.percentual_executado) },
    { accessorKey: "justificativa", header: "Justificativa", cell: ({ row }) => editableTextArea(row.original.justificativa) },
  ], []);
  return <><TextoTecnicoForm informacaoId={informacaoId} /><FormSection title="Tabela editavel - LOA, QDD, execucao financeira e restos a pagar"><EditableDataTable data={data} columns={columns} emptyLabel="Nenhuma linha de execucao cadastrada." /></FormSection></>;
}

function ContratosForm({ informacaoId }: { informacaoId?: string }) {
  const columns = useMemo<ColumnDef<ContratoRelatorio>[]>(() => [
    { accessorKey: "numero_processo", header: "Processo", cell: ({ row }) => editableCell(row.original.numero_processo) },
    { accessorKey: "numero_contrato", header: "Contrato", cell: ({ row }) => editableCell(row.original.numero_contrato) },
    { accessorKey: "objeto", header: "Objeto", cell: ({ row }) => editableTextArea(row.original.objeto) },
    { accessorKey: "modalidade", header: "Modalidade", cell: ({ row }) => editableCell(row.original.modalidade) },
    { accessorKey: "contratado", header: "Contratado", cell: ({ row }) => editableCell(row.original.contratado) },
    { accessorKey: "valor", header: "Valor", cell: ({ row }) => editableCell(row.original.valor) },
    { accessorKey: "vigencia", header: "Vigencia", cell: ({ row }) => editableCell(row.original.vigencia) },
    { accessorKey: "status", header: "Status", cell: ({ row }) => editableCell(row.original.status) },
    { accessorKey: "fiscal", header: "Fiscal", cell: ({ row }) => editableCell(row.original.fiscal) },
    { accessorKey: "gestor", header: "Gestor", cell: ({ row }) => editableCell(row.original.gestor) },
  ], []);
  return <><TextoTecnicoForm informacaoId={informacaoId} /><FormSection title="Contratos e licitacoes"><EditableDataTable data={contratosRelatorio.filter((entry) => entry.informacao_id === informacaoId)} columns={columns} emptyLabel="Nenhum contrato cadastrado." /></FormSection></>;
}

function PatrimonioForm({ informacaoId }: { informacaoId?: string }) {
  const columns = useMemo<ColumnDef<PatrimonioRelatorio>[]>(() => [
    { accessorKey: "tipo_bem", header: "Tipo do bem", cell: ({ row }) => editableCell(row.original.tipo_bem) },
    { accessorKey: "descricao", header: "Descricao", cell: ({ row }) => editableTextArea(row.original.descricao) },
    { accessorKey: "quantidade", header: "Quantidade", cell: ({ row }) => editableCell(row.original.quantidade) },
    { accessorKey: "situacao", header: "Situacao", cell: ({ row }) => editableCell(row.original.situacao) },
    { accessorKey: "localizacao", header: "Localizacao", cell: ({ row }) => editableCell(row.original.localizacao) },
    { accessorKey: "valor_estimado", header: "Valor estimado", cell: ({ row }) => editableCell(row.original.valor_estimado) },
  ], []);
  return <><TextoTecnicoForm informacaoId={informacaoId} /><FormSection title="Patrimonio"><EditableDataTable data={patrimonioRelatorio.filter((entry) => entry.informacao_id === informacaoId)} columns={columns} emptyLabel="Nenhum bem cadastrado." /></FormSection></>;
}

function GestaoPessoasForm({ informacaoId }: { informacaoId?: string }) {
  const data = gestaoPessoasRelatorio.find((entry) => entry.informacao_id === informacaoId) ?? gestaoPessoasRelatorio[0];
  const fields: Array<[keyof GestaoPessoasRelatorio, string]> = [["servidores_efetivos", "Servidores efetivos"], ["comissionados", "Comissionados"], ["temporarios", "Temporarios"], ["terceirizados", "Terceirizados"], ["estagiarios", "Estagiarios"], ["capacitacoes_realizadas", "Capacitacoes realizadas"], ["afastamentos", "Afastamentos"], ["aposentadorias", "Aposentadorias"]];
  return <><TextoTecnicoForm informacaoId={informacaoId} /><FormSection title="Gestao de pessoas"><div className="grid gap-4 md:grid-cols-4">{fields.map(([key, label]) => <label key={key} className="block space-y-2"><span className="label">{label}</span><input className="field" defaultValue={String(data[key])} type="number" /></label>)}<label className="block space-y-2 md:col-span-4"><span className="label">Observacoes</span><textarea className="field min-h-24" defaultValue={data.observacoes} /></label></div></FormSection></>;
}

function ControleInternoForm({ informacaoId }: { informacaoId?: string }) {
  const columns = useMemo<ColumnDef<ControleInternoRelatorio>[]>(() => [
    { accessorKey: "orgao_controle", header: "Orgao", cell: ({ row }) => editableCell(row.original.orgao_controle) },
    { accessorKey: "numero_recomendacao_acordao", header: "Recomendacao/Acordao", cell: ({ row }) => editableCell(row.original.numero_recomendacao_acordao) },
    { accessorKey: "objeto", header: "Objeto", cell: ({ row }) => editableTextArea(row.original.objeto) },
    { accessorKey: "situacao", header: "Situacao", cell: ({ row }) => editableCell(row.original.situacao) },
    { accessorKey: "providencias_adotadas", header: "Providencias", cell: ({ row }) => editableTextArea(row.original.providencias_adotadas) },
    { accessorKey: "responsavel", header: "Responsavel", cell: ({ row }) => editableCell(row.original.responsavel) },
    { accessorKey: "prazo", header: "Prazo", cell: ({ row }) => editableCell(row.original.prazo) },
    { accessorKey: "status_atendimento", header: "Atendimento", cell: ({ row }) => editableCell(row.original.status_atendimento) },
  ], []);
  return <><TextoTecnicoForm informacaoId={informacaoId} /><FormSection title="Controle interno"><EditableDataTable data={controleInternoRelatorio.filter((entry) => entry.informacao_id === informacaoId)} columns={columns} emptyLabel="Nenhuma recomendacao cadastrada." /></FormSection></>;
}

function ArrecadacaoFiscalizacaoForm({ informacaoId }: { informacaoId?: string }) {
  const arrecadacao = arrecadacaoRelatorio.find((entry) => entry.informacao_id === informacaoId) ?? arrecadacaoRelatorio[0];
  const fiscalizacao = fiscalizacaoRelatorio.find((entry) => entry.informacao_id === informacaoId) ?? fiscalizacaoRelatorio[0];
  return (
    <>
      <TextoTecnicoForm informacaoId={informacaoId} />
      <FormSection title="Arrecadacao">
        <div className="grid gap-4 md:grid-cols-3">
          <label className="block space-y-2"><span className="label">Tipo de receita</span><input className="field" defaultValue={arrecadacao.tipo_receita} /></label>
          <label className="block space-y-2"><span className="label">Arrecadacao prevista</span><input className="field" defaultValue={formatMoney(arrecadacao.arrecadacao_prevista)} /></label>
          <label className="block space-y-2"><span className="label">Arrecadacao realizada</span><input className="field" defaultValue={formatMoney(arrecadacao.arrecadacao_realizada)} /></label>
          <label className="block space-y-2"><span className="label">Variacao percentual</span><input className="field" defaultValue={arrecadacao.variacao_percentual} /></label>
          <label className="block space-y-2 md:col-span-2"><span className="label">Beneficios fiscais</span><input className="field" defaultValue={arrecadacao.beneficios_fiscais} /></label>
          <label className="block space-y-2 md:col-span-3"><span className="label">Analise tecnica dos resultados</span><textarea className="field min-h-24" defaultValue={arrecadacao.analise_tecnica_resultados} /></label>
        </div>
      </FormSection>
      <FormSection title="Fiscalizacao">
        <div className="grid gap-4 md:grid-cols-3">
          <label className="block space-y-2"><span className="label">Acoes de fiscalizacao</span><input className="field" defaultValue={fiscalizacao.acoes_fiscalizacao} /></label>
          <label className="block space-y-2"><span className="label">Quantidade de autos</span><input className="field" defaultValue={fiscalizacao.quantidade_autos} /></label>
          <label className="block space-y-2"><span className="label">Valor recuperado</span><input className="field" defaultValue={formatMoney(fiscalizacao.valor_recuperado)} /></label>
          <label className="block space-y-2 md:col-span-3"><span className="label">Operacoes realizadas</span><textarea className="field min-h-24" defaultValue={fiscalizacao.operacoes_realizadas} /></label>
        </div>
      </FormSection>
    </>
  );
}

function ProgramasProjetosForm({ informacaoId }: { informacaoId?: string }) {
  const columns = useMemo<ColumnDef<ProgramaProjetoRelatorio>[]>(() => [
    { accessorKey: "programa_projeto", header: "Programa/projeto", cell: ({ row }) => editableCell(row.original.programa_projeto) },
    { accessorKey: "objetivo", header: "Objetivo", cell: ({ row }) => editableTextArea(row.original.objetivo) },
    { accessorKey: "meta", header: "Meta", cell: ({ row }) => editableTextArea(row.original.meta) },
    { accessorKey: "execucao_fisica", header: "Execucao fisica", cell: ({ row }) => editableTextArea(row.original.execucao_fisica) },
    { accessorKey: "execucao_financeira", header: "Execucao financeira", cell: ({ row }) => editableTextArea(row.original.execucao_financeira) },
    { accessorKey: "resultados", header: "Resultados", cell: ({ row }) => editableTextArea(row.original.resultados) },
    { accessorKey: "dificuldades", header: "Dificuldades", cell: ({ row }) => editableTextArea(row.original.dificuldades) },
    { accessorKey: "proximos_passos", header: "Proximos passos", cell: ({ row }) => editableTextArea(row.original.proximos_passos) },
  ], []);
  return <><TextoTecnicoForm informacaoId={informacaoId} /><FormSection title="Programas e projetos"><EditableDataTable data={programasProjetosRelatorio.filter((entry) => entry.informacao_id === informacaoId)} columns={columns} emptyLabel="Nenhum programa/projeto cadastrado." /></FormSection></>;
}

function EvidenciasAnexosForm({ itemId }: { itemId: string }) {
  return (
    <>
      <FormSection title="Upload multiplo e vinculos">
        <div className="grid gap-4 md:grid-cols-[1fr_260px]">
          <label className="flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-slate-300 bg-slate-50 p-4 text-center text-sm text-slate-600">
            <FileText className="mb-2 text-slate-400" size={24} />
            Selecionar multiplos arquivos
            <input className="hidden" multiple type="file" />
          </label>
          <div className="space-y-3">
            <input className="field" placeholder="Fonte" />
            <textarea className="field min-h-24" placeholder="Observacao" />
          </div>
        </div>
      </FormSection>
      <FormSection title="Arquivos vinculaveis">
        <div className="grid gap-3 md:grid-cols-2">
          {anexos.map((anexo) => (
            <div key={anexo.id} className="rounded-md border border-slate-200 p-3">
              <p className="font-medium">{anexo.nome_arquivo}</p>
              <p className="mt-1 text-xs text-slate-500">{anexo.descricao}</p>
              <div className="mt-3 grid gap-2">
                <select className="field" defaultValue={itemId}><option value={itemId}>Vincular ao item atual</option></select>
                <select className="field" defaultValue=""><option value="">Vincular a indicador/contrato/execucao</option><option>Indicador</option><option>Contrato</option><option>Execucao orcamentaria</option></select>
              </div>
              <div className="mt-3 flex gap-2"><button className="rounded-md border border-slate-200 px-3 py-2 text-xs font-medium">Preview</button><button className="rounded-md border border-slate-200 px-3 py-2 text-xs font-medium">Download</button></div>
            </div>
          ))}
        </div>
      </FormSection>
    </>
  );
}

function hasTabela(tipo: string, informacaoId?: string) {
  if (!informacaoId) return false;
  if (tipo === "INDICADORES") return indicadoresRelatorio.some((entry) => entry.informacao_id === informacaoId);
  if (tipo === "EXECUCAO_ORCAMENTARIA") return execucoesOrcamentarias.some((entry) => entry.informacao_id === informacaoId);
  if (tipo === "CONTRATOS_LICITACOES") return contratosRelatorio.some((entry) => entry.informacao_id === informacaoId);
  if (tipo === "PATRIMONIO") return patrimonioRelatorio.some((entry) => entry.informacao_id === informacaoId);
  if (tipo === "GESTAO_PESSOAS") return gestaoPessoasRelatorio.some((entry) => entry.informacao_id === informacaoId);
  if (tipo === "CONTROLE_INTERNO") return controleInternoRelatorio.some((entry) => entry.informacao_id === informacaoId);
  if (tipo === "ARRECADACAO_FISCALIZACAO") return arrecadacaoRelatorio.some((entry) => entry.informacao_id === informacaoId) || fiscalizacaoRelatorio.some((entry) => entry.informacao_id === informacaoId);
  if (tipo === "PROGRAMAS_PROJETOS") return programasProjetosRelatorio.some((entry) => entry.informacao_id === informacaoId);
  return false;
}

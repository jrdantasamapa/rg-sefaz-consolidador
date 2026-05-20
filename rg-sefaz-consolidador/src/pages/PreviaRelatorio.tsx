import { Download, Printer } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { PageHeader } from "../components/ui/PageHeader";
import {
  anexos,
  anexosVinculos,
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
} from "../data/mockData";
import { parteLabels } from "../lib/utils";
import type { ParteRelatorio } from "../types/database";

const partes: ParteRelatorio[] = ["geral", "especifica", "apendice", "anexo"];

export function PreviaRelatorio() {
  return (
    <>
      <PageHeader
        title="Previa do Relatorio"
        description="Estrutura consolidada em ordem, preparada para futura exportacao DOCX/PDF."
        actions={<><Button variant="secondary"><Printer size={16} /> Imprimir previa</Button><Button variant="secondary"><Download size={16} /> Exportacao futura</Button></>}
      />
      <Card>
        <CardContent>
          <article className="mx-auto max-w-5xl space-y-9">
            <header className="border-b border-slate-200 pb-6 text-center">
              <p className="text-sm font-semibold uppercase text-brand-700">Secretaria de Estado da Fazenda do Amapa</p>
              <h2 className="mt-2 text-2xl font-semibold text-ink">Relatorio de Gestao - Exercicio 2025</h2>
              <p className="mt-2 text-sm text-slate-600">Previa consolidada a partir das informacoes normalizadas</p>
            </header>

            {partes.map((parte) => (
              <section key={parte} className="space-y-5">
                <h3 className="text-xl font-semibold text-ink">{parteLabels[parte]}</h3>
                {itensRelatorio.filter((item) => item.parte === parte).map((item) => {
                  const info = informacoesConsolidadas.find((entry) => entry.item_id === item.id);
                  const indicadoresInfo = info ? indicadoresRelatorio.filter((indicador) => indicador.informacao_id === info.id) : [];
                  const execucoes = info ? execucoesOrcamentarias.filter((entry) => entry.informacao_id === info.id) : [];
                  const contratos = info ? contratosRelatorio.filter((entry) => entry.informacao_id === info.id) : [];
                  const patrimonio = info ? patrimonioRelatorio.filter((entry) => entry.informacao_id === info.id) : [];
                  const pessoas = info ? gestaoPessoasRelatorio.filter((entry) => entry.informacao_id === info.id) : [];
                  const controle = info ? controleInternoRelatorio.filter((entry) => entry.informacao_id === info.id) : [];
                  const arrecadacao = info ? arrecadacaoRelatorio.filter((entry) => entry.informacao_id === info.id) : [];
                  const fiscalizacao = info ? fiscalizacaoRelatorio.filter((entry) => entry.informacao_id === info.id) : [];
                  const programas = info ? programasProjetosRelatorio.filter((entry) => entry.informacao_id === info.id) : [];
                  const evidencias = anexosVinculos
                    .filter((vinculo) => vinculo.item_id === item.id && (!info || vinculo.informacao_id === info.id))
                    .map((vinculo) => anexos.find((anexo) => anexo.id === vinculo.anexo_id))
                    .filter(Boolean);
                  return (
                    <div key={item.id} className="border-l-4 border-brand-500 bg-slate-50 p-4">
                      <h4 className="font-semibold">{item.codigo} - {item.titulo}</h4>
                      <p className="mt-3 text-sm leading-6 text-slate-700">{info?.texto_tecnico_consolidado || "Texto tecnico consolidado pendente."}</p>
                      {info?.principais_resultados ? <p className="mt-3 text-sm leading-6 text-slate-700"><strong>Principais resultados:</strong> {info.principais_resultados}</p> : null}
                      {indicadoresInfo.length > 0 ? (
                        <div className="mt-4 overflow-x-auto">
                          <table className="w-full min-w-[640px] text-left text-xs">
                            <thead className="uppercase text-slate-500"><tr><th className="pb-2">Indicador</th><th className="pb-2">Unidade</th><th className="pb-2">Meta</th><th className="pb-2">Resultado</th><th className="pb-2">% atingido</th></tr></thead>
                            <tbody className="divide-y divide-slate-200">{indicadoresInfo.map((indicador) => <tr key={indicador.id}><td className="py-2">{indicador.nome}</td><td className="py-2">{indicador.unidade_medida}</td><td className="py-2">{indicador.meta_prevista}</td><td className="py-2">{indicador.resultado_alcancado}</td><td className="py-2">{indicador.percentual_atingido}%</td></tr>)}</tbody>
                          </table>
                        </div>
                      ) : null}
                      {execucoes.length > 0 ? <ResumoTabela titulo="Execucao orcamentaria" linhas={execucoes.map((entry) => `${entry.programa} | ${entry.acao} | empenhado: ${entry.empenhado.toLocaleString("pt-BR")} | pago: ${entry.pago.toLocaleString("pt-BR")}`)} /> : null}
                      {contratos.length > 0 ? <ResumoTabela titulo="Contratos e licitacoes" linhas={contratos.map((entry) => `${entry.numero_contrato} | ${entry.objeto} | ${entry.contratado} | ${entry.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`)} /> : null}
                      {patrimonio.length > 0 ? <ResumoTabela titulo="Patrimonio" linhas={patrimonio.map((entry) => `${entry.tipo_bem} | ${entry.descricao} | qtd. ${entry.quantidade} | ${entry.situacao}`)} /> : null}
                      {pessoas.length > 0 ? <ResumoTabela titulo="Gestao de pessoas" linhas={pessoas.map((entry) => `Efetivos: ${entry.servidores_efetivos}; comissionados: ${entry.comissionados}; terceirizados: ${entry.terceirizados}; capacitacoes: ${entry.capacitacoes_realizadas}`)} /> : null}
                      {controle.length > 0 ? <ResumoTabela titulo="Controle interno" linhas={controle.map((entry) => `${entry.orgao_controle} | ${entry.numero_recomendacao_acordao} | ${entry.status_atendimento}`)} /> : null}
                      {arrecadacao.length > 0 ? <ResumoTabela titulo="Arrecadacao" linhas={arrecadacao.map((entry) => `${entry.tipo_receita} | previsto: ${entry.arrecadacao_prevista.toLocaleString("pt-BR")} | realizado: ${entry.arrecadacao_realizada.toLocaleString("pt-BR")} | variacao: ${entry.variacao_percentual}%`)} /> : null}
                      {fiscalizacao.length > 0 ? <ResumoTabela titulo="Fiscalizacao" linhas={fiscalizacao.map((entry) => `${entry.acoes_fiscalizacao} | autos: ${entry.quantidade_autos} | recuperado: ${entry.valor_recuperado.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`)} /> : null}
                      {programas.length > 0 ? <ResumoTabela titulo="Programas e projetos" linhas={programas.map((entry) => `${entry.programa_projeto} | ${entry.objetivo} | ${entry.resultados}`)} /> : null}
                      <div className="mt-4 text-xs leading-5 text-slate-600">
                        <p><strong>Fonte:</strong> {info?.fonte_informacao || "Nao informada"}</p>
                        <p><strong>Evidencias:</strong> {evidencias.length ? evidencias.map((anexo) => anexo!.nome_arquivo).join("; ") : "Sem evidencia vinculada"}</p>
                      </div>
                    </div>
                  );
                })}
              </section>
            ))}
          </article>
        </CardContent>
      </Card>
    </>
  );
}

function ResumoTabela({ titulo, linhas }: { titulo: string; linhas: string[] }) {
  return (
    <div className="mt-4 rounded-md border border-slate-200 bg-white p-3">
      <p className="text-sm font-semibold text-ink">{titulo}</p>
      <ul className="mt-2 space-y-1 text-xs leading-5 text-slate-600">
        {linhas.map((linha) => <li key={linha}>{linha}</li>)}
      </ul>
    </div>
  );
}

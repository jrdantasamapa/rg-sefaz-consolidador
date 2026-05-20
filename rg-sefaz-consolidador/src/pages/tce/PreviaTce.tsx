import { Download, Printer } from "lucide-react";
import { PageHeader } from "../../components/ui/PageHeader";
import { Button } from "../../components/ui/Button";
import { Card, CardContent } from "../../components/ui/Card";
import { atribuicoesTce, evidenciasTce, itensTce, relatorioRequisitos, respostasTce } from "../../data/tceData";
import { parteTceLabels } from "../../components/tce/TceBadges";
import type { ParteTce } from "../../types/database";

const partes: ParteTce[] = ["estrutura_formal", "geral", "especifica", "apendice", "anexo", "rol_responsaveis"];

export function PreviaTce() {
  return (
    <>
      <PageHeader
        title="Previa do Relatorio de Gestao"
        description="Minuta estruturada conforme DN TCE/AP no 029/2025, preparada para futura exportacao DOCX/PDF pesquisavel."
        actions={<><Button variant="secondary"><Printer size={16} /> Visualizar minuta</Button><Button variant="secondary"><Download size={16} /> Exportacao futura</Button></>}
      />
      <Card>
        <CardContent>
          <article className="mx-auto max-w-5xl space-y-9 bg-white text-ink">
            <header className="border-b border-slate-200 pb-6 text-center">
              <p className="text-sm font-semibold uppercase text-brand-700">SEFAZ/AP, SARE, SATE e FUNDA/AP</p>
              <h2 className="mt-2 text-2xl font-semibold">Relatorio de gestao de 2025_SEFAZ</h2>
              <p className="mt-2 text-sm text-slate-600">Minuta de arquivo unico em PDF, com rol de responsaveis destacado</p>
            </header>
            <section className="rounded-md border border-slate-200 bg-slate-50 p-4">
              <h3 className="font-semibold">Requisitos formais controlados</h3>
              <ul className="mt-2 grid gap-1 text-sm leading-6 text-slate-700 md:grid-cols-2">
                {relatorioRequisitos.map((requisito) => <li key={requisito}>{requisito}</li>)}
              </ul>
            </section>
            {partes.map((parte) => (
              <section key={parte} className="space-y-4">
                <h3 className="text-xl font-semibold">{parteTceLabels[parte]}</h3>
                {itensTce.filter((item) => item.parte === parte).map((item) => {
                  const atribuicao = atribuicoesTce.find((entry) => entry.item_tce_id === item.id);
                  const resposta = respostasTce.find((entry) => entry.atribuicao_id === atribuicao?.id);
                  const evidencias = evidenciasTce.filter((entry) => entry.item_tce_id === item.id);
                  return (
                    <div key={item.id} className="border-l-4 border-brand-500 bg-slate-50 p-4">
                      <h4 className="font-semibold">{item.codigo}. {item.titulo}</h4>
                      <p className="mt-2 text-sm leading-6 text-slate-700">{resposta?.texto_consolidado || "Conteudo consolidado pendente."}</p>
                      {resposta?.resposta_json ? <StructuredAnswer data={resposta.resposta_json} /> : null}
                      <p className="mt-3 text-xs text-slate-600"><strong>Fonte:</strong> {resposta?.fonte_informacao || "Nao informada"}</p>
                      <p className="text-xs text-slate-600"><strong>Evidencias:</strong> {evidencias.length ? evidencias.map((e) => e.nome_arquivo).join("; ") : "Sem evidencia vinculada"}</p>
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

function StructuredAnswer({ data }: { data: Record<string, unknown> }) {
  const entries = Object.entries(data);
  if (!entries.length) return null;
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full min-w-[640px] text-left text-xs">
        <thead className="uppercase text-slate-500"><tr><th className="pb-2">Campo</th><th className="pb-2">Informacao</th></tr></thead>
        <tbody className="divide-y divide-slate-200">
          {entries.map(([key, value]) => <tr key={key}><td className="py-2 font-medium">{key}</td><td className="py-2">{String(value)}</td></tr>)}
        </tbody>
      </table>
    </div>
  );
}

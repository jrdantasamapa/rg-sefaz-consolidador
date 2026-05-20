import { Link } from "react-router-dom";
import { ArrowRight, UserPlus } from "lucide-react";
import { PageHeader } from "../../components/ui/PageHeader";
import { Card, CardContent } from "../../components/ui/Card";
import { ParteTceBadge, StatusTceBadge, TipoRespostaBadge } from "../../components/tce/TceBadges";
import { atribuicoesTce, itensTce } from "../../data/tceData";
import { setores } from "../../data/mockData";
import type { ParteTce } from "../../types/database";

const partes: ParteTce[] = ["estrutura_formal", "geral", "especifica", "apendice", "anexo", "rol_responsaveis"];

export function ItensTce() {
  return (
    <>
      <PageHeader
        title="Itens obrigatorios do TCE"
        description="Lista hierarquica das exigencias da DN TCE/AP no 029/2025, com atribuicao, responsavel, status e formulario especifico."
      />
      <Card>
        <CardContent>
          <div className="mb-5 grid gap-3 md:grid-cols-4">
            <select className="field" defaultValue=""><option value="">Todas as partes</option>{partes.map((parte) => <option key={parte}>{parte}</option>)}</select>
            <select className="field" defaultValue=""><option value="">Todos os status</option><option>Nao atribuido</option><option>Atribuido</option><option>Em revisao</option><option>Aprovado</option></select>
            <select className="field" defaultValue=""><option value="">Todos os setores</option>{setores.map((setor) => <option key={setor.id}>{setor.sigla}</option>)}</select>
            <input className="field" placeholder="Buscar codigo, titulo ou responsavel" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1040px] text-left text-sm">
              <thead className="text-xs uppercase text-slate-500">
                <tr><th className="pb-3">Item</th><th className="pb-3">Parte</th><th className="pb-3">Unidade</th><th className="pb-3">Tipo</th><th className="pb-3">Setor</th><th className="pb-3">Responsavel</th><th className="pb-3">Status</th><th className="pb-3">Acoes</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {itensTce.map((item) => {
                  const atribuicao = atribuicoesTce.find((entry) => entry.item_tce_id === item.id);
                  const setor = atribuicao ? setores.find((entry) => entry.id === atribuicao.setor_id) : undefined;
                  return (
                    <tr key={item.id}>
                      <td className="py-3">
                        <p className="font-semibold">{item.codigo} - {item.titulo}</p>
                        <p className="mt-1 text-xs text-slate-500">{item.observacao_orientativa}</p>
                      </td>
                      <td className="py-3"><ParteTceBadge parte={item.parte} /></td>
                      <td className="py-3">{item.unidade_consolidada}</td>
                      <td className="py-3"><TipoRespostaBadge tipo={item.tipo_resposta} /></td>
                      <td className="py-3">{setor?.sigla ?? "-"}</td>
                      <td className="py-3">{atribuicao?.responsavel_nome ?? "-"}</td>
                      <td className="py-3"><StatusTceBadge status={atribuicao?.status ?? "nao_atribuido"} /></td>
                      <td className="py-3">
                        <div className="flex flex-wrap gap-2">
                          <Link className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 font-medium hover:bg-slate-50" to={`/tce/atribuir/${item.id}`}><UserPlus size={15} /> Atribuir</Link>
                          <Link className="inline-flex items-center gap-2 rounded-md bg-brand-600 px-3 py-2 font-medium text-white hover:bg-brand-700" to={`/tce/responder/${item.id}`}><ArrowRight size={15} /> Responder</Link>
                        </div>
                      </td>
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

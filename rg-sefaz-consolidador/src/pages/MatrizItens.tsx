import { Edit3, Filter, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { CriticidadeBadge, StatusBadge, TextBadge } from "../components/ui/Badge";
import { PageHeader } from "../components/ui/PageHeader";
import { informacoesConsolidadas, itensRelatorio, setores, tiposFormulario } from "../data/mockData";
import { parteLabels } from "../lib/utils";

export function MatrizItens() {
  return (
    <>
      <PageHeader
        title="Itens do Relatorio"
        description="Cadastre, filtre e abra os itens para normalizar as informacoes recebidas dos setores."
        actions={<><Button variant="secondary"><Filter size={16} /> Filtros</Button><Button><Plus size={16} /> Novo item</Button></>}
      />

      <Card>
        <CardContent>
          <div className="mb-5 grid gap-3 md:grid-cols-4">
            <select className="field" defaultValue=""><option value="">Todas as partes</option><option>Geral</option><option>Especifica</option><option>Apendice</option><option>Anexo</option></select>
            <select className="field" defaultValue=""><option value="">Todos os status</option><option>Pendente</option><option>Recebido</option><option>Em revisao</option><option>Consolidado</option><option>Aprovado</option><option>Devolvido</option></select>
            <select className="field" defaultValue=""><option value="">Todos os setores</option>{setores.map((setor) => <option key={setor.id}>{setor.sigla}</option>)}</select>
            <input className="field" placeholder="Buscar por codigo ou titulo" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-left text-sm">
              <thead className="text-xs uppercase text-slate-500">
                <tr>
                  <th className="pb-3">Ordem</th>
                  <th className="pb-3">Item</th>
                  <th className="pb-3">Parte</th>
                  <th className="pb-3">Setor padrao</th>
                  <th className="pb-3">Formulario</th>
                  <th className="pb-3">Criticidade</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Acao</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {itensRelatorio.map((item) => {
                  const setor = setores.find((entry) => entry.id === item.setor_responsavel_padrao_id)!;
                  const info = informacoesConsolidadas.find((entry) => entry.item_id === item.id);
                  const tipo = tiposFormulario.find((entry) => entry.codigo === item.tipo_formulario_id)!;
                  return (
                    <tr key={item.id}>
                      <td className="py-3">{item.ordem}</td>
                      <td className="py-3">
                        <p className="font-semibold">{item.codigo} - {item.titulo}</p>
                        <p className="mt-1 text-xs text-slate-500">{item.descricao}</p>
                      </td>
                      <td className="py-3"><TextBadge>{parteLabels[item.parte]}</TextBadge></td>
                      <td className="py-3">{setor.sigla}</td>
                      <td className="py-3">{tipo.nome}</td>
                      <td className="py-3"><CriticidadeBadge criticidade={item.criticidade} /></td>
                      <td className="py-3">{info ? <StatusBadge status={info.status} /> : <StatusBadge status="pendente" />}</td>
                      <td className="py-3">
                        <Link className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm font-medium hover:bg-slate-50" to={`/formularios/${item.id}`}>
                          <Edit3 size={15} /> Abrir
                        </Link>
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

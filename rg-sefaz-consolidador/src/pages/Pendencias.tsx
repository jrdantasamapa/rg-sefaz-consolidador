import { Search } from "lucide-react";
import { Card, CardContent } from "../components/ui/Card";
import { PageHeader } from "../components/ui/PageHeader";
import { StatusBadge } from "../components/ui/Badge";
import { informacoesConsolidadas, itensRelatorio, setores } from "../data/mockData";

export function Pendencias() {
  const pendencias = informacoesConsolidadas.filter((info) => !["consolidado", "aprovado"].includes(info.status));

  return (
    <>
      <PageHeader title="Pendencias" description="Itens e informacoes que ainda precisam de fonte, evidencia, revisao ou consolidacao." />
      <Card>
        <CardContent>
          <div className="mb-5 grid gap-3 md:grid-cols-[1fr_220px_220px]">
            <div className="relative"><Search className="absolute left-3 top-2.5 text-slate-400" size={18} /><input className="field pl-10" placeholder="Buscar por item, setor ou observacao" /></div>
            <select className="field" defaultValue=""><option value="">Todos os setores</option>{setores.map((setor) => <option key={setor.id}>{setor.sigla}</option>)}</select>
            <select className="field" defaultValue=""><option value="">Todos os status</option><option>Pendente</option><option>Recebido</option><option>Em revisao</option><option>Devolvido</option></select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead className="text-xs uppercase text-slate-500"><tr><th className="pb-3">Item</th><th className="pb-3">Setor</th><th className="pb-3">Pendencia</th><th className="pb-3">Status</th><th className="pb-3">Atualizado</th></tr></thead>
              <tbody className="divide-y divide-slate-100">
                {pendencias.map((info) => {
                  const item = itensRelatorio.find((entry) => entry.id === info.item_id)!;
                  const setor = setores.find((entry) => entry.id === info.setor_id)!;
                  const pendencia = !info.fonte_informacao ? "Fonte nao informada" : !info.texto_tecnico_consolidado ? "Texto tecnico ausente" : info.observacoes_consolidacao || "Aguardando revisao";
                  return (
                    <tr key={info.id}>
                      <td className="py-3"><p className="font-semibold">{item.codigo} - {item.titulo}</p><p className="text-xs text-slate-500">{info.titulo_interno}</p></td>
                      <td className="py-3">{setor.sigla}</td>
                      <td className="py-3">{pendencia}</td>
                      <td className="py-3"><StatusBadge status={info.status} /></td>
                      <td className="py-3">{new Date(info.updated_at).toLocaleString("pt-BR")}</td>
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

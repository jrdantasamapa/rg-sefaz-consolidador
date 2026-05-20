import { Plus, UsersRound } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { PageHeader } from "../components/ui/PageHeader";
import { setores } from "../data/mockData";

export function UnidadesSetores() {
  return (
    <>
      <PageHeader
        title="Setores"
        description="Cadastro base dos setores responsaveis por informacoes recebidas e itens do relatorio."
        actions={<Button><Plus size={16} /> Novo setor</Button>}
      />
      <Card>
        <CardContent className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="text-xs uppercase text-slate-500">
              <tr><th className="pb-3">Setor</th><th className="pb-3">Tipo</th><th className="pb-3">Responsavel</th><th className="pb-3">Cargo</th><th className="pb-3">Contato</th><th className="pb-3">Ativo</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {setores.map((setor) => (
                <tr key={setor.id}>
                  <td className="py-3">
                    <div className="flex items-center gap-2"><UsersRound size={17} className="text-brand-600" /><div><p className="font-semibold">{setor.sigla}</p><p className="text-xs text-slate-500">{setor.nome}</p></div></div>
                  </td>
                  <td className="py-3 capitalize">{setor.tipo}</td>
                  <td className="py-3">{setor.responsavel_nome}</td>
                  <td className="py-3">{setor.responsavel_cargo}</td>
                  <td className="py-3">{setor.contato}</td>
                  <td className="py-3">{setor.ativo ? "Sim" : "Nao"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </>
  );
}

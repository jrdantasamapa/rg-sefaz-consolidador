import { useParams, Link } from "react-router-dom";
import { Save } from "lucide-react";
import { PageHeader } from "../../components/ui/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { itensTce, atribuicoesTce } from "../../data/tceData";
import { setores } from "../../data/mockData";

export function AtribuirItemTce() {
  const { itemId } = useParams();
  const item = itensTce.find((entry) => entry.id === itemId) ?? itensTce[0];
  const atribuicao = atribuicoesTce.find((entry) => entry.item_tce_id === item.id);
  const setorAtual = setores.find((setor) => setor.id === atribuicao?.setor_id) ?? setores[0];

  return (
    <>
      <PageHeader title="Atribuir item" description="Defina setor, responsavel, prazo interno e observacao para resposta do item obrigatorio do TCE." />
      <Card>
        <CardHeader><CardTitle>{item.codigo} - {item.titulo}</CardTitle></CardHeader>
        <CardContent className="space-y-5">
          <div className="rounded-md border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
            <strong>Exigencia:</strong> {item.descricao_exigencia}
            <br />
            <strong>Fundamento:</strong> {item.fundamento_normativo}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block space-y-2"><span className="label">Setor</span><select className="field" defaultValue={setorAtual.id}>{setores.map((setor) => <option key={setor.id} value={setor.id}>{setor.sigla} - {setor.nome}</option>)}</select></label>
            <label className="block space-y-2"><span className="label">Responsavel</span><input className="field" defaultValue={atribuicao?.responsavel_nome ?? setorAtual.responsavel_nome} /></label>
            <label className="block space-y-2"><span className="label">Cargo</span><input className="field" defaultValue={atribuicao?.responsavel_cargo ?? setorAtual.responsavel_cargo} /></label>
            <label className="block space-y-2"><span className="label">E-mail</span><input className="field" defaultValue={atribuicao?.responsavel_email ?? setorAtual.contato} type="email" /></label>
            <label className="block space-y-2"><span className="label">Prazo interno</span><input className="field" defaultValue={atribuicao?.prazo_interno ?? "2026-02-28"} type="date" /></label>
            <label className="block space-y-2"><span className="label">Status</span><select className="field" defaultValue={atribuicao?.status ?? "atribuido"}><option value="atribuido">Atribuido</option><option value="em_preenchimento">Em preenchimento</option><option value="enviado">Enviado</option><option value="em_revisao">Em revisao</option><option value="devolvido">Devolvido</option><option value="consolidado">Consolidado</option><option value="aprovado">Aprovado</option></select></label>
            <label className="block space-y-2 md:col-span-2"><span className="label">Observacao ao setor</span><textarea className="field min-h-28" defaultValue={atribuicao?.observacao_consolidador ?? item.observacao_orientativa} /></label>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button><Save size={16} /> Salvar atribuicao</Button>
            <Link className="inline-flex items-center rounded-md border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50" to="/tce/itens">Voltar</Link>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

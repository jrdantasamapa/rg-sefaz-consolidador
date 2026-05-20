import { Download, Eye, FileText, Link2, Upload } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { PageHeader } from "../components/ui/PageHeader";
import { anexos, anexosVinculos, contratosRelatorio, execucoesOrcamentarias, indicadoresRelatorio, informacoesConsolidadas, itensRelatorio, setores } from "../data/mockData";

export function Evidencias() {
  return (
    <>
      <PageHeader
        title="Central de Evidencias"
        description="Gerencie anexos recebidos, fontes e vinculos com itens ou informacoes consolidadas."
        actions={<Button><Upload size={16} /> Fazer upload</Button>}
      />

      <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <Card>
          <CardContent>
            <div className="mb-5 grid gap-3 md:grid-cols-4">
              <select className="field" defaultValue=""><option value="">Filtrar por item</option>{itensRelatorio.map((item) => <option key={item.id}>{item.codigo} - {item.titulo}</option>)}</select>
              <select className="field" defaultValue=""><option value="">Filtrar por setor</option>{setores.map((setor) => <option key={setor.id}>{setor.sigla}</option>)}</select>
              <select className="field" defaultValue=""><option value="">Tipo de arquivo</option><option>PDF</option><option>Planilha</option><option>Documento</option><option>Imagem</option></select>
              <input className="field" placeholder="Buscar arquivo ou fonte" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[860px] text-left text-sm">
                <thead className="text-xs uppercase text-slate-500">
                  <tr><th className="pb-3">Arquivo</th><th className="pb-3">Fonte</th><th className="pb-3">Tipo</th><th className="pb-3">Vinculos</th><th className="pb-3">Criado em</th><th className="pb-3">Acoes</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {anexos.map((anexo) => {
                    const vinculos = anexosVinculos.filter((vinculo) => vinculo.anexo_id === anexo.id);
                    return (
                      <tr key={anexo.id}>
                        <td className="py-3">
                          <div className="flex items-start gap-2">
                            <FileText className="mt-0.5 text-brand-600" size={17} />
                            <div><p className="font-medium">{anexo.nome_arquivo}</p><p className="text-xs text-slate-500">{anexo.descricao}</p></div>
                          </div>
                        </td>
                        <td className="py-3">{anexo.fonte}</td>
                        <td className="py-3">{anexo.tipo_arquivo}</td>
                        <td className="py-3">{vinculos.length}</td>
                        <td className="py-3">{new Date(anexo.created_at).toLocaleDateString("pt-BR")}</td>
                        <td className="py-3">
                          <div className="flex gap-2">
                            <button className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 hover:bg-slate-50" title="Preview"><Eye size={15} /></button>
                            <button className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 hover:bg-slate-50" title="Download"><Download size={15} /></button>
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

        <aside className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Novo anexo</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <label className="flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-slate-300 bg-slate-50 p-4 text-center text-sm text-slate-600">
                <Upload className="mb-2 text-slate-400" size={22} />
                Selecionar arquivo
                <input className="hidden" type="file" />
              </label>
              <label className="block space-y-2"><span className="label">Descricao</span><textarea className="field min-h-20" /></label>
              <label className="block space-y-2"><span className="label">Fonte</span><input className="field" /></label>
              <label className="block space-y-2"><span className="label">Data</span><input className="field" type="date" /></label>
              <label className="block space-y-2"><span className="label">Observacao</span><textarea className="field min-h-20" /></label>
              <Button className="w-full"><Upload size={16} /> Salvar anexo</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Vincular evidencia</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <label className="block space-y-2"><span className="label">Anexo</span><select className="field" defaultValue=""><option value="">Selecione</option>{anexos.map((anexo) => <option key={anexo.id}>{anexo.nome_arquivo}</option>)}</select></label>
              <label className="block space-y-2"><span className="label">Item do relatorio</span><select className="field" defaultValue=""><option value="">Selecione</option>{itensRelatorio.map((item) => <option key={item.id}>{item.codigo} - {item.titulo}</option>)}</select></label>
              <label className="block space-y-2"><span className="label">Informacao consolidada</span><select className="field" defaultValue=""><option value="">Opcional</option>{informacoesConsolidadas.map((info) => <option key={info.id}>{info.titulo_interno}</option>)}</select></label>
              <label className="block space-y-2"><span className="label">Indicador</span><select className="field" defaultValue=""><option value="">Opcional</option>{indicadoresRelatorio.map((indicador) => <option key={indicador.id}>{indicador.nome}</option>)}</select></label>
              <label className="block space-y-2"><span className="label">Contrato</span><select className="field" defaultValue=""><option value="">Opcional</option>{contratosRelatorio.map((contrato) => <option key={contrato.id}>{contrato.numero_contrato} - {contrato.contratado}</option>)}</select></label>
              <label className="block space-y-2"><span className="label">Execucao orcamentaria</span><select className="field" defaultValue=""><option value="">Opcional</option>{execucoesOrcamentarias.map((execucao) => <option key={execucao.id}>{execucao.programa} - {execucao.acao}</option>)}</select></label>
              <Button variant="secondary" className="w-full"><Link2 size={16} /> Vincular</Button>
            </CardContent>
          </Card>
        </aside>
      </section>
    </>
  );
}

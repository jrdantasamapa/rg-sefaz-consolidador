import { Card, CardContent } from "../components/ui/Card";
import { PageHeader } from "../components/ui/PageHeader";

export function Exercicios() {
  return (
    <>
      <PageHeader title="Exercicio 2025" description="Nesta fase, o foco operacional esta no Relatorio de Gestao do exercicio 2025." />
      <Card>
        <CardContent className="text-sm leading-6 text-slate-700">
          O cadastro de exercicios permanece preparado para evolucao futura, mas a central atual concentra a normalizacao das informacoes ja recebidas para 2025.
        </CardContent>
      </Card>
    </>
  );
}

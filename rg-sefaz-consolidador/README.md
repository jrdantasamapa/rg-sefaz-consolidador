# rg-sefaz-consolidador

Central de Consolidacao e Normalizacao das informacoes ja recebidas dos setores da SEFAZ/AP para o Relatorio de Gestao do exercicio 2025, conforme a DN TCE/AP no 029/2025.

## Objetivo desta fase

O sistema deixa de ser apenas um coletor de formularios futuros e passa a organizar informacoes dispersas ja recebidas em documentos, textos, PDFs, planilhas e relatorios. O foco e cadastrar itens do relatorio, colar e normalizar textos recebidos, vincular evidencias, registrar indicadores, acompanhar pendencias e visualizar uma previa consolidada.

Nao ha workflow complexo, assinatura digital, protocolo ou aprovacao multinivel nesta etapa.

## Modulo TCE/AP DN 029/2025

O modulo TCE transforma cada exigencia normativa em um item operacional:

`Item obrigatorio do TCE -> atribuicao ao setor -> responsavel -> formulario especifico -> evidencias -> revisao -> consolidacao -> previa`

Tabelas principais:

- `itens_tce`
- `atribuicoes_tce`
- `respostas_tce`
- `evidencias_tce`
- `versoes_relatorio`

Cada `itens_tce` possui:

- parte do relatorio;
- unidade consolidada;
- tipo de resposta;
- `campos_schema` em JSON;
- indicacao de obrigatoriedade e evidencia obrigatoria;
- orientacao de preenchimento.

Tipos de resposta suportados:

- `texto`
- `tabela`
- `indicador`
- `financeiro`
- `contratos`
- `pessoal`
- `patrimonio`
- `controle`
- `projeto`
- `estrutura_documental`
- `misto`

## Stack

- React + TypeScript + Vite
- TailwindCSS
- Supabase Auth, Database e Storage
- React Router
- Componentes simples equivalentes a shadcn/ui
- Lucide React

## Rodar o projeto

```bash
npm install
npm run dev
```

Crie um arquivo `.env` com base em `.env.example`:

```bash
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon-publica
```

Sem `.env`, a interface roda em modo demonstrativo com dados locais de `src/data/mockData.ts`.

## Aplicar migrations e seeds

Com Supabase CLI:

```bash
supabase start
supabase db reset
```

Arquivos principais:

- `supabase/migrations/202605200001_initial_schema.sql`
- `supabase/migrations/202605200002_rls_policies.sql`
- `supabase/seed.sql`

## Modelo principal

- `setores`
- `itens_relatorio`
- `tipos_formulario`
- `informacoes_consolidadas`
- `indicadores`
- `indicadores_relatorio`
- `execucao_orcamentaria`
- `contratos_relatorio`
- `patrimonio_relatorio`
- `gestao_pessoas_relatorio`
- `controle_interno_relatorio`
- `arrecadacao_relatorio`
- `fiscalizacao_relatorio`
- `programas_projetos_relatorio`
- `anexos`
- `anexos_vinculos`
- `historico_status`
- `profiles`
- `itens_tce`
- `atribuicoes_tce`
- `respostas_tce`
- `evidencias_tce`
- `versoes_relatorio`

## Arquitetura dos formularios

Cada item de `itens_relatorio` pode apontar para um registro em `tipos_formulario`. A tela `Formularios Dinamicos` le esse tipo e renderiza um formulario especializado:

- `TEXTO_TECNICO`: identificacao, conteudo, resultados e controle.
- `INDICADORES`: multiplos indicadores com formula, meta, resultado, percentual, tendencia e fonte.
- `EXECUCAO_ORCAMENTARIA`: tabela editavel de LOA, QDD, execucao financeira, restos a pagar e creditos adicionais.
- `CONTRATOS_LICITACOES`: tabela de processos, contratos, objetos, valores, vigencia, fiscais e gestores.
- `PATRIMONIO`: bens, quantidade, situacao, localizacao e valor estimado.
- `GESTAO_PESSOAS`: efetivos, comissionados, temporarios, terceirizados, estagiarios, capacitacoes, afastamentos e aposentadorias.
- `CONTROLE_INTERNO`: recomendacoes, acordaos, providencias, responsaveis, prazos e atendimento.
- `ARRECADACAO_FISCALIZACAO`: receitas, fiscalizacao, autos, valores recuperados, beneficios, modernizacao e REDESIM.
- `PROGRAMAS_PROJETOS`: PROFISCO II, FUNDA/AP, modernizacao e projetos estrategicos.
- `EVIDENCIAS_ANEXOS`: upload multiplo e vinculos com itens, informacoes, indicadores, contratos e execucao orcamentaria.

Para cadastrar um novo tipo, insira em `tipos_formulario`, associe `itens_relatorio.tipo_formulario_id` e implemente o componente correspondente em `src/pages/Formularios.tsx`.

## Regra de consolidacao

Uma informacao so deve ser marcada como `consolidado` ou `aprovado` quando possuir:

- texto tecnico consolidado;
- fonte da informacao;
- responsavel pela informacao;
- pelo menos uma evidencia vinculada ou justificativa de ausencia de evidencia.

## RLS basico

- `admin` e `coordenador`: podem editar tudo;
- `setor`: pode editar informacoes vinculadas ao seu setor;
- `revisor`: pode alterar status e observacoes;
- todos autenticados podem visualizar a previa consolidada e dados de referencia.

## Fluxo recomendado de uso

1. Cadastrar ou revisar itens do relatorio.
2. Cadastrar ou revisar setores.
3. Associar cada item ao tipo de formulario correto.
4. Inserir informacoes ja recebidas dos setores no formulario especializado.
5. Preencher tabelas, indicadores e campos tecnicos exigidos pelo TCE/AP.
6. Vincular evidencias aos itens, informacoes, indicadores, contratos ou execucao orcamentaria.
7. Revisar pendencias por item, setor, fonte e evidencia.
8. Visualizar a previa do relatorio consolidado.

## Fluxo operacional TCE

1. Abrir `Itens TCE`.
2. Filtrar por parte, status, setor ou responsavel.
3. Atribuir item ao setor e responsavel.
4. Responder o item com o formulario dinamico carregado por `tipo_resposta`.
5. Vincular evidencias ou justificar ausencia.
6. Enviar para revisao.
7. Revisar e consolidar o texto final.
8. Visualizar a `Previa TCE`.

## Requisitos formais controlados

A previa registra os requisitos da DN TCE/AP no 029/2025:

- arquivo unico em PDF, exceto rol de responsaveis destacado;
- tamanho maximo de 20MB;
- PDF texto/pesquisavel;
- no maximo 30% do tamanho total em imagens;
- nome `Relatorio de gestao de 2025_SEFAZ`;
- capa, folha de rosto, sumario, listas, introducao, desenvolvimento, resultados, conclusoes e anexos;
- Times New Roman 12 no texto e 10 em quadros/tabelas;
- A4, margens e espacamento 1,15.

## Telas

- Dashboard de Consolidacao
- Dashboard dos Formularios
- Itens TCE
- Pendencias TCE
- Revisao TCE
- Previa TCE
- Setores
- Itens do Relatorio
- Formularios Dinamicos
- Consolidacao do Item
- Central de Evidencias
- Pendencias
- Revisao e Consolidacao
- Previa do Relatorio

## Proxima evolucao natural

Substituir os dados mockados por consultas Supabase, implementar upload real para Storage, registrar historico de status automaticamente e adicionar exportacao DOCX/PDF a partir da previa.

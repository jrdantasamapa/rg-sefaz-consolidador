import type {
  Anexo,
  AnexoVinculo,
  ArrecadacaoRelatorio,
  ContratoRelatorio,
  ControleInternoRelatorio,
  ExecucaoOrcamentaria,
  FiscalizacaoRelatorio,
  GestaoPessoasRelatorio,
  Indicador,
  IndicadorRelatorio,
  InformacaoConsolidada,
  ItemRelatorio,
  PatrimonioRelatorio,
  ProgramaProjetoRelatorio,
  Setor,
  TipoFormulario,
  TipoFormularioCodigo,
} from "../types/database";

export const tiposFormulario: TipoFormulario[] = [
  { id: "TEXTO_TECNICO", codigo: "TEXTO_TECNICO", nome: "Texto tecnico", descricao: "Texto original, consolidacao tecnica, resultados e controle da informacao.", icone: "FileText", ativo: true },
  { id: "INDICADORES", codigo: "INDICADORES", nome: "Indicadores", descricao: "Indicadores com formula, meta, resultado, percentual e tendencia.", icone: "LineChart", ativo: true },
  { id: "EXECUCAO_ORCAMENTARIA", codigo: "EXECUCAO_ORCAMENTARIA", nome: "Execucao orcamentaria", descricao: "LOA, QDD, execucao financeira, restos a pagar e creditos adicionais.", icone: "Calculator", ativo: true },
  { id: "CONTRATOS_LICITACOES", codigo: "CONTRATOS_LICITACOES", nome: "Contratos e licitacoes", descricao: "Processos, contratos, objetos, valores, vigencia, fiscais e gestores.", icone: "FileSignature", ativo: true },
  { id: "PATRIMONIO", codigo: "PATRIMONIO", nome: "Patrimonio", descricao: "Bens, quantidades, situacao, localizacao e valor estimado.", icone: "Archive", ativo: true },
  { id: "GESTAO_PESSOAS", codigo: "GESTAO_PESSOAS", nome: "Gestao de pessoas", descricao: "Forca de trabalho, capacitacoes, afastamentos e aposentadorias.", icone: "UsersRound", ativo: true },
  { id: "CONTROLE_INTERNO", codigo: "CONTROLE_INTERNO", nome: "Controle interno", descricao: "Recomendacoes, acordaos, providencias, prazos e atendimento.", icone: "ShieldCheck", ativo: true },
  { id: "ARRECADACAO_FISCALIZACAO", codigo: "ARRECADACAO_FISCALIZACAO", nome: "Arrecadacao e fiscalizacao", descricao: "Receitas, fiscalizacao, autos, recuperacao, beneficios e modernizacao.", icone: "ReceiptText", ativo: true },
  { id: "PROGRAMAS_PROJETOS", codigo: "PROGRAMAS_PROJETOS", nome: "Programas e projetos", descricao: "PROFISCO II, FUNDA/AP, modernizacao e projetos estrategicos.", icone: "Rocket", ativo: true },
  { id: "EVIDENCIAS_ANEXOS", codigo: "EVIDENCIAS_ANEXOS", nome: "Evidencias e anexos", descricao: "Cadastro, preview, download e vinculos multiplos de anexos.", icone: "Paperclip", ativo: true },
];

export const setores: Setor[] = [
  { id: "gabinete", nome: "Gabinete", sigla: "GAB", tipo: "gestao", responsavel_nome: "Chefia de Gabinete", responsavel_cargo: "Chefe de Gabinete", contato: "gabinete@sefaz.ap.gov.br", ativo: true },
  { id: "adins", nome: "ADINS/Planejamento", sigla: "ADINS", tipo: "gestao", responsavel_nome: "Coordenacao ADINS", responsavel_cargo: "Coordenador", contato: "adins@sefaz.ap.gov.br", ativo: true },
  { id: "sare", nome: "Secretaria Adjunta da Receita Estadual - SARE", sigla: "SARE", tipo: "finalistico", responsavel_nome: "Secretario Adjunto da Receita", responsavel_cargo: "Secretario Adjunto", contato: "sare@sefaz.ap.gov.br", ativo: true },
  { id: "tributacao", nome: "Tributacao", sigla: "TRIB", tipo: "finalistico", responsavel_nome: "Coordenacao de Tributacao", responsavel_cargo: "Coordenador", contato: "tributacao@sefaz.ap.gov.br", ativo: true },
  { id: "arrecadacao", nome: "Arrecadacao", sigla: "ARREC", tipo: "finalistico", responsavel_nome: "Coordenacao de Arrecadacao", responsavel_cargo: "Coordenador", contato: "arrecadacao@sefaz.ap.gov.br", ativo: true },
  { id: "fiscalizacao", nome: "Fiscalizacao", sigla: "FISC", tipo: "finalistico", responsavel_nome: "Coordenacao de Fiscalizacao", responsavel_cargo: "Coordenador", contato: "fiscalizacao@sefaz.ap.gov.br", ativo: true },
  { id: "redesim", nome: "Cadastro/REDESIM", sigla: "REDESIM", tipo: "finalistico", responsavel_nome: "Gestao REDESIM", responsavel_cargo: "Gerente", contato: "redesim@sefaz.ap.gov.br", ativo: true },
  { id: "modernizacao", nome: "Tecnologia/Modernizacao Tributaria", sigla: "MODERN", tipo: "programa", responsavel_nome: "Gestao de Modernizacao", responsavel_cargo: "Gerente", contato: "modernizacao@sefaz.ap.gov.br", ativo: true },
  { id: "sate", nome: "Secretaria Adjunta do Tesouro Estadual - SATE", sigla: "SATE", tipo: "finalistico", responsavel_nome: "Secretario Adjunto do Tesouro", responsavel_cargo: "Secretario Adjunto", contato: "sate@sefaz.ap.gov.br", ativo: true },
  { id: "contabilidade", nome: "Contabilidade", sigla: "CONTAB", tipo: "controle", responsavel_nome: "Contador Geral", responsavel_cargo: "Coordenador", contato: "contabilidade@sefaz.ap.gov.br", ativo: true },
  { id: "tesouro", nome: "Tesouro/Financeiro", sigla: "TESOURO", tipo: "finalistico", responsavel_nome: "Coordenacao Financeira", responsavel_cargo: "Coordenador", contato: "tesouro@sefaz.ap.gov.br", ativo: true },
  { id: "orcamento", nome: "Orcamento", sigla: "ORC", tipo: "apoio", responsavel_nome: "Coordenacao Orcamentaria", responsavel_cargo: "Coordenador", contato: "orcamento@sefaz.ap.gov.br", ativo: true },
  { id: "contratos", nome: "Contratos e Convenios", sigla: "CONTR", tipo: "apoio", responsavel_nome: "Gestao de Contratos", responsavel_cargo: "Gerente", contato: "contratos@sefaz.ap.gov.br", ativo: true },
  { id: "licitacoes", nome: "Compras/Licitacoes", sigla: "LIC", tipo: "apoio", responsavel_nome: "Comissao de Licitacao", responsavel_cargo: "Presidente", contato: "licitacoes@sefaz.ap.gov.br", ativo: true },
  { id: "patrimonio", nome: "Patrimonio", sigla: "PATR", tipo: "apoio", responsavel_nome: "Gestao Patrimonial", responsavel_cargo: "Gerente", contato: "patrimonio@sefaz.ap.gov.br", ativo: true },
  { id: "administrativo", nome: "Administrativo", sigla: "ADM", tipo: "apoio", responsavel_nome: "Coordenacao Administrativa", responsavel_cargo: "Coordenador", contato: "administrativo@sefaz.ap.gov.br", ativo: true },
  { id: "rh", nome: "Recursos Humanos", sigla: "RH", tipo: "apoio", responsavel_nome: "Gestao de Pessoas", responsavel_cargo: "Gerente", contato: "rh@sefaz.ap.gov.br", ativo: true },
  { id: "controle-interno", nome: "Controle Interno", sigla: "CI", tipo: "controle", responsavel_nome: "Unidade de Controle Interno", responsavel_cargo: "Controlador", contato: "controle.interno@sefaz.ap.gov.br", ativo: true },
  { id: "corregedoria", nome: "Corregedoria/Comissoes", sigla: "CORREG", tipo: "controle", responsavel_nome: "Corregedoria", responsavel_cargo: "Corregedor", contato: "corregedoria@sefaz.ap.gov.br", ativo: true },
  { id: "funda", nome: "FUNDA/AP", sigla: "FUNDA", tipo: "fundo", responsavel_nome: "Gestao FUNDA/AP", responsavel_cargo: "Gestor do Fundo", contato: "funda@sefaz.ap.gov.br", ativo: true },
  { id: "profisco", nome: "PROFISCO II", sigla: "PROFISCO", tipo: "programa", responsavel_nome: "Unidade PROFISCO II", responsavel_cargo: "Coordenador", contato: "profisco@sefaz.ap.gov.br", ativo: true },
];

const setor = (id: string) => id;

const itensRelatorioBase: Array<Omit<ItemRelatorio, "tipo_formulario_id">> = [
  { id: "pg-01", codigo: "1", titulo: "Identificacao e atributos da unidade", descricao: "Identificacao institucional, competencias, dirigentes e atributos da unidade.", parte: "geral", ordem: 1, setor_responsavel_padrao_id: setor("gabinete"), obrigatorio: true, criticidade: "alta" },
  { id: "pg-02", codigo: "2", titulo: "Entregas da unidade", descricao: "Entregas institucionais realizadas no exercicio.", parte: "geral", ordem: 2, setor_responsavel_padrao_id: setor("adins"), obrigatorio: true, criticidade: "alta" },
  { id: "pg-021", codigo: "2.1", titulo: "O que foi proposto e o que foi alcancado", descricao: "Comparacao entre propostas, metas e resultados.", parte: "geral", ordem: 3, setor_responsavel_padrao_id: setor("adins"), obrigatorio: true, criticidade: "alta" },
  { id: "pg-022", codigo: "2.2", titulo: "Evolucao dos indicadores", descricao: "Evolucao dos indicadores de gestao.", parte: "geral", ordem: 4, setor_responsavel_padrao_id: setor("adins"), obrigatorio: true, criticidade: "media" },
  { id: "pg-023", codigo: "2.3", titulo: "O que nao foi alcancado", descricao: "Metas nao alcancadas, causas e providencias.", parte: "geral", ordem: 5, setor_responsavel_padrao_id: setor("adins"), obrigatorio: true, criticidade: "media" },
  { id: "pg-03", codigo: "3", titulo: "Processos da unidade", descricao: "Processos de trabalho e estrutura de gestao.", parte: "geral", ordem: 6, setor_responsavel_padrao_id: setor("administrativo"), obrigatorio: true, criticidade: "media" },
  { id: "pg-031", codigo: "3.1", titulo: "Organograma", descricao: "Organograma e estrutura administrativa.", parte: "geral", ordem: 7, setor_responsavel_padrao_id: setor("gabinete"), obrigatorio: true, criticidade: "baixa" },
  { id: "pg-032", codigo: "3.2", titulo: "Processos finalisticos", descricao: "Processos ligados a receita, tesouro e gestao fiscal.", parte: "geral", ordem: 8, setor_responsavel_padrao_id: setor("sare"), obrigatorio: true, criticidade: "media" },
  { id: "pg-033", codigo: "3.3", titulo: "Processos de apoio", descricao: "Processos administrativos e de suporte.", parte: "geral", ordem: 9, setor_responsavel_padrao_id: setor("administrativo"), obrigatorio: true, criticidade: "baixa" },
  { id: "pg-04", codigo: "4", titulo: "Execucao orcamentaria e financeira", descricao: "Execucao da receita e despesa no exercicio.", parte: "geral", ordem: 10, setor_responsavel_padrao_id: setor("orcamento"), obrigatorio: true, criticidade: "alta" },
  { id: "pg-041", codigo: "4.1", titulo: "Resumo da execucao orcamentaria e financeira", descricao: "Resumo executivo da execucao orcamentaria e financeira.", parte: "geral", ordem: 11, setor_responsavel_padrao_id: setor("orcamento"), obrigatorio: true, criticidade: "alta" },
  { id: "pg-042", codigo: "4.2", titulo: "QDD", descricao: "Quadro de detalhamento da despesa.", parte: "geral", ordem: 12, setor_responsavel_padrao_id: setor("orcamento"), obrigatorio: true, criticidade: "media" },
  { id: "pg-043", codigo: "4.3", titulo: "Restos a pagar", descricao: "Restos a pagar inscritos, pagos e cancelados.", parte: "geral", ordem: 13, setor_responsavel_padrao_id: setor("tesouro"), obrigatorio: true, criticidade: "alta" },
  { id: "pg-044", codigo: "4.4", titulo: "Despesas de exercicios anteriores", descricao: "Despesas reconhecidas como exercicios anteriores.", parte: "geral", ordem: 14, setor_responsavel_padrao_id: setor("contabilidade"), obrigatorio: true, criticidade: "media" },
  { id: "pg-05", codigo: "5", titulo: "Gestao do patrimonio mobiliario e imobiliario", descricao: "Bens moveis, imoveis, inventario e controle patrimonial.", parte: "geral", ordem: 15, setor_responsavel_padrao_id: setor("patrimonio"), obrigatorio: true, criticidade: "media" },
  { id: "pg-06", codigo: "6", titulo: "Informacoes contabeis", descricao: "Demonstracoes, notas e informacoes contabeis relevantes.", parte: "geral", ordem: 16, setor_responsavel_padrao_id: setor("contabilidade"), obrigatorio: true, criticidade: "alta" },
  { id: "pg-07", codigo: "7", titulo: "Licitacoes, contratos, convenios e obras", descricao: "Contratacoes, convenios, aditivos, obras e instrumentos correlatos.", parte: "geral", ordem: 17, setor_responsavel_padrao_id: setor("contratos"), obrigatorio: true, criticidade: "alta" },
  { id: "pg-08", codigo: "8", titulo: "Pessoal", descricao: "Forca de trabalho, cargos, despesas e informacoes de pessoal.", parte: "geral", ordem: 18, setor_responsavel_padrao_id: setor("rh"), obrigatorio: true, criticidade: "media" },
  { id: "pg-09", codigo: "9", titulo: "Tratamento das recomendacoes/determinacoes do controle interno e do TCE", descricao: "Providencias adotadas diante de recomendacoes, determinacoes e achados.", parte: "geral", ordem: 19, setor_responsavel_padrao_id: setor("controle-interno"), obrigatorio: true, criticidade: "alta" },
  { id: "pg-10", codigo: "10", titulo: "Outras informacoes sobre a gestao", descricao: "Informacoes complementares relevantes para a prestacao de contas.", parte: "geral", ordem: 20, setor_responsavel_padrao_id: setor("gabinete"), obrigatorio: false, criticidade: "baixa" },
  { id: "pe-01", codigo: "PE.1", titulo: "Politica tributaria e de arrecadacao do Estado", descricao: "Diretrizes e medidas de politica tributaria e arrecadatoria.", parte: "especifica", ordem: 21, setor_responsavel_padrao_id: setor("tributacao"), obrigatorio: true, criticidade: "alta" },
  { id: "pe-02", codigo: "PE.2", titulo: "Politica financeira e contabil do Estado", descricao: "Diretrizes de gestao financeira e contabil estadual.", parte: "especifica", ordem: 22, setor_responsavel_padrao_id: setor("sate"), obrigatorio: true, criticidade: "alta" },
  { id: "pe-03", codigo: "PE.3", titulo: "Planos de atividades de tributacao, arrecadacao, fiscalizacao e controle financeiro e contabil", descricao: "Planos, programacoes e linhas de atuacao.", parte: "especifica", ordem: 23, setor_responsavel_padrao_id: setor("sare"), obrigatorio: true, criticidade: "alta" },
  { id: "pe-04", codigo: "PE.4", titulo: "Execucao das atividades de tributacao e fiscalizacao", descricao: "Resultados da execucao das atividades fiscais.", parte: "especifica", ordem: 24, setor_responsavel_padrao_id: setor("fiscalizacao"), obrigatorio: true, criticidade: "alta" },
  { id: "pe-05", codigo: "PE.5", titulo: "Resultados da arrecadacao do Estado", descricao: "Resultado da arrecadacao estadual e variacoes relevantes.", parte: "especifica", ordem: 25, setor_responsavel_padrao_id: setor("arrecadacao"), obrigatorio: true, criticidade: "alta" },
  { id: "pe-06", codigo: "PE.6", titulo: "Controle financeiro e contabil", descricao: "Controles de execucao financeira e registros contabeis.", parte: "especifica", ordem: 26, setor_responsavel_padrao_id: setor("contabilidade"), obrigatorio: true, criticidade: "alta" },
  { id: "pe-07", codigo: "PE.7", titulo: "Controles internos imprescindiveis a boa e regular aplicacao dos recursos publicos", descricao: "Controles internos e salvaguardas para aplicacao regular dos recursos.", parte: "especifica", ordem: 27, setor_responsavel_padrao_id: setor("controle-interno"), obrigatorio: true, criticidade: "alta" },
  { id: "pe-08", codigo: "PE.8", titulo: "Gestao da renuncia de receita e beneficios fiscais", descricao: "Controle, monitoramento e transparencia da renuncia de receita.", parte: "especifica", ordem: 28, setor_responsavel_padrao_id: setor("tributacao"), obrigatorio: true, criticidade: "alta" },
  { id: "pe-09", codigo: "PE.9", titulo: "REDESIM e Empresa Facil", descricao: "Integracao, simplificacao e resultados da REDESIM/Empresa Facil.", parte: "especifica", ordem: 29, setor_responsavel_padrao_id: setor("redesim"), obrigatorio: true, criticidade: "media" },
  { id: "pe-10", codigo: "PE.10", titulo: "Indicador: Variacao anual da arrecadacao propria do GEA", descricao: "Indicador de variacao anual da arrecadacao propria.", parte: "especifica", ordem: 30, setor_responsavel_padrao_id: setor("arrecadacao"), obrigatorio: true, criticidade: "alta" },
  { id: "pe-11", codigo: "PE.11", titulo: "Indicador: Percentual da modernizacao da Administracao Tributaria implantado", descricao: "Indicador de implantacao da modernizacao tributaria.", parte: "especifica", ordem: 31, setor_responsavel_padrao_id: setor("modernizacao"), obrigatorio: true, criticidade: "media" },
  { id: "pe-12", codigo: "PE.12", titulo: "Indicador: Valor arrecadado com certificacao de projetos economicos e ambientais", descricao: "Indicador de arrecadacao relacionada a certificacao de projetos.", parte: "especifica", ordem: 32, setor_responsavel_padrao_id: setor("arrecadacao"), obrigatorio: true, criticidade: "media" },
  { id: "pe-13", codigo: "PE.13", titulo: "Implementacao do FUNDA/AP", descricao: "Implementacao, governanca e resultados do FUNDA/AP.", parte: "especifica", ordem: 33, setor_responsavel_padrao_id: setor("funda"), obrigatorio: true, criticidade: "alta" },
  { id: "pe-14", codigo: "PE.14", titulo: "Execucao dos recursos do PROFISCO II", descricao: "Projetos, contratos, desembolsos e resultados do PROFISCO II.", parte: "especifica", ordem: 34, setor_responsavel_padrao_id: setor("profisco"), obrigatorio: true, criticidade: "alta" },
  { id: "ap-01", codigo: "AP.1", titulo: "Quadros complementares", descricao: "Quadros e demonstrativos complementares.", parte: "apendice", ordem: 35, setor_responsavel_padrao_id: setor("adins"), obrigatorio: false, criticidade: "baixa" },
  { id: "an-01", codigo: "AN.1", titulo: "Anexos referenciais", descricao: "Anexos referenciais e evidencias documentais.", parte: "anexo", ordem: 36, setor_responsavel_padrao_id: setor("adins"), obrigatorio: false, criticidade: "baixa" },
];

function inferirTipoFormulario(item: Omit<ItemRelatorio, "tipo_formulario_id">): TipoFormularioCodigo {
  const titulo = item.titulo.toLowerCase();
  if (titulo.includes("indicador") || titulo.includes("evolucao dos indicadores")) return "INDICADORES";
  if (titulo.includes("orcamentaria") || titulo.includes("qdd") || titulo.includes("restos a pagar") || titulo.includes("despesas de exercicios anteriores")) return "EXECUCAO_ORCAMENTARIA";
  if (titulo.includes("licitacoes") || titulo.includes("contratos") || titulo.includes("convenios")) return "CONTRATOS_LICITACOES";
  if (titulo.includes("patrimonio")) return "PATRIMONIO";
  if (titulo.includes("pessoal")) return "GESTAO_PESSOAS";
  if (titulo.includes("controle interno") || titulo.includes("tce") || titulo.includes("recomendacoes")) return "CONTROLE_INTERNO";
  if (titulo.includes("arrecadacao") || titulo.includes("fiscalizacao") || titulo.includes("tributaria") || titulo.includes("redesim")) return "ARRECADACAO_FISCALIZACAO";
  if (titulo.includes("profisco") || titulo.includes("funda") || titulo.includes("modernizacao")) return "PROGRAMAS_PROJETOS";
  if (item.parte === "anexo") return "EVIDENCIAS_ANEXOS";
  return "TEXTO_TECNICO";
}

export const itensRelatorio: ItemRelatorio[] = itensRelatorioBase.map((item) => ({
  ...item,
  tipo_formulario_id: inferirTipoFormulario(item),
}));

export const informacoesConsolidadas: InformacaoConsolidada[] = [
  {
    id: "info-01",
    item_id: "pg-01",
    setor_id: "gabinete",
    titulo_interno: "Identificacao institucional recebida do Gabinete",
    texto_original_recebido: "Documento encaminhado pelo Gabinete com dados de identificacao, dirigentes e competencias da SEFAZ/AP.",
    texto_tecnico_consolidado: "A Secretaria de Estado da Fazenda do Amapa atua como orgao central da administracao fazendaria, responsavel pela gestao tributaria, financeira, contabil e por politicas de modernizacao fiscal no ambito estadual.",
    principais_resultados: "Estrutura institucional revisada e informacoes basicas normalizadas para o relatorio.",
    dados_quantitativos: "4 unidades abrangidas: SEFAZ, SARE, SATE e FUNDA/AP.",
    metas_previstas: "Consolidar identificacao e competencias institucionais.",
    resultados_alcancados: "Informacoes recebidas e texto tecnico consolidado.",
    justificativa_nao_alcance: "",
    fonte_informacao: "Memorando Gabinete/SEFAZ 2026",
    responsavel_informacao_nome: "Chefia de Gabinete",
    responsavel_informacao_cargo: "Chefe de Gabinete",
    observacoes_consolidacao: "Conferir grafia oficial das unidades antes da versao final.",
    status: "aprovado",
    created_by: "demo",
    updated_by: "demo",
    created_at: "2026-05-18T10:00:00Z",
    updated_at: "2026-05-20T11:10:00Z",
  },
  {
    id: "info-02",
    item_id: "pe-05",
    setor_id: "arrecadacao",
    titulo_interno: "Resultados de arrecadacao 2025",
    texto_original_recebido: "Planilha e nota tecnica com evolucao mensal da arrecadacao estadual em 2025.",
    texto_tecnico_consolidado: "A arrecadacao estadual apresentou desempenho acompanhado mensalmente pela area de arrecadacao, com monitoramento de receitas proprias e avaliacao de variacoes em relacao ao exercicio anterior.",
    principais_resultados: "Base historica organizada; dados aguardam validacao final da serie anual.",
    dados_quantitativos: "Serie mensal de janeiro a dezembro de 2025 recebida em planilha.",
    metas_previstas: "Acompanhar variacao anual da arrecadacao propria.",
    resultados_alcancados: "Indicador preliminar estruturado.",
    justificativa_nao_alcance: "",
    fonte_informacao: "Planilha Arrecadacao 2025",
    responsavel_informacao_nome: "Coordenacao de Arrecadacao",
    responsavel_informacao_cargo: "Coordenador",
    observacoes_consolidacao: "Validar valor final antes da aprovacao.",
    status: "em_revisao",
    created_by: "demo",
    updated_by: "demo",
    created_at: "2026-05-18T12:00:00Z",
    updated_at: "2026-05-20T12:30:00Z",
  },
  {
    id: "info-03",
    item_id: "pe-09",
    setor_id: "redesim",
    titulo_interno: "REDESIM e Empresa Facil",
    texto_original_recebido: "Relatorio setorial com tempos de atendimento e acoes de simplificacao.",
    texto_tecnico_consolidado: "As iniciativas de integracao da REDESIM/Empresa Facil buscaram simplificar procedimentos cadastrais e reduzir etapas de atendimento aos contribuintes e empreendedores.",
    principais_resultados: "Informacoes recebidas e texto em consolidacao.",
    dados_quantitativos: "Indicadores de atendimento encaminhados em PDF.",
    metas_previstas: "Melhorar tempo de atendimento e integracao cadastral.",
    resultados_alcancados: "Dados em normalizacao.",
    justificativa_nao_alcance: "",
    fonte_informacao: "Relatorio Empresa Facil 2025",
    responsavel_informacao_nome: "Gestao REDESIM",
    responsavel_informacao_cargo: "Gerente",
    observacoes_consolidacao: "",
    status: "consolidado",
    created_by: "demo",
    updated_by: "demo",
    created_at: "2026-05-19T09:00:00Z",
    updated_at: "2026-05-20T09:40:00Z",
  },
  {
    id: "info-04",
    item_id: "pe-14",
    setor_id: "profisco",
    titulo_interno: "Execucao PROFISCO II",
    texto_original_recebido: "Resumo de contratos e desembolsos do PROFISCO II.",
    texto_tecnico_consolidado: "",
    principais_resultados: "",
    dados_quantitativos: "",
    metas_previstas: "",
    resultados_alcancados: "",
    justificativa_nao_alcance: "Evidencias ainda nao foram vinculadas.",
    fonte_informacao: "",
    responsavel_informacao_nome: "",
    responsavel_informacao_cargo: "",
    observacoes_consolidacao: "Pendencia de fonte e responsavel.",
    status: "recebido",
    created_by: "demo",
    updated_by: "demo",
    created_at: "2026-05-19T14:00:00Z",
    updated_at: "2026-05-19T14:20:00Z",
  },
  {
    id: "info-05",
    item_id: "pg-09",
    setor_id: "controle-interno",
    titulo_interno: "Recomendacoes de controle",
    texto_original_recebido: "",
    texto_tecnico_consolidado: "",
    principais_resultados: "",
    dados_quantitativos: "",
    metas_previstas: "",
    resultados_alcancados: "",
    justificativa_nao_alcance: "",
    fonte_informacao: "",
    responsavel_informacao_nome: "",
    responsavel_informacao_cargo: "",
    observacoes_consolidacao: "Solicitar documento atualizado.",
    status: "pendente",
    created_by: "demo",
    updated_by: "demo",
    created_at: "2026-05-20T08:00:00Z",
    updated_at: "2026-05-20T08:00:00Z",
  },
  {
    id: "info-06",
    item_id: "pg-07",
    setor_id: "contratos",
    titulo_interno: "Contratos e convenios",
    texto_original_recebido: "Lista de contratos recebida sem notas explicativas.",
    texto_tecnico_consolidado: "A gestao de contratos e convenios depende de complementacao das informacoes qualitativas sobre objetos, aditivos e execucao.",
    principais_resultados: "",
    dados_quantitativos: "Planilha de contratos recebida.",
    metas_previstas: "",
    resultados_alcancados: "",
    justificativa_nao_alcance: "Texto devolvido para complementacao do setor.",
    fonte_informacao: "Planilha de contratos",
    responsavel_informacao_nome: "Gestao de Contratos",
    responsavel_informacao_cargo: "Gerente",
    observacoes_consolidacao: "Solicitar sintese executiva.",
    status: "devolvido",
    created_by: "demo",
    updated_by: "demo",
    created_at: "2026-05-18T15:00:00Z",
    updated_at: "2026-05-20T10:15:00Z",
  },
];

export const indicadores: Indicador[] = [
  { id: "ind-01", informacao_id: "info-02", nome: "Variacao anual da arrecadacao propria do GEA", unidade_medida: "%", periodicidade: "Anual", indice_inicial: "2024", meta: "Crescimento real positivo", resultado: "Em validacao", data_apuracao: "2025-12-31", observacao: "Aguardando validacao final da serie." },
  { id: "ind-02", informacao_id: "info-03", nome: "Tempo medio de atendimento REDESIM", unidade_medida: "dias", periodicidade: "Mensal", indice_inicial: "2024", meta: "Reduzir prazo medio", resultado: "Dados recebidos", data_apuracao: "2025-12-31", observacao: "Normalizar metodologia." },
];

export const indicadoresRelatorio: IndicadorRelatorio[] = [
  {
    id: "ind-rel-01",
    informacao_id: "info-02",
    nome: "Variacao anual da arrecadacao propria do GEA",
    descricao: "Mede a variacao percentual anual da arrecadacao propria estadual.",
    formula_calculo: "((Arrecadacao 2025 / Arrecadacao 2024) - 1) x 100",
    unidade_medida: "%",
    periodicidade: "Anual",
    indice_inicial: "Base 2024",
    meta_prevista: "Crescimento real positivo",
    resultado_alcancado: "Em validacao",
    percentual_atingido: 82,
    tendencia: "crescimento",
    justificativa: "Serie anual em conferencia com os demonstrativos oficiais.",
    fonte: "Planilha Arrecadacao 2025",
    data_apuracao: "2025-12-31",
  },
  {
    id: "ind-rel-02",
    informacao_id: "info-03",
    nome: "Tempo medio de atendimento REDESIM",
    descricao: "Tempo medio de atendimento de processos integrados a REDESIM/Empresa Facil.",
    formula_calculo: "Soma dos prazos / quantidade de processos atendidos",
    unidade_medida: "dias",
    periodicidade: "Mensal",
    indice_inicial: "Media 2024",
    meta_prevista: "Reducao do prazo medio",
    resultado_alcancado: "Dados recebidos",
    percentual_atingido: 74,
    tendencia: "reducao",
    justificativa: "Metodologia sera conferida com o setor cadastral.",
    fonte: "Relatorio Empresa Facil 2025",
    data_apuracao: "2025-12-31",
  },
];

export const execucoesOrcamentarias: ExecucaoOrcamentaria[] = [
  {
    id: "exec-01",
    informacao_id: "info-04",
    programa: "Modernizacao da Gestao Fiscal",
    acao: "Implantacao de solucoes de administracao tributaria",
    fonte: "PROFISCO II",
    dotacao_inicial: 12000000,
    dotacao_atualizada: 14500000,
    empenhado: 9800000,
    liquidado: 7200000,
    pago: 6800000,
    percentual_executado: 67.6,
    restos_pagar_processados: 400000,
    restos_pagar_nao_processados: 2200000,
    justificativa: "Execucao condicionada ao cronograma de contratacoes e entregas.",
  },
];

export const contratosRelatorio: ContratoRelatorio[] = [
  {
    id: "contr-rel-01",
    informacao_id: "info-06",
    numero_processo: "0001.0000.2025.000001",
    numero_contrato: "CT 012/2025",
    objeto: "Servicos de suporte a modernizacao tributaria",
    modalidade: "Pregao eletronico",
    contratado: "Empresa demonstrativa LTDA",
    valor: 1850000,
    vigencia: "01/03/2025 a 28/02/2026",
    status: "Vigente",
    fiscal: "Servidor fiscal designado",
    gestor: "Gestao de Contratos",
    observacoes: "Dados aguardam conferencia documental.",
  },
];

export const patrimonioRelatorio: PatrimonioRelatorio[] = [
  { id: "patr-01", informacao_id: "info-01", tipo_bem: "Mobiliario", descricao: "Bens moveis administrativos inventariados", quantidade: 420, situacao: "Em uso", localizacao: "Unidades SEFAZ/AP", valor_estimado: 680000, observacoes: "Base demonstrativa para a previa." },
];

export const gestaoPessoasRelatorio: GestaoPessoasRelatorio[] = [
  { id: "gp-01", informacao_id: "info-01", servidores_efetivos: 310, comissionados: 42, temporarios: 0, terceirizados: 68, estagiarios: 12, capacitacoes_realizadas: 18, afastamentos: 9, aposentadorias: 6, observacoes: "Dados exemplificativos aguardando consolidacao de RH." },
];

export const controleInternoRelatorio: ControleInternoRelatorio[] = [
  { id: "ci-01", informacao_id: "info-05", orgao_controle: "TCE/AP", numero_recomendacao_acordao: "Acordao demonstrativo 001/2025", objeto: "Aprimoramento de controles de evidencias", situacao: "Em atendimento", providencias_adotadas: "Levantamento das recomendacoes e consolidacao de respostas setoriais.", responsavel: "Controle Interno", prazo: "2026-03-31", status_atendimento: "Pendente de comprovacao" },
];

export const arrecadacaoRelatorio: ArrecadacaoRelatorio[] = [
  {
    id: "arr-01",
    informacao_id: "info-02",
    tipo_receita: "Receitas proprias estaduais",
    arrecadacao_prevista: 5200000000,
    arrecadacao_realizada: 5480000000,
    variacao_percentual: 5.38,
    beneficios_fiscais: "Beneficios fiscais monitorados conforme demonstrativos setoriais.",
    acoes_modernizacao: "Aprimoramento de paines de acompanhamento e malhas fiscais.",
    redesim_empresa_facil: "Integracao mantida com bases cadastrais.",
    analise_tecnica_resultados: "Resultado preliminar indica desempenho acima do previsto, sujeito a validacao contabil.",
  },
];

export const fiscalizacaoRelatorio: FiscalizacaoRelatorio[] = [
  {
    id: "fisc-rel-01",
    informacao_id: "info-02",
    acoes_fiscalizacao: "Malhas fiscais, monitoramentos e acoes dirigidas.",
    quantidade_autos: 184,
    valor_recuperado: 39500000,
    operacoes_realizadas: "Operacoes setoriais de combate a irregularidades tributarias.",
    analise_tecnica_resultados: "A recuperacao de creditos depende da conciliacao final das bases de autos.",
  },
];

export const programasProjetosRelatorio: ProgramaProjetoRelatorio[] = [
  {
    id: "prog-01",
    informacao_id: "info-04",
    programa_projeto: "PROFISCO II",
    objetivo: "Modernizar processos, sistemas e instrumentos de gestao fiscal.",
    meta: "Executar projetos prioritarios de modernizacao tributaria e financeira.",
    execucao_fisica: "Entregas em andamento conforme cronograma de contratacoes.",
    execucao_financeira: "Execucao parcial vinculada a desembolsos e liquidacoes.",
    resultados: "Projetos estruturantes em implementacao.",
    dificuldades: "Dependencia de contratacoes especializadas e integracoes tecnologicas.",
    proximos_passos: "Conferir cronograma, evidencias e resultados por subprojeto.",
  },
];

export const anexos: Anexo[] = [
  { id: "anexo-01", nome_arquivo: "identificacao_institucional.pdf", storage_path: "evidencias/identificacao_institucional.pdf", tipo_arquivo: "PDF", descricao: "Documento de identificacao institucional.", fonte: "Gabinete", uploaded_by: "demo", created_at: "2026-05-18T10:30:00Z" },
  { id: "anexo-02", nome_arquivo: "arrecadacao_2025.xlsx", storage_path: "evidencias/arrecadacao_2025.xlsx", tipo_arquivo: "Planilha", descricao: "Serie mensal de arrecadacao 2025.", fonte: "Arrecadacao", uploaded_by: "demo", created_at: "2026-05-18T13:00:00Z" },
  { id: "anexo-03", nome_arquivo: "empresa_facil_2025.pdf", storage_path: "evidencias/empresa_facil_2025.pdf", tipo_arquivo: "PDF", descricao: "Relatorio setorial REDESIM/Empresa Facil.", fonte: "Cadastro/REDESIM", uploaded_by: "demo", created_at: "2026-05-19T09:30:00Z" },
  { id: "anexo-04", nome_arquivo: "contratos_2025.xlsx", storage_path: "evidencias/contratos_2025.xlsx", tipo_arquivo: "Planilha", descricao: "Lista de contratos e convenios.", fonte: "Contratos e Convenios", uploaded_by: "demo", created_at: "2026-05-19T16:30:00Z" },
];

export const anexosVinculos: AnexoVinculo[] = [
  { id: "vinc-01", anexo_id: "anexo-01", item_id: "pg-01", informacao_id: "info-01" },
  { id: "vinc-02", anexo_id: "anexo-02", item_id: "pe-05", informacao_id: "info-02" },
  { id: "vinc-03", anexo_id: "anexo-03", item_id: "pe-09", informacao_id: "info-03" },
  { id: "vinc-04", anexo_id: "anexo-04", item_id: "pg-07", informacao_id: "info-06" },
];

export const ultimasAlteracoes = [
  { id: "hist-01", item: "PE.5", setor: "ARREC", acao: "Texto enviado para revisao", data: "2026-05-20T12:30:00Z" },
  { id: "hist-02", item: "PG.7", setor: "CONTR", acao: "Devolvido para complementacao", data: "2026-05-20T10:15:00Z" },
  { id: "hist-03", item: "PE.9", setor: "REDESIM", acao: "Marcado como consolidado", data: "2026-05-20T09:40:00Z" },
  { id: "hist-04", item: "PG.1", setor: "GAB", acao: "Aprovado para previa", data: "2026-05-20T11:10:00Z" },
];

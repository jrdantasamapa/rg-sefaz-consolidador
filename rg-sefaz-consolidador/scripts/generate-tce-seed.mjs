import { writeFile } from "node:fs/promises";

const schemas = {
  texto: ["texto_descritivo", "principais_resultados", "dificuldades", "providencias", "perspectivas", "fonte"],
  indicador: ["nome_indicador", "periodicidade", "data_apuracao", "unidade_medida", "indice_inicial", "meta_prevista", "resultado_alcancado", "analise_variacao", "fonte"],
  financeiro: ["programa", "acao", "fonte_recurso", "dotacao_inicial", "dotacao_final", "empenhado", "liquidado", "pago", "percentual_execucao", "restos_pagar_processados", "restos_pagar_nao_processados", "justificativa_variacao", "fonte"],
  contratos: ["objeto", "numero_licitacao", "modalidade", "situacao", "valor", "fornecedor", "numero_contrato", "vigencia", "fiscal", "gestor", "fonte"],
  pessoal: ["ano", "efetivos", "comissionados", "terceirizados", "cedidos", "inativos", "total", "folha_pagamento", "verbas_indenizatorias", "base_normativa", "fonte"],
  patrimonio: ["tipo_bem", "descricao", "quantidade", "situacao", "localizacao", "valor", "observacoes", "fonte"],
  controle: ["numero_processo", "numero_acordao_ou_relatorio", "descricao", "providencias_adotadas", "situacao", "prazo", "responsavel", "fonte"],
  projeto: ["nome_projeto", "objetivo", "meta", "execucao_fisica", "execucao_financeira", "resultados", "dificuldades", "proximos_passos", "fonte"],
  estrutura_documental: ["conteudo_obrigatorio", "status_atendimento", "observacao", "evidencia"],
  tabela: ["tabela", "fonte"],
  misto: ["richtext", "tabela", "indicadores", "anexos", "fonte"],
};

const rows = [
  ["F1", "Capa", "estrutura_formal", 1, "estrutura_documental", "SEFAZ", false],
  ["F2", "Folha de rosto", "estrutura_formal", 2, "estrutura_documental", "SEFAZ", false],
  ["F3", "Sumario", "estrutura_formal", 3, "estrutura_documental", "SEFAZ", false],
  ["F4", "Lista de tabelas, quadros, figuras, siglas e simbolos", "estrutura_formal", 4, "estrutura_documental", "SEFAZ", false],
  ["F5", "Introducao", "estrutura_formal", 5, "texto", "MULTIPLA", false],
  ["F6", "Resultados e conclusoes", "estrutura_formal", 6, "texto", "MULTIPLA", false],
  ["F7", "Anexos referenciados no texto", "estrutura_formal", 7, "estrutura_documental", "MULTIPLA", true],
  ["F8", "Requisitos do arquivo eletronico", "estrutura_formal", 8, "estrutura_documental", "SEFAZ", false],
  ["F9", "Requisitos de apresentacao grafica", "estrutura_formal", 9, "estrutura_documental", "SEFAZ", false],
  ["G1", "Identificacao e atributos da unidade", "geral", 10, "texto", "MULTIPLA", true],
  ["G2", "Entregas da unidade", "geral", 11, "texto", "MULTIPLA", true],
  ["G2.1", "O que foi proposto e o que foi alcancado", "geral", 12, "texto", "MULTIPLA", true],
  ["G2.2", "Evolucao dos indicadores", "geral", 13, "indicador", "MULTIPLA", true],
  ["G2.3", "O que nao foi alcancado e justificativas", "geral", 14, "texto", "MULTIPLA", true],
  ["G3", "Processos da unidade", "geral", 15, "texto", "MULTIPLA", true],
  ["G3.1", "Organograma", "geral", 16, "estrutura_documental", "MULTIPLA", true],
  ["G3.2", "Processos finalisticos", "geral", 17, "texto", "MULTIPLA", true],
  ["G3.3", "Processos de apoio", "geral", 18, "texto", "MULTIPLA", true],
  ["G4", "Execucao orcamentaria e financeira", "geral", 19, "financeiro", "SEFAZ", true],
  ["G4.1", "Resumo da execucao orcamentaria e financeira", "geral", 20, "financeiro", "SEFAZ", true],
  ["G4.2", "Quadro de Detalhamento da Despesa - QDD", "geral", 21, "financeiro", "SEFAZ", true],
  ["G4.3", "Gestao dos Restos a Pagar", "geral", 22, "financeiro", "SEFAZ", true],
  ["G4.4", "Despesas de exercicios anteriores", "geral", 23, "financeiro", "SEFAZ", true],
  ["G5", "Gestao do patrimonio mobiliario e imobiliario", "geral", 24, "patrimonio", "SEFAZ", true],
  ["G5.1", "Frota de veiculos proprios e locados", "geral", 25, "patrimonio", "SEFAZ", true],
  ["G5.2", "Patrimonio imobiliario proprio e imoveis locados", "geral", 26, "patrimonio", "SEFAZ", true],
  ["G6", "Informacoes contabeis", "geral", 27, "texto", "SEFAZ", true],
  ["G6.1", "Criterios MCASP para depreciacao, amortizacao, exaustao, ativos e passivos", "geral", 28, "texto", "SEFAZ", true],
  ["G6.2", "Declaracao do contador", "geral", 29, "estrutura_documental", "SEFAZ", true],
  ["G6.3", "Demonstracoes contabeis e notas explicativas", "geral", 30, "estrutura_documental", "SEFAZ", true],
  ["G6.4", "Demonstrativos de empresas publicas e sociedades de economia mista, quando aplicavel", "geral", 31, "estrutura_documental", "SEFAZ", false],
  ["G7", "Licitacoes, contratos, convenios e obras", "geral", 32, "contratos", "SEFAZ", true],
  ["G7.1", "Informacoes sobre licitacoes, contratos, convenios e obras", "geral", 33, "contratos", "SEFAZ", true],
  ["G7.2", "Designacao e regras de atuacao dos agentes de contratacao, equipe de apoio, fiscais e gestores", "geral", 34, "controle", "SEFAZ", true],
  ["G8", "Pessoal", "geral", 35, "pessoal", "SEFAZ", true],
  ["G9", "Tratamento das recomendacoes/determinacoes do controle interno e do Tribunal", "geral", 36, "controle", "SEFAZ", true],
  ["G9.1", "Providencias sobre deliberacoes/acordaos do TCE/AP", "geral", 37, "controle", "SEFAZ", true],
  ["G9.2", "Providencias sobre recomendacoes do controle interno", "geral", 38, "controle", "SEFAZ", true],
  ["G9.3", "Medidas administrativas para apuracao de responsabilidade por dano ao erario", "geral", 39, "controle", "SEFAZ", true],
  ["G10", "Outras informacoes sobre a gestao", "geral", 40, "texto", "MULTIPLA", false],
  ["E1", "Informacoes sobre a politica tributaria e de arrecadacao do Estado", "especifica", 41, "texto", "SARE", true],
  ["E2", "Informacoes sobre a politica financeira e contabil do Estado", "especifica", 42, "texto", "SATE", true],
  ["E3", "Informacoes sobre os planos de atividades de tributacao, arrecadacao, fiscalizacao e controle financeiro e contabil", "especifica", 43, "misto", "MULTIPLA", true],
  ["E4", "Informacoes detalhadas sobre a execucao das atividades de tributacao e fiscalizacao", "especifica", 44, "misto", "SARE", true],
  ["E5", "Informacoes detalhadas sobre os resultados da arrecadacao do Estado", "especifica", 45, "misto", "SARE", true],
  ["E6", "Informacoes detalhadas sobre o controle financeiro e contabil", "especifica", 46, "financeiro", "SATE", true],
  ["E7", "Informacoes sobre os controles internos imprescindiveis a boa e regular aplicacao dos recursos publicos", "especifica", 47, "controle", "SEFAZ", true],
  ["E8", "Informacoes sobre a gestao da renuncia de receita e beneficios fiscais", "especifica", 48, "misto", "SARE", true],
  ["E9", "Informacoes quanto a integracao a REDESIM e funcionamento do Empresa Facil", "especifica", 49, "misto", "SARE", true],
  ["E10", "Evolucao do indicador Variacao anual da arrecadacao propria do GEA", "especifica", 50, "indicador", "SARE", true],
  ["E11", "Evolucao do indicador Percentual da modernizacao da Administracao Tributaria implantado", "especifica", 51, "indicador", "SARE", true],
  ["E12", "Evolucao do indicador Valor Arrecadado com Certificacao de Projetos Economicos e Ambientais", "especifica", 52, "indicador", "SARE", true],
  ["E13", "Implementacao do FUNDA/AP", "especifica", 53, "projeto", "FUNDA", true],
  ["E14", "Execucao dos recursos recebidos por meio do PROFISCO II - Contrato no 298/2023/PFN", "especifica", 54, "projeto", "SEFAZ", true],
  ["A1", "Quadro de Detalhamento da Despesa - QDD", "apendice", 55, "financeiro", "SEFAZ", true],
  ["A2", "Informacoes sobre licitacoes realizadas no exercicio", "apendice", 56, "contratos", "SEFAZ", true],
  ["A3", "Informacoes sobre contratos firmados e executados no exercicio", "apendice", 57, "contratos", "SEFAZ", true],
  ["A4", "Informacoes sobre convenios", "apendice", 58, "contratos", "SEFAZ", true],
  ["A5", "Informacoes sobre obras", "apendice", 59, "contratos", "SEFAZ", true],
  ["A6", "Informacoes sobre pessoal", "apendice", 60, "pessoal", "SEFAZ", true],
  ["X1", "Rol de responsaveis em arquivo proprio", "rol_responsaveis", 61, "estrutura_documental", "SEFAZ", true],
  ["X2", "Ato administrativo de nomeacao do dirigente maximo", "anexo", 62, "estrutura_documental", "SEFAZ", true],
  ["X3", "Relatorios, pareceres ou declaracoes exigiveis, quando houver", "anexo", 63, "estrutura_documental", "SEFAZ", false],
  ["X4", "Relatorio da area de correicao sobre fatos apurados ou em apuracao", "anexo", 64, "controle", "SEFAZ", true],
  ["X5", "Relatorio do banco operador sobre gestao dos recursos do fundo, se aplicavel", "anexo", 65, "estrutura_documental", "FUNDA", false],
];

const esc = (value) => String(value).replaceAll("'", "''");
const schema = (type) => JSON.stringify(schemas[type].map((name) => ({ name, label: name.replaceAll("_", " "), type: name === "fonte" ? "text" : "textarea", required: name === "fonte" }))).replaceAll("'", "''");

let sql = "-- Seed normativo TCE/AP DN 029/2025\n";
sql += "insert into public.itens_tce (codigo, titulo, descricao_exigencia, fundamento_normativo, parte, ordem, obrigatorio, aplicavel_sefaz, unidade_consolidada, tipo_resposta, campos_schema, evidencia_obrigatoria, observacao_orientativa)\nvalues\n";
sql += rows.map(([codigo, titulo, parte, ordem, tipo, unidade, evidencia]) => `('${codigo}', '${esc(titulo)}', 'Exigencia da DN TCE/AP no 029/2025 para ${esc(titulo)}.', 'DN TCE/AP no 029/2025', '${parte}', ${ordem}, true, true, '${unidade}', '${tipo}', '${schema(tipo)}'::jsonb, ${evidencia}, 'Preencher com informacoes oficiais ja recebidas, indicar fonte e anexar evidencias quando aplicavel.')`).join(",\n");
sql += "\non conflict (codigo) do update set titulo = excluded.titulo, descricao_exigencia = excluded.descricao_exigencia, parte = excluded.parte, ordem = excluded.ordem, tipo_resposta = excluded.tipo_resposta, campos_schema = excluded.campos_schema, evidencia_obrigatoria = excluded.evidencia_obrigatoria, unidade_consolidada = excluded.unidade_consolidada;\n";
sql += "insert into public.versoes_relatorio (exercicio, titulo, unidade_apresentadora, status, conteudo_json) values (2025, 'Relatorio de gestao de 2025_SEFAZ', 'SEFAZ/AP', 'rascunho', '{}'::jsonb) on conflict do nothing;\n";

await writeFile("supabase/seed_tce.sql", sql);

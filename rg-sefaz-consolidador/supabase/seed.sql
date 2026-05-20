insert into public.tipos_formulario (codigo, nome, descricao, icone, ativo)
values
  ('TEXTO_TECNICO', 'Texto tecnico', 'Texto original, consolidacao tecnica, resultados e controle da informacao.', 'FileText', true),
  ('INDICADORES', 'Indicadores', 'Indicadores com formula, meta, resultado, percentual e tendencia.', 'LineChart', true),
  ('EXECUCAO_ORCAMENTARIA', 'Execucao orcamentaria', 'LOA, QDD, execucao financeira, restos a pagar e creditos adicionais.', 'Calculator', true),
  ('CONTRATOS_LICITACOES', 'Contratos e licitacoes', 'Processos, contratos, objetos, valores, vigencia, fiscais e gestores.', 'FileSignature', true),
  ('PATRIMONIO', 'Patrimonio', 'Bens, quantidades, situacao, localizacao e valor estimado.', 'Archive', true),
  ('GESTAO_PESSOAS', 'Gestao de pessoas', 'Forca de trabalho, capacitacoes, afastamentos e aposentadorias.', 'UsersRound', true),
  ('CONTROLE_INTERNO', 'Controle interno', 'Recomendacoes, acordaos, providencias, prazos e atendimento.', 'ShieldCheck', true),
  ('ARRECADACAO_FISCALIZACAO', 'Arrecadacao e fiscalizacao', 'Receitas, fiscalizacao, autos, recuperacao, beneficios e modernizacao.', 'ReceiptText', true),
  ('PROGRAMAS_PROJETOS', 'Programas e projetos', 'PROFISCO II, FUNDA/AP, modernizacao e projetos estrategicos.', 'Rocket', true),
  ('EVIDENCIAS_ANEXOS', 'Evidencias e anexos', 'Cadastro, preview, download e vinculos multiplos de anexos.', 'Paperclip', true)
on conflict (codigo) do update set
  nome = excluded.nome,
  descricao = excluded.descricao,
  icone = excluded.icone,
  ativo = excluded.ativo;

insert into public.setores (nome, sigla, tipo, responsavel_nome, responsavel_cargo, contato)
values
  ('Gabinete', 'GAB', 'gestao', 'Chefia de Gabinete', 'Chefe de Gabinete', 'gabinete@sefaz.ap.gov.br'),
  ('ADINS/Planejamento', 'ADINS', 'gestao', 'Coordenacao ADINS', 'Coordenador', 'adins@sefaz.ap.gov.br'),
  ('Secretaria Adjunta da Receita Estadual - SARE', 'SARE', 'finalistico', 'Secretario Adjunto da Receita', 'Secretario Adjunto', 'sare@sefaz.ap.gov.br'),
  ('Tributacao', 'TRIB', 'finalistico', 'Coordenacao de Tributacao', 'Coordenador', 'tributacao@sefaz.ap.gov.br'),
  ('Arrecadacao', 'ARREC', 'finalistico', 'Coordenacao de Arrecadacao', 'Coordenador', 'arrecadacao@sefaz.ap.gov.br'),
  ('Fiscalizacao', 'FISC', 'finalistico', 'Coordenacao de Fiscalizacao', 'Coordenador', 'fiscalizacao@sefaz.ap.gov.br'),
  ('Cadastro/REDESIM', 'REDESIM', 'finalistico', 'Gestao REDESIM', 'Gerente', 'redesim@sefaz.ap.gov.br'),
  ('Tecnologia/Modernizacao Tributaria', 'MODERN', 'programa', 'Gestao de Modernizacao', 'Gerente', 'modernizacao@sefaz.ap.gov.br'),
  ('Secretaria Adjunta do Tesouro Estadual - SATE', 'SATE', 'finalistico', 'Secretario Adjunto do Tesouro', 'Secretario Adjunto', 'sate@sefaz.ap.gov.br'),
  ('Contabilidade', 'CONTAB', 'controle', 'Contador Geral', 'Coordenador', 'contabilidade@sefaz.ap.gov.br'),
  ('Tesouro/Financeiro', 'TESOURO', 'finalistico', 'Coordenacao Financeira', 'Coordenador', 'tesouro@sefaz.ap.gov.br'),
  ('Orcamento', 'ORC', 'apoio', 'Coordenacao Orcamentaria', 'Coordenador', 'orcamento@sefaz.ap.gov.br'),
  ('Contratos e Convenios', 'CONTR', 'apoio', 'Gestao de Contratos', 'Gerente', 'contratos@sefaz.ap.gov.br'),
  ('Compras/Licitacoes', 'LIC', 'apoio', 'Comissao de Licitacao', 'Presidente', 'licitacoes@sefaz.ap.gov.br'),
  ('Patrimonio', 'PATR', 'apoio', 'Gestao Patrimonial', 'Gerente', 'patrimonio@sefaz.ap.gov.br'),
  ('Administrativo', 'ADM', 'apoio', 'Coordenacao Administrativa', 'Coordenador', 'administrativo@sefaz.ap.gov.br'),
  ('Recursos Humanos', 'RH', 'apoio', 'Gestao de Pessoas', 'Gerente', 'rh@sefaz.ap.gov.br'),
  ('Controle Interno', 'CI', 'controle', 'Unidade de Controle Interno', 'Controlador', 'controle.interno@sefaz.ap.gov.br'),
  ('Corregedoria/Comissoes', 'CORREG', 'controle', 'Corregedoria', 'Corregedor', 'corregedoria@sefaz.ap.gov.br'),
  ('FUNDA/AP', 'FUNDA', 'fundo', 'Gestao FUNDA/AP', 'Gestor do Fundo', 'funda@sefaz.ap.gov.br'),
  ('PROFISCO II', 'PROFISCO', 'programa', 'Unidade PROFISCO II', 'Coordenador', 'profisco@sefaz.ap.gov.br')
on conflict (sigla) do update set
  nome = excluded.nome,
  tipo = excluded.tipo,
  responsavel_nome = excluded.responsavel_nome,
  responsavel_cargo = excluded.responsavel_cargo,
  contato = excluded.contato;

insert into public.itens_relatorio (codigo, titulo, descricao, parte, ordem, setor_responsavel_padrao_id, obrigatorio, criticidade)
select i.codigo, i.titulo, i.descricao, i.parte::parte_relatorio, i.ordem, s.id, i.obrigatorio, i.criticidade::criticidade_item
from (
  values
    ('1', 'Identificacao e atributos da unidade', 'Identificacao institucional, competencias, dirigentes e atributos da unidade.', 'geral', 1, 'GAB', true, 'alta'),
    ('2', 'Entregas da unidade', 'Entregas institucionais realizadas no exercicio.', 'geral', 2, 'ADINS', true, 'alta'),
    ('2.1', 'O que foi proposto e o que foi alcancado', 'Comparacao entre propostas, metas e resultados.', 'geral', 3, 'ADINS', true, 'alta'),
    ('2.2', 'Evolucao dos indicadores', 'Evolucao dos indicadores de gestao.', 'geral', 4, 'ADINS', true, 'media'),
    ('2.3', 'O que nao foi alcancado', 'Metas nao alcancadas, causas e providencias.', 'geral', 5, 'ADINS', true, 'media'),
    ('3', 'Processos da unidade', 'Processos de trabalho e estrutura de gestao.', 'geral', 6, 'ADM', true, 'media'),
    ('3.1', 'Organograma', 'Organograma e estrutura administrativa.', 'geral', 7, 'GAB', true, 'baixa'),
    ('3.2', 'Processos finalisticos', 'Processos ligados a receita, tesouro e gestao fiscal.', 'geral', 8, 'SARE', true, 'media'),
    ('3.3', 'Processos de apoio', 'Processos administrativos e de suporte.', 'geral', 9, 'ADM', true, 'baixa'),
    ('4', 'Execucao orcamentaria e financeira', 'Execucao da receita e despesa no exercicio.', 'geral', 10, 'ORC', true, 'alta'),
    ('4.1', 'Resumo da execucao orcamentaria e financeira', 'Resumo executivo da execucao orcamentaria e financeira.', 'geral', 11, 'ORC', true, 'alta'),
    ('4.2', 'QDD', 'Quadro de detalhamento da despesa.', 'geral', 12, 'ORC', true, 'media'),
    ('4.3', 'Restos a pagar', 'Restos a pagar inscritos, pagos e cancelados.', 'geral', 13, 'TESOURO', true, 'alta'),
    ('4.4', 'Despesas de exercicios anteriores', 'Despesas reconhecidas como exercicios anteriores.', 'geral', 14, 'CONTAB', true, 'media'),
    ('5', 'Gestao do patrimonio mobiliario e imobiliario', 'Bens moveis, imoveis, inventario e controle patrimonial.', 'geral', 15, 'PATR', true, 'media'),
    ('6', 'Informacoes contabeis', 'Demonstracoes, notas e informacoes contabeis relevantes.', 'geral', 16, 'CONTAB', true, 'alta'),
    ('7', 'Licitacoes, contratos, convenios e obras', 'Contratacoes, convenios, aditivos, obras e instrumentos correlatos.', 'geral', 17, 'CONTR', true, 'alta'),
    ('8', 'Pessoal', 'Forca de trabalho, cargos, despesas e informacoes de pessoal.', 'geral', 18, 'RH', true, 'media'),
    ('9', 'Tratamento das recomendacoes/determinacoes do controle interno e do TCE', 'Providencias adotadas diante de recomendacoes, determinacoes e achados.', 'geral', 19, 'CI', true, 'alta'),
    ('10', 'Outras informacoes sobre a gestao', 'Informacoes complementares relevantes para a prestacao de contas.', 'geral', 20, 'GAB', false, 'baixa'),
    ('PE.1', 'Politica tributaria e de arrecadacao do Estado', 'Diretrizes e medidas de politica tributaria e arrecadatoria.', 'especifica', 21, 'TRIB', true, 'alta'),
    ('PE.2', 'Politica financeira e contabil do Estado', 'Diretrizes de gestao financeira e contabil estadual.', 'especifica', 22, 'SATE', true, 'alta'),
    ('PE.3', 'Planos de atividades de tributacao, arrecadacao, fiscalizacao e controle financeiro e contabil', 'Planos, programacoes e linhas de atuacao.', 'especifica', 23, 'SARE', true, 'alta'),
    ('PE.4', 'Execucao das atividades de tributacao e fiscalizacao', 'Resultados da execucao das atividades fiscais.', 'especifica', 24, 'FISC', true, 'alta'),
    ('PE.5', 'Resultados da arrecadacao do Estado', 'Resultado da arrecadacao estadual e variacoes relevantes.', 'especifica', 25, 'ARREC', true, 'alta'),
    ('PE.6', 'Controle financeiro e contabil', 'Controles de execucao financeira e registros contabeis.', 'especifica', 26, 'CONTAB', true, 'alta'),
    ('PE.7', 'Controles internos imprescindiveis a boa e regular aplicacao dos recursos publicos', 'Controles internos e salvaguardas para aplicacao regular dos recursos.', 'especifica', 27, 'CI', true, 'alta'),
    ('PE.8', 'Gestao da renuncia de receita e beneficios fiscais', 'Controle, monitoramento e transparencia da renuncia de receita.', 'especifica', 28, 'TRIB', true, 'alta'),
    ('PE.9', 'REDESIM e Empresa Facil', 'Integracao, simplificacao e resultados da REDESIM/Empresa Facil.', 'especifica', 29, 'REDESIM', true, 'media'),
    ('PE.10', 'Indicador: Variacao anual da arrecadacao propria do GEA', 'Indicador de variacao anual da arrecadacao propria.', 'especifica', 30, 'ARREC', true, 'alta'),
    ('PE.11', 'Indicador: Percentual da modernizacao da Administracao Tributaria implantado', 'Indicador de implantacao da modernizacao tributaria.', 'especifica', 31, 'MODERN', true, 'media'),
    ('PE.12', 'Indicador: Valor arrecadado com certificacao de projetos economicos e ambientais', 'Indicador de arrecadacao relacionada a certificacao de projetos.', 'especifica', 32, 'ARREC', true, 'media'),
    ('PE.13', 'Implementacao do FUNDA/AP', 'Implementacao, governanca e resultados do FUNDA/AP.', 'especifica', 33, 'FUNDA', true, 'alta'),
    ('PE.14', 'Execucao dos recursos do PROFISCO II', 'Projetos, contratos, desembolsos e resultados do PROFISCO II.', 'especifica', 34, 'PROFISCO', true, 'alta')
) as i(codigo, titulo, descricao, parte, ordem, setor_sigla, obrigatorio, criticidade)
join public.setores s on s.sigla = i.setor_sigla
on conflict (codigo) do update set
  titulo = excluded.titulo,
  descricao = excluded.descricao,
  parte = excluded.parte,
  ordem = excluded.ordem,
  setor_responsavel_padrao_id = excluded.setor_responsavel_padrao_id,
  obrigatorio = excluded.obrigatorio,
  criticidade = excluded.criticidade;

update public.itens_relatorio item
set tipo_formulario_id = tf.id
from (
  values
    ('1', 'TEXTO_TECNICO'),
    ('2', 'TEXTO_TECNICO'),
    ('2.1', 'TEXTO_TECNICO'),
    ('2.2', 'INDICADORES'),
    ('2.3', 'TEXTO_TECNICO'),
    ('3', 'TEXTO_TECNICO'),
    ('3.1', 'TEXTO_TECNICO'),
    ('3.2', 'TEXTO_TECNICO'),
    ('3.3', 'TEXTO_TECNICO'),
    ('4', 'EXECUCAO_ORCAMENTARIA'),
    ('4.1', 'EXECUCAO_ORCAMENTARIA'),
    ('4.2', 'EXECUCAO_ORCAMENTARIA'),
    ('4.3', 'EXECUCAO_ORCAMENTARIA'),
    ('4.4', 'EXECUCAO_ORCAMENTARIA'),
    ('5', 'PATRIMONIO'),
    ('6', 'TEXTO_TECNICO'),
    ('7', 'CONTRATOS_LICITACOES'),
    ('8', 'GESTAO_PESSOAS'),
    ('9', 'CONTROLE_INTERNO'),
    ('10', 'TEXTO_TECNICO'),
    ('PE.1', 'ARRECADACAO_FISCALIZACAO'),
    ('PE.2', 'TEXTO_TECNICO'),
    ('PE.3', 'ARRECADACAO_FISCALIZACAO'),
    ('PE.4', 'ARRECADACAO_FISCALIZACAO'),
    ('PE.5', 'ARRECADACAO_FISCALIZACAO'),
    ('PE.6', 'EXECUCAO_ORCAMENTARIA'),
    ('PE.7', 'CONTROLE_INTERNO'),
    ('PE.8', 'ARRECADACAO_FISCALIZACAO'),
    ('PE.9', 'ARRECADACAO_FISCALIZACAO'),
    ('PE.10', 'INDICADORES'),
    ('PE.11', 'INDICADORES'),
    ('PE.12', 'INDICADORES'),
    ('PE.13', 'PROGRAMAS_PROJETOS'),
    ('PE.14', 'PROGRAMAS_PROJETOS')
) as mapa(codigo_item, codigo_formulario)
join public.tipos_formulario tf on tf.codigo = mapa.codigo_formulario
where item.codigo = mapa.codigo_item;

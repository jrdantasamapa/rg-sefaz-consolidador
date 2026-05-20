export type PerfilUsuario = "admin" | "coordenador" | "setor" | "revisor";

export type ParteRelatorio = "geral" | "especifica" | "apendice" | "anexo";
export type Criticidade = "baixa" | "media" | "alta";
export type TipoSetor = "finalistico" | "apoio" | "controle" | "gestao" | "fundo" | "programa";

export type StatusInformacao = "pendente" | "recebido" | "em_revisao" | "consolidado" | "aprovado" | "devolvido";
export type TipoFormularioCodigo =
  | "TEXTO_TECNICO"
  | "INDICADORES"
  | "EXECUCAO_ORCAMENTARIA"
  | "CONTRATOS_LICITACOES"
  | "PATRIMONIO"
  | "GESTAO_PESSOAS"
  | "CONTROLE_INTERNO"
  | "ARRECADACAO_FISCALIZACAO"
  | "PROGRAMAS_PROJETOS"
  | "EVIDENCIAS_ANEXOS";
export type TendenciaIndicador = "crescimento" | "reducao" | "estabilidade";

export interface Profile {
  id: string;
  nome: string;
  email: string;
  perfil: PerfilUsuario;
  setor_id?: string | null;
  created_at: string;
}

export interface Setor {
  id: string;
  nome: string;
  sigla: string;
  tipo: TipoSetor;
  responsavel_nome: string;
  responsavel_cargo: string;
  contato: string;
  ativo: boolean;
}

export interface ItemRelatorio {
  id: string;
  codigo: string;
  titulo: string;
  descricao: string;
  parte: ParteRelatorio;
  ordem: number;
  setor_responsavel_padrao_id: string;
  tipo_formulario_id: TipoFormularioCodigo;
  obrigatorio: boolean;
  criticidade: Criticidade;
}

export interface TipoFormulario {
  id: TipoFormularioCodigo;
  codigo: TipoFormularioCodigo;
  nome: string;
  descricao: string;
  icone: string;
  ativo: boolean;
}

export interface InformacaoConsolidada {
  id: string;
  item_id: string;
  setor_id: string;
  titulo_interno: string;
  texto_original_recebido: string;
  texto_tecnico_consolidado: string;
  principais_resultados: string;
  dados_quantitativos: string;
  metas_previstas: string;
  resultados_alcancados: string;
  justificativa_nao_alcance: string;
  fonte_informacao: string;
  responsavel_informacao_nome: string;
  responsavel_informacao_cargo: string;
  observacoes_consolidacao: string;
  status: StatusInformacao;
  created_by?: string | null;
  updated_by?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Indicador {
  id: string;
  informacao_id: string;
  nome: string;
  unidade_medida: string;
  periodicidade: string;
  indice_inicial: string;
  meta: string;
  resultado: string;
  data_apuracao: string;
  observacao: string;
}

export interface IndicadorRelatorio {
  id: string;
  informacao_id: string;
  nome: string;
  descricao: string;
  formula_calculo: string;
  unidade_medida: string;
  periodicidade: string;
  indice_inicial: string;
  meta_prevista: string;
  resultado_alcancado: string;
  percentual_atingido: number;
  tendencia: TendenciaIndicador;
  justificativa: string;
  fonte: string;
  data_apuracao: string;
}

export interface ExecucaoOrcamentaria {
  id: string;
  informacao_id: string;
  programa: string;
  acao: string;
  fonte: string;
  dotacao_inicial: number;
  dotacao_atualizada: number;
  empenhado: number;
  liquidado: number;
  pago: number;
  percentual_executado: number;
  restos_pagar_processados: number;
  restos_pagar_nao_processados: number;
  justificativa: string;
}

export interface ContratoRelatorio {
  id: string;
  informacao_id: string;
  numero_processo: string;
  numero_contrato: string;
  objeto: string;
  modalidade: string;
  contratado: string;
  valor: number;
  vigencia: string;
  status: string;
  fiscal: string;
  gestor: string;
  observacoes: string;
}

export interface PatrimonioRelatorio {
  id: string;
  informacao_id: string;
  tipo_bem: string;
  descricao: string;
  quantidade: number;
  situacao: string;
  localizacao: string;
  valor_estimado: number;
  observacoes: string;
}

export interface GestaoPessoasRelatorio {
  id: string;
  informacao_id: string;
  servidores_efetivos: number;
  comissionados: number;
  temporarios: number;
  terceirizados: number;
  estagiarios: number;
  capacitacoes_realizadas: number;
  afastamentos: number;
  aposentadorias: number;
  observacoes: string;
}

export interface ControleInternoRelatorio {
  id: string;
  informacao_id: string;
  orgao_controle: string;
  numero_recomendacao_acordao: string;
  objeto: string;
  situacao: string;
  providencias_adotadas: string;
  responsavel: string;
  prazo: string;
  status_atendimento: string;
}

export interface ArrecadacaoRelatorio {
  id: string;
  informacao_id: string;
  tipo_receita: string;
  arrecadacao_prevista: number;
  arrecadacao_realizada: number;
  variacao_percentual: number;
  beneficios_fiscais: string;
  acoes_modernizacao: string;
  redesim_empresa_facil: string;
  analise_tecnica_resultados: string;
}

export interface FiscalizacaoRelatorio {
  id: string;
  informacao_id: string;
  acoes_fiscalizacao: string;
  quantidade_autos: number;
  valor_recuperado: number;
  operacoes_realizadas: string;
  analise_tecnica_resultados: string;
}

export interface ProgramaProjetoRelatorio {
  id: string;
  informacao_id: string;
  programa_projeto: string;
  objetivo: string;
  meta: string;
  execucao_fisica: string;
  execucao_financeira: string;
  resultados: string;
  dificuldades: string;
  proximos_passos: string;
}

export interface Anexo {
  id: string;
  nome_arquivo: string;
  storage_path: string;
  tipo_arquivo: string;
  descricao: string;
  fonte: string;
  uploaded_by?: string | null;
  created_at: string;
}

export interface AnexoVinculo {
  id: string;
  anexo_id: string;
  item_id: string;
  informacao_id?: string | null;
  indicador_relatorio_id?: string | null;
  contrato_relatorio_id?: string | null;
  execucao_orcamentaria_id?: string | null;
}

export interface HistoricoStatus {
  id: string;
  informacao_id: string;
  status_anterior?: StatusInformacao | null;
  status_novo: StatusInformacao;
  usuario_id?: string | null;
  observacao?: string | null;
  created_at: string;
}

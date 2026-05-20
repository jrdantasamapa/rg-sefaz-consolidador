create table public.tipos_formulario (
  id uuid primary key default gen_random_uuid(),
  codigo text not null unique,
  nome text not null,
  descricao text,
  icone text,
  ativo boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.itens_relatorio
  add column tipo_formulario_id uuid references public.tipos_formulario (id) on delete set null;

create table public.indicadores_relatorio (
  id uuid primary key default gen_random_uuid(),
  informacao_id uuid not null references public.informacoes_consolidadas (id) on delete cascade,
  nome text not null,
  descricao text,
  formula_calculo text,
  unidade_medida text,
  periodicidade text,
  indice_inicial text,
  meta_prevista text,
  resultado_alcancado text,
  percentual_atingido numeric(8, 2),
  tendencia text check (tendencia in ('crescimento', 'reducao', 'estabilidade')),
  justificativa text,
  fonte text,
  data_apuracao date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.execucao_orcamentaria (
  id uuid primary key default gen_random_uuid(),
  informacao_id uuid not null references public.informacoes_consolidadas (id) on delete cascade,
  programa text,
  acao text,
  fonte text,
  dotacao_inicial numeric(16, 2),
  dotacao_atualizada numeric(16, 2),
  empenhado numeric(16, 2),
  liquidado numeric(16, 2),
  pago numeric(16, 2),
  percentual_executado numeric(8, 2),
  restos_pagar_processados numeric(16, 2),
  restos_pagar_nao_processados numeric(16, 2),
  justificativa text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.contratos_relatorio (
  id uuid primary key default gen_random_uuid(),
  informacao_id uuid not null references public.informacoes_consolidadas (id) on delete cascade,
  numero_processo text,
  numero_contrato text,
  objeto text,
  modalidade text,
  contratado text,
  valor numeric(16, 2),
  vigencia text,
  status text,
  fiscal text,
  gestor text,
  observacoes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.patrimonio_relatorio (
  id uuid primary key default gen_random_uuid(),
  informacao_id uuid not null references public.informacoes_consolidadas (id) on delete cascade,
  tipo_bem text,
  descricao text,
  quantidade numeric(14, 2),
  situacao text,
  localizacao text,
  valor_estimado numeric(16, 2),
  observacoes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.gestao_pessoas_relatorio (
  id uuid primary key default gen_random_uuid(),
  informacao_id uuid not null references public.informacoes_consolidadas (id) on delete cascade,
  servidores_efetivos integer default 0,
  comissionados integer default 0,
  temporarios integer default 0,
  terceirizados integer default 0,
  estagiarios integer default 0,
  capacitacoes_realizadas integer default 0,
  afastamentos integer default 0,
  aposentadorias integer default 0,
  observacoes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.controle_interno_relatorio (
  id uuid primary key default gen_random_uuid(),
  informacao_id uuid not null references public.informacoes_consolidadas (id) on delete cascade,
  orgao_controle text,
  numero_recomendacao_acordao text,
  objeto text,
  situacao text,
  providencias_adotadas text,
  responsavel text,
  prazo date,
  status_atendimento text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.arrecadacao_relatorio (
  id uuid primary key default gen_random_uuid(),
  informacao_id uuid not null references public.informacoes_consolidadas (id) on delete cascade,
  tipo_receita text,
  arrecadacao_prevista numeric(16, 2),
  arrecadacao_realizada numeric(16, 2),
  variacao_percentual numeric(8, 2),
  beneficios_fiscais text,
  acoes_modernizacao text,
  redesim_empresa_facil text,
  analise_tecnica_resultados text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.fiscalizacao_relatorio (
  id uuid primary key default gen_random_uuid(),
  informacao_id uuid not null references public.informacoes_consolidadas (id) on delete cascade,
  acoes_fiscalizacao text,
  quantidade_autos integer default 0,
  valor_recuperado numeric(16, 2),
  operacoes_realizadas text,
  analise_tecnica_resultados text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.programas_projetos_relatorio (
  id uuid primary key default gen_random_uuid(),
  informacao_id uuid not null references public.informacoes_consolidadas (id) on delete cascade,
  programa_projeto text,
  objetivo text,
  meta text,
  execucao_fisica text,
  execucao_financeira text,
  resultados text,
  dificuldades text,
  proximos_passos text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.anexos_vinculos
  add column indicador_relatorio_id uuid references public.indicadores_relatorio (id) on delete cascade,
  add column contrato_relatorio_id uuid references public.contratos_relatorio (id) on delete cascade,
  add column execucao_orcamentaria_id uuid references public.execucao_orcamentaria (id) on delete cascade;

create trigger indicadores_relatorio_touch_updated_at before update on public.indicadores_relatorio for each row execute function public.touch_updated_at();
create trigger execucao_orcamentaria_touch_updated_at before update on public.execucao_orcamentaria for each row execute function public.touch_updated_at();
create trigger contratos_relatorio_touch_updated_at before update on public.contratos_relatorio for each row execute function public.touch_updated_at();
create trigger patrimonio_relatorio_touch_updated_at before update on public.patrimonio_relatorio for each row execute function public.touch_updated_at();
create trigger gestao_pessoas_relatorio_touch_updated_at before update on public.gestao_pessoas_relatorio for each row execute function public.touch_updated_at();
create trigger controle_interno_relatorio_touch_updated_at before update on public.controle_interno_relatorio for each row execute function public.touch_updated_at();
create trigger arrecadacao_relatorio_touch_updated_at before update on public.arrecadacao_relatorio for each row execute function public.touch_updated_at();
create trigger fiscalizacao_relatorio_touch_updated_at before update on public.fiscalizacao_relatorio for each row execute function public.touch_updated_at();
create trigger programas_projetos_relatorio_touch_updated_at before update on public.programas_projetos_relatorio for each row execute function public.touch_updated_at();

create index idx_itens_tipo_formulario on public.itens_relatorio (tipo_formulario_id);
create index idx_indicadores_relatorio_info on public.indicadores_relatorio (informacao_id);
create index idx_execucao_orcamentaria_info on public.execucao_orcamentaria (informacao_id);
create index idx_contratos_relatorio_info on public.contratos_relatorio (informacao_id);
create index idx_patrimonio_relatorio_info on public.patrimonio_relatorio (informacao_id);
create index idx_gestao_pessoas_relatorio_info on public.gestao_pessoas_relatorio (informacao_id);
create index idx_controle_interno_relatorio_info on public.controle_interno_relatorio (informacao_id);
create index idx_arrecadacao_relatorio_info on public.arrecadacao_relatorio (informacao_id);
create index idx_fiscalizacao_relatorio_info on public.fiscalizacao_relatorio (informacao_id);
create index idx_programas_projetos_relatorio_info on public.programas_projetos_relatorio (informacao_id);

alter table public.tipos_formulario enable row level security;
alter table public.indicadores_relatorio enable row level security;
alter table public.execucao_orcamentaria enable row level security;
alter table public.contratos_relatorio enable row level security;
alter table public.patrimonio_relatorio enable row level security;
alter table public.gestao_pessoas_relatorio enable row level security;
alter table public.controle_interno_relatorio enable row level security;
alter table public.arrecadacao_relatorio enable row level security;
alter table public.fiscalizacao_relatorio enable row level security;
alter table public.programas_projetos_relatorio enable row level security;

create policy "authenticated read tipos formulario"
on public.tipos_formulario for select
using (auth.uid() is not null);

create policy "admin coordinator write tipos formulario"
on public.tipos_formulario for all
using (public.is_admin_or_coordinator())
with check (public.is_admin_or_coordinator());

create or replace function public.can_edit_informacao(target_informacao_id uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
      from public.informacoes_consolidadas info
     where info.id = target_informacao_id
       and (
         public.is_admin_or_coordinator()
         or public.is_reviewer()
         or info.setor_id = public.current_profile_setor_id()
       )
  )
$$;

create policy "authenticated read indicadores relatorio" on public.indicadores_relatorio for select using (auth.uid() is not null);
create policy "edit indicadores relatorio" on public.indicadores_relatorio for all using (public.can_edit_informacao(informacao_id)) with check (public.can_edit_informacao(informacao_id));

create policy "authenticated read execucao" on public.execucao_orcamentaria for select using (auth.uid() is not null);
create policy "edit execucao" on public.execucao_orcamentaria for all using (public.can_edit_informacao(informacao_id)) with check (public.can_edit_informacao(informacao_id));

create policy "authenticated read contratos" on public.contratos_relatorio for select using (auth.uid() is not null);
create policy "edit contratos" on public.contratos_relatorio for all using (public.can_edit_informacao(informacao_id)) with check (public.can_edit_informacao(informacao_id));

create policy "authenticated read patrimonio" on public.patrimonio_relatorio for select using (auth.uid() is not null);
create policy "edit patrimonio" on public.patrimonio_relatorio for all using (public.can_edit_informacao(informacao_id)) with check (public.can_edit_informacao(informacao_id));

create policy "authenticated read gestao pessoas" on public.gestao_pessoas_relatorio for select using (auth.uid() is not null);
create policy "edit gestao pessoas" on public.gestao_pessoas_relatorio for all using (public.can_edit_informacao(informacao_id)) with check (public.can_edit_informacao(informacao_id));

create policy "authenticated read controle interno" on public.controle_interno_relatorio for select using (auth.uid() is not null);
create policy "edit controle interno" on public.controle_interno_relatorio for all using (public.can_edit_informacao(informacao_id)) with check (public.can_edit_informacao(informacao_id));

create policy "authenticated read arrecadacao" on public.arrecadacao_relatorio for select using (auth.uid() is not null);
create policy "edit arrecadacao" on public.arrecadacao_relatorio for all using (public.can_edit_informacao(informacao_id)) with check (public.can_edit_informacao(informacao_id));

create policy "authenticated read fiscalizacao" on public.fiscalizacao_relatorio for select using (auth.uid() is not null);
create policy "edit fiscalizacao" on public.fiscalizacao_relatorio for all using (public.can_edit_informacao(informacao_id)) with check (public.can_edit_informacao(informacao_id));

create policy "authenticated read programas projetos" on public.programas_projetos_relatorio for select using (auth.uid() is not null);
create policy "edit programas projetos" on public.programas_projetos_relatorio for all using (public.can_edit_informacao(informacao_id)) with check (public.can_edit_informacao(informacao_id));

do $$
begin
  if not exists (select 1 from pg_type where typname = 'parte_tce') then
    create type parte_tce as enum ('geral', 'especifica', 'apendice', 'anexo', 'rol_responsaveis', 'estrutura_formal');
  end if;
  if not exists (select 1 from pg_type where typname = 'unidade_consolidada_tce') then
    create type unidade_consolidada_tce as enum ('SEFAZ', 'SARE', 'SATE', 'FUNDA', 'MULTIPLA');
  end if;
  if not exists (select 1 from pg_type where typname = 'tipo_resposta_tce') then
    create type tipo_resposta_tce as enum ('texto', 'tabela', 'indicador', 'financeiro', 'contratos', 'pessoal', 'patrimonio', 'controle', 'projeto', 'estrutura_documental', 'misto');
  end if;
  if not exists (select 1 from pg_type where typname = 'status_atribuicao_tce') then
    create type status_atribuicao_tce as enum ('nao_atribuido', 'atribuido', 'em_preenchimento', 'enviado', 'em_revisao', 'devolvido', 'consolidado', 'aprovado');
  end if;
  if not exists (select 1 from pg_type where typname = 'status_versao_relatorio') then
    create type status_versao_relatorio as enum ('rascunho', 'em_revisao', 'aprovado');
  end if;
exception when duplicate_object then null;
end $$;

create table if not exists public.itens_tce (
  id uuid primary key default gen_random_uuid(),
  codigo text not null unique,
  titulo text not null,
  descricao_exigencia text,
  fundamento_normativo text,
  parte parte_tce not null,
  ordem integer not null,
  obrigatorio boolean not null default true,
  aplicavel_sefaz boolean not null default true,
  unidade_consolidada unidade_consolidada_tce not null default 'MULTIPLA',
  tipo_resposta tipo_resposta_tce not null default 'texto',
  campos_schema jsonb not null default '[]'::jsonb,
  evidencia_obrigatoria boolean not null default true,
  observacao_orientativa text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.atribuicoes_tce (
  id uuid primary key default gen_random_uuid(),
  item_tce_id uuid not null references public.itens_tce (id) on delete cascade,
  setor_id uuid not null references public.setores (id) on delete restrict,
  responsavel_nome text not null,
  responsavel_cargo text,
  responsavel_email text,
  prazo_interno date,
  status status_atribuicao_tce not null default 'atribuido',
  observacao_consolidador text,
  created_by uuid references public.profiles (id) on delete set null,
  updated_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (item_tce_id, setor_id)
);

create table if not exists public.respostas_tce (
  id uuid primary key default gen_random_uuid(),
  atribuicao_id uuid not null unique references public.atribuicoes_tce (id) on delete cascade,
  texto_original text,
  texto_consolidado text,
  resposta_json jsonb not null default '{}'::jsonb,
  fonte_informacao text,
  justificativa_ausencia_evidencia text,
  observacoes_setor text,
  observacoes_revisao text,
  created_by uuid references public.profiles (id) on delete set null,
  updated_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.evidencias_tce (
  id uuid primary key default gen_random_uuid(),
  resposta_id uuid references public.respostas_tce (id) on delete cascade,
  item_tce_id uuid not null references public.itens_tce (id) on delete cascade,
  nome_arquivo text not null,
  storage_path text not null,
  tipo_arquivo text,
  descricao text,
  fonte text,
  uploaded_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.versoes_relatorio (
  id uuid primary key default gen_random_uuid(),
  exercicio integer not null,
  titulo text not null,
  unidade_apresentadora text not null default 'SEFAZ/AP',
  status status_versao_relatorio not null default 'rascunho',
  conteudo_json jsonb not null default '{}'::jsonb,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger itens_tce_touch_updated_at before update on public.itens_tce for each row execute function public.touch_updated_at();
create trigger atribuicoes_tce_touch_updated_at before update on public.atribuicoes_tce for each row execute function public.touch_updated_at();
create trigger respostas_tce_touch_updated_at before update on public.respostas_tce for each row execute function public.touch_updated_at();
create trigger versoes_relatorio_touch_updated_at before update on public.versoes_relatorio for each row execute function public.touch_updated_at();

create index if not exists idx_itens_tce_parte_ordem on public.itens_tce (parte, ordem);
create index if not exists idx_atribuicoes_tce_status on public.atribuicoes_tce (status);
create index if not exists idx_atribuicoes_tce_setor on public.atribuicoes_tce (setor_id);
create index if not exists idx_respostas_tce_atribuicao on public.respostas_tce (atribuicao_id);
create index if not exists idx_evidencias_tce_item on public.evidencias_tce (item_tce_id);

alter table public.itens_tce enable row level security;
alter table public.atribuicoes_tce enable row level security;
alter table public.respostas_tce enable row level security;
alter table public.evidencias_tce enable row level security;
alter table public.versoes_relatorio enable row level security;

drop policy if exists "authenticated read itens tce" on public.itens_tce;
create policy "authenticated read itens tce" on public.itens_tce for select using (auth.uid() is not null);
drop policy if exists "consolidadores write itens tce" on public.itens_tce;
create policy "consolidadores write itens tce" on public.itens_tce for all using (public.current_profile_role() in ('admin', 'coordenador')) with check (public.current_profile_role() in ('admin', 'coordenador'));

drop policy if exists "read atribuicoes by role" on public.atribuicoes_tce;
create policy "read atribuicoes by role" on public.atribuicoes_tce for select using (
  public.current_profile_role() in ('admin', 'coordenador', 'revisor')
  or setor_id = public.current_profile_setor_id()
);
drop policy if exists "consolidadores write atribuicoes" on public.atribuicoes_tce;
create policy "consolidadores write atribuicoes" on public.atribuicoes_tce for all using (public.current_profile_role() in ('admin', 'coordenador', 'revisor')) with check (public.current_profile_role() in ('admin', 'coordenador', 'revisor'));

drop policy if exists "read respostas by atribuicao" on public.respostas_tce;
create policy "read respostas by atribuicao" on public.respostas_tce for select using (
  public.current_profile_role() in ('admin', 'coordenador', 'revisor')
  or exists (select 1 from public.atribuicoes_tce a where a.id = respostas_tce.atribuicao_id and a.setor_id = public.current_profile_setor_id())
);
drop policy if exists "write respostas by atribuicao" on public.respostas_tce;
create policy "write respostas by atribuicao" on public.respostas_tce for all using (
  public.current_profile_role() in ('admin', 'coordenador', 'revisor')
  or exists (select 1 from public.atribuicoes_tce a where a.id = respostas_tce.atribuicao_id and a.setor_id = public.current_profile_setor_id())
) with check (
  public.current_profile_role() in ('admin', 'coordenador', 'revisor')
  or exists (select 1 from public.atribuicoes_tce a where a.id = respostas_tce.atribuicao_id and a.setor_id = public.current_profile_setor_id())
);

drop policy if exists "authenticated read evidencias tce" on public.evidencias_tce;
create policy "authenticated read evidencias tce" on public.evidencias_tce for select using (auth.uid() is not null);
drop policy if exists "authenticated write evidencias tce" on public.evidencias_tce;
create policy "authenticated write evidencias tce" on public.evidencias_tce for insert with check (auth.uid() is not null);

drop policy if exists "authenticated read versoes relatorio" on public.versoes_relatorio;
create policy "authenticated read versoes relatorio" on public.versoes_relatorio for select using (auth.uid() is not null);
drop policy if exists "consolidadores write versoes relatorio" on public.versoes_relatorio;
create policy "consolidadores write versoes relatorio" on public.versoes_relatorio for all using (public.current_profile_role() in ('admin', 'coordenador', 'revisor')) with check (public.current_profile_role() in ('admin', 'coordenador', 'revisor'));

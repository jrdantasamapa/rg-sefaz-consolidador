create extension if not exists "pgcrypto";

create type perfil_usuario as enum ('admin', 'coordenador', 'setor', 'revisor');
create type parte_relatorio as enum ('geral', 'especifica', 'apendice', 'anexo');
create type criticidade_item as enum ('baixa', 'media', 'alta');
create type tipo_setor as enum ('finalistico', 'apoio', 'controle', 'gestao', 'fundo', 'programa');
create type status_informacao as enum ('pendente', 'recebido', 'em_revisao', 'consolidado', 'aprovado', 'devolvido');

create table public.setores (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  sigla text not null unique,
  tipo tipo_setor not null,
  responsavel_nome text,
  responsavel_cargo text,
  contato text,
  ativo boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  nome text not null,
  email text not null unique,
  perfil perfil_usuario not null default 'setor',
  setor_id uuid references public.setores (id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.itens_relatorio (
  id uuid primary key default gen_random_uuid(),
  codigo text not null unique,
  titulo text not null,
  descricao text,
  parte parte_relatorio not null,
  ordem integer not null,
  setor_responsavel_padrao_id uuid references public.setores (id) on delete set null,
  obrigatorio boolean not null default true,
  criticidade criticidade_item not null default 'media',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.informacoes_consolidadas (
  id uuid primary key default gen_random_uuid(),
  item_id uuid not null references public.itens_relatorio (id) on delete cascade,
  setor_id uuid not null references public.setores (id) on delete restrict,
  titulo_interno text,
  texto_original_recebido text,
  texto_tecnico_consolidado text,
  principais_resultados text,
  dados_quantitativos text,
  metas_previstas text,
  resultados_alcancados text,
  justificativa_nao_alcance text,
  fonte_informacao text,
  responsavel_informacao_nome text,
  responsavel_informacao_cargo text,
  observacoes_consolidacao text,
  status status_informacao not null default 'pendente',
  created_by uuid references public.profiles (id) on delete set null,
  updated_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.indicadores (
  id uuid primary key default gen_random_uuid(),
  informacao_id uuid not null references public.informacoes_consolidadas (id) on delete cascade,
  nome text not null,
  unidade_medida text,
  periodicidade text,
  indice_inicial text,
  meta text,
  resultado text,
  data_apuracao date,
  observacao text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.anexos (
  id uuid primary key default gen_random_uuid(),
  nome_arquivo text not null,
  storage_path text not null,
  tipo_arquivo text,
  descricao text,
  fonte text,
  uploaded_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.anexos_vinculos (
  id uuid primary key default gen_random_uuid(),
  anexo_id uuid not null references public.anexos (id) on delete cascade,
  item_id uuid not null references public.itens_relatorio (id) on delete cascade,
  informacao_id uuid references public.informacoes_consolidadas (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (anexo_id, item_id, informacao_id)
);

create table public.historico_status (
  id uuid primary key default gen_random_uuid(),
  informacao_id uuid not null references public.informacoes_consolidadas (id) on delete cascade,
  status_anterior status_informacao,
  status_novo status_informacao not null,
  usuario_id uuid references public.profiles (id) on delete set null,
  observacao text,
  created_at timestamptz not null default now()
);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger setores_touch_updated_at before update on public.setores for each row execute function public.touch_updated_at();
create trigger itens_touch_updated_at before update on public.itens_relatorio for each row execute function public.touch_updated_at();
create trigger informacoes_touch_updated_at before update on public.informacoes_consolidadas for each row execute function public.touch_updated_at();
create trigger indicadores_touch_updated_at before update on public.indicadores for each row execute function public.touch_updated_at();

create or replace function public.validar_informacao_consolidada()
returns trigger
language plpgsql
as $$
declare
  qtd_evidencias integer;
begin
  if new.status in ('consolidado', 'aprovado') then
    select count(*)
      into qtd_evidencias
      from public.anexos_vinculos av
     where av.informacao_id = new.id;

    if coalesce(trim(new.texto_tecnico_consolidado), '') = '' then
      raise exception 'Texto tecnico consolidado e obrigatorio para consolidar.';
    end if;

    if coalesce(trim(new.fonte_informacao), '') = '' then
      raise exception 'Fonte da informacao e obrigatoria para consolidar.';
    end if;

    if coalesce(trim(new.responsavel_informacao_nome), '') = '' then
      raise exception 'Responsavel pela informacao e obrigatorio para consolidar.';
    end if;

    if qtd_evidencias = 0 and coalesce(trim(new.justificativa_nao_alcance), '') = '' then
      raise exception 'Informe evidencia vinculada ou justificativa de ausencia de evidencia.';
    end if;
  end if;

  return new;
end;
$$;

create trigger informacoes_validar_consolidacao
before insert or update on public.informacoes_consolidadas
for each row execute function public.validar_informacao_consolidada();

create index idx_itens_parte_ordem on public.itens_relatorio (parte, ordem);
create index idx_itens_setor_padrao on public.itens_relatorio (setor_responsavel_padrao_id);
create index idx_informacoes_item on public.informacoes_consolidadas (item_id);
create index idx_informacoes_setor_status on public.informacoes_consolidadas (setor_id, status);
create index idx_indicadores_informacao on public.indicadores (informacao_id);
create index idx_anexos_vinculos_item on public.anexos_vinculos (item_id);
create index idx_anexos_vinculos_informacao on public.anexos_vinculos (informacao_id);

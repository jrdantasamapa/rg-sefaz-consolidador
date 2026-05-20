alter table public.profiles enable row level security;
alter table public.setores enable row level security;
alter table public.itens_relatorio enable row level security;
alter table public.informacoes_consolidadas enable row level security;
alter table public.indicadores enable row level security;
alter table public.anexos enable row level security;
alter table public.anexos_vinculos enable row level security;
alter table public.historico_status enable row level security;

create or replace function public.current_profile_role()
returns perfil_usuario
language sql
security definer
set search_path = public
as $$
  select perfil from public.profiles where id = auth.uid()
$$;

create or replace function public.current_profile_setor_id()
returns uuid
language sql
security definer
set search_path = public
as $$
  select setor_id from public.profiles where id = auth.uid()
$$;

create or replace function public.is_admin_or_coordinator()
returns boolean
language sql
security definer
set search_path = public
as $$
  select coalesce(public.current_profile_role() in ('admin', 'coordenador'), false)
$$;

create or replace function public.is_reviewer()
returns boolean
language sql
security definer
set search_path = public
as $$
  select coalesce(public.current_profile_role() = 'revisor', false)
$$;

create policy "profiles select own or managers"
on public.profiles for select
using (id = auth.uid() or public.current_profile_role() in ('admin', 'coordenador'));

create policy "profiles admin write"
on public.profiles for all
using (public.current_profile_role() = 'admin')
with check (public.current_profile_role() = 'admin');

create policy "authenticated read setores"
on public.setores for select
using (auth.uid() is not null);

create policy "admin coordinator write setores"
on public.setores for all
using (public.is_admin_or_coordinator())
with check (public.is_admin_or_coordinator());

create policy "authenticated read itens"
on public.itens_relatorio for select
using (auth.uid() is not null);

create policy "admin coordinator write itens"
on public.itens_relatorio for all
using (public.is_admin_or_coordinator())
with check (public.is_admin_or_coordinator());

create policy "authenticated read informacoes"
on public.informacoes_consolidadas for select
using (auth.uid() is not null);

create policy "admin coordinator insert informacoes"
on public.informacoes_consolidadas for insert
with check (
  public.is_admin_or_coordinator()
  or setor_id = public.current_profile_setor_id()
);

create policy "edit informacoes by role or assigned sector"
on public.informacoes_consolidadas for update
using (
  public.is_admin_or_coordinator()
  or public.is_reviewer()
  or setor_id = public.current_profile_setor_id()
)
with check (
  public.is_admin_or_coordinator()
  or public.is_reviewer()
  or setor_id = public.current_profile_setor_id()
);

create policy "admin coordinator delete informacoes"
on public.informacoes_consolidadas for delete
using (public.is_admin_or_coordinator());

create policy "authenticated read indicadores"
on public.indicadores for select
using (auth.uid() is not null);

create policy "edit indicadores through informacao access"
on public.indicadores for all
using (
  exists (
    select 1 from public.informacoes_consolidadas info
    where info.id = indicadores.informacao_id
      and (public.is_admin_or_coordinator() or info.setor_id = public.current_profile_setor_id())
  )
)
with check (
  exists (
    select 1 from public.informacoes_consolidadas info
    where info.id = indicadores.informacao_id
      and (public.is_admin_or_coordinator() or info.setor_id = public.current_profile_setor_id())
  )
);

create policy "authenticated read anexos"
on public.anexos for select
using (auth.uid() is not null);

create policy "authenticated insert anexos"
on public.anexos for insert
with check (auth.uid() is not null);

create policy "admin coordinator update anexos"
on public.anexos for update
using (public.is_admin_or_coordinator())
with check (public.is_admin_or_coordinator());

create policy "authenticated read anexos vinculos"
on public.anexos_vinculos for select
using (auth.uid() is not null);

create policy "authenticated write anexos vinculos"
on public.anexos_vinculos for all
using (
  public.is_admin_or_coordinator()
  or public.is_reviewer()
  or exists (
    select 1 from public.informacoes_consolidadas info
    where info.id = anexos_vinculos.informacao_id
      and info.setor_id = public.current_profile_setor_id()
  )
)
with check (
  public.is_admin_or_coordinator()
  or public.is_reviewer()
  or exists (
    select 1 from public.informacoes_consolidadas info
    where info.id = anexos_vinculos.informacao_id
      and info.setor_id = public.current_profile_setor_id()
  )
);

create policy "authenticated read historico"
on public.historico_status for select
using (auth.uid() is not null);

create policy "authenticated insert historico"
on public.historico_status for insert
with check (auth.uid() is not null);

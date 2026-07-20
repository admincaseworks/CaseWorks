-- Rode este SQL no Supabase (SQL Editor) para criar a tabela da lista de espera.
create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table public.waitlist enable row level security;

-- Permite apenas INSERT anônimo (captura pública do formulário).
-- A leitura fica restrita ao service role (não exposto no browser).
drop policy if exists "public insert" on public.waitlist;
create policy "public insert" on public.waitlist
  for insert to anon with check (true);

# CaseWorks — Site (Next.js)

Landing page institucional do CaseWorks. Next.js (App Router) + React + Supabase (lista de espera), pronta para deploy na Vercel.

## Rodar localmente
```bash
npm install
cp .env.local.example .env.local   # preencha com suas credenciais Supabase
npm run dev                         # http://localhost:3000
```

## Supabase
1. Crie um projeto em supabase.com.
2. No **SQL Editor**, rode o conteúdo de `supabase/schema.sql` (cria a tabela `waitlist` com RLS de insert anônimo).
3. Em **Project Settings → API**, copie a URL e a `anon key` para o `.env.local`.

O formulário de lista de espera insere o e-mail em `public.waitlist`. Sem as env vars o site funciona normalmente, mas o envio mostra um aviso de configuração.

## Deploy (Vercel + Git)
```bash
git init && git add -A && git commit -m "feat: site CaseWorks"
git branch -M main
git remote add origin git@github.com:<org>/<repo>.git
git push -u origin main
```
Depois: importe o repositório na Vercel, cadastre as env vars `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Project → Settings → Environment Variables). Cada `git push` na `main` dispara deploy automático.

## Estrutura
- `app/layout.tsx` — HTML base + fontes (Space Grotesk / IBM Plex Sans / IBM Plex Mono).
- `app/globals.css` — reset, keyframes e media queries responsivas.
- `app/page.tsx` — a landing completa (client component com o seletor de módulos e o formulário de lista de espera).
- `lib/supabaseClient.ts` — cliente Supabase para o browser.
- `supabase/schema.sql` — schema da tabela `waitlist`.

## Observação sobre os dados
Os dashboards mostrados na página são **mocks com dados fictícios (DEMO)**. Não usar dados reais de clientes.

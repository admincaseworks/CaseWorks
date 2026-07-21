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

## Deploy estático em VPS Ubuntu (sem Node no servidor)
O projeto está configurado com `output: 'export'` (`next.config.mjs`): o `build` gera um site 100% estático na pasta `out/`. Você builda **na sua máquina** e sobe só os arquivos prontos — o servidor roda apenas Nginx.

```bash
# 1. Na sua máquina
npm install
cp .env.local.example .env.local   # credenciais Supabase (embutidas no build)
npm run build                       # gera a pasta ./out com HTML/CSS/JS estáticos

# 2. Enviar a pasta out/ para o servidor (ex.: via scp ou rsync)
rsync -avz out/ usuario@ip_do_servidor:/var/www/caseworks/
```

No servidor Ubuntu, o Nginx serve `/var/www/caseworks` como site estático:
```nginx
server {
  listen 80;
  server_name seu-dominio.com.br;
  root /var/www/caseworks;
  index index.html;
  location / { try_files $uri $uri/ $uri.html =404; }
}
```
Depois ative HTTPS com `sudo certbot --nginx`. Como as credenciais `NEXT_PUBLIC_*` são embutidas no build, sempre que trocá-las é preciso rodar `npm run build` de novo e reenviar `out/`.

> As chaves `NEXT_PUBLIC_SUPABASE_*` são públicas por natureza (usadas no browser). A proteção dos dados fica na **RLS** do Supabase, não no sigilo da anon key.

## Estrutura
- `app/layout.tsx` — HTML base + fontes (Space Grotesk / IBM Plex Sans / IBM Plex Mono).
- `app/globals.css` — reset, keyframes e media queries responsivas.
- `app/page.tsx` — a landing completa (client component com o seletor de módulos e o formulário de lista de espera).
- `lib/supabaseClient.ts` — cliente Supabase para o browser.
- `supabase/schema.sql` — schema da tabela `waitlist`.

## Observação sobre os dados
Os dashboards mostrados na página são **mocks com dados fictícios (DEMO)**. Não usar dados reais de clientes.

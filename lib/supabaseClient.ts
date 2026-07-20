import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Cliente Supabase para o browser. Só é criado se as env vars existirem —
// assim o site continua renderizando mesmo antes de configurar o Supabase.
export const supabase = url && anon ? createClient(url, anon) : null;

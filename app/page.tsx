'use client';

import { useMemo, useState, CSSProperties } from 'react';
import { supabase } from '@/lib/supabaseClient';

/* ---------- tokens ---------- */
const BLUE = '#2f6bff';
const ORANGE = '#f0810c';

const Logo = ({ size = 26 }: { size?: number }) => (
  <svg width={size} height={(size / 26) * 28} viewBox="0 0 26 28" fill="none">
    <path d="M13 1.5 24.5 8v12L13 26.5 1.5 20V8z" stroke={BLUE} strokeWidth="1.6" />
    <rect x="8" y="14" width="2.6" height="7" rx="1" fill={BLUE} />
    <rect x="11.7" y="10" width="2.6" height="11" rx="1" fill="#5f8fff" />
    <rect x="15.4" y="12.5" width="2.6" height="8.5" rx="1" fill={BLUE} />
  </svg>
);

const Check = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flex: 'none', marginTop: 1 }}>
    <circle cx="12" cy="12" r="11" fill="rgba(47,107,255,.14)" />
    <path d="M17 8.5 10.5 15 7 11.5" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const cardDark: CSSProperties = { background: '#0f1826', border: '1px solid #1c2b42', borderRadius: 16 };
const frameWrap: CSSProperties = { borderRadius: 16, overflow: 'hidden', border: '1px solid #223047', boxShadow: '0 30px 60px -28px rgba(0,0,0,.6)' };
const chrome = (
  <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '11px 14px', background: '#0f1826', borderBottom: '1px solid #1c2b42' }}>
    {[0, 1, 2].map((i) => (
      <span key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: '#2a3a54' }} />
    ))}
  </div>
);
const eyebrow: CSSProperties = { fontFamily: "'IBM Plex Mono'", fontSize: 12, letterSpacing: '.14em', textTransform: 'uppercase', color: BLUE, marginBottom: 14 };
const h2: CSSProperties = { fontFamily: "'Inter'", fontWeight: 700, fontSize: 'clamp(26px,5vw,38px)', lineHeight: 1.1, letterSpacing: '-.02em', margin: 0, color: '#f2f6ff' };
const h3mod: CSSProperties = { fontFamily: "'Inter'", fontWeight: 700, fontSize: 26, color: '#f2f6ff', margin: 0 };
const modP: CSSProperties = { fontSize: 16, color: '#98a8c0', lineHeight: 1.6, margin: '12px 0 22px' };
const kpiLabel: CSSProperties = { fontFamily: "'IBM Plex Mono'", fontSize: 7.5, letterSpacing: '.04em', color: '#8b98ab', textTransform: 'uppercase' };

/* ---------- data ---------- */
const featImp = ['Planta de implantação dinâmica por unidade', 'Avanço físico real, casa a casa', 'Atualização em lote de várias casas', 'Painel vivo do lote'];
const featGantt = ['Etapas, dependências e marcos', 'Planejado x realizado', 'Prazos críticos em evidência', 'Regime de dias úteis'];
const featDiario = ['Registro diário com fotos', 'Clima, efetivo e ocorrências', 'Aprovação do responsável técnico', 'Histórico auditável da obra'];
const featFin = ['Solicitações, pedidos e suprimentos', 'Fluxo de caixa e receitas', 'Relatórios financeiros', 'Cadastro único de itens'];

const gantt = [
  { name: 'Patamarização', l: 0, w: 26, dur: '84d (2c/d)', c: '#9dbef0', tc: '#1c3f78' },
  { name: 'Locação de radier', l: 12, w: 26, dur: '84d (2c/d)', c: '#c2d6f2', tc: '#2f5aa8' },
  { name: 'Radie · hidráulica', l: 24, w: 28, dur: '84d (2c/d)', c: '#c2d6f2', tc: '#2f5aa8' },
  { name: 'Radie · elétrica', l: 36, w: 26, dur: '84d (2c/d)', c: '#c2d6f2', tc: '#2f5aa8' },
  { name: 'Execução de radie', l: 48, w: 28, dur: '84d (2c/d)', c: '#c2d6f2', tc: '#2f5aa8' },
];
const monthsGantt = ['Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez', 'Jan'];
const diario = [
  { day: '18', mon: 'JUL', weather: 'Sol', crew: '24', st: 'Aprovado', sc: '#16a34a', bg: 'rgba(22,163,74,.12)' },
  { day: '17', mon: 'JUL', weather: 'Nublado', crew: '22', st: 'Aprovado', sc: '#16a34a', bg: 'rgba(22,163,74,.12)' },
  { day: '16', mon: 'JUL', weather: 'Chuva', crew: '12', st: 'Pendente', sc: '#c2740a', bg: 'rgba(240,129,12,.14)' },
];
const groups: { label: string; color: string; soft: string; items: { name: string; desc: string }[] }[] = [
  { label: 'Gestão', color: BLUE, soft: 'rgba(47,107,255,.12)', items: [
    { name: 'Dashboard Obra', desc: 'Visão geral e indicadores da obra' },
    { name: 'Dash Corporativo', desc: 'Carteira de projetos consolidada' },
  ] },
  { label: 'Produção', color: '#25c565', soft: 'rgba(22,163,74,.12)', items: [
    { name: 'Implantação', desc: 'Planta dinâmica por unidade' },
    { name: 'Diário de Obra', desc: 'RDO com fotos e ocorrências' },
    { name: 'Planejamento', desc: 'Etapas e cronograma baseline' },
    { name: 'Atividades', desc: 'Tarefas do dia a dia da equipe' },
    { name: 'Gantt', desc: 'Cronograma visual e prazos' },
  ] },
  { label: 'Financeiro & Suprimentos', color: '#f7952f', soft: 'rgba(240,129,12,.12)', items: [
    { name: 'Solicitações', desc: 'Requisições de compra do canteiro' },
    { name: 'Pedidos', desc: 'Ordens aos fornecedores' },
    { name: 'Suprimentos', desc: 'Entradas e controle de estoque' },
    { name: 'Fluxo de Caixa', desc: 'Entradas e saídas da obra' },
    { name: 'Receitas (PLS)', desc: 'Recebíveis e medições' },
    { name: 'Relatórios', desc: 'Indicadores financeiros' },
    { name: 'Cadastro de Itens', desc: 'Base única de insumos' },
  ] },
  { label: 'Sistema', color: '#b3c1d6', soft: 'rgba(139,152,181,.14)', items: [
    { name: 'Config. Projeto', desc: 'Parâmetros e regime da obra' },
    { name: 'Painel Admin & Backup', desc: 'Segurança e cópias de dados' },
    { name: 'Usuários', desc: 'Acessos e permissões' },
  ] },
];

const units = Array.from({ length: 66 }, (_, i) => {
  const m = (i * 7 + 3) % 13;
  return m < 2 ? '#16a34a' : m < 6 ? BLUE : '#dfe4ec';
});

const TABS = ['Implantação', 'Gantt', 'Diário de obra', 'Financeiro'];

/* ---------- Implantação mock ---------- */
function ImplantacaoMock() {
  return (
    <div style={{ background: '#f4f6f9', padding: 18 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 14 }}>
        {[
          { v: '42%', c: BLUE, l: 'Média do lote' },
          { v: '18/120', c: '#16a34a', l: 'Concluídas' },
          { v: '46/120', c: ORANGE, l: 'Em obra ativa' },
        ].map((k) => (
          <div key={k.l} style={{ background: '#fff', border: '1px solid #e6e9ef', borderRadius: 10, padding: 12 }}>
            <div style={{ fontFamily: "'Inter'", fontWeight: 700, fontSize: 22, color: k.c }}>{k.v}</div>
            <div style={{ fontSize: 11, color: '#7a8699', marginTop: 2 }}>{k.l}</div>
          </div>
        ))}
      </div>
      <div style={{ background: '#fff', border: '1px solid #e6e9ef', borderRadius: 10, padding: 14 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#3a4657', marginBottom: 11 }}>Planta de implantação dinâmica, 120 unidades (demo)</div>
        <div>{units.map((c, i) => (<span key={i} style={{ display: 'inline-block', width: 'calc(9.09% - 3.6px)', aspectRatio: '1', margin: 1.8, borderRadius: 2, background: c }} />))}</div>
      </div>
    </div>
  );
}

/* ---------- Gantt mock ---------- */
function GanttMock() {
  return (
    <div style={{ background: '#f4f6f9', padding: 16 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: '#1a2233' }}>Gestão de cronogramas de produção</div>
          <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: 9, color: '#8b98ab', marginTop: 2 }}>40 etapas · formato de encadeamento</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 9, fontWeight: 600, color: '#1a2233', background: '#eef2f7', border: '1px solid #e0e5ec', padding: '5px 9px', borderRadius: 7 }}>Cascata</span>
          <span style={{ fontSize: 9, color: '#8b98ab', padding: '5px 4px' }}>Gantt dinâmico</span>
        </div>
      </div>
      <div style={{ background: '#fff', border: '1px solid #e6e9ef', borderRadius: 10, padding: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 9 }}>
          <span style={{ width: 96, flex: 'none', fontFamily: "'IBM Plex Mono'", fontSize: 8.5, color: '#9aa6b6', textTransform: 'uppercase', letterSpacing: '.05em' }}>Etapa</span>
          <div style={{ flex: 1, display: 'flex' }}>{monthsGantt.map((m) => (<span key={m} style={{ flex: 1, fontFamily: "'IBM Plex Mono'", fontSize: 8.5, color: '#9aa6b6', textAlign: 'center' }}>{m}/26</span>))}</div>
        </div>
        {gantt.map((g) => (
          <div key={g.name} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span style={{ width: 96, flex: 'none', fontSize: 10.5, color: '#4a5668', textAlign: 'right', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{g.name}</span>
            <div style={{ flex: 1, position: 'relative', height: 18, background: '#f7f9fc', borderRadius: 4, backgroundImage: 'linear-gradient(90deg,#eaeef4 1px,transparent 1px)', backgroundSize: '12.5% 100%' }}>
              <span style={{ position: 'absolute', top: 2, bottom: 2, left: `${g.l}%`, width: `${g.w}%`, background: g.c, borderRadius: 4, display: 'flex', alignItems: 'center', paddingLeft: 6, fontFamily: "'IBM Plex Mono'", fontSize: 7.5, color: g.tc, overflow: 'hidden', whiteSpace: 'nowrap' }}>{g.dur}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Diário mock ---------- */
function DiarioMock() {
  return (
    <div style={{ background: '#f4f6f9', padding: 18 }}>
      {diario.map((d) => (
        <div key={d.day} style={{ background: '#fff', border: '1px solid #e6e9ef', borderRadius: 10, padding: 13, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 13 }}>
          <div style={{ textAlign: 'center', flex: 'none' }}>
            <div style={{ fontFamily: "'Inter'", fontWeight: 700, fontSize: 16, color: '#1a2233' }}>{d.day}</div>
            <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: 8.5, color: '#8b98ab' }}>{d.mon}</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: '#3a4657' }}>RDO, {d.weather} · {d.crew} no efetivo</div>
            <div style={{ display: 'flex', gap: 5, marginTop: 6 }}>{[0, 1, 2].map((i) => (<span key={i} style={{ width: 38, height: 26, borderRadius: 5, background: 'repeating-linear-gradient(-45deg,#e7ebf1,#e7ebf1 4px,#dde2ea 4px,#dde2ea 8px)' }} />))}</div>
          </div>
          <span style={{ flex: 'none', fontFamily: "'IBM Plex Mono'", fontSize: 9, letterSpacing: '.04em', padding: '5px 10px', borderRadius: 20, background: d.bg, color: d.sc }}>{d.st}</span>
        </div>
      ))}
    </div>
  );
}

/* ---------- Financeiro mock (curva S) ---------- */
function useFin() {
  return useMemo(() => {
    const fat = [4, 7, 16, 28, 42, 54, 60, 52, 36, 22, 13, 7, 4];
    const months = ['Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
    const mx = Math.max(...fat), x0 = 34, x1 = 452, yTop = 16, yBot = 168, n = fat.length, step = (x1 - x0) / n, bw = step * 0.56;
    const bars = fat.map((v, i) => { const h = (v / mx) * (yBot - yTop - 6); const cx = x0 + step * i + step / 2; return { x: cx - bw / 2, y: yBot - h, w: bw, h }; });
    const mLabels = months.map((m, i) => ({ m, x: x0 + step * i + step / 2 }));
    const tot = fat.reduce((a, b) => a + b, 0); let acc = 0;
    const path = 'M' + fat.map((v, i) => { acc += v; const cx = x0 + step * i + step / 2; const y = yBot - (acc / tot) * (yBot - yTop); return `${cx.toFixed(1)},${y.toFixed(1)}`; }).join(' L');
    return { bars, mLabels, path };
  }, []);
}
function FinMock() {
  const { bars, mLabels, path } = useFin();
  const kpis = [
    { l: 'Custo total de campo', v: 'R$ 4,2 mi', c: '#1a2233' },
    { l: 'Mês de pico', v: 'Out/26', c: '#e05656' },
    { l: 'Desembolso médio', v: 'R$ 322k', c: '#1a2233' },
    { l: 'Perfil', v: 'Curva S', c: '#16a34a' },
  ];
  return (
    <div style={{ background: '#f4f6f9', padding: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 8, marginBottom: 11 }}>
        {kpis.map((k) => (
          <div key={k.l} style={{ background: '#fff', border: '1px solid #e6e9ef', borderRadius: 10, padding: 10 }}>
            <div style={kpiLabel}>{k.l}</div>
            <div style={{ fontFamily: "'Inter'", fontWeight: 700, fontSize: 15, color: k.c, marginTop: 3 }}>{k.v}</div>
          </div>
        ))}
      </div>
      <div style={{ background: '#fff', border: '1px solid #e6e9ef', borderRadius: 10, padding: 14 }}>
        <div style={{ fontSize: 11.5, fontWeight: 600, color: '#3a4657', marginBottom: 4 }}>Desembolso mensal &amp; curva S acumulada</div>
        <svg viewBox="0 0 470 200" style={{ width: '100%', height: 'auto', display: 'block' }}>
          {[20, 61, 102, 143].map((y) => (<line key={y} x1="34" y1={y} x2="452" y2={y} stroke="#eef1f5" strokeWidth="1" />))}
          <line x1="34" y1="168" x2="452" y2="168" stroke="#dfe4ec" strokeWidth="1" />
          {bars.map((b, i) => (<rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} rx="2" fill="#57c39a" />))}
          <path d={path} fill="none" stroke="#6c5ce7" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          {mLabels.map((mo) => (<text key={mo.m + mo.x} x={mo.x} y="184" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="7.5" fill="#9aa6b6">{mo.m}</text>))}
        </svg>
        <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 9.5, color: '#7a8699' }}><span style={{ width: 9, height: 9, borderRadius: 2, background: '#57c39a' }} />Faturamento no período</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 9.5, color: '#7a8699' }}><span style={{ width: 14, height: 2, background: '#6c5ce7' }} />Progresso acumulado</span>
        </div>
      </div>
    </div>
  );
}

function ModulePanel({ mock, title, text, feats }: { mock: React.ReactNode; title: string; text: string; feats: string[] }) {
  return (
    <div className="cw-split" style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: 40, alignItems: 'center' }}>
      <div style={frameWrap}>{chrome}{mock}</div>
      <div>
        <h3 style={h3mod}>{title}</h3>
        <p style={modP}>{text}</p>
        {feats.map((f) => (<div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 11, padding: '9px 0', borderTop: '1px solid #17263c' }}><Check /><span style={{ fontSize: 15, color: '#c7d3e6' }}>{f}</span></div>))}
      </div>
    </div>
  );
}

export default function Page() {
  const [tab, setTab] = useState(0);
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);
  const [msg, setMsg] = useState('');

  async function join() {
    if (!email.includes('@')) { setMsg('Informe um e-mail válido.'); return; }
    setMsg('');
    if (!supabase) { setJoined(true); return; } // sem Supabase configurado, apenas confirma visualmente
    const { error } = await supabase.from('waitlist').insert({ email });
    if (error && error.code !== '23505') { setMsg('Não foi possível enviar. Tente novamente.'); return; }
    setJoined(true);
  }

  return (
    <div>
      {/* NAV */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(14px)', background: 'rgba(11,17,28,.78)', borderBottom: '1px solid #17263c' }}>
        <div className="cw-nav" style={{ maxWidth: 1200, margin: '0 auto', padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
          <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Logo />
            <span style={{ fontFamily: "'Inter'", fontWeight: 600, fontSize: 19, color: '#fff' }}>Case<span style={{ color: BLUE }}>Works</span></span>
          </a>
          <nav className="cw-navlinks" style={{ display: 'flex', alignItems: 'center', gap: 30, fontFamily: "'IBM Plex Mono'", fontSize: 12, letterSpacing: '.06em', textTransform: 'uppercase', color: '#93a4bd' }}>
            <a href="#modulos" style={{ color: '#93a4bd' }}>Módulos</a>
            <a href="#como" style={{ color: '#93a4bd' }}>Como funciona</a>
            <a href="#lancamento" style={{ color: '#93a4bd' }}>Lançamento</a>
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <a href="#lancamento" style={{ padding: '10px 18px', background: ORANGE, borderRadius: 10, color: '#1a1205', fontWeight: 600, fontSize: 14, boxShadow: '0 6px 18px rgba(240,129,12,.24)' }}>Entrar na lista de espera</a>
            <a href="#lancamento" style={{ padding: '10px 18px', border: '1px solid #33455f', borderRadius: 10, color: '#dbe5f3', fontWeight: 600, fontSize: 14, background: 'rgba(255,255,255,.02)' }}>Agendar reunião</a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="top" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(#12203a 1px,transparent 1px),linear-gradient(90deg,#12203a 1px,transparent 1px)', backgroundSize: '46px 46px', opacity: 0.55, WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 72% 34%,#000,transparent 76%)', maskImage: 'radial-gradient(ellipse 90% 80% at 72% 34%,#000,transparent 76%)' }} />
        <div style={{ position: 'absolute', top: -120, right: -80, width: 520, height: 520, background: 'radial-gradient(circle,rgba(47,107,255,.22),transparent 62%)', pointerEvents: 'none' }} />
        <div className="cw-hero" style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', padding: '76px 28px 72px', display: 'grid', gridTemplateColumns: '1.02fr .98fr', gap: 52, alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 13px', border: '1px solid #26344b', borderRadius: 30, background: 'rgba(47,107,255,.08)', fontFamily: "'IBM Plex Mono'", fontSize: 11.5, letterSpacing: '.07em', textTransform: 'uppercase', color: '#8fb0ff' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: ORANGE, boxShadow: '0 0 0 4px rgba(240,129,12,.18)' }} />Em breve · acesso antecipado 2026
            </div>
            <h1 style={{ fontFamily: "'Inter'", fontWeight: 700, fontSize: 'clamp(32px,6.5vw,53px)', lineHeight: 1.05, letterSpacing: '-.02em', margin: '22px 0 0', color: '#f4f8ff', textWrap: 'balance' as CSSProperties['textWrap'] }}>Toda a obra, do canteiro ao caixa, num só sistema.</h1>
            <p style={{ fontSize: 18.5, lineHeight: 1.6, color: '#a3b3cc', margin: '20px 0 0', maxWidth: 520 }}>CaseWorks reúne planejamento, diário de obra, suprimentos e financeiro para que engenheiros, gestores e equipes de campo trabalhem sobre a mesma informação, em tempo real.</p>
            <div style={{ display: 'flex', gap: 14, marginTop: 32, flexWrap: 'wrap' }}>
              <a href="#lancamento" style={{ padding: '15px 26px', background: ORANGE, borderRadius: 11, color: '#1a1205', fontWeight: 600, fontSize: 15.5, boxShadow: '0 8px 24px rgba(240,129,12,.28)' }}>Entrar na lista de espera</a>
              <a href="#lancamento" style={{ padding: '15px 24px', border: '1px solid #33455f', borderRadius: 11, color: '#dbe5f3', fontWeight: 600, fontSize: 15.5, background: 'rgba(255,255,255,.02)' }}>Agendar reunião</a>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 26, flexWrap: 'wrap', fontFamily: "'IBM Plex Mono'", fontSize: 11.5, letterSpacing: '.04em', color: '#6f7f98' }}>
              {['Feito por engenheiros', 'Dados seguros', 'Campo + escritório'].map((t) => (<span key={t} style={{ display: 'flex', alignItems: 'center', gap: 7 }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5" stroke={BLUE} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>{t}</span>))}
            </div>
          </div>
          <div className="cw-floaty">
            <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #223047', boxShadow: '0 40px 80px -24px rgba(0,0,0,.7),0 0 0 1px rgba(255,255,255,.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '11px 14px', background: '#0f1826', borderBottom: '1px solid #1c2b42' }}>
                {[0, 1, 2].map((i) => (<span key={i} style={{ width: 11, height: 11, borderRadius: '50%', background: '#2a3a54' }} />))}
                <span style={{ marginLeft: 8, flex: 1, height: 22, borderRadius: 7, background: '#0b111c', display: 'flex', alignItems: 'center', padding: '0 12px', fontFamily: "'IBM Plex Mono'", fontSize: 11, color: '#5f7091' }}>app.caseworks.com.br/dashboard</span>
              </div>
              <div style={{ background: '#f4f6f9', padding: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 13 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                    <div><div style={{ fontFamily: "'Inter'", fontWeight: 600, fontSize: 15, color: '#1a2233' }}>Residencial Aurora</div><div style={{ fontFamily: "'IBM Plex Mono'", fontSize: 9, letterSpacing: '.06em', color: '#8b98ab', textTransform: 'uppercase' }}>Dashboard da obra</div></div>
                    <span style={{ fontFamily: "'IBM Plex Mono'", fontSize: 8, letterSpacing: '.08em', padding: '3px 7px', borderRadius: 5, background: '#eef2ff', color: BLUE }}>DEMO</span>
                  </div>
                  <div style={{ textAlign: 'right' }}><div style={{ fontFamily: "'IBM Plex Mono'", fontSize: 9, letterSpacing: '.05em', color: '#8b98ab', textTransform: 'uppercase' }}>Término previsto</div><div style={{ fontFamily: "'Inter'", fontWeight: 600, fontSize: 14, color: BLUE }}>MAI 2027</div></div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.15fr', gap: 9, marginBottom: 11 }}>
                  <div style={{ background: '#fff', border: '1px solid #e6e9ef', borderRadius: 10, padding: 11 }}><div style={kpiLabel}>Progresso geral</div><div style={{ fontFamily: "'Inter'", fontWeight: 700, fontSize: 19, color: BLUE, marginTop: 3 }}>42%</div><div style={{ height: 4, borderRadius: 3, background: '#e9edf3', marginTop: 6 }}><div style={{ height: 4, width: '42%', borderRadius: 3, background: BLUE }} /></div></div>
                  <div style={{ background: '#fff', border: '1px solid #e6e9ef', borderRadius: 10, padding: 11 }}><div style={kpiLabel}>Escopo</div><div style={{ fontFamily: "'Inter'", fontWeight: 700, fontSize: 18, color: '#1a2233', marginTop: 3 }}>45 m²</div><div style={{ fontSize: 9.5, color: '#7a8699', marginTop: 2 }}>120 unidades</div></div>
                  <div style={{ background: '#0f2f66', border: '1px solid #0f2f66', borderRadius: 10, padding: 11, color: '#fff' }}><div style={{ ...kpiLabel, color: '#9dc0ff' }}>Tempo total estimado</div><div style={{ fontFamily: "'Inter'", fontWeight: 700, fontSize: 20, marginTop: 3 }}>300<span style={{ fontSize: 11, color: '#9dc0ff', fontWeight: 500 }}> dias úteis</span></div><div style={{ fontSize: 9, color: '#9dc0ff', marginTop: 3 }}>420 corridos · 42% completo</div></div>
                </div>
                <div style={{ background: '#fff', border: '1px solid #e6e9ef', borderRadius: 10, padding: '10px 13px', display: 'flex', alignItems: 'center', gap: 16, marginBottom: 11, fontSize: 10.5 }}>
                  <span style={{ fontWeight: 600, color: '#3a4657' }}>36 serviços</span>
                  {[{ c: '#c3ccd8', t: '22 não iniciados' }, { c: BLUE, t: '9 em andamento' }, { c: '#16a34a', t: '5 concluídos' }].map((s) => (<span key={s.t} style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#7a8699' }}><span style={{ width: 7, height: 7, borderRadius: '50%', background: s.c }} />{s.t}</span>))}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9 }}>
                  <div style={{ background: '#fff', border: '1px solid #e6e9ef', borderRadius: 10, padding: 11 }}><div style={kpiLabel}>Avanço médio planejado</div><div style={{ fontFamily: "'Inter'", fontWeight: 700, fontSize: 18, color: '#1a2233', marginTop: 3 }}>38%</div></div>
                  <div style={{ background: '#fff', border: '1px solid #e6e9ef', borderRadius: 10, padding: 11 }}><div style={kpiLabel}>Avanço médio realizado</div><div style={{ fontFamily: "'Inter'", fontWeight: 700, fontSize: 18, color: '#16a34a', marginTop: 3 }}>34%</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MÓDULOS */}
      <section id="modulos" style={{ borderTop: '1px solid #131f31', background: 'linear-gradient(180deg,#0b111c,#0c1523)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '78px 28px 84px' }}>
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 40px' }}>
            <div style={eyebrow}>Módulos</div>
            <h2 style={h2}>Um módulo para cada frente da obra</h2>
            <p style={{ fontSize: 17, color: '#96a6be', margin: '16px 0 0', lineHeight: 1.55 }}>Do avanço físico no canteiro ao fluxo de caixa no escritório. Explore o que já faz parte do CaseWorks.</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 34 }}>
            {TABS.map((name, i) => (
              <button key={name} onClick={() => setTab(i)} style={{ padding: '11px 20px', borderRadius: 11, fontFamily: "'Inter'", fontWeight: 600, fontSize: 14.5, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all .15s', ...(i === tab ? { background: BLUE, color: '#fff', border: `1px solid ${BLUE}`, boxShadow: '0 6px 18px rgba(47,107,255,.3)' } : { background: 'rgba(255,255,255,.03)', color: '#93a4bd', border: '1px solid #223047' }) }}>{name}</button>
            ))}
          </div>
          {tab === 0 && <ModulePanel mock={<ImplantacaoMock />} title="Implantação" text="A planta do loteamento vira um painel vivo. Clique em cada casa para ver e atualizar o estágio construtivo." feats={featImp} />}
          {tab === 1 && <ModulePanel mock={<GanttMock />} title="Cronograma & Gantt" text="Etapas, dependências e prazos críticos numa linha do tempo clara. Compare o avanço planejado com o realizado e enxergue o desvio antes que ele custe caro." feats={featGantt} />}
          {tab === 2 && <ModulePanel mock={<DiarioMock />} title="Diário de obra (RDO)" text="O registro diário do canteiro com fotos, clima, efetivo e ocorrências, aprovado pelo responsável técnico e guardado como histórico auditável de tudo que aconteceu na obra." feats={featDiario} />}
          {tab === 3 && <ModulePanel mock={<FinMock />} title="Financeiro & Suprimentos" text="Da solicitação no canteiro ao fluxo de caixa no escritório, tudo sobre um cadastro único de itens. Pedidos, suprimentos, receitas e relatórios sem planilha paralela." feats={featFin} />}
        </div>
      </section>

      {/* PLATAFORMA COMPLETA */}
      <section style={{ borderTop: '1px solid #131f31', background: '#0b111c' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '78px 28px 84px' }}>
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 48px' }}>
            <div style={eyebrow}>Plataforma completa</div>
            <h2 style={h2}>Tudo que a sua obra precisa, num só lugar</h2>
            <p style={{ fontSize: 17, color: '#96a6be', margin: '16px 0 0', lineHeight: 1.55 }}>18 módulos organizados em quatro frentes, da gestão estratégica ao chão de obra, do suprimento ao financeiro.</p>
          </div>
          {groups.map((g) => (
            <div key={g.label} style={{ marginBottom: 34 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 11, margin: '0 0 16px' }}>
                <span style={{ width: 30, height: 30, flex: 'none', borderRadius: 8, background: g.soft, display: 'flex', alignItems: 'center', justifyContent: 'center', color: g.color, fontFamily: "'Inter'", fontWeight: 700, fontSize: 13 }}>{g.label[0]}</span>
                <span style={{ fontFamily: "'IBM Plex Mono'", fontSize: 12.5, letterSpacing: '.1em', textTransform: 'uppercase', color: g.color, fontWeight: 600 }}>{g.label}</span>
                <span style={{ fontFamily: "'IBM Plex Mono'", fontSize: 11, color: '#4f6180' }}>{g.items.length} módulos</span>
                <span style={{ flex: 1, height: 1, background: '#17263c' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(230px,1fr))', gap: 12 }}>
                {g.items.map((m) => (
                  <div key={m.name} style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#0f1826', border: '1px solid #1c2b42', borderRadius: 12, padding: '14px 15px' }}>
                    <span style={{ width: 34, height: 34, flex: 'none', borderRadius: 9, background: g.soft, display: 'flex', alignItems: 'center', justifyContent: 'center', color: g.color, fontFamily: "'Inter'", fontWeight: 700, fontSize: 13 }}>{m.name[0]}</span>
                    <div><div style={{ fontWeight: 600, fontSize: 14.5, color: '#e6edf8' }}>{m.name}</div><div style={{ fontSize: 11.5, color: '#8394ad', marginTop: 2, lineHeight: 1.35 }}>{m.desc}</div></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como" style={{ borderTop: '1px solid #131f31' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '78px 28px' }}>
          <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 46px' }}>
            <div style={eyebrow}>Como funciona</div>
            <h2 style={h2}>Três movimentos, uma fonte de verdade</h2>
          </div>
          <div className="cw-steps" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 22 }}>
            {[
              { n: '01', t: 'Planeje', d: 'Monte etapas, cronograma e implantação. Defina o que precisa ser construído e quando.' },
              { n: '02', t: 'Execute', d: 'A equipe de campo registra avanço, diário e materiais direto do canteiro, pelo celular.' },
              { n: '03', t: 'Controle', d: 'Gestão acompanha custos, prazos e dashboards em tempo real, sem esperar o relatório do fim do mês.' },
            ].map((s) => (
              <div key={s.n} style={{ ...cardDark, padding: '30px 26px' }}>
                <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: 13, color: BLUE, marginBottom: 16 }}>{s.n}</div>
                <h3 style={{ fontFamily: "'Inter'", fontWeight: 700, fontSize: 21, color: '#eef4ff', margin: '18px 0 8px' }}>{s.t}</h3>
                <p style={{ fontSize: 15, color: '#93a4bd', lineHeight: 1.6, margin: 0 }}>{s.d}</p>
              </div>
            ))}
          </div>
          <div className="cw-plat" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22, marginTop: 22 }}>
            {[{ t: 'Desktop', d: 'Gestão no escritório' }, { t: 'Mobile', d: 'Uso no campo' }].map((p) => (
              <div key={p.t} style={{ display: 'flex', alignItems: 'center', gap: 14, background: 'rgba(47,107,255,.05)', border: '1px solid #1c2b42', borderRadius: 14, padding: '20px 22px' }}>
                <div><div style={{ fontWeight: 600, color: '#e4ecf8', fontSize: 15 }}>{p.t}</div><div style={{ fontSize: 12.5, color: '#7f90a9' }}>{p.d}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FUNDADOR */}
      <section style={{ borderTop: '1px solid #131f31', background: '#0c1523' }}>
        <div className="cw-founder" style={{ maxWidth: 1000, margin: '0 auto', padding: '74px 28px', display: 'grid', gridTemplateColumns: '1fr 1.25fr', gap: 44, alignItems: 'center' }}>
          <div>
            <div style={eyebrow}>Por que existimos</div>
            <h2 style={{ fontFamily: "'Inter'", fontWeight: 700, fontSize: 'clamp(24px,4.5vw,31px)', lineHeight: 1.15, letterSpacing: '-.02em', margin: 0, color: '#f2f6ff' }}>Nascemos dentro do canteiro, não do escritório de software.</h2>
          </div>
          <div>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: '#aab9d0', margin: '0 0 18px' }}>Obra de engenharia se perde entre planilhas soltas, grupos de WhatsApp e um diário que ninguém encontra depois. Quem está no campo anota num lugar; quem decide, olha outro. A informação chega tarde, e cara.</p>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: '#aab9d0', margin: '0 0 22px' }}>O CaseWorks é a nossa resposta: um sistema em que campo e escritório enxergam a mesma obra, ao mesmo tempo. Estamos em fase de implantação, construindo lado a lado com as primeiras construtoras parceiras.</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg,#2f6bff,#1a3f8f)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter'", fontWeight: 600, color: '#fff', fontSize: 15 }}>CW</div>
              <div><div style={{ fontWeight: 600, color: '#e8eef7', fontSize: 15 }}>Equipe CaseWorks</div><div style={{ fontSize: 12.5, color: '#7f90a9', fontFamily: "'IBM Plex Mono'" }}>Engenharia & Produto</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* WAITLIST */}
      <section id="lancamento" style={{ borderTop: '1px solid #131f31' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '74px 28px' }}>
          <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 22, border: '1px solid #24467f', background: 'radial-gradient(120% 140% at 15% 0%,#183463,#0d1a30)', padding: '56px 40px', textAlign: 'center' }}>
            <div style={{ position: 'relative', maxWidth: 560, margin: '0 auto' }}>
              <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: 12, letterSpacing: '.12em', textTransform: 'uppercase', color: '#8fb0ff', marginBottom: 16 }}>Lançamento 2026</div>
              <h2 style={{ fontFamily: "'Inter'", fontWeight: 700, fontSize: 'clamp(26px,5vw,36px)', lineHeight: 1.1, letterSpacing: '-.02em', margin: 0, color: '#fff' }}>Garanta seu acesso antecipado</h2>
              <p style={{ fontSize: 17, color: '#b6c6e0', lineHeight: 1.55, margin: '16px 0 30px' }}>Entre para a lista de espera e seja uma das primeiras construtoras a rodar suas obras no CaseWorks. Sem custo, avisamos assim que abrir.</p>
              {joined ? (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 11, padding: '16px 26px', background: 'rgba(22,163,74,.14)', border: '1px solid rgba(22,163,74,.4)', borderRadius: 12, color: '#7ee2a0', fontWeight: 600, fontSize: 16 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5" stroke="#4ade80" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>Você está na lista! Em breve entramos em contato.
                </div>
              ) : (
                <>
                  <div style={{ display: 'flex', gap: 11, maxWidth: 480, margin: '0 auto', flexWrap: 'wrap' }}>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com.br" style={{ flex: 1, minWidth: 220, padding: '15px 18px', borderRadius: 12, border: '1px solid #34558c', background: 'rgba(4,10,20,.5)', color: '#eaf1ff', fontSize: 15.5, outline: 'none' }} />
                    <button onClick={join} style={{ padding: '15px 26px', background: ORANGE, border: 'none', borderRadius: 12, color: '#1a1205', fontWeight: 600, fontSize: 15.5, cursor: 'pointer', boxShadow: '0 8px 24px rgba(240,129,12,.3)' }}>Entrar na lista</button>
                  </div>
                  <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: 11, color: msg ? '#f0a0a0' : '#6f83a6', marginTop: 14 }}>{msg || <>Ou <a href="#top" style={{ color: '#8fb0ff' }}>agende uma reunião</a> com o time</>}</div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #131f31', background: '#0a0f18' }}>
        <div className="cw-foot" style={{ maxWidth: 1200, margin: '0 auto', padding: '52px 28px 30px', display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr', gap: 40 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}><Logo size={24} /><span style={{ fontFamily: "'Inter'", fontWeight: 600, fontSize: 18, color: '#fff' }}>Case<span style={{ color: BLUE }}>Works</span></span></div>
            <p style={{ fontFamily: "'Inter'", fontSize: 14, color: '#5f7091', letterSpacing: '.02em', margin: 0 }}>Building better.</p>
          </div>
          <div>
            <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', color: '#5f7091', marginBottom: 16 }}>Produto</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11, fontSize: 14 }}><a href="#modulos" style={{ color: '#a3b3cc' }}>Módulos</a><a href="#como" style={{ color: '#a3b3cc' }}>Como funciona</a><a href="#lancamento" style={{ color: '#a3b3cc' }}>Lançamento</a></div>
          </div>
          <div>
            <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', color: '#5f7091', marginBottom: 16 }}>Contato</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11, fontSize: 14 }}><a href="#lancamento" style={{ color: '#a3b3cc' }}>Lista de espera</a><a href="#top" style={{ color: '#a3b3cc' }}>Agendar reunião</a></div>
          </div>
        </div>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 28px', borderTop: '1px solid #131f31', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, fontFamily: "'IBM Plex Mono'", fontSize: 11, color: '#4f6180' }}>
          <span>© 2026 CaseWorks. Todos os direitos reservados.</span>
          <span>Criado e desenvolvido por CaseWorks</span>
        </div>
      </footer>
    </div>
  );
}

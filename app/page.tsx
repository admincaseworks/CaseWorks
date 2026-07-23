'use client';

import { useMemo, useState, CSSProperties } from 'react';
import { supabase } from '@/lib/supabaseClient';

/* ---------- tokens ---------- */
const BLUE = '#2f6bff';
const ORANGE = '#f0810c';

const Logo = ({ size = 26 }: { size?: number }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src="/logo.png" alt="CaseWorks" height={(size / 26) * 32} style={{ display: 'block', height: (size / 26) * 32, width: 'auto' }} />
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
const eyebrow: CSSProperties = { fontFamily: "'Inter'", fontSize: 12, letterSpacing: '.14em', textTransform: 'uppercase', color: BLUE, marginBottom: 14 };
const h2: CSSProperties = { fontFamily: "'Inter'", fontWeight: 700, fontSize: 'clamp(26px,5vw,38px)', lineHeight: 1.1, letterSpacing: '-.02em', margin: 0, color: '#f2f6ff' };
const h3mod: CSSProperties = { fontFamily: "'Inter'", fontWeight: 700, fontSize: 26, color: '#f2f6ff', margin: 0 };
const modP: CSSProperties = { fontSize: 16, color: '#98a8c0', lineHeight: 1.6, margin: '12px 0 22px' };
const kpiLabel: CSSProperties = { fontFamily: "'Inter'", fontSize: 7.5, letterSpacing: '.04em', color: '#8b98ab', textTransform: 'uppercase' };

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
          <div style={{ fontFamily: "'Inter'", fontSize: 9, color: '#8b98ab', marginTop: 2 }}>40 etapas · formato de encadeamento</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 9, fontWeight: 600, color: '#1a2233', background: '#eef2f7', border: '1px solid #e0e5ec', padding: '5px 9px', borderRadius: 7 }}>Cascata</span>
          <span style={{ fontSize: 9, color: '#8b98ab', padding: '5px 4px' }}>Gantt dinâmico</span>
        </div>
      </div>
      <div style={{ background: '#fff', border: '1px solid #e6e9ef', borderRadius: 10, padding: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 9 }}>
          <span style={{ width: 96, flex: 'none', fontFamily: "'Inter'", fontSize: 8.5, color: '#9aa6b6', textTransform: 'uppercase', letterSpacing: '.05em' }}>Etapa</span>
          <div style={{ flex: 1, display: 'flex' }}>{monthsGantt.map((m) => (<span key={m} style={{ flex: 1, fontFamily: "'Inter'", fontSize: 8.5, color: '#9aa6b6', textAlign: 'center' }}>{m}/26</span>))}</div>
        </div>
        {gantt.map((g) => (
          <div key={g.name} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span style={{ width: 96, flex: 'none', fontSize: 10.5, color: '#4a5668', textAlign: 'right', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{g.name}</span>
            <div style={{ flex: 1, position: 'relative', height: 18, background: '#f7f9fc', borderRadius: 4, backgroundImage: 'linear-gradient(90deg,#eaeef4 1px,transparent 1px)', backgroundSize: '12.5% 100%' }}>
              <span style={{ position: 'absolute', top: 2, bottom: 2, left: `${g.l}%`, width: `${g.w}%`, background: g.c, borderRadius: 4, display: 'flex', alignItems: 'center', paddingLeft: 6, fontFamily: "'Inter'", fontSize: 7.5, color: g.tc, overflow: 'hidden', whiteSpace: 'nowrap' }}>{g.dur}</span>
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
            <div style={{ fontFamily: "'Inter'", fontSize: 8.5, color: '#8b98ab' }}>{d.mon}</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: '#3a4657' }}>RDO, {d.weather} · {d.crew} no efetivo</div>
            <div style={{ display: 'flex', gap: 5, marginTop: 6 }}>{[0, 1, 2].map((i) => (<span key={i} style={{ width: 38, height: 26, borderRadius: 5, background: 'repeating-linear-gradient(-45deg,#e7ebf1,#e7ebf1 4px,#dde2ea 4px,#dde2ea 8px)' }} />))}</div>
          </div>
          <span style={{ flex: 'none', fontFamily: "'Inter'", fontSize: 9, letterSpacing: '.04em', padding: '5px 10px', borderRadius: 20, background: d.bg, color: d.sc }}>{d.st}</span>
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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [joined, setJoined] = useState(false);
  const [msg, setMsg] = useState('');

  async function send(base: string) {
    if (!name.trim() || !email.includes('@') || !phone.trim()) { setMsg('Preencha nome, e-mail e celular.'); return; }
    setMsg('');
    if (supabase) { await supabase.from('waitlist').insert({ name, email, phone }); }
    const txt = base + '\n\nNome: ' + name + '\nE-mail: ' + email + '\nCelular: ' + phone;
    window.open('https://wa.me/5514996124667?text=' + encodeURIComponent(txt), '_blank');
    setJoined(true);
  }

  return (
    <div>
      {/* NAV */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(14px)', background: 'rgba(11,17,28,.78)', borderBottom: '1px solid #17263c' }}>
        <div className="cw-nav" style={{ maxWidth: 1200, margin: '0 auto', padding: '14px 28px', display: 'flex', flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
          <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Logo />
            <span style={{ fontFamily: "'Inter'", fontWeight: 600, fontSize: 19, color: '#fff' }}>Case<span style={{ color: BLUE }}>Works</span></span>
          </a>
          <nav className="cw-navlinks" style={{ display: 'flex', alignItems: 'center', gap: 30, whiteSpace: 'nowrap', flex: 'none', fontFamily: "'Inter', sans-serif", fontSize: 14, letterSpacing: 'normal', textTransform: 'none', color: '#dbe5f3' }}>
            <a href="#quem-somos" style={{ color: '#dbe5f3' }}>Quem somos</a>
            <a href="#como" style={{ color: '#dbe5f3' }}>Como funciona</a>
            <a href="#modulos" style={{ color: '#dbe5f3' }}>Módulos</a>
            <a href="#lancamento" style={{ color: '#dbe5f3' }}>Fale conosco</a>
          </nav>
          <div className="cw-navcta" style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 'none', whiteSpace: 'nowrap' }}>
            <a href="https://wa.me/5514996124667?text=Ol%C3%A1%2C%20CaseWorks!%20Quero%20fazer%20parte." target="_blank" rel="noopener" style={{ padding: '10px 18px', background: ORANGE, borderRadius: 10, color: '#1a1205', fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14, whiteSpace: 'nowrap', boxShadow: '0 6px 18px rgba(240,129,12,.24)' }}>Quero fazer parte</a>
            <a href="https://wa.me/5514996124667?text=Ol%C3%A1%2C%20CaseWorks!%20Gostaria%20de%20agendar%20uma%20reuni%C3%A3o." target="_blank" rel="noopener" style={{ padding: '10px 18px', border: '1px solid #33455f', borderRadius: 10, color: '#dbe5f3', fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14, whiteSpace: 'nowrap', background: 'rgba(255,255,255,.02)' }}>Agendar reunião</a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="top" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(#12203a 1px,transparent 1px),linear-gradient(90deg,#12203a 1px,transparent 1px)', backgroundSize: '46px 46px', opacity: 0.55, WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 72% 34%,#000,transparent 76%)', maskImage: 'radial-gradient(ellipse 90% 80% at 72% 34%,#000,transparent 76%)' }} />
        <div style={{ position: 'absolute', top: -120, right: -80, width: 520, height: 520, background: 'radial-gradient(circle,rgba(47,107,255,.22),transparent 62%)', pointerEvents: 'none' }} />
        <div className="cw-hero" style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', padding: '76px 28px 72px', display: 'grid', gridTemplateColumns: '1.02fr .98fr', gap: 52, alignItems: 'center' }}>
          <div>
            <h1 style={{ fontFamily: "'Inter'", fontWeight: 700, fontSize: 'clamp(32px,6.5vw,53px)', lineHeight: 1.05, letterSpacing: '-.02em', margin: '22px 0 0', color: '#f4f8ff', textWrap: 'balance' as CSSProperties['textWrap'] }}>Toda a obra, do canteiro ao caixa, num só sistema.</h1>
            <p style={{ fontSize: 18.5, lineHeight: 1.6, color: '#a3b3cc', margin: '20px 0 0', maxWidth: 520 }}>CaseWorks reúne planejamento, diário de obra, suprimentos e financeiro para que engenheiros, gestores e equipes de campo trabalhem sobre a mesma informação, em tempo real.</p>
            <div style={{ display: 'flex', gap: 14, marginTop: 32, flexWrap: 'wrap' }}>
              <a href="https://wa.me/5514996124667?text=Ol%C3%A1%2C%20CaseWorks!%20Quero%20fazer%20parte." target="_blank" rel="noopener" style={{ padding: '15px 26px', background: ORANGE, borderRadius: 11, color: '#1a1205', fontWeight: 600, fontSize: 15.5, boxShadow: '0 8px 24px rgba(240,129,12,.28)' }}>Quero fazer parte</a>
              <a href="https://wa.me/5514996124667?text=Ol%C3%A1%2C%20CaseWorks!%20Gostaria%20de%20agendar%20uma%20reuni%C3%A3o." target="_blank" rel="noopener" style={{ padding: '15px 24px', border: '1px solid #33455f', borderRadius: 11, color: '#dbe5f3', fontWeight: 600, fontSize: 15.5, background: 'rgba(255,255,255,.02)' }}>Agendar reunião</a>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 26, flexWrap: 'wrap', fontFamily: "'Inter'", fontSize: 11.5, letterSpacing: '.04em', color: '#6f7f98' }}>
              {['Feito por engenheiros', 'Dados seguros', 'Campo + escritório'].map((t) => (<span key={t} style={{ display: 'flex', alignItems: 'center', gap: 7 }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5" stroke={BLUE} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>{t}</span>))}
            </div>
          </div>
          <div className="cw-floaty">
            <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #223047', boxShadow: '0 40px 80px -24px rgba(0,0,0,.7),0 0 0 1px rgba(255,255,255,.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '11px 14px', background: '#0f1826', borderBottom: '1px solid #1c2b42' }}>
                {[0, 1, 2].map((i) => (<span key={i} style={{ width: 11, height: 11, borderRadius: '50%', background: '#2a3a54' }} />))}
                <span style={{ marginLeft: 8, flex: 1, height: 22, borderRadius: 7, background: '#0b111c', display: 'flex', alignItems: 'center', padding: '0 12px', fontFamily: "'Inter'", fontSize: 11, color: '#5f7091' }}>app.caseworks.com.br/dashboard</span>
              </div>
              <div style={{ background: '#f4f6f9', padding: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 13 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                    <div><div style={{ fontFamily: "'Inter'", fontWeight: 600, fontSize: 15, color: '#1a2233' }}>Residencial Aurora</div><div style={{ fontFamily: "'Inter'", fontSize: 9, letterSpacing: '.06em', color: '#8b98ab', textTransform: 'uppercase' }}>Dashboard da obra</div></div>
                    <span style={{ fontFamily: "'Inter'", fontSize: 8, letterSpacing: '.08em', padding: '3px 7px', borderRadius: 5, background: '#eef2ff', color: BLUE }}>DEMO</span>
                  </div>
                  <div style={{ textAlign: 'right' }}><div style={{ fontFamily: "'Inter'", fontSize: 9, letterSpacing: '.05em', color: '#8b98ab', textTransform: 'uppercase' }}>Término previsto</div><div style={{ fontFamily: "'Inter'", fontWeight: 600, fontSize: 14, color: BLUE }}>MAI 2027</div></div>
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

      {/* QUEM SOMOS */}
      <section id="quem-somos" style={{ borderTop: '1px solid #131f31', background: '#0b111c' }}>
        <div className="cw-sec" style={{ maxWidth: 1120, margin: '0 auto', padding: '78px 28px' }}>
          <div style={{ maxWidth: 720 }}>
            <div style={eyebrow}>Quem somos</div>
            <h2 style={h2}>Uma empresa de engenharia que virou software</h2>
            <p style={{ fontSize: 17.5, lineHeight: 1.65, color: '#aab9d0', margin: '20px 0 0' }}>Unimos mais de 30 anos de experiência na gestão e execução de obras a quase 20 anos de desenvolvimento de software. Conhecemos os desafios do canteiro porque vivemos essa realidade, e por isso construímos uma plataforma que conecta obra e escritório em tempo real.</p>
          </div>
          <div className="cw-mv" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginTop: 44 }}>
            <div className="cw-mvcard" style={{ border: '1px solid #1c2b42', borderRadius: 18, background: '#0c1523', padding: '30px 28px' }}>
              <div style={{ fontFamily: "'Inter'", fontSize: 12, letterSpacing: '.12em', textTransform: 'uppercase', color: '#2f6bff', marginBottom: 12 }}>Missão</div>
              <p style={{ fontSize: 15.5, lineHeight: 1.62, color: '#c6d3e6', margin: 0 }}>Transformar a gestão da construção civil por meio de uma plataforma prática, inteligente e confiável, conectando o canteiro de obras ao escritório em tempo real para aumentar a produtividade, reduzir desperdícios e apoiar decisões mais assertivas.</p>
            </div>
            <div className="cw-mvcard" style={{ border: '1px solid #1c2b42', borderRadius: 18, background: '#0c1523', padding: '30px 28px' }}>
              <div style={{ fontFamily: "'Inter'", fontSize: 12, letterSpacing: '.12em', textTransform: 'uppercase', color: '#2f6bff', marginBottom: 12 }}>Visão</div>
              <p style={{ fontSize: 15.5, lineHeight: 1.62, color: '#c6d3e6', margin: 0 }}>Ser a plataforma de gestão da construção civil mais confiável e inovadora do Brasil, reconhecida por simplificar processos, integrar equipes e contribuir para obras mais eficientes, sustentáveis e rentáveis.</p>
            </div>
          </div>
          <div className="cw-prop" style={{ marginTop: 18, position: 'relative', overflow: 'hidden', border: '1px solid #24467f', borderRadius: 18, background: 'radial-gradient(120% 160% at 15% 0%,#183463,#0d1a30)', padding: '40px 34px', textAlign: 'center' }}>
            <div style={{ fontFamily: "'Inter'", fontSize: 12, letterSpacing: '.14em', textTransform: 'uppercase', color: '#8fb0ff', marginBottom: 12 }}>Propósito</div>
            <p style={{ fontFamily: "'Inter'", fontWeight: 700, fontSize: 'clamp(20px,3.5vw,27px)', lineHeight: 1.3, color: '#fff', margin: '0 auto', maxWidth: 720, textWrap: 'balance' }}>Conectar pessoas, processos e tecnologia para construir obras melhores.</p>
          </div>
          <div style={{ marginTop: 52 }}>
            <h3 style={{ fontFamily: "'Inter'", fontWeight: 700, fontSize: 'clamp(20px,4vw,26px)', letterSpacing: '-.01em', margin: 0, color: '#f2f6ff' }}>Nossos valores</h3>
            <div className="cw-values" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginTop: 24 }}>
            <div style={{ border: '1px solid #1c2b42', borderRadius: 14, background: '#0c1523', padding: '22px 18px' }}>
              <div style={{ fontFamily: "'Inter'", fontSize: 12, color: '#2f6bff', marginBottom: 12 }}>01</div>
              <div style={{ fontFamily: "'Inter'", fontWeight: 700, fontSize: 14.5, color: '#eef3fb', marginBottom: 6 }}>Experiência de campo</div>
              <div style={{ fontSize: 12.8, lineHeight: 1.5, color: '#8b9cb5' }}>Soluções baseadas na vivência real de mais de três décadas em obras.</div>
            </div>
            <div style={{ border: '1px solid #1c2b42', borderRadius: 14, background: '#0c1523', padding: '22px 18px' }}>
              <div style={{ fontFamily: "'Inter'", fontSize: 12, color: '#2f6bff', marginBottom: 12 }}>02</div>
              <div style={{ fontFamily: "'Inter'", fontWeight: 700, fontSize: 14.5, color: '#eef3fb', marginBottom: 6 }}>Inovação com propósito</div>
              <div style={{ fontSize: 12.8, lineHeight: 1.5, color: '#8b9cb5' }}>Tecnologia para resolver problemas reais da construção civil, com gestão mais simples e eficiente.</div>
            </div>
            <div style={{ border: '1px solid #1c2b42', borderRadius: 14, background: '#0c1523', padding: '22px 18px' }}>
              <div style={{ fontFamily: "'Inter'", fontSize: 12, color: '#2f6bff', marginBottom: 12 }}>03</div>
              <div style={{ fontFamily: "'Inter'", fontWeight: 700, fontSize: 14.5, color: '#eef3fb', marginBottom: 6 }}>Confiabilidade</div>
              <div style={{ fontSize: 12.8, lineHeight: 1.5, color: '#8b9cb5' }}>Informações precisas e em tempo real para decisões seguras e redução de riscos.</div>
            </div>
            <div style={{ border: '1px solid #1c2b42', borderRadius: 14, background: '#0c1523', padding: '22px 18px' }}>
              <div style={{ fontFamily: "'Inter'", fontSize: 12, color: '#2f6bff', marginBottom: 12 }}>04</div>
              <div style={{ fontFamily: "'Inter'", fontWeight: 700, fontSize: 14.5, color: '#eef3fb', marginBottom: 6 }}>Compromisso com resultados</div>
              <div style={{ fontSize: 12.8, lineHeight: 1.5, color: '#8b9cb5' }}>Aumentar a produtividade e reduzir retrabalhos, desperdícios e atrasos em todas as etapas.</div>
            </div>
            <div style={{ border: '1px solid #1c2b42', borderRadius: 14, background: '#0c1523', padding: '22px 18px' }}>
              <div style={{ fontFamily: "'Inter'", fontSize: 12, color: '#2f6bff', marginBottom: 12 }}>05</div>
              <div style={{ fontFamily: "'Inter'", fontWeight: 700, fontSize: 14.5, color: '#eef3fb', marginBottom: 6 }}>Simplicidade</div>
              <div style={{ fontSize: 12.8, lineHeight: 1.5, color: '#8b9cb5' }}>Ferramentas intuitivas que facilitam o trabalho de engenheiros, gestores e equipes de campo.</div>
            </div>
            <div style={{ border: '1px solid #1c2b42', borderRadius: 14, background: '#0c1523', padding: '22px 18px' }}>
              <div style={{ fontFamily: "'Inter'", fontSize: 12, color: '#2f6bff', marginBottom: 12 }}>06</div>
              <div style={{ fontFamily: "'Inter'", fontWeight: 700, fontSize: 14.5, color: '#eef3fb', marginBottom: 6 }}>Transparência</div>
              <div style={{ fontSize: 12.8, lineHeight: 1.5, color: '#8b9cb5' }}>Comunicação clara entre escritório, canteiro, clientes e fornecedores.</div>
            </div>
            <div style={{ border: '1px solid #1c2b42', borderRadius: 14, background: '#0c1523', padding: '22px 18px' }}>
              <div style={{ fontFamily: "'Inter'", fontSize: 12, color: '#2f6bff', marginBottom: 12 }}>07</div>
              <div style={{ fontFamily: "'Inter'", fontWeight: 700, fontSize: 14.5, color: '#eef3fb', marginBottom: 6 }}>Evolução contínua</div>
              <div style={{ fontSize: 12.8, lineHeight: 1.5, color: '#8b9cb5' }}>Aprimoramento constante para acompanhar o mercado e nossos clientes.</div>
            </div>
            <div style={{ border: '1px solid #1c2b42', borderRadius: 14, background: '#0c1523', padding: '22px 18px' }}>
              <div style={{ fontFamily: "'Inter'", fontSize: 12, color: '#2f6bff', marginBottom: 12 }}>08</div>
              <div style={{ fontFamily: "'Inter'", fontWeight: 700, fontSize: 14.5, color: '#eef3fb', marginBottom: 6 }}>Parceria</div>
              <div style={{ fontSize: 12.8, lineHeight: 1.5, color: '#8b9cb5' }}>O sucesso dos nossos clientes é a medida do nosso próprio sucesso.</div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como" style={{ borderTop: '1px solid #131f31' }}>
        <div className="cw-sec" style={{ maxWidth: 1200, margin: '0 auto', padding: '78px 28px' }}>
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
                <div style={{ fontFamily: "'Inter'", fontSize: 13, color: BLUE, marginBottom: 16 }}>{s.n}</div>
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

      {/* MÓDULOS */}
      <section id="modulos" style={{ borderTop: '1px solid #131f31', background: 'linear-gradient(180deg,#0b111c,#0c1523)' }}>
        <div className="cw-sec" style={{ maxWidth: 1200, margin: '0 auto', padding: '78px 28px 84px' }}>
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 40px' }}>
            <div style={eyebrow}>Módulos</div>
            <h2 style={h2}>Um módulo para cada frente da obra</h2>
            <p style={{ fontSize: 17, color: '#96a6be', margin: '16px 0 0', lineHeight: 1.55 }}>Do avanço físico no canteiro ao fluxo de caixa no escritório. Explore o que já faz parte do CaseWorks.</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 34 }}>
            {TABS.map((name, i) => (
              <button key={name} onClick={() => setTab(i)} style={{ padding: '11px 20px', borderRadius: 11, fontFamily: "'Inter'", fontWeight: 600, fontSize: 14.5, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all .15s', position: 'relative', zIndex: 2, touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent', ...(i === tab ? { background: BLUE, color: '#fff', border: `1px solid ${BLUE}`, boxShadow: '0 6px 18px rgba(47,107,255,.3)' } : { background: 'rgba(255,255,255,.03)', color: '#93a4bd', border: '1px solid #223047' }) }}>{name}</button>
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
        <div className="cw-sec" style={{ maxWidth: 1200, margin: '0 auto', padding: '78px 28px 84px' }}>
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 48px' }}>
            <div style={eyebrow}>Plataforma completa</div>
            <h2 style={h2}>Tudo que a sua obra precisa, num só lugar</h2>
            <p style={{ fontSize: 17, color: '#96a6be', margin: '16px 0 0', lineHeight: 1.55 }}>18 módulos organizados em quatro frentes, da gestão estratégica ao chão de obra, do suprimento ao financeiro.</p>
          </div>
          {groups.map((g) => (
            <div key={g.label} style={{ marginBottom: 34 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 11, margin: '0 0 16px' }}>
                <span style={{ width: 30, height: 30, flex: 'none', borderRadius: 8, background: g.soft, display: 'flex', alignItems: 'center', justifyContent: 'center', color: g.color, fontFamily: "'Inter'", fontWeight: 700, fontSize: 13 }}>{g.label[0]}</span>
                <span style={{ fontFamily: "'Inter'", fontSize: 12.5, letterSpacing: '.1em', textTransform: 'uppercase', color: g.color, fontWeight: 600 }}>{g.label}</span>
                <span style={{ fontFamily: "'Inter'", fontSize: 11, color: '#4f6180' }}>{g.items.length} módulos</span>
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

      {/* DIFERENCIAIS */}
      <section id="diferenciais" style={{ borderTop: '1px solid #131f31', background: 'linear-gradient(180deg,#0c1523,#0b111c)' }}>
        <div className="cw-sec" style={{ maxWidth: 1160, margin: '0 auto', padding: '74px 28px' }}>
          <div style={{ textAlign: 'center', maxWidth: 660, margin: '0 auto 46px' }}>
            <div style={eyebrow}>Por que CaseWorks</div>
            <h2 style={h2}>O que muda quando a obra fala uma língua só</h2>
            <p style={{ fontSize: 17, color: '#96a6be', margin: '16px 0 0', lineHeight: 1.55 }}>O diferencial não está em ter mais telas, e sim em campo e escritório enxergarem a mesma obra, ao mesmo tempo.</p>
          </div>
          <div className="cw-compare" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.12fr', gap: 18, alignItems: 'start' }}>
            <div style={{ border: '1px solid #1c2b42', borderRadius: 18, background: '#0c1523', padding: '30px 26px' }}>
              <div style={{ fontFamily: "'Inter'", fontWeight: 700, fontSize: 18, color: '#c3d0e4' }}>Planilhas & WhatsApp</div>
              <div style={{ fontFamily: "'Inter'", fontSize: 11, letterSpacing: '.06em', textTransform: 'uppercase', color: '#6f7f98', margin: '5px 0 22px' }}>O jeito de sempre</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}><div style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flex: 'none', marginTop: 1 }}><path d="M6 6l12 12M18 6L6 18" stroke="#5a6a83" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg><span style={{ fontSize: 14.5, lineHeight: 1.5, color: '#93a4bd' }}>Informação espalhada em arquivos e grupos</span></div><div style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flex: 'none', marginTop: 1 }}><path d="M6 6l12 12M18 6L6 18" stroke="#5a6a83" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg><span style={{ fontSize: 14.5, lineHeight: 1.5, color: '#93a4bd' }}>O que o campo anota, o escritório vê tarde</span></div><div style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flex: 'none', marginTop: 1 }}><path d="M6 6l12 12M18 6L6 18" stroke="#5a6a83" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg><span style={{ fontSize: 14.5, lineHeight: 1.5, color: '#93a4bd' }}>Diário de obra que ninguém encontra depois</span></div><div style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flex: 'none', marginTop: 1 }}><path d="M6 6l12 12M18 6L6 18" stroke="#5a6a83" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg><span style={{ fontSize: 14.5, lineHeight: 1.5, color: '#93a4bd' }}>Retrabalho e digitação em dobro</span></div></div>
            </div>
            <div style={{ border: '1px solid #1c2b42', borderRadius: 18, background: '#0c1523', padding: '30px 26px' }}>
              <div style={{ fontFamily: "'Inter'", fontWeight: 700, fontSize: 18, color: '#c3d0e4' }}>ERPs tradicionais</div>
              <div style={{ fontFamily: "'Inter'", fontSize: 11, letterSpacing: '.06em', textTransform: 'uppercase', color: '#6f7f98', margin: '5px 0 22px' }}>Foco no escritório</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}><div style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flex: 'none', marginTop: 1 }}><path d="M6 6l12 12M18 6L6 18" stroke="#5a6a83" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg><span style={{ fontSize: 14.5, lineHeight: 1.5, color: '#93a4bd' }}>Nascidos no financeiro, o campo fica em segundo plano</span></div><div style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flex: 'none', marginTop: 1 }}><path d="M6 6l12 12M18 6L6 18" stroke="#5a6a83" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg><span style={{ fontSize: 14.5, lineHeight: 1.5, color: '#93a4bd' }}>Complexos e caros para a obra do dia a dia</span></div><div style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flex: 'none', marginTop: 1 }}><path d="M6 6l12 12M18 6L6 18" stroke="#5a6a83" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg><span style={{ fontSize: 14.5, lineHeight: 1.5, color: '#93a4bd' }}>Implantação longa e distante da operação</span></div><div style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flex: 'none', marginTop: 1 }}><path d="M6 6l12 12M18 6L6 18" stroke="#5a6a83" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg><span style={{ fontSize: 14.5, lineHeight: 1.5, color: '#93a4bd' }}>Mobile fraco para quem está no canteiro</span></div></div>
            </div>
            <div style={{ border: '1px solid #2f6bff', borderRadius: 18, background: 'linear-gradient(180deg,#10203c,#0c1626)', padding: '30px 26px', boxShadow: '0 22px 55px rgba(47,107,255,.14)' }}>
              <div style={{ fontFamily: "'Inter'", fontWeight: 700, fontSize: 18, color: '#fff' }}>CaseWorks</div>
              <div style={{ fontFamily: "'Inter'", fontSize: 11, letterSpacing: '.06em', textTransform: 'uppercase', color: '#8fb0ff', margin: '5px 0 22px' }}>A nossa forma</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}><div style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flex: 'none', marginTop: 1 }}><path d="M20 6 9 17l-5-5" stroke="#2f6bff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg><span style={{ fontSize: 14.5, lineHeight: 1.5, color: '#d3deee' }}>Campo e escritório na mesma obra, em tempo real</span></div><div style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flex: 'none', marginTop: 1 }}><path d="M20 6 9 17l-5-5" stroke="#2f6bff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg><span style={{ fontSize: 14.5, lineHeight: 1.5, color: '#d3deee' }}>Diário de obra (RDO) registrado e fácil de achar</span></div><div style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flex: 'none', marginTop: 1 }}><path d="M20 6 9 17l-5-5" stroke="#2f6bff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg><span style={{ fontSize: 14.5, lineHeight: 1.5, color: '#d3deee' }}>Do planejamento ao caixa em um só sistema</span></div><div style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flex: 'none', marginTop: 1 }}><path d="M20 6 9 17l-5-5" stroke="#2f6bff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg><span style={{ fontSize: 14.5, lineHeight: 1.5, color: '#d3deee' }}>Feito por engenheiros, simples de adotar no canteiro</span></div></div>
            </div>
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
            <p style={{ fontSize: 17, lineHeight: 1.65, color: '#aab9d0', margin: '0 0 18px' }}>A CaseWorks nasceu da união entre mais de 30 anos de experiência na gestão e execução de obras e quase 20 anos de desenvolvimento de software. Conhecemos os desafios enfrentados diariamente por engenheiros, mestres de obras e gestores porque vivemos essa realidade.</p>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: '#aab9d0', margin: '0 0 22px' }}>Por isso desenvolvemos uma plataforma que conecta o canteiro de obras ao escritório em tempo real, eliminando retrabalhos, reduzindo atrasos e oferecendo informações confiáveis para decisões rápidas e eficientes. Mais do que um software, a CaseWorks é uma parceira na evolução da gestão da construção civil.</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg,#2f6bff,#1a3f8f)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter'", fontWeight: 600, color: '#fff', fontSize: 15 }}>CW</div>
              <div><div style={{ fontWeight: 600, color: '#e8eef7', fontSize: 15 }}>Equipe CaseWorks</div><div style={{ fontSize: 12.5, color: '#7f90a9', fontFamily: "'Inter'" }}>Engenharia & Produto</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* WAITLIST */}
      <section id="lancamento" style={{ borderTop: '1px solid #131f31' }}>
        <div className="cw-sec" style={{ maxWidth: 1200, margin: '0 auto', padding: '74px 28px' }}>
          <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 22, border: '1px solid #24467f', background: 'radial-gradient(120% 140% at 15% 0%,#183463,#0d1a30)', padding: '56px 40px', textAlign: 'center' }}>
            <div style={{ position: 'relative', maxWidth: 560, margin: '0 auto' }}>
              <div style={{ fontFamily: "'Inter'", fontSize: 12, letterSpacing: '.12em', textTransform: 'uppercase', color: '#8fb0ff', marginBottom: 16 }}>CaseWorks em operação</div>
              <h2 style={{ fontFamily: "'Inter'", fontWeight: 700, fontSize: 'clamp(26px,5vw,36px)', lineHeight: 1.1, letterSpacing: '-.02em', margin: 0, color: '#fff' }}>Leve o CaseWorks para as suas obras</h2>
              <p style={{ fontSize: 17, color: '#b6c6e0', lineHeight: 1.55, margin: '16px 0 30px' }}>Solicite uma demonstração e veja como o CaseWorks coloca campo e escritório na mesma obra, em tempo real. Nossa equipe acompanha a implantação na sua construtora.</p>
              {joined ? (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 11, padding: '16px 26px', background: 'rgba(22,163,74,.14)', border: '1px solid rgba(22,163,74,.4)', borderRadius: 12, color: '#7ee2a0', fontWeight: 600, fontSize: 16 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5" stroke="#4ade80" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>Recebemos seu contato! Em breve nossa equipe fala com você.
                </div>
              ) : (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 11, maxWidth: 440, margin: '0 auto' }}>
                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" style={{ width: '100%', padding: '15px 18px', borderRadius: 12, border: '1px solid #34558c', background: 'rgba(4,10,20,.5)', color: '#eaf1ff', fontSize: 15.5, outline: 'none' }} />
                    <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com.br" style={{ width: '100%', padding: '15px 18px', borderRadius: 12, border: '1px solid #34558c', background: 'rgba(4,10,20,.5)', color: '#eaf1ff', fontSize: 15.5, outline: 'none' }} />
                    <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(00) 00000-0000" style={{ width: '100%', padding: '15px 18px', borderRadius: 12, border: '1px solid #34558c', background: 'rgba(4,10,20,.5)', color: '#eaf1ff', fontSize: 15.5, outline: 'none' }} />
                    <button onClick={() => send('Olá, CaseWorks! Quero fazer parte.')} style={{ width: '100%', padding: '15px 26px', background: ORANGE, border: 'none', borderRadius: 12, color: '#1a1205', fontWeight: 600, fontSize: 15.5, cursor: 'pointer', boxShadow: '0 8px 24px rgba(240,129,12,.3)' }}>Quero fazer parte</button>
                    <button onClick={() => send('Olá, CaseWorks! Gostaria de agendar uma reunião.')} style={{ width: '100%', padding: '15px 26px', background: 'transparent', border: '1px solid #33455f', borderRadius: 12, color: '#dbe5f3', fontWeight: 600, fontSize: 15.5, cursor: 'pointer' }}>Agendar reunião</button>
                  </div>
                  <div style={{ fontFamily: "'Inter'", fontSize: 11, color: msg ? '#f0a0a0' : '#6f83a6', marginTop: 14 }}>{msg || 'Ao enviar, abrimos o WhatsApp já com seus dados.'}</div>
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
            <div style={{ fontFamily: "'Inter'", fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', color: '#5f7091', marginBottom: 16 }}>Produto</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11, fontSize: 14 }}><a href="#como" style={{ color: '#a3b3cc' }}>Como funciona</a><a href="#modulos" style={{ color: '#a3b3cc' }}>Módulos</a><a href="#lancamento" style={{ color: '#a3b3cc' }}>Fale conosco</a></div>
          </div>
          <div>
            <div style={{ fontFamily: "'Inter'", fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', color: '#5f7091', marginBottom: 16 }}>Contato</div>
            <div style={{ display: 'flex', gap: 10 }}>
              <a href="mailto:contato@caseworks.com.br" aria-label="E-mail" style={{ display: 'flex', width: 38, height: 38, borderRadius: 10, border: '1px solid #26344b', background: 'rgba(255,255,255,.02)', alignItems: 'center', justifyContent: 'center' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="#dbe5f3" strokeWidth="1.7" /><path d="m3.5 6.5 8.5 6 8.5-6" stroke="#dbe5f3" strokeWidth="1.7" /></svg></a>
              <a href="https://www.instagram.com/gabrielocasemiro?igsh=MTIwaWg2MXowejNqZA==" target="_blank" rel="noopener" aria-label="Instagram" style={{ display: 'flex', width: 38, height: 38, borderRadius: 10, border: '1px solid #26344b', background: 'rgba(255,255,255,.02)', alignItems: 'center', justifyContent: 'center' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="5" stroke="#dbe5f3" strokeWidth="1.7" /><circle cx="12" cy="12" r="4" stroke="#dbe5f3" strokeWidth="1.7" /><circle cx="17.5" cy="6.5" r="1.2" fill="#dbe5f3" /></svg></a>
              <a href="https://wa.me/5514996124667?text=Ol%C3%A1!%20Tenho%20interesse%20no%20CaseWorks" target="_blank" rel="noopener" aria-label="WhatsApp" style={{ display: 'flex', width: 38, height: 38, borderRadius: 10, border: '1px solid #26344b', background: 'rgba(255,255,255,.02)', alignItems: 'center', justifyContent: 'center' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="#dbe5f3"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.16c-.24.68-1.4 1.3-1.94 1.38-.5.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.79-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-2.99 0-1.42.75-2.12 1.01-2.41.27-.29.58-.36.77-.36.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.59.82 2.01.89 2.16.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.72 1.18 1.54 1.91 1.06.94 1.95 1.24 2.23 1.38.28.14.44.12.61-.07.17-.19.7-.82.89-1.1.19-.28.38-.23.64-.14.26.09 1.67.79 1.95.93.28.14.47.21.54.33.07.12.07.68-.17 1.36z" /></svg></a>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 28px', borderTop: '1px solid #131f31', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, fontFamily: "'Inter'", fontSize: 11, color: '#4f6180' }}>
          <span>© 2026 CaseWorks. Todos os direitos reservados.</span>
          <span>Criado e desenvolvido por CaseWorks</span>
        </div>
      </footer>

      <a href="https://wa.me/5514996124667?text=Ol%C3%A1!%20Tenho%20interesse%20no%20CaseWorks" target="_blank" rel="noopener" aria-label="Falar no WhatsApp" style={{ position: 'fixed', right: 22, bottom: 22, zIndex: 60, width: 58, height: 58, borderRadius: '50%', background: '#25d366', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 30px rgba(37,211,102,.45)' }}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="#fff"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.16c-.24.68-1.4 1.3-1.94 1.38-.5.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.79-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-2.99 0-1.42.75-2.12 1.01-2.41.27-.29.58-.36.77-.36.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.59.82 2.01.89 2.16.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.72 1.18 1.54 1.91 1.06.94 1.95 1.24 2.23 1.38.28.14.44.12.61-.07.17-.19.7-.82.89-1.1.19-.28.38-.23.64-.14.26.09 1.67.79 1.95.93.28.14.47.21.54.33.07.12.07.68-.17 1.36z" /></svg>
      </a>
    </div>
  );
}

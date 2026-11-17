import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { QRCodeCanvas } from 'qrcode.react';
import {
  ArrowLeft, ArrowRight, BadgeCheck, BarChart3, Check, ChevronRight,
  CircleDollarSign, Clipboard, Coffee, Download, Eye, EyeOff, ExternalLink,
  Globe2, LayoutDashboard, Leaf, Link2, LogOut, Menu, Package, Pencil,
  Plus, QrCode, Search, Settings, Sparkles, Store, Trash2, Utensils, X
} from 'lucide-react';
import './styles.css';

const STORAGE_KEY = 'menuflow-mvp-v1';
const DEMO_EMAIL = 'demo@menuflow.com.br';
const DEMO_PASSWORD = '12345678';

const seed = {
  account: { name: 'Marina Costa', email: DEMO_EMAIL, password: DEMO_PASSWORD },
  business: {
    name: 'Bossa Café', slug: 'bossa-cafe', type: 'Cafeteria',
    description: 'Cafés especiais, brunch e afeto em cada detalhe.',
    address: 'Rua das Flores, 128 — Centro', whatsapp: '(11) 99999-1234',
    hours: 'Seg a Sáb · 08h às 19h', published: true
  },
  categories: ['Cafés', 'Brunch', 'Doces'],
  products: [
    { id: 1, category: 'Cafés', name: 'Latte da Casa', description: 'Espresso duplo, leite vaporizado e toque de baunilha.', price: 16.9, active: true, tag: 'Mais pedido' },
    { id: 2, category: 'Cafés', name: 'Coado Especial', description: 'Grão brasileiro de torra média, preparado na V60.', price: 13.0, active: true, tag: '' },
    { id: 3, category: 'Brunch', name: 'Toast Caprese', description: 'Pão de fermentação natural, pesto, tomate e muçarela.', price: 28.9, active: true, tag: 'Vegetariano' },
    { id: 4, category: 'Brunch', name: 'Ovos da Manhã', description: 'Ovos cremosos, sourdough tostado e manteiga de ervas.', price: 26.0, active: true, tag: '' },
    { id: 5, category: 'Doces', name: 'Bolo de Cenoura', description: 'Fatia generosa com cobertura cremosa de chocolate.', price: 14.5, active: true, tag: 'Queridinho' },
  ]
};

function loadData() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || seed; }
  catch { return seed; }
}
function money(value) { return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value); }
function slugify(value) { return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }

function Logo({ light = false }) {
  return <span className={`logo ${light ? 'logo-light' : ''}`}><span className="logo-mark"><Utensils size={18}/></span>MenuFlow</span>;
}

function Landing({ onStart, onLogin, onPreview }) {
  return <div className="landing">
    <header className="site-header">
      <a className="skip-link" href="#principal">Pular para o conteúdo</a>
      <div className="container nav-wrap"><Logo />
        <nav aria-label="Principal" className="desktop-nav">
          <a href="#como-funciona">Como funciona</a><a href="#recursos">Recursos</a><a href="#preco">Preço</a>
        </nav>
        <div className="nav-actions"><button className="btn btn-ghost" onClick={onLogin}>Entrar</button><button className="btn btn-primary" onClick={onStart}>Começar grátis <ArrowRight size={17}/></button></div>
      </div>
    </header>
    <main id="principal">
      <section className="hero container">
        <div className="hero-copy">
          <div className="eyebrow"><Sparkles size={15}/> Seu cardápio no ar em poucos minutos</div>
          <h1>Um cardápio bonito.<br/><em>Uma experiência simples.</em></h1>
          <p>Crie seu cardápio digital, atualize quando quiser e compartilhe com um link e QR Code que nunca mudam.</p>
          <div className="hero-actions"><button className="btn btn-primary btn-lg" onClick={onStart}>Criar meu cardápio <ArrowRight size={18}/></button><button className="btn btn-secondary btn-lg" onClick={onPreview}><Eye size={18}/> Ver cardápio exemplo</button></div>
          <div className="micro-proof"><span><Check/> 7 dias grátis</span><span><Check/> Sem cartão</span><span><Check/> Cancele quando quiser</span></div>
        </div>
        <div className="hero-visual" aria-label="Prévia de um cardápio digital no celular">
          <div className="orbit orbit-one"></div><div className="orbit orbit-two"></div>
          <div className="phone">
            <div className="phone-top"></div><div className="phone-screen">
              <div className="mini-cover"><span className="mini-logo"><Coffee/></span><strong>Bossa Café</strong><small>Aberto agora · até 19h</small></div>
              <div className="mini-tabs"><b>Cafés</b><span>Brunch</span><span>Doces</span></div>
              <MiniProduct name="Latte da Casa" desc="Espresso, leite e baunilha" price="R$ 16,90" color="latte" />
              <MiniProduct name="Toast Caprese" desc="Pesto, tomate e muçarela" price="R$ 28,90" color="toast" />
              <MiniProduct name="Bolo de Cenoura" desc="Cobertura de chocolate" price="R$ 14,50" color="cake" />
            </div>
          </div>
          <div className="floating-card card-qr"><QrCode/><div><strong>QR Code fixo</strong><span>Imprima uma vez</span></div></div>
          <div className="floating-card card-update"><BadgeCheck/><div><strong>Atualizado!</strong><span>Em tempo real</span></div></div>
        </div>
      </section>
      <section className="trust-strip"><div className="container"><span>Feito para quem serve experiências</span><div className="business-types"><b><Utensils/> Restaurantes</b><b><Coffee/> Cafeterias</b><b><CircleDollarSign/> Bares</b><b><Leaf/> Lanchonetes</b></div></div></section>
      <section id="como-funciona" className="section container">
        <div className="section-heading"><span className="kicker">Simples de verdade</span><h2>Do cadastro à mesa em três passos</h2><p>Sem aplicativo para baixar, sem designer e sem complicação.</p></div>
        <div className="steps">
          <article><span className="step-no">01</span><div className="step-icon"><Store/></div><h3>Crie seu espaço</h3><p>Cadastre o estabelecimento e personalize as informações principais.</p></article>
          <article><span className="step-no">02</span><div className="step-icon"><Package/></div><h3>Monte o cardápio</h3><p>Adicione categorias, produtos, descrições e preços em instantes.</p></article>
          <article><span className="step-no">03</span><div className="step-icon"><QrCode/></div><h3>Compartilhe e venda</h3><p>Baixe o QR Code, cole nas mesas e compartilhe seu link exclusivo.</p></article>
        </div>
      </section>
      <section id="recursos" className="feature-band"><div className="container feature-grid"><div>
        <span className="kicker">Feito para a rotina real</span><h2>Mude o preço.<br/>Não mude o QR Code.</h2><p>O endereço do seu cardápio permanece o mesmo. Atualize produtos, preços ou disponibilidade e seus clientes veem tudo na hora.</p>
        <ul className="check-list"><li><Check/> Link exclusivo do seu negócio</li><li><Check/> QR Code estático em alta resolução</li><li><Check/> Produtos ilimitados no plano Pro</li><li><Check/> Funciona em qualquer celular</li></ul>
      </div><div className="feature-demo"><div className="qr-paper"><div className="tape"></div><QrCode size={190}/><strong>Aponte a câmera</strong><small>Veja nosso cardápio</small></div><div className="edit-bubble"><Pencil/><span><b>Latte da Casa</b><s>R$ 15,90</s> <strong>R$ 16,90</strong></span></div></div></div></section>
      <section id="preco" className="section pricing-section container"><div className="section-heading"><span className="kicker">Preço simples</span><h2>Menos que um cafezinho por dia</h2></div>
        <div className="price-card"><div><span className="plan-label">Plano Essencial</span><h3><sup>R$</sup> 39<small>,90/mês</small></h3><p>Tudo o que você precisa para colocar seu cardápio online e começar a vender.</p></div><ul><li><Check/> Cardápio digital completo</li><li><Check/> Link e QR Code fixos</li><li><Check/> Produtos e categorias ilimitados</li><li><Check/> Atualizações em tempo real</li><li><Check/> Suporte por WhatsApp</li></ul><button className="btn btn-primary btn-lg" onClick={onStart}>Testar grátis por 7 dias <ArrowRight/></button></div>
      </section>
      <section className="final-cta"><div className="container"><span className="eyebrow dark"><Sparkles/> Pronto para começar?</span><h2>Seu novo cardápio está a poucos cliques.</h2><p>Crie, publique e compartilhe hoje mesmo.</p><button className="btn btn-light btn-lg" onClick={onStart}>Criar meu cardápio grátis <ArrowRight/></button></div></section>
    </main>
    <footer><div className="container footer-wrap"><Logo light/><p>Cardápios digitais que dão gosto de ver.</p><span>© 2026 MenuFlow</span></div></footer>
  </div>;
}

function MiniProduct({name, desc, price, color}) { return <div className="mini-product"><div className={`food-thumb ${color}`}></div><div><b>{name}</b><small>{desc}</small><strong>{price}</strong></div></div> }

function Auth({ mode, onBack, onAuth, onSwitch }) {
  const [show, setShow] = useState(false); const [error, setError] = useState('');
  function submit(e) {
    e.preventDefault(); const fd = new FormData(e.currentTarget); const email = fd.get('email'); const password = fd.get('password'); const name = fd.get('name');
    if (mode === 'login' && (email !== DEMO_EMAIL || password !== DEMO_PASSWORD)) { setError('Use demo@menuflow.com.br e a senha 12345678 para acessar a demonstração.'); return; }
    onAuth(mode === 'signup' ? { name, email, password } : null);
  }
  return <div className="auth-page"><div className="auth-brand"><Logo light/><div><span className="eyebrow dark"><Sparkles/> Comece agora</span><h1>Seu cardápio digital,<br/><em>do seu jeito.</em></h1><p>Uma presença online bonita e prática para o seu negócio vender mais.</p></div><div className="auth-quote">“Em poucos minutos, tudo pronto para receber clientes.”</div></div>
    <main className="auth-main"><button className="back-button" onClick={onBack}><ArrowLeft/> Voltar</button><div className="auth-card"><span className="auth-mini-logo"><Utensils/></span><h2>{mode === 'login' ? 'Que bom ter você de volta' : 'Crie sua conta grátis'}</h2><p>{mode === 'login' ? 'Entre para gerenciar seu cardápio.' : 'Seu cardápio online em poucos minutos.'}</p>
      {mode === 'login' && <div className="demo-note"><b>Acesso de demonstração</b><span>{DEMO_EMAIL}</span><span>Senha: {DEMO_PASSWORD}</span></div>}
      <form onSubmit={submit} aria-label={mode === 'login' ? 'Entrar na conta' : 'Criar conta'}>
        {mode === 'signup' && <div className="field"><label htmlFor="name">Seu nome</label><input id="name" name="name" autoComplete="name" required placeholder="Como podemos chamar você?"/></div>}
        <div className="field"><label htmlFor="email">E-mail</label><input id="email" name="email" type="email" autoComplete="username" spellCheck="false" required defaultValue={mode === 'login' ? DEMO_EMAIL : ''} placeholder="voce@seunegocio.com.br"/></div>
        <div className="field"><div className="label-row"><label htmlFor="password">Senha</label>{mode === 'login' && <button type="button" className="text-button">Esqueci minha senha</button>}</div><div className="password-wrap"><input id="password" name="password" type={show ? 'text' : 'password'} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} minLength="8" required defaultValue={mode === 'login' ? DEMO_PASSWORD : ''} aria-describedby="password-hint"/><button type="button" className="password-toggle" onClick={()=>setShow(!show)} aria-pressed={show} aria-label={show ? 'Ocultar senha' : 'Mostrar senha'}>{show ? <EyeOff/> : <Eye/>}</button></div>{mode === 'signup' && <small id="password-hint">Use pelo menos 8 caracteres.</small>}</div>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="btn btn-primary btn-full btn-lg" type="submit">{mode === 'login' ? 'Entrar no painel' : 'Criar conta e continuar'} <ArrowRight/></button>
      </form><p className="auth-switch">{mode === 'login' ? 'Ainda não tem uma conta?' : 'Já tem uma conta?'} <button className="text-button strong" onClick={onSwitch}>{mode === 'login' ? 'Começar grátis' : 'Entrar'}</button></p></div></main>
  </div>
}

function Dashboard({ data, setData, onLogout, onPublic }) {
  const [section, setSection] = useState('overview'); const [dialogOpen, setDialogOpen] = useState(false); const [editing, setEditing] = useState(null); const [toast, setToast] = useState(''); const [mobileNav, setMobileNav] = useState(false);
  const publicUrl = `${location.origin}${location.pathname}?menu=${data.business.slug}`;
  const activeProducts = data.products.filter(p=>p.active).length;
  function notify(msg){ setToast(msg); setTimeout(()=>setToast(''), 2600); }
  function openProduct(product=null){ setEditing(product); setDialogOpen(true); }
  function saveProduct(e){ e.preventDefault(); const fd=new FormData(e.currentTarget); const item={ id: editing?.id || Date.now(), name:fd.get('name'), category:fd.get('category'), description:fd.get('description'), price:Number(String(fd.get('price')).replace(',','.')), tag:fd.get('tag'), active:true }; setData({...data,products:editing?data.products.map(p=>p.id===editing.id?item:p):[...data.products,item]}); setDialogOpen(false); notify(editing?'Produto atualizado.':'Produto adicionado.'); }
  function removeProduct(id){ setData({...data,products:data.products.filter(p=>p.id!==id)}); notify('Produto removido.'); }
  function toggleProduct(id){setData({...data,products:data.products.map(p=>p.id===id?{...p,active:!p.active}:p)});}
  function copyLink(){navigator.clipboard?.writeText(publicUrl); notify('Link copiado para a área de transferência.');}
  function downloadQr(){const canvas=document.querySelector('#qr-download canvas'); const a=document.createElement('a');a.download=`qrcode-${data.business.slug}.png`;a.href=canvas.toDataURL('image/png');a.click();}
  return <div className="dashboard-shell">
    <aside className={`sidebar ${mobileNav?'open':''}`}><div className="sidebar-top"><Logo light/><button className="icon-button close-nav" onClick={()=>setMobileNav(false)} aria-label="Fechar menu"><X/></button></div><div className="business-chip"><span>{data.business.name.slice(0,1)}</span><div><b>{data.business.name}</b><small>Plano Essencial</small></div></div>
      <nav aria-label="Painel"><SidebarLink icon={<LayoutDashboard/>} label="Visão geral" active={section==='overview'} onClick={()=>{setSection('overview');setMobileNav(false)}}/><SidebarLink icon={<Package/>} label="Produtos" badge={data.products.length} active={section==='products'} onClick={()=>{setSection('products');setMobileNav(false)}}/><SidebarLink icon={<QrCode/>} label="Link e QR Code" active={section==='share'} onClick={()=>{setSection('share');setMobileNav(false)}}/><SidebarLink icon={<Store/>} label="Meu negócio" active={section==='business'} onClick={()=>{setSection('business');setMobileNav(false)}}/></nav>
      <div className="sidebar-bottom"><button onClick={()=>onPublic()}><ExternalLink/> Ver cardápio</button><button onClick={onLogout}><LogOut/> Sair da conta</button><div className="user-chip"><span>{data.account.name.slice(0,1)}</span><div><b>{data.account.name}</b><small>{data.account.email}</small></div></div></div>
    </aside>
    <main className="dashboard-main"><header className="dash-header"><button className="icon-button mobile-menu" onClick={()=>setMobileNav(true)} aria-label="Abrir menu"><Menu/></button><div><h1>{section==='overview'?'Visão geral':section==='products'?'Produtos':section==='share'?'Link e QR Code':'Meu negócio'}</h1><p>{section==='overview'?`Olá, ${data.account.name.split(' ')[0]}! Aqui está o resumo do seu cardápio.`:section==='products'?'Gerencie os itens disponíveis no seu cardápio.':section==='share'?'Divulgue seu cardápio com um endereço que não muda.':'Atualize as informações exibidas aos seus clientes.'}</p></div><button className="btn btn-secondary desktop-only" onClick={onPublic}><Eye/> Ver cardápio</button></header>
      <div className="dash-content">
      {section==='overview' && <Overview data={data} activeProducts={activeProducts} onSection={setSection} onPublic={onPublic}/>} 
      {section==='products' && <Products data={data} onAdd={()=>openProduct()} onEdit={openProduct} onRemove={removeProduct} onToggle={toggleProduct}/>} 
      {section==='share' && <Share data={data} publicUrl={publicUrl} copyLink={copyLink} downloadQr={downloadQr} onPublic={onPublic}/>} 
      {section==='business' && <Business data={data} setData={setData} notify={notify}/>} 
      </div>
    </main>
    {dialogOpen && <ProductDialog categories={data.categories} product={editing} onClose={()=>setDialogOpen(false)} onSubmit={saveProduct}/>}<div className={`toast ${toast?'show':''}`} role="status"><BadgeCheck/>{toast}</div>
  </div>;
}

function SidebarLink({icon,label,badge,active,onClick}){return <button className={active?'active':''} onClick={onClick}>{icon}<span>{label}</span>{badge!==undefined&&<i>{badge}</i>}</button>}
function Overview({data,activeProducts,onSection,onPublic}){return <><div className="status-banner"><div><span className="live-dot"></span><div><b>Seu cardápio está publicado</b><small>Clientes já podem acessar pelo link ou QR Code.</small></div></div><button className="btn btn-light" onClick={onPublic}>Abrir cardápio <ExternalLink/></button></div><div className="metric-grid"><Metric icon={<Package/>} label="Produtos ativos" value={activeProducts} detail={`${data.products.length} cadastrados`} tone="purple"/><Metric icon={<QrCode/>} label="Acessos este mês" value="248" detail="↑ 18% vs. mês anterior" tone="orange"/><Metric icon={<BarChart3/>} label="Atualizações" value="12" detail="Nos últimos 30 dias" tone="green"/></div><div className="overview-grid"><section className="dash-card"><div className="card-heading"><div><h2>Ações rápidas</h2><p>Continue preparando seu cardápio.</p></div></div><div className="quick-actions"><button onClick={()=>onSection('products')}><span><Plus/></span><div><b>Adicionar produto</b><small>Inclua um novo item no cardápio</small></div><ChevronRight/></button><button onClick={()=>onSection('share')}><span><QrCode/></span><div><b>Baixar QR Code</b><small>Pronto para imprimir e usar</small></div><ChevronRight/></button><button onClick={()=>onSection('business')}><span><Settings/></span><div><b>Editar informações</b><small>Horários, contato e endereço</small></div><ChevronRight/></button></div></section><section className="dash-card preview-card"><div className="card-heading"><div><h2>Prévia do cardápio</h2><p>Como seus clientes estão vendo.</p></div><button className="text-button strong" onClick={onPublic}>Ver completo</button></div><div className="menu-preview"><span className="preview-avatar"><Coffee/></span><h3>{data.business.name}</h3><small>{data.business.description}</small>{data.products.filter(p=>p.active).slice(0,3).map(p=><div className="preview-row" key={p.id}><div><b>{p.name}</b><small>{p.description}</small></div><strong>{money(p.price)}</strong></div>)}</div></section></div></>}
function Metric({icon,label,value,detail,tone}){return <article className="metric"><span className={tone}>{icon}</span><div><small>{label}</small><strong>{value}</strong><em>{detail}</em></div></article>}
function Products({data,onAdd,onEdit,onRemove,onToggle}){const[query,setQuery]=useState('');const filtered=data.products.filter(p=>p.name.toLowerCase().includes(query.toLowerCase()));return <section className="dash-card products-card"><div className="product-toolbar"><label className="search-box"><Search/><span className="visually-hidden">Buscar produtos</span><input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar produto..."/></label><button className="btn btn-primary" onClick={onAdd}><Plus/> Novo produto</button></div><div className="product-list">{filtered.map(p=><article className="product-row" key={p.id}><div className="product-placeholder"><Utensils/></div><div className="product-info"><div><h3>{p.name}</h3>{p.tag&&<span>{p.tag}</span>}</div><p>{p.description}</p><small>{p.category}</small></div><strong className="product-price">{money(p.price)}</strong><label className="switch"><input type="checkbox" checked={p.active} onChange={()=>onToggle(p.id)}/><span></span><i>{p.active?'Ativo':'Oculto'}</i></label><div className="row-actions"><button onClick={()=>onEdit(p)} aria-label={`Editar ${p.name}`}><Pencil/></button><button onClick={()=>onRemove(p.id)} aria-label={`Excluir ${p.name}`}><Trash2/></button></div></article>)}{filtered.length===0&&<div className="empty-state"><Search/><h3>Nenhum produto encontrado</h3><p>Tente outro termo ou adicione um novo produto.</p></div>}</div></section>}
function Share({data,publicUrl,copyLink,downloadQr,onPublic}){return <div className="share-grid"><section className="dash-card qr-card"><span className="kicker">QR Code permanente</span><h2>Imprima uma vez. Atualize sempre.</h2><p>Mesmo que produtos e preços mudem, este QR Code continuará levando ao seu cardápio.</p><div id="qr-download" className="qr-display"><QRCodeCanvas value={publicUrl} size={220} bgColor="#ffffff" fgColor="#18251f" level="H" includeMargin/></div><button className="btn btn-primary btn-full" onClick={downloadQr}><Download/> Baixar QR Code em PNG</button></section><section className="dash-card link-card"><span className="link-icon"><Link2/></span><h2>Link do seu cardápio</h2><p>Compartilhe nas redes sociais, no WhatsApp e no perfil do Google.</p><label htmlFor="public-link">Endereço público</label><div className="copy-field"><input id="public-link" value={publicUrl} readOnly/><button onClick={copyLink}><Clipboard/> Copiar</button></div><div className="link-tip"><Globe2/><p><b>Seu identificador é fixo</b><span>O endereço <strong>/{data.business.slug}</strong> continua o mesmo após qualquer atualização.</span></p></div><button className="btn btn-secondary btn-full" onClick={onPublic}>Abrir cardápio público <ExternalLink/></button></section></div>}
function Business({data,setData,notify}){function submit(e){e.preventDefault();const fd=new FormData(e.currentTarget);const business={...data.business,name:fd.get('businessName'),slug:slugify(fd.get('slug')),type:fd.get('type'),description:fd.get('description'),address:fd.get('address'),whatsapp:fd.get('whatsapp'),hours:fd.get('hours')};setData({...data,business});notify('Informações salvas com sucesso.')}return <section className="dash-card business-form"><form onSubmit={submit}><div className="form-section"><h2>Identidade do negócio</h2><p>Essas informações aparecem no topo do seu cardápio.</p><div className="form-grid"><div className="field"><label htmlFor="businessName">Nome do estabelecimento</label><input id="businessName" name="businessName" defaultValue={data.business.name} required/></div><div className="field"><label htmlFor="type">Tipo de negócio</label><select id="type" name="type" defaultValue={data.business.type}><option>Restaurante</option><option>Bar</option><option>Cafeteria</option><option>Lanchonete</option><option>Outro</option></select></div><div className="field full"><label htmlFor="description">Descrição</label><textarea id="description" name="description" defaultValue={data.business.description} maxLength="160"/></div></div></div><div className="form-section"><h2>Link exclusivo</h2><p>Escolha um identificador curto e fácil de lembrar.</p><div className="slug-field"><span>menuflow.com/</span><input name="slug" defaultValue={data.business.slug} required pattern="[a-z0-9-]+"/></div></div><div className="form-section"><h2>Contato e funcionamento</h2><div className="form-grid"><div className="field"><label htmlFor="whatsapp">WhatsApp</label><input id="whatsapp" name="whatsapp" defaultValue={data.business.whatsapp} autoComplete="tel"/></div><div className="field"><label htmlFor="hours">Horário</label><input id="hours" name="hours" defaultValue={data.business.hours}/></div><div className="field full"><label htmlFor="address">Endereço</label><input id="address" name="address" defaultValue={data.business.address} autoComplete="street-address"/></div></div></div><div className="form-footer"><button className="btn btn-primary btn-lg" type="submit">Salvar alterações</button></div></form></section>}
function ProductDialog({categories,product,onClose,onSubmit}){return <div className="dialog-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}><div className="dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title"><div className="dialog-header"><div><span className="kicker">Cardápio</span><h2 id="dialog-title">{product?'Editar produto':'Novo produto'}</h2></div><button className="icon-button" onClick={onClose} aria-label="Fechar"><X/></button></div><form onSubmit={onSubmit}><div className="field"><label htmlFor="product-name">Nome do produto</label><input id="product-name" name="name" defaultValue={product?.name} required autoFocus/></div><div className="form-grid"><div className="field"><label htmlFor="product-category">Categoria</label><select id="product-category" name="category" defaultValue={product?.category||categories[0]}>{categories.map(c=><option key={c}>{c}</option>)}</select></div><div className="field"><label htmlFor="product-price">Preço (R$)</label><input id="product-price" name="price" inputMode="decimal" defaultValue={product?.price?.toFixed(2).replace('.',',')} pattern="[0-9]+([,.][0-9]{1,2})?" required/></div></div><div className="field"><label htmlFor="product-description">Descrição</label><textarea id="product-description" name="description" defaultValue={product?.description} maxLength="160" required/></div><div className="field"><label htmlFor="product-tag">Destaque <small>(opcional)</small></label><input id="product-tag" name="tag" defaultValue={product?.tag} placeholder="Ex.: Mais pedido"/></div><div className="dialog-actions"><button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button><button type="submit" className="btn btn-primary">{product?'Salvar alterações':'Adicionar produto'}</button></div></form></div></div>}

function PublicMenu({data,onBack}){const[category,setCategory]=useState('Todos');const[query,setQuery]=useState('');const products=data.products.filter(p=>p.active&&(category==='Todos'||p.category===category)&&p.name.toLowerCase().includes(query.toLowerCase()));return <div className="public-menu"><header className="public-cover"><div className="public-top"><Logo light/>{onBack&&<button className="btn btn-light" onClick={onBack}><ArrowLeft/> Voltar ao painel</button>}</div><div className="public-identity"><span><Coffee/></span><div><div className="open-pill"><i></i> Aberto agora</div><h1>{data.business.name}</h1><p>{data.business.description}</p><small>{data.business.address} · {data.business.hours}</small></div></div></header><main className="public-content"><div className="public-tools"><label className="public-search"><Search/><span className="visually-hidden">Buscar no cardápio</span><input type="search" placeholder="O que você procura?" value={query} onChange={e=>setQuery(e.target.value)}/></label><div className="category-tabs"><button className={category==='Todos'?'active':''} onClick={()=>setCategory('Todos')}>Todos</button>{data.categories.map(c=><button key={c} className={category===c?'active':''} onClick={()=>setCategory(c)}>{c}</button>)}</div></div>{data.categories.map(cat=>{const items=products.filter(p=>p.category===cat);if(!items.length)return null;return <section key={cat} className="public-category"><div className="category-title"><span></span><h2>{cat}</h2><small>{items.length} {items.length===1?'item':'itens'}</small></div><div className="public-products">{items.map((p,i)=><article key={p.id}><div className={`public-food food-${(i%4)+1}`}><Utensils/></div><div><div className="product-title-line"><h3>{p.name}</h3>{p.tag&&<span>{p.tag}</span>}</div><p>{p.description}</p><strong>{money(p.price)}</strong></div></article>)}</div></section>})}{products.length===0&&<div className="empty-state"><Search/><h3>Nada por aqui</h3><p>Tente buscar outro nome ou categoria.</p></div>}</main><footer className="public-footer"><Logo/><p>Cardápio digital por MenuFlow</p></footer></div>}

function App(){const[data,setDataState]=useState(loadData);const[view,setView]=useState(new URLSearchParams(location.search).has('menu')?'public':'landing');function setData(next){setDataState(next);localStorage.setItem(STORAGE_KEY,JSON.stringify(next));}function auth(account){if(account)setData({...data,account});setView('dashboard');}useEffect(()=>{document.title=view==='dashboard'?'Painel | MenuFlow':view==='public'?`${data.business.name} | Cardápio`:'MenuFlow — seu cardápio, sempre atualizado'},[view,data.business.name]);if(view==='landing')return <Landing onStart={()=>setView('signup')} onLogin={()=>setView('login')} onPreview={()=>setView('public')}/>;if(view==='login'||view==='signup')return <Auth mode={view} onBack={()=>setView('landing')} onAuth={auth} onSwitch={()=>setView(view==='login'?'signup':'login')}/>;if(view==='public')return <PublicMenu data={data} onBack={()=>setView('dashboard')}/>;return <Dashboard data={data} setData={setData} onLogout={()=>setView('landing')} onPublic={()=>setView('public')}/>}

createRoot(document.getElementById('root')).render(<App/>);

'use client'



import { useState, useEffect, useCallback } from 'react'
import {
  X, ChevronLeft, ChevronRight, Shield, Star, Globe, MessageSquare,
  Mail, Search, Database, CheckCircle2, AlertTriangle, Zap, Users,
  Target, Sparkles, Play, Building2, Briefcase, Laptop, Scale,
  ShoppingCart, UtensilsCrossed, Calculator, Plus, Instagram, Smartphone
} from 'lucide-react'
import { ROICalculatorEngine, INDUSTRY_PRESETS, type ProspectConfig } from '@/components/ROICalculatorEngine'

// ─── Types ───────────────────────────────────────────────────────────────────

interface Proposal {
  id: string; client: string; location: string; status: 'draft' | 'ready' | 'sent' | 'won' | 'lost'
  created: string; value: string; via: string; slides: Slide[]
}
interface Slide { id: string; title: string; subtitle?: string; content: React.ReactNode }

// ─── Shared Components ───────────────────────────────────────────────────────

function MetricBox({ label, value, sub, color = 'violet' }: { label: string; value: string; sub?: string; color?: string }) {
  const colors: Record<string, string> = {
    violet: 'border-violet-500/20 bg-violet-500/5 text-violet-400',
    emerald: 'border-emerald-500/20 bg-emerald-500/5 text-emerald-400',
    amber: 'border-amber-500/20 bg-amber-500/5 text-amber-400',
    red: 'border-red-500/20 bg-red-500/5 text-red-400',
    cyan: 'border-cyan-500/20 bg-cyan-500/5 text-cyan-400',
    blue: 'border-blue-500/20 bg-blue-500/5 text-blue-400',
    orange: 'border-orange-500/20 bg-orange-500/5 text-orange-400',
  }
  return (
    <div className={`rounded-xl border p-4 sm:p-5 ${colors[color]}`}>
      <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">{label}</p>
      <p className={`text-2xl sm:text-3xl font-black ${colors[color].split(' ').pop()}`}>{value}</p>
      {sub && <p className="text-[10px] text-zinc-600 mt-1">{sub}</p>}
    </div>
  )
}

function AuditRow({ label, status, score }: { label: string; status: 'none' | 'basic' | 'active'; score: string }) {
  const cfg = {
    none: { color: 'text-red-400', bg: 'bg-red-500/10', icon: X, label: 'Ausente' },
    basic: { color: 'text-amber-400', bg: 'bg-amber-500/10', icon: AlertTriangle, label: 'Básico' },
    active: { color: 'text-emerald-400', bg: 'bg-emerald-500/10', icon: CheckCircle2, label: 'Activo' },
  }
  const c = cfg[status]; const Icon = c.icon
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
      <span className="text-sm text-zinc-300">{label}</span>
      <div className="flex items-center gap-3">
        <span className={`text-xs font-bold ${c.color}`}>{score}</span>
        <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full ${c.bg}`}>
          <Icon size={12} className={c.color} />
          <span className={`text-[10px] font-bold ${c.color}`}>{c.label}</span>
        </div>
      </div>
    </div>
  )
}

function LeakRow({ num, label, cost }: { num: number; label: string; cost: string }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-white/5 last:border-0">
      <div className="w-7 h-7 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-xs font-bold text-red-400 flex-shrink-0">{num}</div>
      <div className="flex-1"><p className="text-sm text-zinc-200">{label}</p></div>
      <span className="text-sm font-bold text-red-400 flex-shrink-0">{cost}</span>
    </div>
  )
}

function ServiceCard({ icon: Icon, title, description, tag }: { icon: any; title: string; description: string; tag: string }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 hover:bg-white/[0.04] hover:border-orange-500/20 transition-all">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400 flex-shrink-0"><Icon size={18} /></div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-sm font-bold text-white">{title}</p>
            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">{tag}</span>
          </div>
          <p className="text-xs text-zinc-500 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  )
}

// ─── Security Proposal Slides ────────────────────────────────────────────────

const securityConfig = {
  ...INDUSTRY_PRESETS.b2b_saas,
  businessName: 'API de Occidente',
  location: 'Guadalajara, México',
}

function buildSecurityProposalSlides(): Slide[] {
  return [
    { id: 'title', title: '', content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-8">
        <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-6 mx-auto">
          <Shield size={32} className="text-orange-400" />
        </div>
        <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 mb-4">MNS × MyNewStaff.ai presenta</p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight mb-4">Revenue Machine</h1>
        <h2 className="text-xl sm:text-2xl font-light text-zinc-400 mb-2">API de Occidente</h2>
        <p className="text-sm text-zinc-600">Guadalajara, Jalisco, México</p>
        <div className="flex items-center gap-4 mt-8">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20">
            <Shield size={12} className="text-orange-400" />
            <span className="text-xs font-bold text-orange-400">18 años de experiencia</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <Star size={12} className="text-emerald-400" />
            <span className="text-xs font-bold text-emerald-400">ISO 9001 Certificado</span>
          </div>
        </div>
        <p className="text-[10px] text-zinc-700 mt-12">Marzo 2026 · Confidencial</p>
      </div>
    )},
    { id: 'intel', title: 'Inteligencia Empresarial', subtitle: 'Lo que encontramos', content: (
      <div className="space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <MetricBox label="Años Operando" value="18" sub="Desde 2008" color="orange" />
          <MetricBox label="Cobertura" value="3 estados" sub="Jalisco, Nuevo León, Nacional" color="violet" />
          <MetricBox label="Servicios" value="6+" sub="Guardias, CCTV, Patrullaje, Control Acceso" color="cyan" />
          <MetricBox label="Clientes Activos" value="~50" sub="Empresas e industrias" color="amber" />
        </div>
        <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-4">
          <p className="text-sm text-emerald-300 font-medium">
            <CheckCircle2 size={14} className="inline mr-2" />
            Empresa sólida con reputación establecida en el sector de seguridad privada. El servicio es excelente — la <span className="font-bold text-emerald-200">infraestructura comercial digital</span> es la oportunidad de crecimiento.
          </p>
        </div>
      </div>
    )},
    { id: 'audit', title: 'Auditoría de Presencia Digital', subtitle: 'Estado actual — 3.2 / 10 madurez digital', content: (
      <div className="space-y-4">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
          <AuditRow label="Sitio Web (apideoccidente.com)" status="basic" score="4/10" />
          <AuditRow label="Google Business Profile" status="basic" score="3/10" />
          <AuditRow label="LinkedIn Empresa" status="basic" score="3/10" />
          <AuditRow label="Facebook" status="basic" score="2/10" />
          <AuditRow label="Email Marketing" status="none" score="0/10" />
          <AuditRow label="CRM / Base de Datos" status="none" score="0/10" />
          <AuditRow label="Chatbot AI / Soporte 24×7" status="none" score="0/10" />
          <AuditRow label="Sistema de Cotización Online" status="none" score="0/10" />
          <AuditRow label="Contenido / Blog / SEO" status="none" score="0/10" />
          <AuditRow label="WhatsApp Business" status="basic" score="2/10" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-center">
            <p className="text-3xl font-black text-red-400">3.2</p>
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-1">Madurez Digital / 10</p>
          </div>
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-center">
            <p className="text-3xl font-black text-red-400">~90%</p>
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-1">Clientes por referencia (sin digital)</p>
          </div>
        </div>
      </div>
    )},
    { id: 'leaks', title: 'Análisis de Fugas de Ingresos', subtitle: '$180,000 – $350,000 MXN anuales perdidos', content: (
      <div className="space-y-4">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
          <LeakRow num={1} label="Sin sistema de cotización online — prospectos se pierden fuera de horario" cost="~$80K/año" />
          <LeakRow num={2} label="Sin email marketing — clientes existentes no reciben nurture ni upsell" cost="~$60K/año" />
          <LeakRow num={3} label="Sin SEO/contenido — invisible en Google para 'seguridad privada guadalajara'" cost="~$50K/año" />
          <LeakRow num={4} label="Sin CRM — seguimiento manual, leads se enfrían" cost="~$40K/año" />
          <LeakRow num={5} label="Sin chatbot AI — consultas mueren fuera de horario laboral" cost="~$30K/año" />
          <LeakRow num={6} label="Sin presencia en LinkedIn — canal #1 para B2B en seguridad" cost="~$25K/año" />
        </div>
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5 text-center">
          <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Total Estimado de Ingresos Perdidos Anualmente</p>
          <p className="text-4xl font-black text-red-400">$180K – $350K MXN</p>
          <p className="text-xs text-zinc-600 mt-2">Contratos que se van a la competencia por falta de presencia digital</p>
        </div>
      </div>
    )},
    { id: 'solution', title: 'La Revenue Machine', subtitle: 'Lo que desplegamos — 6 sistemas autónomos', content: (
      <div className="space-y-3">
        <div className="rounded-xl border border-orange-500/10 bg-orange-500/5 p-3 mb-4">
          <p className="text-xs text-orange-300"><Sparkles size={12} className="inline mr-1.5" />Cada componente está <span className="font-bold text-orange-200">probado en producción</span> — funcionando en 5+ despliegues activos desde Q1 2026.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <ServiceCard icon={Globe} title="Landing Page + Cotizador" description="Next.js 16 + animaciones premium + formulario de cotización inteligente. SEO optimizado. Core Web Vitals 95+." tag="GOLDEN" />
          <ServiceCard icon={MessageSquare} title="Chatbot AI de Ventas" description="Chatbot entrenado en servicios de seguridad. Califica prospectos 24/7. Sincronización con CRM." tag="LIVE" />
          <ServiceCard icon={Mail} title="Email Machine (16+ emails)" description="4 secuencias: bienvenida, nurture, propuesta, reactivación. Automatizado 100%." tag="GOLDEN" />
          <ServiceCard icon={Search} title="Google Business + SEO" description="Optimización GBP completa. Contenido SEO para 'seguridad privada guadalajara'. Reviews automatizados." tag="GOLDEN" />
          <ServiceCard icon={Instagram} title="Contenido LinkedIn + Social" description="Plan de contenido B2B. Casos de éxito. Posicionamiento como líder del sector." tag="GOLDEN" />
          <ServiceCard icon={Database} title="CRM + Inteligencia Comercial" description="Pipeline de ventas. Scoring de leads. Seguimiento automático. Reportes mensuales." tag="GOLDEN" />
        </div>
      </div>
    )},
    { id: 'results', title: 'Resultados Proyectados — Año 1', subtitle: 'Estimaciones conservadoras basadas en datos de clientes activos', content: (
      <div className="space-y-5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <MetricBox label="Nuevos Contratos" value="+15-25" sub="Anuales adicionales" color="emerald" />
          <MetricBox label="Ingresos Nuevos" value="+$500K" sub="MXN año 1" color="violet" />
          <MetricBox label="Leads Digitales" value="30-50/mes" sub="Actualmente ~5/mes" color="amber" />
          <MetricBox label="Cierre Rate" value="15-20%" sub="Con nurture automatizado" color="cyan" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <MetricBox label="Google Reviews" value="50+" sub="Objetivo año 1" color="blue" />
          <MetricBox label="LinkedIn Seguidores" value="2-3K" sub="Objetivo 6 meses" color="violet" />
          <MetricBox label="Lista Email" value="500+" sub="Contactos propios" color="emerald" />
          <MetricBox label="Año 2-3" value="+$1M" sub="Efecto compuesto" color="amber" />
        </div>
      </div>
    )},
    { id: 'pricing', title: 'Opciones de Inversión', subtitle: 'Tres niveles — todos con ROI positivo en Año 1', content: (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 px-3 py-1 bg-orange-500/20 text-orange-300 text-[9px] font-bold uppercase tracking-wider rounded-bl-lg">Recomendado</div>
          <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Opción A</p>
          <p className="text-lg font-black text-white mb-1">Revenue Machine Completa</p>
          <p className="text-xs text-zinc-500 mb-4">Todo desplegado. Máximo ROI.</p>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm"><span className="text-zinc-400">Setup único</span><span className="font-bold text-white">$120,000 MXN</span></div>
            <div className="flex justify-between text-sm"><span className="text-zinc-400">Mensual</span><span className="font-bold text-white">$18,000/mes</span></div>
            <div className="border-t border-white/10 pt-2 flex justify-between text-sm"><span className="text-zinc-300 font-medium">Total año 1</span><span className="font-black text-orange-400">$336,000 MXN</span></div>
          </div>
          <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-3 text-center">
            <p className="text-xs text-emerald-300">ROI: <span className="font-black text-emerald-200">150 – 300%</span></p>
          </div>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
          <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Opción B</p>
          <p className="text-lg font-black text-white mb-1">Esenciales</p>
          <p className="text-xs text-zinc-500 mb-4">Elementos de mayor ROI.</p>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm"><span className="text-zinc-400">Setup único</span><span className="font-bold text-white">$65,000 MXN</span></div>
            <div className="flex justify-between text-sm"><span className="text-zinc-400">Mensual</span><span className="font-bold text-white">$10,000/mes</span></div>
            <div className="border-t border-white/10 pt-2 flex justify-between text-sm"><span className="text-zinc-300 font-medium">Total año 1</span><span className="font-black text-cyan-400">$185,000 MXN</span></div>
          </div>
          <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-3 text-center">
            <p className="text-xs text-emerald-300">ROI: <span className="font-black text-emerald-200">200 – 400%</span></p>
          </div>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
          <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Opción C</p>
          <p className="text-lg font-black text-white mb-1">Performance-Based</p>
          <p className="text-xs text-zinc-500 mb-4">Cero riesgo. Incentivos alineados.</p>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm"><span className="text-zinc-400">Setup</span><span className="font-bold text-white">$40,000 MXN</span></div>
            <div className="flex justify-between text-sm"><span className="text-zinc-400">Mensual</span><span className="font-bold text-white">$10,000/mes</span></div>
            <div className="flex justify-between text-sm"><span className="text-zinc-400">Bono por contrato</span><span className="font-bold text-amber-400">10% del valor</span></div>
            <div className="border-t border-white/10 pt-2 flex justify-between text-sm"><span className="text-zinc-300 font-medium">Año 1 est.</span><span className="font-black text-amber-400">~$210,000 MXN</span></div>
          </div>
          <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-3">
            <p className="text-[11px] text-amber-300">Si generamos $0 en contratos nuevos, solo pagas la base. Incentivos 100% alineados.</p>
          </div>
        </div>
      </div>
    )},
    { id: 'roi', title: 'Calculadora ROI Interactiva', subtitle: 'Edita tus números — ve las proyecciones en tiempo real', content: <ROICalculatorEngine config={securityConfig} /> },
    { id: 'timeline', title: 'Timeline de Despliegue', subtitle: '5 semanas de acuerdo firmado a lanzamiento completo', content: (
      <div className="space-y-5">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
          {[
            { week: 'Semana 1', title: 'Discovery + Assets', desc: 'Llamada de descubrimiento · Materiales de marca · Brief de fotografía', icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/10' },
            { week: 'Semana 2-3', title: 'Landing Page + Cotizador', desc: 'Página web premium · Formulario inteligente · SEO local', icon: Globe, color: 'text-orange-400', bg: 'bg-orange-500/10' },
            { week: 'Semana 3', title: 'Contenido + Email', desc: 'LinkedIn lanzado · Plan de contenido B2B · Secuencias de email configuradas', icon: Mail, color: 'text-pink-400', bg: 'bg-pink-500/10' },
            { week: 'Semana 4', title: 'AI + CRM + Google', desc: 'Chatbot entrenado · GBP optimizado · CRM activo · WhatsApp configurado', icon: Zap, color: 'text-amber-400', bg: 'bg-amber-500/10' },
            { week: 'Semana 5', title: 'QA + Lanzamiento', desc: 'Testing completo · Capacitación · TODO EN VIVO', icon: Play, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          ].map((step, i) => (
            <div key={step.week} className="flex items-start gap-4 pb-4 last:pb-0 border-b border-white/5 last:border-0 mb-4 last:mb-0">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-xl ${step.bg} flex items-center justify-center`}><step.icon size={18} className={step.color} /></div>
                {i < 4 && <div className="w-px h-6 bg-white/10 mt-2" />}
              </div>
              <div className="flex-1 pt-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] uppercase tracking-wider text-zinc-600 font-bold">{step.week}</span>
                  <span className="text-sm font-bold text-white">{step.title}</span>
                </div>
                <p className="text-xs text-zinc-500">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )},
    { id: 'why-us', title: 'Por Qué MNS × MyNewStaff.ai', subtitle: 'Desplegamos máquinas, no presentaciones', content: (
      <div className="space-y-5">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
          <div className="grid grid-cols-2 divide-x divide-white/5">
            <div className="p-4">
              <p className="text-xs font-bold text-zinc-500 mb-3 uppercase tracking-wider">Agencia Tradicional</p>
              <div className="space-y-2.5">
                {['Reportes mensuales, revisiones trimestrales', 'Un practicante manejando redes', 'Email blasts genéricos', '"Llame en horario de oficina"', 'CRM manual', '$40K/mes por "manejo de redes"'].map(t => (
                  <div key={t} className="flex items-center gap-2 text-xs text-zinc-600"><X size={10} className="text-red-400 flex-shrink-0" />{t}</div>
                ))}
              </div>
            </div>
            <div className="p-4 bg-orange-500/[0.03]">
              <p className="text-xs font-bold text-orange-400 mb-3 uppercase tracking-wider">Revenue Machine</p>
              <div className="space-y-2.5">
                {['Sistemas autónomos 24/7', 'Contenido con scoring AI', 'Motor de email behavioral de 4 secuencias', 'Chatbot AI que califica prospectos a las 3am', 'Inteligencia comercial automatizada', 'Infraestructura completa de ingresos'].map(t => (
                  <div key={t} className="flex items-center gap-2 text-xs text-zinc-300"><CheckCircle2 size={10} className="text-emerald-400 flex-shrink-0" />{t}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-5">
          <p className="text-xs uppercase tracking-wider text-zinc-500 mb-3 font-semibold">Tu Infraestructura de Ingresos — Funcionando 24/7</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
              { name: 'Tu Cerebro de Marketing', sub: 'Orquesta todos los sistemas automáticamente' },
              { name: 'Fábrica de Contenido', sub: 'Crea y califica publicaciones sin que muevas un dedo' },
              { name: 'Piloto Automático de Email', sub: 'Envía el mensaje correcto en el momento correcto, 24/7' },
              { name: 'Asistente de Ventas AI', sub: 'Califica prospectos y responde incluso a las 3am' },
              { name: 'CRM Inteligente', sub: 'Recuerda cada prospecto, activa seguimientos automáticamente' },
              { name: 'Inteligencia de Contenido', sub: 'Asegura que cada publicación esté optimizada antes de publicar' },
            ].map(s => (
              <div key={s.name} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                <div>
                  <p className="text-[11px] font-bold text-white">{s.name}</p>
                  <p className="text-[9px] text-zinc-600">{s.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )},
    { id: 'close', title: '', content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-8">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 mx-auto">
          <Target size={32} className="text-emerald-400" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Próximos Pasos</h2>
        <div className="max-w-md mx-auto space-y-4 text-left mb-8">
          {[
            { num: '1', text: 'Llamada de descubrimiento (30 min)', sub: 'Validar supuestos, obtener números exactos' },
            { num: '2', text: 'Selección de paquete (A, B o C)', sub: 'Según nivel de confort y presupuesto' },
            { num: '3', text: 'Recolección de materiales', sub: 'Fotos, marca, preferencias, accesos' },
            { num: '4', text: 'Sprint de 5 semanas → LANZAMIENTO', sub: 'Todo desplegado y en vivo' },
          ].map(step => (
            <div key={step.num} className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-xs font-bold text-orange-400 flex-shrink-0">{step.num}</div>
              <div><p className="text-sm font-bold text-white">{step.text}</p><p className="text-xs text-zinc-500">{step.sub}</p></div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 justify-center">
          <div className="px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20">
            <span className="text-xs font-bold text-orange-300">contact@mynewstaff.ai</span>
          </div>
        </div>
        <p className="text-[10px] text-zinc-700 mt-8">Preparado Marzo 2026 · Confidencial</p>
      </div>
    )},
  ]
}

// ─── SlideViewer (CSS transitions — no framer-motion) ────────────────────────

function SlideViewer({ proposal, onClose }: { proposal: Proposal; onClose: () => void }) {
  const [current, setCurrent] = useState(0)
  const [fadeKey, setFadeKey] = useState(0)
  const slides = proposal.slides
  const total = slides.length

  const goNext = useCallback(() => { setCurrent(c => Math.min(c + 1, total - 1)); setFadeKey(k => k + 1) }, [total])
  const goPrev = useCallback(() => { setCurrent(c => Math.max(c - 1, 0)); setFadeKey(k => k + 1) }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); goNext() }
      if (e.key === 'ArrowLeft') { e.preventDefault(); goPrev() }
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [goNext, goPrev, onClose])

  const slide = slides[current]

  return (
    <div className="fixed inset-0 z-[100] bg-zinc-950 flex flex-col" style={{ animation: 'fadeIn 0.3s ease' }}>
      <style>{`@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }`}</style>
      <div className="flex items-center justify-between px-6 py-3 border-b border-white/[0.06] bg-black/50 backdrop-blur-xl flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-orange-500/10 flex items-center justify-center"><Shield size={14} className="text-orange-400" /></div>
          <div>
            <p className="text-xs font-bold text-white">{proposal.client}</p>
            <p className="text-[9px] text-zinc-600">{proposal.location} · via {proposal.via}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {slides.map((_, i) => (
              <button key={i} onClick={() => { setCurrent(i); setFadeKey(k => k + 1) }}
                className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-orange-400 w-6' : 'bg-zinc-700 hover:bg-zinc-600'}`} />
            ))}
          </div>
          <span className="text-xs text-zinc-600 font-mono">{current + 1}/{total}</span>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/5 text-zinc-500 hover:text-white transition-all"><X size={18} /></button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto relative">
        <div key={fadeKey} className="max-w-5xl mx-auto px-6 sm:px-10 py-8 min-h-full" style={{ animation: 'fadeIn 0.25s ease' }}>
          {slide.title && (
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{slide.title}</h2>
              {slide.subtitle && <p className="text-sm text-zinc-500 mt-1">{slide.subtitle}</p>}
            </div>
          )}
          {slide.content}
        </div>
      </div>
      <div className="flex items-center justify-between px-6 py-3 border-t border-white/[0.06] bg-black/50 backdrop-blur-xl flex-shrink-0">
        <button onClick={goPrev} disabled={current === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-zinc-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
          <ChevronLeft size={16} /> Anterior
        </button>
        <p className="text-[10px] text-zinc-700">Flechas para navegar · ESC para cerrar</p>
        <button onClick={goNext} disabled={current === total - 1}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500/10 border border-orange-500/20 text-sm text-orange-300 hover:bg-orange-500/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
          Siguiente <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}

// ─── Vertical Config ─────────────────────────────────────────────────────────

const VERTICAL_CONFIG: Record<string, { icon: React.ComponentType<any>; label: string; color: string; bg: string }> = {
  b2b_saas: { icon: Laptop, label: 'B2B / Seguridad', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  hospitality: { icon: Building2, label: 'Hospitalidad', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  coaching: { icon: Briefcase, label: 'Coaching', color: 'text-violet-400', bg: 'bg-violet-500/10' },
  legal: { icon: Scale, label: 'Legal', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  ecommerce: { icon: ShoppingCart, label: 'E-Commerce', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  restaurant: { icon: UtensilsCrossed, label: 'Restaurante', color: 'text-pink-400', bg: 'bg-pink-500/10' },
}

// ─── Main Page ───────────────────────────────────────────────────────────────

const PROPOSALS: Proposal[] = [
  {
    id: 'api-occidente-demo',
    client: 'API de Occidente',
    location: 'Guadalajara, Jalisco, México',
    status: 'ready',
    created: '2026-03-15',
    value: '$120K – $336K MXN',
    via: 'MNS Directo',
    slides: buildSecurityProposalSlides(),
  },
]

const statusCfg: Record<string, { color: string; bg: string; label: string }> = {
  draft: { color: 'text-zinc-400', bg: 'bg-zinc-500/10', label: 'Borrador' },
  ready: { color: 'text-emerald-400', bg: 'bg-emerald-500/10', label: 'Listo' },
  sent: { color: 'text-blue-400', bg: 'bg-blue-500/10', label: 'Enviado' },
  won: { color: 'text-emerald-400', bg: 'bg-emerald-500/10', label: 'Ganado' },
  lost: { color: 'text-red-400', bg: 'bg-red-500/10', label: 'Perdido' },
}

export default function PropuestasPage() {
  const [viewing, setViewing] = useState<Proposal | null>(null)
  const [activeCalcVertical, setActiveCalcVertical] = useState<string | null>(null)
  const [customConfig, setCustomConfig] = useState<ProspectConfig | null>(null)
  const [customName, setCustomName] = useState('')
  const [customLocation, setCustomLocation] = useState('')

  const openCalculator = (vertical: string) => {
    const preset = INDUSTRY_PRESETS[vertical]
    if (!preset) return
    setActiveCalcVertical(vertical)
    setCustomConfig({ ...preset, businessName: customName || preset.businessName, location: customLocation || preset.location })
  }

  return (
    <>
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <MetricBox label="Total Propuestas" value={String(PROPOSALS.length)} color="orange" />
          <MetricBox label="Valor Pipeline" value="$336K MXN" sub="Si Opción A" color="emerald" />
          <MetricBox label="Listas para Presentar" value={String(PROPOSALS.filter(p => p.status === 'ready').length)} color="amber" />
        </div>

        <div className="space-y-3">
          {PROPOSALS.map((p, i) => {
            const st = statusCfg[p.status]
            return (
              <div key={p.id} onClick={() => setViewing(p)}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 hover:border-orange-500/20 transition-all duration-300 cursor-pointer group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 border border-white/10 flex items-center justify-center">
                      <Shield size={22} className="text-orange-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-white">{p.client}</h3>
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${st.color} ${st.bg} border-current/20`}>{st.label}</span>
                      </div>
                      <p className="text-xs text-zinc-500 mt-0.5">{p.location} · via <span className="text-zinc-400">{p.via}</span></p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right hidden sm:block">
                      <p className="text-sm font-bold text-emerald-400">{p.value}</p>
                      <p className="text-[10px] text-zinc-600">Creado {p.created}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-zinc-600">{p.slides.length} slides</span>
                      <button className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 group-hover:bg-orange-500/20 transition-all">
                        <Play size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Universal ROI Calculator */}
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400"><Calculator size={16} /></div>
            <div>
              <h3 className="text-xs uppercase tracking-wider text-orange-400 font-semibold">Calculadora ROI Universal</h3>
              <p className="text-[10px] text-zinc-600">Selecciona cualquier industria — proyecciones instantáneas</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div>
              <label className="text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">Nombre del Negocio</label>
              <input type="text" value={customName} onChange={e => setCustomName(e.target.value)} placeholder="e.g. Empresa X"
                className="w-full bg-white/[0.06] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 focus:border-orange-500/40 focus:outline-none focus:ring-1 focus:ring-orange-500/20 transition-all" />
            </div>
            <div>
              <label className="text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">Ubicación</label>
              <input type="text" value={customLocation} onChange={e => setCustomLocation(e.target.value)} placeholder="e.g. Guadalajara, México"
                className="w-full bg-white/[0.06] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 focus:border-orange-500/40 focus:outline-none focus:ring-1 focus:ring-orange-500/20 transition-all" />
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-5">
            {Object.entries(VERTICAL_CONFIG).map(([key, cfg]) => {
              const Icon = cfg.icon; const isActive = activeCalcVertical === key
              return (
                <button key={key} onClick={() => openCalculator(key)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all duration-200 ${isActive ? `${cfg.bg} border-current/20 ${cfg.color}` : 'bg-white/[0.02] border-white/[0.06] text-zinc-500 hover:bg-white/[0.05] hover:text-zinc-300'}`}>
                  <Icon size={20} /><span className="text-[10px] font-bold uppercase tracking-wider">{cfg.label}</span>
                </button>
              )
            })}
          </div>
          {customConfig && activeCalcVertical && (
            <div>
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5">
                <div className={`p-1.5 rounded-lg ${VERTICAL_CONFIG[activeCalcVertical].bg} ${VERTICAL_CONFIG[activeCalcVertical].color}`}>
                  {(() => { const Icon = VERTICAL_CONFIG[activeCalcVertical].icon; return <Icon size={14} /> })()}
                </div>
                <p className="text-sm font-bold text-white">{customName || VERTICAL_CONFIG[activeCalcVertical].label} — Proyección ROI</p>
                {customLocation && <span className="text-xs text-zinc-500">· {customLocation}</span>}
              </div>
              <ROICalculatorEngine config={customConfig} />
            </div>
          )}
          {!activeCalcVertical && (
            <div className="text-center py-8">
              <Plus size={32} className="text-zinc-700 mx-auto mb-2" />
              <p className="text-sm text-zinc-600">Selecciona una industria para generar proyecciones ROI</p>
            </div>
          )}
        </div>
      </div>

      {viewing && <SlideViewer proposal={viewing} onClose={() => setViewing(null)} />}
    </>
  )
}
